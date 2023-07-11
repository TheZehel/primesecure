import FormOdontoBanner from "./components/subcomponents/FormOdontoBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
import infoPlanos from "../modules/InfoPlanos";

function IndexOdonto() {
  return (
    <div>
      <FormOdontoBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="3"
      />
      <PlanoSlider infoPlanos={infoPlanos} planId="1" />
    </div>
  );
}

export default IndexOdonto;
