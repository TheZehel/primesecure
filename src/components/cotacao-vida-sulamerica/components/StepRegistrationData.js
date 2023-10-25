import React, { useState } from "react";
import InputMask from "react-input-mask";

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
}) {
  // formata salva os valores do inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Atualize o estado do formulário
    updateFormData({ [name]: value });
  };

  const [checkboxState, setCheckboxState] = useState({
    allowAcess: false,
    denyAcess: false,
  });

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
                maxLength="90"
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
                maxLength="90"
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
            <div className="flex flex-col sm:flex-row m-auto">
              <select
                type="select"
                className="cursor-pointer sm:w-full max-w h-12 py-1 px-4 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Selecione o seu Peso"
                onChange={handleChange}
                value={formData.weight || ""}
                name="weight"
                title="Peso"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              >
                <option value="" disabled selected>
                  Seu Peso
                </option>
                <option value="0">Entre 40kg e 60kg</option>
                <option value="1">Entre 60kg e 80kg</option>
                <option value="2">Entre 80kg e 100kg</option>
                <option value="3">Entre 100kg e 120kg</option>
              </select>
              <select
                type="select"
                className="cursor-pointer sm:w-full max-w h-12 py-1 px-4 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Selecione Sua Altura"
                onChange={handleChange}
                value={formData.height || ""}
                name="height"
                title="Peso"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              >
                <option value="" disabled selected>
                  Sua Altura
                </option>
                <option value="0">Entre 40cm e 60cm</option>
                <option value="1">Entre 60cm e 80cm</option>
                <option value="2">Entre 80cm e 100cm</option>
                <option value="3">Entre 100cm e 120cm</option>
                <option value="4">Entre 120cm e 140cm</option>
                <option value="5">Entre 140cm e 160cm</option>
              </select>
            </div>
            <div className="flex flex-col m-auto">
              <InputMask
                type="text"
                className={`max-w h-12 px-4 py-2 m-1 my-1 ${
                  isEmailValid ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={isEmailValid ? "E-mail" : "E-mail inválido"}
                maxLength="60"
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
                className={`max-w h-12 px-4 py-2 m-1 my-1 ${
                  isValidBirthDate ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={
                  isValidBirthDate
                    ? "Data de Nascimento"
                    : "Você é Menor de Idade"
                }
                maxLength="20"
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
                className="cursor-pointer sm:w-full max-w h-12 py-1 px-4 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Sexo de Nascimento"
                maxLength="20"
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
                <option value="0">Masculino</option>
                <option value="1">Feminino</option>
                <option value="2">Outro</option>
              </select>
            </div>
            <div className="flex flex-col m-auto">
              <select
                type="select"
                className="cursor-pointer max-w h-12 px-4 py-1 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Ocupação Atual"
                maxLength="20"
                onChange={handleChange}
                value={formData.office || ""}
                name="office"
                title="Ocupação Atual"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              >
                <option value="" disabled selected>
                  Ocupação Atual
                </option>
                <option value="0">Jardineiro</option>
                <option value="1">Engenheiro de Prompt</option>
                <option value="2">Gamer</option>
              </select>
              <InputMask
                key={refreshPhone}
                type="text"
                className={`max-w h-12 px-4 py-2 m-1 my-1 ${
                  isValidPhone ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={isValidPhone ? "Telefone" : "Formato inválido"}
                mask=""
                maxLength="15"
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
              checked={checkboxState.allowAccess}
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
              checked={checkboxState.denyAccess}
              onChange={handleCheckboxChange}
              id=""
            />
            <p className="pl-2">
              Não, desejo que o corretor não tenha acesso aos meus dados
            </p>
          </div>
          <div className="text-start mx-4 my-5 flex flex-col items-start  font-bold">
            {!checkboxState.allowAccess && (
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
