import React from "react";
import FormTravelBanner from "./components/FormTravelBanner";
import SliderPlanos from "./components/SliderPlanos";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import TelemedicinaTravel from "./components/subcomponents/TelemedicinaTravel";
import BrindesTravel from "./components/subcomponents/BrindesTravel";
import FaixaBanner from "./components/subcomponents/FaixaBanner";

function IndexTravel() {
  return (
    <div className="IndexTravel">
      <FormTravelBanner />
      <FaixaBanner />
      <BrindesTravel />
      <TelemedicinaTravel />
      {/*<div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        Seguro garantido pela
        <img src={imageManagerPrimeTravel.ImagensLandPage.ImgEmParceriaCom} alt="Logo da empresa parceira Too Seguros"/>
        uma empresa do grupo BTG PACTUAL                
        </div>*/}
      {<SliderPlanos />}
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="2"
      />
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="2" />
    </div>
  );
}

export default IndexTravel;
