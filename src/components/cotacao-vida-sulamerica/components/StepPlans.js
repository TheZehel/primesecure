// Dependências
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

// Subcomponents
import TitlePage from "./subcomponents/TitlePage";

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
        className={`sm:w-82 w-90 h-[500px] m-4 rounded-2xl shadow border flex flex-col justify-between ${
          isSelected ? "blue" : "red"
        }`}
      >
        <div
          className={`h-12 flex items-center justify-between ${
            isSelected ? "bg-bluePrime2" : `bg-${bgColor}`
          } rounded-tl-2xl rounded-tr-2xl border-b`}
        >
          <span className={`text-${textColor} text-md font-medium mx-6`}>
            {headTitle}
          </span>
        </div>
        <div className="p-6 flex flex-col  flex-grow">
          <div className="flex justify-between gap-x-4 mb-5">
            <div
              className={`text-grayPrime text-opacity-80 text-2xl font-extrabold`}
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
          <div className="flex items-center justify-center mb-5">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faMoneyBill}
                className="w-3 h-3 p-1 bg-white rounded-full border border-cyan-500"
              />
              <div class="ml-2 text-sm">{award}</div>
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
            className={`text-bluePrime2 text-sm text-start font-extrabold mb-1`}
          >
            {resume}
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
          <div className="text-left">
            <div>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-bluePrime hover:text-bluePrime2 font-semibold underline underline-offset-2"
              >
                Ver detalhes...
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const swiperRef = useRef(null);
  const [hasBounced, setHasBounced] = useState(false);

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
      title: "Pacote 1",
      price: "19,90",
      award: "Sorteio de R$10.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência pessoal + residencial + dezenas de serviços Desconto em farmácia + funeral familiar.",
      features: ["Vida - 100 mil.", "MA - 250 mil", "IPA - 50 mil"],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 1,
    },
    {
      headTitle: "Para Cuidados de Rotina",
      title: "Pacote 2",
      price: "49,90",
      award: "Sorteio de R$10.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência pessoal + residencial + dezenas de serviços Desconto em farmácia + funeral familiar.",
      features: ["Vida - 250 mil.", "MA - 250 mil", "IPA - 100 mil"],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 2,
    },
    {
      headTitle: "Melhor Custo Benefício",
      title: "Pacote 3",
      price: "99,90",
      award: "Sorteio de R$10.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência pessoal + residencial + dezenas de serviços Desconto em farmácia + funeral familiar.",
      features: ["Vida - 500 mil.", "MA - 500 mil", "IPA - 150 mil"],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 3,
    },
    {
      headTitle: "Mais Cobertura",
      title: "Pacote 4",
      price: "179,90",
      award: "Sorteio de R$10.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência pessoal + residencial + dezenas de serviços Desconto em farmácia + funeral familiar.",
      features: ["Vida - 750 mil.", "MA - 750 mil", "IPA - 250 mil"],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 4,
    },
  ];

  return (
    //Renderiza parte do Topo da Etapa de Cotação
    <div className="montserrat relative w-full h-full max-w-screen-lg mx-auto mt-20">
      <TitlePage />
      <div className="relative w-full h-full mx-auto text-center"></div>

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
                selectedPlanId={selectedPlanId}
                setSelectedPlanId={setSelectedPlanId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
