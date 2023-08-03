import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";

const faqs = [
  {
    question: "1 - O que o seguro residencial cobre?",
    answer:
      "As situações cobertas pelo seguro residencial são inúmeras e variam desde acontecimentos rotineiros até grandes imprevistos. Você conta com o amparo de danos e prejuízos causados por incêndios, explosões e alagamentos; danos elétricos diversos; quebras acidentais de vidros de box ou de varanda; danos decorrentes de uma reforma; danos causados por um morador do imóvel a outras pessoas; danos a itens de quem tem um negócio em casa; além de amparo também em caso de roubo ou furto. São mais de 20 coberturas que podem ser contratadas do jeito que você precisar.",
  },
  {
    question: "2 - Por que contratar um seguro residencial?",
    answer:
      "Um dos principais motivos para contratar um seguro residencial é prevenir a perda inesperada daquilo que se lutou durante anos para conquistar. De acordo com as coberturas e valores de indenização contratadas, o seguro indeniza o cliente para que ele reponha o que foi danificado ou perdido em caso de um sinistro. Ou seja, além de cuidar do bem e proporcionar tranquilidade, o seguro residencial também é uma forma de se proteger financeiramente de prejuízos inesperados.",
  },
  {
    question: "3 - Qual é o melhor plano do seguro residencial?",
    answer:
      "O melhor plano de seguro residencial é aquele que mais se encaixa com a sua realidade. Cada morador, imóvel e região em que a residência está localizada possuem necessidades específicas e precisam de coberturas e serviços diferentes. Para entender qual plano mais combina com a sua vida, conte com uma pessoa corretora de seguros, ela é quem vai te auxiliar na escolha ideal para você.",
  },
  {
    question:
      "4 - Quais são os benefícios do seguro residencial da Porto Seguro?",
    answer:
      " Além de todo o amparo que as coberturas entregam, o seguro residencial da Porto Seguro oferece também serviços de assistência que garantem uma rotina ainda mais tranquila para você. São mais de 40 serviços, como: encanador, eletricista, chaveiro, reparo em eletrodomésticos e serviços em caso de sinistro, como limpeza, segurança e caçamba, que podem ser contratados dentro dos planos oferecidos. Você também conta com a facilidade de contato com a Porto, por meio de atendimento digital, no App Porto: Seguro, Cartão e +, WhatsApp e Área do Cliente. Outra vantagem é o PortoPlus, um programa de relacionamento que oferece diversos descontos em parceiros e recompensas.",
  },
  {
    question: "5 - Como funciona o seguro residencial?",
    answer:
      "O seguro residencial é uma solução que protege a estrutura do seu imóvel e os seus bens de possíveis danos. Nesse tipo de seguro, o cliente pode escolher as coberturas de acordo com o que mais precisa, seja por conta da região em que mora, do tipo de imóvel, ou dos itens que possui dentro de casa. Além das coberturas, você também pode contratar um plano de assistências que inclui serviços de chaveiro, encanador, eletricista, reparos em eletrodomésticos e muitas outras facilidades para o dia a dia. O seguro residencial pode ser contratado para imóveis como casas, apartamentos e moradias tradicionais, de lazer ou de alto padrão, tanto por proprietários de imóveis quanto por inquilinos.",
  },
];

export default function FaqResidencial() {
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
