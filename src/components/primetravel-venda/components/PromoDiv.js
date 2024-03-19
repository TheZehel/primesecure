//imagens
import imageManagerPrimeTravelLpVenda from "../bancodeimagens/BancoDeImgsTravelVenda";

export default function PromoDiv() {
  return (
    <div className="max-w-screen-xl bg-white  rounded-t-lg mx-auto">
      <div className="py-2">
        <h1 className="font-bold text-4xl text-grayPrime sm:text-6xl">
          Proteção Completa na Sua Viagem
        </h1>
        {/*<p className="font-medium text-justify sm:text-center mx-5 my-2">
          Viaje com tranquilidade para qualquer destino: sua segurança é nossa
          missão.{" "}
          <span className="font-bold text-bluePrime">
            Mais de 30 coberturas exclusivas
          </span>{" "}
          esperam por você.
  </p>*/}
        <p className="font-bold text-grayPrime mt-4">
          Descubra suas coberturas abaixo:
        </p>
      </div>
      <div className="flex justify-center mx-auto gap-x-3 sm:gap-x-6 pb-4 font-semibold  sm:font-bold">
        <div className="flex flex-col items-center justify-center ">
          <img
            src={
              imageManagerPrimeTravelLpVenda.IconsSomeAdvantages.someBenefits
            }
            alt="Icone coberturas"
            className="w-[40px] sm:w-[60px] h-[40px] sm:h-[60px]"
          />
          <span className="text-[12px] sm:text-sm mt-2">
            30 Serviços <br />e coberturas
          </span>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <img
            src={imageManagerPrimeTravelLpVenda.IconsSomeAdvantages.einstein}
            alt="Icone Hospital Albert Einstein"
            className="w-[40px] sm:w-[60px] h-[40px] sm:h-[60px]"
          />
          <span className="text-[12px] sm:text-sm mt-2">
            Orientação <br />
            Medica Online
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={imageManagerPrimeTravelLpVenda.IconsSomeAdvantages.covid}
            alt="Icone Cobertura para covid"
            className="w-[40px] sm:w-[60px] h-[40px] sm:h-[60px]"
          />
          <span className="text-[12px] sm:text-sm mt-2">
            Cobertura <br />
            Para Covid
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={imageManagerPrimeTravelLpVenda.IconsSomeAdvantages.topPrices}
            alt="Icone precos imbativeis"
            className="w-[40px] sm:w-[60px] h-[40px] sm:h-[60px]"
          />
          <span className="text-[12px] sm:text-sm mt-2">
            Preços <br />
            Imbatíveis
          </span>
        </div>
      </div>
    </div>
  );
}
