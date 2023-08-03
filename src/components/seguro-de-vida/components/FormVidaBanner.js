import React, { useState } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import imageManagerVida from "../bancodeimagens/BancoDeImagensVida";

export default function FormBannerVida() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
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
        descriptionText="Não existe investimento melhor do que uma vida Segura e com Coberturas Exclusivas"
        imageUrl={imageManagerVida.logos.LogoSulamerica}
      />
      <SimpleFormSection formData={formData} setFormData={setFormData} />
    </section>
  );
}
