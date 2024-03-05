import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { checkAdmin } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { authproviders } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  const session = await getServerSession(req, res, authproviders);

  if (!session || session.user.role !== "Admin") {
    return res.status(401).json({ error: "You are not authorized" });
  }

  await mongooseConnect();

  if (method === "POST") {
    const { name, parentCategory, image, features } = req.body;

    const createdCategory = await Category.create({
      name,
      parent: parentCategory !== "" ? parentCategory : null,
      features,
      image: image,
    });
    res.json("createdCategory");
  }

  if (method === "GET") {
    res.json(await Category.find()?.populate("parent"));
  }
  if (method === "DELETE") {
    if (req?.query?.id) {
      await Category.deleteOne({ _id: req?.query?.id });
    }
    res.json(true);
  }
  if (method === "PUT") {
    const { name, parentCategory, features, image, id } = req.body;
    await Category.updateOne(
      { _id: id },
      { name, parent: parentCategory, image, features }
    );
    res.json(true);
  }
}
