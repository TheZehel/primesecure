import React, { useRef } from "react";
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
