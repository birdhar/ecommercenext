import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Editproduct() {
  const router = useRouter();
  const id = router?.query?.editproduct[0];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setFormData(res.data);
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
            value={formData.price}
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
