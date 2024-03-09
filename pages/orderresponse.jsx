import Layout from "@/components/Layout";
import { Notfication } from "@/validation/Snackbar";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Checkout() {
  const router = useRouter();
  const [order, setOrder] = useState({});
  const [notificationState, setNotificationState] = useState({
    msg: "",
    run: false,
    status: "error",
  });
  useEffect(() => {
    if (!router?.query?.orderId) {
      return;
    }
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/orders?id=" + router?.query?.orderId);
        setOrder(res.data);
      } catch (error) {
        setNotificationState({
          msg: "Something went wrong",
          run: true,
          status: "error",
        });
      }
    };
    fetchData();
  }, [router?.query?.orderId]);
  console.log(order);
  return (
    <Layout>
      <div>Checkout</div>

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

export default Checkout;
