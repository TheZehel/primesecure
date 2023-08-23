import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
import FormResidencialBanner from "./components/FormResidencialBanner";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import FaqResidencial from "./components/subcomponents/FaqResidencial";
import { Helmet } from "react-helmet";

function IndexSeguroResidencial() {
  return (
    <div className="IndexSeguroResidencial">
      <Helmet>
        <title>Seguro Residencial Porto Seguro | Prime Secure</title>
        <meta
          name="description"
          content="Mais de 10 coberturas para a sua casa, como amparo em caso de danos elétricos, roubos e furtos, danos à terceiros e mais. Conta também com diversos serviços 24H"
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Celular, Seguros, porto seguro, porto, porto celular"
        />
        <meta
          property="og:title"
          content="Seguro Residencial Porto Seguro - Prime Secure"
        />
        <meta
          property="og:description"
          content="Mais de 10 coberturas para a sua casa, como amparo em caso de danos elétricos, roubos e furtos, danos à terceiros e mais. Conta também com diversos serviços 24H"
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-petlove-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://primesecure.com.br/seguro-residencial-porto-2"
        />
        <link
          rel="canonical"
          href="https://primesecure.com.br/seguro-residencial-porto-2"
        />
      </Helmet>
      <FormResidencialBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="1"
      />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="1" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="1" />
      <FaqResidencial />
    </div>
  );
}

export default IndexSeguroResidencial;
