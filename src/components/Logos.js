import React from "react";
import imageManager from "./bancoDeImagens";

export default function Logos() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Em Parceria Com As Maiores Do Mercado De Seguros
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            loading="lazy"
            src={imageManager.parceiros.logoPortoSeguro}
            alt="Logo Porto Seguro"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            loading="lazy"
            src={imageManager.parceiros.logoSulAmerica}
            alt="Logo SulAmérica"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            loading="lazy"
            src={imageManager.parceiros.logoOmint}
            alt="Logo Omint"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            loading="lazy"
            src={imageManager.parceiros.logoAzos}
            alt="Logo Azos"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            loading="lazy"
            src={imageManager.parceiros.logoSuhai}
            alt="Logo Omint"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}
