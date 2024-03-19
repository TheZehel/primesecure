import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";

export default function MiniBanner1() {
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

  const banners = [
    {
      id: 1,
      srcLarge:
        "https://storage.googleapis.com/primesecure/minibanner1-large-formas-de-pagamento.svg",
      srcMedium:
        "https://storage.googleapis.com/primesecure/minibanner1-medium-formas-de-pagamento.svg",
      srcMobile:
        "https://storage.googleapis.com/primesecure/minibanner1-mobile-formas-de-pagamento.svg",
      alt: "Banner para Telas Grandes",
      href: "",
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
        modules={[Pagination, Navigation]}
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
              className="h-full w-full cursor-pointer  "
              onClick={() => (window.location.href = banner.href)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
