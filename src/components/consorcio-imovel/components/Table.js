import React from "react";

const CenteredImage = () => {
  return (
    <div className="flex justify-center items-center w-full  mx-auto mt-6">
      <img
        src="https://storage.googleapis.com/primesecure/imovel-01.png"
        alt="Imóvel"
        className=" max-w-[300px] sm:max-w-[800px] "
      />
    </div>
  );
};

export default CenteredImage;
