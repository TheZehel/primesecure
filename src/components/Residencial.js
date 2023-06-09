import React from "react";
import imageManager from "./bancoDeImagens";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHouseMedicalFlag,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    name: "Coberturas Exclusivas.",
    description:
      "Proteção para todo o tipo de situação, como por exemplo, incêncios, problemas elétricos ou de encanamento, desastres naturais e muito mais...",
    icon: FontAwesomeIcon,
    iconProps: { icon: faHouse },
  },
  {
    name: "Assistências 24H.",
    description:
      "Acione serviços de assistência em qualquer momento do seu dia.",
    icon: FontAwesomeIcon,
    iconProps: { icon: faHouseMedicalFlag },
  },
  {
    name: "Planos 100% Personalizados.",
    description:
      "Planos feitos sob medida. Você pode personalizar cada centavos das suas coberturas..",
    icon: FontAwesomeIcon,
    iconProps: { icon: faHouseUser },
  },
];

export default function Residencial() {
  //Direciona Click do botão para url externa
  const handleClick = () => {
    window.location.href =
      "https://primesecure.com.br/seguro-residencial-porto-2/";
  };

  return (
    <div className="overflow-hidden bg-white font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-bluePrime">
                + Proteção Para a Sua Casa Com
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Seguro Residencial
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Garanta que nenhum imprevisto venha a atrapalhar a paz do seu
                lar com um Seguro Residencial.
              </p>
              <button
                onClick={handleClick}
                className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-2/4"
              >
                Cotar Agora
              </button>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        {...feature.iconProps}
                        className="absolute left-1 top-1 h-5 w-5 text-bluePrime"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="relative">
            <img
              src={imageManager.imgProdutos.imgResidencial}
              alt="Seguro Residencial"
              className=" inset-0 w-full h-full object-cover object-center rounded-xl shadow-xl   sm:relative sm:w-[57rem] sm:h-auto sm:max-w-none  sm:shadow-none sm:ring-0 sm:ring-transparent  sm:mx-10 sm:my-2  sm:rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
