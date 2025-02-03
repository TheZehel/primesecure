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

  // Se necessário, defina a função submit. Exemplo:
  const handleSubmit = (form) => {
    // Aqui você pode tratar os dados ou redirecionar para outra página
    console.log("Dados enviados:", form);
    window.location.href = "/cotacao-celular";
  };

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
        descriptionText="Obtenha Agora Mesmo 20% de Desconto e proteja seu aparelho portátil com nosso Seguro de Celular."
        imageUrl={imageManagerSeguroCelular.logos.LogoPorto}
      />
      <SimpleFormSection
        formData={formData}
        setFormData={setFormData}
        submit={handleSubmit}
        showToast={true}  // Ativa a exibição do toast em caso de validação falha
      />
    </section>
  );
}
