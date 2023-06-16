import "./App.css";
import Banner from "./components/Banner";
import NavBarMenu from "./components/navBarMenu.js";
import Residencial from "./components/Residencial";
import { Skills } from "./components/Skills";

function App() {
  return (
    <div className="App">
      <NavBarMenu />
      <Banner />
      <Skills />
      <Residencial />
    </div>
  );
}

export default App;
