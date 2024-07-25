import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function DiscountsAndAdvantages({ openModalStep }) {
  const openModal = (step) => {
    openModalStep(step);
  };
  return (
    <div className="bg-bluePrime font-montserrat p-10">
      <div className="text-2xl sm:text-5xl text-white">
        <h2>Aproveite nossos descontos e vantagens </h2>
      </div>
      <div>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-4  mt-4">
          <div className="flex-grow basis-1/3 p-4 bg-white rounded-lg shadow-lg m-2">
            <div className="flex items-center justify-center w-[100px] h-[96px] mx-auto">
              <img
                src={imageManagerSeguroPet.DiscountsAndAdvantages.fourpets}
                alt="Ilustração de uma mulher com um gato no colo e três cachorros ao redor dela"
                className="w-[100px] h-[96px]"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-bold mt-2">
              Mais Pets = Mais descontos
            </h3>
            <div className="text-sm mt-2 text-gray-600">
              <div>2ª pet ganha 10% de desconto</div>
              <div>3ª pet ganha 20% de desconto</div>
              <div>4ª pet em diante ganha 30% de desconto</div>
            </div>
          </div>

          <div className="flex-grow basis-1/3 p-4 bg-white rounded-lg shadow-lg m-2">
            <div className="flex items-center justify-center">
              <img
                src={imageManagerSeguroPet.DiscountsAndAdvantages.gift}
                alt="Ilustração de uma caixa de presente"
                className="h-24"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-bold mt-2">
              Descontos para sua indicação
            </h3>
            <div className="text-sm mt-2 text-gray-600">
              <div>
                Ao indicar o plano de saúde, você ganha descontos na sua
                mensalidade e prêmios por indicação!
              </div>
            </div>
          </div>
          <div className="flex-grow basis-1/3 p-4 bg-white rounded-lg shadow-lg m-2">
            <div className="flex items-center justify-center">
              <img
                src={imageManagerSeguroPet.DiscountsAndAdvantages.extras}
                alt="Ilustração de gatinhos brincando"
                className="h-24"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-bold mt-2">
              Acesso a serviços com desconto
            </h3>
            <div className="text-sm mt-2 text-gray-600">
              <div>
                Você tem acesso a diversos serviços com desconto. Dentre eles:
                acupuntura, fisioterapia e banhos.
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => openModal(2)}
            className="bg-white font-bold text-grayPrime w-90 px-20 py-4 rounded-lg text-2xl mt-7 "
          >
            Aproveitar Vantagens
          </button>
        </div>
      </div>
    </div>
  );
}
