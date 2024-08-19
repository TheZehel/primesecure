import { Helmet } from "react-helmet";

//Componentes
import FormConsorcioImovel from "./components/FormConsorcioImovel";
import Assistance from "./components/Assistances";
import Benefits from "./components/Benefits";
import Investment from "./components/Investment";
import Contemplados from "./components/Contemplados";

function IndexConsorcioImovel() {
  const targetDate = new Date("December 31, 2023 00:00:00");
  return (
    <div>
      <Helmet>
        <title>Consórcio Imóvel Porto | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Realize o sonho da casa própria com o Consórcio Porto"
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, consórcio, Seguros"
        />
        <meta
          property="og:title"
          content="Consórcio Imóvel Porto - by Prime Secure"
        />
        <meta
          property="og:description"
          content="Realize o sonho da casa própria com o Consórcio Porto"
        />

        <meta
          property="og:url"
          content="https://primesecure.com.br/consorcio-imovel"
        />
        <link
          rel="canonical"
          href="https://www.primesecure.com.br/conscorcio-imovel"
        />
      </Helmet>
      <FormConsorcioImovel />
      <Assistance />
      <Investment />
      <Contemplados />
      <Benefits />
    </div>
  );
}

export default IndexConsorcioImovel;
