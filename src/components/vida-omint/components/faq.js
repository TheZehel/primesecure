import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useTransition, animated } from 'react-spring';

const faqs = [
  {
    question: '1. O que o seguro Prime Ideal garante?',
    answer:
      'O cliente tem à disposição diversas coberturas, algumas obrigatórias e outras opcionais. Clique aqui e confira as coberturas disponíveis.',
  },
  {
    question: '2. Quem pode contratar o Prime Ideal?',
    answer:
      'Poderão participar do seguro pessoas com idade entre 18 e 65 anos, que estejam em plena atividade profissional e em perfeitas condições de saúde.',
  },
  {
    question: '3. O que é o seguro Prime Ideal?',
    answer:
      'É um seguro de vida e acidentes pessoais individual destinado a pessoas físicas, com várias opções de proteção que se adaptam ao perfil do cliente.',
  },
  {
    question: '4. O site é seguro?',
    answer:
      'Sim! Nossa plataforma conta com as mais modernas ferramentas para garantir navegação segura através de uma transação de dados codificada e eficiente. As informações cadastrais são sigilosas e de uso exclusivo da Petlove, de acordo com suas permissões.',
  },
  {
    question: '5. Como a Prime Secure protege meus dados pessoais?',
    answer:
      'Levamos a segurança dos seus dados muito a sério. Usamos tecnologia avançada e procedimentos rigorosos para garantir que suas informações pessoais e financeiras estejam seguras conosco.',
  },
];

export default function FaqOmint() {
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
    from: { maxHeight: '0px', opacity: 0 },
    enter: { maxHeight: '1000px', opacity: 1 },
    leave: { maxHeight: '0px', opacity: 0 },
  });

  return (
    <div className="w-4/5  mx-auto my-20 text-grayPrime">
      <h2 className="text-center text-xl sm:text-4xl  mb-13 mb-16 font-bold">
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
                  index === activeIndex ? 'rotate-180' : ''
                }`}
              />
            </div>
            {transitions(
              (style, item) =>
                item === index && (
                  <animated.div style={style} className="overflow-hidden">
                    <p className="mt-2">{faq.answer}</p>
                  </animated.div>
                ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
