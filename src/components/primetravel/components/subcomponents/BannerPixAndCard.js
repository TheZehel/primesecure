import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcMastercard,
  faCcAmex,
  faCcVisa,
  faCcDinersClub,
  faPix,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

export default function BannerPixAndCard() {
  return (
    <div className="flex  justify-center items-center m-4 w-full">
      <div className="bg-white text-grayPrime p-5 rounded-lg items-center justify-center shadow-xl m-5 max-w-5xl">
        <FontAwesomeIcon
          icon={faPix}
          size="4x"
          style={{ color: "#3caf88", marginRight: "10px" }}
        />
        <h2 className="font-bold">Pague Com Pix, Aprovação Instantânea</h2>
        <h2 className="font-bold text-3xl text-bluePrime2">Ou</h2>
        <h2 className="font-bold">
          Em até{" "}
          <span className="text-bluePrime">
            12x Sem Juros no cartão de Crédito
          </span>
        </h2>
        <div className="flex items-center justify-center">
          <FontAwesomeIcon
            icon={faCcMastercard}
            size="2x"
            style={{ color: "#03a8db", marginRight: "8px" }}
          />
          <FontAwesomeIcon
            icon={faCcVisa}
            size="2x"
            style={{ color: "#03a8db", marginRight: "8px" }}
          />
          <FontAwesomeIcon
            icon={faCcAmex}
            size="2x"
            style={{ color: "#03a8db", marginRight: "8px" }}
          />
          <FontAwesomeIcon
            icon={faCcDinersClub}
            size="2x"
            style={{ color: "#03a8db", marginRight: "8px" }}
          />
          <FontAwesomeIcon
            icon={faCreditCard}
            size="2x"
            style={{ color: "#03a8db", marginRight: "8px" }}
          />
        </div>
      </div>
    </div>
  );
}
