import TitleHeader from "./TitleHeader";
import { useNavigate } from "react-router";

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

const Step = ({ step, index, position, href }) => (
  <div
    className="flex items-center space-x-2 cursor-pointer"
    onClick={() => {
      href(step.href);
    }}
  >
    <StepIcon number={index + 1} active={index == position} />
    <div
      className={`text-center ${
        index == position ? "text-cyan-500" : "text-zinc-800"
      } sm:text-md font-semibold`}
    >
      {step.title}
    </div>
  </div>
);

export default function HeaderCotacao({ title, position }) {
  var position = position || 0;

  const navigate = useNavigate();

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
            href={(h) => {
              navigateTo(h);
            }}
          />
        ))}
      </div>
    </div>
  );
}
