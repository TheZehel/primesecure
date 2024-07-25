import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import GlobalFuntions from "../../../globalsubcomponentes/globalFunctions";
import InputMask from "react-input-mask";
import axios from "axios";
import { Checkbox, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import "animate.css";
import { Helmet } from "react-helmet";

import DisplayMessage from "../components/subcomponents/DisplayMessage";

import ValidateSteps from "./modules/_validations";

const validate = new ValidateSteps();

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

const props = ["name", "email", "phone", "cpf", "rg", "birth", "check"];

const functions = new GlobalFuntions();

//console.log("apiUrl", apiUrl);

export default function BuyerData({ updateForm, steps, coupon }) {
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
      navigate("/seguro-bike/cotacao/"); // Ou outra lógica de redirecionamento baseada no índice
    }
  }, [navigate]);

  useEffect(() => {
    const loadFormData = () => {
      const savedFormData = sessionStorage.getItem("bikeFormData");
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
    const savedFormData = sessionStorage.getItem("bikeFormData");

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

  //instância da classe GlobalFuntions
  

  console.log("USERDATA", userData);

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

      let debugToken = validate.getDebugToken();
      //console.log("Debug Token A", debugToken);    
        
      let params = functions.getParamsFromUrl();

      if (errorListTemp.length > 0) { 
        await axios.post(`${apiUrl}/kakau-bike/log-history/update`, { logToken: debugToken, step: 2, data: { ...userData, errors: errorListTemp }, error: true } )
          .then((response)=>{
            console.log("Usuário atualizado com sucesso", response.data);
            const { success, token } = response.data;

            console.log("Token", token, 'Success', success);     

            if (success && token) {    
              debugToken = token;
              validate.setDebugToken(token);   
            }
          })
          .catch((err)=>{
            let error = err;

            if (error && error.response) error = error.response;
            if (error && error.data) error = error.data;

            console.error("Erro ao atualizar usuário", error);
          });
          
        return;
      }

      await axios.post(`${apiUrl}/kakau-bike/process/check-for-duplicates`, {email, cpf})
        .then((response)=>{
          //console.log('Response:', response.data);
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


      if (errorListTemp.length > 0){ 
        await axios.post(`${apiUrl}/kakau-bike/log-history/update`, { logToken: debugToken, step: 2, data: { ...userData, errors: errorListTemp }, error: true } )
          .then((response)=>{
            console.log("Usuário atualizado com sucesso", response.data);
            const { success, token } = response.data;

            console.log("Token", token, 'Success', success);     

            if (success && token) {    
              debugToken = token;
              validate.setDebugToken(token);   
            }
          })
          .catch((err)=>{
            let error = err;

            if (error && error.response) error = error.response;
            if (error && error.data) error = error.data;

            console.error("Erro ao atualizar usuário", error);
          });
        return;
      }

      clearTimeout(alertTimeout);
      setAlertMessages([]);
      setErrorList([]);
      
      // Obtenção ou inicialização do formData
      const storage = sessionStorage.getItem("bikeFormData");
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
      sessionStorage.setItem("bikeFormData", JSON.stringify(updatedData));

      // Atualiza o progresso do usuário no processo
      const currentStepIndex = 1; // Esta é a segunda etapa, então o índice é 1

      sessionStorage.setItem(
        "lastCompletedStepIndex",
        currentStepIndex.toString()
      );

      await axios.post(`${apiUrl}/kakau-bike/log-history/update`, { logToken: debugToken, step: 2, data: { ...userData }, error: false } )
        .then((response)=>{
          console.log("Usuário atualizado com sucesso", response.data);
          const { success, token } = response.data;

          console.log("Token", token, 'Success', success);     

          if (success && token) {    
            debugToken = token;
            validate.setDebugToken(token);   
          }
        })
        .catch((err)=>{
          let error = err;

          if (error && error.response) error = error.response;
          if (error && error.data) error = error.data;

          console.error("Erro ao atualizar usuário", error);
        });

      let url = functions.setPathFromParams("/seguro-bike/cotacao/endereco", { ...params, t: debugToken });
      navigate(url);      
    }catch(e) {
      errorListTemp.push("unhandled-error");
      setErrorList(errorListTemp);

      console.error('Unhandled Error:', e);
    }

    return;

    // Validar Nome
    if (
      userData.name &&
      userData.name.trim() &&
      !functions.validateName(userData.name)
    )
      errorListTemp.push("name");
    // Validar Email
    if (
      userData.email &&
      userData.email.trim() &&
      !functions.validateEmail(userData.email)
    )
      errorListTemp.push("email");
    // Validar Telefone
    if (
      userData.phone &&
      userData.phone.trim() &&
      !functions.validatePhone(userData.phone)
    )
      errorListTemp.push("phone");
    // Validar CPF
    if (!functions.validateCPF(userData.cpf)) errorListTemp.push("cpf");
    // Validar RG
    if (!functions.validateRG(userData.rg)) errorListTemp.push("rg");
    // Verificar Checkbox
    if (!userData.check) errorListTemp.push("check");
    // Validar Data de Nascimento
    var birthday = functions.refactoryDate(
      userData.birth,
      "DD/MM/YYYY",
      "YYYY-MM-DD"
    );
    if (isNaN(new Date(birthday).getTime())) errorListTemp.push("birth");

    if (errorListTemp.length > 0) {
      setErrorList(errorListTemp);
    } else {
      setErrorList([]); // Limpa a lista de erros

      // Obtenção ou inicialização do formData
      const currentData = JSON.parse(sessionStorage.getItem("bikeFormData")) || {};

      const updatedData = {
        ...currentData,
        buyerData: userData, // Aqui, estamos assumindo que userData contém os dados do comprador
      };

      // Salva o formData atualizado no sessionStorage
      sessionStorage.setItem("bikeFormData", JSON.stringify(updatedData));

      // Atualiza o progresso do usuário no processo
      const currentStepIndex = 1; // Esta é a segunda etapa, então o índice é 1
      sessionStorage.setItem(
        "lastCompletedStepIndex",
        currentStepIndex.toString()
      );

      // Navega para a próxima etapa
      navigate("/seguro-bike/cotacao/endereco");
    }
  };

  //const [coupon, setCoupon] = useState({ code: "", type: "", value: 0, valid: false });  
  //setCouponData = (coupon) =>  setCoupon(coupon);

  return (
    <div className=" mx-2">
      <Helmet>
        <title>Dados Comprador | Cotação Seguro Bike </title>
      </Helmet>
      <DisplayMessage alert="error" messages={[...alertMessages]} />
      <LayoutCotacaoPlanos title="Informações para o seguro" position={1} couponData={coupon} />
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
            <div className="w-full px-2">
              <button
                type="submit"
                className="h-14 w-full bg-cyan-500 hover:bg-bluePrime2 rounded-md shadow text-white flex items-center justify-center cursor-pointer mt-4 font-bold"
                onClick={(e) => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "dados-comprador-adicionados-bike-kakau",
                  });
                }}
              >
                Prosseguir
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
