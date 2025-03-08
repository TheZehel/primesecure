import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import PopupBack from '../../globalsubcomponentes/BackPopup';

export default function ContactSection() {
  const productId = 'Contact';

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      {/* <PopupBack productId={productId} /> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:w-[1300px]  ">
        <p className="text-center text-xl sm:text-4xl mb-4 text-grayPrime">
          Fale conosco
        </p>
        <p className="text-center text-2xl mb-8">
          Estamos prontos para te ajudar!
        </p>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-20 space-y-4 sm:space-y-0 justify-center ">
          <a
            href="tel:1135110708"
            className="flex flex-row items-center space-x-2 space-y-0 w-full justify-start sm:justify-start"
          >
            <FontAwesomeIcon
              icon={faPhone}
              className="bg-bluePrime p-5 rounded-lg text-white"
            />
            <div className="text-left">
              <span className="text-sm font-semibold">
                Atendimento ao cliente
              </span>
              <p className="text-md font-semibold">11 3511-0708</p>
              <p className="text-sm">Das 9h às 18h, de 2ª a 6ª</p>
            </div>
          </a>
          <a
            href="https://wa.me/5511966534903"
            className="flex flex-row items-center space-x-2 space-y-0 w-full justify-start sm:justify-start"
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="bg-bluePrime p-5 rounded-lg text-white"
            />
            <div className="text-left">
              <span className="text-sm font-semibold">WhatsApp</span>
              <p className="text-md font-semibold">11 96653-4903</p>
              <p className="text-sm">Das 9h às 18h, de 2ª a 6ª</p>
            </div>
          </a>
          <a
            href="mailto:corretora@primesecure.com.br"
            className="flex flex-row items-center space-x-2 space-y-0 w-full justify-start sm:justify-start"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="bg-bluePrime p-5 rounded-lg text-white"
            />
            <div className="text-left">
              <span className="text-sm font-semibold">E-mail</span>
              <p className="text-md font-semibold">
                corretora@primesecure.com.br
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
