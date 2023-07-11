//Components
import FormSeguroCelularBanner from "./components/FormSeguroCelularBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
import infoPlanos from "../modules/InfoPlanos";

function IndexSeguroCelular() {
  return (
    <div className="IndexSeguroCelular">
      <FormSeguroCelularBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="6"
      />
      <PlanoSlider infoPlanos={infoPlanos} planId="1" />
    </div>
  );
}

export default IndexSeguroCelular;
