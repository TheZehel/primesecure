import React from "react";
import imageManagerSeguroCelularKakau from "../banco-de-imagens/BancoDeImagensSeguroCelularKakau";

const BenefitCard = ({ image, title, description, href }) => {
  return (
    <div className="min-w-[300px] h-[360px] md:min-w-[300px] lg:max-w-[300px] md:w-auto bg-neutral-10 p-4 rounded-lg shadow-md mx-4 mb-4 md:mb-0 flex flex-col justify-content-between">
      <div className="">
        <img
          src={image.src}
          width="120"
          height="120"
          alt={image.alt}
          className="mb-4 w-[120px] h-[120px] mx-auto"
          loading="lazy"
          decoding="async"
        />
        <h3 className="text-lg font-semibold text-grayPrime">{title}</h3>
        <h4 className="text-md text-gray-600 text-center mb-4">
          {description}
        </h4>
      </div>
      <a
        href={href}
        className="hover:underline text-sm text-gray-600 self-center mt-auto decoration-bluePrime font-bold"
        target="_blank"
        rel="noreferrer"
      >
        Baixe o manual do usuário e conheça todas as condições para contratação.
      </a>
    </div>
  );
};

const Assistance = () => {
  const benefitsData = [
    {
      image: {
        src: imageManagerSeguroCelularKakau.Plans.protegeSmrtThief,
        alt: "Roubo e Quebra",
      },
      title: "Roubo e Quebra",
      description:
        "Proteção contra roubo ou furto qualificado, registrado por um boletim de ocorrência, queda e danos causados ao aparelho.",
      href: "https://app.kakau.co/plans/manual?code=karfqa",
    },
    {
      image: {
        src: imageManagerSeguroCelularKakau.Plans.protegeThief,
        alt: "Roubo ou furto qualificado",
      },
      title: "Roubo ou furto qualificado",
      description:
        "Proteção contra roubo ou furto qualificado, registrado por um boletim de ocorrência.",
      href: "https://app.kakau.co/plans/manual?code=karf",
    },
    {
      image: {
        src: imageManagerSeguroCelularKakau.Plans.protegeSmrtBroke,
        alt: "icone de pagamento facilitado",
        href: "",
      },
      title: "Quebra acidental",
      description: "Proteção contra queda e danos causados ao aparelho.",
      href: "https://app.kakau.co/plans/manual?code=kaqa",
    },
  ];

  return (
    <section className="features page-keep mt-[80px]">
      <div className=" mx-auto ">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">
          Conheça nossos planos.
        </h2>
        <div className="md:flex md:justify-center md:items-center mt-[50px]">
          <div className="flex overflow-x-auto scrollbar-hide pb-4 md:overflow-x-hidden">
            {benefitsData.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assistance;
