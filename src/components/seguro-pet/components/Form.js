import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Form() {
  const location = useLocation();

  useEffect(() => {
    const scriptId = "rdstation-script";
    let script = document.getElementById(scriptId);

    if (!script) {
      // Carregar o script do RDStation de forma dinâmica
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
      document.body.appendChild(script);
    }

    script.onload = () => {
      // Criar o formulário somente depois que o script do RDStation for carregado
      new window.RDStationForms(
        "formulario-seguro-pet-lp-2-2022-47ba6850b3bb2d6bba5e",
        "UA-172743567-1"
      ).createForm();
    };
  }, [location.pathname]); // Adicione location.pathname no array de dependências

  return (
    <div className="animate__animated animate__zoomIn rounded-lg bg-white p-5 sm:px-10 sm:mx-20 xl:mx-32">
      <div
        role="main"
        id="formulario-seguro-pet-lp-2-2022-47ba6850b3bb2d6bba5e"
      ></div>
    </div>
  );
}
