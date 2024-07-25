import imageManagerSeguroCelularKakau from "../banco-de-imagens/BancoDeImagensSeguroCelularKakau";

export default function Assistance() {
  return (
    <section>
      <div className="mx-auto">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">Comodidade</h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-[1200px] mx-auto  sm:mt-20 space-x-4">
        <div className="max-w-[250px] items-center justify-center">
          <img
            src={imageManagerSeguroCelularKakau.Assistance.protegeSmrt}
            alt="icone chave"
            className="mx-auto"
          />
          <h2 className="mt-5 text-grayPrime font-bold text-xl">Comodidade</h2>
          <p className="mt-5">
            Cobertura imediata após a contratação e a confirmação da assinatura.
          </p>
        </div>
        <div className="max-w-[250px]">
          <img
            src={imageManagerSeguroCelularKakau.Assistance.protegeLike}
            alt="icon carro"
            className="mx-auto"
          />
          <h2 className="mt-5 text-grayPrime font-bold text-xl">
            Sem carência
          </h2>
          <p className="mt-5">
            Cobertura imediata após a contratação e a confirmação da assinatura.
          </p>
        </div>
        <div className="max-w-[250px]">
          <img
            src={imageManagerSeguroCelularKakau.Assistance.protegeCash}
            alt="icone caminhão"
            className="mx-auto"
          />
          <h2 className="mt-5 text-grayPrime font-bold text-xl">Sem multa</h2>
          <p className="mt-5">
            Você não paga nada para cancelar sua assinatura.
          </p>
        </div>
      </div>
    </section>
  );
}
