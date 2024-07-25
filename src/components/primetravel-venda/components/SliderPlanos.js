import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardPlano from "./CardPlano";
import imageManagerPrimeTravelLpVenda from "../bancodeimagens/BancoDeImgsTravelVenda";

const {
  ImgSliderBrasil,
  ImgSliderAfrica,
  ImgSliderEuropa,
  ImgSliderAsia,
  ImgSliderEstadosUnidos,
  ImgSliderMultiplosDestinos,
  ImgSliderAmerica,
  ImgSliderOceania,
} = imageManagerPrimeTravelLpVenda.SliderPrecos;
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
    title: "Estados Unidos e Canadá",
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
    <div className="font-montserrat ">
      <h2 className="text-center text-grayPrime font-bold mb-13 text-2xl sm:text-5xl mt-20">
        {" "}
        Nossos Planos
      </h2>
      <div class="flex items-center justify-center h-full">
        <img
          src={imageManagerPrimeTravelLpVenda.Utils.iconHand}
          alt="icone de mao arrastando slider"
          class="mr-2 w-7 "
        />
        <p className="font-bold text-bluePrime mt-5">Arraste para o lado</p>
      </div>
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
