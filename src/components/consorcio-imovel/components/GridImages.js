import React from "react";

const GridImages = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full px-4 mx-auto mt-6 overflow-hidden">
      <div className="flex justify-center items-center">
        <img
          src="https://storage.googleapis.com/primesecure/lp-consorcio-imovel/tabela-cons%C3%B3rcio%20(1).jpeg"
          alt="Imóvel 1"
          className="sm:w-[600px] lg:w-[800px]"
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://storage.googleapis.com/primesecure/lp-consorcio-imovel/tabela-cons%C3%B3rcio%20(2).jpeg"
          alt="Imóvel 2"
          className="sm:w-[600px] lg:w-[800px]"
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://storage.googleapis.com/primesecure/lp-consorcio-imovel/tabela-cons%C3%B3rcio%20(3).jpeg"
          alt="Imóvel 3"
          className="sm:w-[600px] lg:w-[800px]"
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://storage.googleapis.com/primesecure/lp-consorcio-imovel/tabela-cons%C3%B3rcio%20(4).jpeg"
          alt="Imóvel 4"
          className="sm:w-[600px] lg:w-[800px]"
        />
      </div>
    </div>
  );
};

export default GridImages;
