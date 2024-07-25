import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

//Components
import Quotation from "./components/Quotation";
import { step } from "@material-tailwind/react";
import BuyerData from "./components/BuyerData";
import AddressData from "./components/AddressData";
import DataBike from "./components/DataBike";
import PaymentBike from "./PaymentBike";
import SuccessfullPage from "./components/SuccessfulPage";
import CustomFooter from "./components/subcomponents/CustomFooter";

import ReCAPTCHA from "react-google-recaptcha";

import ProgressManager from "./components/modules/progress";


const enviroment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

const globalFunctions = new GlobalFuntions();
const progress = new ProgressManager();


export default function IndexCotacaoSeguroBike() {
  const pageSlug = globalFunctions.getPageSlug();
  const location = useLocation();
  const slugArray = globalFunctions.getPageSlugArray();

  const [currentStep, setCurrentStep] = useState(1);

  const [reloadComponent, updateComponent] = useState(false);

  const [successToken, setSuccessToken] = useState(false);

  const [formData, setFormData] = useState({
    userData: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const recaptchaV3Ref = useRef();
  const [recaptchRef, setRecaptcha] = useState(null);

  const navigate = useNavigate();

  const [loadToken, setLoadToken] = useState(false);

  const [couponData, setCouponData] = useState({code: "", type: "", value: 0, valid: false});  

  console.log("CouponData", couponData);

  useEffect(() => {
    // Supondo que o token seja armazenado em sessionStorage após ser recebido do backend
    //const token = sessionStorage.getItem("bikeProgressToken");
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const tokenProgress = queryParams.get("t");
    const cupom = queryParams.get("cupom");

    var voucher_code = "";

    const processData = async () => {
      var coupon = { code: "", type: "", value: 0, valid: false };
      try {        
        if (token) {        
          try { await loadProgress(token); }catch(e){}
          if (cupom) coupon = await validateCoupon(cupom);
          setLoadToken(true);
          return;
        }
        if (tokenProgress) {
          try { await loadFormProgress(tokenProgress); }catch(e){}
          if (cupom) coupon = await validateCoupon(cupom);
          setLoadToken(true);
          return;
        }
        await processData(); 
        if (cupom) {
          coupon = await validateCoupon(cupom);
          setLoadToken(true);              
        }
      }
      catch(error) { console.log('Error', error); }
      finally {
        setLoadToken(true);
        
      }
  }
  if (!loadToken) processData();
    //setTimeout(()=>{
    //  setLoadToken(true);
    //}, 2000);
  }, []); // Dependências vazias significam que isso será executado apenas na montagem do componente

  const validateCoupon = async (coupon) => {
    var _data = { code: coupon, type: "", value: 0, valid: false };

    if (!coupon || typeof coupon !== 'string') {
      setCouponData(_data);
      return;
    }

    var url = `http://localhost:3050/kakau-bike/process/validate-coupon/${coupon}`;
    if (enviroment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-bike/process/validate-coupon/${coupon}`;

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
    let form = null;
    try { form = await progress.getFormProgress(token); }catch(e){}
    setFormData(form);    
    setLoadToken(true);
  };

  const loadProgress = async (token) => {
    console.log("Token", token);
    try {
      const response = await axios.get(
        `${apiUrl}/kakau-bike/process/get-bike-progress/${token}`
      );

      console.log("dadosmanychat", response.data);
      if (response.data) {
        let sessionData = await progress.setSessionData(response.data);
        console.log("sessionData", sessionData);
        // Atualização do estado com a resposta
        //const updatedData = transformResponseToFormData(response.data);
        sessionStorage.setItem("bikeFormData", JSON.stringify(sessionData));
        setFormData(sessionData);
        navigate("/seguro-bike/cotacao/pagamento"); // Assegure que esta rota está correta
      } else {
        throw new Error("Dados não encontrados");
      }
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
      //navigate("/erro-ao-carregar-dados");
    }
  };

  //useEffect(() => {
  //  const queryParams = new URLSearchParams(location.search);
  //  const token = queryParams.get("token");
  //  console.log("Token capturado da URL:", token); // Isso ajudará a confirmar se o token está sendo extraído corretamente
  //
  //  if (token) {
  //    loadProgress(token);
  //  } else {
  //    console.error("Token não encontrado na URL.");
  //
  //  }
  //}, [location.search]); // Isto assegura que o efeito é executado sempre que a busca na URL muda

  const transformResponseToFormData = (data) => ({
    addressData: {
      address: data.customer.address.name, //check
      cep: data.customer.address.zipcode, //check
      city: data.customer.address.city, //check
      complement: data.customer.address.complement, //check
      neighborhood: data.customer.address.neighborhood, //check
      number: data.customer.address.number, //check
      state: data.customer.address.state, //check
    },
    buyerData: {
      name: `${data.customer.first_name} ${data.customer.last_name}`, //check
      email: data.customer.email, //check
      phone: data.customer.phone_number, //check
      cpf: data.customer.cpf, //check
      rg: data.customer.rg, //check
      birth: data.customer.birthday, //check
      check: true, // Adicione lógica para 'check' se necessário
    },
    dataBike: {
      bikeModel: data.bike_model, //check
      precoBike: data.bike_price_amount, // Assumindo que o preço pode ser acessado assim
      year: data.bike_year, //check
      modality: data.bike_modality_id, //check
      serieNumber: data.bike_serial_number, //check
    },
    selectedPlanId: {
      id: data.bike_plan_id,
      bikePlanId: data.plan_id,
      plan_id: data.plan_id,
      plan_code: data.plan_code,
      marca: data.bike_model,
      precoBike: data.bike_price_amount,
      bike_price_id: data.bike_price_id,
      plan_name: data.plan_name,
      marcaId: data.bike_brand_id,
      serieNumber: data.bike_serial_number, //check
      year: data.bike_year,
      parcel_with_factor: data.parcel_with_factor,
      amount: data.amount,
    },
  });

  const nextStep = (step, data) => {
    if (step === 2) {
      if (!Array.isArray(data) || data.length < 1) {
        console.error("Dados de cotação não fornecidos");
        return;
      }

      sessionStorage.setItem("selectedPlan", JSON.stringify(data));
      navigate("/seguro-bike/cotacao/dados-cadastrais");
    } else if (step === 3) {
      // Supondo que não há dados adicionais específicos para verificar nesta etapa
      navigate("/seguro-bike/cotacao/endereco");
    } else if (step === 4) {
      // Supondo que não há dados adicionais específicos para verificar nesta etapa
      navigate("/seguro-bike/cotacao/cadastro-bike");
    } else if (step === 5) {
      // Supondo que nesta etapa você pode querer verificar/confirmar algum dado antes de prosseguir
      // Por exemplo, confirmação de dados de endereço ou algo similar
      navigate("/seguro-bike/cotacao/pagamento");
    } else if (step === 6) {
      // Supondo que nesta etapa você pode querer verificar/confirmar algum dado antes de prosseguir
      // Por exemplo, confirmação de dados de endereço ou algo similar
      navigate("/seguro-bike/cotacao/pagamento-confirmado");
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
    setRecaptcha(recaptchaV3Ref.current);
  }, [recaptchaV3Ref]);

  useEffect(() => {
    const newStep = slugArray.includes("pagamento-confirmado")
      ? 6
      : slugArray.includes("pagamento")
      ? 5
      : slugArray.includes("cadastro-bike")
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
    !slugArray.includes("cadastro-bike") &&
    !slugArray.includes("pagamento") &&
    !slugArray.includes("pagamento-confirmado") &&
    currentStep !== 1
  ) {
    setCurrentStep(1);
  }

  //Criar um novo if para adicionar os próximos steps relacionados com o slug
  if (slugArray.includes("dados-cadastrais") && currentStep !== 2) setCurrentStep(2);

  if (slugArray.includes("endereco") && currentStep !== 3) setCurrentStep(3);  

  if (slugArray.includes("cadastro-bike") && currentStep !== 4) setCurrentStep(4);  

  if (slugArray.includes("pagamento") && currentStep !== 5) setCurrentStep(5);
  
  if (slugArray.includes("pagamento-confirmado") && currentStep !== 6) setCurrentStep(6);  

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
    } else if (slugArray.includes("cadastro-bike")) {
      step = 4; // Adiciona o step para "cadastro-bike"
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
        <Quotation 
          currentStep={currentStep} 
          nextStep={nextStep} 
        />
      )}
      {currentStep === 2 && (
        <BuyerData
          formData={formData}
          submitForm={nextStep}
          updateForm={updateData}
          reload={reloadComponent}
          coupon={couponData}
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
          coupon={couponData}
        />
      )}
      {currentStep === 4 && (
        <DataBike 
          coupon={couponData}
        />)}
      {currentStep === 5 && (
        <PaymentBike
          setSuccessToken={(token) => { setSuccessToken(token); }}
          recaptchaRef={recaptchRef}          
          setCoupon={(coupon) => { setCouponData(coupon); }}
          _coupon={couponData}
        />
      )}
      {currentStep === 6 && <SuccessfullPage token={successToken} />}
      <ReCAPTCHA
        ref={recaptchaV3Ref}
        sitekey="6LeUriEoAAAAAJK28iP3cIgAsRKUl4TCJhBC-GEO"
        size="invisible"
        onChange={(token) => {
          console.log("Recaptcha onChange", token);
        }}
      />
      <CustomFooter />
    </div>
  );
}
