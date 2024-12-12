import React from "react"

export default function NewPlans() {
    return (
        <div className="relative overflow-hidden bg-white">
      <div className="py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-[1200px]">
            <h1 className="text-4xl font-bold tracking-tight text-bluePrime sm:text-6xl text-start">
              Nossos planos
            </h1>
            <h3 className="mt-4 text-xl text-grayPrime font-bold text-start">
              Nacionais e internacionais
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
              {/* Card Lazer */}
              <div
                className="relative w-full h-[200px]"
                style={{
                  backgroundImage: `url("https://storage.googleapis.com/primesecure/viagem-lazer.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
                {/* Conteúdo */}
                <h3 className="relative text-whitePrime font-bold text-lg m-4">Lazer</h3>
                <p className="relative m-4 text-whitePrime">
                  Seguro viagem ideal pra quem tem uma viagem marcada para curtir suas férias no Brasil ou no exterior.
                </p>
              </div>
  
              {/* Card Negócios */}
              <div
                className="relative w-full h-[200px]"
                style={{
                  backgroundImage: `url("https://storage.googleapis.com/primesecure/viagem-neg%C3%B3cios.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
                {/* Conteúdo */}
                <h3 className="relative text-whitePrime font-bold text-lg m-4">Negócios</h3>
                <p className="relative m-4 text-whitePrime">
                  Viagens a trabalho também estão incluídas nos nossos planos.
                  Afinal, nossos serviços estão à disposição seja qual for a sua
                  necessidade.
                </p>
              </div>
  
              {/* Card Esportes */}
              <div
                className="relative w-full h-[200px]"
                style={{
                  backgroundImage: `url("https://storage.googleapis.com/primesecure/viagem-esportes.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
                {/* Conteúdo */}
                <h3 className="relative text-whitePrime font-bold text-lg m-4">Esportes</h3>
                <p className="relative m-4 text-whitePrime">
                  Cobertura EXCLUSIVA para atletas federados em viagens de competição e cobertura de esporte e lazer, sem custo adicional.
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              ></div>
              <div className="flex justify-self-center">
                <button
                  onClick={() => setModalIsOpen(true)}
                  className="inline-block rounded-md border border-transparent
                    bg-bluePrime px-8 py-3 text-center font-medium text-white
                    hover:bg-bluePrime2"
                >
                  Ver cobertura
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    );
}