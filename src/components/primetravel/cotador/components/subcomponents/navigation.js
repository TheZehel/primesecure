import React, { useState } from 'react';
import CreditCard from './creditCard';
import ModalPix from './pixModal';
import PagamentoPix from './pagamentoPix';
import DetalhesCompra from './detalhesCompra';

const TabsNavigation = () => {
    const [activeTab, setActiveTab] = useState('creditCard');

    return (
        <div className="w-full h-screen flex flex-col items-center justify-start p-4">
            {/* Detalhes da Compra */}
            <div className="w-full max-w-7xl px-2 sm:px-4">
                <DetalhesCompra />
            </div>

            {/* Navegação por Abas */}
            <div className="flex flex-col sm:flex-row justify-center mt-2 gap-4 p-2 w-full max-w-7xl">
                <button
                    onClick={() => setActiveTab('creditCard')}
                    className={`px-6 py-2 text-lg font-bold rounded-md ${activeTab === 'creditCard'
                        ? 'text-bluePrime border-b-4 border-bluePrime'
                        : 'text-gray-600'
                        }`}
                >
                    Cartão de Crédito
                </button>
                <button
                    onClick={() => setActiveTab('paymentPix')}
                    className={`px-6 py-2 text-lg font-bold rounded-md ${activeTab === 'paymentPix'
                        ? 'text-bluePrime border-b-4 border-bluePrime'
                        : 'text-gray-600'
                        }`}
                >
                    Pagamento Pix
                </button>
            </div>

            {/* Conteúdo das Abas */}
            <div className="p-4 w-full max-w-4xl sm:p-6">
                {activeTab === 'creditCard' && <CreditCard onSubmit={(data) => console.log('Cartão de Crédito:', data)} />}
                {activeTab === 'paymentPix' && <PagamentoPix handleOpenPixModal={() => console.log('Pix Modal Opened')} />}
            </div>
        </div>
    );
};

export default TabsNavigation;
