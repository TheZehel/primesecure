import { Helmet } from "react-helmet";

//Componentes
import FormConsorcioAuto from "./components/FormConsorcioAuto";
import Assistance from "./components/Assistances";
import Investment from "./components/Investment";
import Contemplados from "./components/Contemplados";
import Benefits from "./components/Benefits";

function IndexConsorcioAuto() {
  const targetDate = new Date("December 31, 2023 00:00:00");
  return (
    <div>
      <Helmet>
        <title>Consórcio Auto Porto | Prime Secure Marketplace</title>
        <meta
          name="description"
          content=" Consórcio Auto Port Bank, Realize o sonho do carro novo com o consórcio Porto Seguro. "
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, consórcio, Seguros"
        />
        <meta
          property="og:title"
          content="Consórcio Auto Port Bank, Realize o sonho do carro novo com o consórcio Porto Seguro."
        />
        <meta
          property="og:description"
          content="Consórcio Auto Port Bank, Realize o sonho do carro novo com o consórcio Porto Seguro."
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
      <FormConsorcioAuto />
      <Assistance />
      <Investment />
      <Contemplados />
      <Benefits />
    </div>
  );
}

export default IndexConsorcioAuto;
