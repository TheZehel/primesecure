import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import axios from "axios";

const enviroment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${(enviroment)}`];

export default function StepRegistrationData({
  updateFormData,
  formData,
  isEmailValid,
  isNameValid,
  isValidCpf,
  isValidBirthDate,
  isValidPhone,
  nextClicked,
  refreshEmail,
  refreshName,
  refreshCpf,
  refreshBirth,
  refreshPhone,
  setAllowAccess,
  isValidWeight,
  isValidHeight,
  isValidGender,
  isValidOccupation
}) {
  const [genderOptions, setGenderOptions] = useState([]);
  const [professionOptions, setProfessionOptions] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);
  const [heightOptions, setHeightOptions] = useState([]);
  const [requestSuccess, setRequestSuccess] = useState(false);
  // formata salva os valores do inputs
  const handleChange = (e) => {
    var { name, value } = e.target;

    if (name == "name" && /\s{2,}/.test(value)) {
      value = value.replace(/\s{2,}/g, " ");      
    }

    if (name == "phone") {
      let phoneString = value.replace(/\D/g, "");

      if (phoneString.length > 10) {
        value = phoneString.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

        if (phoneMask != "(99) 99999-9999") {
          setPhoneMask("(99) 99999-9999");
        }
      } else {
        value = phoneString.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

        if (phoneMask != "(99) 9999-99999") {
          setPhoneMask("(99) 9999-99999");
        }
      }
    }

    // Atualize o estado do formulário
    updateFormData({ [name]: value });
  };

  const [checkboxState, setCheckboxState] = useState({
    allowAccess: false,
    denyAccess: false,
  });

  const [phoneMask, setPhoneMask] = useState("(99) 9999-99999");

  const handleCheckboxChange = (e) => {
    const { name } = e.target;

    // Atualiza o estado local do checkbox
    setCheckboxState({
      allowAccess: false,
      denyAccess: false,
      [name]: true,
    });

    // Atualiza o estado do formData
    updateFormData({ access: name === "allowAccess" ? "Permitido" : "Negado" });

    // Atualiza o estado de allowAccess no componente StepsHandler
    setAllowAccess(name === "allowAccess");
  };

  useEffect(()=>{
    try {
      if (requestSuccess){
        return;
      }

      axios.get(`${apiUrl}/vida-sulamerica/data/getUserData`)
        .then((response) => {
          let { data } = response;
          data = { ...data };
          
          setRequestSuccess(true);

          setGenderOptions([...data.gender]);
          setWeightOptions([...data.weight]);
          setHeightOptions([...data.height]);
          setProfessionOptions([...data.profession]);

          console.log('Cotation Data:', data);
        })
        .catch((error) => {
          console.error('Erro na requisição dos dados do cotador!');
        });

    }catch(e){
      console.error('Erro ao recuperar dados do cotador!');
    }
  }, []);
  //console.log(formData);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl mt-5 mb-1 rounded-xl grid sm:grid-cols-2 grid-cols-1">
          <div className=" m-2">
            <div className="flex flex-col m-auto">
              <input
                refresh={refreshName}
                type="text"
                className={`max-w h-12 px-4 py-2 m-1 my-1 ${
                  isNameValid ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={
                  isNameValid ? "Nome completo" : "Preencha o nome completo"
                }
                onChange={handleChange}
                value={formData.name || ""}
                name="name"
                title="Preencha com o seu nome completo"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                  animation: isNameValid ? "none" : "bounce 0.5s ease",
                }}
              />
              <InputMask
                key={refreshCpf}
                type="text"
                className={`max-w h-12 px-4 py-2 m-1 my-1 ${
                  isValidCpf ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={isValidCpf ? "CPF" : "CPF Inválido"}
                mask="999.999.999-99"
                onChange={handleChange}
                value={formData.cpf || ""}
                name="cpf"
                maskChar={null}
                title="Preencha seu CPF"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                  animation: isValidCpf ? "none" : "bounce 0.5s ease",
                }}
              />
            </div>
            {/*<div className="flex flex-col sm:flex-row m-auto">
              <select
                type="select"
                className={`cursor-pointer sm:w-full max-w h-12 py-1 px-4 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${isValidWeight ? "ring-bluePrime" : "ring-red-500"}`}
                placeholder="Selecione o seu Peso"
                onChange={handleChange}
                value={formData.weight || ""}
                name="weight"
                title="Peso"
                style={{
                  fontSize: "18px",
                  caretColor: "#03a8db 2px",
                }}
              >
                <option value="" disabled selected>
                  Seu Peso
                </option>
                {
                  weightOptions.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
                    </option>
                  ))
                }
              </select>
              <select
                type="select"
                className={`cursor-pointer sm:w-full max-w h-12 py-1 px-4 mx-1 my-1 ring-bluePrime border-0 text-2xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${isValidHeight ? "ring-bluePrime" : "ring-red-500"}`}
                placeholder="Selecione Sua Altura"
                onChange={handleChange}
                value={formData.height || ""}
                name="height"
                title="Peso"
                style={{
                  fontSize: "18px",
                  caretColor: "#03a8db 2px",
                }}
              >
                <option value="" disabled selected>
                  Sua Altura
                </option>
                {
                  heightOptions.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
                    </option>
                  ))
                }
              </select>
              </div>*/}
            <div className="flex flex-col m-auto">
              <InputMask
                type="text"
                className={`max-w h-12 px-4 py-2 m-1 my-1 ${
                  isEmailValid ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={isEmailValid ? "E-mail" : "E-mail inválido"}
                key={refreshEmail}
                onChange={handleChange}
                value={formData.email || ""}
                name="email"
                title="Preencha com o seu e-mail"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                  animation: isEmailValid ? "none" : "bounce 0.5s ease",
                }}
              />
            </div>
          </div>
          <div className=" m-2">
            <div className="flex flex-col sm:flex-row m-auto">
              <InputMask
                key={refreshBirth}
                type="text"
                className={`sm:w-full max-w h-12 px-4 py-2 m-1 my-1 ${
                  isValidBirthDate ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={
                  isValidBirthDate
                    ? "Data de Nascimento"
                    : "Você deve ter 14 anos ou mais"
                }
                onChange={handleChange}
                value={formData.birth || ""}
                name="birth"
                mask="99/99/9999"
                title="Insira sua data de nascimento"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                  animation: isValidBirthDate ? "none" : "bounce 0.5s ease",
                }}
              />
              <select
                type="select"
                className={`cursor-pointer sm:w-full max-w h-12 py-1 px-4 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${isValidGender ? "ring-bluePrime" : "ring-red-500"}`}
                placeholder="Sexo de Nascimento"
                onChange={handleChange}
                value={formData.birthsex || ""}
                name="birthsex"
                title="Sexo de Nascimento"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              >
                <option value="" disabled selected>
                  Sexo de Nascimento
                </option>
                {
                  genderOptions.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col m-auto">
              <select
                type="select"
                className={`cursor-pointer max-w h-12 px-4 py-1 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${isValidOccupation ? "ring-bluePrime" : "ring-red-500"}`}
                placeholder="Ocupação Atual"
                onChange={handleChange}
                value={formData.office || ""}
                name="office"
                title="Ocupação Atual"
                style={{
                  fontSize: "18px",
                  caretColor: "#03a8db 2px",
                }}
              >
                <option value="" disabled selected>
                  Ocupação Atual
                </option>
                {
                  professionOptions.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
                    </option>
                  ))
                }
              </select>
              <InputMask
                key={refreshPhone}
                type="text"
                className={`max-w h-12 px-4 py-2 m-1 my-1 ${
                  isValidPhone ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={isValidPhone ? "Telefone" : "Formato inválido"}
                mask={phoneMask}
                maskChar={null}
                onChange={handleChange}
                value={formData.phone || ""}
                name="phone"
                title="Preencha com o seu nome completo"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                  animation: isValidPhone ? "none" : "bounce 0.5s ease",
                }}
              />
              {/*
              <InputMask
                type="text"
                className="max-w h-12 px-4 py-2 m-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Confirmação do e-mail"
                maxLength="90"
                onChange={handleChange}
                name="confirm-email"
                title="Confirme seu e-mail"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />*/}
            </div>
          </div>
        </div>
        <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl rounded-xl">
          <div className="text-start mx-4 flex items-start sm:items-center">
            <input
              className="accent-bluePrime sm:mt-0 mt-1 rounded-full"
              type="checkbox"
              name="allowAccess"
              checked={
                checkboxState.allowAccess || formData.access == "Permitido"
              }
              onChange={handleCheckboxChange}
              id=""
            />
            <p className="pl-2">
              Sim, permito que a PrimeSecure tenha acesso e visualize meus dados
            </p>
          </div>
          <div className="text-start mx-4 flex items-start sm:items-center">
            <input
              className="accent-bluePrime sm:mt-0 mt-1 rounded-full"
              type="checkbox"
              name="denyAccess"
              checked={checkboxState.denyAccess || formData.access == "Negado"}
              onChange={handleCheckboxChange}
              id=""
            />
            <p className="pl-2">
              Não, desejo que o corretor não tenha acesso aos meus dados
            </p>
          </div>
          <div className="text-start mx-4 my-5 flex flex-col items-start  font-bold">
            {((!checkboxState.allowAccess && formData.access != "Permitido") && formData.access !== undefined) && (
              <p className="text-red-600">
                Por favor, selecione "Sim" para prosseguir.
              </p>
            )}
            <p className="">
              Ao enviar seus dados você concorda com nossa{" "}
              <span className="text-bluePrime">
                <a href="www.google.com.br">política de privacidade</a>
              </span>
            </p>
          </div>
        </div>
        {/*
        <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl mt-5 mb-1 rounded-xl grid sm:grid-cols-2 grid-cols-1">
          <button className="border border-bluePrime p-2 m-2 rounded-lg font-bold">
            Voltar
          </button>
          <button className="bg-bluePrime p-2 m-2 rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300">
            Avançar
          </button>
            </div>*/}
      </div>
    </div>
  );
}
