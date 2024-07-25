import React from "react";

export default function Advantages() {
  return (
    <section
      id="best-clinics"
      className="bg-neutral-light  font-montserrat text-grayPrime "
    >
      <div className="container mx-auto mb-10">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">
          Os melhores benefícios para você
        </h2>

        {/* Itens */}
        <div className="grid md:grid-cols-2 gap-8 px-10 mt-10">
          {/* Item 1 */}
          <div className="flex flex-col ">
            <div className="text-center">
              <img
                className="mx-auto"
                src="https://storage.googleapis.com/primesecure/icon-time.png"
                alt=""
              />
              <h3 className="text-2xl font-bold mb-5 text-grayPrime mx-2">
                Sem carência
              </h3>
              <p>
                Tenha a disposição os benefícios do seu seguro assim que a
                apólice for emitida.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col ">
            <div className="text-center">
              <img
                className="mx-auto"
                src="https://storage.googleapis.com/primesecure/icon-multa.png"
                alt=""
              />
              <h3 className="text-2xl font-bold mb-5 text-grayPrime mx-2">
                Sem multa
              </h3>
              <p>
                Cancele seu seguro a qualquer momento, sem nenhum custo
                adicional. Garantimos total liberdade e flexibilidade.
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
              <img
                className="mx-auto"
                src="https://storage.googleapis.com/primesecure/icon-comfort.png"
                alt=""
              />
              <h3 className="text-2xl font-bold mb-5 text-grayPrime mx-2">
                Comodidade
              </h3>
              <p>
                Aproveite processos simplificados e um serviço que prioriza seu
                conforto, desde a contratação até o uso dos benefícios.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col ">
            <div className="text-center">
              <img
                className="mx-auto"
                src="https://storage.googleapis.com/primesecure/icon-fast.png"
                alt=""
              />
              <h3 className="text-2xl font-bold mb-5 text-grayPrime mx-2">
                Agilidade
              </h3>
              <p className="text-lg mx-2">
                Beneficie-se de respostas rápidas e eficientes em todas as suas
                necessidades de seguro, garantindo paz de espírito sem espera.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
