import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category", default: null },
  features: [{ type: Object }],
  image: { type: String },
});

export const Category = models.Category || model("Category", CategorySchema);
