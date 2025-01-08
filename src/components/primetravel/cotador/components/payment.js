import React from 'react';
import TabsNavigation from './subcomponents/navigation';

const Payment = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* Conteúdo fixado no topo */}
      <div className="w-full max-w-5xl p-8 ">
        <h2 className="text-4xl font-bold text-[#313131] mb-4">Pagamento</h2>
        <p className="text-lg">Escolha o método de pagamento desejado:</p>

        <TabsNavigation />
      </div>

      {/* Espaço preenchido abaixo */}
      <div className="flex-1 w-full max-w-5xl mt-4 p-4">
        {/* Conteúdo adicional ou espaço para outros componentes */}
      </div>
    </div>
  );
};

export default Payment;
