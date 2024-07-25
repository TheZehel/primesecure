import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import GlobalFuntions from "./globalsubcomponentes/globalFunctions";
import InputMask from "react-input-mask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "animate.css";

export default function SignUp() {
  const [errorList, setErrorList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirm_email: "",
    cpf: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const functions = new GlobalFuntions();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Remover o campo do errorList se o erro for corrigido
    if (errorList.includes(name)) {
      const updatedErrors = errorList.filter((error) => error !== name);
      setErrorList(updatedErrors);
    }
  };

  const validateForm = () => {
    const errors = [];
    const functions = new GlobalFuntions();

    if (!functions.validateNameLastName(formData.name)) {
      errors.push("name");
    }

    if (!functions.validateEmail(formData.email)) {
      errors.push("email");
    }

    if (formData.email !== formData.confirm_email) {
      errors.push("confirm_email");
    }

    if (!functions.validateCPF(formData.cpf)) {
      errors.push("cpf");
    }

    if (!functions.validatePassword(formData.password)) {
      errors.push("password");
    }

    if (formData.password !== formData.confirm_password) {
      errors.push("confirm_password");
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const errors = validateForm();

    if (errors.length > 0) {
      setErrorList(errors);
      return; // Para a execução se houver erros
    }

    // Prossiga com a navegação ou submissão dos dados aqui
    navigateToLogin();
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-grayPrime">
            Cadastre sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-start leading-6 text-grayPrime">
                Nome Completo
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleInputChange}
                  value={formData.name}
                  className={`inputClass ${
                    errorList.includes("name")
                      ? "border-red-500 block w-full rounded-md  py-1.5 animate__animated animate__shakeX"
                      : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  }`}
                />
                {errorList.includes("name") && (
                  <p className="text-red-500 text-xs mt-1">Nome Inválido</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-start leading-6 text-grayPrime">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  className={`inputClass ${
                    errorList.includes("email")
                      ? "border-red-500 block w-full rounded-md  py-1.5 animate__animated animate__shakeX"
                      : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  }`}
                />
                {errorList.includes("email") && (
                  <p className="text-red-500 text-xs mt-1">
                    O campo e-mail é obrigatório
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-start leading-6 text-grayPrime">
                Confirme seu e-mail
              </label>
              <div className="mt-2">
                <input
                  id="confirm_email"
                  name="confirm_email"
                  type="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  value={formData.confirm_email}
                  className={`inputClass ${
                    errorList.includes("confirm_email")
                      ? "border-red-500 block w-full rounded-md  py-1.5 animate__animated animate__shakeX"
                      : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  }`}
                />
                {errorList.includes("confirm_email") && (
                  <p className="text-red-500 text-xs mt-1">
                    Os e-mail's precisam ser idênticos
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-start leading-6 text-grayPrime">
                Cpf
              </label>
              <div className="mt-2">
                <InputMask
                  id="cpf"
                  name="cpf"
                  type="text"
                  onChange={handleInputChange}
                  value={formData.cpf}
                  maskChar={null}
                  mask="999.999.999-99"
                  className={`inputClass ${
                    errorList.includes("cpf")
                      ? "border-red-500 block w-full rounded-md  py-1.5 animate__animated animate__shakeX"
                      : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  }`}
                />
                {errorList.includes("cpf") && (
                  <p className="text-red-500 text-xs mt-1">
                    O Cpf informado é inválido
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-start leading-6 text-grayPrime">
                  Senha
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange}
                  value={formData.password}
                  className={`inputClass ${
                    errorList.includes("password")
                      ? "border-red-500 block w-full rounded-md  py-1.5 animate__animated animate__shakeX"
                      : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  }`}
                />
                {errorList.includes("password") && (
                  <p className="text-red-500 text-xs mt-1">
                    A senha precisa ter no mínimo 8 caracteres, 1 letra
                    maiúscula, 1 letra minúscula e 1 número
                  </p>
                )}

                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                  style={{
                    top: errorList.includes("password")
                      ? "calc(50% - 20px)"
                      : "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <label className="block text-sm font-bold text-start leading-6 text-grayPrime">
                  Confirme sua Senha
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handleInputChange}
                  value={formData.confirm_password}
                  className={`inputClass ${
                    errorList.includes("confirm_password")
                      ? "border-red-500 block w-full rounded-md  py-1.5 animate__animated animate__shakeX"
                      : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  }`}
                />
                {errorList.includes("confirm_password") && (
                  <p className="text-red-500 text-xs mt-1">
                    As senhas precisam ser idênticas
                  </p>
                )}

                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                  style={{
                    top: errorList.includes("confirm_password")
                      ? "calc(50% - 10px)"
                      : "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-bluePrime px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-bluePrime2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bluePrime"
              >
                Criar Conta
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já possui conta criada?{" "}
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="font-semibold leading-6 text-bluePrime hover:text-bluePrime2"
            >
              acessar conta
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
