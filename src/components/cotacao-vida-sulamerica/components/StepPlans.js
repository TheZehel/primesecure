// Dependências
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

// Subcomponents
import TitlePage from "./subcomponents/TitlePage";
import ModalDetails from "./subcomponents/ModalDetails";

export default function PlanSlider({
  selectedPlanId,
  setSelectedPlanId,
  updateFormData
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

    const link = "https://www.sulamerica.com.br/manuais/CondicoesEspeciaisDaAssistenciaPessoal.pdf";


    //console.log(planId, selectedPlan)

    return (
      <div
        onClick={() => {
          setSelectedPlanId(planId);
          updateFormData({ selectedPlanId: planId });
        }}
        className={`sm:w-82 w-90 h-[600px] my-4 mx-2 rounded-2xl shadow border flex flex-col justify-between ${
          isSelected ? "blue" : "red"
        }`}
      >
        <div
          className={`h-12 flex items-center justify-between ${
            isSelected ? "bg-bluePrime2" : `bg-${bgColor}`
          } rounded-tl-2xl rounded-tr-2xl border-b`}
        >
          <span className={`text-${textColor} text-md font-medium mx-auto`}>
            {headTitle}
          </span>
        </div>
        <div className="py-4 px-4 flex flex-col h-[250px] flex-grow">
          <div className="flex justify-between gap-x-4 mb-3">
            <div
              className={`text-grayPrime text-opacity-80 text-xl font-extrabold`}
            >
              {title}
            </div>
          </div>
          <div
            className={`text-left text-bluePrime font-bold text-opacity-80 text-sm mb-2 leading-4`}
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
            className={`text-bluePrime2 text-sm text-start font-extrabold mb-1`}
          >
            {resume}
            <br />
          </div>

          <div>
            {features.map((feature, idx) => {
              var text = feature.split(" - ")[0] || "";
              var value = feature.split(" - ")[1] || "";

              if (value) {
                value = '- ' + value;
              }              

              if (text.includes("Morte")){
                text = '(MA) ' + text;
              }

              if (text.includes("Invalidez")){
                text = '(IPTA) ' + text;
              }

              return (
                <div
                  key={idx}
                  className={`text-left text-grayPrime text-xs font-medium mb-1 flex`}
                >
                  <div className="flex h-[16px] w-[12px]">
                    <div className="bg-grayPrime rounded w-[4px] h-[4px] m-auto"></div>
                  </div>
                  <div className="max-w-[170px] w-fit mr-[5px]">{text}</div>
                  <div>{value}</div>
                </div>
              )
              })}
          </div>
          {/* Div Namu */}
          <div>
            <div className="text-sm">
                <p>Ganhe acesso ao app:</p>
            </div>
          <div>
            <img src="https://storage.googleapis.com/primesecure/34bebeae-logo-namu.svg" className="w-[100px] mx-auto"/>
          </div>
          </div>
          <div className="text-left">
            <div>
            <a
  onClick={() => {
    setShowModal(true);
  }}
  className="text-sm text-bluePrime hover:text-bluePrime2 font-semibold underline underline-offset-2 cursor-pointer"
>
  Ver detalhes...
</a>
            </div>
          </div>
          <div className="text-left">
            <div>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bluePrime hover:text-bluePrime2 font-semibold underline underline-offset-2"
              >
                Condições...
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const swiperRef = useRef(null);
  const [hasBounced, setHasBounced] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);


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
      price: "32,05",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência Pessoal + App Namu + Faz tudo (Assistência Residencial) + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar + Rede Saúde Familiar.",
      features: [
        "Morte Acidental - 100 mil", 
        "Invalidez Permanente Total por Acidente - 100 mil",
        "Funeral Familiar Até 10 mil"
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 1,
    },
    /*{
      headTitle: "PRIME SILVER",
      title: "Pacote 2",
      price: "42,50",//"42,49",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência pessoal + residencial + dezenas de serviços Desconto em farmácia + funeral familiar + Médico na Tela Familiar.",
      features: [
        "Morte Acidental - 150 mil", 
        "Invalidez Permanente Total por Acidente - 75 mil",
        "Funeral Familiar Até 10 mil"
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 2,
    },*/
    {
      headTitle: "PRIME SILVER",
      title: "Pacote 2",
      price: "64,10",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência Pessoal + App Namu + Faz tudo (Assistência Residencial) + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar + Rede Saúde Familiar.",
      features: [
        "Morte Acidental - 200 mil", 
        "Invalidez Permanente Total por Acidente - 200 mil",
        "Funeral Familiar Até 10 mil"
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 3,
    },
    {
      headTitle: "PRIME GOLD",
      title: "Pacote 3",
      price: "96,15",//"65,31",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência Pessoal + App Namu + Faz tudo (Assistência Residencial) + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar + Rede Saúde Familiar.",
      features: [
        "Morte Acidental - 300 mil", 
        "Invalidez Permanente Total por Acidente - 300 mil",
        "Funeral Familiar Até 10 mil"
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 4,
    },
    {
      headTitle: "PRIME PLATINUM",
      title: "Pacote 4",
      price: "128,20",//"65,31",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência Pessoal + App Namu + Faz tudo (Assistência Residencial) + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar + Rede Saúde Familiar.",
      features: [
        "Morte Acidental - 400 mil", 
        "Invalidez Permanente Total por Acidente - 400 mil",
        "Funeral Familiar Até 10 mil"
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 5,
    },

    {
      headTitle: "PRIME DIAMOND",
      title: "Pacote 5",
      price: "160,20",//"65,31",
      award: "Sorteio de R$20.000,00",
      resume: "Detalhes:",
      resumeDesc:
        "Assistência Pessoal + App Namu + Faz tudo (Assistência Residencial) + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar + Rede Saúde Familiar.",
      features: [
        "Morte Acidental - 500 mil", 
        "Invalidez Permanente Total por Acidente - 500 mil",
        "Funeral Familiar Até 10 mil"
      ],
      bgColor: "bluePrime",
      textColor: "white",
      planId: 6,
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
          spaceBetween={20}
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
                openModal={() => {
                  setSelectedPlan(plan);
                  setShowModal(true);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
