import CardsContato from "./components/subcomponents/CardsContato";
import HeaderContato from "./components/subcomponents/HeaderContato";
import IconsSocial from "./components/subcomponents/IconsSocial";
import { Helmet } from "react-helmet";

function IndexContato() {
  return (
    <div className="Indexcontato">
      <Helmet>
        <title>Entre Em Contato | Prime Secure</title>
        <meta
          name="description"
          content="Entre em contato conosco e resolva todas as suas dúvnidas."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Celular, Seguros, porto seguro, porto, porto celular, seguros"
        />
        <meta property="og:url" content="https://primesecure.com.br/contato" />
        <link rel="canonical" href="https://primesecure.com.br/contato" />
      </Helmet>
      <HeaderContato />
      <CardsContato />
      <IconsSocial />
    </div>
  );
}

export default IndexContato;
