import React from "react";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function BestClinics({ openModalStep }) {
  const openModal = (step) => {
    openModalStep(step);
  };
  return (
    <section
      id="best-clinics"
      className="bg-neutral-light py-9 font-montserrat text-grayPrime "
    >
      <div className="container mx-auto mb-10">
        <h2 className="text-center text-primary font-bold mb-13 text-2xl sm:text-5xl my-5">
          Tenha acesso ao melhor atendimento da sua região
        </h2>

        {/* Itens */}
        <div className="grid md:grid-cols-2 gap-8 px-10 mt-20">
          {/* Item 1 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerSeguroPet.BestClinics.redeHeart}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Atendimento a domicílio
              </h3>
              <p className="text-justify mx-2">
                Nossa rede credenciada conta com profissionais que atendem seu
                pet a domicílio. Assim, ele pode ser cuidado no conforto de
                casa, sem o estresse de sair.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerSeguroPet.BestClinics.redeClock}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Plantão 24h
              </h3>
              <p className="text-justify mx-2">
                Contamos com clínicas veterinárias com Plantão 24h, para que seu
                pet possa sempre ser atendido quando o imprevisto rolar.
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
              src={imageManagerSeguroPet.BestClinics.redeDoctor}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Atendimento com especialistas
              </h3>
              <p className="text-lg text-justify mx-2 ">
                Neurologistas, dermatologistas, fisioterapeutas,
                oftalmologistas, ortopedistas, anestesistas, endocrinologistas
                podem estar próximos de você, confira na nossa rede.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerSeguroPet.BestClinics.redeStar}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Somente as melhores clínicas
              </h3>
              <p className="text-lg mx-2">
                Todos nossos atendimentos são avaliados pelos clientes, somente
                as clínicas mais bem avaliadas permanecem na nossa rede. Só o
                melhor para os pets, né?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botão */}
      <div>
        <button
          onClick={() => openModal(2)}
          className="bg-bluePrime font-bold text-white w-90 px-20 py-4 rounded-lg text-2xl mt-7 animate-pulse"
        >
          Cotar Agora
        </button>
      </div>
    </section>
  );
}
