import Layout from "@/components/Layout";
import { Menu } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

function Home() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Layout>
      <div className="flex justify-between items-center ">
        <h6 className="text-[1.25rem] font-[600] text-[#535354]">
          EMart Analysis
        </h6>
        <div
          className="relative cursor-pointer flex gap-2 items-center "
          onClick={handleClick}
        >
          <p className="font-medium text-[#646465]">{session?.user?.name}</p>
          <Image
            src={session?.user?.image}
            alt="ecommerce admin"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
        <Menu
          id="basic-menu"
          className="mt-2 p-0"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div
            className=" p-2 text-sm :hover hover:bg-sky-700 hover:text-[#fff] cursor-pointer"
            onClick={handleClose}
          >
            Logout
          </div>
        </Menu>
      </div>
    </Layout>
  );
}

export default Home;
