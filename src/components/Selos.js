import React from "react";
import imageManager from "./bancoDeImagens";

export default function Selos() {
  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Segurança e Credibilidade:
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={imageManager.selos.seloAws}
            alt="Transistor"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={imageManager.selos.seloPagarme}
            alt="Reform"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}
