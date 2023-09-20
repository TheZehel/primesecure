import TitleHeader from "../../Contato/components/subcomponents/titleHeader";

const steps = [
  { title: "Planos", color: "text-cyan-500" },
  { title: "Dados pessoais", color: "text-zinc-800" },
  { title: "Pagamento", color: "text-zinc-800" },
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

const Step = ({ step, index }) => (
  <div className="flex items-center space-x-2">
    <StepIcon number={index + 1} active={index === 0} />
    <div className={`text-center ${step.color} sm:text-2xl font-semibold`}>
      {step.title}
    </div>
  </div>
);

export default function HeaderCotacao() {
  return (
    <div>
      <TitleHeader />
      <div className="flex items-center justify-center text relative mx-auto mt-10 sm:space-x-6 space-x-2">
        {steps.map((step, index) => (
          <Step key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
}
