import React from "react";

const GridImages = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full px-4 mx-auto mt-6 overflow-hidden">
      <div className="flex justify-center items-center">
        <img
          src="https://storage.googleapis.com/primesecure/consorcio-auto/WhatsApp%20Image%202024-09-09%20at%2013.43.59.jpeg"
          alt="Imóvel 1"
          className="sm:w-[600px] lg:w-[800px]"
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://storage.googleapis.com/primesecure/consorcio-auto/d7239837-aa73-40c4-9b54-6f1aa61a69b3.jfif"
          alt="Imóvel 2"
          className="sm:w-[600px] lg:w-[800px]"
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://storage.googleapis.com/primesecure/consorcio-auto/WhatsApp%20Image%202024-09-09%20at%2013.44.00.jpeg"
          alt="Imóvel 3"
          className="sm:w-[600px] lg:w-[800px]"
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://storage.googleapis.com/primesecure/consorcio-auto/WhatsApp%20Image%202024-09-09%20at%2013.44.00%20(1).jpeg"
          alt="Imóvel 4"
          className="sm:w-[600px] lg:w-[800px]"
        />
      </div>
    </div>
  );
};

export default GridImages;
