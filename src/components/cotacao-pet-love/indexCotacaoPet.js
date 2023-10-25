import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PriceContainer from "./components/priceContainer";
import BuyerData from "./components/buyerData";
import PaymentStep from "./components/paymentStep";
import GlobalFuntions from "../globalsubcomponentes/globalFunctions";
import HeaderCotacao from "./components/HeaderCotacao";
import PetStepValidation from "./components/stepsValidation";

const globalFunctions = new GlobalFuntions();

const petStepValidation = new PetStepValidation();

const pageSlug = globalFunctions.getPageSlug();

export default function IndexCotacaoPetlove() {
  const slugArray = globalFunctions.getPageSlugArray();

  const [screenReady, setScreenReady] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    petList: [],
    userData: {
      name: "",
      email: "",
      phone: "",
      check: false
    },
    checkoutData: {
      customer: {
        cpf: '',
      },
      address: {
        zipcode: '',
        address: '',
        number: '',
        additional: '',
        neighborhood: '',
        city: '',
        state: ''
      },
      payment: {
        selected: null,
        coupon: {
          code: '',
          value: 0,
          type: 'percentage',
          valid: null
        },
        cc: {
          monthly: { 
            number: '', 
            name: '', 
            expiration: '', 
            cvv: '' 
          },
          annual: { 
            number: '', 
            name: '', 
            expiration: '', 
            cvv: '' 
          }
        },
        pix: {}
      }
    }
  });

  const navigate = useNavigate(); 

  const nextStep = (step, data) => {
    if (step == 2){
      if (slugArray.includes('dados-pessoais') || slugArray.includes('pagamento')){
        console.log('Error:', slugArray);
        return;
      }

      if (!Array.isArray(data) || data.length < 1){ 
        console.log(data);
        return; 
      }      

      formData.petList = data;

      navigate(`/${pageSlug}/dados-pessoais`);      
      setFormData(formData);

      return;
    }

    if (step == 3){
      if (!data.name || !data.email || !data.phone || !data.check || !slugArray.includes('dados-pessoais')){
        return;
      }

      formData.userData = { ...formData.userData, ...data };

      navigate(`/${pageSlug}/pagamento`);      
      setFormData(formData);

      return;
    }
  }

  const returnTo = (step) => {    
    if (!/^[1-3]{1}$/.test(step)){ return; }

    const pages = ["", "/dados-pessoais", "/pagamento"];
    const page = `/${pageSlug}${pages[step - 1]}`;

    navigate(page);    
  }

  const updateData = (index, key, value) => {
    //console.log('Update Data:', index, key, value);
    if (!formData[index] === undefined || !formData[index][key] === undefined){ 
      return; 
    }

    formData[index][key] = value;
    setFormData(formData);
  }

  useEffect(()=>{  
    const initScreen = () => {
      var currentStep = 0;
    
      if (slugArray.includes('dados-pessoais')){ currentStep = 1; }
      if (slugArray.includes('pagamento')){ currentStep = 2; }

      var sessionData = sessionStorage.getItem("formPetData");
      try{ sessionData = JSON.parse(sessionData); }catch(error){ sessionData = null; }

      const data = sessionData || {};

      try{
        formData.petList = petStepValidation.firstStepValidation(data.petList);
      }catch(error){
        console.log('Init pet data error:', error);
      }

      var userData = data.userData || {};

      try{
        formData.userData = {
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          check: userData.check || false,
        };
      }catch(error){
        console.log('Init user data error:', error);
      }
      
      var checkoutData = data.checkoutData || {};

      checkoutData.customer = checkoutData.customer || {};

      checkoutData.address = checkoutData.address || {};

      checkoutData.payment = checkoutData.payment || {};

      checkoutData.payment.cc = checkoutData.payment.cc || {};
      checkoutData.payment.cc.monthly = checkoutData.payment.cc.monthly || {};
      checkoutData.payment.cc.annual = checkoutData.payment.cc.annual || {};

      checkoutData.payment.pix = checkoutData.payment.pix || {};

      try{
        formData.checkoutData.customer.cpf = checkoutData.customer.cpf || '';
        
        formData.checkoutData.address = { ...formData.checkoutData.address, ...checkoutData.address };
        
        formData.checkoutData.payment.selected = checkoutData.payment.selected || null;
        
        formData.checkoutData.payment.cc.monthly = { ...formData.checkoutData.payment.cc.monthly, ...checkoutData.payment.cc.monthly };
        formData.checkoutData.payment.cc.annual = { ...formData.checkoutData.payment.cc.annual, ...checkoutData.payment.cc.annual };
        
        formData.checkoutData.payment.pix = { ...formData.checkoutData.payment.pix, ...checkoutData.payment.pix };
      }catch(error){
        console.log('Init checkout data error:', error);
      }
    };

    initScreen();    

    setScreenReady(true);
    setFormData(formData);

    try{
      if (currentStep > 0){ 
        if (formData.petList.length < 1){ 
          returnTo(1); 
          return; 
        }

        if (currentStep == 2){
          if (!petStepValidation.secondStepValidation(formData.userData)){
            returnTo(2);
            return;
          }
        }
      }
    }catch(error){
      console.log('Init Form Error:', error);
    }
  }, []);

  if (slugArray.includes('dados-pessoais') && screenReady){
    return (
      <div>
        <BuyerData
          formData={formData} 
          submitForm={nextStep}
          updateForm={updateData}
          returnTo={returnTo}
        />
      </div>
    );
  }

  if (slugArray.includes('pagamento') && screenReady){
    return (
      <div>
        <PaymentStep 
          returnTo={returnTo}
          updateForm={updateData}
          formData={formData}
        />
      </div>
    );
  }

  return (
    <div>
      <PriceContainer 
        submitForm={nextStep}
        returnTo={returnTo}
      />
    </div>
  );
  
}
