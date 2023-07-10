import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import FormResidencialBanner from "./components/FormResidencialBanner";

function IndexSeguroResidencial() {
  return (
    <div className="IndexSeguroResidencial">
      <FormResidencialBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="1"
      />
    </div>
  );
}

export default IndexSeguroResidencial;
