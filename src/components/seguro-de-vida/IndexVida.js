//Seo
import { Helmet } from 'react-helmet';

//Components
import FormVidaBanner from './components/FormVidaBanner';
import SessaoInformativaProdutosLp from '../globalsubcomponentes/SessaoInformativaProdutosLp';
import InformacoesProdutos from '../modules/ModuleInformacoesProdutos';
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from '../globalsubcomponentes/ConteudoSessaoInfo';
import sessaoInfoLp from '../modules/SessaoInfoLp';
import ContainerVidaMulher from './components/subcomponents/ContainerVidaMulher';
import CoberturasSlider from './components/subcomponents/CoberturasSlider';
import BeneficiosSlider from './components/subcomponents/BeneficiosSlider copy';
import FaqVida from './components/subcomponents/FaqVida';
import CountDown from './components/subcomponents/CountDownBannerVida';
import BannerPromo from './components/subcomponents/BannerPromosVida';
import NamuSection from './components/subcomponents/namu';
import PlansSliderLp from './components/subcomponents/PlansSliderLp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import PromoPopup, {
  PromotionPopup,
} from '../globalsubcomponentes/PopupPromotion';
import PopupBack from '../globalsubcomponentes/BackPopup';

function IndexVida() {
  const targetDate = new Date('December 31, 2023 00:00:00');
  const productId = 'seguro-de-vida';
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
    <div className="IndexVida">
      {/* <PopupBack productId={productId} />
      <PromotionPopup /> */}
      <Helmet>
        <title>Seguro De Vida SulAmérica | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Coberturas que protegem sua renda em casos de doença ou acidente. Simule para conhecer todas as opções de proteções."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro de Vida, SulAmérica, Cobertura de Vida, Plano de Seguro de Vida, Seguro de Vida Individual, Seguro de Vida Familiar, Seguro de Vida para Empresas, Seguro de Vida Online, Seguro de Vida Confiável, Seguro de Vida Personalizado, Seguro de Vida Completo, Proteção Financeira, Segurança Financeira, Benefícios de Seguro de Vida, Seguro de Vida a Termo, Seguro de Vida Integral, Cobertura por Morte Acidental"
        />
        <meta
          property="og:title"
          content="Seguro de Vida SulAmérica - Prime Secure"
        />
        <meta
          property="og:description"
          content="Coberturas que protegem sua renda em casos de doença ou acidente. Simule para conhecer todas as opções de proteções."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-petlove-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://www.primesecure.com.br/seguro-de-vida"
        />
        <link
          rel="canonical"
          href="https://www.primesecure.com.br/seguro-de-vida"
        />
      </Helmet>
      {/*<CountDown targetDate={targetDate} />*/}
      <BannerPromo />
      <FormVidaBanner />
      <CoberturasSlider />
      <PlansSliderLp />
      <NamuSection />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="4"
      />
      <BeneficiosSlider />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="4" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="4" />
      <FaqVida />

      {/* ToastContainer para renderizar os toasts */}
      <ToastContainer />
    </div>
  );
}

export default IndexVida;
