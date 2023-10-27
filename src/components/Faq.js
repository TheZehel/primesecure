import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";

const faqs = [
  {
    question: "1. O que é um Marketplace de Seguros?",
    answer:
      " Um Marketplace de Seguros, como a Prime Secure, é uma plataforma que conecta você, o cliente, com várias seguradoras. Nosso objetivo é ajudá-lo a entender suas necessidades de seguro, aconselhá-lo sobre a melhor cobertura para suas necessidades e ajudá-lo durante o processo de contratação do seguro.",
  },
  {
    question:
      "2. Por que devo usar um Marketplace de Seguros em vez de ir direto para uma seguradora?",
    answer:
      "Como um Marketplace de Seguros, trabalhamos com diversas seguradoras e temos uma ampla compreensão das diferentes políticas disponíveis no mercado. Isso significa que podemos ajudá-lo a encontrar a melhor cobertura pelo melhor preço, de acordo com suas necessidades específicas.",
  },
  {
    question:
      "3. Quanto custa usar a Prime Secure como meu Marketplace de Seguros?",
    answer:
      "A Prime Secure não cobra nenhuma taxa adicional para utilizar a plataforma. Você paga apenas pelo produto ou serviço de seguro que escolher contratar. Além disso, você pode contar com a Prime Secure para auxiliá-lo em qualquer etapa do processo, desde a cotação até a contratação e eventual acionamento do seguro, sem custo adicional. Nossa missão é facilitar e tornar mais transparente a sua experiência com seguros.",
  },
  {
    question:
      "4. Como a Prime Secure pode me ajudar a fazer uma reclamação de seguro?",
    answer:
      "Nós podemos orientá-lo em todas as etapas do processo de reclamação de seguro. Isso inclui ajudá-lo a entender sua política, coletar a documentação necessária, apresentar a reclamação à seguradora e acompanhar a progressão da reclamação.",
  },
  {
    question: "5. Como a Prime Secure protege meus dados pessoais?",
    answer:
      "Levamos a segurança dos seus dados muito a sério. Usamos tecnologia avançada e procedimentos rigorosos para garantir que suas informações pessoais e financeiras estejam seguras conosco.",
  },
  {
    question:
      "6. Posso fazer alterações na minha apólice de seguro após ter contratado?",
    answer:
      "Sim, você pode fazer alterações na sua apólice após a contratação. Entre em contato conosco e ajudaremos você a fazer as alterações necessárias.",
  },
];

export default function Faq() {
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
    <div className="w-4/5  mx-auto py-24 sm:py-24">
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
