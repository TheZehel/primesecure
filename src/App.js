import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

//Páginas
import IndexTravel from "./components/primetravel/IndexTravel";
import IndexVida from "./components/seguro-de-vida/IndexVida";
import IndexSeguroCelular from "./components/seguro-celular/indexSeguroCelular";

//Página de Obrigado
import PaginaObrigadoLP from "./components/globalsubcomponentes/PaginaObrigadoLp";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBarMenu />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Seguros />
                <div id="Travel1">
                  <Travel />
                </div>
                <div id="Residencial">
                  <Residencial />
                </div>
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
          <Route path="/primetravel" element={<IndexTravel />} />
          <Route path="/seguro-de-vida" element={<IndexVida />} />
          <Route
            path="/equipamentos-portateis-3"
            element={<IndexSeguroCelular />}
          />
          <Route path="/obrigado" element={<PaginaObrigadoLP />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
