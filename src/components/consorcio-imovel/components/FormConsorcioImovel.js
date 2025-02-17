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

  // Defina a função submit conforme sua lógica. Exemplo:
  const handleSubmit = (form) => {
    console.log("Dados enviados:", form);
    // Aqui você pode tratar os dados ou redirecionar o usuário
    window.location.href = "/cotacao-imovel";
  };

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
      <SimpleFormSection
        formData={formData}
        setFormData={setFormData}
        submit={handleSubmit}
        showToast={true}  // Ativa a exibição do toast se a validação falhar
      />
    </section>
  );
}
