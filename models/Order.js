import { Schema, model, models } from "mongoose";
const OrderSchema = new Schema(
  {
    product_info: [{ type: Object }],
    address: { type: Object },
    payment_info: { type: Object },
  },
  {
    timestamps: true,
  }
);

export const Order = models.Order || model("Order", OrderSchema);
