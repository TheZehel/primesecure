import React from "react";
import imageManagerPrimeTravel from "../../bancodeimagens/BancoDeImagensPrimeTravel";

export default function StepsHiring() {
  const steps = [
    {
      id: "step1",
      icon: imageManagerPrimeTravel.Utils.quote,
      title: "COTAÇÃO",
      description: "Escolha seu destino e insira as informações da sua viagem.",
    },
    {
      id: "step2",
      icon: imageManagerPrimeTravel.Utils.planSelect,
      title: "SELEÇÃO DE PLANOS",
      description: "Escolha o plano que melhor atende as suas necessidades.",
    },
    {
      id: "step3",
      icon: imageManagerPrimeTravel.Utils.infoTraveler,
      title: "INFORMAÇÕES",
      description: "Cadastre os viajantes e personalize os planos de cada um",
    },
    {
      id: "step4",
      icon: imageManagerPrimeTravel.Utils.card,
      title: "PAGAMENTO",
      description:
        "Realize o pagamento de forma segura e viaje com tranquilidade.",
    },
  ];

  return (
    <div className="mt-[30px] sm:mt-[60px]">
      <div className="text-grayPrime ">
        <h2 className="text-2xl sm:text-5xl font-bold my-6 mx-2">
          São poucas etapas para contratar
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center mx-auto gap-x-4">
        {steps.map(({ id, icon, title, description }) => (
          <div key={id} className="text-center flex flex-col items-center m-4">
            <img src={icon} alt={title} className="w-[50px] h-[50px]" />
            <div className="mt-2">
              <h3 className="text-lg font-bold">{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
