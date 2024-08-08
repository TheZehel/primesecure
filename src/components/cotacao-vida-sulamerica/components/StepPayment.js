import React, { useState, useRef, useEffect } from "react";
import InputMask from "react-input-mask";

import ErrorBoundary from "antd/es/alert/ErrorBoundary.js";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import DisplayMessage from "./subcomponents/DisplayMessage";

import PixIcon from "./icons/PixIcon.js";
import CloseIcon from "./icons/CloseIcon.js";
import LoadingIcon from "./icons/LoadingIcon.js";
import CardIcon from "./icons/CardIcon.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import ReCAPTCHA from "react-google-recaptcha";

import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";
import CryptoFunctions from "../../globalsubcomponentes/CryptoFunctions";
import { resolve } from "path-browserify";

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

const functions = new GlobalFuntions();
const crypto = new CryptoFunctions();

const formatCurrency = (value) => {
  let options = {
    style: "decimal",
    useGrouping: true,
    groupingSeparator: ".",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  let price = value.toLocaleString(undefined, options);

  return price;
};

const link =
  "https://www.sulamerica.com.br/manuais/CondicoesEspeciaisDaAssistenciaPessoal.pdf";

const plans = [
  {},
  {
    headTitle: "PRIME BASIC",
    title: "Pacote 1",
    price: "3490",
    award: "Sorteio de R$20.000,00",
    resume: "Detalhes:",
    resumeDesc:
      "Assistência Pessoal + App Namu + Faz tudo (Assistência Residencial) + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
    features: [
      {
        label: "Morte Acidental",
        value: "100 mil",
      },
      {
        label: "Invalidez Permanente Total por Acidente",
        value: "50 mil",
      },
      {
        label: "Funeral Familiar Até 10 mil",
        value: "(Prestação de Serviço)",
      },
    ],
    bgColor: "bluePrime",
    textColor: "white",
    planId: 1,
  },
  {
    headTitle: "PRIME SILVER",
    title: "Pacote 2",
    price: "4250",
    award: "Sorteio de R$20.000,00",
    resume: "Detalhes:",
    resumeDesc:
      "Assistência Pessoal + App Namu + Faz tudo (Assistência Residencial) + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
    //"Assistência pessoal + residencial + dezenas de serviços Desconto em farmácia + funeral familiar + Médico na Tela Familiar.",
    features: [
      {
        label: "Morte Acidental",
        value: "150 mil",
      },
      {
        label: "Invalidez Permanente Total por Acidente",
        value: "75 mil",
      },
      {
        label: "Funeral Familiar Até 10 mil",
        value: "(Prestação de Serviço)",
      },
    ],
    bgColor: "bluePrime",
    textColor: "white",
    planId: 2,
  },
  {
    headTitle: "PRIME GOLD",
    title: "Pacote 3",
    price: "5014",
    award: "Sorteio de R$20.000,00",
    resume: "Detalhes:",
    resumeDesc:
      "Assistência Pessoal + App Namu + Faz tudo (Assistência Residencial) + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
    features: [
      {
        label: "Morte Acidental",
        value: "200 mil",
      },
      {
        label: "Invalidez Permanente Total por Acidente",
        value: "100 mil",
      },
      {
        label: "Funeral Familiar Até 10 mil",
        value: "(Prestação de Serviço)",
      },
    ],
    bgColor: "bluePrime",
    textColor: "white",
    planId: 3,
  },
  {
    headTitle: "PRIME DIAMOND",
    title: "Pacote 4",
    price: "6532",
    award: "Sorteio de R$20.000,00",
    resume: "Detalhes:",
    resumeDesc:
      "Assistência Pessoal + App Namu + Faz tudo (Assistência Residencial) + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
    features: [
      {
        label: "Morte Acidental",
        value: "300 mil",
      },
      {
        label: "Invalidez Permanente Total por Acidente",
        value: "150 mil",
      },
      {
        label: "Funeral Familiar Até 10 mil",
        value: "(Prestação de Serviço)",
      },
    ],
    bgColor: "bluePrime",
    textColor: "white",
    planId: 4,
  },
];

export default function StepPayment({
  updateFormData,
  formData,
  isValidCardNumber,
  isValidCardName,
  isValidExpiryDate,
  isValidCvv,
  refreshCardNumber,
  refreshCardName,
  refreshExpiryDate,
  refreshCvv,
  setValidCardNumber,
  setValidCardName,
  setValidExpiryDate,
  setValidCvv,
  recaptchaV3,
  recaptchaRef,
  setThankYouToken,
}) {
  const [open, setOpen] = React.useState(1);

  const [recaptchaVersion, setRecaptchaVersion] = useState(3);
  const [v2Token, setV2Token] = useState(null);
  const [v3Token, setV3Token] = useState(null);

  const [errorList, setErrorList] = useState([]);

  const [errorData, setErrorData] = useState({});

  const [alertMessages, setAlertMessages] = useState([]);

  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const [cardForm, setCardForm] = useState({
    monthly: {
      number: "",
      name: "",
      expiration: "",
      cvv: "",
    },
    annual: {
      number: "",
      name: "",
      expiration: "",
      cvv: "",
    },
  });

  const recaptchaV2Ref = React.createRef();
  //const recaptchaV3Ref = React.createRef();

  const handleOpen = (value) => {
    if (loading || open === value) {
      return;
    }

    let errors = [...errorList];

    if (open == 1) {
      errors = errors.filter((error) => {
        return !error.includes("annual");
      });
    }

    if (open == 2) {
      errors = errors.filter((error) => {
        return !error.includes("monthly");
      });
    }

    if (open == 3) {
      errors = errors.filter((error) => {
        return !error.includes("monthly") && !error.includes("annual");
      });
    }

    setErrorList([...errors]);
    setOpen(value);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    let period = null;
    let form = { ...cardForm };
    let errors = [...errorList];

    if (name.includes("monthly") || name.includes("annual")) {
      period = name.split("-")[0];
      name = name.split("-")[1];

      errors = errors.filter((error) => {
        return error != period + "-" + name;
      });
    }

    if (name === "number") {
      value = value.replace(/\D/g, "").substring(0, 16);
      value = value.replace(/(.{4})/g, "$1 ").trim();

      form[period] = { ...form[period], number: value };
      //setValidCardNumber(value.length === 19);
    }

    if (name === "name") {
      value = value.replace(/[0-9]/g, "");
      form[period] = { ...form[period], name: value };
      //setValidCardName(value.trim().length > 0);
    }

    if (name === "expiration") {
      value = value.replace(/\D/g, "").substring(0, 4);
      value = value.replace(/(.{2})/, "$1/").trim();

      form[period] = { ...form[period], expiration: value };
      //setValidExpiryDate(/^(0[1-9]|1[0-2])\/\d{2}$/.test(value));
    }

    if (name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 3);

      form[period] = { ...form[period], cvv: value };
      //setValidCvv(value.length === 3);
    }

    setErrorList([...errors]);
    setCardForm({ cardForm, ...form });
    //updateFormData({ [name]: value });
  };

  const validatePayload = () => {
    let valid = true;
    let step = 3;
    let errors = [];

    let data = { ...formData };

    let {
      name,
      email,
      cpf,
      phone,
      birth,
      weight,
      height,
      birthsex,
      office,
      access,
      cep,
      city,
      address,
      number,
      complement,
      neighborhood,
      state,
    } = data;

    if (!functions.validateNameLastName(name)) {
      valid = false;
      errors.push("name");
      step = step > 1 ? 1 : step;
    }

    if (!functions.validateEmail(email)) {
      valid = false;
      errors.push("email");
      step = step > 1 ? 1 : step;
    }

    if (!functions.validateCPF(cpf)) {
      valid = false;
      errors.push("cpf");
      step = step > 1 ? 1 : step;
    }

    if (!functions.validatePhone(phone)) {
      valid = false;
      errors.push("phone");
      step = step > 1 ? 1 : step;
    }

    if (!/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(birth)) {
      valid = false;
      errors.push("birth");
      step = step > 1 ? 1 : step;
    }

    if (valid) {
      let date = functions.refactoryDate(birth, "DD/MM/YYYY", "YYYY-MM-DD");
      let age = functions.calculateAge(date);

      if (age < 14) {
        valid = false;
        errors.push("age");
        step = step > 1 ? 1 : step;
      }
    }

    if (!/^[0-1]$/.test(birthsex)) {
      valid = false;
      errors.push("birthsex");
      step = step > 1 ? 1 : step;
    }

    //if (!/^[0-9]{1,2}$/.test(weight)) {
    //  valid = false;
    //  errors.push('weight');
    //  step = step > 1 ? 1 : step;
    //}

    //if (!/^[0-9]{1,2}$/.test(height)) {
    //  valid = false;
    //  errors.push('height');
    //  step = step > 1 ? 1 : step;
    //}

    if (!/^[0-9]{1,2}$/.test(office)) {
      valid = false;
      errors.push("office");
      step = step > 1 ? 1 : step;
    }

    if (access !== true && access !== "Permitido") {
      valid = false;
      errors.push("access");
      step = step > 1 ? 1 : step;
    }

    if (!functions.validateCEP(cep)) {
      valid = false;
      errors.push("cep");
      step = step > 2 ? 2 : step;
    }

    if (!functions.validateCity(city)) {
      valid = false;
      errors.push("city");
      step = step > 2 ? 2 : step;
    }

    if (!functions.validateStreet(address)) {
      valid = false;
      errors.push("address");
      step = step > 2 ? 2 : step;
    }

    if (!functions.validateStreetNumber(number)) {
      valid = false;
      errors.push("number");
      step = step > 2 ? 2 : step;
    }

    if (!functions.validateComplement(complement)) {
      valid = false;
      errors.push("complement");
      step = step > 2 ? 2 : step;
    }

    if (!functions.validateNeighborhood(neighborhood)) {
      valid = false;
      errors.push("neighborhood");
      step = step > 2 ? 2 : step;
    }

    if (!functions.validateStateUF(state)) {
      valid = false;
      errors.push("state");
      step = step > 2 ? 2 : step;
    }

    let card = null;

    if (open != 1 && open != 2 && open != 3) {
      valid = false;
      errors.push("payment-method");
    }

    let period = "annual";

    if (open == 1) {
      card = { ...cardForm.monthly };
      period = "monthly";
    }

    if (open == 2) {
      card = { ...cardForm.annual };
    }

    if (card) {
      let { number, name, expiration, cvv } = card;

      if (!functions.validateCreditCardNumber(number)) {
        valid = false;
        errors.push(period + "-number");
      }

      if (!functions.validateNameLastName(name)) {
        valid = false;
        errors.push(period + "-name");
      }

      if (!functions.validateCreditCardExpirationDate(expiration)) {
        valid = false;
        errors.push(period + "-expiration");
      }

      if (!functions.validateCreditCardCVV(cvv)) {
        valid = false;
        errors.push(period + "-cvv");
      }
    }

    if (recaptchaVersion == 2) {
      let token = recaptchaV2Ref.current.getValue();

      if (!token) {
        valid = false;
        errors.push("recaptcha");
      }
    }

    if (errors.length > 0) {
      setErrorList([...errorList, ...errors]);
    }

    console.log("Valid:", valid, "Step:", step, "Errors:", errors);

    return valid;
  };

  //console.log(recaptchaVersion);

  const processPayment = async () => {
    console.log(formData);

    if (loading) {
      return;
    }

    setLoading(true);
    setErrorData({});
    setAlertMessages([]);

    if (!validatePayload()) {
      setLoading(false);
      return;
    }

    var token = null;

    try {
      if (recaptchaVersion == 3) {
        token = await new Promise(async (resolve, reject) => {
          let t = await recaptchaRef.executeAsync();
          resolve(t);
        });
      }

      if (recaptchaVersion == 2) {
        token = recaptchaV2Ref.current.getValue();
      }
    } catch (e) {
      console.error("Recaptcha Error:", e);
    }

    if (enviroment == "SANDBOX") {
      console.log(recaptchaVersion, token);

      setTimeout(() => {
        setLoading(false);
      }, 40000);
    }

    try {
      await fetch("/publicKey.pem")
        .then((response) => response.text())
        .then(async (publicKeyPem) => {
          var data = null;
          var error = null;

          let method = "credit";
          let period = "annual";

          if (open == 3) {
            method = "pix";
          }

          if (open == 1) {
            period = "monthly";
          }

          let encrypt = {
            card: {
              number: cardForm[period]["number"],
              name: cardForm[period]["name"],
              expiration: cardForm[period]["expiration"],
              cvv: cardForm[period]["cvv"],
            },
          };

          //console.log(encrypt);

          let ccEncrypted = crypto.encryptData(
            JSON.stringify(encrypt),
            publicKeyPem
          );

          let payload = {
            planId: formData.selectedPlanId,
            userData: {
              name: formData.name,
              email: formData.email,
              cpf: formData.cpf,
              phone: formData.phone,
              birthday: formData.birth,
              weight: formData.weight,
              height: formData.height,
              gender: formData.birthsex,
              profession: formData.office,
              allow:
                formData.access == "Permitido" || formData.access == true
                  ? true
                  : false,
            },
            addressData: {
              zipcode: formData.cep,
              city: formData.city,
              street: formData.address,
              number: formData.number,
              complement: formData.complement,
              neighborhood: formData.neighborhood,
              state: formData.state,
            },
            recaptcha: {
              version: recaptchaVersion,
              token: token,
            },
            paymentData: {
              method,
              period,
            },
            encryptedCard: ccEncrypted,
          };

          console.log(payload);

          await axios
            .post(apiUrl + "/vida-sulamerica/checkout", payload)
            .then((response) => {
              data = response.data;
              console.log("Data:", data);

              setAlertMessages(["Pagamento processado com sucesso!"]);

              setPurchaseSuccess(true);
              setLoading(false);

              setTimeout(() => {
                setThankYouToken(data.token);
                //window.location.href = '/cotacao-vida-sulamerica/obrigado';
              }, 3000);
            })
            .catch((e) => {
              error = e;

              if (error && error.response) {
                error = error.response;
              }

              if (error && error.data) {
                error = error.data;
              }

              console.log("Error:", error);

              setTimeout(() => {
                setAlertMessages([]);
                setErrorData({});
              }, 9000);

              setPurchaseSuccess(false);
              setLoading(false);
              errorHandler(error);

              /*
              if (recaptchaVersion == 3) {
                if (recaptchaV3Ref && recaptchaV3Ref.current) {
                  recaptchaV3Ref.current.reset();
                }
              }else{
                if (recaptchaV2Ref && recaptchaV2Ref.current) {
                  recaptchaV2Ref.current.reset();
                }
              }
              */

              console.error("Erro ao processar o pagamento:", error);
            });

          console.log("Dados de pagamento criptografados:", ccEncrypted);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Erro ao carregar a chave pública:", error);
        });
    } catch (error) {
      setLoading(false);
      console.error(
        "Não foi possível criptogradar os dados de pagamento.",
        error
      );
    }
  };

  const errorHandler = (e) => {
    var { error, errorList, step, purchase } = e;

    //console.log(e);

    if (!Array.isArray(errorList)) {
      errorList = [];
    }

    if (
      errorList.includes("recaptcha-invalid") ||
      errorList.includes("recaptcha-error") ||
      errorList.includes("recaptcha-failed")
    ) {
      if (recaptchaVersion == 3) {
        setRecaptchaVersion(2);
      }
    }

    if (errorList.includes("payment-failed") && purchase) {
      setAlertMessages(["payment-failed"]);
      setErrorData({ ...purchase });

      return;
    }

    setAlertMessages([errorList[0]]);
    setErrorData({ ...purchase });
  };

  let planId = formData.selectedPlanId || 0;
  planId = parseInt(planId);

  let plan = { ...plans[planId] };

  if (open == 2 || open == 3) {
    plan.price = plan.price * 12;
  }

  console.log(plan);

  let planPrice = formatCurrency(plan.price / 100);

  return (
    <div>
      <DisplayMessage
        alert={purchaseSuccess ? "success" : "error"}
        messages={[...alertMessages]}
        data={{ ...errorData }}
      />
      <div className="flex flex-col justify-center mx-5 sm:mx-5 lg:flex-row md:mx-10 lg:mx-10 mb-5 mt-10 gap-x-[25px]">
        <div className="w-full max-w-[500px] rounded-xl shadow-uniform-shadow py-5 mx-auto lg:mx-0 mt-5 lg:mt-0 order-2 lg:order-1">
          <div className="w-fit font-semibold text-[18px] mb-2 ml-5">
            Formas de Pagamento:
          </div>
          <div className="rounded-lg max-w-6xl ml-5 mr-5">
            <Accordion
              open={open === 1}
              className="mb-2 rounded-lg border border-blue-gray-100 px-2"
            >
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className={`justify-start border-b-0 transition-colors px-3 ${
                  open === 1 ? "text-blue-500 hover:!text-bluePrime" : ""
                }`}
              >
                <CardIcon
                  className="hover:bluePrime"
                  color={open === 1 ? "#03a8db" : "black "}
                  height="1.5rem"
                  width="1.5rem"
                  opacity="1"
                />
                <span className="ml-3" onClick={(e) => {}}>
                  Mensal | Cartão de Crédito
                </span>
              </AccordionHeader>
              <AccordionBody className="pt-2 text-base font-normal">
                <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
                  <input
                    refresh={refreshCardNumber}
                    type="text"
                    name="monthly-number"
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset
                      ${
                        errorList.includes("monthly-number")
                          ? "ring-red-500 placeholder-red-500 text-red-500 focus:ring-red-500"
                          : "ring-bluePrime focus:ring-bluePrime"
                      }
                    `}
                    placeholder="Número do Cartão"
                    maxLength="60"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                    value={cardForm.monthly.number || ""}
                    onChange={handleChange}
                    title="Digite aqui o numero do seu cartão de crédito."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
                <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
                  <input
                    type="text"
                    name="monthly-name"
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset
                      ${
                        errorList.includes("monthly-name")
                          ? "ring-red-500 placeholder-red-500 text-red-500 focus:ring-red-500"
                          : "ring-bluePrime focus:ring-bluePrime"
                      }
                    `}
                    placeholder="Nome Impresso no Cartão"
                    maxLength="60"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                    value={cardForm.monthly.name || ""}
                    onChange={handleChange}
                    title="Por favor, use apenas letras e acentos comuns."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
                <div className="w-full px-3 flex gap-2">
                  <div className="w-[80%] h-14 flex mb-4">
                    <input
                      type="text"
                      name="monthly-expiration"
                      className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset
                        ${
                          errorList.includes("monthly-expiration")
                            ? "ring-red-500 placeholder-red-500 text-red-500 focus:ring-red-500"
                            : "ring-bluePrime focus:ring-bluePrime"
                        }
                      `}
                      placeholder="Vencimento"
                      maxLength="5" // 4 dígitos + 1 barra
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                      value={cardForm.monthly.expiration || ""}
                      onChange={handleChange}
                      title="Por favor, use apenas letras e acentos comuns."
                      style={{
                        fontSize: "20px",
                        caretColor: "#03a8db 2px",
                      }}
                    />
                  </div>
                  <div className="w-[80%] h-14 flex mb-4">
                    <input
                      type="text"
                      name="monthly-cvv"
                      className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset
                        ${
                          errorList.includes("monthly-cvv")
                            ? "ring-red-500 placeholder-red-500 text-red-500 focus:ring-red-500"
                            : "ring-bluePrime focus:ring-bluePrime"
                        }
                      `}
                      placeholder="CVV"
                      maxLength="60"
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                      value={cardForm.monthly.cvv || ""}
                      onChange={handleChange}
                      title="Por favor, use apenas letras e acentos comuns."
                      style={{
                        fontSize: "20px",
                        caretColor: "#03a8db 2px",
                      }}
                    />
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
          {/*
            <div className="rounded-lg max-w-6xl ml-5 mr-5">
              <Accordion
                open={open === 2}
                className="mb-2 rounded-lg border border-blue-gray-100 px-2"
              >
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className={`justify-start border-b-0 transition-colors px-3 ${
                    open === 2 ? "text-blue-500 hover:!text-bluePrime" : ""
                  }`}
                >
                  <CardIcon
                    className="hover:bluePrime"
                    color={
                      open === 2 ? "#03a8db" : "black "
                    }
                    height="1.5rem"
                    width="1.5rem"
                    opacity="1"
                  />
                  <span
                    className="ml-3"
                    onClick={(e) => {}}
                  >
                    Anual à Vista | Cartão de Crédito
                  </span>
                </AccordionHeader>
                <AccordionBody className="pt-2 text-base font-normal">
                  <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
                    <input
                      refresh={refreshCardNumber}
                      type="text"
                      name="annual-number"
                      className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset
                        ${(errorList.includes('annual-number')) ? "ring-red-500 placeholder-red-500 text-red-500 focus:ring-bluePrime" : "ring-bluePrime focus:ring-bluePrime"}
                      `}
                      placeholder="Número do Cartão"
                      maxLength="60"
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                      value={cardForm.annual.number || ""}
                      onChange={handleChange}
                      title="Digite aqui o numero do seu cartão de crédito."
                      style={{
                        fontSize: "20px",
                        caretColor: "#03a8db 2px",
                      }}
                    />
                  </div>
                  <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
                    <input
                      type="text"
                      name="annual-name"
                      className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset
                        ${(errorList.includes('annual-name')) ? "ring-red-500 placeholder-red-500 text-red-500 focus:ring-red-500" : "ring-bluePrime focus:ring-bluePrime"}
                      `}
                      placeholder="Nome Impresso no Cartão"
                      maxLength="60"
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                      value={cardForm.annual.name || ""}
                      onChange={handleChange}
                      title="Por favor, use apenas letras e acentos comuns."
                      style={{
                        fontSize: "20px",
                        caretColor: "#03a8db 2px",
                      }}
                    />
                  </div>
                  <div className="w-full px-3 flex gap-2">
                    <div className="w-[80%] h-14 flex mb-4">
                      <input
                        type="text"
                        name="annual-expiration"
                        className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset
                          ${(errorList.includes('annual-expiration')) ? "ring-red-500 placeholder-red-500 text-red-500 focus:ring-red-500" : "ring-bluePrime focus:ring-bluePrime"}
                        `}
                        placeholder="Vencimento"
                        maxLength="5" // 4 dígitos + 1 barra
                        pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                        value={cardForm.annual.expiration || ""}
                        onChange={handleChange}
                        title="Por favor, use apenas letras e acentos comuns."
                        style={{
                          fontSize: "20px",
                          caretColor: "#03a8db 2px",
                        }}
                      />
                    </div>
                    <div className="w-[80%] h-14 flex mb-4">
                      <input
                        type="text"
                        name="annual-cvv"
                        className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset
                          ${(errorList.includes('annual-cvv')) ? "ring-red-500 placeholder-red-500 text-red-500 focus:ring-red-500" : "ring-bluePrime focus:ring-bluePrime"}
                        `}
                        placeholder="CVV"
                        maxLength="60"
                        pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                        value={cardForm.annual.cvv || ""}
                        onChange={handleChange}
                        title="Por favor, use apenas letras e acentos comuns."
                        style={{
                          fontSize: "20px",
                          caretColor: "#03a8db 2px",
                        }}
                      />
                    </div>
                  </div>   
                </AccordionBody>
              </Accordion>
            </div>
            <div className="rounded-lg max-w-6xl px-3 mx-2 hidden">
              <Accordion
                open={open === 3}
                className="rounded-lg border border-blue-gray-100 px-4"
              >
                <AccordionHeader
                  onClick={ () => handleOpen(3) }
                  className={`justify-start border-b-0 transition-colors ${
                    open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
                  }`}
                >
                  <PixIcon
                    className="hover:bluePrime"
                    color={ open === 3 ? "#32BCAD" : "black " }
                    height="1.5rem"
                    width="1.5rem"
                    opacity="1"
                  />
                  <span
                    className="ml-3 w-fit"
                    onClick={(e) => {}}
                  >
                    Anual à Vista | Pix
                  </span>                
                </AccordionHeader>
                <AccordionBody className="pt-2 text-base font-normal">
                  <p className="leading-6 text-left">
                    Para seguir o seu pagamento com Pix, clique no botão{" "}
                    <span
                      onClick={() => {
                        
                        //handleOpenPixModal();
                      }}
                      className="font-semibold bg-pixGreen px-1 py-0.5 rounded-md cursor-pointer text-white whitespace-nowrap"
                    >
                      "Pagar com Pix"
                    </span>{" "}
                    logo em seguida uma nova janela irá se abrir com mais instruções
                    para finaizar a compra.
                  </p>
                </AccordionBody>
              </Accordion>
            </div>            
            */}
          <div className={`w-full mb-1 mt-8 max-w-6xl px-5 block lg:hidden`}>
            <div
              className={`w-full py-3 text-[16px] font-semibold text-white text-center rounded-md bg-green-500 cursor-pointer hover:opacity-80 transition duration-300 ease-in-out ${
                purchaseSuccess ? "bg-gray-500" : ""
              }`}
              onClick={() => {
                if (purchaseSuccess) {
                  return;
                }
                processPayment();
              }}
            >
              Finalizar Compra
            </div>
          </div>
        </div>
        <div className="w-full max-w-[500px] rounded-xl shadow-uniform-shadow py-5 mx-auto lg:mx-0 mt-5 lg:mt-0 order-1 lg:order-2">
          <div className="rounded-lg max-w-6xl ml-5 mr-5 h-full flex flex-col">
            <div className="w-fit font-semibold text-[18px] mb-2">
              Resumo da Pedido:
            </div>
            <div className="mb-2 rounded-lg border border-blue-gray-100 p-3 text-left">
              <div className="font-normal  mb-3">{plan.headTitle}</div>
              <div className="text-left text-bluePrime  text-sm  mb-5 leading-4 font-semibold">
                {plan.resumeDesc}
              </div>
              <div className="flex justify-start mb-5">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="w-3 h-3 p-1 bg-white rounded-full border border-cyan-500"
                  />
                  <div className="ml-2 text-sm">{plan.award}</div>
                </div>
              </div>
              <div>
                <div
                  className={`text-bluePrime2 text-sm text-start font-extrabold mb-2`}
                  onClick={() => {
                    console.log("Click", recaptchaRef);
                  }}
                >
                  Detalhes:
                </div>
                <div className="text-[11px]">
                  {plan.features.map((feature, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between py-[1px] px-[5px] bg-[#313131]/5 rounded-lg mb-[8px] flex`}
                      >
                        <div
                          className={`text-left text-grayPrime font-medium py-[3px] px-[8px] flex font-semibold w-full`}
                        >
                          <div className="w-max my-auto opacity-80">
                            {feature.label}
                          </div>
                          <div className="w-fit my-auto ml-auto text-right break-keep opacity-80">
                            {feature.value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-left mt-3 mx-1">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-bluePrime hover:text-bluePrime2 font-semibold underline underline-offset-2"
                >
                  Mais detalhes...
                </a>
              </div>
              <div className={`text-grayPrime font-normal pt-4 pb-2`}>
                <span className="font-semibold text-lg">Total:</span>{" "}
                <span className="text-base text-black">R$</span>{" "}
                <span className="font-semibold text-lg ">{planPrice}</span>{" "}
                <span
                  className={`text-base text-black ${
                    open == 2 || open == 3 ? "hidden" : ""
                  }`}
                >
                  /mês
                </span>
              </div>
              <div
                className={`w-full mb-1 ${
                  recaptchaVersion == 3 ? "hidden" : "flex"
                }`}
              >
                <div className={` mr-auto mt-2 mb-3 flex`}>
                  <ReCAPTCHA
                    ref={recaptchaV2Ref}
                    sitekey="6LcPxSEoAAAAAMqfJybG3yJBIO-Ox1oaC6jIrSPV"
                    onChange={(token) => {
                      console.log("Recaptcha V2", token);
                    }}
                  />
                </div>
              </div>
              <div className={``}></div>
              <div className={`w-full mb-1 mt-3 hidden lg:block`}>
                <div
                  className={`w-full py-3 text-[16px] font-semibold text-white text-center flex items-center rounded-md transition duration-300 ease-in-out ${
                    purchaseSuccess ? "bg-gray-500" : ""
                  } 
                    ${
                      loading
                        ? "cursor-not-allowed bg-bluePrime2"
                        : "bg-green-500 cursor-pointer hover:opacity-80"
                    }
                  `}
                  onClick={() => {
                    if (purchaseSuccess) {
                      return;
                    }
                    processPayment();
                  }}
                >
                  <div className="w-fit h-fit m-auto flex subpixel-antialiased">
                    <div className="w-fit h-fit my-auto">
                      <LoadingIcon display={loading} />
                    </div>
                    <div className="w-fit h-fit my-auto">
                      {loading
                        ? "Processando"
                        : open == 3
                        ? "Pagar com Pix"
                        : "Finalizar Compra"}
                      {/*Finalizar Compra*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="flex items-center justify-center">
        <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-2xl my-5 rounded-xl shadow-uniform-shadow flex-grow">
          <div className="rounded-lg max-w-6xl ml-5 mr-5 mt-5">
            <div className="w-fit font-semibold text-[18px] mb-2">
              Formas de Pagamento:
            </div>
            <Accordion
              open={open === 1}
              className="mb-2 rounded-lg border border-blue-gray-100 px-2"
            >
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className={`justify-start border-b-0 transition-colors px-3 ${
                  open === 1 ? "text-blue-500 hover:!text-bluePrime" : ""
                }`}
              >
                <CardIcon
                  className="hover:bluePrime"
                  color={
                    open === 1 ? "#03a8db" : "black "
                  }
                  height="1.5rem"
                  width="1.5rem"
                  opacity="1"
                />
                <span
                  className="ml-3"
                  onClick={(e) => {}}
                >
                  Mensal | Cartão de Crédito
                </span>
              </AccordionHeader>
              <AccordionBody className="pt-2 text-base font-normal">
                <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
                  <input
                    refresh={refreshCardNumber}
                    type="text"
                    name="monthly-card"
                    className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                    placeholder="Número do Cartão"
                    maxLength="60"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                    value={formData["monthly-card"] || ""}
                    onChange={handleChange}
                    title="Digite aqui o numero do seu cartão de crédito."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
                <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
                  <input
                    type="text"
                    name="card-name"
                    className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                    placeholder="Nome Impresso no Cartão"
                    maxLength="60"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                    value={formData["card-name"] || ""}
                    onChange={handleChange}
                    title="Por favor, use apenas letras e acentos comuns."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
                <div className="w-full px-3 flex gap-2">
                  <div className="w-[80%] h-14 flex mb-4">
                    <input
                      type="text"
                      name="expiry-date"
                      className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                      placeholder="Vencimento"
                      maxLength="5" // 4 dígitos + 1 barra
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                      value={formData["expiry-date"] || ""}
                      onChange={handleChange}
                      title="Por favor, use apenas letras e acentos comuns."
                      style={{
                        fontSize: "20px",
                        caretColor: "#03a8db 2px",
                      }}
                    />
                  </div>
                  <div className="w-[80%] h-14 flex mb-4">
                    <input
                      type="text"
                      name="cvv"
                      className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                      placeholder="CVV"
                      maxLength="60"
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                      value={formData["cvv"] || ""}
                      onChange={handleChange}
                      title="Por favor, use apenas letras e acentos comuns."
                      style={{
                        fontSize: "20px",
                        caretColor: "#03a8db 2px",
                      }}
                    />
                  </div>
                </div>
                <div className="w-full mb-1 mt-2 px-3 flex">
                  <div className={`${ recaptchaVersion == 3 ? "hidden" : "flex" } ml-auto mt-2 mb-3`} >
                    <ReCAPTCHA
                      ref={recaptchaV2Ref}
                      sitekey="6LcPxSEoAAAAAMqfJybG3yJBIO-Ox1oaC6jIrSPV"
                      isolated={true}
                      onChange={(value) => { console.log("Captcha value update"); }}
                    />
                  </div>
                </div>
                <div className={``}>
                  <ReCAPTCHA
                    ref={recaptchaV3Ref}
                    sitekey="6LeUriEoAAAAAJK28iP3cIgAsRKUl4TCJhBC-GEO"
                    size="invisible"
                    isolated={true}
                  />
                </div>
                <div className="w-full mb-1 px-3">                
                  <div 
                    className="w-full py-4 text-[20px] font-semibold text-white text-center sm:w-4/4 rounded-md bg-green-500 cursor-pointer"
                    onClick={ ()=>{ processPayment() } }
                  >
                    Finalizar Compra
                  </div>
                </div>                
              </AccordionBody>
            </Accordion>
          </div>
          <div className="rounded-lg max-w-6xl  mb-5 p-3  m-2">
            <Accordion
              open={open === 3}
              className="rounded-lg border border-blue-gray-100 px-4"
            >
              <AccordionHeader
                onClick={ () => handleOpen(3) }
                className={`justify-start border-b-0 transition-colors ${
                  open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
                }`}
              >
                <PixIcon
                  className="hover:bluePrime"
                  color={ open === 3 ? "#32BCAD" : "black " }
                  height="1.5rem"
                  width="1.5rem"
                  opacity="1"
                />
                <span
                  className="ml-3 w-fit"
                  onClick={(e) => {}}
                >
                  Anual à Vista | Pix
                </span>                
              </AccordionHeader>
              <AccordionBody className="pt-2 text-base font-normal">
                <p className="leading-6 text-left">
                  Para seguir o seu pagamento com Pix, clique no botão{" "}
                  <span
                    onClick={() => {
                      
                      //handleOpenPixModal();
                    }}
                    className="font-semibold bg-pixGreen px-1 py-0.5 rounded-md cursor-pointer text-white whitespace-nowrap"
                  >
                    "Pagar com Pix"
                  </span>{" "}
                  logo em seguida uma nova janela irá se abrir com mais instruções
                  para finaizar a compra.
                </p>
              </AccordionBody>
            </Accordion>
          </div>
        </div>
        <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-2xl rounded-xl shadow-uniform-shadow flex-grow">
          <div className="h-full rounded-lg max-w-6xl ml-5 mr-5 mt-5">
            <div className="w-fit font-semibold text-[18px] mb-2">
              Resumo da Pedido:
            </div>
          </div>
        </div>
      </div>*/}
      {/*}
      <div className=" m-auto max-w-6xl rounded-xl grid sm:grid-cols-2 grid-cols-1">
        <button className="border border-bluePrime p-2 sm:mr-2 m-1 rounded-lg font-bold">
          Voltar para planos
        </button>
        <button className="bg-bluePrime p-2 sm:ml-2 m-1 rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300">
          Avançar
        </button>
      </div>
              */}
    </div>
  );
}
