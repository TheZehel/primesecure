import React, { useState } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import imageManagerSeguroResidencial from "../bancodeimagens/BancoDeImagensResidencial";
//import Form from "./Form";

export default function FormSeguroResidencialBanner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-2"
      style={{
        backgroundImage: `url(${imageManagerSeguroResidencial.banners.BannerSeguroResidencial})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BannerSection
        chipText="Sua Casa Mais Segura Com"
        titleText="Seguro Residencial"
        descriptionText="O Seguro Residencial Perfeito Para a Sua Moradia."
        imageUrl={imageManagerSeguroResidencial.logos.LogoPorto}
      />
      {/*<Form />*/}
      <SimpleFormSection formData={formData} setFormData={setFormData} />
    </section>
  );
}
