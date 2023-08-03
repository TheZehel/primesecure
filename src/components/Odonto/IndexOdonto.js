import FormOdontoBanner from "./components/FormOdontoBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import FaqOdonto from "./components/subcomponents/FaqOdonto";

function IndexOdonto() {
  return (
    <div>
      <FormOdontoBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="5"
      />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="5" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="5" />
      <FaqOdonto />
    </div>
  );
}

export default IndexOdonto;
