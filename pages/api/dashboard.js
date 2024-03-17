import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
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
  try {
    if (method === "GET") {
      const orderCount = await Order.countDocuments();
      const productCount = await Product.countDocuments();
      const userCount = await User.countDocuments();
      const allUsers = await User.find();
      if (req.query?.page && req.query?.page) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const users = await User.find().skip(skip).limit(limit).exec();

        return res
          .status(200)
          .json({ users, orderCount, productCount, userCount });
      } else {
        res.status(200).json({
          users: allUsers,
          orderCount,
          productCount,
          userCount,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
