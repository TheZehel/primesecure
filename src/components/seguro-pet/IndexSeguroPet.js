//Seo
import { Helmet } from "react-helmet";

//Components
import FormSeguroPetBanner from "./components/FormSeguroPetBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import FaqPet from "./components/subcomponents/FaqPet";

function IndexSeguroPet() {
  return (
    <div className="IndexSeguroPet">
      <Helmet>
        <title>Plano de Saúde PetLove | by Prime Secure</title>
        <meta
          name="description"
          content="Um Plano de Saúde Feito Para Pets Com Ampla Rede Credenciada e Profissionais Qualificados."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Plano de Saúde Pet, Saúde Pet, Plano Pet, Prime"
        />
        <meta
          property="og:title"
          content="Plano de Saúde Pet Love - Prime Secure"
        />
        <meta
          property="og:description"
          content="Um Plano de Saúde Feito Para Pets Com Ampla Rede Credenciada e Profissionais Qualificados."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-petlove-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://primesecure.com.br/seguro-pet-porto"
        />
        <link
          rel="canonical"
          href="https://primesecure.com.br/seguro-pet-porto"
        />
      </Helmet>
      <FormSeguroPetBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="3"
      />
      <PlanoSlider infoPlanos={infoPlanos} planId="3" />
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="3" />
      <FaqPet />
    </div>
  );
}

export default IndexSeguroPet;
