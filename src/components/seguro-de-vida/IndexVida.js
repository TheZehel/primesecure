import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import FormVidaBanner from "./components/FormVidaBanner";

function IndexVida() {
  return (
    <div className="IndexVida">
      <FormVidaBanner />
    </div>
  );
}

export default IndexVida;
