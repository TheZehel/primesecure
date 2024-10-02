import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faWheelchair,
  faPlantWilt,
} from "@fortawesome/free-solid-svg-icons";

const coberturas = [
  {
    id: 1,
    title: "Morte Por Acidente",
    description: "Proteção para você em caso de morte causada por acidente.",
    icon: faCross,
  },
  {
    id: 2,
    title: "Invalidez Por Acidente",
    description:
      "Proteção para você em caso de uma invalidez causada por acidente.",
    icon: faWheelchair,
  },
  {
    id: 5,
    title: "Assistência Funeral Familiar",
    description:
      "Cobre o cônjuge e filhos até 21 anos, garantindo apoio nos momentos mais difíceis.",
    icon: faPlantWilt,
  },
];

export default function CoberturasSlider() {
  return (
    <div className="font-montserrat">
      <h2 className="text-center text-4xl font-bold text-grayPrime pt-10">
        Conheça algumas de nossas coberturas e assistências
      </h2>
      <p className="pt-4 text-center">
        Coberturas que garantem a sua segurança e a de sua família.
      </p>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
        {coberturas.map((cobertura) => (
          <div
            key={cobertura.id}
            className="border-bluePrime border shadow-lg px-8 py-10 rounded-lg flex flex-col items-center"
          >
            <FontAwesomeIcon
              icon={cobertura.icon}
              size="2x"
              className="text-bluePrime"
            />
            <h2 className="pt-4 font-bold text-center text-lg">
              {cobertura.title}
            </h2>
            <p className="pt-2 text-center text-sm">{cobertura.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
