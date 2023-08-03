import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";

const faqs = [
  {
    question: "1 - Como funciona o Plano?",
    answer:
      "Somos um Plano de Saúde para Cães e Gatos. Você paga uma mensalidade fixa e o seu pet pode ser atendido em uma das mais de 400 Clínicas da nossa Rede Credenciada. Faça seu cadastro, adicione o pet e escolha o Plano que mais se encaixa nas suas necessidades. Após a compra, você também poderá adicionar no seu Espaço do cliente: Banhos, Fisioterapia e Acupuntura, caso seu amiguinho precise.",
  },
  {
    question: "2 - Como funciona a Microchipagem? É seguro para meu pet?",
    answer:
      "Você não precisa levar nada no dia da Microchipagem do seu amiguinho. A Clínica irá solicitar apenas seu CPF para conferência dos dados cadastrados. Caso seu pet já seja microchipado não é necessário realizar o procedimento novamente, basta entrar em contato com nossa equipe para registro. O microchip é uma forma moderna de identificar o animal de estimação de um modo eficaz e seguro. Trata-se de um micro-circuito eletrônico, de tamanho aproximado a um grão de arroz, implantado sob a pele. Caso o animal se perca ou até mesmo seja roubado, pode ser identificado facilmente por meio de seu microchip. Funciona como um 'RG eletrônico'. Não é feito nenhum tipo de anestesia nem sedação, é como se fosse uma injeção comum e deve ser colocado na região da nuca, pois facilita a leitura. Se você quer saber mais, acesse o artigo: Principais benefícios do microchip em seu pet, no nosso blog.",
  },
  {
    question: "3 - E se meu pet já for microchipado?",
    answer:
      "Caso seu pet já seja microchipado não é necessário realizar o procedimento novamente, basta entrar em contato com nossa equipe para registro.",
  },
  {
    question: "4 - Tenho descontos se eu comprar para mais de 1 pet?",
    answer:
      " Com certeza! Nossos descontos são progressivos: para o segundo pet você ganha 10% de desconto, para o terceiro 20% de desconto e do quarto pet em diante você ganha 30% de desconto nos Planos de Saúde contratados. Os descontos são calculados automaticamente no momento da sua compra.",
  },
  {
    question:
      "5 - Acabei de contratar o Plano, quando começam a contar as carências?",
    answer:
      "Assim que seu pagamento for processado, você receberá um e-mail onde deverá clicar no link de confirmação da compra. Após esse passo, entre em contato com a Clínica de sua preferência para agendar a colocação do Microchip no seu pet. Lembre-se: suas carências começam a contar a partir da data da Microchipagem. Os procedimentos mais essenciais como consultas, vacinas, procedimentos clínicos e internações têm apenas 45 dias de carência. Os exames e consultas com especialistas 60 dias, já as cirurgias e anestesia possuem 120 dias, por serem procedimentos mais delicados. Após a compra, você pode antecipar algumas carências através do Espaço do cliente e utilizar o Plano imediatamente. Vale lembrar que a antecipação da carência é somente para aquele procedimento específico e não para o grupo inteiro de procedimentos.",
  },
];

export default function FaqPet() {
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
