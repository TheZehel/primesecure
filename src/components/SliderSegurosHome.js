import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardSeguro from "./CardSegurosHome";
import imageManagerInformacoesProdutos from "./modules/bancoDeImagensInformacoesProdutos";

const { imgResidencial, imgPet, imgOdonto, imgVida, imgViagem, imgCelular } =
  imageManagerInformacoesProdutos.imgProdutos;

const seguros = [
  {
    id: 1,
    title: "Seguro Residencial",
    price: "",
    description: "",
    href: "/seguro-residencial-porto-2",
    image: imgResidencial,
  },
  {
    id: 2,
    title: "Saúde Pet",
    price: "15,39",
    description: "",
    href: "/seguro-pet-porto",
    image: imgPet,
  },
  {
    id: 3,
    title: "Odonto",
    price: "12,95",
    description: "",
    href: "/sulamerica-odonto",
    image: imgOdonto,
  },
  {
    id: 4,
    title: "Seguro de Vida",
    price: "12,95",
    description: "",
    href: "/seguro-de-vida",
    image: imgVida,
  },
  {
    id: 5,
    title: "Seguro Viagem",
    price: "10,61",
    description: "",
    href: "/primetravel",
    image: imgViagem,
  },
  {
    id: 6,
    title: "Seguro Celular",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgCelular,
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
    <div className="montserrat">
      <h2 className="text-center text-4xl pt-20">
        {" "}
        Opções De Seguro Para Todos Os Seus Momentos
      </h2>
      <p>Arraste para o lado</p>
      <div
        onMouseEnter={handleSlideBounce}
        onTouchStart={handleSlideBounce}
        className="cursor-grab"
      >
        <Swiper
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
