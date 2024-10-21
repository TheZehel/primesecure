// Dependências
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ModalDetails from "./subcomponents/ModalDetails";

import "swiper/css";
import "swiper/css/pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faArrowCircleLeft,
  faArrowCircleRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

// Subcomponents
import TitlePage from "./subcomponents/TitlePage";

const swiperBullets = (index, className) => {
  return `<span class="swiper-vida ${className}" style="background-color: #03a8db;"></span>`;
};

export default function PlanSlider({
  selectedPlanId,
  setSelectedPlanId,
  updateFormData,
}) {
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
    award,
    href,
    onSelectPlan,
  }) => {
    // Determina se o plano atual é o selecionado
    const isSelected = planId === selectedPlanId;

    const link =
      "https://www.sulamerica.com.br/manuais/CondicoesEspeciaisDaAssistenciaPessoal.pdf";

    //console.log(planId, selectedPlan)

    return (
      <div
        onClick={() => {
          setSelectedPlanId(planId);
          updateFormData({ selectedPlanId: planId });
        }}
        className={`min-w-[325px] h-[520px] m-4 ${isSelected ? "blue" : "red"}`}
      >
        <div className="min-w-[325px] max-w-[540px] mx-auto h-full rounded-2xl shadow border flex flex-col justify-between">
          <div
            className={`h-12 flex items-center justify-between ${
              isSelected ? "bg-bluePrime2" : `bg-${bgColor}`
            } rounded-tl-2xl rounded-tr-2xl border-b`}
          >
            <span
              className={`text-${textColor} text-md font-medium mx-6 mx-auto`}
            >
              {headTitle}
            </span>
          </div>
          <div className="px-4 py-4 flex flex-col  flex-grow">
            <div className="flex justify-between gap-x-4 mb-3">
              <div
                className={`text-grayPrime text-opacity-80 text-xl font-extrabold`}
              >
                {title}
              </div>
            </div>
            <div
              className={`text-left text-gray-500 text-opacity-80 text-sm font-normal mb-2 leading-4`}
            >
              {resumeDesc}
              <br />
            </div>
            <div className={`text-grayPrime text-3xl font-normal py-4`}>
              <span className="text-2xl">R$</span>{" "}
              <span className="font-bold text-4xl">{price}</span>{" "}
              <span className="text-2xl">/mês</span>
            </div>
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="w-3 h-3 p-1 bg-white rounded-full border border-cyan-500"
                />
                <div className="ml-2 text-sm">{award}</div>
              </div>
            </div>
            <div className="py-3 flex-shrink-0 flex items-center">
              <button
                className={`w-full p-2 bg-bluePrime flex items-center justify-center rounded-sm 
                ${isSelected ? "bg-bluePrime2" : `bg-${bgColor}`} 
                text-${textColor}`}
                onClick={() => {
                  setSelectedPlanId(planId);
                  updateFormData({ selectedPlanId: planId });
                }}
              >
                <input
                  className="accent-bluePrime rounded-full mr-2 cursor-pointer"
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => e.stopPropagation()}
                />
                {isSelected ? "Selecionado" : "Contratar"}
              </button>
            </div>
            <div
              className={`text-bluePrime2 text-sm text-start font-extrabold mb-2 mt-2`}
            >
              {resume}
              <br />
            </div>
            <div className="text-[10px]">
              {features.map((feature, idx) => {
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-[1px] px-[5px] bg-[#313131]/10 rounded-lg mb-[5px]`}
                  >
                    <div
                      className={`text-left text-grayPrime  py-[3px] px-[8px] flex font-semibold w-full`}
                    >
                      <div className="w-max my-auto">{feature.label}</div>
                      <div className="w-fit my-auto ml-auto text-right break-keep">
                        {feature.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-left mt-2 px-2">
              <div>
                {/*<a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-bluePrime hover:text-bluePrime2 font-semibold underline underline-offset-2"
                >
                  Ver detalhes...
                </a>*/}
                <div
                  className="text-sm text-bluePrime hover:text-bluePrime2 font-semibold underline underline-offset-2 cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Ver detalhes...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const swiperRef = useRef(null);
  const [hasBounced, setHasBounced] = useState(false);

  const [showModal, setShowModal] = useState(false);

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
      headTitle: "PRIME BASIC",
      title: "Pacote 1",
      price: "34,90",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência Pessoal + Assistência Residencial + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
      features: [
        {
          label: "Morte Acidental",
          value: "100 mil",
        },
        {
          label: "Invalidez Permanente Total por Acidente",
          value: "50 mil",
        },
        {
          label: "Funeral Familiar Até 10 mil",
          value: "(Prestação de Serviço)",
        },
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 1,
    },
    {
      headTitle: "PRIME SILVER",
      title: "Pacote 2",
      price: "42,50", //"42,49",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência Pessoal + Assistência Residencial + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
      //"Assistência pessoal + residencial + dezenas de serviços Desconto em farmácia + funeral familiar + Médico na Tela Familiar.",
      features: [
        {
          label: "Morte Acidental",
          value: "150 mil",
        },
        {
          label: "Invalidez Permanente Total por Acidente",
          value: "75 mil",
        },
        {
          label: "Funeral Familiar Até 10 mil",
          value: "(Prestação de Serviço)",
        },
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 2,
    },
    {
      headTitle: "PRIME GOLD",
      title: "Pacote 3",
      price: "50,14",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência Pessoal + Assistência Residencial + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
      features: [
        {
          label: "Morte Acidental",
          value: "200 mil",
        },
        {
          label: "Invalidez Permanente Total por Acidente",
          value: "100 mil",
        },
        {
          label: "Funeral Familiar Até 10 mil",
          value: "(Prestação de Serviço)",
        },
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 3,
    },
    {
      headTitle: "PRIME DIAMOND",
      title: "Pacote 4",
      price: "65,32", //"65,31",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência Pessoal + Assistência Residencial + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
      features: [
        {
          label: "Morte Acidental",
          value: "300 mil",
        },
        {
          label: "Invalidez Permanente Total por Acidente",
          value: "150 mil",
        },
        {
          label: "Funeral Familiar Até 10 mil",
          value: "(Prestação de Serviço)",
        },
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 4,
    },
  ];

  return (
    //Renderiza parte do Topo da Etapa de Cotação
    <div className="montserrat relative w-full h-full max-w-[1100px] mx-auto mt-20">
      <TitlePage />
      <ModalDetails
        display={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      />
      <div className="relative w-full h-full mx-auto text-center"></div>

      <div
        onMouseEnter={handleSlideBounce}
        onTouchStart={handleSlideBounce}
        className="cursor-grab relative swiper-vida-container pb-[10px]"
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          slidesPerView={1}
          effect="slide"
          speed={1000}
          pagination={{
            clickable: true,
            renderBullet: swiperBullets,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            760: { slidesPerView: 2 },
            1060: { slidesPerView: 3 },
            1920: { slidesPerView: 3 },
          }}
          modules={[Pagination]}
        >
          {plans.map((plan, idx) => (
            <SwiperSlide key={idx}>
              <PlanCard
                {...plan}
                selectedPlanId={selectedPlanId}
                setSelectedPlanId={setSelectedPlanId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="absolute ml-2 sm:ml-[-5px] left-0 top-[50%] transform -translate-y-1/2  cursor-pointer z-10"
        onClick={() => swiperRef.current.swiper.slidePrev()}
      >
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          size="2x"
          color="#03a8db"
          className="bg-white rounded-full"
        />
      </button>
      <button
        className="absolute mr-2 sm:mr-[-5px] right-0 top-[50%] transform -translate-y-1/2 cursor-pointer z-10"
        onClick={() => swiperRef.current.swiper.slideNext()}
      >
        <FontAwesomeIcon
          icon={faArrowCircleRight}
          size="2x"
          color="#03a8db"
          className="bg-white rounded-full"
        />
      </button>
    </div>
  );
}
