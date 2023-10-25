import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LayoutCotacaoPlanos from "./layoutCotacaoPlanos";

const formatCurrency = (value) => {
  let options = {  
    style: 'decimal', 
    useGrouping: true, 
    groupingSeparator: '.', 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  };

  let price = value.toLocaleString(undefined, options);
  return price;
}

export default function PlansLayoutCarrousel({
  onPetAdded,
  pets,
  setPets,
  editingIndex,
  cancel
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
    //console.log(selectedPlan);
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

  const PlanCardTest = ({
    planData,
    //title,
    //price,
    //features,
    //resume,
    //resumeDesc,
    bgColor,
    textColor,
    //planId,
    selectedPlanId,
    setSelectedPlanId,
    petName,
    selectedPlan,
    coverageHeight
  }) => {

    planData = planData || {};

    planData.planId = planData.planId || null;

    planData.name = planData.name || '';
    planData.name = planData.name.replace('Petlove', '');
    planData.name = planData.name.trim();

    planData.subtitle = planData.subtitle || '';

    planData.price = formatCurrency(planData.price);

    planData.coverage = planData.coverage || [];

    coverageHeight = coverageHeight || 500;
    coverageHeight = coverageHeight.toString();

    var isSelected = planData.planId === selectedPlan && planData.planId !== null;

    if (editingIndex !== null && selectedPlan === null) {
      // Editando o Pet e nenhum plano for selecionado
      let pet = pets[editingIndex];

      if (pet.plan.id === planData.planId) {
        isSelected = true; // Caso esteja editando o pet o plano ja vem selecionado
        setSelectedPlanId(planData.planId);
      }
    }
    //console.log(planData)

    return (
      <div
        className={`sm:w-82 w-90 m-4 max-w-[350px] mx-auto rounded-2xl shadow border flex flex-col justify-between ${
          isSelected ? "blue" : "red"
        }`}
      >
        <div
          className={`h-12 flex items-center justify-between cursor-pointer ${
            isSelected ? "bg-bluePrime2" : `bg-${bgColor}`
          } rounded-tl-2xl rounded-tr-2xl border-b`}
          style={{ borderColor: bgColor }}
          onClick={(e) => {
            setSelectedPlanId(planData.planId);
          }}
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
              setSelectedPlanId(planData.planId);
            }}
          />
        </div>
        <div className="p-6 flex flex-col  flex-grow">
          <div className="flex justify-between gap-x-4 mb-1">
            <div
              className={`text-grayPrime text-opacity-80 text-xl font-extrabold`}
            >
              {planData.name}
            </div>
            <div className={`text-bluePrime text-xl font-extrabold`}>
              R$ {planData.price}
            </div>
          </div>
          <div
            className={`text-grayPrime text-opacity-90 text-base text-start font-medium mb-3`}
          >
            {planData.subtitle}
            <br />
          </div>
          {/*<div
            className={`text-left text-gray-500 text-opacity-80 text-sm font-normal mb-2 leading-4`}
          >
            {resumeDesc}
            <br />
          </div>*/}
          <div 
            className="mt-2"
            style={{ height: `${coverageHeight}px` }}>
            {planData.coverage.map((coverage, id) => (
              <div
                key={id}
                className={`text-left text-grayPrime text-opacity-80 text-sm font-medium mb-1`}
              >
                {coverage.title}
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

  const inputNameRef = useRef(null);
  const planListRef = useRef(null);

  const [hasBounced, setHasBounced] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [addedPet, setAddedPet] = useState({});
  const [petName, setPetName] = useState(
    editingIndex !== null ? pets[editingIndex].name : ""
  ); // Caso esteja editando o pet já puxar o nome atribuido a ele na input

  const [errorList, setErrorList] = useState([]);

  const handleAddPet = () => {
    //Busca o plano pelo ID
    const selectedPlan = planList.find((plan) => plan.planId === selectedPlanId);

    console.log(selectedPlan)
    if (!petName){
      // Valida se nome do pet não esta vázio
      setErrorList([...errorList, 'pet-name']);

      // Sobe scroll para input de nome do pet
      if (inputNameRef.current){
        inputNameRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });        
      }
      return;
    }

    //verifique se o plano foi encontrado
    if (selectedPlan) {
      // Remove o 'select-plan' da errorList, antes de adicionar o pet
      const errors = errorList.filter(error => error !== 'select-plan');
      setErrorList([...errors]);

      onPetAdded({
        name: petName,
        plan: {
          id: selectedPlanId,
          title: selectedPlan.name,
          price: selectedPlan.price,
        },
      });     
      
      setAddedPet((prev) => ({
        ...prev,
        [selectedPlanId]: petName,
      }));

    }else{
      // Sobe scroll para selects de plano pet
      if (planListRef.current){
        planListRef.current.scrollIntoView({ 
          behavior: 'instant',
          block: 'start'
        });
        window.scrollBy(0, -40)
      }      
      // Case contrario adiciona 'select-plan' na array de erros para futura marcação
      setErrorList([...errorList, 'select-plan']);
      return;
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

  var planList = [
    {
			"name": "Petlove Tranquilo",
			"subtitle": "O mais em conta!",
			"contractFile": "",
			"price": 49.90,
			"planId": 132,
			"coverage": [
				{
					"title": "Consultas em horário normal"
				},
				{
					"title": "Consultas em horário de plantão"
				},
				{
					"title": "Vacinas obrigatórias"
				},
				{
					"title": "Exames gerais"
				},
				{
					"title": "Raio x"
				},
				{
					"title": "Procedimentos clínicos"
				},
				{
					"title": "Exames de imagem"
				}
			],
			"default": true
		},
		{
			"name": "Petlove Leve",
			"subtitle": "Plano mais barato",
			"contractFile": "",
			"price": 19.90,
			"planId": 134,
			"coverage": [
				{
					"title": "Consultas em horário normal"
				},
				{
					"title": "Consultas em horário de plantão"
				},
				{
					"title": "Vacinas obrigatórias"
				}
			],
			"default": true
		}
  ];

  planList.sort((a, b)=>{
    if (a.price > b.price){
      return 1;
    }
    if (a.price < b.price){
      return -1;
    }
    return 0;
  });

  var sliderHeight = 0;

  for(let i in planList){
    let plan = planList[i];
    let coverageHeight = ( plan.coverage.length * (20 + 5) ) + 40;

    if (coverageHeight > sliderHeight){
      sliderHeight = coverageHeight;
    }
  };

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
      <LayoutCotacaoPlanos/>
      <div className="relative w-full h-full mx-auto text-center">
        <div className="relative w-full h-full mx-auto text-center text-zinc-800 text-3xl font-semibold sm:mt-10 mt-5">
          Qual é o nome do seu pet?
        </div>
        <div className="flex justify-center items-center h-24">
          <div className="w-90 h-24 relative mt-10 sm:w-96">
            <input
              type="text"
              ref={inputNameRef}
              className={`w-full h-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime focus:placeholder ${(errorList.includes('pet-name')) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime placeholder"}`}
              placeholder="Digite o nome do seu pet"
              maxLength={40}
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value={petName}
              onChange={(e) => {
                var errors = errorList.filter(error => error !== 'pet-name');
                var value = e.target.value.toString();   

                if (value){ 
                  setErrorList([...errors]);
                  setPetName(value);
                }else{
                  setErrorList([...errors, 'pet-name']);
                  setPetName(value);
                }  
              }}
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "24px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
        </div>
      </div>
      <div 
        className="relative w-full h-full mx-auto text-center text-zinc-800 text-2xl font-semibold sm:mt-20 mt-20" 
        ref={planListRef}
      >
        Agora Escolha Um Dos Planos Logo Abaixo:
      </div>
      <div
        onMouseEnter={handleSlideBounce}
        onTouchStart={handleSlideBounce}
        className="cursor-grab mt-4"
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={1}
          effect="slide"
          speed={1000}
          breakpoints={{
            640: { slidesPerView: (planList.length < 2) ? planList.length : 2 },
            1024: { slidesPerView: (planList.length < 3) ? planList.length : 3 },
            1920: { slidesPerView: (planList.length < 3) ? planList.length : 3 },
          }}
        >
          {/*plans.map((plan, idx) => (
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
              ))*/
            planList.map((plan, id)=>{
              //console.log(plan)
              return(
                <SwiperSlide key={id}>
                  <PlanCardTest
                    planData={plan}                    
                    bgColor={"bluePrime"}
                    textColor={"white"}
                    petName={petName}
                    selectedPlan={selectedPlanId}
                    addedPetName={addedPet[plan.planId]}
                    setSelectedPlanId={setSelectedPlanId}
                    coverageHeight={sliderHeight}
                  />
                </SwiperSlide>                
              );

            })
          }
        </Swiper>
      </div>
      <div class="mx-auto mt-5 max-w-[600px]">
        <div class={`flex ${(editingIndex !== null || pets.length > 0) ? "mx-4 space-x-4" : "w-fit mx-auto"}`}>
          <button
            className={`w-1/2 p-3 bg-gray-500/75 hover:bg-gray-500 text-white rounded-2xl ${(editingIndex !== null || pets.length > 0) ? "block" : "hidden"}`}
            onClick={cancel}
          >
            Cancelar
          </button>
          <button
            className={`w-1/2 p-3 bg-bluePrime hover:bg-bluePrime2 text-white rounded-2xl ${(editingIndex !== null || pets.length > 0) ? "w-1/2" : "w-[275px]"}`}
            onClick={handleAddPet}
          >
            {submitPetText}
          </button>
        </div>
      </div>
    </div>
  );
}
