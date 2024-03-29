//SEO
import { Helmet } from "react-helmet";

//Componentes
import HeaderSobre from "./components/HeaderSobre";
import FaqSobre from "./components/FaqSobre";
import BannerImg from "./components/BannerImg";

function IndexSobrePrime() {
  return (
    <div className="IndexSobrePrime">
      <Helmet>
        <title>Sobre | Prime Secure</title>
        <meta
          name="description"
          content="Conheça Nossa História! Já são Anos de Inovando no Mercado de Seguros e Tecnologia."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros"
        />
        <meta property="og:title" content="Sobre - Prime Secure" />
        <meta
          property="og:description"
          content="Conheça Nossa História! Já são Anos de Inovando no Mercado de Seguros e Tecnologia."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/sobre-prime.jpg"
        />
        <meta property="og:url" content="https://primesecure.com.br/sobre" />
        <link rel="canonical" href="https://primesecure.com.br/sobre" />
      </Helmet>
      <HeaderSobre />
      <BannerImg />
      <FaqSobre />
    </div>
  );
}

export default IndexSobrePrime;
