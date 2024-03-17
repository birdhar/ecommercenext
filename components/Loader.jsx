import React from "react";
import { Blocks } from "react-loader-spinner";

function Loader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[rgba(75,75,75,0.2)]">
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperclassName="blocks-wrapper"
        visible={true}
      />
    </div>
  );
}

export default Loader;
