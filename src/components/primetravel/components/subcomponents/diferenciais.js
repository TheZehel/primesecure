import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Baby, Briefcase, Glasses, MapPin, PhoneCall, Stethoscope, Video, Volleyball } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay } from "swiper/modules";

export default function Diferenciais() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateScreenWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

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
    <div>
      <div className="text-4xl text-grayPrime font-bold text-center my-5">
        <p>Nossos Diferenciais</p>
      </div>
      <div className="relative justify-center w-full align-middle">
        <Swiper
          slidesPerView={2} // Mostra dois slides por vez
          spaceBetween={30} // Espaçamento entre slides
          pagination={{
            dynamicBullets: false,
            clickable: true,
          }}
          breakpoints={{
            // Configurações responsivas
            0: {
              slidesPerView: 1, // 1 slide em telas pequenas
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1, // 2 slides em telas maiores
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1,
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
          className="mySwiper overflow-hidden"
        >
          {diferenciais.map((diferencial) => (
            <SwiperSlide
              key={diferencial.id}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="flex flex-col items-center justify-center text-center h-[150px]">
                <div className="text-6xl mb-4 text-bluePrime">{diferencial.icon}</div>
                <p className="text-lg font-semibold text text-bluePrime">{diferencial.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
