import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardSeguro from "./CardSegurosHome";
import imageManagerInformacoesProdutos from "./modules/bancoDeImagensInformacoesProdutos";
import imageManager from "./bancoDeImagens";

const {
  imgSliderHomeResidencial,
  imgSliderHomePet,
  imgSliderHomeOdonto,
  imgSliderHomeViagem,
  imgSliderHomeVida,
  imgSliderHomeCelular,
} = imageManagerInformacoesProdutos.imgSliderHomeProdutos;

const seguros = [
  {
    id: 1,
    title: "Seguro Residencial",
    price: "",
    description: "",
    href: "/seguro-residencial-porto-2",
    image: imgSliderHomeResidencial,
  },
  {
    id: 2,
    title: "Saúde Pet",
    price: "15,39",
    description: "",
    href: "/seguro-pet-porto",
    image: imgSliderHomePet,
  },
  {
    id: 3,
    title: "Odonto",
    price: "12,95",
    description: "",
    href: "/sulamerica-odonto",
    image: imgSliderHomeOdonto,
  },
  {
    id: 4,
    title: "Seguro de Vida",
    price: "12,95",
    description: "",
    href: "/seguro-de-vida",
    image: imgSliderHomeVida,
  },
  {
    id: 5,
    title: "Seguro Viagem",
    price: "10,61",
    description: "",
    href: "/primetravel",
    image: imgSliderHomeViagem,
  },
  {
    id: 6,
    title: "Seguro Celular",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgSliderHomeCelular,
  },
];

export default function SliderSegurosHome() {
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
    <div className="font-montserrat mt-16 text-grayPrime">
      <h2 className="text-center text-primary font-bold mb-13 text-2xl sm:text-5xl mt-16 mb-5">
        {" "}
        Opções De Seguro Para Todos Os Seus Momentos
      </h2>
      <div class="flex items-center justify-center h-full">
        <img
          src={imageManager.Utils.iconHand}
          alt="icone de mao arrastando slider"
          class="mr-2 w-7 "
        />
        <p className="font-bold text-bluePrime">Arraste para o lado</p>
      </div>
      <div
        onMouseEnter={handleSlideBounce}
        onTouchStart={handleSlideBounce}
        className="cursor-grab"
      >
        <Swiper
          className="mb-20"
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          effect="slide"
          speed={1000}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1920: {
              slidesPerView: 4,
            },
          }}
        >
          {seguros.map((seguro) => (
            <SwiperSlide key={seguro.id}>
              <CardSeguro
                title={seguro.title}
                description={seguro.description}
                price={seguro.price}
                image={seguro.image}
                href={seguro.href}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
