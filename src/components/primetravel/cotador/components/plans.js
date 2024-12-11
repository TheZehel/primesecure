import React from "react";
import { useState } from "react"
import CardCotacao from "./cardCotacao";

const Plans = ({onSelected }) => {
  // Estados e variáveis estáticas
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const planId = "plano_estatico";

  // Funções fictícias para evitar erro no ESLint
  const updateFormData = (data) => {
    console.log("Form Data Updated:", data);
  };

  const handleNext = () => {
    console.log("Próximo passo executado");
  };

  const handleButtonClick = () => {
    updateFormData({ selectedPlanId: planId });
    setIsSelected(true);
    handleNext();

    // Chama a função recebida via props do ParentComponent
    onSelected();
  };

  return (
    <div>
      <div>
        <CardCotacao/>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-[#313131] ">
          Selecionamos os Melhores Planos Para Você.
        </h2>
        <p className="mb-5">
          Agora com prorrogação de estadia disponível em todos os planos!{" "}
        </p>
      </div>
      <div className="border rounded-lg shadow-lg p-6 max-w-md mx-auto">
        {/* Title */}
        <h5 className="text-gray-500 uppercase text-center font-semibold text-sm">
          PRIME BR 15
        </h5>

        {/* Price and Discount */}
        <div className="text-center mt-4">
          <div className="bg-green-500 text-[#313131] font-bold rounded-full px-3 py-1 text-sm inline-block mt-2">
            65% OFF
          </div>
          <div className="text-xl font-bold text-[#313131]">R$ 104,23</div>
        </div>

        {/* Installments */}
        <div className="text-center mt-6">
          <h6 className="text-lg font-medium">
            <span className="text-gray-600">12x</span>{" "}
            <span className="text-[#313131] text-2xl font-bold">R$ 3,04</span>{" "}
            <span className="text-gray-600">Sem Juros</span>
          </h6>
          <p className="text-green-600 text-sm mt-2 hidden">Cupom Aplicado!</p>
          <p className="text-gray-600">Valor à vista: R$ 36,48</p>
        </div>

        {/* Coverage Details */}
        <div className="text-center mt-4">
          <h6 className="text-gray-700">Cobertura Total:</h6>
          <h6 className="text-bluePrime font-bold">R$ 15.000,00</h6>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center mt-6 space-y-3">
          <button
            onClick={handleButtonClick}
            className={`${isSelected ? "bg-bluePrime2" : "bg-bluePrime"}
          cursor-pointer text-white uppercase text-sm py-2 px-4 rounded-md shadow-md 
          flex items-center justify-center w-full`}
          >
            <input
              className="accent-bluePrime rounded-full mr-2 cursor-pointer"
              type="checkbox"
              checked={isSelected}
              onChange={(e) => e.stopPropagation()}
            />
            {isSelected ? "Selecionado" : "Contratar"}
          </button>

        </div>

        {/* Benefits */}
        <hr className="my-4" />
        <ul className="space-y-2 text-start">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>
            Despesas Médicas e Hospitalares (incluso Covid-19)
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>
            Despesas odontológicas
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>
            Despesas farmacêuticas
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>
            Perda de bagagem
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>
            Atraso de bagagem (superior a 8h)
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>
            Cancelamento ou Atraso de voo (superior a 8h)
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>E muito mais...
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex flex-col items-center mt-6 space-y-3">
          <button type="button" className="text-blue-600 text-sm underline">
            Ver Todas as Coberturas
          </button>
          {/* <button
            onClick={handleNext}
            href="#"
            className="bg-bluePrime cursor-pointer text-white uppercase text-sm py-2 px-4 rounded-md shadow-md"
          >
            Contratar
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Plans;
