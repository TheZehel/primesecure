import React, { useState, useEffect } from "react";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import imageManagerVida from "../bancodeimagens/BancoDeImagensVida";

export default function FormBannerVida() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (form) => {
    console.log("Submit Form:", form);
    var { email, name, phone } = form;

    phone = phone.replace(".", "");

    var storage = localStorage.getItem("formData");

    try {
      storage = JSON.parse(storage) || {};
    } catch (e) {
      storage = {};
    }

    storage = { ...storage, name, email, phone };

    localStorage.setItem("formData", JSON.stringify(storage));

    window.location.href = "/cotacao-vida-sulamerica";
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
        chipText="Invista Em Sua Vida Com:"
        titleText="Prime Vida Fit"
        descriptionText="Não existe investimento melhor do que uma vida Segura e com Coberturas Exclusivas"
        imageUrl={imageManagerVida.logos.LogoSulamerica}
      />
      <SimpleFormSection
        formData={formData}
        setFormData={setFormData}
        submit={handleSubmit}
      />
    </section>
  );
}
