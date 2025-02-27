import PopupBack from '../globalsubcomponentes/BackPopup';
import CardsContato from './components/subcomponents/CardsContato';
import HeaderContato from './components/subcomponents/HeaderContato';
import IconsSocial from './components/subcomponents/IconsSocial';
import { Helmet } from 'react-helmet';

function IndexContato() {
  const productId = 'Contato';
  return (
    <div className="Indexcontato">
      <PopupBack productId={productId} />
      <Helmet>
        <title>Entre Em Contato | Prime Secure</title>
        <meta
          name="description"
          content="Entre em contato conosco e resolva todas as suas dúvidas."
        />
        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Celular, Seguros, porto seguro, porto, porto celular, seguros"
        />
        <meta
          property="og:url"
          content="https://www.primesecure.com.br/contato"
        />
        <link rel="canonical" href="https://www.primesecure.com.br/contato" />
      </Helmet>
      <HeaderContato />
      <CardsContato />
      <IconsSocial />
    </div>
  );
}

export default IndexContato;
