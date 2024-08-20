import React from "react";

const CenteredImage = () => {
  return (
    <div className="flex justify-center items-center w-full  mx-auto mt-6">
      <img
        src="https://storage.googleapis.com/primesecure/auto-02.png"
        alt="Automóvel"
        className=" max-w-[300px] sm:max-w-[800px] "
      />
    </div>
  );
};

export default CenteredImage;
