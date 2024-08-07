import axios from "axios";
import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

const getUtmParams = () => {
  let params = {};
  let search = window.location.search.substring(1);

  if (search) {
    search.split("&").forEach((item) => {
      let data = item.split("=");
      params[data[0]] = decodeURIComponent(data[1]);
    });
  }

  return params;
};

export default function SimpleFormSectionPopup({ title, description, form }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  useEffect(() => {
    const utmParams = getUtmParams();

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, ...utmParams };
      //console.log('Updated Form Data:', updatedFormData);
      return updatedFormData;
    });
  }, []);

  const navigate = useNavigate();

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
      "/primetravel/": "lead-primetravel-api",
      "/seguro-de-vida/": "lead-seguro-de-vida-api",
      "/seguro-pet-porto/": "lead-seguro-pet-api",
      "/seguro-residencial-porto-2/": "lead-seguro-residencial-api",
      "/equipamentos-portateis-3/": "lead-seguro-celular-api",
      "/sulamerica-odonto/": "lead-sulamerica-odonto-api",
    };

    const pathname = window.location.pathname;

    return pathToIdentifierMap[pathname] || "lead-de-origem-nao-identificada";
  };

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
    handleBlur();
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
            cf_source: formData.utm_source,
            cf_medium: formData.utm_medium,
            cf_campaign: formData.utm_campaign,
          },
        },
      };

      axios
        .request(options)
        .then(async function (response) {
          // função marcada como assíncrona aqui
          //console.log(response.data);
          sessionStorage.setItem("formData", JSON.stringify(formData));

          try {
            // Aguarda emitDataLayerEvent antes de navegar
            await emitDataLayerEvent();
            //navigate("/obrigado");
            form(formData); //Envia dados para o elemento pai
          } catch (error) {
            console.error(error);
          }
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
  }, []);

  const [clicado, setClicado] = useState(false);

  function handleBlur() {
    setClicado(true);
  }

  return (
    <div className="animate__animated animate__zoomIn rounded-lg bg-white p-5 sm:px-10 sm:mx-20 xl:mx-32 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {title || "Faça Sua Cotação Gratuita"}
      </h2>
      <p className="mt-2 text-xs leading-6 text-gray-600 text-left sm:text-sm">
        {description ||
          "Inicie sua cotação online preenchendo o formulário abaixo."}
      </p>
      <form
        id="form1"
        className="sm:flex flex-col sm:flex-row justify-center items-center mx-auto gap-x-6 gap-y-4 mt-5 max-w-xl sm:mt-10"
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
      <div className="">
        <button
          type="submit"
          onClick={handleButtonClick}
          className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-full flex mt-8 justify-center items-center"
        >
          Cotar Agora
        </button>
      </div>
    </div>
  );
}
