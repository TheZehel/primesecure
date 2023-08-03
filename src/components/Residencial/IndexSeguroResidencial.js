import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import FormResidencialBanner from "./components/FormResidencialBanner";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import FaqResidencial from "./components/subcomponents/FaqResidencial";

function IndexSeguroResidencial() {
  return (
    <div className="IndexSeguroResidencial">
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
