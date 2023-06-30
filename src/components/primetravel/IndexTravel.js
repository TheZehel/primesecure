import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import FormTravelBanner from "./components/FormTravelBanner";
import CardTravel from "./components/subcomponents/CardTravel";

function IndexTravel() {
  return (
    <div className="IndexTravel">
      <FormTravelBanner />
    </div>
  );
}

export default IndexTravel;
