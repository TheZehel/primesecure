import React, { useState } from "react";
import imageManagerPrimeTravel from "../../bancodeimagens/BancoDeImagensPrimeTravel";
import ModalTravel from "./ModalTravel";
import { Crown, Earth, Gem, Goal, HandHeart, PhoneCall } from "lucide-react";

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
        <div className="grid justify-center md:grid-cols-2 gap-8 px-10 mt-20">
          {/* Item 1 */}
          <div className="flex flex-col items-start">
            <HandHeart className="mb-6 w-[90px] h-[90px] text-grayPrime" />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Proteção na palma da mão
              </h3>
              <p className="text-lg mx-2 text-justify">
                Com a PrimeSecure, você acessa todas as informações de cobertura, assistência e status de reivindicações por meio de um aplicativo. É rápido e fácil!
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-start">
            <Earth className="mb-6 w-[90px] h-[90px] text-grayPrime" />

            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Suporte em qualquer lugar
              </h3>
              <p className="text-lg mx-2 text-justify">
                Quem conta com a PrimeSecure garante acesso a uma ampla rede de hospitais e centros de atendimento em mais de 110 países.
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
            <PhoneCall className="mb-6 w-[90px] h-[90px] text-grayPrime" />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Agilidade no Atendimento              </h3>
              <p className="text-lg text-justify mx-2 ">
                Com a PrimeSecure Seguro-Viagem, você tem suporte via WhatsApp ou ligação todos os dias da semana e em qualquer lugar do mundo. São 74 centrais disponíveis 24 horas para te ajudar.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-start">
            <Crown className="mb-6 w-[90px] h-[90px] text-grayPrime" />

            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Planos Especiais
              </h3>
              <p className="text-lg mx-2 text-justify">
                Faça a extensão do seguro já em viagem e garanta os planos anuais e multiviagens.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Item 5 */}
      <div className="flex justify-center mt-10">
        <div className="flex flex-col items-start text-left px-10 md:items-center md:text-center md:px-0">
          <Gem className="mb-6 w-[90px] h-[90px] text-grayPrime" />
          <div>
            <h3 className="text-2xl font-bold mb-5 text-bluePrime">Sala VIP</h3>
            <p className="text-lg text-justify md:text-center">
              A partir do plano 250, tenha acesso às salas VIPs dos aeroportos de Guarulhos, Recife e Belém.
            </p>
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
