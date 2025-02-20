import React from 'react';
import { Users } from 'lucide-react';

const PassengerVisualizer = ({ currentPassengers, maxPassengers }) => {
    // Verifica se todos os passageiros foram adicionados
    const isAllFull = currentPassengers === maxPassengers;

    return (
        <div className="flex items-center justify-center space-x-2 p-2 bg-gray-50 rounded-md shadow-md">
            {/* Se está completo, cor verde, senão vermelho */}
            <Users
                size={24}
                className={isAllFull ? 'text-green-500' : 'text-red-500'}
            />
            <p className="text-gray-800 font-semibold">
                {currentPassengers} / {maxPassengers}
            </p>
        </div>
    );
};

export default PassengerVisualizer;
