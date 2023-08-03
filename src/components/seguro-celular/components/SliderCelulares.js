import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardPlano from "./subcomponents/CardCelulares";
import imageManagerSeguroCelular from "../bancodeimagens/BancoDeImagensSeguroCelular";

const { imgApple, imgMotorola, imgSamsumg, imgXiaomi, outrasMarcas } =
  imageManagerSeguroCelular.marcasCelulares;

const marcas = [
  {
    id: 1,
    title: "Apple",
    price: "",
    description: "",
    image: imgApple,
  },
  {
    id: 2,
    title: "Motorola",
    price: "15,39",
    description: "",
    image: imgMotorola,
  },
  {
    id: 3,
    title: "Samsumg",
    price: "12,95",
    description: "",
    image: imgSamsumg,
  },
  {
    id: 4,
    title: "Xiaomi",
    price: "12,95",
    description: "",
    image: imgXiaomi,
  },
  {
    id: 5,
    title: "Outras Marcas",
    price: "10,61",
    description: "",
    image: outrasMarcas,
  },
];

export default function SliderCelulares() {
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
      <h2 className="text-center text-4xl pt-20"> Atendemos Diversas marcas</h2>
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
          {marcas.map((marca) => (
            <SwiperSlide key={marca.id}>
              <CardPlano
                title={marca.title}
                description={marca.description}
                price={marca.price}
                image={marca.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
