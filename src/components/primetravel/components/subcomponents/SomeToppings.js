import React, { useState } from "react";
import imageManagerPrimeTravel from "../../bancodeimagens/BancoDeImagensPrimeTravel";
import ModalTravel from "./ModalTravel";

export default function SomeToppings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <section
      id="best-clinics"
      className="bg-neutral-light py-9 font-montserrat text-grayPrime "
    >
      <div className="container mx-auto mb-10">
        <h2 className="text-center text-primary font-bold mb-13 text-2xl sm:text-5xl my-5">
          Conheça algumas das nossas coberturas
        </h2>

        {/* Itens */}
        <div className="grid md:grid-cols-2 gap-8 px-10 mt-20">
          {/* Item 1 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerPrimeTravel.SomeToppings.iconAirplane}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Atraso de Voo (até 12H)
              </h3>
              <p className="text-lg mx-2 text-justify">
                A política cobre reembolsos para despesas de alimentação e
                hospedagem em caso de atrasos de voo de 12 horas ou mais,
                causados por clima severo, questões trabalhistas ou quebras
                inesperadas na aeronave.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerPrimeTravel.SomeToppings.iconCancel}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Cancelamento de Viagem
              </h3>
              <p className="text-lg mx-2 text-justify">
                Consiste no reembolso das despesas não reembolsáveis com a
                aquisição de pacotes turísticos e/ou serviços de viagens, como
                transporte e hospedagem, na ocorrência de evento coberto que
                impeça o segurado de iniciar a viagem.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-10 ">
        {/* Itens */}
        <div className="grid md:grid-cols-2 gap-8 px-10">
          {/* Item 3 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerPrimeTravel.SomeToppings.iconSuitCase}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Perda de bagagem
              </h3>
              <p className="text-lg text-justify mx-2 ">
                A política prevê reembolso de despesas com artigos de uso
                pessoal se a bagagem do segurado for atrasada em 8 horas ou mais
                pela companhia transportadora.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerPrimeTravel.SomeToppings.iconConcierge}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Concierge
              </h3>
              <p className="text-lg mx-2 text-justify">
                O Serviço de Concierge, disponível 24/7, auxilia os
                beneficiários com informações sobre ingressos para shows,
                viagens, aluguel de veículos e reservas de teatro em grandes
                cidades do mundo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botão 
      <div>
        <button
          onClick={openModal}
          className="bg-bluePrime font-bold text-white w-90 px-20 py-4 rounded-lg text-2xl mt-7 animate-pulse"
        >
          Cotar Agora
        </button>
      </div>

      {isModalOpen ? <ModalTravel /> : null}*/}
    </section>
  );
}
