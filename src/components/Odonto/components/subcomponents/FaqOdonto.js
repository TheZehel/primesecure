import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";

const faqs = [
  {
    question: "1 - O que ocorre caso o primeiro boleto não seja pago?",
    answer:
      "O plano não estará vigente e você receberá um aviso por e-mail e SMS informando que o pagamento não foi identificado. Para fazer uma nova compra, basta fazer login no site e aproveitar os mesmos dados inseridos inicialmente.",
  },
  {
    question: "2 - Qual é o valor do limite necessário no cartão de crédito?",
    answer:
      "Na modalidade de compra mensal (com carência) será necessário apenas o valor de uma mensalidade, e na modalidade anual (sem carência) será necessário o valor referente a 12 meses de plano, porém será cobrado na fatura do cliente a quantidade de parcelas selecionadas.",
  },
  {
    question:
      "3 - O que acontece se eu tiver o plano mensal e ocorrer algum problema com meu cartão que impossibilite o pagamento da parcela?",
    answer:
      "Você receberá um e-mail informando sobre o ocorrido e será solicitado que você acesse o site de compra, faça login e cadastre um novo cartão para as futuras cobranças.",
  },
  {
    question:
      "4 - Caso eu não cadastre um novo cartão após o recebimento do e-mail, o que ocorre?",
    answer:
      " O contrato ficará inadimplente e outros avisos por e-mail e SMS serão enviados. Se o cadastro de outro cartão não for feito em até 60 dias, o plano será cancelado. O valor referente aos 60 dias em que o plano continuou ativo será cobrado, acrescido de uma multa. O cliente também poderá ser negativado.",
  },
  {
    question: "5 - Qual é a data de vencimento do primeiro boleto?",
    answer:
      "A data de vencimento do primeiro boleto é de até 3 dias úteis após a compra. O primeiro boleto terá vencimento e validade máxima de 3 dias, passando esse prazo, você deverá gerar um novo boleto no site.",
  },
];

export default function FaqOdonto() {
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
