import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { checkAdmin } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await checkAdmin(req, res);
  await mongooseConnect();

  if (method === "POST") {
    const { name, parentCategory, features } = req.body;

    const createdCategory = await Category.create({
      name,
      parent: parentCategory !== "" ? parentCategory : null,
      features,
    });
    res.json(createdCategory);
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
    const { name, parentCategory, features, id } = req.body;
    await Category.updateOne(
      { _id: id },
      { name, parent: parentCategory, features }
    );
    res.json(true);
  }
}
