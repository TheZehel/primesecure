import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";

const faqs = [
  {
    question:
      "1 - O seguro de vida cobre terceira idade? Qual o limite de idade?",
    answer:
      "Sim, oferecemos opções de seguro de vida que cobrem terceira idade. O limite de idade depende do plano escolhido. Realize uma cotação aqui e entre em contato para maiores informações.",
  },
  {
    question:
      "2 - Não temos filiais, temos uma ampla cobertura em todo o Brasil. Realize uma cotação conosco ou entre em contato conosco.",
    answer:
      "Sim, o Seguro Celular da Porto está disponível para aparelhos usados desde que tenham sido adquiridos pelo primeiro dono há, no máximo, 24 meses e que tenham nota fiscal.",
  },
  {
    question: "3 - Mas paga o sinistro do seguro de vida?",
    answer:
      "Sim, nosso seguro de vida paga o sinistro de acordo com as condições estabelecidas na apólice.",
  },
];

export default function FaqVida() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    if (index === activeIndex) {
      // se o índice ativo for clicado novamente, colapsa a resposta
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const transitions = useTransition(activeIndex, {
    from: { maxHeight: "0px", opacity: 0 },
    enter: { maxHeight: "1000px", opacity: 1 },
    leave: { maxHeight: "0px", opacity: 0 },
  });

  return (
    <div className="w-4/5  mx-auto py-2 sm:py-2">
      <h2 className="text-3xl mb-6 text-center">Dúvidas Frequentes</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-md p-4">
            <div
              className="flex justify-between items-start cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <p className="font-medium">{faq.question}</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transform transition-transform duration-200 ${
                  index === activeIndex ? "rotate-180" : ""
                }`}
              />
            </div>
            {transitions(
              (style, item) =>
                item === index && (
                  <animated.div style={style} className="overflow-hidden">
                    <p className="mt-2">{faq.answer}</p>
                  </animated.div>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
