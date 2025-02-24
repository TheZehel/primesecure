import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Assistance from './components/Assistance';
import FormSeguroBikeBanner from './components/FormSeguroBikeBanner';
import NoBureaucracy from './components/NoBureaucracy';
import Plans from './components/Plans';
import Faq from './components/Faq';
import Virtual from './components/Virtual';
import Benefits from './components/Benefits';
import Advantages from './components/Advantages';
import CustomeFooter from './cotacao-seguro-bike/components/subcomponents/CustomFooter';
import BannerPromoBike from './components/BannersPromoBike';
import confetti from 'canvas-confetti';
import PromotionPopup, {
  PromoPopup,
} from '../globalsubcomponentes/PopupPromotion';
import TemCerteza, { PopupBack } from '../globalsubcomponentes/BackPopup';

export default function IndexSeguroBike() {
  const [lastStep, setLastStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const hasVisited = localStorage.getItem('visited');
    if (!hasVisited) {
      const audio = new Audio(
        'https://storage.googleapis.com/primesecure/audios-site/carnaval-eft.mp3',
      );
      audio.volume = 0.1;
      audio
        .play()
        .then(() => {
          // Dispara confetes durante 3 segundos
          const duration = 3000;
          const animationEnd = Date.now() + duration;
          const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0,
          };

          function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
          }

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
              clearInterval(interval);
              return;
            }
            const particleCount = 50 * (timeLeft / duration);
            confetti(
              Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0, 0.5), y: Math.random() - 0.2 },
              }),
            );
            confetti(
              Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.5, 1), y: Math.random() - 0.2 },
              }),
            );
          }, 250);
        })
        .catch((error) => {
          console.error('Erro ao reproduzir o áudio:', error);
        });

      localStorage.setItem('visited', 'true');
    }
  }, []);

  const navigate = useNavigate();

  const sendForm = (data) => {
    let form = {
      ...formData,
      ...data,
    };

    console.log('Enviando Formulário:', form);

    var sessionData = sessionStorage.getItem('formBikeData');

    try {
      sessionData = JSON.parse(sessionData);
    } catch (error) {
      console.error('Session Error:', error);
      sessionData = {};
    }

    if (!sessionData) {
      sessionData = {};
    }

    let userData = {};

    if (sessionData.userData) {
      userData = { ...sessionData.userData };
    }

    userData = {
      ...userData,
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    sessionData = {
      ...sessionData,
      userData: userData,
    };

    sessionStorage.setItem('formBikeData', JSON.stringify(sessionData));

    setFormData(form);

    navigate('/seguro-bike/cotacao');
  };

  return (
    <div>
      {/* <PopupBack /> */}
      <PromotionPopup />
      <BannerPromoBike />
      <FormSeguroBikeBanner
        callback={(data) => {
          sendForm({ ...data });
        }}
      />
      <Plans />
      <Virtual />
      <Assistance />
      <NoBureaucracy />
      <Advantages />
      <Benefits />
      <Faq />
      <CustomeFooter />
    </div>
  );
}
