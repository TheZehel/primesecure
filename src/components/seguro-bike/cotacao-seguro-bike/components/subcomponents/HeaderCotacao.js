import TitleHeader from "./TitleHeader";
import { useNavigate } from "react-router";
import GlobalFuntions from "../../../../globalsubcomponentes/globalFunctions";
import axios from "axios";

import ValidateSteps from "../modules/_validations";

const functions = new GlobalFuntions();
const validations = new ValidateSteps();

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

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
    href: "/seguro-bike/cotacao/",
  },
  {
    title: "",
    color: "text-zinc-800",
    href: "/seguro-bike/cotacao/dados-cadastrais",
  },
  {
    title: "",
    color: "text-zinc-800",
    href: "/seguro-bike/cotacao/endereco",
  },
  {
    title: "",
    color: "text-zinc-800",
    href: "/seguro-bike/cotacao/cadastro-bike",
  },
  {
    title: "",
    color: "text-zinc-800",
    href: "/seguro-bike/cotacao/pagamento",
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
  const savedFormData = sessionStorage.getItem("bikeFormData");

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
      selectedPlanId = {},
      dataBike = {},
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
      selectedPlanId,
      buyerData,
      addressData,
      dataBike,
      cardData
    ];

    //console.log(step);

    for (let i = 0; i < step; i++) {
      let errors = _function[i](_data[i]);

      if (errors.length > 0) {
        lastPage = i;
        canJump = false;
        break;
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

  var canJump = goToStep(index);

  if (index > 0 && goToStep(index - 1)){
    canJump = true;
  }

  const isClickable = index <= lastCompletedStepIndex;

  return (
    <div
      className={`flex items-center space-x-2 ${
        canJump ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      onClick={async () => {
        if (canJump) {
          let params = functions.getParamsFromUrl();
          let debugToken = validations.getDebugToken();

          console.log('Click', debugToken, index);
      
          if (debugToken) {
            await axios.post(`${apiUrl}/kakau-bike/log-history/last-step`, { logToken: debugToken, step: index + 1, error: false } )
              .then((response)=>{
                console.log("Usuário atualizado com sucesso", response.data);
                const { success } = response.data;
      
                console.log('Success', success);
              })
              .catch((err)=>{
                let error = err;
      
                if (error && error.response) error = error.response;
                if (error && error.data) error = error.data;
      
                console.error("Erro ao atualizar usuário", error);
              });
          }
      
          let url = functions.setPathFromParams(step.href, { ...params });
          navigateTo(url);
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
  const navigateTo = async (href) => {
    navigate(href);
  };
  return (
    <div>
      <TitleHeader title={title} />
      <div className="flex  items-center justify-center text relative mx-auto mt-3 sm:space-x-6 space-x-2">
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
