import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req?.query?.id) {
      res.json(await Product.findOne({ _id: req?.query?.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { name, description, price } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
    });
    res.json(product);
  }

  if (method === "PUT") {
    const { name, description, price, id } = req.body;
    await Product.updateOne({ _id: id }, { name, description, price });
    res.json(true);
  }
  if (method === "DELETE") {
    if (req?.query?.id) {
      await Product.deleteOne({ _id: req?.query?.id });
    }
    res.json(true);
  }
}
