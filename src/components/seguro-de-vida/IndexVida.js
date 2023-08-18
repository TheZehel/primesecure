//Seo
import { Helmet } from "react-helmet";

//Components
import FormVidaBanner from "./components/FormVidaBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import ContainerVidaMulher from "./components/subcomponents/ContainerVidaMulher";
import CoberturasSlider from "./components/subcomponents/CoberturasSlider";
import BeneficiosSlider from "./components/subcomponents/BeneficiosSlider copy";

function IndexVida() {
  return (
    <div className="IndexVida">
      <Helmet>
        <title>Seguro De Vida SulAmérica | Prime Secure</title>
        <meta
          name="description"
          content="Coberturas que protegem sua renda em casos de doença ou acidente. Simule para conhecer todas as opções de proteções."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro de Vida, SulAmérica"
        />
        <meta
          property="og:title"
          content="Plano de Saúde Pet Love - Prime Secure"
        />
        <meta
          property="og:description"
          content="Coberturas que protegem sua renda em casos de doença ou acidente. Simule para conhecer todas as opções de proteções."
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
      <FormVidaBanner />
      <CoberturasSlider />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="4"
      />
      <BeneficiosSlider />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="4" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="4" />
      <ContainerVidaMulher />
    </div>
  );
}

export default IndexVida;
