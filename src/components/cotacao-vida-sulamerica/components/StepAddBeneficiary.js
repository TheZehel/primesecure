import React from "react";
import InputMask from "react-input-mask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function StepAddBeneficiary() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl  my-5 shadow-uniform-shadow rounded-lg">
          <div className="flex justify-end max-w-6xl mr-3 mt-2 p-2">
            <FontAwesomeIcon
              icon={faTrash}
              size="1x"
              color="#06b6d4"
              className="cursor-pointer border border-bluePrime p-2 rounded-full"
            />
          </div>
          <div className="bg-white rounded-b-lg max-w-6xl mx-5 mb-5 p-3 ">
            <div className="flex flex-col sm:flex-row m-auto">
              <InputMask
                type="text"
                className="sm:w-[100%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Nome Completo"
                maxLength="120"
                title="Preencha com o seu nome completo"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <select
                type="select"
                className="sm:w-[33.3%] h-11 cursor-pointer max-w py-1 px-4 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Complemento"
                maxLength="140"
                title="Específique um complemento."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              >
                <option value="" disabled selected>
                  Parentesco
                </option>
                <option value="0">Tio</option>
                <option value="1">Vó</option>
                <option value="2">Colega</option>
                <option value="2">Filho de Tiquin</option>
              </select>
              <InputMask
                type="text"
                className="sm:w-[33.3%] max-w h-11 px-4 py-1 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Data de Nascimento"
                maxLength="20"
                mask="99/99/9999"
                title="Peso - Exemplo: 80kg"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                className="sm:w-[33.3%] max-w h-11 px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Percentual%"
                maxLength="10"
                mask="999%"
                title="Percentual %"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <button className="border border-bluePrime p-4 mr-2 rounded-lg font-bold">
          <span className="text-lg">+</span> Adicionar Beneficiário
        </button>
      </div>
      <div className=" m-auto max-w-6xl rounded-xl grid sm:grid-cols-2 grid-cols-1">
        <button className="border border-bluePrime p-2 mr-2 rounded-lg font-bold">
          Voltar para planos
        </button>
        <button className="bg-bluePrime p-2 ml-2 rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300">
          Avançar
        </button>
      </div>
    </div>
  );
}
