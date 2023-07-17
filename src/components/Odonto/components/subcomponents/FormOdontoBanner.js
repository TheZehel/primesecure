import React, { useState } from "react";
import BannerSection from "../../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../../globalsubcomponentes/SimpleFormSection";
import imageManagerOdonto from "../../bancodeimagens/BancoDeImagensOdonto";

export default function FormOdontoBanner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-2"
      style={{
        backgroundImage: `url(${imageManagerOdonto.banners.BannerOdonto})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BannerSection
        chipText="Seu Sorriso Mais Saudável Com"
        titleText="Plano Odonto"
        descriptionText="A garantia de um sorrio mais feliz e saudável!"
      />
      <SimpleFormSection formData={formData} setFormData={setFormData} />
    </section>
  );
}
