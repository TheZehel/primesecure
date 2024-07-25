import React from "react";
import imageManager from "./bancoDeImagens";

export default function Selos() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
        <h2 className="text-xl sm:text-4xl font-montserrat my-5 text-grayPrime">
          Segurança e Credibilidade:
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            loading="lazy"
            src={imageManager.selos.seloAws}
            alt="Selo Aws"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            loading="lazy"
            src={imageManager.selos.seloPagarme}
            alt="Selo Pagarme"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            loading="lazy"
            src={imageManager.selos.seloSusep}
            alt="Selo Susep"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            loading="lazy"
            src={imageManager.selos.seloGoogle}
            alt="Selo Susep"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            loading="lazy"
            src={imageManager.selos.safeBrowsing}
            alt="Selo Susep"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}
