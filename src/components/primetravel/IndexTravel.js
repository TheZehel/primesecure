//Configs
import React, { useRef } from 'react';

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
import FormTravelBanner2 from './components/FormTravelBanner2';
import NewPlans from './components/subcomponents/newPlans';
import Diferenciais from './components/subcomponents/diferenciais';
import ComoUtilizar from './components/subcomponents/comoUtilizar';
import UmaSolucao from './components/subcomponents/umaSolucao';

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
  // time do countdown
  //const targetDate = new Date("December 31, 2023 00:00:00");
  return (
    <div className="IndexTravel">
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
      {/* <FormTravelBanner2 /> */}
      <FaixaBanner />
      <StepsHiring />
      {/*<BrindeTravel />*/}
      <SomeToppings />
      <Diferenciais />
      <ComoUtilizar />
      <AlbertEinstein />
      <ContainerCoberturas />
      <UmaSolucao />
      {/* {<SliderPlanos />} */}
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
