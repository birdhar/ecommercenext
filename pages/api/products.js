import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });

  if (!session || session.user.role !== "Admin") {
    return res.status(401).json({ error: "You are not authorized" });
  }

  await mongooseConnect();

  if (method === "GET") {
    if (req?.query?.id) {
      res.json(await Product.findOne({ _id: req?.query?.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { name, description, price, rating, image, category, features } =
      req.body;

    const product = await Product.create({
      name,
      description,
      price,
      rating,
      image,
      category,
      features,
    });
    res.json(product);
  }

  if (method === "PUT") {
    const { name, description, price, rating, id, category, features } =
      req.body;
    await Product.updateOne(
      { _id: id },
      { name, description, price, rating, category, features }
    );
    res.json(true);
  }
  if (method === "DELETE") {
    if (req?.query?.id) {
      await Product.deleteOne({ _id: req?.query?.id });
    }
    res.json(true);
  }
}
