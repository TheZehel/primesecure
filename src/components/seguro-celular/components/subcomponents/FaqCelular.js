import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";

const faqs = [
  {
    question: "1 - Quais são os benefícios de me tornar segurado da Porto?",
    answer:
      "Quem possui o Seguro Celular da Porto tem diversos benefícios, como: reembolso rápido se precisar acionar o seguro, cobertura internacional, contratação online descomplicada e sem carência, parcelamento em até 12x vezes sem juros com parcelas que cabem no seu bolso, cancelamento a qualquer momento sem multa, desconto na aquisição de acessórios para celular no site da GoCase e descontos em produtos e serviços de diversas categorias.",
  },
  {
    question: "2 - O seguro celular aceita aparelho usado?",
    answer:
      "Sim, o Seguro Celular da Porto está disponível para aparelhos usados desde que tenham sido adquiridos pelo primeiro dono há, no máximo, 24 meses e que tenham nota fiscal.",
  },
  {
    question: "3 - Qual é a vigência do seguro celular da Porto?",
    answer:
      "O Seguro Celular da Porto possui vigência de 365 dias, sem carência, a partir da emissão da apólice do seguro, que é enviada para o seu e-mail cadastrado, após a realização e aprovação de todo o processo de contratação. Garantir 1 ano inteirinho de proteção para o seu aparelho é com a Porto.",
  },
  {
    question: "4 - Quando vou receber minha apólice?",
    answer:
      " sua apólice será emitida e enviada para o e-mail cadastrado na contratação até 48 horas após o sucesso da verificação do celular, que é feita através do App Porto. Ou seja, é rapidinho. Vale lembrar: todo o processo de contratação do seguro também deverá ter sido executada com êxito para que apólice seja emitida.",
  },
  {
    question:
      "5 - Preciso ter a nota fiscal do aparelho para contratar o seguro celular?",
    answer:
      "Ter a nota fiscal do aparelho não é necessário para adquirir o Seguro Celular da Porto, mas vale ressaltar que, para acionar o seguro, é sim preciso ter comprovação de aquisição do celular através de ao menos um dos seguintes documentos: - Nota fiscal de aquisição; - Comprovante de pagamento do bem; - Manuais do aparelho; - Recibo de Compra e Venda (em que conste a data de aquisição do aparelho) com reconhecimento de fima em cartório; - Invoice; - Declaração de Importação (feita em papel timbrado ou com carimbo de CNPJ da importadora com a descrição e valor do aparelho); - Cupom fiscal.",
  },
];

export default function FaqCelular() {
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
