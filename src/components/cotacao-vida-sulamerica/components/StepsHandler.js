import React, { useState, useEffect, useCallback } from "react";
import StepRegistrationData from "./StepRegistrationData";
import StepAddress from "./StepAddress";
import StepPayment from "./StepPayment";
import PlanSlider from "./StepPlans";
import ThankYouPage from "./ThankYouPage";
import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate, useLocation } from "react-router";

import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";
import ProgressManager from "./modules/logHistory";

import { step } from "@material-tailwind/react";

const functions = new GlobalFuntions();
const progress = new ProgressManager();

export default function StepsHandler({recaptchaRef}) {
  const pageSlug = functions.getPageSlug();
  const pageSlugs = functions.getPageSlugArray();

  // DEFINIÇÃO DOS ESTADOS
  const [currentStep, setCurrentStep] = useState(1);
  const [firstInteraction, setFirstInteraction] = useState(true);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  //StepRegistrationData
  const [formData, setFormData] = useState({});
  const [nextClicked, setNextClicked] = useState(false);

  const [isEmailValid, setEmailValid] = useState(true);
  const [isNameValid, setNameValid] = useState(true);
  const [isValidCpf, setValidCpf] = useState(true);
  const [isValidBirthDate, setBirthDateValid] = useState(true);
  const [isValidPhone, setPhoneValid] = useState(true);
  const [isValidWeight, setValidWeight] = useState(true);
  const [isValidHeight, setValidHeight] = useState(true);
  const [isValidGender, setValidGender] = useState(true);
  const [isValidOccupation, setValidOccupation] = useState(true);
  

  const [refreshEmail, setRefreshEmail] = useState(false);
  const [refreshName, setRefreshName] = useState(false);
  const [refreshCpf, setRefreshCpf] = useState(false);
  const [refreshBirth, setRefreshBirth] = useState(false);
  const [refreshPhone, setRefreshPhone] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);

  //StepPlans
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [showPlanError, setShowPlanError] = useState(false);

  // Step Address
  const [isValidCep, setCepValid] = useState(true);
  const [isValidAddress, setValidAddress] = useState(true);
  const [isValidNumber, setValidNumber] = useState(true);
  const [isValidNeighborhood, setValidNeighborhood] = useState(true);
  const [isValidCity, setValidCity] = useState(true);
  const [isValidState, setValidState] = useState(true);

  const [refreshCep, setRefreshCep] = useState(false);
  const [refreshAddress, setRefreshAddress] = useState(false);
  const [refreshNumber, setRefreshNumber] = useState(false);
  const [refreshNeighborhood, setRefreshNeighborhood] = useState(false);
  const [refreshCity, setRefreshCity] = useState(false);
  const [refreshState, setRefreshState] = useState(false);

  const [loadCotation, setLoadCotation] = useState(false);

  //StepPayment
  const [isValidCardNumber, setValidCardNumber] = useState(true);
  const [isValidCardName, setValidCardName] = useState(true);
  const [isValidExpiryDate, setValidExpiryDate] = useState(true);
  const [isValidCvv, setValidCvv] = useState(true);
  const [refreshCardNumber, setRefreshCardNumber] = useState(false);
  const [refreshCardName, setRefreshCardName] = useState(false);
  const [refreshExpiryDate, setRefreshExpiryDate] = useState(false);
  const [refreshCvv, setRefreshCvv] = useState(false);

  //ThankYouPage
  const [thankYouToken, setThankYouToken] = useState(null);

  // RECAPTCHA
  const [v3Token, setV3Token] = useState(null);
  const [v2Token, setV2Token] = useState(null);
  
  const recaptchaV3Ref = React.createRef();

  //Log Token

  const navigate = useNavigate();
  const location = useLocation();

  // ATUALIZA O FORMDATA
  const updateFormData = useCallback((newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  //console.log(formData);

  //console.log(pageSlugs);

  const stepSlugs = [
    "", 
    "planos", 
    "endereco", 
    "pagamento", 
    "obrigado"
  ];

  const stepTitles = [
    "",
    "Dados Cadastrais",
    "Planos",
    "Endereço",
    "Finalize o Pagamento",
    "Pagamento Aprovado"
  ];

  const jumpToStep = (step) => {
    if (![1, 2, 3, 4].includes(step)) {
      return;
    }

    localStorage.setItem("vidaFormData", JSON.stringify(formData));

    setCurrentStep(step);
  };

  const nextStep = () => {
    localStorage.setItem("vidaFormData", JSON.stringify(formData));

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    const prevStep = currentStep - 1;
    const logData = { ...formData, step: prevStep };
    progress.updateLogData(logData, prevStep, false);
    
    setCurrentStep(prevStep);
  };

  const validateFirstStep = (changeStep, updateLog) => {
    const data = { ...formData };
    console.log('Validando primeira etapa');

    const {
      email,
      name,
      cpf,
      birth,
      phone
    } = data;

    console.log('Data:', data);

    let firstTime = true;
    let params = [email, name, cpf, birth, phone];

    for (let key in params) {
      let value = params[key];

      if (value !== undefined) {
        firstTime = false;
        break;
      }
    }
    var errors = [];    

    const isValidEmail = functions.validateEmail(email);
    setEmailValid(isValidEmail || email === undefined);
    if (!isValidEmail) errors.push("email");

    const isValidName = functions.validateNameLastName(name);
    setNameValid(isValidName || name === undefined);
    if (!isValidName) errors.push("name");

    const isValidCpf = functions.validateCPF(cpf);
    setValidCpf(isValidCpf || cpf === undefined);
    if (!isValidCpf) errors.push("cpf");

    const isValidPhone = functions.validatePhone(phone);
    setPhoneValid(isValidPhone || phone === undefined);
    if (!isValidPhone) errors.push("phone");

    let birthday = functions.refactoryDate(birth, 'DD/MM/YYYY', 'YYYY-MM-DD');
    let age = functions.calculateAge(birthday);

    if (age == 70) {
      let fullAge = functions.calculateFullAge(birthday);
      if (fullAge.months > 0) age = 70.5;
      else if (fullAge.days > 1) age = 70.5;
    }
    const isValidBirthDate = (age >= 14 && age <= 70);
    setBirthDateValid(isValidBirthDate || birth === undefined);
    if (!isValidBirthDate) errors.push("birthday");

    //optionals ???
    const isValidAccess = data.access == "Permitido" || data.access === true;
    setAllowAccess(isValidAccess || data.access === undefined);
    if (!isValidAccess) errors.push("access");

    const isValidWeight = true;///^[0-9]{1,2}$/.test(data.weight);
    setValidWeight(isValidWeight || data.weight === undefined);
    if (!isValidWeight) errors.push("weight");

    const isValidHeight = true;///^[0-9]{1,2}$/.test(data.height);
    setValidHeight(isValidHeight || data.height === undefined);
    if (!isValidHeight) errors.push("height");

    const isValidGender = /^[0-9]{1}$/.test(data.birthsex);
    setValidGender(isValidGender || data.birthsex === undefined);
    if (!isValidGender) errors.push("gender");

    const isValidOccupation = /^[0-9]{1,2}$/.test(data.office);
    setValidOccupation(isValidOccupation || data.office === undefined);
    if (!isValidOccupation) errors.push("occupation");

    if (updateLog) {
      const error = (errors.length > 0);
      const logData = { ...data, errors, step: 1 };

      progress.updateLogData(logData, 1, error);
    }

    if (isValidEmail && isValidName && isValidCpf && isValidBirthDate && isValidPhone && isValidAccess && isValidWeight && isValidHeight && isValidGender && isValidOccupation) {
      return true;
    }

    if (!changeStep) {
      return false;
    }    

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

    if (!isValidAccess) {
      updateFormData({ access: "" });
    }

    if (!isValidWeight) {
      updateFormData({ weight: "" });
    }

    if (!isValidHeight) {
      updateFormData({ height: "" });
    }

    if (!isValidGender) {
      updateFormData({ birthsex: "" });
    }

    if (!isValidOccupation) {
      updateFormData({ office: "" });
    }

    return false;
  }

  const validateSecondStep = (updateLog) => { 
    let data = { ...formData };

    if ((data && /^[0-9]{1}/.test(data.selectedPlanId)) || !data.selectedPlanId) {
      setShowPlanError(false); // esconde a mensagem de erro, se estiver sendo mostrada

      if (updateLog){
        const logData = { ...data, errors: [], step: 1 };
        progress.updateLogData(logData, 1, false);
      }

      return true; 
    } 
    
    console.log('Select Plan Id 1: ', formData.selectedPlanId)

    if (data.selectedPlanId < 0) setShowPlanError(true);

    if (updateLog){
      const logData = { ...data, step: 2 };
      progress.updateLogData(logData, 2, true);
    }

    return false;    
  }

  //console.log('Select Plan Id:', formData.selectedPlanId, 'Show Plan Error:', showPlanError)

  const validateThirdStep = (changeStep, updateLog) => {
    let data = { ...formData };
    const errors = [];

    const isValidCep = functions.validateCEP(data.cep);
    setCepValid(isValidCep || data.cep === undefined);
    if (!isValidCep) errors.push("cep");

    const isValidNumber = functions.validateStreetNumber(data.number);
    setValidNumber(isValidNumber || data.number === undefined);
    if (!isValidNumber) errors.push("number");

    const isValidAddress = functions.validateStreet(data.address);
    setValidAddress(isValidAddress || data.address === undefined);
    if (!isValidAddress) errors.push("address");

    const isValidNeighborhood = functions.validateNeighborhood(data.neighborhood);
    setValidNeighborhood(isValidNeighborhood || data.neighborhood === undefined);
    if (!isValidNeighborhood) errors.push("neighborhood");

    const isValidCity = functions.validateCity(data.city);
    setValidCity(isValidCity || data.city === undefined);
    if (!isValidCity) errors.push("city");

    const isValidState = functions.validateStateUF(data.state);
    setValidState(isValidState || data.state === undefined);
    if (!isValidState) errors.push("state");

    if (updateLog) {
      const error = (errors.length > 0);
      const logData = { ...data, errors, step: 3 };

      progress.updateLogData(logData, 3, error);
    }

    //console.log('address', isValidCep, data.cep, isValidAddress, data.address, isValidNumber, data.number, isValidNeighborhood, data.neighborhood, isValidCity, data.city, isValidState, data.state);

    if (isValidCep && isValidAddress && isValidNumber && isValidNeighborhood && isValidCity && isValidState) {
      return true;
    }

    if (!changeStep) {
      return false;
    }

    if (!isValidCep) {
      //updateFormData({ cep: "" });
      setRefreshCep(!refreshCep);
    }

    if (!isValidNumber){
      //updateFormData({ number: "" });
      setRefreshNumber(!refreshNumber);
    }

    if (!isValidAddress){
      //updateFormData({ address: "" });
      setRefreshAddress(!refreshAddress);
    }

    if (!isValidNeighborhood){
      //updateFormData({ neighborhood: "" });
      setRefreshNeighborhood(!refreshNeighborhood);
    }

    if (!isValidCity){
      //updateFormData({ city: "" });
      setRefreshCity(!refreshCity);
    }

    if (!isValidState){
      //updateFormData({ state: "" });
      setRefreshState(!refreshState);
    }

    return false;
  }

  const handleNextClick = () => {
    if (currentStep > 3 || currentStep < 0) {
      return;
    }

    if (currentStep < 2 && validateFirstStep(true, true)){
      nextStep();
    }

    if (currentStep == 2){
      if (validateSecondStep(true)){
        nextStep();
      }else{
        if (!selectedPlanId) {
          setFormData({ ...formData, selectedPlanId: -1 });
        }
      }      
    }

    if (currentStep > 2 && validateThirdStep(true)){
      nextStep();
    }
  };

  useEffect(() => {
    var storedData = localStorage.getItem("vidaFormData");

    try {
      storedData = JSON.parse(storedData);
    } catch (error) {
      storedData = null;
      console.error(error);
    }

    storedData = { ...storedData };
    
    const queryParams = new URLSearchParams(location.search);
    const tokenProgress = queryParams.get("t");

    try {
      const initLog = async () => { await progress.updateLogData(storedData, 0, false); }
      initLog();
    }catch(e) {
      console.error(e);
    }

    if (Object.keys(storedData).length > 0) {
      setFirstInteraction(false);
    }

    setFormData({ ...storedData });

    if (formData && /^[0-9]{1}/.test(formData.selectedPlanId)) {
      setSelectedPlanId(formData.selectedPlanId);
    }

    let slug = pageSlugs[1];
    let step = stepSlugs.indexOf(slug) + 1;

    if (step > 1) {
      //setLoadCotation(true);
      setCurrentStep(step);
    }
  }, []);

  // Atualiza formData quando selectedPlanId muda
  useEffect(() => {
    let data = { ...formData };

    if (selectedPlanId !== null && selectedPlanId !== data.selectedPlanId) {
      updateFormData({ selectedPlanId });
    }
  }, [selectedPlanId, updateFormData]);

  useEffect(() => {
    //console.log('FormData:', formData);

    if (currentStep === 1) {
      const isReady = validateFirstStep();  
      
      if (isReady != readyToSubmit) {
        setReadyToSubmit(isReady);
      }
    }

    if (currentStep === 2) {
      const isReady = validateSecondStep();
      
      if (isReady != readyToSubmit) {
        setReadyToSubmit(isReady);
      }
    }

    if (currentStep === 3) {
      const isReady = validateThirdStep();

      if (isReady != readyToSubmit) {
        setReadyToSubmit(isReady);
      }
    }
  }, [formData]);

  useEffect(() => {
    console.log("CURRENT STEP:", currentStep);

    try {
      var step = parseInt(currentStep);

      if (step == 5) {
        progress.redirectWithParams(`/${pageSlug}/${stepSlugs[step - 1]}`, {}, navigate);   
        //navigate(`/${pageSlug}/${stepSlugs[step - 1]}`);
        return;
      }

      if ([1, 2, 3, 4, 5].includes(step)) {
        progress.redirectWithParams(`/${pageSlug}/${stepSlugs[step - 1]}`, {}, navigate);   
        //navigate(`/${pageSlug}/${stepSlugs[step - 1]}`);
      }

      if (step == 1) {
        if (formData && formData.access == "Permitido") {
          setAllowAccess(true);
        }
        progress.redirectWithParams(`/${pageSlug}/${stepSlugs[step - 1]}`, {}, navigate);   
        //navigate(`/${pageSlug}/${stepSlugs[step - 1]}`);
        return;
      }

      if (step == 2) {
        if (formData && /^[0-9]{1}/.test(formData.selectedPlanId)) {
          setSelectedPlanId(formData.selectedPlanId);
          setAllowAccess(true);
        }
      }

      if (![1, 2, 3, 4, 5].includes(step)) {
        setCurrentStep(1);
        step = 1;
        progress.redirectWithParams(`/${pageSlug}/${stepSlugs[step - 1]}`, {}, navigate);  
        //navigate(`/${pageSlug}/${stepSlugs[step - 1]}`);
        return;
      }
      
      let invalidStep = -1;

      for (let i = 1; i <= step; i++) {
        if (i == 1 && !validateFirstStep()){
          invalidStep = i;
          break;
        }

        if (i == 2 && !validateSecondStep()){
          invalidStep = i;
          break;
        }

        if (i == 3 && !validateThirdStep()){
          invalidStep = i;
          break;
        }
      }

      if (invalidStep > 0) {
        jumpToStep(invalidStep);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentStep]); 

  // define os titulos das etapas no array

  return (
    <div className="font-montserrat mx-2 py-6 ">
      <div>
        <div className="mx-auto max-w-6xl px-5 lg:px-10 relative">
          <img 
            src="https://storage.googleapis.com/primesecure/logo-sulamerica-vida.png" 
            alt="Logo SulAmérica Vida" 
            className={`mx-auto bottom-0 top-0 w-[180px] mb-4  xl2:my-auto ${currentStep == 5 ? '' : 'xl2:absolute'}`} 
          /> 
          <div className="w-fit mx-auto">
            <h1 className={"text-4xl font-medium text-center " + (currentStep == 5 ? 'hidden' : '') }>
              {stepTitles[currentStep]}
            </h1>
            {/*<p>Descrição da Etapa</p>*/}
            {currentStep < 5 && (
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
            )}
            {showPlanError && currentStep === 2 && (
              <p className="pt-3 text-red-600 font-bold">
                Por favor, selecione um plano para continuar a sua contratação.
              </p>
            )}
          </div>
        </div>
        {currentStep === 1 && (
          <StepRegistrationData
            isEmailValid={isEmailValid}
            isNameValid={isNameValid}
            isValidCpf={isValidCpf}
            isValidBirthDate={isValidBirthDate}
            isValidPhone={isValidPhone}
            isValidWeight={isValidWeight}
            isValidHeight={isValidHeight}
            isValidGender={isValidGender}
            isValidOccupation={isValidOccupation}
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
        {currentStep === 3 && (
          <StepAddress
            formData={formData}
            updateFormData={updateFormData}
            isValidCep={isValidCep}
            setValidCep={setCepValid}
            isValidAddress={isValidAddress}
            isValidNumber={isValidNumber}
            isValidNeighborhood={isValidNeighborhood}
            isValidCity={isValidCity}
            isValidState={isValidState}
            refreshCep={refreshCep}
            //refreshAddress={refreshAddress}
            refreshNumber={refreshNumber}
            //refreshNeighborhood={refreshNeighborhood}
            //refreshCity={refreshCity}
            //refreshState={refreshState}
          />
        )}
        {currentStep === 4 && (
          <StepPayment
            formData={formData}
            updateFormData={updateFormData}
            isValidCard={isValidCardNumber}
            isValidCardName={isValidCardName}
            isValidExpiryDate={isValidExpiryDate}
            isValidCvv={isValidCvv}          
            refreshCardNumber={refreshCardNumber}
            refreshCardName={refreshCardName}
            refreshExpiryDate={refreshExpiryDate}
            refreshCvv={refreshCvv}
            setValidCardNumber={setValidCardNumber}
            setValidCardName={setValidCardName}
            setValidExpiryDate={ (data) => { setValidExpiryDate(data) } }
            setValidCvv={setValidCvv}
            setRefreshExpiryDate={setValidExpiryDate}
            recaptchaRef={ recaptchaRef }
            setThankYouToken={(token) => { setThankYouToken(token); setCurrentStep(5); }}
          />
        )}
        {currentStep === 5 && (
          <ThankYouPage 
            token={thankYouToken}
          />
        )}
      </div>
      <div className="m-auto max-w-6xl rounded-xl grid sm:grid-cols-2 grid-cols-1">
        {currentStep > 1 && currentStep < 5 && (
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
              !setReadyToSubmit ? "bg-gray-400" : ""
            }`}
            onClick={handleNextClick}
            disabled={!setReadyToSubmit}
          >
            Avançar
          </button>
        )}
      </div>
    </div>
  );
}
