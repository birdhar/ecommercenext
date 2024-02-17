import Layout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Newproduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post("/api/products", formData);
    router.push("/products");
  };

  const handleUploadFile = (e) => {
    const file = e.target?.files[0];
    const form = new FormData();
    form.append("file", file);

    fetch("/api/upload", {
      method: "POST",
      body: form,
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  // async function handleUploadFile(ev) {
  //   const files = ev.target?.files;
  //   if (files?.length > 0) {
  //     // setIsUploading(true);
  //     const data = new FormData();
  //     for (const file of files) {
  //       data.append("file", file);
  //     }
  //     const res = await axios.post("/api/upload", data);
  //     // setImages(oldImages => {
  //     //   return [...oldImages, ...res.data.links];
  //     // });
  //     // setIsUploading(false);
  //   }
  // }
  return (
    <Layout>
      <div className=" flex flex-col items-center">
        <h4 className="m-8 text-[#164e63] font-medium text-[1.4rem]">
          Add New Procuct
        </h4>
        <form className="w-[70%]" onSubmit={addProduct}>
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

          <div className="mt-4 mb-4 p-6 font-normal text-sm w-fit rounded cursor-pointer border-2 border-inherit">
            <label htmlFor="image">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              multiple={false}
              onChange={handleUploadFile}
            />
          </div>
          {/* <label className="mt-4 mb-4 p-4  font-normal text-sm w-fit rounded cursor-pointer border-2 border-inherit">
            Add Product
          </label> */}

          <button
            type="submit"
            className="p-2 mt-8 bg-[#0c4a6e] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#1d7db5]"
          >
            Add Product
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Newproduct;
