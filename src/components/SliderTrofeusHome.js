import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import CardTrofeu from "./CardTrofeusHome";
import imageManagerInformacoesProdutos from "./modules/bancoDeImagensInformacoesProdutos";
import imageManager from "./bancoDeImagens";

const {
  imgSliderHomeBradesco1,
  imgSliderHomeBradesco2,
  imgSliderHomeBradesco3,
  imgSliderHomeBradesco4,
  imgSliderHomeBradesco5,
  imgSliderHomeSulamerica,
  imgSliderHomePortoseguro,
  imgSliderHomeSulamericaSuperCampeoes,
  imgSliderHomePortoElite,
  imgSliderHomeDestaqueSulamerica1Semestre,
  imgSliderHomeDestaqueSulamerica3Trimestre,
  imgSliderHomePortoAcelera,
} = imageManagerInformacoesProdutos.imgSliderHomeTrofeus;

const { logoPortoSeguro, logoSulAmerica, logoBradesco } =
  imageManager.parceiros;

//const { iconHand } = imageManager.Utils;

const trofeus = [
  {
    id: 12,
    title: "Prêmio SulAmérica Super Campeões",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgSliderHomeSulamericaSuperCampeoes,
    brandImage: logoSulAmerica,
  },
  {
    id: 11,
    title: "Prêmio Porto Acelera",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgSliderHomePortoAcelera,
    brandImage: logoPortoSeguro,
  },
  {
    id: 6,
    title: "Destaque Nacional SulAmérica",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgSliderHomeSulamerica,
    brandImage: logoSulAmerica,
  },
  {
    id: 10,
    title: "Destaque SulAmérica 3° Trimestre",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgSliderHomeDestaqueSulamerica3Trimestre,
    brandImage: logoSulAmerica,
  },
  {
    id: 7,
    title: "Top 10 Porto Seguro Brasil Vida 2017",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgSliderHomePortoseguro,
    brandImage: logoPortoSeguro,
  },
  {
    id: 8,
    title: "Certificado Elite Porto Seguro",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgSliderHomePortoElite,
    brandImage: logoPortoSeguro,
  },
  {
    id: 9,
    title: "Destaque SulAmérica 1° Semestre",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgSliderHomeDestaqueSulamerica1Semestre,
    brandImage: logoSulAmerica,
  },
  {
    id: 10,
    title: "Destaque SulAmérica 3° Trimestre",
    price: "10,61",
    description: "",
    href: "/equipamentos-portateis-3",
    image: imgSliderHomeDestaqueSulamerica3Trimestre,
    brandImage: logoSulAmerica,
  },
  {
    id: 1,
    title: "Premios de melhor produção 2018",
    price: "",
    description: "",
    href: "/seguro-residencial-porto-2",
    image: imgSliderHomeBradesco1,
    brandImage: logoBradesco,
  },
  {
    id: 2,
    title: "Premio destaque de qualidade - ABS",
    price: "15,39",
    description: "",
    href: "/seguro-pet-porto",
    image: imgSliderHomeBradesco2,
    brandImage: logoBradesco,
  },
  {
    id: 3,
    title: "Empresa campeã em vendas Bradesco 2021",
    price: "12,95",
    description: "",
    href: "/sulamerica-odonto",
    image: imgSliderHomeBradesco3,
    brandImage: logoBradesco,
  },
  {
    id: 4,
    title: "Primeiro colocado em vendas 2017",
    price: "12,95",
    description: "",
    href: "/seguro-de-vida",
    image: imgSliderHomeBradesco4,
    brandImage: logoBradesco,
  },
  {
    id: 5,
    title: "Primeiro colocado em vendas 2018",
    price: "10,61",
    description: "",
    href: "/primetravel",
    image: imgSliderHomeBradesco5,
    brandImage: logoBradesco,
  },
];

export default function SliderTrofeusHome() {
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
    <div className="font-montserrat text-bold">
      <h2 className="text-center text-primary mb-13 text-xl sm:text-4xl  mt-16 mb-5 text-grayPrime">
        {""}
        Essas são as nossas premiações
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
          {trofeus.map((trofeu) => (
            <SwiperSlide key={trofeu.id}>
              <CardTrofeu
                title={trofeu.title}
                description={trofeu.description}
                price={trofeu.price}
                image={trofeu.image}
                brandImage={trofeu.brandImage}
                href={trofeu.href}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
