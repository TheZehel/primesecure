import React, { useState, useRef } from "react";
import StepperControl from "./components/Stepper";
import Plans from "./components/plans";
import Resume from "./components/resume";
import Passengers from "./components/passengers";
import Payment from "./components/payment";

const IndexCotacaoTravel = () => {
  const [activeStep, setActiveStep] = useState(0); // Estado do passo atual
  const avancarRef = useRef(null); // Referência para o botão "Avançar"
  const [shouldBounce, setShouldBounce] = useState(false);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  // Função para rolar a tela até o botão "Avançar"
  const scrollTo = () => {
    if (avancarRef.current) {
      avancarRef.current.scrollIntoView({ behavior: "smooth" });
      // Depois de um pequeno delay, adiciona a animação bounce
      setTimeout(() => {
        setShouldBounce(true);
        // Remove a animação após 1 segundo, para não ficar infinita
        setTimeout(() => {
          setShouldBounce(false);
        }, 1000);
      }, 500);
    }
  };

  // Array de componentes dos passos
  const steps = [
    <Plans handleNext={handleNext} onSelected={scrollTo} />,
    <Resume />,
    <Passengers />,
    <Payment />,
  ];

  return (
    <section className="max-w-6xl mx-auto mt-10">
      <StepperControl activeStep={activeStep} />
      <div className="my-10">{steps[activeStep]}</div>
      <div className="flex justify-between mt-10">
        <button
          onClick={handleBack}
          disabled={activeStep === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Voltar
        </button>
        <button
          ref={avancarRef}
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          className={`px-4 py-2 bg-bluePrime text-white rounded ${shouldBounce ? 'animate-bounce' : ''}`}
        >
          Avançar
        </button>
      </div>
    </section>
  );
};

export default IndexCotacaoTravel;
