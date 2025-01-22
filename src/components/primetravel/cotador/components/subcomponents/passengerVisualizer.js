import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { loadFromStorage } from '../../utils/storageUtils';

const PassengerVisualizer = () => {
    const [currentPassengers, setCurrentPassengers] = useState(0);
    const [maxPassengers, setMaxPassengers] = useState(0);

    const updatePassengerCount = () => {
        const storedPassengers = loadFromStorage("passengers", []);
        const storedResponsiblePassenger = loadFromStorage("responsiblePassenger", {});
        const totalPassengers = (Object.keys(storedResponsiblePassenger).length > 0 ? 1 : 0) + storedPassengers.length;
        setCurrentPassengers(totalPassengers);
    };

    useEffect(() => {
        updatePassengerCount();
        const handleStorageChange = () => updatePassengerCount();
        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="flex items-center justify-center space-x-2 p-2 bg-gray-50 rounded-md shadow-md">
            <Users size={24} className="text-bluePrime" />
            <p className="text-gray-800 font-semibold">
                {currentPassengers} / {maxPassengers}
            </p>
        </div>
    );
};

export default PassengerVisualizer;
