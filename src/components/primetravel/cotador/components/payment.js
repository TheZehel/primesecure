import React from 'react';
import TabsNavigation from './subcomponents/navigation';

const Payment = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
      {/* Conteúdo fixado no topo */}
      <div className="w-full max-w-5xl p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#313131] mb-2 sm:mb-4">
          Pagamento
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          Escolha o método de pagamento desejado:
        </p>

        {/* Navegação por Abas */}
        <TabsNavigation />
      </div>
    </div>
  );
};

export default Payment;
