import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import FormResidencialBanner from "./components/FormResidencialBanner";
import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
import infoPlanos from "../modules/InfoPlanos";

function IndexSeguroResidencial() {
  return (
    <div className="IndexSeguroResidencial">
      <FormResidencialBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="1"
      />
      <PlanoSlider infoPlanos={infoPlanos} planId="1" />
    </div>
  );
}

export default IndexSeguroResidencial;
