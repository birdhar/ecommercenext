import DeleteProduct from "@/components/DeleteProduct";
import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { TailSpin } from "react-loader-spinner";
import { Notfication } from "./validation/Snackbar";
import { CircularProgress } from "@mui/material";

function Categories() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [categoryy, setCategoryy] = useState(null);
  const [index, setIndex] = useState(1);
  const [open, setOpen] = useState({
    delete: false,
    edit: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    parent: "",
    image: "",
  });
  const [notificationState, setNotificationState] = useState({
    msg: "",
    run: false,
    status: "error",
  });
  const [form, setForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const addCategory = async (e) => {
    e.preventDefault();
    await axios.post("/api/categories", {
      name: formData.name,
      parentCategory: formData.parent,
      image: formData.image,
      features: features?.map((f) => ({
        name: f?.name,
        values: f?.value?.split(","),
      })),
    });

    setFormData({
      name: "",
      parent: "",
      image: "",
    });
    setFeatures([]);
    fetchCategories();
    setForm(false);
  };
  const editCategory = async (e) => {
    e.preventDefault();
    await axios.put("/api/categories", {
      name: formData.name,
      parentCategory: formData.parent,
      image: formData.image,
      features: features?.map((f) => ({
        name: f?.name,
        values: f?.values ? f?.values : f?.value?.split(","),
      })),
      id: categoryy?._id,
    });
    setFormData({
      name: "",
      parent: "",
      image: "",
    });
    fetchCategories();
    setForm(false);
  };
  const addFeature = () => {
    setFeatures((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  };
  const changeFeatureData = (e, index) => {
    setFeatures((prev) => {
      const featuress = [...prev];

      featuress[index][e.target.name] = e.target.value;

      return featuress;
    });
  };
  const deleteFeature = (targetindex) => {
    setFeatures((prev) => {
      return [...prev]?.filter((f, i) => i !== targetindex);
    });
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      const filtered = categories?.filter((item) =>
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setFilteredItems(filtered);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchQuery, categories]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleUploadFile = (e) => {
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
        setFormData({ ...formData, image: data?.links?.[0] });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  if (loading) {
    return (
      <Layout>
        <div className="w-full">
          <div className="flex mb-4 justify-between items-center mt-[-0.1rem] ">
            <h4 className=" text-[#164e63] font-medium text-[1.4rem] hidden md:block">
              Categories
            </h4>
          </div>
          <div className="w-full min-h-[60vh] grid place-items-center">
            <CircularProgress style={{ color: "#6CB4EE" }} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        {index === 1 && (
          <>
            {form ? (
              open.edit ? (
                <div className="w-[100%] flex flex-col items-center">
                  <div className="flex justify-between items-center w-[90%]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => {
                        setForm(false);
                        setOpen({ ...open, edit: false });
                        setFormData({
                          name: "",
                          parent: "",
                          image: "",
                        });
                        setFeatures([]);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>

                    <h4 className="m-8 text-[#164e63] font-medium text-[1.4rem]">
                      Edit Category
                    </h4>
                    <div></div>
                  </div>
                  <form className="w-[70%]" onSubmit={editCategory}>
                    <label className="mb-2">Category Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Category Name"
                    />

                    <label className="mb-2">Parent Category</label>
                    <select
                      onChange={(e) => {
                        setFormData({ ...formData, parent: e.target.value });
                      }}
                    >
                      <option value="">No Parent Category</option>
                      {categories?.map((category, index) => (
                        <option key={category?._id} value={category?._id}>
                          {category?.name}
                        </option>
                      ))}
                    </select>

                    {/* {formData?.parent === null ? ( */}
                    <div className="flex gap-2">
                      {formData?.image !== "" ? (
                        <div className=" p-1 mt-4 mb-4  font-normal text-sm w-fit rounded cursor-pointer border-2 border-inherit">
                          <img
                            src={formData.image}
                            alt="ecommerce category image"
                            className="h-[5rem]"
                          />
                        </div>
                      ) : formData?.image === "" && loading ? (
                        <div className=" p-6 mt-4 mb-4  font-normal text-sm w-fit rounded cursor-pointer border-2 border-inherit">
                          <TailSpin
                            color="red"
                            radius="1"
                            height="2px"
                            width="2px"
                          />
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
                    {/* ) : (
                      ""
                    )} */}
                    <button
                      type="submit"
                      className="p-2 mt-8 bg-[#0c4a6e] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#1d7db5]"
                    >
                      Edit Category
                    </button>
                    <button
                      className="ml-2 p-2 mt-8 bg-[#334155] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#1d7db5]"
                      onClick={() => setIndex(2)}
                      type="button"
                    >
                      {features?.length > 0 ? "Edit Features" : "Add Features"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="w-[100%] flex flex-col items-center">
                  <div className="flex justify-between items-center w-[90%]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => setForm(false)}
                    >
                      <path
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>

                    <h4 className="m-8 text-[#164e63] font-medium text-[1.4rem]">
                      Add Category
                    </h4>
                    <div></div>
                  </div>
                  <form className="w-[70%]" onSubmit={addCategory}>
                    <label className="mb-2">Category Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Category Name"
                    />

                    <label className="mb-2">Parent Category</label>
                    <select
                      onChange={(e) => {
                        setFormData({ ...formData, parent: e.target.value });
                      }}
                    >
                      <option value="">No Parent Category</option>
                      {categories?.map((category, index) => (
                        <option key={category?._id} value={category?._id}>
                          {category?.name}
                        </option>
                      ))}
                    </select>
                    {/* {formData?.parent === "" || formData?.parent === null ? ( */}
                    <div className="flex gap-2">
                      {formData?.image !== "" ? (
                        <div className=" p-1 mt-4 mb-4  font-normal text-sm w-fit rounded cursor-pointer border-2 border-inherit">
                          <img
                            src={formData.image}
                            alt="ecommerce category image"
                            className="h-[5rem]"
                          />
                        </div>
                      ) : formData?.image === "" && loading ? (
                        <div className=" p-6 mt-4 mb-4  font-normal text-sm w-fit rounded cursor-pointer border-2 border-inherit">
                          <TailSpin
                            color="red"
                            radius="1"
                            height="2px"
                            width="2px"
                          />
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
                    {/* ) : (
                      ""
                    )} */}
                    <button
                      type="submit"
                      className="p-2 mt-8 bg-[#0c4a6e] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#1d7db5]"
                    >
                      Submit
                    </button>
                    <button
                      className="ml-2 p-2 mt-8 bg-[#334155] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#1d7db5]"
                      onClick={() => setIndex(2)}
                      type="button"
                    >
                      {features?.length > 0 ? "Edit Features" : "Add Features"}
                    </button>
                  </form>
                </div>
              )
            ) : (
              <>
                <div className="flex mb-4 justify-between items-center mt-[-0.1rem] ">
                  <h4 className=" text-[#164e63] font-medium text-[1.4rem] hidden md:block">
                    Category List
                  </h4>

                  <div className="w-full md:w-fit">
                    <div className="flex gap-2 items-center justify-between">
                      <div className="relative  flex  flex-wrap items-stretch flex-1 sm:w-[20rem]">
                        <input
                          type="search"
                          className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon1"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm(true)}
                        className="p-2 bg-[#0c4a6e] h-fit text-white font-normal flex items-center gap-1 text-sm w-fit rounded cursor-pointer hover:bg-[#1d7db5]"
                      >
                        <span>
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
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </span>{" "}
                        New Category
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[calc(100vh-9rem)] p-2 overflow-scroll md:h-[calc(100vh-5rem)]">
                  <table className="w-[100%] mb-4">
                    <thead>
                      <tr className="bg-[#164e63] ">
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems?.map((category, index) => (
                        <tr key={index}>
                          <td>{category?.name}</td>

                          <td> {category?.parent?.name}</td>
                          <td className="flex gap-2">
                            <div
                              className="flex gap-2 text-white bg-[#082f49] w-fit p-1  rounded"
                              onClick={() => {
                                setFormData({
                                  name: category?.name,
                                  parent: category?.parent,
                                  image: category?.image,
                                });
                                setFeatures(category?.features);
                                setCategoryy(category);
                                setOpen({ ...open, edit: true });
                                setForm(true);
                              }}
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
                            </div>
                            <div
                              className="flex gap-2 text-white bg-[#f04f4c] w-fit p-1 cursor-pointer rounded"
                              onClick={() => {
                                setOpen({ ...open, delete: true });
                                setCategoryy(category);
                              }}
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
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* <div className="w-full h-[calc(100vh-9rem)] p-2 grid place-items-center overflow-scroll md:h-[calc(100vh-5rem)] ">
                    No Data Found
                  </div> */}
              </>
            )}

            {open.delete && (
              <DeleteProduct
                status="category"
                open={open.delete}
                hideModal={() => setOpen({ ...open, delete: false })}
                pid={categoryy?._id}
                fetchCategories={fetchCategories}
              />
            )}
          </>
        )}

        {index === 2 && (
          <div className="w-[100%] flex flex-col items-center">
            <div className="flex justify-between items-center w-[90%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIndex(1)}
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>

              <h4 className="m-8 text-[#225336] font-medium text-[1.4rem]">
                Add Features
              </h4>
              <div></div>
            </div>

            <div className="w-[70%] flex justify-end">
              <div className="flex gap-1">
                <div
                  className="bg-[#293852] text-[#fff] p-2 rounded cursor-pointer"
                  onClick={addFeature}
                >
                  Add Feature
                </div>

                {features?.length > 0 && (
                  <div
                    className="bg-[#265551] text-[#fff] p-2 rounded cursor-pointer"
                    onClick={() => setIndex(1)}
                  >
                    Save
                  </div>
                )}
              </div>
            </div>
            {features?.map((feature, i) => (
              <div className="w-[70%]" key={i}>
                <div className="flex gap-2">
                  <div className="w-[48%]">
                    <label className="mb-2">Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={feature.name}
                      onChange={(e) => changeFeatureData(e, i)}
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="mb-2"> Value</label>
                    <input
                      type="text"
                      name="value"
                      required
                      value={
                        feature.value
                          ? feature.value
                          : feature?.values?.join(",")
                      }
                      onChange={(e) => changeFeatureData(e, i)}
                      placeholder="Value"
                    />
                  </div>
                  <div>
                    <div
                      className="flex gap-2 text-white bg-[#f04f4c] w-fit p-[0.5rem] cursor-pointer rounded mt-[2rem]"
                      onClick={() => {
                        deleteFeature(i);
                      }}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      </>
    </Layout>
  );
}

export default Categories;
