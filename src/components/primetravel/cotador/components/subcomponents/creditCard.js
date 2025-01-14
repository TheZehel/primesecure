import { Wifi } from 'lucide-react';
import React, { useState, useRef } from 'react';
import InputMask from 'react-input-mask';

const CreditCard = ({ onSubmit }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [errors, setErrors] = useState({
        cardNumber: false,
        cardHolder: false,
        expirationDate: false,
        cvc: false,
    });

    const cardNumberRef = useRef(null);
    const cardHolderRef = useRef(null);
    const expirationDateRef = useRef(null);
    const cvcRef = useRef(null);

    const handleInputChange = (name, value) => {
        if (name === 'cardNumber') {
            setCardNumber(value);
            if (value) setErrors((prev) => ({ ...prev, cardNumber: false }));
        } else if (name === 'cardHolder') {
            setCardHolder(value);
            if (value) setErrors((prev) => ({ ...prev, cardHolder: false }));
        } else if (name === 'expirationDate') {
            setExpirationDate(value);
            if (value) setErrors((prev) => ({ ...prev, expirationDate: false }));
        } else if (name === 'cvc') {
            setCvc(value);
            if (value) setErrors((prev) => ({ ...prev, cvc: false }));
        }
    };

    const handleAddCard = () => {
        const newErrors = {
            cardNumber: !cardNumber,
            cardHolder: !cardHolder,
            expirationDate: !expirationDate,
            cvc: !cvc,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) return;

        onSubmit({ cardNumber, cardHolder, expirationDate, cvc });
    };

    const formatCardNumber = (number) => {
        return number.replace(/(\d{4})/g, '$1 ').trim();
    };

    return (
        <div className="max-w-[1024px] w-full mx-auto px-4 grid gap-8 lg:grid-cols-2 p-4 md:p-6">
            {/* Formulário de Entrada */}
            <div className="grid gap-4">
                <div className="grid gap-1.5">
                    <label htmlFor="card-number" className="font-semibold">
                        Número do Cartão
                    </label>
                    <InputMask
                        name="cardNumber"
                        inputRef={cardNumberRef}
                        id="card-number"
                        mask="9999 9999 9999 9999"
                        value={cardNumber}
                        placeholder="0000 0000 0000 0000"
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-bluePrime'}`}
                    />
                </div>

                <div className="grid gap-1.5">
                    <label htmlFor="card-holder" className="font-semibold">
                        Nome do Titular
                    </label>
                    <input
                        name="cardHolder"
                        ref={cardHolderRef}
                        id="card-holder"
                        value={cardHolder}
                        placeholder="NOME COMPLETO"
                        onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                        className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.cardHolder ? 'border-red-500' : 'border-bluePrime'}`}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="expiration-date" className="font-semibold">
                            Expiração
                        </label>
                        <InputMask
                            name="expirationDate"
                            inputRef={expirationDateRef}
                            id="expiration-date"
                            mask="99/99"
                            value={expirationDate}
                            placeholder="MM/AA"
                            onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                            className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.expirationDate ? 'border-red-500' : 'border-bluePrime'}`}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="cvc" className="font-semibold">
                            CVV
                        </label>
                        <InputMask
                            name="cvc"
                            inputRef={cvcRef}
                            id="cvc"
                            mask="999"
                            value={cvc}
                            placeholder="000"
                            onChange={(e) => handleInputChange('cvc', e.target.value)}
                            className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.cvc ? 'border-red-500' : 'border-bluePrime'}`}
                        />
                    </div>
                </div>

                <button
                    onClick={handleAddCard}
                    className="mt-4 w-full h-12 bg-bluePrime text-white font-bold rounded-md hover:bg-bluePrime2 transition-all"
                >
                    Realizar Pagamento
                </button>
            </div>

            {/* Cartão Virtual */}
            <div className="bg-gradient-to-r from-bluePrime to-bluePrime2 text-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[450px] h-auto sm:h-[210px] md:h-[220px] lg:h-[240px] mx-auto flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div style={{ transform: 'rotate(90deg)' }}>
                        <Wifi />
                    </div>
                </div>

                <div className="flex flex-col items-start mt-4 sm:mt-6">
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight sm:tracking-wide whitespace-nowrap overflow-hidden">
                        {cardNumber ? formatCardNumber(cardNumber) : '0000 0000 0000 0000'}
                    </h4>

                    <div className="mt-2 sm:mt-3 flex flex-col items-start">
                        <div className="text-xs">Nome do Titular</div>
                        <div className="text-xs font-bold uppercase">
                            {cardHolder || 'NOME COMPLETO'}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between w-full text-xs">
                    <div>
                        <div>Expiração</div>
                        <div className="text-sm font-bold">{expirationDate || '00/00'}</div>
                    </div>
                    <div>
                        <div>CVV</div>
                        <div className="text-sm font-bold">{cvc || '000'}</div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default CreditCard;
