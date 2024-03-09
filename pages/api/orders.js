import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  const queryParams = req.query;

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
      res.json(await Product.find());
    }
  }
  if (method === "DELETE") {
    if (req?.query?.id) {
      await Order.deleteOne({ _id: req?.query?.id });
    }
    res.json(true);
  }
}
