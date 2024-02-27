import Link from "next/link";
import React, { useState } from "react";
import IndianRupeeFormatter from "./IndianRupeeFormatter";

function TableBody({ product, viewImg, deleteItem }) {
  const [showFullText, setShowFullText] = useState(false);
  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  const goal =
    "The LG UR7500 TV is a masterpiece of visual technology, delivering breathtaking picture quality, immersive sound, and a range of features that enhance your entertainment experience. With its AI-powered capabilities, seamless connectivity, and gaming optimisation, this TV is a true game-changer. Get ready to be mesmerised by the vivid colours, remarkable details, and cinema-like experience right in your own living room. Elevate your home entertainment to new heights with the LG UR7500";
  return (
    <tr key={product?._id}>
      <td>{product?.name}</td>
      <td className="grid place-items-center">
        <img
          src={product.image}
          onClick={() => viewImg(product)}
          alt="ecommerce product image"
          className="h-[3rem] cursor-pointer"
        />
      </td>
      <td>
        {product?.description?.length <= 80 ? (
          product?.description
        ) : showFullText ? (
          <>
            {product?.description}{" "}
            <span
              className="cursor-pointer text-[#164e63] font-semibold"
              onClick={toggleText}
            >
              Show Less
            </span>
          </>
        ) : (
          <>
            {product?.description?.slice(0, 80)}{" "}
            <span
              className="cursor-pointer text-[#164e63] font-semibold"
              onClick={toggleText}
            >
              ...Show More
            </span>
          </>
        )}
      </td>
      <td>
        {" "}
        <IndianRupeeFormatter amount={product?.price} />{" "}
      </td>
      <td className="flex gap-2">
        <Link
          href={`/products/edit/${product?._id}`}
          className="flex gap-2 text-white bg-[#082f49] w-fit p-1  rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Link>
        <div
          className="flex gap-2 text-white bg-[#f04f4c] w-fit p-1 cursor-pointer rounded"
          onClick={() => deleteItem(product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </td>
    </tr>
  );
}

export default TableBody;
