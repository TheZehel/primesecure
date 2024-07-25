import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

//Components
import Quotation from "./components/Quotation";
import { step } from "@material-tailwind/react";
import BuyerData from "./components/BuyerData";
import AddressData from "./components/AddressData";
import DataPhone from "./components/DataPhone";
import PaymentPhone from "./PaymentPhone";
import SuccessfullPage from "./components/SuccessfulPage";
import CustomFooter from "./components/subcomponents/CustomFooter";

import ProgressManager from "./components/modules/progress";

const enviroment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

const globalFunctions = new GlobalFuntions();
const progress = new ProgressManager();

export default function IndexCotacaoSeguroCelularkakau() {
  const pageSlug = globalFunctions.getPageSlug();

  const slugArray = globalFunctions.getPageSlugArray();

  const [currentStep, setCurrentStep] = useState(1);

  const [reloadComponent, updateComponent] = useState(false);

  const [successToken, setSuccessToken] = useState(false);

  const [couponData, setCouponData] = useState({code: "", value: 0, valid: false});

  const [formData, setFormData] = useState({
    userData: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [loadToken, setLoadToken] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenProgress = queryParams.get("t");
    const cupom = queryParams.get("cupom");
    
    const processData = async () => {
    try {
        try { if (cupom) cupom = await validateCoupon(cupom); } catch(e) {}
        try { if (tokenProgress) await loadFormProgress(tokenProgress); } catch(e) {}    
      }catch(e){}
      finally { setLoadToken(true); }
    };

    processData();
  }, []);

  const validateCoupon = async (coupon) => {
    var _data = { code: coupon, type: "", value: 0, valid: false };

    if (!coupon || typeof coupon !== 'string') {
      setCouponData(_data);
      return;
    }

    var url = `http://localhost:3050/kakau-phone/checkout/validate-coupon/${coupon}`;
    if (enviroment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-phone/checkout/validate-coupon/${coupon}`;

    var params = globalFunctions.getParamsFromUrl();

    await axios.get(url)
      .then(async (response) => {
        const { data } = response;
        let { error = false, coupon = {} } = data;

        if (error || !coupon || !coupon.active) delete params.cupom;
          else params = { ...params, cupom: coupon.code };

        _data = { code: coupon.code, type: coupon.type, value: coupon.amount, valid: true };
      })
      .catch((err) => {
        let error = err;

        if (error && error.response) error = error.response;  
        if (error && error.data) error = error.data;

        console.error("Erro ao validar o cupom:", error);
        delete params.cupom;        
      });

    setCouponData(_data);
    globalFunctions.updateUrlFromObj(params);
    return _data;
  };

  const loadFormProgress = async (token) => {
    console.log("Token Progress", token);
    let form = null
    
    try {
      form = await progress.getFormProgress(token);
    }catch(e) {}

    setLoadToken(true);
    setFormData(form);    
  };

  const nextStep = (step, data) => {
    if (step === 2) {
      if (!Array.isArray(data) || data.length < 1) {
        console.error("Dados de cotação não fornecidos");
        return;
      }

      try{ sessionStorage.setItem("selectedPlan", JSON.stringify(data));} catch(e) { }
      navigate("/seguro-celular-kakau/cotacao/dados-cadastrais");
    } else if (step === 3) {
      // Supondo que não há dados adicionais específicos para verificar nesta etapa
      navigate("/seguro-celular-kakau/cotacao/endereco");
    } else if (step === 4) {
      // Supondo que não há dados adicionais específicos para verificar nesta etapa
      navigate("/seguro-celular-kakau/cotacao/cadastro-celular");
    } else if (step === 5) {
      // Supondo que nesta etapa você pode querer verificar/confirmar algum dado antes de prosseguir
      // Por exemplo, confirmação de dados de endereço ou algo similar
      navigate("/seguro-celular-kakau/cotacao/pagamento");
    } else if (step === 6) {
      navigate("/seguro-celular-kakau/cotacao/pagamento-confirmado");
    }
    // Adicione mais condições aqui conforme necessário
  };

  const updateData = (index, key, value) => {
    // Garante uma atualização imutável do estado
    setFormData((prevFormData) => ({
      ...prevFormData,
      [index]: {
        ...prevFormData[index],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    const newStep = slugArray.includes("pagamento-confirmado")
      ? 6
      : slugArray.includes("pagamento")
      ? 5
      : slugArray.includes("cadastro-celular")
      ? 4
      : slugArray.includes("endereco")
      ? 3
      : slugArray.includes("dados-cadastrais")
      ? 2
      : 1;

    console.log("New Step:", newStep);
    console.log("Step:", currentStep);

    if (currentStep !== newStep) {
      //setCurrentStep(newStep);
    }

    console.log(
      "Current Step:",
      currentStep,
      "Slug Array:",
      slugArray,
      "Page Slug:",
      pageSlug
    );
  }, [slugArray, pageSlug]);

  //Conforme criar outros endpoints adicionar a excessão aqui "|| !slugArray.includes("slug-da-pagina")" no if do primeiro if
  if (
    !slugArray.includes("dados-cadastrais") &&
    !slugArray.includes("endereco") &&
    !slugArray.includes("cadastro-celular") &&
    !slugArray.includes("pagamento") &&
    !slugArray.includes("pagamento-confirmado") &&
    currentStep !== 1
  ) {
    setCurrentStep(1);
  }

  //Criar um novo if para adicionar os próximos steps relacionados com o slug
  if (slugArray.includes("dados-cadastrais") && currentStep !== 2) {
    setCurrentStep(2);
  }

  if (slugArray.includes("endereco") && currentStep !== 3) {
    setCurrentStep(3);
  }

  if (slugArray.includes("cadastro-celular") && currentStep !== 4) {
    setCurrentStep(4);
  }

  if (slugArray.includes("pagamento") && currentStep !== 5) {
    setCurrentStep(5);
  }
  if (slugArray.includes("pagamento-confirmado") && currentStep !== 6) {
    setCurrentStep(6);
  }

  console.log(
    "Current Step:",
    currentStep,
    "Slug Array:",
    slugArray,
    "Page Slug:",
    pageSlug
  );

  useEffect(() => {
    // Identifica o step atual baseado no slugArray
    let step = 1; // Default step inicial

    // Expande a lógica para incluir os novos slugs
    if (slugArray.includes("dados-cadastrais")) {
      step = 2;
    } else if (slugArray.includes("endereco")) {
      step = 3;
    } else if (slugArray.includes("cadastro-celular")) {
      step = 4; // Adiciona o step para "cadastro-celular"
    } else if (slugArray.includes("pagamento")) {
      step = 5; // Adiciona o step para "pagamento"
    } else if (slugArray.includes("pagamento-confirmado")) {
      step = 6; // Adiciona o step para "pagamento"
    }

    // Atualiza o currentStep apenas se for diferente do valor atual
    if (currentStep !== step) {
      setCurrentStep(step);
    }
  }, [slugArray]); // Inclui currentStep nas dependências para reavaliar quando mudar

  if (!loadToken) return (<></>);

  return (
    <div>
      {currentStep < 2 && (
        <Quotation currentStep={currentStep} nextStep={nextStep} />
      )}
      {currentStep === 2 && (
        <BuyerData
          formData={formData}
          submitForm={nextStep}
          updateForm={updateData}
          reload={reloadComponent}
          couponData={couponData}
        />
      )}
      {currentStep === 3 && (
        <AddressData
          formData={formData}
          submitForm={nextStep}
          updateFormData={(data) => {
            setFormData({ ...formData, ...data });
          }}
          reload={reloadComponent}
          couponData={couponData}
        />
      )}
      {currentStep === 4 && <DataPhone couponData={couponData} />}
      {currentStep === 5 && <PaymentPhone setSuccessToken={(token) => { setSuccessToken(token) } } _couponData={couponData} _setCouponData={setCouponData} />}
      {currentStep === 6 && <SuccessfullPage token={successToken} />}
      <CustomFooter />
    </div>
  );
}
