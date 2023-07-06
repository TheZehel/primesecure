import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import FormSeguroCelularBanner from "./components/FormSeguroCelularBanner";

function IndexSeguroCelular() {
  return (
    <div className="IndexSeguroCelular">
      <FormSeguroCelularBanner />
    </div>
  );
}

export default IndexSeguroCelular;
