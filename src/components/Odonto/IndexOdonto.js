import FormOdontoBanner from "./components/subcomponents/FormOdontoBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";

function IndexOdonto() {
  return (
    <div>
      <FormOdontoBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="3"
      />
    </div>
  );
}

export default IndexOdonto;
