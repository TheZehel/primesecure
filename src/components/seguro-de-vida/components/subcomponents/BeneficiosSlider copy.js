import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faGift,
  faCapsules,
  faTicketAlt,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

const coberturas = [
  {
    id: 1,
    title: "Médico na Tela",
    description:
      "Atendimento médico online sem limite de utilização! Disponível 24h por dia - 7 dias por semana!",
    icon: faStethoscope,
  },
  {
    id: 2,
    title: "Clube de Vantagens",
    description:
      "Descontos e benefícios exclusivos para você cuidar da sua Saúde Integral do jeito certo: o seu!",
    icon: faGift,
  },
  {
    id: 3,
    title: "Descontos em Farmácias",
    description:
      "Descontos de até 70% em diversos medicamentos nas maiores redes de farmácias do Brasil.",
    icon: faCapsules,
  },
  {
    id: 4,
    title: "Sorteios Mensais",
    description: "Sorteios de até R$ 15 mil pela loteria federal todo mês!",
    icon: faTicketAlt,
  },
  {
    id: 5,
    title: "Assistência Residencial",
    description:
      "Serviços para pequenos reparos como chaveiro, eletricista e outros profissionais. Conta também com os serviços de vigilância e segurança.",
    icon: faTools,
  },
];

export default function BeneficiosSlider() {
  const swiperRef = useRef(null);
  const [hasBounced, setHasBounced] = useState(false);

  const handleSlideBounce = () => {
    if (!hasBounced) {
      setHasBounced(true);
      const swiper = swiperRef.current.swiper;

      swiper.slideNext(750);
      setTimeout(() => {
        swiper.slidePrev(750);
      }, 750);
    }
  };

  return (
    <div className="font-montserrat">
      <h2 className="text-center text-4xl font-bold text-grayPrime pt-10">
        Benefícios que facilitam sua vida
      </h2>
      <p className="pt-4 text-center">
        Oferecemos diversos benefícios de acordo com sua proteção, para você
        usar quando precisar.
      </p>
      <p className="pt-4 font-bold text-bluePrime2">Arraste para o lado</p>
      <div onMouseEnter={handleSlideBounce} onTouchStart={handleSlideBounce}>
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1920: {
              slidesPerView: 4,
            },
          }}
          className="cursor-grab"
        >
          {coberturas.map((cobertura) => (
            <SwiperSlide key={cobertura.id} className="py-5">
              <div className="border-bluePrime border shadow-lg px-3 py-8 m-5 rounded-lg h-56">
                <FontAwesomeIcon
                  icon={cobertura.icon}
                  size="2x"
                  className="text-bluePrime"
                />
                <h2 className="pt-2 font-bold">{cobertura.title}</h2>
                <p className="pt-2">{cobertura.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
