import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Baby, Briefcase, Glasses, MapPin, PhoneCall, Stethoscope, Video, Volleyball } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

export default function Diferenciais() {
  const diferenciais = [
    {
      id: 1,
      icon: <MapPin />,
      text: "A melhor rede internacional do mercado",
    },
    {
      id: 2,
      icon: <Stethoscope />,
      text: "Cobertura para doenças preexistentes",
    },
    {
      id: 3,
      icon: <PhoneCall />,
      text: "Atendimento 24h por dia em português",
    },
    {
      id: 4,
      icon: <Video />,
      text: "Telemedicina",
    },
    {
      id: 5,
      icon: <Volleyball />,
      text: "Planos com coberturas para esportes de lazer e competição.",
    },
    {
      id: 6,
      icon: <Briefcase />,
      text: "Extravio de bagagem",
    },
    {
      id: 7,
      icon: <Baby />,
      text: "Coberturas para gravidez até 34 semanas",
    },
    {
      id: 8,
      icon: <Glasses />,
      text: "Viajantes até 80 anos de idade",
    },
  ];

  return (
    <section className="passos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-grayPrime mt-20 mb-16">Nossos Diferenciais</h2>
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
            {diferenciais.map((diferencial) => (
              <SwiperSlide
                key={diferencial.id}
                className="flex flex-col items-center justify-center shadow-lg rounded-lg w-64  border-2 p-6 h-64"
              >
                <div className="flex flex-col items-center justify-center gap-4 h-28">
                  <div className="text-8xl text-bluePrime">{diferencial.icon}</div>
                  <p className="text-lg font-semibold text-center text-grayPrime">
                    {diferencial.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
