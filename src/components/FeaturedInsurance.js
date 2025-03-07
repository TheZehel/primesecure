import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faCashRegister,
  faDog,
  faHeart,
  faHouse,
  faPhone,
  faSuitcase,
  faTeeth,
} from '@fortawesome/free-solid-svg-icons';

export default function FeaturedInsurance() {
  const [hoverStates, setHoverStates] = useState({});

  const cards = [
    {
      id: 1,
      href: '/primetravel',
      title: 'Seguro Viagem',
      hoverTitle: 'Seguro Aparelhos Portateis',
      feature: 'Novo',
      icon: faSuitcase,
    },
    {
      id: 2,
      href: '/seguro-pet-porto',
      title: 'Saúde Pet',
      hoverTitle: 'Seguro Aparelhos Portateis',
      icon: faDog,
    },
    {
      id: 3,
      href: '/seguro-residencial-porto-2',
      title: 'Seguro Residencial',
      hoverTitle: 'Seguro Aparelhos Portateis',
      icon: faHouse,
    },
    {
      id: 4,
      href: '/seguro-de-vida',
      title: 'Seguro de Vida',
      hoverTitle: 'Seguro Aparelhos Portateis',
      icon: faHeart,
    },
    {
      id: 5,
      href: 'https://compre.simple2u.com.br/IniciarSimulacao/primesecure',
      title: 'Seguro Celular',
      hoverTitle: 'Seguro Aparelhos Portateis',
      icon: faPhone,
    },
    {
      id: 6,
      href: '/consorcio-imovel',
      title: 'Consórcio',
      hoverTitle: 'Seguro Aparelhos Portateis',
      icon: faCashRegister,
    },
  ];

  return (
    <section className="w-[90%] mx-auto py-2">
      <div className="  mx-auto px-2 py-6">
        <h1 className="text-xl sm:text-4xl text-center mb-6">
          Sugestões de Seguro Para Você
        </h1>
        <p className="text-lg text-center mb-8 sm:mb-0 ">
          Realize a sua contratação de maneira 100% digital e sem complicações.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:h-[200px] items-center">
          {cards.map((card, index) => (
            <a
              href={card.href}
              key={index}
              className="border p-4 rounded-lg h-[130px] hover:h-[150px] group hover:bg-bluePrime hover:text-white transition  ease-linear hover:gap-[24px]"
              style={{
                transition:
                  'height 0.2s linear, backgroundColor 0.1s linear, gap 0.1s linear',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.height = '150px'; // novo valor de altura
                e.currentTarget.style.backgroundColor = '#03a8db'; // nova cor de fundo
                e.currentTarget.style.gap = '4px'; // novo valor de gap
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.height = '130px'; // valor original de altura
                e.currentTarget.style.backgroundColor = 'initial'; // cor original de fundo
                e.currentTarget.style.gap = 'initial'; // valor original de gap
              }}
            >
              <div className="flex items-center justify-between mb-4 pt-2">
                <FontAwesomeIcon
                  icon={card.icon}
                  className="text-bluePrime group-hover:text-white duration-100"
                />
                {/*{card.feature && (
                  <span className="text-[13px] font-semibold bg-bluePrime  rounded-full px-2 py-1">
                    {card.feature}
                </span>
                )}*/}
              </div>
              <div>
                <p className="text-[15px] text-start font-semibold pt-6 mb-2">
                  {card.title}
                </p>
                {/*<p className="text-gray-600">{card.hoverTitle}</p>*/}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
