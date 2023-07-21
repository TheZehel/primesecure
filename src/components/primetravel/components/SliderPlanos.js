import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardPlano from "./subcomponents/CardPlano";
import imageManagerPrimeTravel from "../bancodeimagens/BancoDeImagensPrimeTravel";

const {
  ImgSliderBrasil,
  ImgSliderAfrica,
  ImgSliderEuropa,
  ImgSliderAsia,
  ImgSliderEstadosUnidos,
  ImgSliderMultiplosDestinos,
  ImgSliderAmerica,
  ImgSliderOceania,
} = imageManagerPrimeTravel.SliderPrecos;
console.log(ImgSliderEuropa);

const planos = [
  {
    id: 1,
    title: "Brasil",
    price: "4,04",
    description: "",
    image: ImgSliderBrasil,
  },
  {
    id: 2,
    title: "Europa",
    price: "15,39",
    description: "",
    image: ImgSliderEuropa,
  },
  {
    id: 3,
    title: "Estados Únidos e Canadá",
    price: "12,95",
    description: "",
    image: ImgSliderEstadosUnidos,
  },
  {
    id: 4,
    title: "Ásia",
    price: "12,95",
    description: "",
    image: ImgSliderAsia,
  },
  {
    id: 5,
    title: "América (Inclui México)",
    price: "10,61",
    description: "",
    image: ImgSliderAmerica,
  },
  {
    id: 6,
    title: "Oceania",
    price: "12,95",
    description: "",
    image: ImgSliderOceania,
  },
  {
    id: 7,
    title: "África",
    price: "12,95",
    description: "",
    image: ImgSliderAfrica,
  },
  {
    id: 8,
    title: "Múltiplos Destinos",
    price: "12,95",
    description: "",
    image: ImgSliderMultiplosDestinos,
  },
];

export default function SliderPlanos() {
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
    <div className="montserrat">
      <h2 className="text-center text-4xl"> Nossos Planos</h2>
      <p>Arraste para o lado</p>
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
          style={{ cursor: "pointer" }}
        >
          {planos.map((plano) => (
            <SwiperSlide key={plano.id}>
              <CardPlano
                title={plano.title}
                description={plano.description}
                price={plano.price}
                image={plano.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
