import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

export default function UmaSolucao() {
  const solutions = [
    {
      id: 1,
      image: "https://storage.googleapis.com/primesecure/viagem-lazer.jpg",
      title: "LAZER OU NEGÓCIOS",
      text: "Se tudo o que você espera de uma experiência no exterior é perfeição, comece pela contratação de um Seguro Viagem à altura.",
    },
    {
      id: 2,
      image: "https://storage.googleapis.com/primesecure/estudos-intercambio.jpg",
      title: "ESTUDOS OU INTERCÂMBIO",
      text: "Um Seguro Viagem sob medida para você que planeja uma estadia prolongada no velho continente para aprender coisas novas.",
    },
    {
      id: 3,
      image: "https://storage.googleapis.com/primesecure/viagem-esportes.jpg",
      title: "ESPORTES OU COMPETIÇÃO AMADORA",
      text: "Competir ao redor é um dos maiores prazeres na vida de um atleta amador. Certifique-se de embarcar com a melhor proteção para viver essa experiência.",
    },
    {
      id: 4,
      image: "https://storage.googleapis.com/primesecure/multi-viagem2.jpg",
      title: "MULTI VIAGEM",
      text: "O multi viagem é um produto ideal para pessoas que fazem várias viagens para o exterior ao longo do ano, seja por motivo de lazer ou de negócios.",
    },
  ];

  return (
    <div className="py-8 bg-white mb-10">
      <div className="text-2xl text-grayPrime font-semibold text-center mb-10">
        <p>Para cada viagem, uma solução.</p>
      </div>
      <div className="relative w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          loop={true}
          grabCursor={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {solutions.map((solution) => (
            <SwiperSlide
              key={solution.id}
              className="flex flex-col items-center justify-start text-center shadow-lg rounded-lg border-bluePrime border-2 p-6 overflow-hidden min-h-[250px]"
            >
              <div className="flex flex-col items-center justify-start gap-4 w-full">
                {/* Renderiza a imagem */}
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h1 className="text-lg font-bold text-bluePrime">{solution.title}</h1>
                <p className="text-sm text-grayPrime break-words">{solution.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
