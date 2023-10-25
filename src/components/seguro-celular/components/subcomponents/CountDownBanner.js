import React, { useState, useEffect } from "react";

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
    <div className="bg-pinkPrime text-white p-2">
      <h1 className="text-4xl">
        Semana do Cliente{" "}
        <span className="font-bold text-black">
          20%OFF Até dia 17 deste mês
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
  );
};

export default CountDown;
