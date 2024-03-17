import Layout from "@/components/Layout";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ViewProduct from "@/components/ViewProduct";
import Link from "next/link";
import { Notfication } from "./validation/Snackbar";

function Newproduct() {
  const router = useRouter();
  const featurestoFill = [];
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    rating: 0,
    description: "",
    price: 0,
    image: "",
  });
  const [notificationState, setNotificationState] = useState({
    msg: "",
    run: false,
    status: "error",
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");

        setCategories(res.data);
      } catch (error) {
        setNotificationState({
          msg: error?.response?.data?.error ?? "Unauthorized access",
          run: true,
          status: "error",
        });
      }
    };

    fetchCategories();
  }, []);
  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post("/api/products", { ...formData, features });
    router.push("/products");
  };

  const handleUploadFile = (e) => {
    setLoading(true);
    setFormData({ ...formData, image: "" });
    const file = e.target?.files[0];
    const form = new FormData();
    form.append("file", file);

    fetch("/api/upload", {
      method: "POST",
      body: form,
    })
      .then((r) => r.json())
      .then((data) => {
        setLoading(false);
        setFormData({ ...formData, image: data?.links?.[0] });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  if (categories?.length > 0 && formData.category !== "") {
    let targetCategory = categories?.find(
      (cat) => cat?._id === formData.category
    );
    featurestoFill.push(...targetCategory?.features);

    while (targetCategory?.parent?._id) {
      const parentCategory = categories?.find(
        (cat) => cat?._id === targetCategory?.parent?._id
      );
      featurestoFill.push(...parentCategory?.features);
      targetCategory = parentCategory;
    }
  }
  const addProductFeature = (nam, val) => {
    setFeatures((prev) => {
      const oldFeatures = { ...prev };
      oldFeatures[nam] = val;
      return oldFeatures;
    });
  };
  console.log(features);
  return (
    <Layout>
      <div className=" flex flex-col items-center">
        <div className="flex justify-between items-center w-[90%]">
          <Link href="/products">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </Link>

          <h4 className="m-8 text-[#164e63] font-medium text-[1.4rem]">
            Add New Procuct
          </h4>
          <div></div>
        </div>

        <form className="w-[70%]" onSubmit={addProduct}>
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
          <label className="mb-2">Product Rating</label>
          <select
            required
            onChange={(e) => {
              setFormData({ ...formData, rating: parseInt(e.target.value) });
            }}
          >
            <option value="">Select Rating</option>

            {[...Array(5)].map((item, index) => {
              const givenRating = index + 1;

              return (
                <option value={givenRating} key={index}>
                  {givenRating}
                </option>
              );
            })}
          </select>
          <label className="mb-[2rem]">Product Features</label>
          {featurestoFill?.map((feat, index) => (
            <div key={index} className="flex gap-2 items-start mt-1 mb-1">
              <div className="border p-[0.4rem] rounded w-fit  mt-2 bg-[#164e63] text-white text-[0.85rem]">
                {feat?.name}
              </div>
              <select
                className="flex-1 cursor-pointer"
                value={features[feat?.name]}
                onChange={(e) => addProductFeature(feat?.name, e.target.value)}
              >
                <option value="Null">Select Feature</option>
                {feat?.values?.map((val, i) => (
                  <option key={i} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}

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

          <div className="flex gap-2">
            {formData?.image !== "" ? (
              <div className=" p-1 mt-4 mb-4  font-normal text-sm w-fit rounded cursor-pointer border-2 border-inherit">
                <img
                  src={formData.image}
                  alt="ecommerce product image"
                  className="h-[5rem]"
                  onClick={() => setOpen(true)}
                />
              </div>
            ) : formData?.image === "" && loading ? (
              <div className=" p-6 mt-4 mb-4  font-normal text-sm w-fit rounded cursor-pointer border-2 border-inherit">
                <TailSpin color="red" radius="1" height="2px" width="2px" />
              </div>
            ) : (
              <></>
            )}
            <label htmlFor="image">
              <div className="mt-4 mb-4 p-6 font-normal text-sm w-fit rounded cursor-pointer border-2 border-inherit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </label>

            <input
              type="file"
              accept="image/*"
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
      {open && (
        <ViewProduct
          open={open}
          hideModal={() => setOpen(false)}
          image={formData?.image}
        />
      )}
      {notificationState.run && (
        <Notfication
          msg={notificationState.msg}
          run={notificationState.run}
          setRun={() =>
            setNotificationState({ msg: "", run: false, status: "error" })
          }
          postiton="bottom"
          type={notificationState.status || "error"}
        />
      )}
    </Layout>
  );
}

export default Newproduct;
