import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "../../banner-mktplace/css/style.css";

export default function MiniBanner3() {
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
      srcLarge: "https://storage.googleapis.com/primesecure/src-large.svg",
      srcMedium: "https://storage.googleapis.com/primesecure/src-medium.svg",
      srcMobile:
        "https://storage.googleapis.com/primesecure/mini-banner-mobile.svg",
      alt: "Banner para Telas Grandes",
      href: "/primetravel",
    },
    {
      id: 2,
      srcLarge:
        "https://storage.googleapis.com/primesecure/mini-banner-src-large-celular.svg",
      srcMedium:
        "https://storage.googleapis.com/primesecure/mini-banner2-599x350.svg",
      srcMobile:
        "https://storage.googleapis.com/primesecure/mini-banner-src-mobile-celular.svg",
      alt: "Banner para Telas Grandes",
      href: "/equipamentos-portateis-3",
    },
  ];

  return (
    <div>
      <Swiper
        className="rounded-xl h-[141px] sm:h-[420px] "
        pagination={{ clickable: true }}
        loop={true}
        grabCursor={true}
        navigation={false}
        modules={[Navigation, Pagination, Autoplay]}
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
                viewportWidth >= 1899
                  ? banner.srcLarge
                  : viewportWidth >= 1024
                  ? banner.srcMedium
                  : banner.srcMobile
              }
              alt={banner.alt}
              className="h-full w-full cursor-pointer  "
              onClick={() => (window.location.href = banner.href)}
            />
          </SwiperSlide>
        ))}
        <div className="autoplay-progress2" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
