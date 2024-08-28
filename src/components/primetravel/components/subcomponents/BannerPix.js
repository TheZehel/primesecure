import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPix } from "@fortawesome/free-brands-svg-icons";

export default function BannerPix() {
  return (
    <div className=" flex justify-center items-center">
      <div className="bg-white w-full flex items-center justify-center px-5 my-1 py-2 rounded-lg shadow-md">
        <FontAwesomeIcon
          icon={faPix}
          size="2x"
          style={{ color: "#3caf88", marginRight: "10px" }}
        />
        <h2 className="font-bold text-grayPrime text-[14px]">
          Realize a Sua Compra Com Pix, Aprovação Instantânea!
        </h2>
      </div>
    </div>
  );
}
