//Seo
import { Helmet } from "react-helmet";

//Componentes
import FormOdontoBanner from "./components/FormOdontoBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import FaqOdonto from "./components/subcomponents/FaqOdonto";
import CountDown from "./components/subcomponents/CountDownBannerOdonto";

function IndexOdonto() {
  const targetDate = new Date("September 17, 2023 00:00:00");
  return (
    <div>
      <Helmet>
        <title>Plano Odontológico SulAmérica | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Tenha tranquilidade e cuidado completo com seu sorriso por meio do nosso seguro odontológico."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Odonto, Plano Odonto, Plano Odontologico, Seguros"
        />
        <meta
          property="og:title"
          content="Plano Odontológico SulAmérica - by Prime Secure"
        />
        <meta
          property="og:description"
          content="Tenha tranquilidade e cuidado completo com seu sorriso por meio do nosso seguro odontológico."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-odonto-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://primesecure.com.br/sulamerica-odonto"
        />
        <link
          rel="canonical"
          href="https://primesecure.com.br/sulamerica-odonto"
        />
      </Helmet>
      <CountDown targetDate={targetDate} />
      <FormOdontoBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="5"
      />
      {/*<PlanoSlider infoPlanos={infoPlanos} planId="5" />*/}
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="5" />
      <FaqOdonto />
    </div>
  );
}

export default IndexOdonto;
