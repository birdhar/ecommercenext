import { Notfication } from "@/validation/Snackbar";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

function ResetPassword() {
  const router = useRouter();
  const [pass, setPass] = useState({
    newPass: "",
    confirmPass: "",
  });
  const [loading, setLoading] = useState(false);

  const [notificationState, setNotificationState] = useState({
    msg: "",
    run: false,
    status: "error",
  });

  const checkPassValidation = () => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (!regex.test(pass.newPass) || !regex.test(pass.confirmPass)) {
      setNotificationState({
        msg: "Password should have at least one spacial character",
        run: true,
        status: "error",
      });
      return false;
    } else if (pass.confirmPass.length < 8 || pass.newPass.length < 8) {
      setNotificationState({
        msg: "Password must be at least 8 characters long ",
        run: true,
        status: "error",
      });
      return false;
    } else if (pass.newPass !== pass.confirmPass) {
      setNotificationState({
        msg: "Passwords do not match",
        run: true,
        status: "error",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (checkPassValidation()) {
      await axios
        .post("/api/auth/resetpass", {
          email: router.query.email[0],
          signature: router.query.signature,
          password: pass.newPass,
          password_confirmation: pass.confirmPass,
        })
        .then((res) => {
          if (res.status === 200) {
            setNotificationState({
              msg: res.data,
              run: true,
              status: "success",
            });
          }
          setLoading(false);
          router.push("/login");
        })
        .catch((err) => {
          setNotificationState({
            msg: err?.response?.data?.message,
            run: true,
            status: "error",
          });

          setLoading(false);
        });
    }
  };
  if (!router.query.signature) {
    // If the 'token' URL parameter is not present, redirect the user to the forgot password page
    router.push("/password/forgot");
    return null; // Render nothing while redirecting
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="/images/logo-blue.png"
            alt="logo"
          />
          EMart
        </div>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>

          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={pass.newPass}
                onChange={(e) => setPass({ ...pass, newPass: e.target.value })}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                value={pass.confirmPass}
                onChange={(e) =>
                  setPass({ ...pass, confirmPass: e.target.value })
                }
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {loading ? "Processing" : "Reset passwod"}
            </button>
          </form>
        </div>
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
    </section>
  );
}

export default ResetPassword;
