import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "./Loader";
import Error from "./Error";
import { adminEmails } from "@/utils/constant";

function Layout({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [openDrawer, setOpenDrawer] = useState(false);

  if (!session) {
    return (
      <div className="bg-blue-600 h-screen w-screen flex items-center">
        <div className="w-full text-center">
          <button
            className="rounded-lg bg-white p-2 px-2"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  if (
    session?.user?.role !== "Admin" ||
    !adminEmails?.includes(session?.user?.email)
  ) {
    return (
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  Looks like you are not authorized to access the page
                </h1>
                <p className="my-2 text-gray-800">
                  Sorry about that! Please try again with an authorized account.
                </p>

                <button
                  type="button"
                  onClick={() => signOut()}
                  className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                >
                  Try with another account
                </button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>
    );
  }

  return (
    <div className=" h-screen box-border ">
      <div
        className="flex items-center justify-between sticky top-0 md:hidden border-b p-[1rem]"
        // className="p-[1rem] flex items-center justify-between border-b sticky top-0 md:hidden"
      >
        <Link href="/" className="flex  items-start gap-2 ">
          <img src="/images/logo-blue.png" alt="" className="w-8 h-8 mt-1" />
          <p className="text-[#415873] text-[1.53rem] font-semibold">EMart</p>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 block cursor-pointer"
          onClick={() => setOpenDrawer(true)}
        >
          <path
            strokeLinecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      <div className="flex h-[calc(100%-4.5rem)] md:h-[100%] w-screen">
        <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <div className="bg-slate-100 p-4 pt-6 w-full h-full">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
