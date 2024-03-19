import React, { useState } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutCotacaoPlanos from "./components/subcomponents/LayoutCotacao";
import chip from "../../../assets/svg/payment-card/cc-chip.svg";
//import bandeira from "../../../assets/svg/payment-card/cc-visa.svg";
import imgDefault from "../../../assets/svg/payment-card/cc-icon.svg";
import InputMask from "react-input-mask";
//import axios from "axios";
//import { Checkbox, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import BrandCards from "../../modules/BrandCards";
import "animate.css";

export default function PaymentPhone({ brand }) {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");

  const cardsBrand = [
    {
      name: "Visa",
      img: BrandCards("visa"),
      initialNumbers: [4],
      length: [16],
    },

    {
      name: "Mastercard",
      img: BrandCards.Mastercard,
      initialNumbers: [5],
      length: [16],
    },
    {
      name: "American Express",
      img: BrandCards.AmericanExpress,
      initialNumbers: [3, 37],
      length: [15],
    },
    {
      name: "Diners Club",
      img: BrandCards.DinersClub,
      initialNumbers: [30, 36, 38],
      length: [14],
    },
    {
      name: "Discover",
      img: BrandCards.Discover,
      initialNumbers: [6],
      length: [16],
    },
    {
      name: "JCB",
      img: BrandCards.JCB,
      initialNumbers: [3, 35],
      length: [16],
    },
  ];
  const CardBrandImage = ({ cardNumber }) => {
    // Função para encontrar a bandeira do cartão
    const findCardBrand = (number) => {
      // Verifique os primeiros 4 dígitos para maior precisão quando necessário
      const firstFourDigits = number.substring(0, 4);
      const firstTwoDigits = number.substring(0, 2);
      const firstDigit = number.substring(0, 1);

      return cardsBrand.find((brand) =>
        brand.initialNumbers.some((initNum) => {
          // Para comparação com precisão de até 4 dígitos
          const strInitNum = initNum.toString();
          if (strInitNum.length === 4) {
            return firstFourDigits.startsWith(strInitNum);
          } else if (strInitNum.length === 2) {
            return firstTwoDigits === strInitNum;
          } else {
            return firstDigit === strInitNum;
          }
        })
      );
    };

    // Obter a bandeira com base no número do cartão
    const cardBrand = findCardBrand(cardNumber);

    let brand = "";
    if (cardBrand) {
      brand = cardBrand.name.toLowerCase().replace(/\s/g, "");
    }

    // Caso especial para "Diners Club" devido ao compartilhamento de dígitos iniciais
    if (
      cardBrand &&
      cardBrand.name === "diners" &&
      !cardNumber.startsWith("36")
    ) {
      brand = ""; // Resetar bandeira se a condição específica não for atendida
    }

    // Mantenha a lógica do switch se necessário para tratamentos específicos
    // ...

    if (brand === "") {
      return <div></div>; // ou <img src={imgDefault} alt="Default Card" />
    }

    // Usa a função 'BrandCards' para renderizar a imagem baseada na bandeira detectada
    return <BrandCards brand={brand} />;
  };

  // Funções de manipulação para cada campo
  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCardHolderChange = (e) => {
    setCardHolder(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleCvcChange = (e) => {
    setCvc(e.target.value);
  };

  return (
    <div className="mx-2">
      <LayoutCotacaoPlanos title="Finalize o pagamento" position={4} />
      <div className="animate__animated animate__fadeInRight  container mx-auto  bg-[#ffffff] rounded-2xl flex flex-col mt-3 md:flex-row gap-8 justify-center sm:justify-between items-center max-w-[1025px] ">
        {/* Formulário */}
        <div className="form bg-[#ffffff] rounded-lg flex flex-col gap-4 w-full md:w-1/2 ">
          <form className="max-w-lg mx-auto grid gap-4">
            <div className="grid gap-1.5">
              <label
                htmlFor="card-number"
                className="font-semibold text-lg leading-6 tracking-tight text-uppercase text-grayPrime"
              >
                Número do cartão
              </label>
              <InputMask
                id="card-number"
                className="bg-[#ffffff] border border-[#03a8db] rounded-md h-10 px-4 w-full text-grayPrime uppercase"
                mask={"9999 9999 9999 9999"}
                maskChar={null}
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="card-holder"
                className="font-semibold text-lg leading-6 tracking-tight text-uppercase text-grayPrime"
              >
                Nome do titular
              </label>
              <input
                id="card-holder"
                className="bg-[#ffffff] border border-[#03a8db] rounded-md h-10 px-4 w-full text-grayPrime uppercase"
                onChange={handleCardHolderChange}
                value={cardHolder}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 grid gap-1.5">
                <label
                  htmlFor="expiration-date"
                  className="font-semibold text-lg leading-6 tracking-tight text-uppercase text-grayPrime"
                >
                  Expiração
                </label>
                <InputMask
                  id="expiration-date"
                  className="bg-[#ffffff] border border-[#03a8db] rounded-md h-10 px-4 w-full text-grayPrime uppercase"
                  mask={"99/99"}
                  maskChar={null}
                  onChange={handleExpirationDateChange}
                  value={expirationDate}
                />
              </div>

              <div className="flex-1 grid gap-1.5">
                <label
                  htmlFor="security-code"
                  className="font-semibold text-lg leading-6 tracking-tight text-uppercase text-grayPrime"
                >
                  CVC
                </label>
                <InputMask
                  id="security-code"
                  className="bg-[#ffffff] border border-[#03a8db] rounded-md h-10 px-4 w-full text-grayPrime uppercase"
                  mask={"999"}
                  maskChar={null}
                  onChange={handleCvcChange}
                  value={cvc}
                />
              </div>
            </div>

            <button className="mt-4 flex justify-center items-center py-4 bg-[#42D3FF] rounded-md cursor-pointer border-none font-bold text-lg leading-7  transition-all duration-300 hover:brightness-110">
              ADICIONAR CARTÃO
            </button>
          </form>
        </div>

        {/* Cartão */}
        <div className="p-6 bg-gradient-to-r from-bluePrime to-bluePrime2 rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-between">
            <div>
              <img src={imgDefault} alt="" />
            </div>
            <div>
              <CardBrandImage cardNumber={cardNumber} />
            </div>
          </div>
          <div className="flex justify-between items-center mb-6"></div>
          <div className="text-white text-2xl font-bold text-start ">
            {cardNumber || "0000 0000 0000 0000"}
          </div>
          <div className="mt-3">
            <div className="text-xs text-gray-300 text-start">
              Nome do titular
            </div>
            <div className="text-sm font-bold text-white uppercase text-start">
              {cardHolder || "NOME DO TITULAR"}
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div>
              <div className="text-xs text-gray-300">Expiração</div>
              <div className="text-sm font-bold text-white uppercase">
                {expirationDate || "00/00"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-300">CVC</div>
              <div className="text-sm font-bold text-white uppercase">
                {cvc || "000"}
              </div>
            </div>
            <div>
              <img src={chip} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
