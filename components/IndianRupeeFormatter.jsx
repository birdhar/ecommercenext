import React from "react";

function IndianRupeeFormatter({ amount }) {
  const formattedAmount = amount?.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return <span>{formattedAmount}</span>;
}

export default IndianRupeeFormatter;
