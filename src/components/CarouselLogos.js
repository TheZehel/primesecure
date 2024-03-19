import React, { useState, useEffect } from "react";
//import { Carousel, IconButton } from "@material-tailwind/react";
import imageManager from "./bancoDeImagens";
import Slider from "react-infinite-logo-slider";

export function CarouselCustomArrows() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    //Limpar o evento ao desmontar o componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderWidth = windowWidth < 768 ? "100px" : "200px";

  return (
    <section className="mt-[50px] mb-[40px]">
      <h2 className="text-xl sm:text-4xl font-montserrat mx-2 text-grayPrime mt-10">
        Em Parceria Com As Maiores Do Mercado
      </h2>
      <div className="mb-10">
        <Slider
          width={sliderWidth}
          duration={40}
          pauseOnHover={false}
          blurBorders={false}
          blurBoderColor={"#fff"}
        >
          <Slider.Slide>
            <img
              src={imageManager.parceiros.logoPortoSeguro}
              alt="any"
              className="w-20 sm:w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src={imageManager.parceiros.logoSulAmerica}
              alt="any2"
              className="w-20 sm:w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src={imageManager.parceiros.logoBradesco}
              alt="any3"
              className="w-20 sm:w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src={imageManager.parceiros.logoSuhai}
              alt="any3"
              className="w-20 sm:w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src={imageManager.parceiros.logoOmint}
              alt="any3"
              className="w-20 sm:w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src={imageManager.parceiros.logoPreventSenior}
              alt="any3"
              className="w-20 sm:w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src={imageManager.parceiros.logoAmil}
              alt="any3"
              className="w-20 sm:w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src={imageManager.parceiros.logoUnimed}
              alt="any3"
              className="w-20 sm:w-36"
            />
          </Slider.Slide>
        </Slider>
      </div>
    </section>
  );
}
