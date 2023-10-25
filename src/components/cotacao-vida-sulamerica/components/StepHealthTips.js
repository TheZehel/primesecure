import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function StepHealthTips() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="sm:mx-5 md:mx-10 lg:mx-10  mx-2 max-w-6xl my-5 rounded-xl shadow-uniform-shadow sm:p-20">
          <div className="m-2">
            <FontAwesomeIcon icon={faHeart} color="#06b6d4" size="6x" />
          </div>
          <div className="p-2">
            <p>
              As próximas perguntas são sobre a sua saúde e é necessário o
              preenchimento correto para realizar a contratação. Lembrando que
              as respostas precisam ser informadas pelo próprio cliente e não
              por um terceiro ou consultor de vendas.
            </p>
          </div>
          <div className="text-start mx-4 my-4 flex items-center justify-center sm:items-center">
            <input
              className="accent-bluePrime sm:mt-0 mt-1 rounded-full"
              type="checkbox"
              name=""
              id=""
            />
            <p className="pl-2">
              Concordo que sou o próprio cliente e desejo prosseguir
            </p>
          </div>
        </div>
      </div>
      <div className=" sm:m-auto  m-1 max-w-6xl rounded-xl grid sm:grid-cols-2 grid-cols-1">
        <button className="border border-bluePrime p-2 sm:mr-2 m-1 rounded-lg font-bold">
          Voltar para planos
        </button>
        <button className="bg-bluePrime p-2 sm:ml-2 m-1 rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300">
          Avançar
        </button>
      </div>
    </div>
  );
}
