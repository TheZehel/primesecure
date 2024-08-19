import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faHome,
  faDollarSign,
  faHouse,
  faHouseFlag,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const BenefitCard = ({ icon, title, description, href }) => {
  return (
    <div className="min-w-[300px] h-[280px] md:min-w-[300px] lg:max-w-[300px] md:w-auto bg-neutral-10 p-4 rounded-lg shadow-md mx-4 mb-4 md:mb-0 flex flex-col justify-content-between">
      <div className="">
        <FontAwesomeIcon
          icon={icon}
          size="3x"
          className="mb-4 mx-auto text-bluePrime"
        />
        <h3 className="text-lg font-semibold text-grayPrime">{title}</h3>
        <h4 className="text-md text-gray-600 text-center mb-4">
          {description}
        </h4>
      </div>
    </div>
  );
};

const Assistance = () => {
  const benefitsData = [
    {
      icon: faHouseFlag,
      title: "Primeiro imóvel",
      description:
        "Adquira seu primeiro imóvel com economia e sem juros. Simule agora!",
      href: "https://app.kakau.co/plans/manual?code=karfqa",
    },
    {
      icon: faHome,
      title: "Mudar de Imóvel",
      description: "Troque de imóvel com economia e sem juros. Simule agora!",
      href: "https://app.kakau.co/plans/manual?code=karf",
    },
    {
      icon: faDollarSign,
      title: "Investimento",
      description:
        "Torne seus projetos realidade com investimentos inteligentes e econômicos.",
      href: "https://app.kakau.co/plans/manual?code=kaqa",
    },
  ];

  return (
    <section className="features page-keep mt-[80px]">
      <div className=" mx-auto ">
        <h2 className="text-xl sm:text-4xl my-6 text-grayPrime">
          Qual será sua próxima vitória? Simule imediatamente! É veloz!
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
