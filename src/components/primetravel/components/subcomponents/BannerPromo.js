import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../../banner-mktplace/css/style.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function BannerPromo() {
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
        "https://storage.googleapis.com/primesecure/banner-promo-carnaval-travel-2023-desktop1-v2.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/banner-promo-carnaval-travel-2023-desktop2.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/banner-promo-carnaval-travel-2023-mobile-v2.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/primetravel",
    },
    {
      id: 2,
      srcLarge:
        "https://storage.googleapis.com/primesecure/primetravel/banners/2024/janeiro/todas-as-idades/srclarge-todas%20as%20idades-primetravel.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/primetravel/banners/2024/janeiro/todas-as-idades/srcmedium-todas%20as%20idades-primetravel.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/primetravel/banners/2024/janeiro/todas-as-idades/srcmobile-todas%20as%20idades-primetravel.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/primetravel",
    },
    {
      id: 3,
      srcLarge:
        "https://storage.googleapis.com/primesecure/primetravel/banners/2024/janeiro/telemedicina/srclarge-telemedicina-primetravel.png",
      srcMedium:
        "https://storage.googleapis.com/primesecure/primetravel/banners/2024/janeiro/telemedicina/srcmedium-telemedicina-primetravel.png",
      srcMobile:
        "https://storage.googleapis.com/primesecure/primetravel/banners/2024/janeiro/telemedicina/srcmobile-telemedicina-primetravel.png",
      alt: "Banner de Natal para Telas Grandes",
      href: "/primetravel",
    },
    // Adicione mais banners aqui conforme necessário
  ];

  return (
    <div className="m-1">
      <Swiper
        className="rounded-xl h-[100px] sm:h-[120px]"
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
        <div className="autoplay-progress3 " slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
