import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

// CSS
import './App.css';

// COMPONENTES
//import Banner from "./components/Banner";
import NavBarMenu from './components/navBarMenu.js';
//import Travel from "./components/Travel";
//import Residencial from "./components/Residencial";
//import Seguros from "./components/Seguros";
import Faq from './components/Faq';
//import Logos from "./components/Logos";
import Footer from './components/Footer';
import Selos from './components/Selos';
import SobrePrime from './components/SobrePrime';
import Newsletter from './components/Newsletter';
import PaginaLogin from './components/PaginaLogin';
import SignUp from './components/SignUp';
import IndexBannerMktplace from './components/banner-mktplace/indexBannerMktplace';

//Páginas de Produtos
import IndexTravel from './components/primetravel/IndexTravel';
import IndexVida from './components/seguro-de-vida/IndexVida';
import IndexSeguroCelular from './components/seguro-celular/indexSeguroCelular';
import IndexSeguroPet from './components/seguro-pet/IndexSeguroPet';
import IndexSeguroResidencial from './components/Residencial/IndexSeguroResidencial';
import IndexOdonto from './components/Odonto/IndexOdonto';

//Páginas de Aviso
import PaginaObrigadoLP from './components/globalsubcomponentes/PaginaObrigadoLp';
import Cotacao from './components/globalsubcomponentes/Cotacao';
import PageNotFound from './components/PageNotFound';
import IndexSobrePrime from './components/SobrePrime/IndexSobrePrime';
import IndexContato from './components/Contato/IndexContato';
//import SliderSegurosHome from "./components/SliderSegurosHome";
import PrivacyPolicy from './components/globalsubcomponentes/PrivacyPolicy';

//Páginas de Cotação
import IndexCotacaoPetlove from './components/cotacao-pet-love/indexCotacaoPet';
import IndexCotacaoVidaSulamerica from './components/cotacao-vida-sulamerica/indexCotacaoVidaSulamerica';
//import StepAddres from "./components/cotacao-vida-sulamerica/components/StepAddress";
import { CardGraaac } from './components/CardGraac';
import SliderTrofeusHome from './components/SliderTrofeusHome';
//import CountDown from "./components/CountDown";
import { CarouselCustomArrows } from './components/CarouselLogos';
//import Pet from "./components/Pet";
import CredentialNetwork from './components/seguro-pet/rede-credenciada/CredentialNetwork';
import IndexTravelVenda from './components/primetravel-venda/IndexTravelVenda';
import FeaturedInsurance from './components/FeaturedInsurance';
//import FeaturedMiniBanners from "./components/mini-banner/components/FeaturedMiniBanners";
import IndexMiniBanner from './components/mini-banner/IndexMiniBanner';
import IndexBenefits from './components/benefits/IndexBenefits';
import IndexContactSection from './components/contact-section/indexContactSection';
import IndexTrophySection from './components/trophy-section/IndexTrophySection';
import IndexLastPostsBlog from './components/last-posts-blog/IndexLastPostsBlog';
import IndexSeguroBike from './components/seguro-bike/IndexSeguroBike';

//Páginas de Pagamento
import InvoicePayment from './components/seguro-pet/InvoicePayment';
import IndexCotacaoSeguroBike from './components/seguro-bike/cotacao-seguro-bike/IndexCotacaoSeguroBike';
import IndexSeguroCelularKakau from './components/seguro-celular-kakau/indexSeguroCelularKakau';
import IndexCotacaoSeguroCelularkakau from './components/seguro-celular-kakau/cotacao-seguro-celular-kakau/IndexCotacaoSeguroCelularKakau';
import Contracts from './components/accounts/components/Contracts';
import PageContract from './components/accounts/components/PageContract';
import InvoicePaymentVida from './components/seguro-de-vida/InvoicePaymentVida';
import IndexConsorcioImovel from './components/consorcio-imovel/index.js';
import IndexConsorcioAuto from './components/consorcio-auto/index.js';
import IndexCotacaoTravel from './components/primetravel/cotador/indexCotacaoTravel.js';
import IndexVidaOmint from './components/vida-omint/indexVidaOmint.js';
import IndexAuto from './components/seguro-auto/indexAuto.js';
import PopupBack from './components/globalsubcomponentes/BackPopup.js';
import PromotionPopup from './components/globalsubcomponentes/PopupPromotion.js';
import ModalContainer from './components/globalsubcomponentes/ModalContainer.js';
import IndexSimpleTwoYou from './components/seguro-simpletwoyou/IndexSimpleTwoYou.js';
import {
  POPUP_BACK_ENABLED,
  POPUP_PROMOTION_ENABLED,
} from './components/globalsubcomponentes/popupsConfig.js';

