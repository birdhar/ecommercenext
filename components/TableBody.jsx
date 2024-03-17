import Link from "next/link";
import React, { useState } from "react";
import IndianRupeeFormatter from "./IndianRupeeFormatter";
import Tooltip from "@mui/material/Tooltip";
import { Menu } from "@mui/material";
import axios from "axios";

function TableBody({ product, viewImg, deleteItem, order, getOrders }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [showFullText, setShowFullText] = useState(false);
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateStatus = async (status) => {
    const response = await axios.patch("/api/orders?id=" + order?._id, {
      delivery: status,
    });
    if (response.status === 200) {
      await getOrders();
    }
  };

  return (
    <>
      {product && (
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
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
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
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </td>
        </tr>
      )}

      {order &&
        order?.product_info?.map((orderr, index) => (
          <tr key={index}>
            <td className="flex items-center gap-3 text-[0.8rem] font-[600] text-[#415161]">
              <img
                src={orderr?.price_data?.product_data?.image}
                alt={orderr?.price_data?.product_data?.name}
                className="h-[2rem] cursor-pointer"
              />
              <Tooltip title={orderr?.price_data?.product_data?.name}>
                {orderr?.price_data?.product_data?.name?.slice(0, 20)}...
              </Tooltip>
            </td>
            <td className="">
              <p className="text-[0.75rem] font-[600] text-[#415161]">
                {order?.name}
              </p>
              <p className="text-[0.75rem] font-[600] text-[#415161]">
                {order?.streetAddress}, {order?.postalCode}
              </p>
            </td>
            <td className="text-[0.75rem] font-[600] text-[#415161]">
              {new Date(order?.createdAt)?.toLocaleDateString("en-US")}
            </td>
            <td className="text-[0.75rem] font-[600] text-[#415161]">
              {" "}
              <IndianRupeeFormatter
                amount={orderr?.price_data?.unit_amount}
              />{" "}
            </td>
            <td className="flex gap-2">
              <div
                className={
                  order?.payment === "Paid"
                    ? "p-1 text-[0.7rem] font-[500] text-green-800 bg-green-100 rounded-md cursor-pointer"
                    : order?.payment === "Pending"
                    ? "p-1 text-[0.7rem] font-[500] text-[#545e3d] bg-[#e0f6a4] rounded-md cursor-pointer"
                    : "p-1 text-[0.7rem] font-[500] text-[#543737] bg-[#fc838d] rounded-md cursor-pointer"
                }
              >
                {order?.payment}
              </div>
              <div
                className={
                  order?.delivery === "Pending" ||
                  order?.delivery === "Dispatched"
                    ? "p-1 text-[0.7rem] font-[500] text-[#545e3d] bg-[#e0f6a4] rounded-md cursor-pointer"
                    : "p-1 text-[0.7rem] font-[500] text-green-800 bg-green-100 rounded-md cursor-pointer"
                }
                onClick={handleClick}
              >
                {order?.delivery}
              </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div
                  className={
                    "p-0 px-1 text-[0.7rem] font-[500] text-[#4f5150] cursor-pointer"
                  }
                  onClick={() => handleUpdateStatus("Delivered")}
                >
                  Delivered
                </div>
              </Menu>
            </td>
          </tr>
        ))}
    </>
  );
}

export default TableBody;
