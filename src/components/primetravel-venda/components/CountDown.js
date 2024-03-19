import React, { useState, useEffect } from "react";
import imageManagerPrimeTravelLpVenda from "../bancodeimagens/BancoDeImgsTravelVenda";

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
    <div className="bg-[#c61111] text-white p-2 flex flex-col md:flex-row items-center justify-center mx-auto">
      <img
        src={imageManagerPrimeTravelLpVenda.promo.natal}
        alt="imagem promocional"
        className="w-[120px] mb-4 md:mb-0"
      />
      <h1 className="flex text-4xl mb-2 sm:mb-0 md:mx-4">
        <span className="font-bold text-white text-lg">
          Até <span className="text-greenPromo">70%OFF</span> Em Seu Seguro
          Viagem
        </span>
      </h1>
      <div className="flex space-x-2 text-xl items-center justify-center mb-4 md:mb-0">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit}>
            <span className="font-bold">{value}</span> {unit}
          </div>
        ))}
      </div>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default CountDown;