/**
 *  Componente para fazer o scroll para o topo da página
 * @function ScrollToTop
 * @returns {null} Retorna null
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Componente principal da aplicação
 *
 * @module App
 * @returns  {JSX.Element} Retorna o JSX da aplicação
 */
function App() {
  // time do countdown
  const _pathname = window?.location?.pathname || '';
  const targetDate = new Date('December 31, 2023 00:00:00');

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className="App font-montserrat">
          <Helmet>
            <title>
              Prime Secure Marketplace - Protegendo Todos os Seus Momentos
            </title>
            <meta
              name="description"
              content="A Prime Secure é um marketplace de seguros que oferece uma variedade de seguros para proteger todos os seus momentos. Encontre o seguro perfeito para você e contrate online em minutos."
            />
            <meta
              name="keywords"
              content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, Marketplace de Seguros, Seguro Celular, Seguro de Vida, Plano de Saúde, Seguro Pet, Seguro Auto, Seguro Residencial, Seguro Odontológico, Plano de Saúde Pet, Prime, Corretora, Seguro Viagem, Secure, Seguro Empresarial, Seguro de Acidentes Pessoais, Seguro de Responsabilidade Civil, Seguro de Equipamentos, Seguro Garantia, Seguro de Transporte, Seguro de Crédito, Seguro Ambiental, Seguro Agrícola, Seguro de Eventos"
            />

            <meta property="og:url" content="https://primesecure.com.br" />
            <link rel="canonical" href="https://primesecure.com.br" />
          </Helmet>

          <NavBarMenu />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* <CountDown targetDate={targetDate} /> */}
                  <IndexBannerMktplace />
                  {/* <Banner /> */}
                  <FeaturedInsurance />
                  <IndexMiniBanner />
                  {/*<Pet />*/}
                  {/*<div id="Travel1">
                    <Travel />
              </div>*/}
                  {/* <div id="Residencial">
                    <Residencial />
            </div>*/}
                  {/*<SliderSegurosHome />*/}
                  <IndexBenefits />
                  <div id="Logos" className="sm:mt-[100px]">
                    <CarouselCustomArrows />
                  </div>
                  <div id="sobrePrime">
                    <SobrePrime />
                  </div>
                  <div id="Newsletter">
                    <Newsletter />
                  </div>
                  {/*<SliderTrofeusHome />*/}
                  <IndexTrophySection />
                  <div id="Faq">
                    <Faq />
                  </div>
                  <IndexLastPostsBlog />
                  <CardGraaac />
                  <Selos />
                  <IndexContactSection />
                  {POPUP_BACK_ENABLED && <PopupBack />}
                  {/* {POPUP_PROMOTION_ENABLED && <PromotionPopup />} */}
                </>
              }
            />
            <Route path="/login" element={<PaginaLogin />} />
            <Route path="/registre-se" element={<SignUp />} />
            <Route path="/contratos" element={<Contracts />} />
            <Route path="/contrato" element={<PageContract />} />
            <Route
              path="/politicas-de-privacidade"
              element={<PrivacyPolicy />}
            />
            <Route path="/rede-credenciada" element={<CredentialNetwork />} />
            {/* ROTAS PETLOVE */}
            <Route
              path="/cotacao-pet-love/planos"
              element={<IndexCotacaoPetlove />}
            />
            <Route
              path="/cotacao-vida-sulamerica"
              element={<IndexCotacaoVidaSulamerica />}
            />
            <Route
              path="/cotacao-vida-sulamerica/planos"
              element={<IndexCotacaoVidaSulamerica />}
            />
            <Route
              path="/cotacao-vida-sulamerica/endereco"
              element={<IndexCotacaoVidaSulamerica />}
            />
            <Route
              path="/cotacao-vida-sulamerica/pagamento"
              element={<IndexCotacaoVidaSulamerica />}
            />
            <Route
              path="/cotacao-vida-sulamerica/obrigado"
              element={<IndexCotacaoVidaSulamerica />}
            />
            <Route
              path="/fatura-vida-sulamerica/:subscriptionId"
              element={<InvoicePaymentVida />}
            />

            <Route
              path="/cotacao-pet-love/dados-pessoais"
              element={<IndexCotacaoPetlove />}
            />
            <Route
              path="/cotacao-pet-love/pagamento"
              element={<IndexCotacaoPetlove />}
            />
            <Route
              path="/cotacao-pet-love/obrigado"
              element={<IndexCotacaoPetlove />}
            />
            <Route
              path="/fatura-petlove/:subscriptionId"
              element={<InvoicePayment />}
            />
            <Route
              path="/fatura-petlove/:subscriptionId/1"
              element={<InvoicePayment newer={true} />}
            />

            <Route path="/cotacao-pet-love" element={<IndexCotacaoPetlove />} />
            {/*ROTAS SEGURO AUTO*/}
            <Route path="/seguro-auto" element={<IndexAuto />} />
            {/* ROTAS SEGURO BIKE KAKAU */}
            <Route path="/seguro-bike" element={<IndexSeguroBike />} />
            <Route
              path="/seguro-bike/cotacao"
              element={<IndexCotacaoSeguroBike />}
            />
            <Route
              path="/seguro-bike/cotacao/dados-cadastrais"
              element={<IndexCotacaoSeguroBike />}
            />
            <Route
              path="/seguro-bike/cotacao/endereco"
              element={<IndexCotacaoSeguroBike />}
            />
            <Route
              path="/seguro-bike/cotacao/cadastro-bike"
              element={<IndexCotacaoSeguroBike />}
            />
            <Route
              path="/seguro-bike/cotacao/pagamento"
              element={<IndexCotacaoSeguroBike />}
            />
            <Route
              path="/seguro-bike/cotacao/pagamento-confirmado"
              element={<IndexCotacaoSeguroBike />}
            />
            {/* ROTAS SEGURO OMINT VIDA */}
            <Route path="/seguro-vida-omint" element={<IndexVidaOmint />} />
            {/* ROTAS SEGURO CELULAR KAKAU */}
            <Route
              path="/seguro-celular-kakau"
              element={<IndexSeguroCelularKakau />}
            />
            <Route
              path="/seguro-celular-kakau/cotacao"
              element={<IndexCotacaoSeguroCelularkakau />}
            />
            <Route
              path="/seguro-celular-kakau/cotacao/dados-cadastrais"
              element={<IndexCotacaoSeguroCelularkakau />}
            />
            <Route
              path="/seguro-celular-kakau/cotacao/endereco"
              element={<IndexCotacaoSeguroCelularkakau />}
            />
            <Route
              path="/seguro-celular-kakau/cotacao/cadastro-celular"
              element={<IndexCotacaoSeguroCelularkakau />}
            />
            <Route
              path="/seguro-celular-kakau/cotacao/pagamento"
              element={<IndexCotacaoSeguroCelularkakau />}
            />
            <Route
              path="/seguro-celular-kakau/cotacao/pagamento-confirmado"
              element={<IndexCotacaoSeguroCelularkakau />}
            />
            {/* ROTAS COTAÇÃO PRIMETRAVEL */}
            <Route
              path="/cotacao-primetravel"
              element={<IndexCotacaoTravel />}
            />
            {/* ROTAS PAGES HOME */}
            <Route path="/sobre" element={<IndexSobrePrime />} />
            <Route path="/contato" element={<IndexContato />} />
            <Route path="/primetravel" element={<IndexTravel />} />
            <Route path="/seguro-viagem" element={<IndexTravelVenda />} />
            <Route path="/seguro-de-vida" element={<IndexVida />} />
            <Route
              path="/equipamentos-portateis-3"
              element={<IndexSeguroCelular />}
            />
            <Route path="/seguro-pet-porto" element={<IndexSeguroPet />} />
            <Route
              path="/seguro-residencial-porto-2"
              element={<IndexSeguroResidencial />}
            />
            <Route path="/sulamerica-odonto" element={<IndexOdonto />} />
            <Route
              path="/consorcio-imovel"
              element={<IndexConsorcioImovel />}
            />
            <Route path="/consorcio-auto" element={<IndexConsorcioAuto />} />
            <Route path="/obrigado" element={<PaginaObrigadoLP />} />
            <Route path="/cotacao" element={<Cotacao />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {!_pathname.includes('/seguro-bike') &&
            !_pathname.includes('/seguro-celular-kakau') &&
            !_pathname.includes('/seguro-celular-kakau') && <Footer />}
          <ModalContainer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
