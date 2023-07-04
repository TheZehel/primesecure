import React, { useState } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import imageManagerVida from "../bancodeimagens/BancoDeImagensVida";

export default function FormTravelBanner() {
  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: { "0-40": 0, "41-64": 0, "65-75": 0, "76-99": 0 },
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
    // Envie o formData para uma API ou o próximo componente
  };

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-2"
      style={{
        backgroundImage: `url(${imageManagerVida.banners.BannerVida})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BannerSection
        chipText="Invista em Sua Vida Com"
        titleText="Seguro de Vida"
        descriptionText="Não importa como e para onde você viaja, nós te protegemos. Ainda Contamos Com + de 30 Coberturas."
      />
      <SimpleFormSection
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </section>
  );
}
