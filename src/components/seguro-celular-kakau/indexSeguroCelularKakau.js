import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import FormSeguroCelularKakau from './components/FormSeguroCelularKakau';
import Assistance from './components/Assistance';
import Plans from './components/Plans';
import NoBureaucracy from './components/NoBureaucracy';
import Faq from './components/Faq';
import Advantages from './components/Advantages';
import Benefits from './components/Benefits';
import CustomFooter from './cotacao-seguro-celular-kakau/components/subcomponents/CustomFooter';
import BannerPromoPhoneKakau from './components/BannerPromoPhoneKakau';
import confetti from 'canvas-confetti';
import PromoPopup, {
  PromotionPopup,
} from '../globalsubcomponentes/PopupPromotion';
import PopupBack from '../globalsubcomponentes/BackPopup';

export default function IndexSeguroCelularKakau() {
  const productId = 'seguro-celular-kakau';
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
  return (
    <div>
      <PopupBack productId={productId} />
      <PromotionPopup />
      <BannerPromoPhoneKakau />
      <FormSeguroCelularKakau
        callback={(data) => {
          SVGAnimatedTransformList({ ...data });
        }}
      />
      <Plans />
      <NoBureaucracy />
      <Advantages />
      <Benefits />
      <Faq />
      <CustomFooter />
    </div>
  );
}
