import React, { useState } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import ImageManagerConsorcioAuto from "../imgs/imgs";

export default function FormConsorcioAuto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    credito: "",
  });

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-2"
      style={{
        backgroundImage: `url(${ImageManagerConsorcioAuto.banners.BannerConsorcioAuto})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BannerSection
        chipText="Compre seu primeiro carro com o consórcio Porto Bank"
        titleText="Consórcio Auto"
        descriptionText="Diversas Opções de Crédito Para Você!"
        imageUrl={ImageManagerConsorcioAuto.Logos.logoPorto}
      />
      <SimpleFormSection formData={formData} setFormData={setFormData} />
    </section>
  );
}
