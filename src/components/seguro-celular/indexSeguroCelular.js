//Components
import FormSeguroCelularBanner from "./components/FormSeguroCelularBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import SliderCelulares from "./components/SliderCelulares";
import ContainerBenficios from "./components/subcomponents/ContainerBeneficios";
import FaqCelular from "./components/subcomponents/FaqCelular";
import { Helmet } from "react-helmet";
import CountDown from "./components/subcomponents/CountDownBanner";

function IndexSeguroCelular() {
  const targetDate = new Date("September 17, 2023 00:00:00");

  return (
    <div className="IndexSeguroCelular">
      <Helmet>
        <title>Seguro Celular Porto Seguro | Prime Secure</title>
        <meta
          name="description"
          content="Proteja seu celular contra imprevistos e danos com nosso seguro especializado."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Celular, Seguros, porto seguro, porto, porto celular"
        />
        <meta property="og:title" content="Seguro Celular - by Porto Seguro" />
        <meta
          property="og:description"
          content="Proteja seu celular contra imprevistos e danos com nosso seguro especializado."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-petlove-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://primesecure.com.br/equipamentos-portateis-3"
        />
        <link
          rel="canonical"
          href="https://primesecure.com.br/equipamentos-portateis-3"
        />
      </Helmet>
      <CountDown targetDate={targetDate} />
      <FormSeguroCelularBanner />
      <SliderCelulares />
      <ContainerBenficios />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="6"
      />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="6" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="6" />
      <FaqCelular />
    </div>
  );
}

export default IndexSeguroCelular;
