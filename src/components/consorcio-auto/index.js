import { Helmet } from 'react-helmet';

// Componentes
import FormConsorcioAuto from './components/FormConsorcioAuto';
import Assistance from './components/Assistances';
import Investment from './components/Investment';
import Contemplados from './components/Contemplados';
import Benefits from './components/Benefits';
import CenteredImage from './components/Table';
import GridImages from './components/GridImages';
import BannerPromo from './components/Banners';

// Importe o ToastContainer e os estilos
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PromoPopup, {
  PromotionPopup,
} from '../globalsubcomponentes/PopupPromotion';
import PopupBack from '../globalsubcomponentes/BackPopup';

function IndexConsorcioAuto() {
  const targetDate = new Date('December 31, 2023 00:00:00');
  const productId = 'consorcio-auto';
  return (
    <div>
      {/* <PopupBack productId={productId} /> */}
      <PromotionPopup />
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>Consórcio Auto Porto | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="Consórcio Auto Port Bank, Realize o sonho do carro novo com o consórcio Porto Seguro."
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
      <BannerPromo />
      <FormConsorcioAuto />
      <Assistance />
      <Investment />
      <Contemplados />
      <GridImages />
      <Benefits />
      {/* ToastContainer para renderizar os toasts */}
      <ToastContainer />
    </div>
  );
}

export default IndexConsorcioAuto;
