import React, { useState } from "react";
import imageManagerSeguroCelularKakau from "../banco-de-imagens/BancoDeImagensSeguroCelularKakau";
import BannerSection from "../../globalsubcomponentes/BannerSection";
import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify"; // importe o ToastContainer e o toast
import "react-toastify/dist/ReactToastify.css"; // importe os estilos do toast

export default function FormSeguroCelularKakau({ callback }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  const getFormData = (data) => {
    delete data.utm_campaign;
    delete data.utm_medium;
    delete data.utm_source;

    callback(data);
  };

  const handleSubmit = (data) => {
    // Aqui você pode processar os dados do formulário antes do redirecionamento
    console.log(data); // Exemplo de processamento
    // Supondo que 'data' seja o estado atualizado do formulário
    setFormData(data);

    // Redirecionar para a página de cotação
    navigate("/seguro-celular-kakau/cotacao");
  };

  console.log("Seguro Celular kakau:", formData);

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-2"
      style={{
        backgroundImage: `url(${imageManagerSeguroCelularKakau.banners.BannerSeguroCelularKakau})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BannerSection
        chipText="SEGURO CELULAR
        "
        titleText="Seguro Celular Kakau"
        descriptionText="Proteção para o seu celular com cobertura completa."
      />
      <SimpleFormSection
        formData={formData}
        setFormData={setFormData}
        callback={handleSubmit}
        submit={handleSubmit}
      />
      <ToastContainer />
    </section>
  );
}
