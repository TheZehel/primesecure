import React from "react";
import { useEffect , useState } from "react"
import CardCotacao from "./cardCotacao";
import Modal from "react-modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConteudoSessaoInfo from "../../../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../../../modules/SessaoInfoLp";

const Plans = ({onSelected }) => {
  // Estados e variáveis estáticas
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const planId = "plano_estatico";
  const [modalOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);
  
  useEffect(() => {
    if (modalOpen){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    }
  }, [modalOpen]);

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
          
          <button 
          onClick={() => setModalIsOpen(true)}
          type="button" 
          className="text-blue-600 text-sm underline">
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

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
        className="fixed inset-0 flex items-center justify-center p-6 bg-gray-800 bg-opacity-50"
      >
        <div className="animate__animated animate__fadeIn bg-white rounded-lg shadow px-2 py-4 my-10 mx-auto h-100 border border-gray-300  overflow-hidden order-1">
          <div className="flex justify-between items-center mb-4 p-3">
            <h2 className="text-2xl">Todas as Coberturas</h2>
            <button onClick={closeModal} className="bg-transparent">
              <FontAwesomeIcon
                // icon={faTimes}
                className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer"
              />
            </button>
          </div>
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <ConteudoSessaoInfo sessaoInfoLp ={sessaoInfoLp} sessaoInfoId="2" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Plans;
