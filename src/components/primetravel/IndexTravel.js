import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import FormTravelBanner from "./components/FormTravelBanner";

function IndexTravel() {
  return (
    <div className="IndexTravel">
      <FormTravelBanner />
    </div>
  );
}

export default IndexTravel;
