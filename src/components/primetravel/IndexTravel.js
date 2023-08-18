//Configs
import React, { useRef } from "react";

//Seo
import { Helmet } from "react-helmet";

//Componentes
import FormTravelBanner from "./components/FormTravelBanner";
import SliderPlanos from "./components/SliderPlanos";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
//import sessaoInfoLp from "../modules/SessaoInfoLp";
import TelemedicinaTravel from "./components/subcomponents/TelemedicinaTravel";
import BrindeTravel from "./components/subcomponents/BrindeTravel";
import FaixaBanner from "./components/subcomponents/FaixaBanner";
import ContainerContato from "./components/subcomponents/ContainerContato";
import FaqTravel from "./components/subcomponents/FaqTravel";
//import ContainerParceiros from "./components/subcomponents/ContainerParceiros";
import ContainerCoberturas from "./components/subcomponents/ContainerCoberturas";
import ContainerDepoimetos from "./components/subcomponents/ContainerDepoimentos";

function IndexTravel() {
  const FaqRef = useRef();
  const scrollToFaq = () => {
    const faqPosition = FaqRef.current.getBoundingClientRect();
    window.scrollBy({
      top: faqPosition.top - 100,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="IndexTravel">
      <Helmet>
        <title>
          Prime Travel Seguro Viagem | Contratação 100% Online | by Prime Secure
        </title>
        <meta
          name="description"
          content="Realize a Contratação do Seu Seguro de Viagem de maneira 100% Online. Você ainda pode parcelar em até 12x Sem Juros ou Pagar Com Pix."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Viagem, Seguro de Viagem, Prime Travel, Prime"
        />
        <meta
          property="og:title"
          content="Prime Travel Seguro Viagem - by Prime Secure"
        />
        <meta
          property="og:description"
          content="Realize a Contratação do Seu Seguro de Viagem de maneira 100% Online. Você ainda pode parcelar em até 12x Sem Juros ou Pagar Com Pix."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-primetravel-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://primesecure.com.br/primetravel"
        />
        <link rel="canonical" href="https://primesecure.com.br/primetravel" />
      </Helmet>
      <FormTravelBanner />
      <FaixaBanner />
      <BrindeTravel />
      <ContainerCoberturas />
      {<SliderPlanos />}
      <TelemedicinaTravel />
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
        {" "}
        <FaqTravel />{" "}
      </div>
    </div>
  );
}

export default IndexTravel;
