import imageManagerPrimeTravelLpVenda from "../bancodeimagens/BancoDeImgsTravelVenda";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPix } from "@fortawesome/free-brands-svg-icons";

export default function CreditCards() {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 sm:w-[40%] mx-auto">
      {/* Primeira Coluna - Texto e Imagens */}
      <div className="mx-auto justify-center mt-4 animate-pulse">
        <h3 className="text-white">Pague em até 12x sem juros</h3>
        <div className="flex justify-center space-x-2">
          <img
            src={imageManagerPrimeTravelLpVenda.CartoesBanner.masterCard}
            alt="selo mastercard"
            className="w-[50px]"
          />
          <img
            src={imageManagerPrimeTravelLpVenda.CartoesBanner.visa}
            alt="selo visa"
            className="w-[50px]"
          />
          <img
            src={imageManagerPrimeTravelLpVenda.CartoesBanner.elo}
            alt="selo elo"
            className="w-[50px]"
          />
          <img
            src={imageManagerPrimeTravelLpVenda.CartoesBanner.dinners}
            alt="selo dinners"
            className="w-[50px]"
          />
        </div>
      </div>
      {/* Segunda Coluna - Texto 'PIX' */}
      <div className="mx-auto justify-center mt-4 animate-pulse ">
        <h3 className="text-white">ou À vista no PIX </h3>
        <div className="mx-auto justify-center mt-4 animate-pulse">
          <FontAwesomeIcon
            icon={faPix}
            size="2x"
            style={{ color: "#3caf88", marginRight: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
