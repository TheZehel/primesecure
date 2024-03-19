import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";

export default function MiniBanner2() {
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
        "https://storage.googleapis.com/primesecure/minibanner2-large-prime-susep2.svg",
      srcMedium:
        "https://storage.googleapis.com/primesecure/minibanner2-medium-prime-susep2.svg",
      srcMobile:
        "https://storage.googleapis.com/primesecure/minibanner2-mobile-prime-susep2.svg",
      alt: "Banner para Telas Grandes",
      pdfUrl: "https://storage.googleapis.com/primesecure/susep-prime.pdf",
    },
  ];

  const handleDownload = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

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
              onClick={() => handleDownload(banner.pdfUrl)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}