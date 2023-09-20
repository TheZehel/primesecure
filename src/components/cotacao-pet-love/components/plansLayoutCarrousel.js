import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LayoutCotacaoPlanos from "./layoutCotacaoPlanos";

export default function PlansLayoutCarrousel({
  onPetAdded,
  pets,
  setPets,
  editingIndex,
}) {
  const PlanCard = ({
    title,
    price,
    features,
    resume,
    resumeDesc,
    bgColor,
    textColor,
    planId,
    selectedPlanId,
    setSelectedPlanId,
    petName,
    selectedPlan,
  }) => {
    var isSelected = planId === selectedPlan;
    console.log(selectedPlan);
    if (editingIndex !== null && selectedPlan === null) {
      // Editando o Pet e nenhum plano for selecionado
      let pet = pets[editingIndex];

      if (pet.plan.id === planId) {
        isSelected = true; // Caso esteja editando o pet o plano ja vem selecionado
        setSelectedPlanId(planId);
      }
    }

    return (
      <div
        className={`sm:w-82 w-90 h-[500px] m-4 rounded-2xl shadow border flex flex-col justify-between ${
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
            Selecionar Plano
          </span>
          <input
            type="radio"
            name="planSelection"
            className="mx-6 cursor-pointer"
            checked={isSelected}
            onChange={(e) => {
              setSelectedPlanId(planId);
            }}
          />
        </div>
        <div className="p-6 flex flex-col  flex-grow">
          <div className="flex justify-between gap-x-4 mb-5">
            <div
              className={`text-grayPrime text-opacity-80 text-2xl font-extrabold`}
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
        {/*<div className="p-6 flex-shrink-0">
          <button
            className={`w-full p-3 bg-${bgColor} text-${textColor} rounded-2xl`}
            onClick={handleAddPet}
          >
            Contratar
          </button>
            </div>*/}
      </div>
    );
  };

  const swiperRef = useRef(null);
  const [hasBounced, setHasBounced] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [addedPet, setAddedPet] = useState({});
  const [petName, setPetName] = useState(
    editingIndex !== null ? pets[editingIndex].name : ""
  ); // Caso esteja editando o pet já puxar o nome atribuido a ele na input

  const handleAddPet = () => {
    //Busca o plano pelo ID
    const selectedPlan = plans.find((plan) => plan.planId === selectedPlanId);

    //verifique se o plano foi encontrado
    if (selectedPlan) {
      onPetAdded({
        name: petName,
        plan: {
          id: selectedPlanId,
          title: selectedPlan.title,
          price: selectedPlan.bgColor.price,
        },
      });
      setAddedPet((prev) => ({
        ...prev,
        [selectedPlanId]: petName,
      }));
    }
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

  const submitPetText = editingIndex === null ? "Adicionar Pet" : "Salvar Pet"; //Caso esteja editando o pet, alterar nome do botão para salvar modificações

  const plans = [
    {
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
      petData: {
        name: petName,
      },
    },
    {
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
      title: "Essencial",
      price: "R$ 159,90",
      resume: "Todas as coberturas do plano Tranquilo +",
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
      <LayoutCotacaoPlanos />
      <div className="relative w-full h-full mx-auto text-center">
        <div className="relative w-full h-full mx-auto text-center text-zinc-800 text-3xl font-semibold sm:mt-10 mt-5">
          Qual é o nome do seu pet?
        </div>
        <div className="flex justify-center items-center h-24">
          <div className="w-96 h-24 relative mt-10">
            <input
              type="text"
              className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
              placeholder="Digite o nome do seu pet"
              maxLength="60"
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "24px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="relative w-full h-full mx-auto text-center text-zinc-800 text-2xl font-semibold sm:mt-10 mt-10">
        Agora Escolha Um Dos Planos Logo Abaixo:
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
                petName={petName}
                selectedPlan={selectedPlanId}
                addedPetName={addedPet[plan.planId]}
                setSelectedPlanId={(value) => {
                  setSelectedPlanId(value);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="w-[275px] p-3 bg-bluePrime hover:bg-bluePrime2 text-white rounded-2xl"
        onClick={handleAddPet}
      >
        {submitPetText}
      </button>
    </div>
  );
}
