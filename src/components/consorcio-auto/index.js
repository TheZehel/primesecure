import { Helmet } from 'react-helmet';

// Componentes
import FormConsorcioAuto from './components/FormConsorcioAuto';
import Assistance from './components/Assistances';
import Investment from './components/Investment';
import Contemplados from './components/Contemplados';
import Benefits from './components/Benefits';
import CenteredImage from './components/Table';
import GridImages from './components/GridImages';
import BannerPromo from './components/Banners';

// Importe o ToastContainer e os estilos
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import PromoPopup, {
  PromotionPopup,
} from '../globalsubcomponentes/PopupPromotion';
import PopupBack from '../globalsubcomponentes/BackPopup';

function IndexConsorcioAuto() {
  const targetDate = new Date('December 31, 2023 00:00:00');
  const productId = 'consorcio-auto';

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
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0, 0.5), y: Math.random() - 0.2 },
            });
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.5, 1), y: Math.random() - 0.2 },
            });
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

      {/* <PopupBack productId={productId} /> */}
      <PromotionPopup />


      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>Consórcio Auto Porto | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Consórcio Auto Port Bank, Realize o sonho do carro novo com o consórcio Porto Seguro."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, consórcio, Seguros"
        />
        <meta
          property="og:title"
          content="Consórcio Auto Port Bank, Realize o sonho do carro novo com o consórcio Porto Seguro."
        />
        <meta
          property="og:description"
          content="Consórcio Auto Port Bank, Realize o sonho do carro novo com o consórcio Porto Seguro."
        />
        <meta
          property="og:url"
          content="https://primesecure.com.br/consorcio-imovel"
        />
        <link
          rel="canonical"
          href="https://www.primesecure.com.br/conscorcio-imovel"
        />
      </Helmet>
      <BannerPromo />
      <FormConsorcioAuto />
      <Assistance />
      <Investment />
      <Contemplados />
      <GridImages />
      <Benefits />
      {/* ToastContainer para renderizar os toasts */}
      <ToastContainer />
    </div>
  );
}

export default IndexConsorcioAuto;
