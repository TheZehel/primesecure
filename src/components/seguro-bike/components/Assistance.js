import imageManagerSeguroBike from "../banco-de-imagens/BancoDeImagensSeguroBike";

export default function Assistance() {
  return (
    <section>
      <div className="mx-auto">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">
          Assistências
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-[1200px] mx-auto  sm:mt-20 space-x-4">
        <div className="max-w-[250px] items-center justify-center">
          <img
            src={imageManagerSeguroBike.assistance.mobiKey}
            alt="icone chave"
            className="mx-auto"
          />
          <h2 className="mt-5 text-grayPrime font-bold text-xl">Chaveiro</h2>
          <p className="mt-5">
            Chaveiro em caso de perda ou quebra das chaves que prendem a
            bicicleta protegida, impedindo o seu uso.
          </p>
        </div>
        <div className="max-w-[250px]">
          <img
            src={imageManagerSeguroBike.assistance.mobiCar}
            alt="icon carro"
            className="mx-auto"
          />
          <h2 className="mt-5 text-grayPrime font-bold text-xl">Reboque</h2>
          <p className="mt-5">
            Transporte adequado para o serviço de leva e traz da bicicleta
            protegida, em caso de acidente ou mal súbito.
          </p>
        </div>
        <div className="max-w-[250px]">
          <img
            src={imageManagerSeguroBike.assistance.mobiTruck}
            alt="icone caminhão"
            className="mx-auto w-[100px] h-[100px]"
          />
          <h2 className="mt-5 text-grayPrime font-bold text-xl">Transporte</h2>
          <p className="mt-5">
            Assistência criada para beneficiar e levar o ciclista em caso de
            acidente ou mal súbito.
          </p>
        </div>
      </div>
    </section>
  );
}
