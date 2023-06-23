import React from "react";
import imageManager from "./bancoDeImagens";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHouse, faSliders } from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    name: "Coberturas Exclusivas.",
    description:
      "Cobertura COVID-19, assistência médica, bagagem perdida e cancelamentos. +30 de Cobeturas!",
    icon: FontAwesomeIcon,
    iconProps: { icon: faHouse },
  },
  {
    name: "Assistências 24H.",
    description:
      "Assistência Global 24Hrs por dia 7 dias por semana via Whatsapp.",
    icon: FontAwesomeIcon,
    iconProps: { icon: faClock },
  },
  {
    name: "Planos 100% Personalizados.",
    description:
      "Personalize o seu plano de acordo com as suas necessidades, quantidade/idade dos passageiros.",
    icon: FontAwesomeIcon,
    iconProps: { icon: faSliders },
  },
];

export default function Example() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="relative order-2 sm:order-1">
            <img
              src={imageManager.imgProdutos.imgPrimeTravel}
              alt="Product screenshot"
              className="w-full h-full object-cover object-center rounded-xl sm:relative sm:w-[57rem] sm:h-auto sm:max-w-none  sm:shadow-none sm:ring-0 sm:ring-transparent  sm:mx-10 sm:my-2  sm:rounded-lg ml-auto mr-0 lg:transform lg:-translate-x-[45%] z-[-1] sm:z-10"
            />
          </div>
          <div className="lg:pl-8 lg:pt-4 order-1 sm:order-2">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-bluePrime font-sans">
                Sua Viagens Mais Seguras Com
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl font-sans">
                Seguro Viagem Prime Travel
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 font-sans">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </p>
              <button class="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-2/4">
                Cotar Agora
              </button>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none font-sans">
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
        </div>
      </div>
    </div>
  );
}
