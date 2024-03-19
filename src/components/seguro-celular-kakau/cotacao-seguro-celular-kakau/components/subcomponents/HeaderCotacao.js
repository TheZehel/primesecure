import React, { useState, useEffect } from "react";
import TitleHeader from "./TitleHeader";
import { useNavigate } from "react-router";

const steps = [
  {
    title: "Cotação",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/",
    step: 1,
  },
  {
    title: "Dados Cadastrais",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/dados-cadastrais",
    step: 2,
  },
  {
    title: "Endereço",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/endereco",
    step: 3,
  },
  {
    title: "Cadastro Celular",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/cadastro-celular",
    step: 4,
  },
  {
    title: "Pagamento",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/pagamento",
    step: 5,
  },
];

const StepIcon = ({ number, active }) => (
  <svg
    width="24"
    height="24"
    className={`fill-current ${active ? "text-cyan-500" : "text-zinc-300"}`}
  >
    <circle cx="12" cy="12" r="12" />
    <text
      x="12"
      y="19"
      textAnchor="middle"
      fontWeight="bold"
      fontSize="18px"
      fill="white"
    >
      {number}
    </text>
  </svg>
);

const Step = ({ step, position, navigateTo }) => (
  <div
    className="flex items-center space-x-2 cursor-pointer"
    onClick={() => navigateTo(step.href, step.step)}
  >
    <StepIcon number={step.step} active={step.step === position} />
    <div
      className={`text-center ${
        step.step === position ? "text-cyan-500" : "text-zinc-800"
      } sm:text-md font-semibold`}
    >
      {step.title}
    </div>
  </div>
);

export default function HeaderCotacao({ title, position: initialPosition }) {
  const [position, setPosition] = useState(initialPosition || 0);
  const [maxPositionReached, setMaxPositionReached] = useState(
    initialPosition || 0
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (position > maxPositionReached) {
      setMaxPositionReached(position);
    }
  }, [position]);

  const navigateTo = (href, stepNumber) => {
    if (stepNumber <= maxPositionReached + 1) {
      navigate(href);
      setPosition(stepNumber);

      if (stepNumber > maxPositionReached) {
        setMaxPositionReached(stepNumber);
      }
    }
  };

  return (
    <div>
      <TitleHeader title={title} />
      <div className="flex items-center justify-center text relative mx-auto mt-3 sm:space-x-6 space-x-2">
        {steps.map((step) => (
          <Step
            key={step.step}
            step={step}
            position={position}
            navigateTo={navigateTo}
          />
        ))}
      </div>
    </div>
  );
}
