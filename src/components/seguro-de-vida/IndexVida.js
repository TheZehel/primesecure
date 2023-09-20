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
import FaqVida from "./components/subcomponents/FaqVida";
import CountDown from "./components/subcomponents/CountDownBannerVida";

function IndexVida() {
  const targetDate = new Date("September 17, 2023 00:00:00");
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
          content="Seguro de Vida SulAmérica - Prime Secure"
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
          content="https://primesecure.com.br/seguro-de-vida"
        />
        <link
          rel="canonical"
          href="https://primesecure.com.br/seguro-de-vida"
        />
      </Helmet>
      <CountDown targetDate={targetDate} />
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
      <FaqVida />
    </div>
  );
}

export default IndexVida;
