import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

function Logout({ open, hideModal }) {
  const router = useRouter();
  const handleLogout = async () => {
    await router.push("/");
    await signOut();
  };
  return (
    <Dialog open={open} onClose={hideModal}>
      <DialogTitle>
        <h4 className="text[#164e63] text-[1.2rem] font-[600] mb-2">
          Are You Sure ?
        </h4>
      </DialogTitle>
      <DialogContent className="flex flex-col items-center">
        <p className="text-center">You want to logout</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="p-2 bg-[#ef3f3f] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#ef6161]"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="p-2 bg-[#0c4a6e] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#1d7db5]"
            onClick={hideModal}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Logout;
