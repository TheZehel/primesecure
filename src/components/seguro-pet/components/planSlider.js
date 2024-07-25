import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faTimes } from "@fortawesome/free-solid-svg-icons";
//import SearchIcon from "../../../assets/svg/searchIcon.svg";
//import { regions } from "./modules/regionsCredenciadas";
//import { useNavigate } from "react-router-dom";
import "swiper/css";

export default function PlanSlider({ onPlanSelected, openModalStep }) {
  const PlanCard = ({
    headTitle,
    title,
    price,
    features,
    resume,
    resumeDesc,
    bgColor,
    textColor,
    planId,
    selectedPlan,
    openModalStep,
  }) => {
    const isSelected = planId === selectedPlan;
    if (isSelected) {
      console.log("Plano Selecionado:", planId);
    }

    const openModal = (step) => {
      openModalStep(step);
    };

    return (
      <div
        className={`sm:w-82 w-90 h-[560px] m-4 rounded-2xl shadow border flex flex-col justify-between ${
          isSelected ? "blue" : "red"
        }`}
      >
        <div
          className={`h-12 flex items-center justify-between ${
            isSelected ? "bg-bluePrime2" : `bg-${bgColor}`
          } rounded-tl-2xl rounded-tr-2xl border-b`}
          style={{ borderColor: bgColor }}
        >
          <span className={`text-${textColor} text-md font-medium mx-6`}>
            {headTitle}
          </span>
        </div>
        <div className="p-6 flex flex-col  flex-grow">
          <div className="flex justify-between gap-x-4 mb-5">
            <div
              className={`text-grayPrime text-opacity-80 text-xl font-extrabold`}
            >
              {title}
            </div>
            <div className={`text-bluePrime text-2xl font-extrabold`}>
              {price}
            </div>
          </div>
          <div
            className={`text-bluePrime2 text-sm text-start font-extrabold mb-1`}
          >
            {resume}
            <br />
          </div>
          <div
            className={`text-left text-gray-500 text-opacity-80 text-sm font-normal mb-2 leading-4`}
          >
            {resumeDesc}
            <br />
          </div>
          <div>
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`text-left text-grayPrime text-opacity-80 text-sm font-medium mb-1`}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 flex-shrink-0">
          <button
            onClick={() => openModal(2)}
            className={`w-full p-3 bg-${bgColor} text-${textColor} rounded-2xl`}
          >
            Contratar
          </button>
        </div>
      </div>
    );
  };

  const swiperRef = useRef(null);
  const [hasBounced, setHasBounced] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const openModal = (step) => {
    openModalStep(step);
  };

  const handleSlideBounce = () => {
    if (!hasBounced) {
      setHasBounced(true);
      const swiper = swiperRef.current.swiper;
      swiper.slideNext(750);
      setTimeout(() => {
        swiper.slidePrev(750);
      }, 750);
    }
  };

  const plans = [
    {
      headTitle: "O mais em Conta",
      title: "Leve",
      price: "R$ 19,90",
      resume: "Coberturas Do Plano:",
      features: [
        "Vacinas obrigatórias",
        "Consultas em horário normal",
        "Microchipagem gratuita",
        "Clínico geral a domicílio",
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 1,
    },
    {
      headTitle: "Para Cuidados de Rotina",
      title: "Tranquilo",
      price: "R$ 49,90",
      resume: "Coberturas Do Plano:",
      features: [
        "Consultas em horário de plantão",
        "Vacinas obrigatórias",
        "Procedimentos clínicos",
        "Consultas em horário normal",
        "Microchipagem gratuita",
        "Clínico geral a domicílio",
        "Exames laboratoriais simples",
        "Exames laboratoriais complexos",
        "Exames de imagem",
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 2,
    },
    {
      headTitle: "Melhor Custo Benefício",
      title: "Ideal",
      price: "R$ 99,90",
      resume: "Todas as coberturas do plano Tranquilo +",
      resumeDesc:
        "Consultas em horário de plantão, Vacinas obrigatórias, Procedimentos clínicos, Consultas em horário normal, Microchipagem gratuita, Clínico geral a domicílio, Exames laboratoriais simples, Exames laboratoriais complexos, Exames de imagem",
      features: [
        "Especialistas",
        "Exames cardiológicos",
        "Cirurgias",
        "Anestesia inalatória",
        "Internação",
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 3,
    },
    {
      headTitle: "Mais Cobertura",
      title: "Essencial",
      price: "R$ 179,90",
      resume: "Todas as coberturas do plano Ideal +",
      resumeDesc:
        "Consultas em horário de plantão, Vacinas obrigatórias, Procedimentos clínicos, Consultas em horário normal, Microchipagem gratuita, Clínico geral a domicílio, Exames laboratoriais simples, Exames laboratoriais complexos, Exames de imagem, Especialistas, Exames cardiológicos, Cirurgias, Anestesia inalatória, Internação",
      features: ["Fisioterapia e Acupuntura", "Exames de Alta Complexidade"],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 4,
    },
  ];

  return (
    //Renderiza parte do Topo da Etapa de Cotação
    <div className="montserrat relative w-full h-full max-w-screen-lg mx-auto mt-20">
      <div className="relative w-full h-full mx-auto text-center"></div>
      <div className="relative w-full h-full mx-auto text-center text-zinc-800 text-2xl font-semibold sm:mt-10 mt-10">
        <h2 className="text-center text-3xl sm:text-5xl text-primary font-bold mb-12 text-grayPrime">
          Confira Nossos Planos:
        </h2>
      </div>
      <div
        onMouseEnter={handleSlideBounce}
        onTouchStart={handleSlideBounce}
        className="cursor-grab"
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={1}
          effect="slide"
          speed={1000}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1920: { slidesPerView: 3 },
          }}
        >
          {plans.map((plan, idx) => (
            <SwiperSlide key={idx}>
              <PlanCard
                {...plan}
                selectedPlan={selectedPlanId}
                setSelectedPlanId={(value) => {
                  setSelectedPlanId(value);
                }}
                openModalStep={(step) => openModal(step)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
