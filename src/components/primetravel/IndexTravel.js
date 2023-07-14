import React from "react";
import FormTravelBanner from "./components/FormTravelBanner";
import SliderPlanos from "./components/SliderPlanos";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";

function IndexTravel() {
  return (
    <div className="IndexTravel">
      <FormTravelBanner />
      <SliderPlanos />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="2"
      />
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="2" />
    </div>
  );
}

export default IndexTravel;
