import React from "react";
import FormTravelBanner from "./components/FormTravelBanner";
import SliderPlanos from "./components/SliderPlanos";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";

function IndexTravel() {
  return (
    <div className="IndexTravel">
      <FormTravelBanner />
      <SliderPlanos />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="2"
      />
    </div>
  );
}

export default IndexTravel;
