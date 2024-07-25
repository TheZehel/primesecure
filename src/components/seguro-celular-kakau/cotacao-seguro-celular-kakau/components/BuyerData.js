import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import GlobalFuntions from "../../../globalsubcomponentes/globalFunctions";
import InputMask from "react-input-mask";
import axios from "axios";
import { Checkbox, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import "animate.css";

import DisplayMessage from "../components/subcomponents/DisplayMessage";

import ValidateSteps from "./modules/_validations";

import ProgressManager from "./modules/progress";

const validate = new ValidateSteps();

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

const props = ["name", "email", "phone", "cpf", "rg", "birth", "check"];

//instância da classe GlobalFuntions
const functions = new GlobalFuntions();
const progress = new ProgressManager();

//console.log("apiUrl", apiUrl);

export default function BuyerData({ updateForm, steps, couponData }) {
  const [errorList, setErrorList] = useState([]);
  const [alertMessages, setAlertMessages] = useState([]);
  const navigate = useNavigate();

  var alertTimeout = null;

  useEffect(() => {
    // Assume-se que o índice da etapa atual é 1
    const currentStepIndex = 1;
    const lastCompletedStepIndex = parseInt(
      sessionStorage.getItem("lastCompletedStepIndex") || "0",
      10
    );

    // Se o índice da etapa atual for maior que o índice da última etapa completada + 1
    // Redireciona o usuário para a última etapa completada ou para a primeira etapa se nenhuma foi completada
    if (currentStepIndex > lastCompletedStepIndex + 1) {
      navigate("/seguro-celular-kakau/cotacao/"); // Ou outra lógica de redirecionamento baseada no índice
    }
  }, [navigate]);

  useEffect(() => {
    const loadFormData = () => {
      const savedFormData = sessionStorage.getItem("phoneFormData");
      const savedLpFormData = sessionStorage.getItem("formData");

      if (savedFormData || savedLpFormData) {
        var formData = {};
        var lpFormData = {};

        try {
          formData = JSON.parse(savedFormData) || {};
        }catch(e){
          formData = {};
        }

        try {
          lpFormData = JSON.parse(savedLpFormData) || {};
        }catch(e){
          lpFormData = {};
        }

        if (!formData.buyerData) formData.buyerData = {};        

        if (lpFormData.buyerData) lpFormData.buyerData = {};
        

        for (let prop of props) {
          if (formData.buyerData[prop] === undefined) {
            formData.buyerData[prop] = "";

            if (prop === "check") formData.buyerData[prop] = false;            
          }
        }

        for (let prop of ["name", "email", "phone"]) {
          if (lpFormData[prop] !== undefined && !formData.buyerData[prop]) formData.buyerData[prop] = lpFormData[prop];
        }

        const { name, email, phone, cpf, rg, birth, check } =
          formData.buyerData || {};

        setUserData({ name, email, phone, cpf, rg, birth, check });
      }
    };

    loadFormData();
  }, []);

  const phoneInputRef = useRef(null);

  const [validationErrors, setValidationErrors] = useState({});

  const [userData, setUserData] = useState(() => {
    // Tenta recuperar os dados do usuário de uma etapa anterior do sessionStorage
    const savedFormData = sessionStorage.getItem("phoneFormData");

    let initialUserData = {
      name: "",
      email: "",
      phone: "",
      check: false,
    };

    // Puxas as infos do localstorage
    if (savedFormData) {
      var formData = null;
      
      try {
        formData = JSON.parse(savedFormData) || {};
      } catch (e) {
        formData = {};
      }

      const { name, email, phone, cpf } = formData || {};

      initialUserData = {
        ...initialUserData,
        name: name || initialUserData.name,
        email: email || initialUserData.email,
        phone: phone || initialUserData.phone,
        cpf: cpf || initialUserData.cpf,
      };
    }
    //console.log("initialUserData:", initialUserData);

    //for(let prop of props) {
    //  if (initialUserData[prop] === undefined) {
    //    initialUserData[prop] = "";

    //    if (prop === "check") {
    //      initialUserData[prop] = false;
    //    }
    //  }
    //}

    console.log("formData:", initialUserData);
    return initialUserData;
  });

  const handleNavigateToPrivacyPolicy = () => {
    navigate("/politicas-de-privacidade");
  };

  //console.log("USERDATA", userData);

  const inputHandler = (e) => {
    var value = e.target.value;
    var name = e.target.name;

    if (errorList.includes(name)) {
      var errors = [...errorList].filter((item) => item !== name);
      //console.log(errors);
      setErrorList(errors);
    }

    if (name == "checkbox") {
      value = !userData.check;

      setUserData({
        ...userData,
        check: value,
      });

      updateForm("userData", name, value);

      return;
    }

    //if (name == "phone") {
    //  //console.log(value);
    //  let phoneValue = value.toString().replace(/\D/g, "");

    //  if (phoneValue.length > 10) {
    //    value = phoneValue.replace(
    //      /(\d{2})(\d{1})(\d{4})(\d{4})/,
    //      "($1) $2.$3-$4"
    //    );

    //    if (phoneMask != "(99) 9.9999-9999") {
    //      setPhoneMask("(99) 9.9999-9999");
    //    }
    //  } else {
    //    value = phoneValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

    //    if (phoneMask != "(99) 9999-99999") {
    //      setPhoneMask("(99) 9999-99999");
    //    }
    //  }
    //}

    userData[name] = value;

    setUserData({ ...userData });

    updateForm("userData", name, value);
  };

  const handleSubmit = async (e) => {
    // Previne o comportamento padrão do formulário
    e.preventDefault();

    // Lista temporária para erros
    let errorListTemp = [];

    try {
      const { 
        name = "", 
        email = "", 
        phone = "", 
        cpf = "", 
        rg = "", 
        birth = "", 
        check = false
      } = userData;

      let errors = validate.validateSecondStep({ name, email, phone, cpf, rg, birth, check });

      errorListTemp = [...errors ];

      console.log("Errors:", errorListTemp);

      setErrorList(errorListTemp);

      if (errorListTemp.length > 0) {
        await progress.updateDegubLogData({ ...userData }, 2, errorList);
        return;
      }

      await axios.post(`${apiUrl}/kakau-phone/checkout/check-for-duplicates`, {email, cpf})
        .then((response)=>{
          console.log('Response:', response.data);
        })
        .catch((err) => {
          let error = err;

          if (error && error.response) error = error.response;
          if (error && error.data) error = error.data;

          console.error("Error List:", error);

          var { errorList = [] } = error;

          if (Array.isArray(errorList)) {
            clearTimeout(alertTimeout);
            alertTimeout = setTimeout(() => {
              setAlertMessages([]);
            }, 8000);

            if (errorList.includes('cpf-in-use')) {
              errorListTemp.push('cpf');
              errorListTemp.push('email');

              setErrorList([...errorList, 'cpf', 'email']);
              setAlertMessages(['cpf-in-use']);

              return;
            } 

            if (errorList.includes('email-in-use')) { 
              errorListTemp.push('email');
              errorListTemp.push('cpf');

              setErrorList([...errorList, 'cpf', 'email']);
              setAlertMessages(['email-in-use']); 
            }  
          }
        });


      if (errorListTemp.length > 0) {
        await progress.updateDegubLogData({ ...userData }, 2, errorList);
        return;
      }

      clearTimeout(alertTimeout);
      setAlertMessages([]);
      setErrorList([]);
      
      // Obtenção ou inicialização do formData
      const storage = sessionStorage.getItem("phoneFormData");
      var currentData = {};

      try {
        currentData = JSON.parse(storage) || {};
      }catch(e){
        currentData = {};
      }

      const updatedData = {
        ...currentData,
        buyerData: userData, // Aqui, estamos assumindo que userData contém os dados do comprador
      };

      // Salva o formData atualizado no sessionStorage
      sessionStorage.setItem("phoneFormData", JSON.stringify(updatedData));

      const currentStepIndex = 1; // Esta é a segunda etapa, então o índice é 1

      sessionStorage.setItem(
        "lastCompletedStepIndex",
        currentStepIndex.toString()
      );

      await progress.updateDegubLogData({ ...userData }, 2, false);

      progress.redirectWithParams("/seguro-celular-kakau/cotacao/endereco", {}, navigate);

      //navigate("/seguro-celular-kakau/cotacao/endereco");
    }catch(e) {
      errorListTemp.push("unhandled-error");

      await progress.updateDegubLogData({ ...userData }, 2, errorList);
      setErrorList(errorListTemp);

      console.error('Unhandled Error:', e);    
    }
  };

  const navigateToQuotation = async() => {
    //Envia um evento para o DataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "voltar-cotacao-celular-kakau",
      // Aqui pode adicionar mais propriedades ao evento, se necessário
    });

    await progress.navigateTo(1, "/seguro-celular-kakau/cotacao", navigate);
    //navigate("/seguro-celular-kakau/cotacao");
  };

  return (
    <div className=" mx-2 relative">
      <DisplayMessage alert="error" messages={[...alertMessages]} />
      <LayoutCotacaoPlanos title="Informações para o seguro" position={1} couponData={couponData} />
      <section className="mt-3 sm:mt-3 flex justify-center w-full animate__animated animate__fadeInRight">
        <div className="w-full max-w-[1025px]">
          <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
            {/* Nome, Email, Telefone */}
            <div className="w-full md:w-1/2 px-2 mb-4">
              <input
                name="name"
                type="text"
                className={`inputClass ${
                  errorList.includes("name")
                    ? "border-red-500 animate__animated animate__bounce w-full  rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime "
                }`}
                placeholder="Nome Completo"
                value={userData.name}
                onChange={inputHandler}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              <input
                name="email"
                type="text"
                color={`${errorList.includes("email") ? "red" : "gray"}`}
                className={`inputClass ${
                  errorList.includes("email")
                    ? "border-red-500 animate__animated animate__bounce w-full mt-4 rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                }`}
                placeholder="E-mail"
                value={userData.email}
                onChange={inputHandler}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              <InputMask
                name="phone"
                type="text"
                className={`inputClass ${
                  errorList.includes("phone")
                    ? "border-red-500 animate__animated animate__bounce w-full mt-4 rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                }`}
                placeholder="Telefone"
                mask="(99) 99999-9999"
                value={userData.phone}
                onChange={inputHandler}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
            </div>
            {/* Cpf, RG, Telefone */}
            <div className="w-full md:w-1/2 px-2 mb-4">
              <InputMask
                type="text"
                className={`inputClass ${
                  errorList.includes("rg")
                    ? "border-red-500 animate__animated animate__bounce w-full rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime "
                }`}
                placeholder="RG"
                maxLength="90"
                mask="99.999.999-9"
                onChange={inputHandler}
                value={userData.rg}
                name="rg"
                maskChar={null}
                title="Preencha seu CPF"
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              <InputMask
                type="text"
                className={`inputClass ${
                  errorList.includes("cpf")
                    ? "border-red-500 animate__animated animate__bounce w-full mt-4 rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                }`}
                placeholder="CPF"
                maxLength="90"
                mask="999.999.999-99"
                onChange={inputHandler}
                value={userData.cpf}
                name="cpf"
                maskChar={null}
                title="Preencha seu CPF"
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              <InputMask
                type="text"
                className={`inputClass ${
                  errorList.includes("birth")
                    ? "border-red-500 animate__animated animate__bounce w-full mt-4 rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                }`}
                placeholder="Data de Nascimento"
                maxLength="20"
                onChange={inputHandler}
                value={userData.birth}
                name="birth"
                mask="99/99/9999"
                title="Insira sua data de nascimento"
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              {/* Este espaço é reservado para os inputs ou conteúdos que você quer na segunda coluna no desktop */}
            </div>
            <div className="w-full px-2">
              <Checkbox
                name="checkbox"
                checked={userData.check}
                onChange={inputHandler}
                label={
                  <Typography
                    variant="small"
                    color={`${errorList.includes("check") ? "red" : "gray"}`}
                  >
                    Eu aceito os
                    <button
                      onClick={handleNavigateToPrivacyPolicy}
                      className="font-medium transition-colors hover:text-bluePrime2"
                    >
                      &nbsp;Termos & Condições
                    </button>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
            </div>
            <div className="w-full m-auto max-w-6xl mt-3 rounded-xl grid gap-2 grid-cols-1 px-2">
              <button
                onClick={navigateToQuotation}
                className="h-14 w-full rounded-md shadow flex items-center justify-center cursor-pointer mt-4 font-bold border border-bluePrime p-2 order-2 md:order-1 block md:hidden"
              >
                Voltar para cotação
              </button>
              <button
                type="submit"
                className="h-14 w-full bg-cyan-500 hover:bg-bluePrime2 rounded-md shadow text-white flex items-center justify-center cursor-pointer mt-4 font-bold order-1 md:order-2"
                onClick={(e) => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "dados-comprador-adicionados-celular-kakau",
                  });
                }}
              >
                Prosseguir
              </button>
            </div>
          </form>
        </div>
      </section>
      <div className={`w-full mx-auto left-0 right-0 max-w-screen-lg absolute top-0 flex hidden md:block`}>
        <button
          onClick={navigateToQuotation}
          className="mt-4 flex px-8 my-auto top-0 h-[45px] justify-center items-center py-4 bg-gray-400 opacity-80 rounded-md cursor-pointer border-none font-bold text-lg leading-7 transition-all duration-300 hover:brightness-110 text-white"
        >
          Voltar
        </button>        
      </div>
    </div>
  );
}
