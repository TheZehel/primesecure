
// import chip from '../../../../../src/assets/svg/payment-card/cc-chip.svg';
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
        <div className="grid gap-8 lg:grid-cols-2">
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
                        className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-bluePrime'
                            }`}
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
                        className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.cardHolder ? 'border-red-500' : 'border-bluePrime'
                            }`}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1 grid gap-1.5">
                        <label htmlFor="expiration-date" className="font-semibold">
                            Expiração
                        </label>
                        <InputMask
                            name="expirationDate"
                            inputRef={expirationDateRef}
                            id="expiration-date"
                            mask="99/99"
                            value={expirationDate}
                            placeholder="00/00"
                            onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                            className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.expirationDate ? 'border-red-500' : 'border-bluePrime'
                                }`}
                        />
                    </div>

                    <div className="flex-1 grid gap-1.5">
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
                            className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.cvc ? 'border-red-500' : 'border-bluePrime'
                                }`}
                        />
                    </div>
                </div>

                <button
                    onClick={handleAddCard}
                    className="mt-4 w-full h-10 bg-bluePrime text-white font-bold rounded-md"
                >
                    Realizar Pagamento
                </button>
            </div>

            {/* Cartão Virtual */}
            <div className="bg-gradient-to-r from-bluePrime to-bluePrime2 text-white rounded-xl shadow-lg p-6 max-w-sm mx-auto lg:max-w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {/* <chip className="h-6 w-6" /> Substitua pelo seu ícone personalizado */}
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-2xl font-bold">
                        {cardNumber ? formatCardNumber(cardNumber) : '0000 0000 0000 0000'}
                    </h4>
                </div>

                <div className="mt-4">
                    <div className="text-sm font-semibold">Nome do Titular</div>
                    <div className="text-md font-bold uppercase">
                        {cardHolder || 'NOME COMPLETO'}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div>
                        <div className="text-sm">Expiração</div>
                        <div className="text-md font-bold">{expirationDate || '00/00'}</div>
                    </div>
                    <div>
                        <div className="text-sm">CVV</div>
                        <div className="text-md font-bold">{cvc || '000'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
