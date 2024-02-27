import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function ViewProduct({ open, hideModal, image }) {
  return (
    <Dialog open={open} onClose={hideModal}>
      <div className="flex flex-col ">
        <img
          src={image}
          alt="ecommerce product image"
          className="max-h-[90vh] max-w-[90vw]"
        />
      </div>
    </Dialog>
  );
}

export default ViewProduct;
