import React, { useState, useEffect } from "react";
import imageManagerSeguroPet from "../../bancodeimagens/BancoDeImagensSeguroPet";

const CountDown = ({ targetDate, message }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          Dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          Minutos: Math.floor((difference / 1000 / 60) % 60),
          Segundos: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [targetDate]);

  return (
    <div className="">
      <div className="bg-[#FDBA40]  text-white p-2 flex flex-col items-center justify-center mx-auto ">
        <img
          src={imageManagerSeguroPet.promo.anoNovo}
          alt="imagem promocional"
          className=""
        />
        <h1 className="text-4xl">
          {" "}
          <span className="font-bold text-white">
            Até <span className="text-grayPrime">30%OFF</span> em sua
            contratação
          </span>
        </h1>
        <div className="flex space-x-4 text-2xl items-center justify-center">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit}>
              <span className="font-bold">{value}</span> {unit}
            </div>
          ))}
        </div>
        <p className="mt-4 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default CountDown;
