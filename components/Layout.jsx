import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const { data: session } = useSession();

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
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="bg-white flex-grow p-4 pt-6">{children}</div>
    </div>
  );
}

export default Layout;
