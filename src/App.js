import "./App.css";
import Banner from "./components/Banner";
import NavBarMenu from "./components/navBarMenu.js";
import { Skills } from "./components/Skills";

function App() {
  return (
    <div className="App">
      <NavBarMenu />
      <Banner />
      <Skills />
    </div>
  );
}

export default App;
