import React, { useState } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function FormSeguroPetBanner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

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
        chipText="Retribua o carinho que seu pet tem por você!"
        titleText="Plano de Saúde Pet"
        descriptionText="Não importa como e para onde você viaja, nós te protegemos. Ainda Contamos Com + de 30 Coberturas."
      />
      <SimpleFormSection formData={formData} setFormData={setFormData} />
    </section>
  );
}
