//Components
import FormSeguroPetBanner from "./components/FormSeguroPetBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";

function IndexSeguroPet() {
  return (
    <div className="IndexSeguroPet">
      <FormSeguroPetBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="3"
      />
      <PlanoSlider infoPlanos={infoPlanos} planId="3" />
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="3" />
    </div>
  );
}

export default IndexSeguroPet;
