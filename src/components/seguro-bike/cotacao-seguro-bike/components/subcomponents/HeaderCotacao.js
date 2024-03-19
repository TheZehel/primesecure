import TitleHeader from "./TitleHeader";
import { useNavigate } from "react-router";

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

const Step = ({ step, index, position, navigateTo }) => {
  const lastCompletedStepIndex = parseInt(
    sessionStorage.getItem("lastCompletedStepIndex") || "0"
  );

  const isClickable = index <= lastCompletedStepIndex;

  return (
    <div
      className={`flex items-center space-x-2 ${
        isClickable ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      onClick={() => {
        if (isClickable) {
          navigateTo(step.href);
        }
      }}
      style={{ opacity: isClickable ? 1 : 0.5 }}
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
  const navigateTo = (href) => {
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
