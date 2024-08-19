import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFileSignature,
  faCheckCircle,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

export default function Benefits() {
  return (
    <section
      id="best-clinics"
      className="bg-neutral-light  font-montserrat text-grayPrime "
    >
      <div className="container mx-auto mb-10">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">
          Vantagens do Consórcio Auto
        </h2>

        {/* Itens */}
        <div className="grid md:grid-cols-2 gap-8 px-10 mt-10">
          {/* Item 1 */}
          <div className="flex flex-col ">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faClock}
                size="4x"
                className="mx-auto mb-4 text-bluePrime"
              />
              <h3 className="text-2xl font-bold mb-5 text-grayPrime mx-2">
                Consultoria Personalizada
              </h3>
              <p>
                Juntos, definimos o melhor plano para atingir o seu objetivo.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col ">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faFileSignature}
                size="4x"
                className="mx-auto mb-4 text-bluePrime"
              />
              <h3 className="text-2xl font-bold mb-5 text-grayPrime mx-2">
                Contratação simples e rápida
              </h3>
              <p>
                Juntos, definimos o melhor Ao fechar com a gente, assine a
                proposta digital de onde estiver. para atingir o seu objetivo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-10 ">
        {/* Itens */}
        <div className="grid md:grid-cols-2 gap-8 px-10">
          {/* Item 3 */}
          <div className="flex flex-col ">
            <div className="text-center items-center mx-auto">
              <FontAwesomeIcon
                icon={faCheckCircle}
                size="4x"
                className="mx-auto mb-4 text-bluePrime"
              />
              <h3 className="text-2xl font-bold mb-5 text-grayPrime mx-2">
                Chances reais desde o 1º mês
              </h3>
              <p>Após o 1 mês, você já participa das assembleias.</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col ">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faTrophy}
                size="4x"
                className="mx-auto mb-4 text-bluePrime"
              />
              <h3 className="text-2xl font-bold mb-5 text-grayPrime mx-2">
                O momento mais esperado
              </h3>
              <p className="text-lg mx-2">
                Ao ser contemplado, seu crédito é liberado e você conquista seu
                objetivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
