import React from "react";
import imageManagerSeguroBike from "../banco-de-imagens/BancoDeImagensSeguroBike";

const BenefitCard = ({ image, title, description, href }) => {
  return (
    <div className="min-w-[300px] h-[360px] md:min-w-[300px] lg:max-w-[300px] md:w-auto bg-neutral-10 p-4 rounded-lg shadow-md mx-4 mb-4 md:mb-0 flex flex-col justify-content-between">
      <div>
        <img
          src={image.src}
          width="80"
          height="80"
          alt={image.alt}
          className="mb-4 h-auto mx-auto"
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
        src: imageManagerSeguroBike.Plans.planPerformance,
        alt: "Performance",
      },
      title: "Performance",
      description:
        "Roubo e furto qualificado Quebra Acidental Assistência 24h ilimitada (Chaveiro, Transporte e Reboque).",
      href: "https://app.kakau.co/plans/manual?code=mobi_perform",
    },
    {
      image: {
        src: imageManagerSeguroBike.Plans.planActive,
        alt: "icone de diamante",
      },
      title: "Ativo",
      description:
        "Roubo e furto qualificado Quebra Acidental Assistência 24h (Chaveiro, Transporte e Reboque).",
      href: "https://app.kakau.co/plans/manual?code=mobi_active",
    },
    {
      image: {
        src: imageManagerSeguroBike.Plans.planUrban,
        alt: "icone de pagamento facilitado",
        href: "",
      },
      title: "Urbano",
      description: "Roubo e furto qualificado.",
      href: "https://app.kakau.co/plans/manual?code=mobi_urban",
    },
  ];

  return (
    <section className="features page-keep mt-[80px]">
      <div className=" mx-auto ">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">
          Conheça os nossos planos.
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
