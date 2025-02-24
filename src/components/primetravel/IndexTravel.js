//Configs
import React, { useEffect, useRef } from 'react';

//Seo
import { Helmet } from 'react-helmet';

//Componentes
import FormTravelBanner from './components/FormTravelBanner';
import SliderPlanos from './components/SliderPlanos';
import SessaoInformativaProdutosLp from '../globalsubcomponentes/SessaoInformativaProdutosLp';
import InformacoesProdutos from '../modules/ModuleInformacoesProdutos';
//import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
//import sessaoInfoLp from "../modules/SessaoInfoLp";
import TelemedicinaTravel from './components/subcomponents/TelemedicinaTravel';
import BrindeTravel from './components/subcomponents/BrindeTravel';
import FaixaBanner from './components/subcomponents/FaixaBanner';
import ContainerContato from './components/subcomponents/ContainerContato';
import FaqTravel from './components/subcomponents/FaqTravel';
//import ContainerParceiros from "./components/subcomponents/ContainerParceiros";
import ContainerCoberturas from './components/subcomponents/ContainerCoberturas';
import BannerPixAndCard from './components/subcomponents/BannerPixAndCard';
//import BannerPix from "./components/subcomponents/BannerPix";
//import ContainerDepoimetos from "./components/subcomponents/ContainerDepoimentos";
import CountDown from './components/subcomponents/countdownPromo';
import AlbertEinstein from './components/subcomponents/AlbertEinstein';
import SomeToppings from './components/subcomponents/SomeToppings';
import BannerPromos from './components/subcomponents/BannerPromos';
import StepsHiring from './components/subcomponents/HiringSteps';
import BannerPromo from './components/subcomponents/BannerPromo';
import confetti from 'canvas-confetti';
import PromoPopup, {
  PromotionPopup,
} from '../globalsubcomponentes/PopupPromotion';

function IndexTravel() {
  const FaqRef = useRef();
  const scrollToFaq = () => {
    const faqPosition = FaqRef.current.getBoundingClientRect();
    window.scrollBy({
      top: faqPosition.top - 100,
      left: 0,
      behavior: 'smooth',
    });
  };
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
  }, []); // Removeu a verificação de "visited" para que ocorra sempre
  // time do countdown
  //const targetDate = new Date("December 31, 2023 00:00:00");
  return (
    <div className="IndexTravel">
      <PromotionPopup />
      <Helmet>
        <title>Seguro de Viagem Prime Travel | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Contrate o Seguro de Viagem Prime Travel online na Prime Secure. Parcelamento em até 12x sem juros ou pagamento via Pix para sua viagem nacional ou internacional."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, Marketplace de Seguros, Seguro Viagem, Seguro de Viagem, Prime Travel, Prime"
        />
        <meta
          property="og:title"
          content="Seguro de Viagem Prime Travel | Prime Secure Marketplace"
        />
        <meta
          property="og:description"
          content="Contrate seu Seguro de Viagem Prime Travel 100% online na Prime Secure Marketplace. Opções de parcelamento em até 12x sem juros ou pagamento via Pix. Explore coberturas amplas para sua viagem nacional ou internacional, seja ela terrestre, marítima ou aérea."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-primetravel-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://www.primesecure.com.br/primetravel"
        />
        {/* verdadeira tag canonical */}
        <link
          rel="canonical"
          href="https://www.primesecure.com.br/primetravel"
        />
      </Helmet>
      {/*<BannerPromos />*/}
      <BannerPromo />
      {/*<CountDown targetDate={targetDate} />*/}
      <FormTravelBanner />
      <FaixaBanner />
      <StepsHiring />
      {/*<BrindeTravel />*/}
      {/* <SomeToppings /> */}
      <AlbertEinstein />
      <ContainerCoberturas />
      {<SliderPlanos />}
      {/*<TelemedicinaTravel />*/}
      <ContainerContato scroll={scrollToFaq} />
      {/*<ContainerDepoimetos />*/}
      {/*<div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        Seguro garantido pela
        <img src={imageManagerPrimeTravel.ImagensLandPage.ImgEmParceriaCom} alt="Logo da empresa parceira Too Seguros"/>
        uma empresa do grupo BTG PACTUAL
        </div>*/}
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="2"
      />
      {/*<ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="2" />*/}
      {/*<ContainerParceiros />*/}
      <div ref={FaqRef}>
        {' '}
        <FaqTravel />
      </div>
    </div>
  );
}

export default IndexTravel;
