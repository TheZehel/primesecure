//Components
import FormSeguroCelularBanner from "./components/FormSeguroCelularBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";

function IndexSeguroCelular() {
  return (
    <div className="IndexSeguroCelular">
      <FormSeguroCelularBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="6"
      />
    </div>
  );
}

export default IndexSeguroCelular;
