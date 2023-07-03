import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardPlano from "./subcomponents/CardPlano";

const planos = [
  {
    id: 1,
    title: "Brasil",
    price: "a Partir de:",
    description: "Este é o plano 1",
  },
  { id: 2, title: "Europa", price: "R$100", description: "Este é o plano 2" },
  {
    id: 3,
    title: "Estados Únidos e Canadá",
    price: "A Partir de R$4,04/dia",
    description: "Este é o plano 3",
  },
  { id: 4, title: "Ásia 4", price: "R$200", description: "Este é o plano 4" },
];

export default function SliderPlanos() {
  return (
    <div>
      <h2 className="text-center text-4xl"> Nossos Planos</h2>
      <p>Arraste os slider para o lado</p>
      <Swiper
        spaceBetween={50}
        slidesPerView={4}
        cursor-pointer
        style={{ cursor: "pointer" }}
      >
        {planos.map((plano) => (
          <SwiperSlide key={plano.id}>
            <CardPlano
              title={plano.title}
              description={plano.description}
              price={plano.price}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
