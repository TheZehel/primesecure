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
        <title>Seguro Residencial Porto | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Com o Seguro Residencial Porto, proteja seu lar contra incêndios, roubos e danos elétricos. Garanta paz e segurança para sua família."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Residencial, Seguros, Porto Seguro, Porto, Seguro, Seguro Online, Seguro Residencial Online, Cobertura de Incêndio, Cobertura de Roubo, Danos Elétricos, Proteção Residencial, Segurança para Casa, Seguro para Casa, Seguro para Apartamento, Seguro para Condomínio, Seguro Residencial Porto 2, Seguro Residencial Completo, Seguro Residencial Personalizado, Seguro Residencial Confiável, Cotar Seguro Online"
        />
        <meta
          property="og:title"
          content="Seguro Residencial Porto | Prime Secure Marketplace"
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
