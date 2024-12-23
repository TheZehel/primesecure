import React from 'react';
import { useState, useRef, useEffect } from 'react';
import InputMask from 'react-input-mask';
import {
  ccNumberFormated,
  formatExpirationDate,
  formatCVC,
} from '../modules/formatFunctions';
import chip from '../../../../../src/assets/svg/payment-card/cc-chip.svg';
import imgDefault from '../../../../../src/assets/svg/payment-card/cc-icon.svg';
//import LoadingAnimation from "loadingSvg";

const Payment = () => {
  //ESTADOS
  const [cardNumber, setCardNumber] = useState(''); //0000 0000 0000 0000
  const [cardHolder, setCardHolder] = useState(''); // Nome Impresso
  const [expirationDate, setExpirationDate] = useState(''); //20/24
  const [cvc, setCvc] = useState(''); // 000
  const [isLoading, setIsLoading] = useState('false');
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

  // Carregar dados do sessionStorage ao iniciar
  // useEffect(() => {
  //   const storedData = sessionStorage.getItem("paymentData");
  //   if (storedData) {
  //     const { cardNumber, cardHolder, expirationDate, cvc } = JSON.parse(storedData);
  //     setCardNumber(cardNumber || "");
  //     setCardHolder(cardHolder || "");
  //     setExpirationDate(expirationDate || "");
  //     setCvc(cvc || "");
  //   }
  // }, []);

  // Salvar dados no sessionStorage ao atualizar
  // useEffect(() => {
  //   const paymentData = { cardNumber, cardHolder, expirationDate, cvc };
  //   sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
  // }, [cardNumber, cardHolder, expirationDate, cvc]);

  const handleAddCard = () => {
    let hasError = false;

    const newErrors = {
      cardNumber: !cardNumber,
      cardHolder: !cardHolder,
      expirationDate: !expirationDate,
      cvc: !cvc,
    };

    Object.values(newErrors).forEach((value) => {
      if (value) hasError = true;
    });

    setErrors(newErrors);

    if (hasError) {
      if (newErrors.cardNumber) {
        cardNumberRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else if (newErrors.cardHolder) {
        cardHolderRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else if (newErrors.expirationDate) {
        expirationDateRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else if (newErrors.cvc) {
        cvcRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // lógica para envio do cartão
    console.log('Realizando pagamento');
  };

  const handleInputChange = (name, value) => {
    if (name === 'cardNumber') {
      setCardNumber(value);
      if (value) {
        setErrors((prev) => ({ ...prev, cardNumber: false }));
      }
    } else if (name === 'cardHolder') {
      setCardHolder(value);
      if (value) {
        setErrors((prev) => ({ ...prev, cardHolder: false }));
      }
    } else if (name === 'expirationDate') {
      setExpirationDate(value);
      if (value) {
        setErrors((prev) => ({ ...prev, expirationDate: false }));
      }
    } else if (name === 'cvc') {
      setCvc(value);
      if (value) {
        setErrors((prev) => ({ ...prev, cvc: false }));
      }
    }
  };

  return (
    <div className="mx-2 flex flex-col lg:flex-row gap-8">
      {/* Formulário */}
      <div className="flex-2 mx-5">
        <h2 className="text-3xl font-bold text-[#313131] mb-4">Pagamento</h2>
        <p className="mb-4">Aqui você pode listar os planos disponíveis...</p>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="card-number" className="font-semibold">
              Numero do Cartão
            </label>
            <InputMask
              name="cardNumber"
              inputRef={cardNumberRef}
              id="card-number"
              mask={'9999 9999 9999 9999'}
              maskChar={null}
              value={cardNumber}
              placeholder={
                errors.cardNumber
                  ? 'Preencha o número do cartão'
                  : '0000 0000 0000 0000'
              }
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              className={`border rounded-md h-10 px-4 w-full focus:outline-none ${
                errors.cardNumber
                  ? 'border-red-500 placeholder:text-red-500 focus:ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime'
              }`}
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="card-holder" className="font-semibold">
              Nome do titular
            </label>
            <input
              name="cardHolder"
              ref={cardHolderRef}
              id="card-holder"
              value={cardHolder}
              placeholder={
                errors.cardHolder
                  ? 'Preencha o nome do titular'
                  : 'NOME COMPLETO'
              }
              onChange={(e) => handleInputChange('cardHolder', e.target.value)}
              className={`border rounded-md h-10 px-4 w-full focus:outline-none ${
                errors.cardHolder
                  ? 'border-red-500 placeholder:text-red-500 focus:ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime'
              }`}
              maxLength={40}
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
                maskChar={null}
                mask={'99/99'}
                value={expirationDate}
                placeholder={
                  errors.expirationDate
                    ? 'Preencha a data de expiração'
                    : '00/00'
                }
                onChange={(e) =>
                  handleInputChange('expirationDate', e.target.value)
                }
                className={`border rounded-md h-10 px-4 w-full focus:outline-none ${
                  errors.expirationDate
                    ? 'border-red-500 placeholder:text-red-500 focus:ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime'
                }`}
              />
            </div>

            <div className="flex-1 grid gap-1.5">
              <label htmlFor="secutiry-code" className="font-semibold">
                CVV
              </label>
              <InputMask
                name="cvc"
                inputRef={cvcRef}
                id="secuty-code"
                mask={'999'}
                maskChar={null}
                value={cvc}
                placeholder={errors.cvc ? 'Preencha o CVV' : '000'}
                onChange={(e) => handleInputChange('cvc', e.target.value)}
                className={`border rounded-md h-10 px-4 w-full focus:outline-none ${
                  errors.cvc
                    ? 'border-red-500 placeholder:text-red-500 focus:ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime'
                }`}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleAddCard}
          className="mt-4 w-full h-[50px] flex justify-center items-center py-4 bg-bluePrime rounded-md cursor-pointer border-none font-bold text-lg leading-7 transition-all duration-300 hover:brightness-110 text-white"
        >
          {/* {isLoading ? <LoadingAnimation /> : "Realizar Pagamento"} */}
          Realizar pagamento
        </button>
      </div>

      <div className="flex-1 mx-5 flex flex-col">
        {/* Cartão */}
        <div className="py-6 px-6 bg-gradient-to-r from-bluePrime to-bluePrime2 rounded-xl shadow-xl  mx-5 justify-center items-center object-center lg:mx-0 lg:max-w-none max-h-[300px]">
          <div className="">
            <div className="flex justify-between">
              <div>
                <img src={imgDefault} alt="" />
              </div>
              {/* <CardBrandImage cardNumber={cardNumber}/> */}
            </div>
            <div className="flex justify-between items-center mb-6"></div>
            <div className="text-white text-2xl font-bold text-start">
              {cardNumber
                ? ccNumberFormated(cardNumber)
                : '0000 0000 0000 0000'}
            </div>
            <div className="mt-3">
              <div className="text-md font-bold text-gray-300 text-start">
                Nome do titular
              </div>
              <div className="text-sm font-bold text-white uppercase text-start">
                {cardHolder || 'NOME DO TITULAR'}
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div>
                <div className="text-sm text-gray-300">Expiração</div>
                <div className="text-sm font-bold text-white uppercase">
                  {expirationDate
                    ? formatExpirationDate(expirationDate)
                    : '00/00'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-300">CVV</div>
                <div className="text-sm font-bold text-white uppercase">
                  {cvc ? formatCVC(cvc) : '000'}
                </div>
              </div>
              <div>
                <img src={chip} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* Sessão */}
        <div className="m-2 p-3 bg-white rounded-lg shadow-md border-2 border-bluePrime">
          <div className="text-black font-bold text-left">
            Detalhes da compra:
          </div>
          <div className="text-left text-gray-600 text-sm">
            <div>Nome e Sobrenome: </div>
            <div>Endereço com numero: </div>
            <div>CPF: </div>
            <div>Preço: </div>
            <div>Destino: </div>
            <div>Data e hora da viagem: ida-volta</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
