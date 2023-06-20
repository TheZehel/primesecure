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

function App() {
  return (
    <div className="App">
      <NavBarMenu />
      <Banner />
      <Seguros />
      <Travel />
      <Residencial />
      <Faq />
      <Logos />
      <Selos />
      <Footer />
    </div>
  );
}

export default App;
