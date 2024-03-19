import React, { useState, useEffect, useRef } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function BannerPromos() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [imageSizes, setImageSizes] = useState({
    bannerDesktop1: { width: 1, height: 0 },
    bannerDesktop2: { width: 1, height: 0 },
    bannerMobile: { width: 1, height: 0 },
  });

  const bannerDesktop1Ref = useRef();
  const bannerDesktop2Ref = useRef();
  const bannerMobileRef = useRef();

  useEffect(() => {
    const updateScreenWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const loadImageSize = (imgRef, imgKey) => {
    const image = imgRef.current;
    if (image && image.complete) {
      setImageSizes((sizes) => ({
        ...sizes,
        [imgKey]: { width: image.width, height: image.height },
      }));
    }
  };

  useEffect(() => {
    loadImageSize(bannerDesktop1Ref, "bannerDesktop1");
    loadImageSize(bannerDesktop2Ref, "bannerDesktop2");
    loadImageSize(bannerMobileRef, "bannerMobile");
  }, []);

  const targetDate = new Date("December 31, 2023 00:00:00");

  const [isAfterTargetDate, setIsAfterTargetDate] = useState(false);

  useEffect(() => {
    setIsAfterTargetDate(new Date() > targetDate);
  }, []);

  return (
    <div className="m-1">
      <Carousel
        className="rounded-xl h-[100px] sm:h-[120px]"
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4 bg-white text-bluePrime border-[1px] border-grayPrime h-8 w-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-white text-bluePrime border-[1px] border-grayPrime h-8 w-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
      >
        <div>
          {isAfterTargetDate ? (
            // Após a data alvo, mostrar os banners de férias
            <div>
              {viewportWidth >= 1500 && (
                <img
                  ref={bannerDesktop1Ref}
                  src={imageManagerSeguroPet.bannersPromos.desktop1Carencia}
                  alt="Banner de Férias para Telas Grandes"
                  className="h-full w-full"
                />
              )}
              {viewportWidth >= 1024 && viewportWidth < 1500 && (
                <img
                  ref={bannerDesktop2Ref}
                  src={imageManagerSeguroPet.bannersPromos.desktop2Carencia}
                  alt="Banner de Férias para Telas Médias"
                  className="h-full w-full"
                />
              )}
              {viewportWidth < 1024 && (
                <img
                  ref={bannerMobileRef}
                  src={imageManagerSeguroPet.bannersPromos.mobileCarencia}
                  alt="Banner de Férias para Telas Pequenas"
                  className="h-full w-full"
                />
              )}
            </div>
          ) : (
            // Antes da data alvo, mostrar os banners de Natal
            <div>
              {viewportWidth >= 1500 && (
                <img
                  ref={bannerDesktop1Ref}
                  src={imageManagerSeguroPet.bannersPromos.desktop1Carencia}
                  alt="Banner de Férias para Telas Grandes"
                  className="h-full w-full"
                />
              )}
              {viewportWidth >= 1024 && viewportWidth < 1500 && (
                <img
                  ref={bannerDesktop2Ref}
                  src={imageManagerSeguroPet.bannersPromos.desktop2Carencia}
                  alt="Banner de Férias para Telas Médias"
                  className="h-full w-full"
                />
              )}
              {viewportWidth < 1024 && (
                <img
                  ref={bannerMobileRef}
                  src={imageManagerSeguroPet.bannersPromos.mobileCarencia}
                  alt="Banner de Férias para Telas Pequenas"
                  className="h-full w-full"
                />
              )}
            </div>
          )}
        </div>
      </Carousel>
    </div>
  );
}
