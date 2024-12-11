import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { DatePicker, Space, ConfigProvider } from "antd";
import InputMask from "react-input-mask";
import Modal from "react-modal";
import imageManager from "../../bancoDeImagens";
import { Chip } from "@material-tailwind/react";
import ListaPaises from "./ListaPaises";
import DataValidation from "../../modules/dataValidation";
import moment from "moment";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


import imageManagerPrimeTravel from "../bancodeimagens/BancoDeImagensPrimeTravel";
import BannerPix from "./subcomponents/BannerPix";
import BannerParcelamento from "./subcomponents/BannerParcelamento";
import 'moment/locale/pt-br'; // Importar a localidade pt-br para moment

import locale from 'antd/lib/date-picker/locale/pt_BR';

moment.locale('pt-br'); // Configurar o moment para pt-br

const getUtmParams = () => {
  let params = {};
  let search = window.location.search.substring(1);

  if (search) {
    search.split("&").forEach((item) => {
      let data = item.split("=");
      params[data[0]] = decodeURIComponent(data[1]);
    });
  }
  // Retorna os parâmetros UTM da URL
  return params;
};

const reasonOptions = [
  { value: "lazer", label: "Lazer" },
  { value: "negocios", label: "Negócios" },
  { value: "estudo", label: "Estudo" },
  { value: "outros", label: "Outros" },
];

