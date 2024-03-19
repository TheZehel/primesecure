import React from "react";

const BenefitCard = ({ image, title, description }) => {
  return (
    <div className="min-w-[300px] md:min-w-[300px] lg:max-w-[300px] md:w-auto bg-neutral-10 p-4 rounded-lg shadow-md mx-4 mb-4 md:mb-0">
      <img
        src={image.src}
        width="80"
        height="80"
        alt={image.alt}
        className="mb-4 h-auto mx-auto"
        loading="lazy"
        decoding="async"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <h4 className="text-md text-gray-600">{description}</h4>
    </div>
  );
};

const Benefits = () => {
  const benefitsData = [
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/icon-24-hours.svg",
        alt: "Relógio 24 horas",
      },
      title: "Proteção 24 horas",
      description: "Tenha proteção a qualquer hora do dia",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/icon-diamond.svg",
        alt: "icone de diamante",
      },
      title: "Suporte Premium",
      description: "Um time de especialistas para te ajudar",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/icon-payment.svg",
        alt: "icone de pagamento facilitado",
      },
      title: "Facilidade de Pagamento",
      description: "Realize o pagamento de forma simples e rápida",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/icon-custom.svg",
        alt: "icone de personalização",
      },
      title: "Um Seguro do Seu Jeito",
      description: "Tudo personalizado para você",
    },
  ];

  return (
    <section className="features page-keep mt-[120px]">
      <div className=" mx-auto ">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">
          Benefícios de se ter um seguro contratado
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

export default Benefits;
