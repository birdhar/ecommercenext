import React, { useEffect, useState } from "react";
import { useSession, signIn, getSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "./Loader";
import Error from "./Error";

function Layout({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [loading, setLoading] = useState(true);
  const [sessionExists, setSessionExists] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setLoading(false);
      if (!session) {
        setSessionExists(false);
        // Redirect or handle error state as needed
        router.push("/error"); // Redirect to error page if no session found
      } else {
        setSessionExists(true);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  if (!sessionExists) {
    // Handle error state here if needed
    return <Error />;
  }

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
            stroke-linecap="round"
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
