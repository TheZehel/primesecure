import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

// CSS
import "./App.css";

// COMPONENTES
import Banner from "./components/Banner";
import NavBarMenu from "./components/navBarMenu.js";
import Travel from "./components/Travel";
import Residencial from "./components/Residencial";
import Seguros from "./components/Seguros";
import Faq from "./components/Faq";
import Logos from "./components/Logos";
import Footer from "./components/Footer";
import Selos from "./components/Selos";
import SobrePrime from "./components/SobrePrime";
import Newsletter from "./components/Newsletter";
import PaginaLogin from "./components/PaginaLogin";

//Páginas de Produtos
import IndexTravel from "./components/primetravel/IndexTravel";
import IndexVida from "./components/seguro-de-vida/IndexVida";
import IndexSeguroCelular from "./components/seguro-celular/indexSeguroCelular";
import IndexSeguroPet from "./components/seguro-pet/IndexSeguroPet";
import IndexSeguroResidencial from "./components/Residencial/IndexSeguroResidencial";
import IndexOdonto from "./components/Odonto/IndexOdonto";

//Páginas de Aviso
import PaginaObrigadoLP from "./components/globalsubcomponentes/PaginaObrigadoLp";
import Cotacao from "./components/globalsubcomponentes/Cotacao";
import PageNotFound from "./components/PageNotFound";
import IndexSobrePrime from "./components/SobrePrime/IndexSobrePrime";
import IndexContato from "./components/Contato/IndexContato";
import IndexCotacaoPetlove from "./components/cotacao-pet-love/indexCotacaoPet";
import SliderSegurosHome from "./components/SliderSegurosHome";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Helmet>
          <title>
            Um MarketPlace de Seguros | Prime Secure - Protegendo Todos os Seus
            Momentos
          </title>
          <meta
            name="description"
            content="Escolha o seguro que mais se enquadra em seu perfil e contrate 100% online sem dores de cabeça."
          />
          <meta
            name="keywords"
            content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro Celular, seguro de vida, plano de saúde pet, prime, corretora, seguro viagem, secure"
          />
          <meta
            property="og:url"
            content="https://primesecure.com.br/contato"
          />
          <link rel="canonical" href="https://primesecure.com.br/contato" />
        </Helmet>
        <NavBarMenu />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />

                <div id="Travel1">
                  <Travel />
                </div>
                <div id="Residencial">
                  <Residencial />
                </div>
                <SliderSegurosHome />
                <div id="sobrePrime">
                  <SobrePrime />
                </div>
                <div id="Newsletter">
                  <Newsletter />
                </div>
                <div id="Faq">
                  <Faq />
                </div>
                <div id="Logos">
                  <Logos />
                </div>
                <Selos />
              </>
            }
          />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/cotacao-pet-love" element={<IndexCotacaoPetlove />} />
          <Route path="/sobre" element={<IndexSobrePrime />} />
          <Route path="/contato" element={<IndexContato />} />
          <Route path="/primetravel" element={<IndexTravel />} />
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

          <Route path="/obrigado" element={<PaginaObrigadoLP />} />
          <Route path="/cotacao" element={<Cotacao />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    //TESTE DEPLPYS
  );
}

export default App;
