//Components
import FormSeguroPetBanner from "./components/FormSeguroPetBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";

function IndexSeguroPet() {
  return (
    <div className="IndexSeguroPet">
      <FormSeguroPetBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="5"
      />
    </div>
  );
}

export default IndexSeguroPet;
