import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { DatePicker, Space } from "antd";
import InputMask from "react-input-mask";
import Modal from "react-modal";
import imageManager from "../../bancoDeImagens";
import { Chip } from "@material-tailwind/react";
import ListaPaises from "./ListaPaises";
import DataValidation from "../../modules/dataValidation";
import moment from "moment";
import { Checkbox, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import imageManagerPrimeTravel from "../bancodeimagens/BancoDeImagensPrimeTravel";
import BannerPix from "./subcomponents/BannerPix";
import BannerParcelamento from "./subcomponents/BannerParcelamento";

const getUtmParams = () => {
  let params = {};
  let search = window.location.search.substring(1);

  if (search) {
    search.split("&").forEach((item) => {
      let data = item.split("=");
      params[data[0]] = decodeURIComponent(data[1]);
    });
  }
  //Retorna os parametros UTM da URL
  return params;
};

export default function FormTravelBanner() {
  const [errorList, setErrorList] = useState([]);
  const customValidation = new DataValidation(); //Importa modulo de validação

  const navigate = useNavigate();

  const handleNavigateToPrivacyPolicy = () => {
    navigate("/politicas-de-privacidade");
  };

  function formatStringDate(dateString) {
    //Converte data 00/00/0000 para 00-00-0000
    let pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!pattern.test(dateString)) {
      return false;
    }

    let [, day, month, year] = pattern.exec(dateString);
    let newDate = `${year}-${month}-${day}`;

    return newDate;
  }

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

    /*// Configuração do pedido para a Prime Secure (preencha os cabeçalhos e dados conforme necessário)
    const authorization = process.env.REACT_APP_AUTHORIZATION_ARGUS;
    //const endpointArgus = process.env.REACT_APP_ENDPOINT_ARGUS;
    //const cleanedPhone = payload.phone ? payload.phone.replace(/\D/g, "") : "";
    const argusOptions = {
      method: "POST",
      url: "https://api.primesecure.com.br/apiargus/primetravel/novo",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: formData.name,
        email: formData.email,
        telefone1: formData.phone,
        detalhes: `0 a 40: ${formData.olds[0]} | 41 a 64: ${formData.olds[1]} | 65 a 75: ${formData.olds[2]} | 76 a 99: ${formData.olds[3]} | Data de Ida: ${formData.departure} | Data de Volta: ${formData.arrival}`,
        origem: "lead-primetravel-api",
        fornecedor: "MKT PRIME",
      },
    };*/

    try {
      const [rdResponse /*argusResponse*/] = await Promise.all([
        axios.request(rdOptions),
        //axios.request(argusOptions),
      ]);

      console.log("Resposta da RD Station:", rdResponse.data);

      //console.log("Resposta da Prime Secure:", argusResponse.data);

      // Salva na sessão antes do redirect
      sessionStorage.setItem("formData-travel", JSON.stringify(payload));

      //Envia Log de Sucesso do envio para a RD Station
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
          console.error("Log - Error", e.response.data);
        });

      // Redireciona para URL de cotação com parametros do formulário
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

        //Envia o erro para aplicação
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
            console.error("Log - Error", e.response.data);
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
    //Cria o payload para ser enviado para RDStation
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
    };

    //Deleta campos de idade que não tem passageiro
    if (form.cf_passengers_0_to_40 == 0) {
      delete form.cf_passengers_0_to_40;
    }
    if (form.cf_passengers_41_to_64 == 0) {
      delete form.cf_passengers_41_to_64;
    }
    if (form.cf_passengers_65_to_75 == 0) {
      delete form.cf_passengers_65_to_75;
    }
    if (form.cf_passengers_76_to_99 == 0) {
      delete form.cf_passengers_76_to_99;
    }

    //Retorna formulario configurado para o payload
    return form;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //Formata variavel de destino caso ela seja null
    let destiny = formData.selectedOption || {
      value: "",
      label: "",
      regiao: 0,
    };

    //Soma total de passageiros
    let totalPassengers = 0;
    formData.olds.map((qtd, i) => {
      totalPassengers += qtd;
    });
    totalPassengers = `${totalPassengers} Passageiro(s)`;

    //Recebe os parametros UTM da URL
    let utmParams = getUtmParams();

    //Começa a formatar o payload para a RDStation e para criar URL com parametros para o cotador
    let payload = {
      destiny: destiny, //Objeto do select de Destino
      destinyGroup: destiny.regiao, //String com região de destino
      departure: formData.departure,
      arrival: formData.arrival,
      ages: totalPassengers,
      old0: formData.olds[0] || 0,
      old1: formData.olds[1] || 0,
      old2: formData.olds[2] || 0,
      old3: formData.olds[3] || 0,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ...utmParams,
    };

    //Valida payload pelo modulo importado
    let errors = customValidation.validarTravelPayload(payload);

    //Impede redirect caso haja erros que causem problemas na URL
    if (errors.length > 0) {
      setErrorList(errors);
      return;
    }

    //Cria form da RD
    let form = convertToForm(payload, "lead-primetravel-api");

    //Deleta objeto que retorna do select de destino
    delete payload.destiny;

    //Começo da URL de cotação
    let fullUrl = "https://primetravel.primesecure.com.br/cotacao-rapida?";

    //Forma URL de cotação com os parametros do payload
    for (let key in payload) {
      //Pula UTM parametros
      if (key === "cf_source" || key === "cf_medium" || key === "cf_campaign") {
        //continue;
      }
      let value = payload[key] || "";
      //Formata data para 00-00-0000
      if (key === "departure" || key === "arrival") {
        value = formatStringDate(value);
      }
      //URI encode do componente
      value = encodeURIComponent(value);
      let urlEncode = `${key}=${value}`;
      //Soma o campo a URL do cotador
      fullUrl += urlEncode;
      //Telefone como último parametro, senão adiciona o &
      //if (key !== "phone") {
      fullUrl += "&";
      //}
    }

    //Envia o form e a URL de redirect
    submitFormToRD(form, fullUrl);
  };

  const onChangeDeparture = (date, dateString) => {
    //Manipula a input de "Data de Ida"
    if (errorList.includes("departure")) {
      //Retorna e atualiza array de erros no formulário
      let errors = errorList.filter((item) => item != "departure");
      setErrorList(errors);
    }
    setFormData({ ...formData, departure: dateString });
  };

  const onChangeArrival = (date, dateString) => {
    //Manipula a input de "Data de Volta"
    if (errorList.includes("arrival")) {
      //Retorna e atualiza array de erros no formulário
      let errors = errorList.filter((item) => item != "arrival");
      setErrorList(errors);
    }
    setFormData({ ...formData, arrival: dateString });
  };

  const disabledDepartureDate = (current) => {
    let limitAfter = formData.arrival;
    //Gera TimeStamp da "Data de Volta" para interagir com DatePicker
    limitAfter = moment(limitAfter, "DD/MM/YYYY");
    return (
      //Bloqueia datas após a data da input "Data de Volda"
      (current && current.isAfter(limitAfter, "day")) ||
      //Bloqueia datas anterios a hoje na input "Data de Ida"
      current < moment().startOf("day")
    );
  };

  const disabledArrivalDate = (current) => {
    let limitBefore = formData.departure;
    //Gera TimeStamp da "Data de Ida" para interagir com DatePicker
    limitBefore = moment(limitBefore, "DD/MM/YYYY");
    return (
      //Bloqueia datas anteriores a "Data de Ida"
      (current && current < moment().startOf("day")) ||
      //Bloqueia datas anterios a hoje na input "Data de Volta"
      current < limitBefore.startOf("day")
    );
  };

  const selectHandler = (selectedOption) => {
    //Administra o select de Destino
    formData.selectedOption = selectedOption;
    setFormData({ ...formData });
    if (errorList.includes("destinyGroup")) {
      //Retorna e atualiza array de erros no formulário
      let errors = errorList.filter((item) => item != "destinyGroup");
      setErrorList(errors);
    }
  };

  const [modalOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleOld = (index, value) => {
    //Administra o número de passageiros por idade
    if (errorList.includes("ages")) {
      let errors = errorList.filter((item) => item !== "ages");
      setErrorList(errors);
    }

    let ages = 0;
    let formOlds = [...formData.olds];

    for (let i = 0; i < formOlds.length; i++) {
      ages += formOlds[i];
    }
    if ((value > 0 && ages < 10) || (value < 0 && formData.olds[index] > 0)) {
      //Impede que tenham mais de 10 passageiros e que o número de passageiros fique negativo
      formOlds[index] = formOlds[index] + value;
      setFormData({ ...formData, olds: formOlds });
    }
  };

  const inputHandler = (event) => {
    //Manipula o valor das inputs simples de texto
    let id = event.target.id; //Encontra o id da input
    let value = event.target.value; //Encontra o value da input

    if (errorList.includes(id)) {
      let errors = errorList.filter((item) => item != id);
      setErrorList(errors);
    }

    if (id == "name") {
      setFormData({ ...formData, name: value });
    }
    if (id == "email") {
      setFormData({ ...formData, email: value });
    }
    if (id == "phone") {
      setFormData({ ...formData, phone: value });
    }
  };

  const [formData, setFormData] = useState({
    selectedOption: null,
    departure: null,
    departureDate: null,
    arrival: null,
    arrivalDate: null,
    olds: [0, 0, 0, 0],
    ages: 0,
    name: "",
    email: "",
    phone: "",
  });

  //console.log('formData:', formData);

  useEffect(() => {
    const storedFormData = sessionStorage.getItem("formData-travel");
    if (storedFormData) {
      let storageData = JSON.parse(storedFormData);
      if (!Array.isArray(storageData.olds)) {
        storageData.olds = [0, 0, 0, 0];
      }
      //console.log('storage:', storageData);
      setFormData({
        ...storageData,
        departure: null, //Deleta os dados de data anteriores por darem conflito com o DatePicker
        departureDate: null,
        arrival: null,
        arrivalDate: null,
      });
    }
    //Deleta selessionStorage ao carregar pro form;
    sessionStorage.removeItem("formData-travel");
  }, []);

  return (
    <section
      className="p-10"
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
              src={
                imageManagerPrimeTravel.ImagensLandPage.ImgEmParceriaGenerali
              }
              alt="Proteção Covid, Preços Imbativeis, 30 Serviços e coberturas, Totalmente Digital"
              className="m-auto w-80 justify-center items-center pt-5"
            />
            <BannerParcelamento />
          </div>
          <div className="animate__animated animate__zoomIn rounded-lg bg-white p-10 sm:p-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Faça Sua Cotação Gratuita
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Inicie sua cotação online preenchendo o formulário abaixo.
            </p>
            <form
              action=""
              className="sm:flex flex-col sm:flex-row justify-center items-center mx-auto gap-x-6 gap-y-4 mt-10 max-w-xl sm:mt-10"
            >
              <div className="w-full gap-x-8 gap-y-6 grid grid-cols-1 ">
                <div>
                  <label
                    id="label-destinyGroup"
                    htmlFor=""
                    className={
                      errorList.includes("destinyGroup")
                        ? "block text-sm font-semibold leading-6 text-alertRed"
                        : "block text-sm font-semibold leading-6 text-gray-900"
                    }
                  >
                    Destino
                  </label>
                  <div className="mt-2.5">
                    <Select
                      value={formData.selectedOption}
                      onChange={selectHandler}
                      options={ListaPaises}
                      isSearchable
                      placeholder="Selecione o Destino..."
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <label
                      id="label-departure"
                      htmlFor=""
                      className={
                        errorList.includes("departure")
                          ? "block text-sm font-semibold leading-6 text-alertRed"
                          : "block text-sm font-semibold leading-6 text-gray-900"
                      }
                    >
                      Data de Ida
                    </label>
                    <div className="mt-2.5">
                      <Space direction="vertical">
                        <DatePicker
                          disabledDate={disabledDepartureDate}
                          format="DD/MM/YYYY"
                          onChange={onChangeDeparture}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                        />
                      </Space>
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      id="label-arrival"
                      htmlFor=""
                      className={
                        errorList.includes("arrival")
                          ? "block text-sm font-semibold leading-6 text-alertRed"
                          : "block text-sm font-semibold leading-6 text-gray-900"
                      }
                    >
                      Data de Volta
                    </label>
                    <div className="mt-2.5">
                      <Space direction="vertical">
                        <DatePicker
                          disabledDate={disabledArrivalDate}
                          format="DD/MM/YYYY"
                          onChange={onChangeArrival}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                        />
                      </Space>
                    </div>
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="passengers"
                    className={
                      errorList.includes("ages")
                        ? "form-label block text-sm font-semibold leading-6 text-alertRed"
                        : "form-label block text-sm font-semibold leading-6 text-gray-900"
                    }
                    id="label-ages"
                  >
                    Passageiros
                  </label>
                  <input
                    type="text"
                    className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6 cursor-pointer"
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
                        : "Selecionar Passageiros"
                    }
                    onClick={openModal}
                    readOnly
                    required
                  />

                  <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="fixed inset-0 flex items-center justify-center p-6 bg-gray-800 bg-opacity-50"
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
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl">0 a 40 anos</h3>
                        <div className="flex items-center justify-around w-32">
                          <button
                            onClick={() => handleOld(0, -1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={formData.olds[0]}
                            readOnly
                            className=" text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={() => handleOld(0, 1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl">41 a 64 anos</h3>
                        <div className="flex items-center justify-around w-32">
                          <button
                            onClick={() => handleOld(1, -1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={formData.olds[1]}
                            readOnly
                            className=" text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={() => handleOld(1, 1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl">65 a 75 anos</h3>
                        <div className="flex items-center justify-around w-32">
                          <button
                            onClick={() => handleOld(2, -1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={formData.olds[2]}
                            readOnly
                            className=" text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={() => handleOld(2, 1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl">76 a 99 anos</h3>
                        <div className="flex items-center justify-around w-32">
                          <button
                            onClick={() => handleOld(3, -1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={formData.olds[3]}
                            readOnly
                            className=" text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={() => handleOld(3, 1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={closeModal}
                        className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-2/4 items-center "
                      >
                        Aplicar
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>
              <div className="w-full gap-x-8 gap-y-6 grid grid-cols-1 mt-5 sm:m-0">
                <div>
                  <label
                    id="label-name"
                    htmlFor=""
                    className={
                      errorList.includes("name")
                        ? "block text-sm font-semibold leading-6 text-alertRed"
                        : "block text-sm font-semibold leading-6 text-gray-900"
                    }
                  >
                    Nome Completo
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={(e) => {
                        inputHandler(e);
                      }}
                      value={formData.name}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    id="label-email"
                    htmlFor=""
                    className={
                      errorList.includes("email")
                        ? "block text-sm font-semibold leading-6 text-alertRed"
                        : "block text-sm font-semibold leading-6 text-gray-900"
                    }
                  >
                    E-mail
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={(e) => {
                        inputHandler(e);
                      }}
                      value={formData.email}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="label-phone"
                    className={
                      errorList.includes("phone")
                        ? "block text-sm font-semibold leading-6 text-alertRed"
                        : "block text-sm font-semibold leading-6 text-gray-900"
                    }
                  >
                    Telefone
                  </label>
                  <div className="mt-2.5">
                    <InputMask
                      mask="(99) 99999-9999"
                      maskChar={null}
                      maxLength="16"
                      type="text"
                      name="phone"
                      id="phone"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        inputHandler(e);
                      }}
                      value={formData.phone}
                    />
                  </div>
                </div>
              </div>
            </form>
            <button
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
  );
}
