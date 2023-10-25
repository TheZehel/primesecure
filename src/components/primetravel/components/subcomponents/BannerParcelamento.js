import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcMastercard,
  faCcAmex,
  faCcVisa,
  faCcDinersClub,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

export default function BannerParcelamento() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white w-full flex flex-col items-center justify-center px-5 my-1 py-2 rounded-lg shadow-md">
        <h2 className="font-bold text-grayPrime 1 text-md">
          Pague Parcelado em até 12x Sem Juros!
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
