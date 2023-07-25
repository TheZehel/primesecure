import React, { useState } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import imageManagerSeguroCelular from "../bancodeimagens/BancoDeImagensSeguroCelular";

export default function FormSeguroCelularBanner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    marcaCelular: "",
  });
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-2"
      style={{
        backgroundImage: `url(${imageManagerSeguroCelular.banners.BannerSeguroCelular})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BannerSection
        chipText="Proteja Seu SmartPhone com Nosso"
        titleText="Seguro de Celular Em Parceria Com:"
        descriptionText="Esteja sempre um passo à frente dos imprevistos e proteja seu aparelho portátil com nosso seguro de celular."
        imageUrl={imageManagerSeguroCelular.logos.LogoPorto}
      />
      <SimpleFormSection formData={formData} setFormData={setFormData} />
    </section>
  );
}
