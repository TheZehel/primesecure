import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faCircle } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

export default function PageContract() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-grayPrime">
      <div className="sm:mx-auto sm:w-full sm:max-w-[650px]">
        <h2 className="mt-10 text-start text-2xl sm:text-3xl font-bold leading-9 tracking-tight text-grayPrime">
          Seu Contrato
        </h2>
        {/* Card Header*/}
        <div className="border-grayPrime/30 border-x-[1px] border-t-[1px] rounded-t-xl mt-5 flex bg-bluePrime2  items-center p-5 justify-between">
          <div className="flex justify-between space-x-3 items-center">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-xl  justify-center text-white"
            />
            <h3 className="text-start font-bold text-xl text-white">
              Nome do Seguro
            </h3>
          </div>
          <div className="flex justify-between space-x-3 text-[#38f2a5] font-bold items-center">
            <FontAwesomeIcon icon={faCircle} className="text-sm" />
            <p>Protegido</p>
          </div>
        </div>
        {/* Card Body */}
        <div>
          <div className="border-grayPrime/30 border-x-[1px] flex justify-between items-center p-4">
            <h3 className="font-semibold">Titulo: </h3>
            <p>descrição</p>
          </div>
          <div className="border-grayPrime/30 border-x-[1px] flex justify-between items-center p-4">
            <h3 className="font-semibold">Titulo: </h3>
            <p>descrição</p>
          </div>
          <div className="border-grayPrime/30 border-x-[1px] flex justify-between items-center p-4">
            <button className="mx-auto w-[600px]  bg-bluePrime rounded-md p-4 text-white cursor-pointer transition duration-300 ease-in-out hover:scale-105 transform font-semibold">
              Acionar Seguro
            </button>
          </div>
          <div className="border-grayPrime/30 border-x-[1px] flex justify-between items-center px-4">
            <button className="w-[600px] px-4 pb-4 text-red-400 cursor-pointer font-normal">
              cancelar contrato
            </button>
          </div>
        </div>
        {/* Card Footer */}
        <div className="border-grayPrime/30 border-x-[1px] border-b-[1px] flex justify-between items-center px-4 rounded-b-xl">
          <button
            className="text-grayPrime pb-4 font-medium"
            onClick={handleBack}
          >
            Voltar
          </button>
        </div>
      </div>
    </section>
  );
}
