import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function HealthDecisionSection({ openModalStep }) {
  const openModal = (step) => {
    openModalStep(step);
  };

  return (
    <section
      id="cuidar-com-economia"
      className="py-14 pb-12 bg-bluePrime font-montserrat mt-20 p-10"
    >
      <div className="flex flex-col container mx-auto xl:px-80">
        <h2 className="text-center text-white font-bold mb-12 text-3xl sm:text-5xl">
          A Saúde do seu pet é coisa séria, e a decisão é sua
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center mb-14">
          <div className="flex flex-col items-center m-5">
            <div className="w-44 h-48">
              <img
                src={imageManagerSeguroPet.HealthDecisionSection.petProtected}
                alt="Ilustração de um cachorro sorrindo"
                loading="lazy"
                className="h-[161.22px]"
              />
            </div>
            <h3 className="font-bold text-lg text-white mt-2">
              Proteja seu pet agora
            </h3>
            <p className="text-white mt-5">
              Em pouco tempo você vai perceber como ficou mais fácil cuidar do
              seu pet. Além das facilidades, você terá a segurança de contar com
              um suporte veterinário de qualidade e não se preocupar com os
              gastos.
            </p>
          </div>
          <span className="mx-4 text-white font-bold text-xl my-10 sm:my-0">
            ou
          </span>
          <div className="flex flex-col items-center">
            <div className="w-44 h-48">
              <img
                src={
                  imageManagerSeguroPet.HealthDecisionSection.petNotProtected
                }
                alt="Ilustração de um cachorro triste"
                loading="lazy"
                className="h-[161.22px]"
              />
            </div>
            <h3 className="font-bold text-lg text-white mt-2">
              Deixe para depois
            </h3>
            <p className="text-white mt-5">
              Em 5 anos você terá tido uma despesa de R$ 10 mil a mais do que se
              tivesse um plano de saúde para o seu pet. Se o seu amigo tiver
              algum problema de saúde, você vai se questionar o porquê de não
              ter contratado um plano antes.
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal(2)}
          className="bg-white font-bold text-grayPrime w-90 px-20 py-4 rounded-lg text-2xl mt-7 xl:mx-80"
        >
          Proteger Pet Agora
        </button>
      </div>
    </section>
  );
}
