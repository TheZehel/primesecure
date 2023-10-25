import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPeopleArrows } from "@fortawesome/free-solid-svg-icons";

export default function StepSelectBeneficiary() {
  // seta estado de seleção do botão
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl mt-5 mb-1 rounded-xl grid sm:grid-cols-2 grid-cols-1 ">
          <button
            onClick={() => handleClick("button1")}
            className={`m-2 p-5 shadow-uniform-shadow rounded-lg border hover:border-bluePrime transition ease-in-out delay-75 ${
              selectedButton === "button1"
                ? "bg-bluePrime text-white b -translate-y-2"
                : "hover:-translate-y-2 "
            }`}
          >
            <div className="m-2">
              <FontAwesomeIcon
                icon={faHouse}
                color={selectedButton === "button1" ? "#fff" : "#06b6d4"}
                size="5x"
              />
            </div>
            <div className="p-2">
              <h2 className="text-2xl font-semibold my-3">
                Enviar para herdeiros legais
              </h2>
              <p>
                Para quem prefere tranquilidade sobre as mudanças de
                configuração da família, como novos nascimentos ou divórcios.
              </p>
            </div>
          </button>
          <button
            onClick={() => handleClick("button2")}
            className={`m-2 p-5 shadow-uniform-shadow rounded-lg border hover:border-bluePrime transition ease-in-out delay-75 ${
              selectedButton === "button2"
                ? "bg-bluePrime text-white -translate-y-2"
                : "hover:-translate-y-2"
            }`}
          >
            <div className="m-2">
              <FontAwesomeIcon
                icon={faPeopleArrows}
                color={selectedButton === "button2" ? "#fff" : "#06b6d4"}
                size="5x"
              />
            </div>
            <div className="p-2">
              <h2 className="text-2xl font-semibold my-3">
                Adicionar Beneficiários
              </h2>
              <p>
                Para quem prefere ter controle de quem será beneficiado, com
                processo de indenização mais rápido.
              </p>
            </div>
          </button>
        </div>

        <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl mt-5 mb-1 rounded-xl grid sm:grid-cols-2 grid-cols-1">
          <button className="border border-bluePrime p-2 m-2 rounded-lg font-bold">
            Voltar
          </button>
          <button className="bg-bluePrime p-2 m-2 rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300">
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}
