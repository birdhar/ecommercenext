import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Link from "next/link";
import TableBody from "@/components/TableBody";
import { CircularProgress } from "@mui/material";
import { Notfication } from "./validation/Snackbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [notificationState, setNotificationState] = useState({
    msg: "",
    run: false,
    status: "error",
  });
  const getOrders = async () => {
    try {
      const response = await axios.get(`/api/orders`);
      setFilteredItems(response.data);
      setOrders(response?.data);
    } catch (error) {
      setNotificationState({
        msg: error?.response?.data?.error ?? "Unauthorized access",
        run: true,
        status: "error",
      });
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      const filterArr = orders?.map((order) => {
        const result = order?.product_info?.filter((item) =>
          item?.price_data?.product_data?.name
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase())
        );
        if (result?.length > 0) {
          return order;
        }
      });

      setFilteredItems(filterArr?.filter((element) => element !== undefined));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchQuery, orders]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <Layout>
        <div className="w-full">
          <div className="flex mb-4 justify-between items-center mt-[-0.1rem] ">
            <h4 className=" text-[#164e63] font-medium text-[1.4rem] hidden md:block">
              Orders
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
      <div className="w-full">
        <div className="flex mb-4 justify-between items-center mt-[-0.1rem] ">
          <h4 className=" text-[#164e63] font-medium text-[1.4rem] hidden md:block">
            Orders
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
            </div>
          </div>
        </div>

        <div className="w-full h-[calc(100vh-9rem)] p-2 overflow-scroll md:h-[calc(100vh-5rem)]">
          <table className=" mb-4 w-full">
            <thead>
              <tr className="bg-[#164e63] ">
                <td>Product</td>
                <td>Address</td>
                <td>Date</td>
                <td>Price</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody className="">
              {filteredItems?.map((order) => (
                <TableBody
                  key={order?._id}
                  order={order}
                  getOrders={getOrders}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="w-full h-[calc(100vh-9rem)] p-2 grid place-items-center overflow-scroll md:h-[calc(100vh-5rem)] ">
          No Data Found
        </div> */}
      </div>

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

export default Orders;
