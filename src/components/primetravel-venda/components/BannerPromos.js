import React, { useState, useEffect, useRef } from "react";
import imageManagerPrimeTravelLpVenda from "../bancodeimagens/BancoDeImgsTravelVenda";

export default function BannerPromos() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [imageSizes, setImageSizes] = useState({
    bannerNatal: { width: 1, height: 0 },
    bannerNatal1350x200: { width: 1, height: 0 },
    bannerNatalMobileCupom: { width: 1, height: 0 },
  });

  const bannerNatalRef = useRef();
  const bannerNatal1350x200Ref = useRef();
  const bannerNatalMobileCupomRef = useRef();

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
    loadImageSize(bannerNatalRef, "bannerNatal");
    loadImageSize(bannerNatal1350x200Ref, "bannerNatal1350x200");
    loadImageSize(bannerNatalMobileCupomRef, "bannerNatalMobileCupom");
  }, []);

  const targetDate = new Date("December 31, 2023 00:00:00");

  const [isAfterTargetDate, setIsAfterTargetDate] = useState(false);

  useEffect(() => {
    setIsAfterTargetDate(new Date() > targetDate);
  }, []);

  return (
    <div>
      {isAfterTargetDate ? (
        // Após a data alvo, mostrar os banners de férias
        <div>
          {viewportWidth >= 1500 && (
            <img
              src={
                imageManagerPrimeTravelLpVenda.BannersPromo.bannerFerias15Large
              }
              alt="Banner de Férias para Telas Grandes"
              className="h-full w-full"
            />
          )}
          {viewportWidth >= 1024 && viewportWidth < 1500 && (
            <img
              src={
                imageManagerPrimeTravelLpVenda.BannersPromo.bannerFerias15Medium
              }
              alt="Banner de Férias para Telas Médias"
              className="h-full w-full"
            />
          )}
          {viewportWidth < 1024 && (
            <img
              src={
                imageManagerPrimeTravelLpVenda.BannersPromo.bannerFerias15Mobile
              }
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
              ref={bannerNatalRef}
              src={
                imageManagerPrimeTravelLpVenda.BannersPromo
                  .bannerAnoNovoDesktop2
              }
              alt="Banner de Natal para Telas Grandes"
              className="h-full w-full"
            />
          )}
          {viewportWidth >= 1024 && viewportWidth < 1500 && (
            <img
              ref={bannerNatal1350x200Ref}
              src={
                imageManagerPrimeTravelLpVenda.BannersPromo
                  .bannerAnoNovoDesktop1
              }
              alt="Banner de Natal para Telas Médias"
              className="h-full w-full"
            />
          )}
          {viewportWidth < 1024 && (
            <img
              ref={bannerNatalMobileCupomRef}
              src={
                imageManagerPrimeTravelLpVenda.BannersPromo.bannerAnoNovoMobile
              }
              alt="Banner de Natal para Telas Pequenas"
              className="h-full w-full"
            />
          )}
        </div>
      )}
    </div>
  );
}
