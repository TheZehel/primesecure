import React, { useState } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import ImageManagerConsorcioImovel from "../imgs/imgs";

export default function FormConsorcioImovel() {
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
        backgroundImage: `url(${ImageManagerConsorcioImovel.banners.BannerConsorcioImovel})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BannerSection
        chipText="Realize o Sonho da Casa Própria Com"
        titleText="Consórcio de Imóveis"
        descriptionText="Diversas Opções de Crédito Para Você!"
        imageUrl={ImageManagerConsorcioImovel.Logos.logoPorto}
      />
      <SimpleFormSection formData={formData} setFormData={setFormData} />
    </section>
  );
}
