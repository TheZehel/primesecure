import React from 'react';
import TabsNavigation from './subcomponents/navigation';
import DetalhesCompra from './subcomponents/detalhesCompra';
import Purchased from './purchased';

const Payment = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center overflow-x-hidden">


      {/* Conteúdo Principal */}
      <div className="w-full max-w-5xl p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#313131] mb-2 sm:mb-4">
          Pagamento
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          Escolha o método de pagamento desejado:
        </p>

        {/* Detalhes da Compra - Desktop (exibido apenas em telas grandes) */}
        <div className="hidden sm:block w-full max-w-7xl px-2 sm:px-4">
          <DetalhesCompra />
        </div>

        {/* Navegação por Abas */}
        <TabsNavigation />

        {/* Detalhes da Compra - Mobile (exibido apenas em telas menores) */}
        <div className="block sm:hidden w-full max-w-7xl px-2 sm:px-4">
          <DetalhesCompra />
        </div>
      </div>
      <Purchased />
    </div>
  );
};

export default Payment;
