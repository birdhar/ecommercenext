import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authproviders } from "./auth/[...nextauth]";
import { adminEmails } from "@/utils/constant";

export default async function handler(req, res) {
  const { method } = req;

  const session = await getServerSession(req, res, authproviders);

  if (
    !session ||
    session.user.role !== "Admin" ||
    !adminEmails?.includes(session?.user?.email)
  ) {
    return res.status(401).json({ error: "You are not authorized" });
  }

  await mongooseConnect();

  if (method === "GET") {
    if (req?.query?.id) {
      res.json(await Order.findOne({ _id: req?.query?.id }));
    } else if (req.query?.page && req.query?.page) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const orders = await Order.find().skip(skip).limit(limit).exec();
      res.json(orders);
    } else {
      res.json(await Order.find());
    }
  }
  if (method === "PATCH") {
    const { delivery } = req.body;
    try {
      const update = { $set: { delivery } };

      const options = { new: true, upsert: true };

      const updatedOrder = await Order.findByIdAndUpdate(
        req?.query?.id,
        update,
        options
      );

      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
