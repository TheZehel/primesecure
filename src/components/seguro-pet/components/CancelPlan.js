import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { IoLogoWhatsapp } from "react-icons/io";

export default function CancelPlanPet() {
  return (
    <div className="bg-bluePrime p-5 text-white flex">
      <div className="mx-auto">
        <div className="mx-auto flex items-center space-x-4">
          <div className="">Para dúvidas e cancelamento: </div>
          <div className="">
            <button className=" text-white p-2 rounded-md underline decoration-white">
              <a href="tel:+55 (11) 3511-0708" className="">
                cancelar agora
              </a>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center mx-auto space-x-2">
          {/* whatsapp */}
          <div className="flex  space-x-2">
            <IoLogoWhatsapp size={20} />
            <a href="https://wa.me/5511966534903">11 96653-4903</a>
          </div>
          {/* telefone */}
          <div className="flex  space-x-2">
            <FontAwesomeIcon icon={faPhone} />
            <a href="tel:+55 (11) 3511-0708">11 3511-0708</a>
          </div>
        </div>
      </div>
    </div>
  );
}
