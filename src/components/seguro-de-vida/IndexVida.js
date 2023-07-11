//Components
import FormVidaBanner from "./components/FormVidaBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
import infoPlanos from "../modules/InfoPlanos";

function IndexVida() {
  return (
    <div className="IndexVida">
      <FormVidaBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="4"
      />
      <PlanoSlider infoPlanos={infoPlanos} planId="1" />
    </div>
  );
}

export default IndexVida;
