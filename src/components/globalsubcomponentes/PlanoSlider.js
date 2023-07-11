import { Swiper, SwiperSlide } from "swiper/react";
import PlanoCard from "./PlanoCard";

export default function PlanoSlider({ infoPlanos, planId }) {
  const planosObject = infoPlanos.find(
    (planosObject) => planosObject.id === planId
  );

  if (!planosObject) {
    return <div>Plano Não Encontrado</div>;
  }

  return (
    <div className="mt-20">
      <h2 className="text-center text-4xl">Nossos Planos</h2>
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
            slidesPerView: 3,
          },
        }}
        style={{ cursor: "pointer" }}
      >
        {planosObject.planos.map((plano) => (
          <SwiperSlide key={plano.name}>
            <PlanoCard plano={plano} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
