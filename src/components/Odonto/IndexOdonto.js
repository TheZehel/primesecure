import FormOdontoBanner from "./components/subcomponents/FormOdontoBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";

function IndexOdonto() {
  return (
    <div>
      <FormOdontoBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="5"
      />
      <PlanoSlider infoPlanos={infoPlanos} planId="5" />
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="5" />
    </div>
  );
}

export default IndexOdonto;
