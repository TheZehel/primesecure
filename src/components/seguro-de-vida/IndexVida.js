//Components
import FormVidaBanner from "./components/FormVidaBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import ContainerVidaMulher from "./components/subcomponents/ContainerVidaMulher";

function IndexVida() {
  return (
    <div className="IndexVida">
      <FormVidaBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="4"
      />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="4" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="4" />
      <ContainerVidaMulher />
    </div>
  );
}

export default IndexVida;
