import IndianRupeeFormatter from "@/components/IndianRupeeFormatter";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Editproduct() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const id = router?.query?.editproduct[0];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setFormData(res.data);
    });
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, [id]);
  const editProduct = (e) => {
    e.preventDefault();
    axios.put("/api/products", { ...formData, id }).then((res) => {
      if (res?.status === 200) {
        router.push("/products");
      }
    });
  };
  function formatIndianRupee(amount) {
    // Convert number to string
    const amountStr = amount.toString();

    // Split integer and decimal parts
    const parts = amountStr.split(".");

    // Format integer part with commas
    const integerPartWithCommas = parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    // Combine integer and decimal parts
    const formattedAmount =
      parts.length === 2
        ? integerPartWithCommas + "." + parts[1]
        : integerPartWithCommas;

    // Return formatted amount with Indian rupee symbol
    console.log(formattedAmount);
    return "₹" + formattedAmount;
  }
  return (
    <Layout>
      <div className=" flex flex-col items-center">
        <h4 className="m-8 text-[#164e63] font-medium text-[1.4rem]">
          Edit Procuct
        </h4>
        <form className="w-[70%]" onSubmit={editProduct}>
          <label className="mb-2">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Product Name"
          />
          <label className="mb-2">Product Category</label>

          <select
            required
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            <option value="">Select Category</option>
            {categories?.map((category, index) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
          <label className="mb-2">Product Description</label>
          <textarea
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description"
          />
          <label className="mb-2">Price</label>
          <input
            type="number"
            value={formData?.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="Product Price"
          />

          <button
            type="submit"
            className="p-2 bg-[#0c4a6e] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#1d7db5]"
          >
            Edit Product
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Editproduct;
