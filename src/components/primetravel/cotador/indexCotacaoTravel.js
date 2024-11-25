import React, { useState } from "react";
import StepperControl from "./components/Stepper";
import Plans from "./components/plans";
import Resume from "./components/resume";
import Passengers from "./components/passengers";
import Payment from "./components/payment";

const IndexCotacaoTravel = () => {
  const [activeStep, setActiveStep] = useState(0); // Estado do passo atual
  const steps = [<Plans />, <Resume />, <Passengers />, <Payment />];

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

  return (
    <section className="max-w-5xl mx-auto mt-20">
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
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Avançar
        </button>
      </div>
    </section>
  );
};

export default IndexCotacaoTravel;
