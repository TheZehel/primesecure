import "./App.css";
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
import Contato from "./components/Contato";

function App() {
  return (
    <div className="App">
      <NavBarMenu />

      <Banner />
      <Seguros />
      <div
        id="Travel1"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Travel />
      </div>
      <div id="Residencial">
        <Residencial />
      </div>
      <div id="sobrePrime">
        <SobrePrime />
      </div>
      <div id="Contato">
        <Contato />
      </div>
      <Faq />
      <Logos />
      <Selos />
      <Footer />
    </div>
  );
}

export default App;
