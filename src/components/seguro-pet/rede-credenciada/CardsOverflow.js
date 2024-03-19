import { Chip } from "@material-tailwind/react";
import { useState } from "react";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function CardsOverflow({ coverageData, onSelectPosition }) {
  console.log("Dados recebidos em CardsOverflow:", coverageData); // Imprimir dados recebidos

  //verifica se coveageData está vazio
  if (coverageData.length === 0) {
    return (
      <div className="mt-10">
        <h4 className="text-bluePrime text-xl font-bold">
          Poxa, é uma pena....
        </h4>
        <p>
          Parece que nenhuma clínica nesta região fez o cadastro para aparecer
          aqui.
        </p>
        <img
          className="w-40 mx-auto"
          src={imageManagerSeguroPet.cardsOverflow.crySvg}
          alt="emoji chorando"
        />
      </div>
    );
  }

  return (
    <div className="">
      {Array.isArray(coverageData) &&
        coverageData.map((clinic, index) => (
          <div
            key={index}
            className="card shadow-uniform-shadow overflow-auto px-5 py-10 cursor-pointer m-5 rounded-lg text-start hover:shadow-2xl transition duration-300 ease-in-out"
            onClick={() => {
              if (
                clinic.position &&
                clinic.position.lat != null &&
                clinic.position.lng != null
              ) {
                console.log(
                  "Card clicked, calling onSelectPosition with:",
                  clinic.position
                );
                onSelectPosition(clinic.position);
              } else {
                console.log(
                  "Card clicked, but position is invalid:",
                  clinic.position
                );
              }
            }}
          >
            {clinic.logo && (
              <img src={clinic.logo} alt={clinic.name} className="w-20" />
            )}
            <h3 className="font-bold text-xl">{clinic.name}</h3>
            <p>{clinic.complete_address}</p>
            <p>{clinic.phone}</p>
            {/*Altera a cora do chip de acordo com o status da clínica.*/}
            <div>
              <Chip
                size="sm"
                value={clinic.attendance}
                className={`text-start w-auto inline-block ${
                  clinic.attendance === "Mediante agendamento."
                    ? "bg-blue-500"
                    : clinic.attendance === "Aberto agora."
                    ? "bg-green-500"
                    : ""
                }`}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