export default function FormTravelBanner2() {
  const [errorList, setErrorList] = useState([]);
  const customValidation = new DataValidation(); // Importa módulo de validação

  const navigate = useNavigate();

  const handleNavigateToPrivacyPolicy = () => {
    navigate("/politicas-de-privacidade");
  };

  function formatStringDate(dateString) {
    // Converte data 00/00/0000 para 00-00-0000
    let pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!pattern.test(dateString)) {
      return false;
    }

    let [, day, month, year] = pattern.exec(dateString);
    let newDate = `${year}-${month}-${day}`;

    return newDate;
  }

  const handleReasonChange = (selectedReason) => {
    setFormData({ ...formData, reason: selectedReason });
    if (errorList.includes("reason")) {
      const errors = errorList.filter((item) => item !== "reason");
      setErrorList(errors);
    }
  };

  async function submitFormToRD(payload, redirect, attempts = 0) {
    const MAX_ATTEMPTS = 3; // Número máximo de tentativas

    // Configuração do pedido para a RD Station
    const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;

    const rdOptions = {
      method: "POST",
      url: `https://api.rd.services/platform/conversions?api_key=${apiKey}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: payload,
      },
    };

    const currentPath = window.location.pathname;

    // Preparar dados para ManyChat
    const postDataManyChat = {
      first_name: formData.name.split(" ")[0],
      last_name: formData.name.split(" ").slice(1).join(" "),
      phone: formData.phone.replace(/\D/g, ""), // Remove caracteres não numéricos
      whatsapp_phone: formData.phone.replace(/\D/g, ""), // Assume o mesmo que phone
      email: formData.email,
      gender: "", // Assumindo a necessidade de incluir o campo gênero
      has_opt_in_sms: true,
      has_opt_in_email: true,
      consent_phrase: "Eu aceito os termos e condições.", // Exemplo de frase de consentimento
      current_url: currentPath,
    };

    // Salvar formData no sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(formData));

    try {
      const [rdResponse] = await Promise.all([axios.request(rdOptions)]);

      console.log("Resposta da RD Station:", rdResponse.data);

      // Salva na sessão antes do redirect
      sessionStorage.setItem("formData-travel", JSON.stringify(payload));

      // Envia Log de Sucesso do envio para a RD Station
      let logPayload = {
        tipo: "info",
        mensagem: {
          rdResponse: rdResponse.data,
          mensagem: payload,
        },
      };
      await axios
        .post(
          "https://primetravel.primesecure.com.br/logs/webapp",
          logPayload,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Log - OK");
        })
        .catch((e) => {
          console.error("Log - Error", e.response?.data);
        });

      // Envio para ManyChat
      await axios
        .post(
          "https://api.manychat.com/fb/subscriber/create", // Verifique a URL da API ManyChat
          postDataManyChat,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_MANYCHAT}`, // Se a ManyChat API Key for necessária
            },
          }
        )
        .then((response) => {
          console.log("ManyChat - OK:", response.data);
        })
        .catch((error) => {
          console.error(
            "ManyChat - Error:",
            error.response ? error.response.data : error.message
          );
        });

      // Redireciona para URL de cotação com parâmetros do formulário
      window.location.href = redirect;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        attempts < MAX_ATTEMPTS
      ) {
        const logMessage = {
          timestamp: new Date(),
          error:
            "Erro 400 ao enviar o lead para a RD Station. Tentando novamente...",
          rdStationError: error.response.data,
          data: payload,
        };
        console.error(logMessage);

        // Envia o erro para aplicação
        let errorPayload = { tipo: "error", mensagem: logMessage };
        await axios
          .post(
            "https://primetravel.primesecure.com.br/logs/webapp",
            errorPayload,
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => {
            console.log("Log - OK");
          })
          .catch((e) => {
            console.error("Log - Error", e.response?.data);
          });

        // Espera um tempo antes de tentar novamente
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Tenta novamente, incrementando o contador de tentativas
        return submitFormToRD(payload, redirect, attempts + 1);
      } else {
        console.error(error);
      }
    }
  }

  function convertToForm(payload, leadIdentifier) {
    // Cria o payload para ser enviado para RDStation
    let form = {
      conversion_identifier: leadIdentifier,
      cf_destinationcountry: payload.destiny.value,
      cf_destinationregion:
        customValidation.retornarDestino(payload.destiny.regiao) ||
        payload.destiny.value, //
      cf_departuredate: (payload.departure || "").toString(),
      cf_arrivaldate: (payload.arrival || "").toString(),
      cf_passengers_0_to_40: (payload.old0 || "0").toString(),
      cf_passengers_41_to_64: (payload.old1 || "0").toString(),
      cf_passengers_65_to_75: (payload.old2 || "0").toString(),
      cf_passengers_76_to_99: (payload.old3 || "0").toString(),
      cf_url_de_origem: window.location.href,
      cf_source: payload.utm_source,
      cf_medium: payload.utm_medium,
      cf_campaign: payload.utm_campaign,
      name: (payload.name || "").toString(),
      email: (payload.email || "").toString(),
      mobile_phone: (payload.phone || "").toString(),
      reason: payload.reason || "", // Adicionado campo 'reason'
    };

    // Deleta campos de idade que não têm passageiro
    if (form.cf_passengers_0_to_40 === "0") {
      delete form.cf_passengers_0_to_40;
    }
    if (form.cf_passengers_41_to_64 === "0") {
      delete form.cf_passengers_41_to_64;
    }
    if (form.cf_passengers_65_to_75 === "0") {
      delete form.cf_passengers_65_to_75;
    }
    if (form.cf_passengers_76_to_99 === "0") {
      delete form.cf_passengers_76_to_99;
    }

    // Retorna formulário configurado para o payload
    return form;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Recebe os parâmetros UTM da URL
    const utmParams = getUtmParams();

    // Coleta e formata os dados do formulário
    const payload = {
      destiny: formData.selectedOption || { value: "", label: "", regiao: 0 },
      destinyGroup: formData.selectedOption
        ? formData.selectedOption.regiao
        : "",
      departure: formData.departure,
      arrival: formData.arrival,
      ages:
        formData.olds.reduce((total, age) => total + age, 0).toString() +
        " Passageiro(s)",
      old0: formData.olds[0],
      old1: formData.olds[1],
      old2: formData.olds[2],
      old3: formData.olds[3],
      name: formData.name,
      email: formData.email,
      phone: formData.phone.replace(/\D/g, ""),
      reason: formData.reason ? formData.reason.value : "",
      ...utmParams,
    };

    // Valida os dados do formulário
    const errors = customValidation.validarTravelPayload(payload);
    if (errors.length > 0) {
      setErrorList(errors);
      return;
    }

    // Cria o objeto de dados para enviar para a RD Station e ManyChat
    const formRD = convertToForm(payload, "lead-primetravel-api");

    const postDataManyChat = {
      first_name: formData.name.split(" ")[0],
      last_name: formData.name.split(" ").slice(1).join(" "),
      phone: formData.phone.replace(/\D/g, ""),
      whatsapp_phone: formData.phone.replace(/\D/g, ""),
      email: formData.email,
      destiny: formData.selectedOption || { value: "", label: "", regiao: 0 },
      destinyGroup: formData.selectedOption
        ? formData.selectedOption.regiao
        : "",
      departure: formData.departure,
      arrival: formData.arrival,
      ages:
        formData.olds.reduce((total, age) => total + age, 0).toString() +
        " Passageiro(s)",
      old0: formData.olds[0],
      old1: formData.olds[1],
      old2: formData.olds[2],
      old3: formData.olds[3],
      reason: formData.reason ? formData.reason.value : "",
      gender: "",
      has_opt_in_sms: true,
      has_opt_in_email: true,
      consent_phrase: "Eu aceito os termos e condições.",
      current_url: window.location.pathname,
    };

    // Tentativa de envio de dados para ManyChat
    axios
      .post(
        `${process.env.REACT_APP_URL_CREATE_SUBSCRIBER_MANYCHAT}/manychat/subscriber/create`,
        postDataManyChat,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.error("Erro ao enviar dados para ManyChat:", error);
      });

    try {
      // Envia os dados para a RD Station
      await axios.post(
        `https://api.rd.services/platform/conversions?api_key=${process.env.REACT_APP_API_KEY_RD_STATION}`,
        formRD,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Prepara o redirecionamento
      let redirectUrl = "https://primetravel.primesecure.com.br/cotacao-rapida?";
      Object.entries(payload).forEach(([key, value], index, array) => {
        if (
          value &&
          !["cf_source", "cf_medium", "cf_campaign"].includes(key)
        ) {
          redirectUrl += `${key}=${encodeURIComponent(value)}${
            index < array.length - 1 ? "&" : ""
          }`;
        }
      });

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Erro ao enviar dados para RD Station:", error);
      // Trata os erros de RD Station aqui se necessário, mas continua o processo de redirecionamento
      let redirectUrl = "https://primetravel.primesecure.com.br/cotacao-rapida?";
      Object.entries(payload).forEach(([key, value], index, array) => {
        if (
          value &&
          !["cf_source", "cf_medium", "cf_campaign"].includes(key)
        ) {
          redirectUrl += `${key}=${encodeURIComponent(value)}${
            index < array.length - 1 ? "&" : ""
          }`;
        }
      });

      window.location.href = redirectUrl;
    }
  };

  const onChangeDeparture = (date, dateString) => {
    // Manipula a input de "Data de Ida"
    if (errorList.includes("departure")) {
      // Retorna e atualiza array de erros no formulário
      let errors = errorList.filter((item) => item !== "departure");
      setErrorList(errors);
    }
    setFormData({ ...formData, departure: dateString });
  };

  const onChangeArrival = (date, dateString) => {
    // Manipula a input de "Data de Volta"
    if (errorList.includes("arrival")) {
      // Retorna e atualiza array de erros no formulário
      let errors = errorList.filter((item) => item !== "arrival");
      setErrorList(errors);
    }
    setFormData({ ...formData, arrival: dateString });
  };

  const disabledDepartureDate = (current) => {
    let limitAfter = formData.arrival;
    // Gera TimeStamp da "Data de Volta" para interagir com DatePicker
    limitAfter = moment(limitAfter, "DD/MM/YYYY");
    return (
      // Bloqueia datas após a data da input "Data de Ida"
      (current && current.isAfter(limitAfter, "day")) ||
      // Bloqueia datas anteriores a hoje na input "Data de Ida"
      current < moment().startOf("day")
    );
  };

  const disabledArrivalDate = (current) => {
    let limitBefore = formData.departure;
    // Gera TimeStamp da "Data de Ida" para interagir com DatePicker
    limitBefore = moment(limitBefore, "DD/MM/YYYY");
    return (
      // Bloqueia datas anteriores a "Data de Ida"
      (current && current < moment(limitBefore, "DD/MM/YYYY").startOf("day")) ||
      // Bloqueia datas anteriores a hoje na input "Data de Volta"
      current < moment().startOf("day")
    );
  };

  const selectHandler = (selectedOption) => {
    // Administra o select de Destino
    setFormData({ ...formData, selectedOption });
    if (errorList.includes("destinyGroup")) {
      // Retorna e atualiza array de erros no formulário
      let errors = errorList.filter((item) => item !== "destinyGroup");
      setErrorList(errors);
    }
  };

  const [modalOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleOld = (index, value) => {
    // Administra o número de passageiros por idade
    if (errorList.includes("ages")) {
      let errors = errorList.filter((item) => item !== "ages");
      setErrorList(errors);
    }

    let ages = 0;
    let formOlds = [...formData.olds];

    for (let i = 0; i < formOlds.length; i++) {
      ages += formOlds[i];
    }
    if ((value > 0 && ages < 10) || (value < 0 && formOlds[index] > 0)) {
      // Impede que tenham mais de 10 passageiros e que o número de passageiros fique negativo
      formOlds[index] = formOlds[index] + value;
      setFormData({ ...formData, olds: formOlds });
    }
  };

  const inputHandler = (event) => {
    // Manipula o valor das inputs simples de texto
    let id = event.target.id; // Encontra o id da input
    let value = event.target.value; // Encontra o value da input

    if (errorList.includes(id)) {
      let errors = errorList.filter((item) => item !== id);
      setErrorList(errors);
    }

    if (id === "name") {
      setFormData({ ...formData, name: value });
    }
    if (id === "email") {
      setFormData({ ...formData, email: value });
    }
    if (id === "phone") {
      setFormData({ ...formData, phone: value });
    }
  };

  const [formData, setFormData] = useState({
    selectedOption: null,
    departure: null,
    arrival: null,
    olds: [0, 0, 0, 0],
    ages: 0,
    name: "",
    email: "",
    phone: "",
    reason: null,
  });

  useEffect(() => {
    const storedFormData = sessionStorage.getItem("formData-travel");
    if (storedFormData) {
      let storageData = JSON.parse(storedFormData);
      if (!Array.isArray(storageData.olds)) {
        storageData.olds = [0, 0, 0, 0];
      }
      setFormData({
        ...storageData,
        departure: null, // Deleta os dados de data anteriores por darem conflito com o DatePicker
        arrival: null,
      });
    }
    // Deleta sessionStorage ao carregar para o form
    sessionStorage.removeItem("formData-travel");
  }, []);

  return (
    <ConfigProvider locale={locale}>
    <section
      className="p-5"
      id="banner-travel"
      style={{
        backgroundImage: `url(${imageManager.banners.bannerPrimeTravel})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto pt-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="animate__animated animate__fadeIn">
            <BannerPix />
            <Chip
              value="Sua Viagem Mais Segura Com"
              className="bg-bluePrime text-lg"
            />
            <h1 className="text-4xl font-bold mb-4 text-white">
              Prime Travel{" "}
            </h1>
            <p className="text-white text-2xl font-semibold">
              Não importa como e para onde você viaja, nós te protegemos. Ainda
              Contamos Com + de 30 Coberturas.
            </p>
            <img
              src={imageManagerPrimeTravel.ImagensLandPage.ImgEmParceriaGenerali}
              alt="Proteção Covid, Preços Imbatíveis, 30 Serviços e coberturas, Totalmente Digital"
              className="m-auto w-80 justify-center items-center pt-5"
            />
            <BannerParcelamento />
          </div>
          <div className="animate__animated animate__zoomIn rounded-lg bg-white p-5 sm:p-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Faça Sua Cotação Gratuita
            </h2>
            <p className="mt-2 text-[14px] leading-8 text-gray-600">
              Inicie sua cotação online preenchendo o formulário abaixo.
            </p>
            <form
              action=""
              className="flex flex-wrap flex-col sm:flex-row justify-center items-start mx-auto gap-x-6 gap-y-4 mt-10 max-w-xl sm:mt-10"
              onSubmit={handleSubmit}
            >
              {/* Seção de Destino e Datas */}
              <div className="w-full gap-x-8 gap-y-6 grid grid-cols-1">
                <div>
                  
                  <div className="mt-2.5">
                    <Select
                      id="destinyGroup"
                      value={formData.selectedOption}
                      onChange={selectHandler}
                      options={ListaPaises}
                      isSearchable
                      placeholder="Selecione o Destino..."
                      className="cursor-pointer text-lg w-full text-[#313131] placeholder:text-[#313131]"
                    />
                  </div>
                </div>
                {/* Nova Seção para Motivo da Viagem */}
              <div className="w-full mt-5 sm:mt-0">
                <div className="mt-2.5">
                  <Select
                    id="reason"
                    value={formData.reason}
                    onChange={handleReasonChange}
                    options={reasonOptions}
                    isSearchable
                    placeholder="Selecione o motivo da viagem..."
                    className="cursor-pointer text-lg w-full text-[#313131] placeholder:text-[#313131]"
                  />
                </div>
              </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    
                    <div className="mt-2.5">
                      <Space direction="vertical">
                        <DatePicker
                        locale={locale}
                          id="departure"
                          selected={
                            formData.departure
                              ? moment(formData.departure, "DD/MM/YYYY")
                              : null
                          }
                          onChange={onChangeDeparture}
                          placeholderText="Data de ida"
                          disabledDate={disabledDepartureDate}
                          dateFormat="dd/MM/yyyy"
                          className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 text-[#313131] placeholder:text-[#313131]"
                        />
                      </Space>
                    </div>
                  </div>
                  <div className="w-full">
                    
                    <div className="mt-2.5">
                      <Space direction="vertical">
                        <DatePicker
                          id="arrival"
                          locale={locale}
                          selected={
                            formData.arrival
                              ? moment(formData.arrival, "DD/MM/YYYY")
                              : null
                          }
                          onChange={onChangeArrival}
                          placeholderText="Volta"
                          disabledDate={disabledArrivalDate}
                          dateFormat="dd/MM/yyyy"
                          className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 text-[#313131] placeholder:text-[#313131]"
                        />
                      </Space>
                    </div>
                  </div>
                </div>
                {/* Passageiros */}
                <div>
                  
                  <input
                    type="text"
                    className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-[#313131] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 cursor-pointer"
                    id="ages"
                    name="ages"
                    value={
                      formData.olds.reduce((total, age) => total + age, 0) > 0
                        ? `${
                            Array.isArray(formData.olds)
                              ? formData.olds.reduce(
                                  (total, age) => total + age,
                                  0
                                )
                              : 0
                          } Passageiros`
                        : "Selecione os Passageiros"
                    }
                    onClick={openModal}
                    readOnly
                    required
                  />

                  <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="fixed inset-0 flex items-center justify-center p-6 bg-gray-800 bg-opacity-50"
                    ariaHideApp={false} // Adicionado para evitar warnings durante o desenvolvimento
                  >
                    <div className="animate__animated animate__fadeIn bg-white rounded-lg shadow px-5 py-4 mx-auto w-96 h-96 border border-gray-300">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl">Idade do(s) passageiro(s)</h2>
                        <button onClick={closeModal} className="bg-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <hr className="mb-4" />
                      {/* Repetir para cada grupo de idade */}
                      {["0 a 40 anos", "41 a 64 anos", "65 a 75 anos", "76 a 99 anos"].map(
                        (group, index) => (
                          <div
                            className="flex items-center justify-between mb-2"
                            key={index}
                          >
                            <h3 className="text-xl">{group}</h3>
                            <div className="flex items-center justify-around w-32">
                              <button
                                onClick={() => handleOld(index, -1)}
                                className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                value={formData.olds[index]}
                                readOnly
                                className="text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                              />
                              <button
                                onClick={() => handleOld(index, 1)}
                                className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )
                      )}
                      <button
                        onClick={closeModal}
                        className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-1/2 mx-auto block"
                      >
                        Aplicar
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>

              {/* Seção de Dados do Usuário */}
              <div className="w-full gap-x-8 gap-y-6 grid grid-cols-1 mt-5 sm:m-0">
                <div>
                  
                  <div className="mt-2.5">
                    <input
                      onChange={inputHandler}
                      value={formData.name}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nome completo"
                      autoComplete="family-name"
                      className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-[#313131] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6"
                    />
                  </div>
                </div>
                <div>
                  
                  <div className="mt-2.5">
                    <input
                      onChange={inputHandler}
                      value={formData.email}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      placeholder="Seu email"
                      className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-[#313131] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6"
                    />
                  </div>
                </div>
                <div>
                  
                  <div className="mt-2.5">
                    <InputMask
                      mask="(99) 99999-9999"
                      maskChar={null}
                      maxLength="16"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Seu telefone"
                      className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-[#313131] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6"
                      onChange={inputHandler}
                      value={formData.phone}
                    />
                  </div>
                </div>
              </div>

              
            </form>
            <button
              type="submit"
              className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-full flex mt-3 justify-center items-center"
              onClick={(e) => {
                handleSubmit(e);
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: "lead-primetravel" });
              }}
            >
              Cotar Agora
            </button>
            <div className="sm:w-4/4 flex mt-5 text-start">
              <Typography className="">
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
        </div>
      </div>
    </section>
    </ConfigProvider>
  );
}
