import DeleteProduct from "@/components/DeleteProduct";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import TableBody from "@/components/TableBody";
import ViewProduct from "@/components/ViewProduct";
import axios from "axios";
import Error from "@/components/Error";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Notfication } from "./validation/Snackbar";
import { CircularProgress } from "@mui/material";

function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [productt, setProductt] = useState(null);
  const [open, setOpen] = useState({
    delete: false,
    view: false,
  });
  const [notificationState, setNotificationState] = useState({
    msg: "",
    run: false,
    status: "error",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        setFilteredItems(res.data);
      } catch (error) {
        setNotificationState({
          msg: error?.response?.data?.error ?? "Unauthorized access",
          run: true,
          status: "error",
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        setFilteredItems(res.data);
      } catch (error) {
        setNotificationState({
          msg: error?.response?.data?.error ?? "Unauthorized access",
          run: true,
          status: "error",
        });
      }
    };
    fetchData();
  }, [open]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      const filtered = products.filter((item) =>
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setFilteredItems(filtered);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchQuery, products]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  if (loading) {
    return (
      <Layout>
        <div className="w-full">
          <div className="flex mb-4 justify-between items-center mt-[-0.1rem] ">
            <h4 className=" text-[#164e63] font-medium text-[1.4rem] hidden md:block">
              Products
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
    <>
      <Layout>
        <div className="w-full">
          <div className="flex mb-4 justify-between items-center mt-[-0.1rem] ">
            <h4 className=" text-[#164e63] font-medium text-[1.4rem] hidden md:block">
              Procuct List
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
                <Link
                  href="/newproduct"
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
                  New Product
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full h-[calc(100vh-9rem)] p-2 overflow-scroll md:h-[calc(100vh-5rem)]">
            <table className=" mb-4">
              <thead>
                <tr className="bg-[#164e63] ">
                  <td>Name</td>
                  <td>Image</td>
                  <td>Description</td>
                  <td>Price</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody className="">
                {filteredItems?.map((product) => (
                  <TableBody
                    key={product?._id}
                    product={product}
                    viewImg={(product) => {
                      setOpen({ ...open, view: true });
                      setProductt(product);
                    }}
                    deleteItem={(product) => {
                      setOpen({ ...open, delete: true });
                      setProductt(product);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* <div className="w-full h-[calc(100vh-9rem)] p-2 grid place-items-center overflow-scroll md:h-[calc(100vh-5rem)] ">
              No Data Found
            </div> */}
        </div>
      </Layout>

      {open.delete && (
        <DeleteProduct
          open={open.delete}
          hideModal={() => setOpen({ ...open, delete: false })}
          pid={productt?._id}
        />
      )}
      {open.view && (
        <ViewProduct
          open={open.view}
          hideModal={() => setOpen({ ...open, view: false })}
          image={productt?.image}
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
    </>
  );
}

export default Products;
