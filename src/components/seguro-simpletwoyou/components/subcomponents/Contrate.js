import React from 'react';
import {
  CreditCard,
  CreditCardIcon,
  DollarSignIcon,
  RefreshCcw,
  Shield,
} from 'lucide-react';

const ContratePoucosCliques = () => {
  const steps = [
    {
      number: '1',
      icon: CreditCardIcon,
      title: 'Simule e contrate em poucos minutos',
      description:
        'Escolha as coberturas e assistências que melhor se adequam às suas necessidades e cadastre um cartão de crédito válido.',
    },
    {
      number: '2',
      icon: Shield,
      title: 'Receba os créditos de seguro referentes a sua proteção',
      description:
        'Os créditos de seguro são a moeda da Simple2u e garantem que o seu seguro esteja vigente durante o mês contratado.',
    },
    {
      number: '3',
      icon: RefreshCcw,
      title: 'Acompanhe a recorrência da sua proteção',
      description:
        'Todos os meses será debitado no seu cartão o valor mensal referente aos seus créditos de seguro. Mas não se preocupe, você pode interromper a sua recorrência quando quiser.',
    },
    {
      number: '4',
      icon: DollarSignIcon,
      title: 'Não usou todos os seus créditos?',
      description:
        'Após 30 dias você receberá esse valor de volta em formato de cashback, podendo comprar mais créditos de seguro ou transferir o valor de volta para a sua conta bancária.',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20">
      <h1 className="font-bold mb-8 text-2xl sm:text-5xl text-grayPrime">
        Contrate em poucos cliques
      </h1>
      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6 rounded-lg border-l-4 border-bluePrime bg-white shadow-lg"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center sm:mx-0 mx-auto">
              <step.icon className="text-bluePrime w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2 text-gray">
                {step.title}
              </h2>
              <p className="text-grayPrime">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContratePoucosCliques;
