import axios from "axios";
import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { Checkbox, Typography } from "@material-tailwind/react";
import LoadingAnimation from "./icons/loadingSvg";

const getUtmParams = () => {
  let params = {};
  let search = window.location.search.substring(1);

  //console.log("URL:", window.location.href); // Add this line
  //console.log("Search:", search); // Add this line

  if (search) {
    search.split("&").forEach((item) => {
      let data = item.split("=");
      params[data[0]] = decodeURIComponent(data[1]);
    });
  }

  //console.log("UTM Params:", params); // Add this line

  return params;
};

export default function SimpleFormSection({
  title,
  description,
  price,
  image,
  submit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    marcaCelular: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const utmParams = getUtmParams();
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, ...utmParams };
      //console.log('Updated Form Data:', updatedFormData);
      return updatedFormData;
    });
  }, []);

  const navigate = useNavigate();

  const handleNavigateToPrivacyPolicy = () => {
    navigate("/politicas-de-privacidade");
  };

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
    if (
      window.location.pathname === "/equipamentos-portateis-3" ||
      window.location.pathname === "/equipamentos-portateis-3/"
    ) {
      console.log(validateForm);
      return (
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.marcaCelular
      );
    } else {
      return formData.name && formData.email && formData.phone;
    }
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
      "/seguro-bike": "lead-seguro-bike-api",
      "/seguro-bike/": "lead-seguro-bike-api",
      "/seguro-celular-kakau": "seguro-celular-kakau-api",
      "/seguro-celular-kakau/": "seguro-celular-kakau-api",
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
    "/seguro-bike": "lead-seguro-bike-kakau",
    "/seguro-bike/": "lead-seguro-bike-kakau",
    "/seguro-celular-kakau": "seguro-celular-kakau",
    "/seguro-celular-kakau/": "seguro-celular-kakau",
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
      setIsLoading(true);
      const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;
      const optionsRD = {
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
            cf_marcacelular: formData.marcaCelular,
            cf_source: formData.utm_source,
            cf_medium: formData.utm_medium,
            cf_campaign: formData.utm_campaign,
          },
        },
      };

      const currentPath = window.location.pathname;

      console.log("caminho atual: ", currentPath);

      const postDataManyChat = {
        first_name: formData.name.split(" ")[0],
        last_name: formData.name.split(" ").slice(1).join(" "),
        phone: formData.phone.replace(/\D/g, ""),
        whatsapp_phone: formData.phone.replace(/\D/g, ""),
        email: formData.email,
        gender: "",
        has_opt_in_sms: true,
        has_opt_in_email: true,
        consent_phrase: "Eu aceito os termos e condições.",
        current_url: currentPath,
      };

      sessionStorage.setItem("formData", JSON.stringify(formData));

      try {
        const responseRD = await axios.request(optionsRD);
        console.log("RD Station Response:", responseRD);

        await emitDataLayerEvent();

        const urlsManyChat = [
          "/seguro-bike",
          "/seguro-bike/",
          "/primetravel",
          "/primetravel/",
        ];

        if (urlsManyChat.includes(currentPath)) {
          try {
            const responseManyChat = await axios.post(
              `${process.env.REACT_APP_URL_CREATE_SUBSCRIBER_MANYCHAT}/manychat/subscriber/create`,
              postDataManyChat,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("ManyChat Response:", responseManyChat);
          } catch (manyChatError) {
            console.error(
              "ManyChat Error:",
              manyChatError.response
                ? manyChatError.response.data
                : manyChatError.message
            );
          }
        }

        navigateBasedOnPath();
      } catch (error) {
        console.error("Error in RD Station or Data Layer event:", error);
        navigateBasedOnPath();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const navigateBasedOnPath = () => {
    if (window.location.pathname.includes("/seguro-residencial-porto-2")) {
      window.location.href = "https://residencial.primesecure.com.br/";
    } else if (
      window.location.pathname.includes("seguro-pet-porto") ||
      window.location.pathname.includes("seguro-bike") ||
      window.location.pathname.includes("seguro-celular-kakau") ||
      window.location.pathname.includes("seguro-de-vida")
    ) {
      submit(formData);
    } else {
      navigate("/obrigado");
    }
  };

  const [clicado, setClicado] = useState(false);

  function handleBlur() {
    setClicado(true);
  }

  return (
    <div className="animate__animated animate__zoomIn rounded-lg bg-white p-5 sm:px-10 sm:mx-20 xl:mx-32">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Faça Sua Cotação Gratuita
      </h2>
      <p className="mt-2 text-sm leading-6 text-gray-600">
        Inicie sua cotação online preenchendo o formulário abaixo.
      </p>
      <form
        id="form1"
        className="sm:flex flex-col sm:flex-row justify-center items-center mx-auto gap-x-6 gap-y-4 mt-10 max-w-xl sm:mt-10 xl:mx-20"
      >
        <div className="w-full gap-x-4 gap-y-4 grid grid-cols-1 mt-5 sm:m-0">
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
                maxLength="16"
                type="text"
                name="phone"
                id="phone"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            {(window.location.pathname === "/equipamentos-portateis-3" ||
              window.location.pathname === "/equipamentos-portateis-3/") && (
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Qual a Marca do Aparelho?
                </label>
                {clicado && !formData.marcaCelular ? (
                  <div className="text-red-500">Campo Obrigatório</div>
                ) : null}
                <select
                  required
                  name="marcaCelular"
                  id="marcaCelular"
                  value={formData.marcaCelular}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                >
                  <option value="">Escolha uma Opção:</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Motorola">Motorola</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Outras Marcas">Outras Marcas</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </form>
      <div className="xl:mx-20">
        <button
          type="submit"
          onClick={handleButtonClick}
          className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-full flex mt-3 justify-center items-center max-h-10"
        >
          {isLoading ? <LoadingAnimation /> : "Cotar Agora"}
        </button>
      </div>
      <div className="sm:w-4/4 flex mt-5 text-start">
        <Typography>
          Ao preencher aceito os
          <button
            onClick={handleNavigateToPrivacyPolicy}
            className="font-medium transition-colors hover:text-bluePrime2"
          >
            &nbsp;Termos & Condições
          </button>
        </Typography>
      </div>
    </div>
  );
}
