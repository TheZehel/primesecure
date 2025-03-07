//Components
import FormSeguroCelularBanner from './components/FormSeguroCelularBanner';
import SessaoInformativaProdutosLp from '../globalsubcomponentes/SessaoInformativaProdutosLp';
import InformacoesProdutos from '../modules/ModuleInformacoesProdutos';
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from '../globalsubcomponentes/ConteudoSessaoInfo';
import sessaoInfoLp from '../modules/SessaoInfoLp';
import SliderCelulares from './components/SliderCelulares';
import ContainerBenficios from './components/subcomponents/ContainerBeneficios';
import FaqCelular from './components/subcomponents/FaqCelular';
import { Helmet } from 'react-helmet';
import CountDown from './components/subcomponents/CountDown';
import BannerPromo from './components/subcomponents/BannerPromosCelular';

// Importa o ToastContainer e os estilos
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import PromoPopup, {
  PromotionPopup,
} from '../globalsubcomponentes/PopupPromotion';
import PopupBack from '../globalsubcomponentes/BackPopup';

function IndexSeguroCelular() {
  const targetDate = new Date('December 31, 2023 00:00:00');
  const productId = 'seguro-celular';
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
    <div className="IndexSeguroCelular">
      {/* <PopupBack productId={productId} /> */}
      <PromotionPopup />
      <Helmet>
        <title>Seguro Celular Porto | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Proteja seu celular contra imprevistos e danos com nosso seguro especializado."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Celular, Seguros, Porto Seguro, Porto, Porto Celular, Cobertura para Celular, Seguro para Smartphone, Proteção para Celular, Seguro contra Roubo de Celular, Seguro contra Danos de Celular, Seguro para iPhone, Seguro para Android, Seguro para Dispositivos Móveis, Seguro para Gadgets, Seguro Celular Online, Seguro Celular Confiável, Plano de Seguro para Celular, Seguro Celular Completo"
        />

        <meta
          property="og:title"
          content="Seguro Celular Porto | Prime Secure Marketplace"
        />
        <meta
          property="og:description"
          content="Proteja seu celular contra imprevistos e danos com nosso seguro especializado."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-petlove-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://www.primesecure.com.br/equipamentos-portateis-3"
        />
        <link
          rel="canonical"
          href="https://www.primesecure.com.br/equipamentos-portateis-3"
        />
      </Helmet>
      {/*<CountDown targetDate={targetDate} />*/}
      <BannerPromo />
      <FormSeguroCelularBanner />
      <SliderCelulares />
      <ContainerBenficios />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="6"
      />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="6" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="6" />
      <FaqCelular />

      {/* ToastContainer para renderizar os toasts */}
      <ToastContainer />
    </div>
  );
}

export default IndexSeguroCelular;
