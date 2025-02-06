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
import CountDown from "./components/subcomponents/CountDown";
import BannerPromo from "./components/subcomponents/BannerPromosCelular";

// Importa o ToastContainer e os estilos
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IndexSeguroCelular() {
  const targetDate = new Date("December 31, 2023 00:00:00");

  return (
    <div className="IndexSeguroCelular">
      <Helmet>
        <title>Seguro Celular Porto | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Proteja seu celular contra imprevistos e danos com nosso seguro especializado."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Celular, Seguros, Porto Seguro, Porto, Porto Celular, Cobertura para Celular, Seguro para Smartphone, Proteção para Celular, Seguro contra Roubo de Celular, Seguro contra Danos de Celular, Seguro para iPhone, Seguro para Android, Seguro para Dispositivos Móveis, Seguro para Gadgets, Seguro Celular Online, Seguro Celular Confiável, Plano de Seguro para Celular, Seguro Celular Completo"
        />

        <meta
          property="og:title"
          content="Seguro Celular Porto | Prime Secure Marketplace"
        />
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
          content="https://www.primesecure.com.br/equipamentos-portateis-3"
        />
        <link
          rel="canonical"
          href="https://www.primesecure.com.br/equipamentos-portateis-3"
        />
      </Helmet>
      {/*<CountDown targetDate={targetDate} />*/}
      <BannerPromo />
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

      {/* ToastContainer para renderizar os toasts */}
      <ToastContainer />
    </div>
  );
}

export default IndexSeguroCelular;
