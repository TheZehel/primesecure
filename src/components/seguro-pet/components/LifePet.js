import React from "react";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function LifePet({ openModalStep }) {
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
          Como fazer o pet viver mais ao seu lado?
        </h2>

        {/* Itens */}
        <div className="grid md:grid-cols-2 gap-8 px-10 mt-20">
          {/* Item 1 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerSeguroPet.LifePet.iconSyringe}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Vacinação
              </h3>
              <p className="text-justify mx-2">
                As vacinas previnem uma série de doenças. O protocolo
                obrigatório de vacinas coberto pelo plano vai proteger seu pet
                de: raiva, gripe, cinomose, parainfluenza, parvovirus,
                leptospirose, rinotraqueite, leucemia, entre outras.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerSeguroPet.LifePet.iconCheckUp}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Check ups
              </h3>
              <p className="text-justify mx-2">
                Muitas doenças só apresentam sintomas em fases avançadas. Graças
                aos check ups, conseguimos identificar muitas doenças a tempo de
                tratá-las! Por isso é de extrema importância fazer exames de
                rotina.
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
              src={imageManagerSeguroPet.LifePet.iconGenre}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Castração
              </h3>
              <p className=" text-justify mx-2 ">
                Além de controlar a natalidade, a castração também previne
                doenças que podem ser perigosas para os pets.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerSeguroPet.LifePet.iconDoctor2}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold mb-5 text-bluePrime mx-2">
                Nunca adiar uma ida ao veterinário
              </h3>
              <p className="text-justify  mx-2">
                Muitos tutores esperam os sintomas do pet piorarem para levá-los
                ao médico veterinário. Com um plano de saúde, você não vai
                precisar hesitar em levar seu pet à clínica mais próxima.
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
