import React, { useState } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function FormSeguroPetBanner({ callback }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  const getFormData = (data) => {
    delete data.utm_campaign;
    delete data.utm_medium;
    delete data.utm_source;

    callback(data);
  };

  console.log("Seguro Pet:", formData);

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-2"
      style={{
        backgroundImage: `url(${imageManagerSeguroPet.banners.BannerSeguroPet})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BannerSection
        chipText="Retribua o carinho do seu pet com:"
        titleText="Plano de Saúde Pet"
        descriptionText="Seu pet com assistência qualificada 24h por dia."
        imageUrl={imageManagerSeguroPet.logos.LogoPetLove}
      />
      <SimpleFormSection
        formData={formData}
        setFormData={setFormData}
        callback={getFormData}
        submit={getFormData}
      />
    </section>
  );
}
