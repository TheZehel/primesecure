//Components
import FormSeguroPetBanner from "./components/FormSeguroPetBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
import infoPlanos from "../modules/InfoPlanos";

function IndexSeguroPet() {
  return (
    <div className="IndexSeguroPet">
      <FormSeguroPetBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="5"
      />
      <PlanoSlider infoPlanos={infoPlanos} planId="1" />
    </div>
  );
}

export default IndexSeguroPet;
