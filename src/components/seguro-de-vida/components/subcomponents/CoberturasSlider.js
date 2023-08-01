import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faWheelchair,
  faHospital,
  faProcedures,
  faPlantWilt,
} from "@fortawesome/free-solid-svg-icons";

const coberturas = [
  {
    id: 1,
    title: "Morte Por Qualquer Causa",
    description: "Segurança para seus famíliares caso você venha faltar.",
    icon: faCross,
  },
  {
    id: 2,
    title: "Invalidez Por Acidente",
    description:
      "Proteção para você em caso de uma invalidez causada por acidente.",
    icon: faWheelchair,
  },
  {
    id: 3,
    title: "Doenças Graves",
    description:
      "Proteção para você em casos de doenças graves, como Câncer, AVC, doença de Parkinson, Alzheimer, etc.",
    icon: faHospital,
  },
  {
    id: 4,
    title: "Invalidez Por Doença",
    description:
      "Proteção para você em caso de uma invalidez causada por doença.",
    icon: faProcedures,
  },
  {
    id: 5,
    title: "Assistência Funeral",
    description:
      "Caso você venha a faltar, seus familiares ou amigos podem acionar a prestação de serviços e receberão todo auxílio necessário nesse momento difícil.",
    icon: faPlantWilt,
  },
];

export default function CoberturasSlider() {
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
        Conheça algumas de nossas coberturas e assistências
      </h2>
      <p className="pt-4 text-center">
        Coberturas que protegem sua renda em casos de doença ou acidente. Simule
        para conhecer todas as opções de proteções.
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
