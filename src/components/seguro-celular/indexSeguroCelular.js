//Components
import FormSeguroCelularBanner from "./components/FormSeguroCelularBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import SliderCelulares from "./components/SliderCelulares";
import ContainerBenficios from "./components/subcomponents/ContainerBeneficios";
import FaqCelular from "./components/subcomponents/FaqCelular";

function IndexSeguroCelular() {
  return (
    <div className="IndexSeguroCelular">
      <FormSeguroCelularBanner />
      <ContainerBenficios />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="6"
      />
      {<SliderCelulares />}
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="6" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="6" />
      <FaqCelular />
    </div>
  );
}

export default IndexSeguroCelular;
