import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'Como funciona o processo de sinistro?',
    answer:
      'Quando ocorre um sinistro, você deve entrar em contato com a seguradora e enviar toda a documentação necessária. Após a análise, a indenização é calculada com base na cobertura contratada.',
  },
  {
    id: 2,
    question: 'Quais são as coberturas oferecidas?',
    answer:
      'Oferecemos diversas coberturas, como colisão, incêndio, roubo, danos a terceiros e outras, que podem ser adaptadas às suas necessidades.',
  },
  {
    id: 3,
    question: 'Como posso contratar um seguro?',
    answer:
      'A contratação pode ser realizada online, pelo nosso site, ou diretamente com um vendedor, onde você receberá todo o suporte necessário.',
  },
  {
    id: 4,
    question: 'Qual o prazo para pagamento da franquia?',
    answer:
      'Após a constatação do sinistro, o pagamento da franquia deve ser realizado conforme as condições estabelecidas no contrato, geralmente juntamente com o processo de indenização.',
  },
  {
    id: 5,
    question: 'Em quais situações devo pagar a franquia?',
    answer:
      'Em casos de colisões ou causas naturais em que for definido como sinistro de perda parcial – quando os danos no veículo são inferiores a 75% do seu valor e passíveis de conserto – o pagamento da franquia é obrigatório por parte do segurado.',
  },
];

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-grayPrime text-2xl sm:text-4xl text-center mb-12">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border rounded-lg">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-grayPrime">
                  {faq.question}
                </span>
                <span className="text-grayPrime text-2xl">
                  {openFAQ === faq.id ? '−' : '+'}
                </span>
              </button>
              {openFAQ === faq.id && (
                <div className="p-4 border-t text-grayPrime text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
