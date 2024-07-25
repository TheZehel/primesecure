import React, { useState, useEffect } from "react";
import TitleHeader from "./TitleHeader";
import { useNavigate } from "react-router";

import ProgressManager from "../modules/progress";
import ValidateSteps from "../modules/_validations";
import GlobalFuntions from "../../../../globalsubcomponentes/globalFunctions";

const functions = new GlobalFuntions();
const validations = new ValidateSteps();
const progress = new ProgressManager();

const {
  validateFirstStep,
  validateSecondStep,
  validateThirdStep,
  validateFourthStep,
  validateFifthStep
} = validations;

const steps = [
  {
    title: "",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/",
  },
  {
    title: "",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/dados-cadastrais",
  },
  {
    title: "",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/endereco",
  },
  {
    title: "",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/cadastro-celular",
  },
  {
    title: "",
    color: "text-zinc-800",
    href: "/seguro-celular-kakau/cotacao/pagamento",
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

const goToStep = (step) => {
  const savedFormData = sessionStorage.getItem("phoneFormData");

  if (!savedFormData) {
    return false;
  }

  var formData = null;

  try {
    formData = JSON.parse(savedFormData) || {};
  } catch (e) {
    formData = {};
  }

  var errors = [];
  var canJump = true;
  var lastPage = 0;

  try {
    var {
      selectedPlan = {},
      dataPhone = {},
      buyerData = {},
      addressData = {},
      cardData = {}
    } = formData;

    var _function = [
      validateFirstStep,
      validateSecondStep,
      validateThirdStep,
      validateFourthStep,
      validateFifthStep
    ];

    var _data = [
      selectedPlan,
      buyerData,
      addressData,
      dataPhone,
      cardData
    ];

    //console.log(step);

    for (let i = 0; i < step; i++) {
      let errors = _function[i](_data[i]);

      //console.log('A', i, errors);

      if (errors.length > 0) {
        lastPage = i;
        canJump = false;
        //break;
      }
    }

    errors = _function[step](_data[step]);
    //console.log(canJump);
  } catch (e) {
    errors.push('error');
    canJump = false;
  }

  return canJump;
}

const Step = ({ step, index, position, navigateTo }) => {
  const lastCompletedStepIndex = parseInt(
    sessionStorage.getItem("lastCompletedStepIndex") || "0"
  );

  const isClickable = index <= lastCompletedStepIndex;
  var canJump = goToStep(index);

  if (index > 0 && goToStep(index - 1)){
    canJump = true;
  }

  return (
    <div
      className={`flex items-center z-50 space-x-2 ${
        canJump ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      onClick={() => {
        console.log(canJump)
        if (canJump) {
          navigateTo(step.href, index);
        }
      }}
      style={{ opacity: canJump ? 1 : 0.5 }}
    >
      <StepIcon number={index + 1} active={index === position} />
      <div
        className={`text-center ${
          index === position ? "text-cyan-500" : "text-zinc-800"
        } sm:text-md font-semibold`}
      >
        {step.title}
      </div>
    </div>
  );
};

export default function HeaderCotacao({ title, position }) {
  const navigate = useNavigate();
  const lastCompletedStep = parseInt(
    sessionStorage.getItem("lastCompletedStepIndex") || "-1",
    10
  );

  // Função correta para navegar
  const navigateTo = async (href, index) => {
    await progress.navigateTo(index + 1, href, navigate);
    //navigate(href);
  };
  return (
    <div>
      <TitleHeader title={title} />
      <div className="flex  items-center justify-center text relative mx-auto mt-3 sm:space-x-6 space-x-2 z-50">
        {steps.map((step, index) => (
          <Step
            key={index}
            step={step}
            index={index}
            position={position}
            navigateTo={navigateTo}
            href={(h) => {
              navigateTo(h);
            }}
            steps={lastCompletedStep}
          />
        ))}
      </div>
    </div>
  );
}
