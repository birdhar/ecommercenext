import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

function DeleteProduct({ status, open, hideModal, pid, fetchCategories }) {
  const router = useRouter();
  const deleteProduct = async () => {
    if (status === "category") {
      await axios.delete(`/api/categories?id=` + pid).then((res) => {
        if (res.status === 200) {
          router.push("/categories");
          fetchCategories();
          hideModal();
        }
      });
    } else {
      await axios.delete(`/api/products?id=` + pid).then((res) => {
        if (res.status === 200) {
          router.push("/products");
          hideModal();
        }
      });
    }
  };
  return (
    <Dialog open={open} onClose={hideModal}>
      <div className=" flex flex-col items-center">
        <DialogTitle>
          <h4 className="text[#164e63] text-[1.2rem] font-[600] mb-2">
            Are You Sure ?
          </h4>
        </DialogTitle>
        <DialogContent className="flex flex-col items-center">
          <p className="text-center">
            You want to delete this product form the list
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="p-2 bg-[#ef3f3f] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#ef6161]"
              onClick={deleteProduct}
            >
              Delete
            </button>
            <button
              className="p-2 bg-[#0c4a6e] text-white font-normal text-sm w-fit rounded cursor-pointer hover:bg-[#1d7db5]"
              onClick={hideModal}
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default DeleteProduct;
