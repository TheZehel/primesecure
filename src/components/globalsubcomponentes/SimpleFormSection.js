import axios from "axios";
import { useState, createRef, useEffect } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

export default function SimpleFormSection({
  title,
  description,
  price,
  image,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const formRef = createRef();

  const handleInputChange = (event) => {
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    // Check if this is the InputMask field
    if (name === "phone" && event.target.value instanceof Array) {
      value = event.target.value[0];
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    return formData.name && formData.email && formData.phone;
  };

  const getConversionIdentifier = () => {
    const pathToIdentifierMap = {
      "/primetravel": "lead-primetravel-api",
      "/seguro-de-vida": "lead-seguro-de-vida-api",
      "/seguro-pet-porto": "lead-seguro-pet-api",
      "/seguro-residencial-porto-2": "lead-seguro-residencial-api",
      "/equipamentos-portateis-3": "lead-seguro-celular-api",
      "/sulamerica-odonto": "lead-sulamerica-odonto-api",
<<<<<<< Updated upstream
=======
      "/primetravel/": "lead-primetravel-api",
      "/seguro-de-vida/": "lead-seguro-de-vida-api",
      "/seguro-pet-porto/": "lead-seguro-pet-api",
      "/seguro-residencial-porto-2/": "lead-seguro-residencial-api",
      "/equipamentos-portateis-3/": "lead-seguro-celular-api",
      "/sulamerica-odonto/": "lead-sulamerica-odonto-api",
>>>>>>> Stashed changes
    };

    const pathname = window.location.pathname;

    return pathToIdentifierMap[pathname] || "lead-de-origem-nao-identificada";
  };

<<<<<<< Updated upstream
  const handleButtonClick = () => {
    if (validateForm()) {
      const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;
      const options = {
        method: "POST",
        url: `https://api.rd.services/platform/conversions?api_key=${apiKey}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          event_type: "CONVERSION",
          event_family: "CDP",
          payload: {
            conversion_identifier: getConversionIdentifier(),
            email: formData.email,
            name: formData.name,
            mobile_phone: formData.phone,
          },
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          sessionStorage.setItem("formData", JSON.stringify(formData));
          navigate("/obrigado");
=======
  const urlToEventMap = {
    "/primetravel/": "lead-primetravel",
    "/seguro-de-vida/": "lead-seguro-de-vida",
    "/seguro-pet-porto/": "lead-seguro-pet",
    "/seguro-residencial-porto-2/": "lead-seguro-residencial",
    "/equipamentos-portateis-3/": "lead-seguro-celular",
    "/sulamerica-odonto/": "lead-sulamerica-odonto",
    "/primetravel": "lead-primetravel",
    "/seguro-de-vida": "lead-seguro-de-vida",
    "/seguro-pet-porto": "lead-seguro-pet",
    "/seguro-residencial-porto-2": "lead-seguro-residencial",
    "/equipamentos-portateis-3": "lead-seguro-celular",
    "/sulamerica-odonto": "lead-sulamerica-odonto",
  };

  const emitDataLayerEvent = () => {
    return new Promise((resolve, reject) => {
      const path = window.location.pathname;
      const eventIdentifier = urlToEventMap[path];

      if (!eventIdentifier) {
        reject(`Nenhum evento foi encontrado para essa URL: ${path}`);
        return;
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventIdentifier,
      });

      resolve();
    });
  };

  const handleButtonClick = async () => {
    if (validateForm()) {
      const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;
      const options = {
        method: "POST",
        url: `https://api.rd.services/platform/conversions?api_key=${apiKey}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          event_type: "CONVERSION",
          event_family: "CDP",
          payload: {
            conversion_identifier: getConversionIdentifier(),
            email: formData.email,
            name: formData.name,
            mobile_phone: formData.phone,
          },
        },
      };

      axios
        .request(options)
        .then(async function (response) {
          // função marcada como assíncrona aqui
          console.log(response.data);
          sessionStorage.setItem("formData", JSON.stringify(formData));

          try {
            // Aguarda emitDataLayerEvent antes de navegar
            await emitDataLayerEvent();
            navigate("/obrigado");
          } catch (error) {
            console.error(error);
          }
>>>>>>> Stashed changes
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    // Recuperar os dados do sessionStorage ao carregar a página
    const storedFormData = sessionStorage.getItem("formData");

    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }

    // Adicionar o script à página
    const script = document.createElement("script");
    script.src =
      "https://d335luupugsy2.cloudfront.net/js/loader-scripts/21470fa9-a2c0-43a4-951c-d2956a0806cd-loader.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Remover o script da página quando o componente for desmontado
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="animate__animated animate__zoomIn rounded-lg bg-white p-5 sm:px-10 sm:mx-20 xl:mx-32">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Faça Sua Cotação Gratuita
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-600">
        Inicie sua cotação online preenchendo o formulário abaixo.
      </p>
      <form
        id="form1"
        className="sm:flex flex-col sm:flex-row justify-center items-center mx-auto gap-x-6 gap-y-4 mt-10 max-w-xl sm:mt-10 xl:mx-20"
      >
        <div className="w-full gap-x-8 gap-y-6 grid grid-cols-1 mt-5 sm:m-0">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nome Completo
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              E-mail
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email-address"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Telefone
            </label>
            <div className="mt-2.5">
              <InputMask
                mask="(99) 9.9999-9999"
                maskChar={null}
                name="phone"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="xl:mx-20">
        <button
          type="submit"
          onClick={handleButtonClick}
          className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-full flex mt-3 justify-center items-center"
        >
          Cotar Agora
        </button>
      </div>
    </div>
  );
}
