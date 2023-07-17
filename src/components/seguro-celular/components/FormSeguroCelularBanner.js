import React, { useState } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import imageManagerSeguroCelular from "../bancodeimagens/BancoDeImagensSeguroCelular";

export default function FormSeguroCelularBanner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
        chipText="Seu Aparelho Celular em Segurança Com"
        titleText="Seguro de Celular"
        descriptionText="Fique um passo a frente dos imprevistos e proteja se aparelho portátil."
      />
      <SimpleFormSection formData={formData} setFormData={setFormData} />
    </section>
  );
}
