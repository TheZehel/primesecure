import SessaoInformativaProdutosLp from '../globalsubcomponentes/SessaoInformativaProdutosLp';
import InformacoesProdutos from '../modules/ModuleInformacoesProdutos';
import FormResidencialBanner from './components/FormResidencialBanner';
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from '../globalsubcomponentes/ConteudoSessaoInfo';
import sessaoInfoLp from '../modules/SessaoInfoLp';
import FaqResidencial from './components/subcomponents/FaqResidencial';
import { Helmet } from 'react-helmet';
import CountDown from './components/subcomponents/CountDown';
import BannerPromo from './components/subcomponents/BannerPromos';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import PromoPopup, {
  PromotionPopup,
} from '../globalsubcomponentes/PopupPromotion';
import PopupBack from '../globalsubcomponentes/BackPopup';

function IndexSeguroResidencial() {
  const targetDate = new Date('December 31, 2023 00:00:00');
  const productId = 'Residencial';
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
    <div className="IndexSeguroResidencial">
      {/* <PopupBack productId={productId} />
      <PromotionPopup /> */}
      <Helmet>
        <title>Seguro Residencial Porto | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Com o Seguro Residencial Porto, proteja seu lar contra incêndios, roubos e danos elétricos. Garanta paz e segurança para sua família."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Residencial, Seguros, Porto Seguro, Porto, Seguro, Seguro Online, Seguro Residencial Online, Cobertura de Incêndio, Cobertura de Roubo, Danos Elétricos, Proteção Residencial, Segurança para Casa, Seguro para Casa, Seguro para Apartamento, Seguro para Condomínio, Seguro Residencial Porto 2, Seguro Residencial Completo, Seguro Residencial Personalizado, Seguro Residencial Confiável, Cotar Seguro Online"
        />
        <meta
          property="og:title"
          content="Seguro Residencial Porto | Prime Secure Marketplace"
        />
        <meta
          property="og:description"
          content="Mais de 10 coberturas para a sua casa, como amparo em caso de danos elétricos, roubos e furtos, danos à terceiros e mais. Conta também com diversos serviços 24H"
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-petlove-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://www.primesecure.com.br/seguro-residencial-porto-2"
        />
        <link
          rel="canonical"
          href="https://www.primesecure.com.br/seguro-residencial-porto-2"
        />
      </Helmet>
      {/*<CountDown targetDate={targetDate} />*/}
      <BannerPromo />
      <FormResidencialBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="1"
      />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="1" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="1" />
      <FaqResidencial />
    </div>
  );
}

export default IndexSeguroResidencial;
