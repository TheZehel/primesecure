import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../css/style.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Banner() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  useEffect(() => {
    const updateScreenWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const banners = [
    {
      id: 1,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/banners-outubro/banners/banners-lg/srclarge-outubro-2024-primetravel.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/banners-outubro/banners/banners-md/srcmedium-outubro-2024-primetravel.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/banners-outubro/banners/banners-sm/srcmobile-outubro-2024-primetravel.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/primetravel",
    },
    {
      id: 2,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/banners-outubro/banners/banners-lg/srclarge-outubro-2024-vida.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/banners-outubro/banners/banners-md/srcmedium-outubro-2024-vida.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/banners-outubro/banners/banners-sm/srcmobile-outubro-2024-vida.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/seguro-de-vida",
    },
    {
      id: 3,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/residencial/srclarge-agosto-2024-residencial.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/residencial/srcmedium-agosto-2024-residencial.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/residencial/srcmobile-agosto-2024-residencial.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/seguro-residencial-porto-2",
    },

    {
      id: 4,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/celular-porto/srclarge-agosto-2024-celular-porto.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/celular-porto/srcmedium-agosto-2024-celular-porto.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/celular-porto/srcmobile-agosto-2024-celular-porto.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/equipamentos-portateis-3",
    },
    {
      id: 5,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/pet/srclarge-agosto-2024-pet.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/pet/srcmedium-agosto-2024-pet.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/pet/srcmobile-agosto-2024-pet.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/seguro-pet-porto",
    },
    {
      id: 6,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/Consorcio/srclarge-agosto-2024-Consorcio.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/Consorcio/srcmedium-agosto-2024-consorcio.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/Consorcio/srcmobile-agosto-2024-consorcio.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/consorcio-imovel",
    },
    {
      id: 7,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/Odonto/srclarge-agosto-2024-odonto.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/Odonto/srcmedium-agosto-2024-odonto.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/Odonto/srcmobile-agosto-2024-odonto.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/sulamerica-odonto",
    },
    {
      id: 8,
      srcLarge:
        "https://storage.googleapis.com/primesecure/home/janeiro2024/srclarge%20telemedicina%202024%20viagem.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/home/janeiro2024/srcMedium%20telemedicina%202024%20viagem.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/home/janeiro2024/srcMobile%20telemedicina%202024%20viagem%20(1).png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/primetravel",
    },
    {
      id: 9,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/celular-kakau/srclarge-agosto-2024-celular-kakau.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/celular-kakau/srcmedium-agosto-2024-celular-kakau.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/banners-agosto-rw/celular-kakau/srcmobile-agosto-2024-celular-kakau.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/seguro-celular-kakau",
    },
    {
      id: 10,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/banners-outubro/banners/banners-lg/srclarge-outubro-2024-bike.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/banners-outubro/banners/banners-md/srcmedium-outubro-2024-bike.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/banners-outubro/banners/banners-sm/srcmobile-outubro-2024-bike.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/seguro-bike",
    },
  ];

  return (
    <div className="m-5">
      <Swiper
        className="rounded-xl h-[141px] sm:h-[420px]"
        pagination={{ clickable: true }}
        loop={true}
        grabCursor={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={
                viewportWidth >= 1500
                  ? banner.srcLarge
                  : viewportWidth >= 1024
                  ? banner.srcMedium
                  : banner.srcMobile
              }
              alt={banner.alt}
              className="h-full w-full cursor-pointer mb-[33px] rounded-xl"
              onClick={() => (window.location.href = banner.href)}
            />
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
