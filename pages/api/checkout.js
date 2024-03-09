import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "POST") {
    res.json("Not a post request");
    return;
  }

  const { userAddress, productInfos } = req.body;

  let productInfoArr = [];

  for (const productInfo of productInfos) {
    productInfoArr.push({
      quantity: productInfo?.count,
      price_data: {
        currency: "INR",
        product_data: { name: productInfo?.name },
        unit_amount: productInfo?.count * productInfo?.price,
      },
    });
  }

  Order.create({
    product_info: productInfoArr,
    address: userAddress,
  });
  res.json({ productInfoArr });
}
