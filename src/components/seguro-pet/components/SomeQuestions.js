import React from "react";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function SomeQuestions() {
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
              src={imageManagerSeguroPet.SomeQuestions.Calendar}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Preciso esperar o tempo de carência para usar?
              </h3>
              <p className="text-justify mx-2">
                O período de aguardo para usar os procedimentos são curtos. Mas,
                caso precise, você pode antecipar as carências de alguns
                procedimentos no cartão de crédito e utilizar o plano
                imediatamente após a microchipagem.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerSeguroPet.SomeQuestions.Hearts}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[170px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                O que acontece se utilizar todos os limites do plano?
              </h3>
              <p className="text-justify mx-2">
                Alguns procedimentos dos planos possuem limites, outros não.
                Caso você precise, é possível adquirir mais limites. Não
                deixamos ninguém na mão.
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
              src={imageManagerSeguroPet.SomeQuestions.paymentCards}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
                Como as coparticipações me fazem economizar?
              </h3>
              <p className=" text-justify mx-2 ">
                Ao invés de pagar caro por procedimentos que não vai usar, você
                terá uma mensalidade muito mais acessível e pagará um valor
                baixo de coparticipação, apenas quando usar o plano.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-start">
            <img
              src={imageManagerSeguroPet.SomeQuestions.dogSmiling}
              alt="Ilustração de um Gato dormindo"
              className="mb-6 w-[90px] h-[90px]"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold mb-5 text-bluePrime mx-2">
                Caso precise de procedimentos não cobertos pelo plano, como
                faço?
              </h3>
              <p className="text-justify  mx-2">
                É possível contratar alguns procedimentos mais específicos que
                não estão cobertos nos planos por um valor mais acessível no seu
                Espaço do Cliente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
