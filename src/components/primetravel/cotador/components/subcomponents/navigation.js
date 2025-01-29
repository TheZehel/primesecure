import React, { useState } from 'react';
import CreditCard from './creditCard';
import ModalPix from './pixModal';
import PagamentoPix from './pagamentoPix';
import DetalhesCompra from './detalhesCompra';

const TabsNavigation = ({ setFormaPagamento }) => {
    const [activeTab, setActiveTab] = useState('creditCard');

    const handleTabChange = (method) => {
        setActiveTab(method);
        setFormaPagamento(method === 'creditCard' ? 'TMA' : 'PIX'); // Atualiza a forma de pagamento
    };

    return (
        <div className="w-full h-auto flex flex-col items-center justify-between overflow-hidden p-4">
            <div className="flex flex-row justify-center gap-2 sm:gap-4 w-full max-w-7xl">
                <button
                    onClick={() => handleTabChange('creditCard')}
                    className={`flex-1 px-4 py-2 text-sm sm:text-lg font-bold rounded-md text-center ${activeTab === 'creditCard'
                        ? 'text-bluePrime border-b-4 border-bluePrime'
                        : 'text-gray-600'
                        }`}
                >
                    Cartão de Crédito
                </button>
                <button
                    onClick={() => handleTabChange('paymentPix')}
                    className={`flex-1 px-4 py-2 text-sm sm:text-lg font-bold rounded-md text-center ${activeTab === 'paymentPix'
                        ? 'text-bluePrime border-b-4 border-bluePrime'
                        : 'text-gray-600'
                        }`}
                >
                    Pagamento Pix
                </button>
            </div>

            {/* Conteúdo das Abas */}
            <div className="flex-grow flex justify-center items-center w-full max-w-4xl">
                {activeTab === 'creditCard' && <CreditCard onSubmit={(data) => console.log('Cartão de Crédito:', data)} />}
                {activeTab === 'paymentPix' && <PagamentoPix handleOpenPixModal={() => console.log('Pix Modal Opened')} />}
            </div>
        </div>
    );
};

export default TabsNavigation;
