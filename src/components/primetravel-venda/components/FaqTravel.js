import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";

const faqs = [
  {
    question: "1 - Porque eu devo contratar um seguro viagem e para que serve?",
    answer:
      "Assim como um seguro auto serve para cobrir imprevistos com seu carro, o seguro viagem serve para cobrir imprevistos que podem ocorrer numa viagem, sejam eles imprevistos relacionados a sua saúde (como despesas médicas, hospitalares, odontológicas e farmacêuticas), a sua mala (como atraso, danos ou perda de bagagem), ao seu voo (como atraso de voo), a sua viagem (como interrupção ou cancelamento da viagem internacional, prorrogação de estadia, retorno do segurado e do acompanhante, entre outros) e até mesmo para situações mais graves (como invalidez total ou parcial por acidente, morte acidental, translado de corpo e regresso sanitário). Você deve contratar um seguro viagem porque ele é imprescindível para você estar protegido durante toda sua viagem contra imprevistos que podem acontecer.",
  },
  {
    question: "2 - Quais os tipos de viagem que o seguro cobre?",
    answer:
      "O Seguro Viagem possui cobertura para viagens aéreas, marítimas e terrestres. Para viagens nacionais, o segurado terá cobertura desde que esteja fora da sua cidade de domicílio.",
  },
  {
    question: "3 - O seguro viagem tem cobertura para COVID-19?",
    answer:
      "Sim, temos opções de coberturas específicas para despesas médicas e hospitalares por COVID 19 diagnosticado durante a viagem. Nossos clientes poderão escolher se querem ou não contratar a cobertura adicional para COVID19 bem como o valor da mesma na jornada de contratação online.",
  },
  {
    question: "4 - Posso contratar um seguro já estando em viagem?",
    answer:
      "Sim. Porém, em caso de contratação após a viagem já ter começado, o segurado só poderá acionar alguma cobertura ou assistência após 72h da emissão do bilhete/apólice.",
  },
  {
    question:
      "5 - O seguro viagem cobre sinistros decorrentes de prática esportiva?",
    answer:
      "Sim, a prática esportiva está coberta no seguro, com excessão para: esportes profissionais ou qualquer esporte em que o Segurado receba ou concorra a uma remuneração, premiação, doação, patrocínio ou recompensa financeira de qualquer tipo. Adicionalmente, as práticas esportivas são cobertas sempre quando realizadas dentro de risco controlado, ou seja, em pistas / estradas que sejam oficiais / registradas; sem agravamento de risco (carregando objetos perigosos, andando sem equipamento de segurança, outros) cumprindo requerimentos de segurança.",
  },
];

export default function FaqTravel() {
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
    <div className="w-4/5  mx-auto sm:py-2 text-grayPrime">
      <h2 className="text-center text-primary font-bold mb-13 text-2xl sm:text-5xl my-16">
        Dúvidas Frequentes
      </h2>
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
