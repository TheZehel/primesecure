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
    description: "Este é o plano 1",
    image: ImgSliderBrasil,
  },
  {
    id: 2,
    title: "Europa",
    price: "15,39",
    description: "Este é o plano 2",
    image: ImgSliderEuropa,
  },
  {
    id: 3,
    title: "Estados Únidos e Canadá",
    price: "12,95",
    description: "Este é o plano 3",
    image: ImgSliderEstadosUnidos,
  },
  {
    id: 4,
    title: "Ásia",
    price: "12,95",
    description: "Este é o plano 4",
    image: ImgSliderAsia,
  },
  {
    id: 5,
    title: "América(Inclui México)",
    price: "10,61",
    description: "Este é o plano 4",
    image: ImgSliderAmerica,
  },
  {
    id: 6,
    title: "Oceania",
    price: "4,04",
    description: "Este é o plano 4",
    image: ImgSliderOceania,
  },
  {
    id: 7,
    title: "África",
    price: "12,95",
    description: "Este é o plano 4",
    image: ImgSliderAfrica,
  },
  {
    id: 8,
    title: "Múltiplos Destinos",
    price: "12,95",
    description: "Este é o plano 4",
    image: ImgSliderMultiplosDestinos,
  },
];

export default function SliderPlanos() {
  return (
    <div>
      <h2 className="text-center text-4xl"> Nossos Planos</h2>
      <p>Arraste os slider para o lado</p>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        cursor-pointer
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
  );
}
