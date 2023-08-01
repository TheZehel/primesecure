//Components
import FormVidaBanner from "./components/FormVidaBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import ContainerVidaMulher from "./components/subcomponents/ContainerVidaMulher";
import CoberturasSlider from "./components/subcomponents/CoberturasSlider";
import BeneficiosSlider from "./components/subcomponents/BeneficiosSlider copy";

function IndexVida() {
  return (
    <div className="IndexVida">
      <FormVidaBanner />
      <CoberturasSlider />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="4"
      />
      <BeneficiosSlider />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="4" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="4" />
      <ContainerVidaMulher />
    </div>
  );
}

export default IndexVida;
