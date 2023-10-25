import React, { useState, useEffect, useCallback } from "react";
import StepRegistrationData from "./StepRegistrationData";
import StepAddress from "./StepAddress";
import StepPayment from "./StepPayment";
import PlanSlider from "./StepPlans";

export default function StepsHandler() {
  // DEFINIÇÃO DOS ESTADOS
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [nextClicked, setNextClicked] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isNameValid, setNameValid] = useState(true);
  const [isValidCpf, setValidCpf] = useState(true);
  const [isValidBirthDate, setBirthDateValid] = useState(true);
  const [isValidPhone, setPhoneValid] = useState(true);
  const [refreshEmail, setRefreshEmail] = useState(false);
  const [refreshName, setRefreshName] = useState(false);
  const [refreshCpf, setRefreshCpf] = useState(false);
  const [refreshBirth, setRefreshBirth] = useState(false);
  const [refreshPhone, setRefreshPhone] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  // ATUALIZA O FORMDATA
  const updateFormData = useCallback((newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  console.log(formData);

  const nextStep = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    setCurrentStep(currentStep + 1);
  };

  const handleNextClick = () => {
    if (currentStep === 1) {
      // Supondo que o StepRegistrationData seja o passo 1
      // Validação do e-mail
      const email = formData.email;
      const emailPattern =
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|live\.com|outlook\.com)$/;
      const isValidEmail = emailPattern.test(email);
      setEmailValid(isValidEmail); // Atualiza o estado de validade do e-mail

      // Validação do nome
      const name = formData.name || "";
      const nameParts = name.trim().split(" ");
      const isValidName = nameParts.length >= 2;
      setNameValid(isValidName); // Atualiza o estado de validade do nome

      // Validação CPF
      const cpf = formData.cpf;
      const cpfPattern = /^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/;
      const isValidCpf = cpfPattern.test(cpf);
      setValidCpf(isValidCpf);

      //validação data de nascimento
      const birthDate = new Date(formData.birth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        // eslint-disable-next-line no-const-assign
        age--;
      }

      if (age >= 18) {
        setBirthDateValid(true);
      } else {
        setBirthDateValid(false);
      }

      // validação telefone
      const phone = formData.phone;
      const phonePatterns = [
        /^\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}$/,
        /^\([0-9]{2}\)\s[0-9]{4}-[0-9]{5}$/,
        /^\([0-9]{2}\)\s[0-9]{4}-[0-9]{4}$/,
      ];
      const isValidPhone = phonePatterns.some((pattern) => pattern.test(phone));
      setPhoneValid(isValidPhone);

      if (
        isValidEmail &&
        isValidName &&
        isValidCpf &&
        isValidBirthDate &&
        isValidPhone
      ) {
        nextStep(); // Avança para o próximo passo apenas se ambos os campos forem válidos
      } else {
        // Limpa os campos inválidos e força a remontagem dos componentes correspondentes
        if (!isValidEmail) {
          updateFormData({ email: "" });
          setRefreshEmail(!refreshEmail);
        }
        if (!isValidName) {
          updateFormData({ name: "" });
          setRefreshName(!refreshName);
        }
        if (!isValidCpf) {
          updateFormData({ cpf: "" });
          setRefreshCpf(!refreshCpf);
        }
        if (!isValidBirthDate) {
          updateFormData({ birth: "" });
          setRefreshBirth(!refreshBirth);
        }
        if (!isValidPhone) {
          updateFormData({ phone: "" });
          setRefreshPhone(!refreshPhone);
        }
      }
    } else {
      nextStep(); // Se não estiver no passo 1, avança normal
    }
  };

  // Atualiza formData quando selectedPlanId muda
  useEffect(() => {
    if (selectedPlanId !== null) {
      updateFormData({ selectedPlanId });
    }
  }, [selectedPlanId, updateFormData]);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // define os titulos das etapas no array
  const stepTitles = [
    "",
    "Dados Cadastrais",
    "Planos",
    "Endereço",
    "Finalize o Pagamento",
  ];

  return (
    <div className="font-montserrat mx-2 py-6 ">
      <div>
        <h1 className="text-4xl font-medium text-center ">
          {stepTitles[currentStep]}
        </h1>
        <p>Descrição da Etapa</p>
        <div className="flex justify-center items-center h-full w-full mt-2">
          <div className="flex space-x-2">
            <div
              className={`w-10 h-2 rounded-lg border ${
                currentStep >= 1
                  ? "bg-cyan-500 w-20"
                  : "bg-white border-cyan-500"
              }`}
            />
            <div
              className={`w-10 h-2 rounded-lg ${
                currentStep >= 2
                  ? "bg-cyan-500 w-20"
                  : "bg-white border border-cyan-500"
              }`}
            />
            <div
              className={`w-10 h-2 rounded-lg ${
                currentStep >= 3
                  ? "bg-cyan-500 w-20"
                  : "bg-white border border-cyan-500"
              }`}
            />
            <div
              className={`w-10 h-2 rounded-lg ${
                currentStep >= 4
                  ? "bg-cyan-500 w-20"
                  : "bg-white border border-cyan-500"
              }`}
            />
          </div>
        </div>
        {currentStep === 1 && (
          <StepRegistrationData
            isEmailValid={isEmailValid}
            isNameValid={isNameValid}
            isValidCpf={isValidCpf}
            isValidBirthDate={isValidBirthDate}
            isValidPhone={isValidPhone}
            nextClicked={nextClicked}
            updateFormData={updateFormData}
            formData={formData}
            refreshEmail={refreshEmail}
            refreshName={refreshName}
            refreshCpf={refreshCpf}
            refreshBirth={refreshBirth}
            refreshPhone={refreshPhone}
            setAllowAccess={setAllowAccess}
          />
        )}
        {currentStep === 2 && (
          <PlanSlider
            selectedPlanId={selectedPlanId}
            setSelectedPlanId={setSelectedPlanId}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 3 && <StepAddress updateFormData={updateFormData} />}
        {currentStep === 4 && <StepPayment />}
      </div>
      <div className="m-auto max-w-6xl rounded-xl grid sm:grid-cols-2 grid-cols-1">
        {currentStep > 1 && (
          <button
            className="border border-bluePrime p-2 m-2 rounded-lg font-bold"
            onClick={prevStep}
          >
            Voltar
          </button>
        )}
        {currentStep < 4 && (
          <button
            className={`bg-bluePrime p-2 m-2 rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300 ${
              !allowAccess ? "bg-gray-400" : ""
            }`}
            onClick={handleNextClick}
            disabled={!allowAccess}
          >
            Avançar
          </button>
        )}
      </div>
    </div>
  );
}
