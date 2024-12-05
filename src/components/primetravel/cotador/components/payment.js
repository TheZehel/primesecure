import React from "react";
import { useState } from "react";
import InputMask from "react-input-mask";
import chip from "../../../../../src/assets/svg/payment-card/cc-chip.svg";
import imgDefault from "../../../../../src/assets/svg/payment-card/cc-icon.svg";
//import LoadingAnimation from "loadingSvg";

const Payment = () => {
  let handleAddCard = 0;

  console.log(handleAddCard);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mx-2 flex flex-col lg:flex-row gap-8">
      {/* Formulário */}
      <div className="flex-2 mx-5">
        <h2 className="text-3xl font-bold text-[#313131] mb-4">Pagamento</h2>
        <p className="mb-4">Aqui você pode listar os planos disponíveis...</p>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="card-number" className="font-semibold">
              Numero do Cartão
            </label>
            <InputMask
              id="card-number"
              className="border-bluePrime border rounded-md h-10 px-4 w-full text-grayPrime uppercase focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bluePrime2 focus:border-none"
              mask={"9999 9999 9999 9999"}
              maskChar={null}
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="card-holder" className="font-semibold">
              Nome do titular
            </label>
            <input
              id="card-holder"
              className="border-bluePrime border rounded-md h-10 px-4 w-full text-grayPrime uppercase focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bluePrime2 focus:border-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 grid gap-1.5">
              <label htmlFor="expiration-date" className="font-semibold">
                Expiração
              </label>
              <InputMask
                id="expiration-date"
                className={`border-bluePrime border rounded-md h-10 px-4 w-full text-grayPrime uppercase focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bluePrime2 focus:border-none`}
                mask={"99/99"}
                maskChar={null}
              />
            </div>

            <div className="flex-1 grid gap-1.5">
              <label htmlFor="secutiry-code" className="font-semibold">
                CVV
              </label>
              <InputMask
                id="secuty-code"
                className={`border-bluePrime border rounded-md h-10 px-4 w-full text-grayPrime uppercase focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bluePrime2 focus:border-none`}
                mask={"999"}
                maskChar={null}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleAddCard}
          className="mt-4 w-full h-[50px] flex justify-center items-center py-4 bg-bluePrime rounded-md cursor-pointer border-none font-bold text-lg leading-7 transition-all duration-300 hover:brightness-110 text-white"
        >
          {/* {isLoading ? <LoadingAnimation /> : "Realizar Pagamento"} */}
          Realizar pagamento
        </button>
      </div>

      <div className="flex-1 mx-5 flex flex-col">
        {/* Cartão */}
        <div className="py-6 px-6 bg-gradient-to-r from-bluePrime to-bluePrime2 rounded-xl shadow-xl  mx-5 justify-center items-center object-center lg:mx-0 lg:max-w-none max-h-[300px]">
          <div className="">
            <div className="flex justify-between">
              <div>
                <img src={imgDefault} alt="" />
              </div>
              {/* <CardBrandImage cardNumber={cardNumber}/> */}
            </div>
            <div className="flex justify-between items-center mb-6"></div>
            <div className="text-white text-2xl font-bold text-start">
              {/* {ccNumberFormated(cardNumber) || "0000 0000 0000 0000"} */}
              0000 0000 0000 0000
            </div>
            <div className="mt-3">
              <div className="text-md font-bold text-gray-300 text-start">
                Nome do titular
              </div>
              <div className="text-sm font-bold text-white uppercase text-start">
                {/* {cardHolder || "NOME DO TITULAR"} */}
                Nome do titular
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div>
                <div className="text-sm text-gray-300">Expiração</div>
                <div className="text-sm font-bold text-white uppercase">
                  {/* {expirationDate || "00/00"} */}
                  00/00
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-300">CVV</div>
                <div className="text-sm font-bold text-white uppercase">
                  {/* {cvc || "000"} */}
                  000
                </div>
              </div>
              <div>
                <img src={chip} alt="" />
              </div>
            </div>
          </div>

        </div>
        {/* Sessão */}
        <div className="m-2 p-3 bg-white rounded-lg shadow-md border-2 border-bluePrime">
          <div className="text-black font-bold text-left">Detalhes da compra:</div>
          <div className="text-left text-gray-600 text-sm">
          
          <div>Nome e Sobrenome: </div>
          <div>Endereço com numero: </div>
          <div>CPF: </div>
          <div>Preço: </div>
          <div>Destino: </div>
          <div>Data e hora da viagem: ida-volta</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;
