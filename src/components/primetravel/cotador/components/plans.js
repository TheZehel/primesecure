import React, { useState } from "react";
import CardCotacao from "./cardCotacao";
import ModalCoberturas from "./modalCoberturas";
import EditQuote from "./editQuote";


const Plans = ({ onSelected }) => {
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
        <CardCotacao />
      </div>
      <div>

        {/* Adicionando o EditQuote no topo */}
        <EditQuote />
        <h2 className="text-3xl font-bold text-[#313131] ">
          Selecionamos os Melhores Planos Para Você.
        </h2>
        <p className="mb-5">
          Agora com prorrogação de estadia disponível em todos os planos!
        </p>
      </div>
      <div className="border rounded-lg shadow-lg p-6 max-w-md mx-auto">
        {/* Title */}
        <h5 className="text-gray-500 uppercase text-center font-semibold text-sm">
          PRIME BR 15
        </h5>

        <div className="text-center mt-6">
          {/* Preço Parcelado e Desconto */}
          <div className="flex flex-col items-center">
            <h6 className="text-lg font-medium">
              <span className="text-gray-600">12x</span>{" "}
              <span className="text-[#313131] text-2xl font-bold">R$ 3,04</span>{" "}
              <span className="text-gray-600">Sem Juros</span>
            </h6>
            <p className="bg-green-500 font-bold text-sm mt-1 text-white py-1 px-2 rounded-md">
              65% OFF
            </p>

          </div>

          {/* Preço à Vista */}
          <p className="text-gray-600 mt-2 text-sm">
            <span className="font-bold">R$ 36,48</span>{" "}
            <span className="font-normal">à vista</span>
          </p>

          {/* Linha de Separação */}
          <div className="border-t border-gray-300 my-4 w-3/4 mx-auto"></div>

          {/* Cobertura Total */}
          <div className="flex justify-between items-center text-sm px-4">
            <h6 className="text-gray-700 font-medium">Cobertura Total:</h6>
            <h6 className="text-bluePrime font-bold">R$ 15.000,00</h6>
          </div>
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

        {/* Botão para abrir o novo modal */}
        <div className="flex flex-col items-center mt-6 space-y-3">
          <ModalCoberturas />
        </div>
      </div>
    </div>
  );
};

export default Plans;
