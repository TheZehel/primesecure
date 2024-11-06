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
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large/srclarge-novembro-2024-primetravel-black-friday.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium/srcmedium-novembro-2024-primetravel-black-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile/srcmobile-novembro-2024-vida-black-friday.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/primetravel",
    },
    {
      id: 2,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large/srclarge-novembro-2024-vida-black-friday.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium/srcmedium-novembro-2024-vida-black-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile/srcmobile-novembro-2024-vida-black-friday%20(2).png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/seguro-de-vida",
    },
    {
      id: 3,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large-2/srclarge-novembro-2024-residencial-black-friday.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium-2/srcmedium-novembro-2024-residencial-black-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile-3/srcmobile-novembro-2024-residencial-friday.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/seguro-residencial-porto-2",
    },

    {
      id: 4,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large-2/srclarge-novembro-2024-celular-porto.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium-2/srcmedium-novembro-2024--celular-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile-3/srcmobile-novembro-2024-celular-black-friday.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/equipamentos-portateis-3",
    },
    {
      id: 5,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large-2/srclarge-novembro-2024-pet.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium-2/srcmedium-novembro-2024-pet-black-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile-3/srcmobile-novembro-2024-pet-black-friday.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/seguro-pet-porto",
    },
    {
      id: 6,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large/srclarge-novembro-2024-consorcio-imovel-black-friday.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium/srcmedium-novembro-2024-consorcio-imovel-black-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile/srcmobile-novembro-2024-consorcio-imovel-black-friday.png",
      alt: "Banner Consrociado de Imóvel para Telas Grandes",
      href: "/consorcio-imovel",
    },
    {
      id: 7,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large/srclarge-novembro-2024-consorcio-auto-black-friday.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium/srcmedium-novembro-2024-consorcio-auto-black-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile/srcmobile-novembro-2024-consorcio-auto-black-friday.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/consorcio-auto",
    },
    {
      id: 8,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large-2/srclarge-novembro-2024-odonto-black-friday.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium-2/srcmedium-novembro-2024-odonto-black-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile-3/srcmobile-novembro-2024-odontologico-black-friday.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/sulamerica-odonto",
    },
    {
      id: 9,
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
      id: 10,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large-2/srclarge-setembro-2024-celular-kakau-black-friday.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium-2/srcmedium-novembro-2024-celular-kakau-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile-3/srcmobile-novembro-2024-celular-kakau-black-friday.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/seguro-celular-kakau",
    },
    {
      id: 11,
      srcLarge:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/large/srclarge-novembro-2024-bike-black-friday.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/medium/srcmedium-novembro-2024-bike-black-friday.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banners/imgs-black-friday-2024/mobile/srcmobile-novembro-2024-bike-black-friday.png",
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
