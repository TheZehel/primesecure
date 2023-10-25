import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import LayoutCotacaoPlanos from "./layoutCotacaoPlanos";
import axios from "axios";
import forge from 'node-forge';

import CryptoFunctions from "../../globalsubcomponentes/CryptoFunctions";
import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";


const crypto = new CryptoFunctions();
const functions = new GlobalFuntions();

const validationsRelationship = {
  'user-name': (value) => functions.validateName(value),
  'user-email': (value) => functions.validateEmail(value),
  'user-phone': (value) => functions.validatePhone(value),
  'user-check': (value) => (value)=>{ return (value); },

  'customer-cpf': (value) => functions.validateCPF(value),

  'address-zipcode': (value) => functions.validateCEP(value),
  'address-address': (value) => functions.validateStreet(value),
  'address-number': (value) => functions.validateStreetNumber(value),
  'address-additional': (value) => functions.validateComplement(value),
  'address-neighborhood': (value) => functions.validateNeighborhood(value),
  'address-city': (value) => functions.validateCity(value),
  'address-state': (value) => functions.validateStateUF(value),
  
  'payment-selected': (value) => ['cc-monthly', 'cc-annual', 'pix'].includes(value),

  'cc-monthly-number': (value) => functions.validateCreditCardNumber(value),
  'cc-monthly-name': (value) => functions.validateName(value),
  'cc-monthly-expiration': (value) => functions.validateCreditCardExpirationDate(value),
  'cc-monthly-cvv': (value) => functions.validateCreditCardCVV(value),

  'cc-annual-number': (value) => functions.validateCreditCardNumber(value),
  'cc-annual-name': (value) => functions.validateName(value), 
  'cc-annual-expiration': (value) => functions.validateCreditCardExpirationDate(value),
  'cc-annual-cvv': (value) => functions.validateCreditCardCVV(value),
}

const formatCurrency = (value) => {
  let options = {  
    style: 'decimal', 
    useGrouping: true, 
    groupingSeparator: '.', 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  };

  let price = value.toLocaleString(undefined, options);
  return price;
}

const calculatePetDiscount = (pets, selected) => {
  var finalDiscount = 0;
  
  for(let i in pets){
    let pet = pets[i] || {};

    if (i == 0){ continue; }
    let price = pet.plan.price || '0';
    
    price = price.replace(/\D/g, '');
    price = price / 100;

    if (selected == 'cc-annual' || selected == 'pix'){
      price = price * 0.9;
    }

    let discount = (i < 3) ? (i * 0.1) : 0.3;

    finalDiscount += price * discount;
  }

  return finalDiscount;
}

const calculatePixDiscount = (subtotal, selected) => {
  let discount = subtotal * 0.02;
  
  if (selected != 'pix'){
    discount = 0;
  }

  return discount;
}

const calculateAnnualDiscount = (subtotal, selected, petList) => {
  let discount = subtotal * 0.1;
  discount = Math.round(discount);

  if (selected != 'cc-annual' && selected != 'pix'){
    discount = 0;
  }

  return discount;
}

const calculateCouponDiscount = (subtotal, coupon) => {
  //console.log('cupom-subtotal', subtotal, 'cupom-value', coupon.value);
  if (!coupon || !coupon.code || !coupon.value || !coupon.valid){
    return 0;
  }

  let discount = subtotal * (coupon.value / 100);

  return discount;
}

export default function PaymentStep({formData, updateForm, returnTo}) {
  const [open, setOpen] = React.useState(1);
  const [discountList, setDiscountList] = useState({
    petDiscount: 0,
    annualDiscount: 0,
    pixDiscount: 0,
    couponDiscount: 0
  });

  const [loadingState, setLoadState] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [errorAlert, setErrorAlert] = useState(null)

  const [subtotalMonthly, setSubtotalMonthly] = useState(0);
  const [totalMonthly, setTotalMonthly] = useState(0);

  const [couponMessage, setCouponMessage] = useState('');
  
  const [checkoutData, setCheckoutData] = useState({
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
      coupon: {
        code: '',
        value: 0,
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
  });
  
  const calculateMonthlySubtotal = (formData) => {
    let subtotal = 0
    let petList = formData.petList || [];

    for(let i in petList){
      let pet = petList[i] || {};
      let price = pet.plan.price || '0';

      price = price.replace(/\D/g, '');
      price = price / 100;

      subtotal += price;
    }

    let checkout = formData.checkoutData || {};
    checkout = checkout.payment || {};    

    discountList.petDiscount = calculatePetDiscount(formData.petList, checkout.selected);

    if (checkout.selected == 'cc-annual' || checkout.selected == 'pix'){        
      subtotal = subtotal * 12;     

      discountList.annualDiscount = calculateAnnualDiscount(subtotal, checkout.selected, formData.petList);
      subtotal -= discountList.annualDiscount;

      discountList.petDiscount = discountList.petDiscount * 12;
      subtotal -= discountList.petDiscount; 

      setDiscountList(discountList);
      return subtotal;
    }
    
    subtotal -= discountList.petDiscount;

    setDiscountList(discountList);
    return subtotal;
  }

  const calculateMonthlyTotal = (formData, subtotal) => { 
    let checkout = formData.checkoutData || {};
    let total = subtotal;

    //console.log("A", total, checkout.payment.coupon)

    discountList.couponDiscount = calculateCouponDiscount(total, checkout.payment.coupon);
    total -= discountList.couponDiscount;

    discountList.pixDiscount = calculatePixDiscount(total, checkout.payment.selected);
    total -= discountList.pixDiscount;

    setDiscountList(discountList);

    return total;
  }

  const checkoutPetList = () => {
    return(
      <div className="w-96 flex flex-col justify-between pt-3 pb-2">
        {formData.petList.map((pet, index) => { 
          return(
            <div className="flex justify-between items-center text-md font-semibold mb-1">
              <div className="text-black text-opacity-70 text-sm">
                <div className="">{pet.name} | <span className="text-xs">{pet.plan.title}</span> <span className={`text-[#1adb4d] ml-1 text-xs ${(index == 0) ? 'hidden' : ''}`}>(-{(index < 3) ? index : 3}0%)</span></div>
                <div className="text-xs"> </div>
              </div>
              <div className="text-cyan-500">R$ {pet.plan.price}</div>
            </div>
          );          
        })}          
      </div>      
    );
  }

  const errorListHandler = (input, value) => {
    let errors = [...errorList];

    if (errors.includes(input)){
      if (validationsRelationship[input](value)){
        errors = errors.filter((item) => item != input);
        setErrorList(errors);
      }
    }
  }

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    var data = { ...checkoutData };
    var nameArray = name.split('-');

    if (nameArray[0] == 'customer'){
      data.customer[nameArray[1]] = value;

      errorListHandler(name, value);

      updateForm('checkoutData', nameArray[0], {...formData['checkoutData']['customer'], ...data['customer']});
      setCheckoutData({ ...checkoutData, ...data });
      return;
    }

    if (nameArray[0] == 'address'){
      if (nameArray[1] == 'number'){
        value = value.replace(/\D/g, '');
      }
      
      if (nameArray[1] == 'zipcode' && value.length == 9){
        autoFillAddress(value);
      }     

      console.log(name, value)
      errorListHandler(name, value);

      data.address[nameArray[1]] = value;
      updateForm('checkoutData', nameArray[0], {...formData['checkoutData']['address'], ...data['address']});
      setCheckoutData({ ...checkoutData, ...data });
      return;
    }

    if (nameArray[0] == 'payment'){
      if (nameArray[1] == 'coupon'){
        value = value.toUpperCase();
        value = value.replace(/\s/g, '');
        //data.payment[nameArray[1]] = value;

        let coupon = checkoutData.payment.coupon;
        coupon.code = value;

        errorListHandler(name, value);

        updateForm('checkoutData', nameArray[0], {...formData['checkoutData']['payment'], coupon: coupon});
        setCheckoutData({ ...checkoutData, ...data });
        return;
      }
    }

    if (['cc', 'pix'].includes(nameArray[0])){
      if (nameArray[2] == 'cvv'){
        value = value.replace(/\D/g, '');
      }

      errorListHandler(name, value);

      data.payment[nameArray[0]][nameArray[1]][nameArray[2]] = value;
      setCheckoutData({ ...checkoutData, ...data });
      return;
    }    
  }

  const autoFillAddress = async (zipcode) => {
    if (!/^[0-9]{5}\-[0-9]{3}$/.test(zipcode)){
      return;
    }

    zipcode = zipcode.replace(/\D/g, '');
    let url = `https://viacep.com.br/ws/${zipcode}/json/`;
    try{
      await axios.get(url)
        .then((response)=>{
          if (response.status == 200){
            let address = {
              address: response.data.logradouro || '',
              neighborhood: response.data.bairro || '',
              city: response.data.localidade || '',
              state: response.data.uf || ''
            };

            let errors = [...errorList];

            if (!address.address){
              errors.push("address-address");
            }else{
              errors = errors.filter((item) => item != "address-address" && item != "address-zipcode");
            }

            if (!address.neighborhood){
              errors.push("address-neighborhood");
            }else{
              errors = errors.filter((item) => item != "address-neighborhood");
            }

            if (!address.city){
              errors.push("address-city");
            }else{
              errors = errors.filter((item) => item != "address-city");
            }

            if (!address.state){
              errors.push("address-state");
            }else{
              errors = errors.filter((item) => item != "address-state");
            }

            checkoutData.address = { ...checkoutData.address, ...address };

            setErrorList(errors);
            
            updateForm('checkoutData', 'address', {...formData['checkoutData']['address'], ...checkoutData['address']} );  
            setCheckoutData(checkoutData);
          }          
        })
        .catch((error)=>{
          console.error(error);
        })
    }catch(error){
      console.error(error);
    }
  }

  const handlePaymentMethod = (value) => {
    if (checkoutData.payment.selected == value){
      value = null;
    }

    checkoutData.payment.selected = value;

    setCheckoutData({ ...checkoutData });
  }

  const verifyCoupon = async () => {
    let couponCode = checkoutData.payment.coupon.code;

    if (!couponCode){ return; }

    if (!/^[a-zA-Z0-9]{1,25}$/.test(couponCode)){
      setCouponMessage('Cupom inválido!');
      return;
    }
    
    await axios.get(`http://127.0.0.1:3050/petlove/checkout/verify-coupon/${couponCode}`)
      .then((response)=>{
        let res = response.data;
        checkoutData.payment.coupon = { ...checkoutData.payment.coupon, ...res.data };

        setCheckoutData(checkoutData);
        setCouponMessage(res.message);
      })
      .catch((error)=>{
        let message = 'Ocorreu um erro ao validar o cupom.';
        
        checkoutData.payment.coupon = { ...checkoutData.payment.coupon, ...{ value: 0, valid: false } }; 
        setCheckoutData(checkoutData);

        if (!error.response || !error.response.data){
          console.error(error);
          setCouponMessage(message);
          return;
        }

        if (error.response.data.message){
          setCouponMessage(error.response.data.message);
          return;
        }

        setCouponMessage(message);
      });      
  }

  const displayErrorMessage = (message, duration, style) => {
    style = style || {container: '', span: ''};
    style.container = style.container || '';
    style.span = style.span || '';

    return(
      <div class={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${style.container} ${errorAlert ? "" : "hidden"}`} role="alert">
        <span class={`block sm:inline ${style.span}`}>{message}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Fechar</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
    );
  }

  const validatePayload = async () => {    
    if (loadingState){ 
      return; 
    }

    setLoadState(true);
    let errorList = [];

    let customerData = checkoutData.customer || {};
    let addressData = checkoutData.address || {};
    let paymentData = checkoutData.payment || {};
    let petData = formData.petList || [];
    let userData = formData.userData || {};
    let ccData = {};

    try{
      //Lista Pet
      for(let i in petData){
        let pet = petData[i] || {};

        if (!pet.name || !pet.plan){ 
          errorList.push('pet-list');
          break; 
        }

        if (!pet.plan.price || !pet.plan.title){ 
          errorList.push('pet-list');
          break;
        }

        if (!/^[0-9]{1,}$/.test(pet.plan.id)){ 
          errorList.push('pet-list');
          break; 
        }
      }

      //User
      if (!functions.validateName(userData.name)){
        errorList.push('user-name');
      }

      if (!functions.validateEmail(userData.email)){
        errorList.push('user-email');
      }

      if (!functions.validatePhone(userData.phone)){
        errorList.push('user-phone');
      }

      if (!userData.check){
        errorList.push('user-check');
      }

      //Customer
      if (!functions.validateCPF(customerData.cpf)){
        errorList.push('customer-cpf');
      }

      //Address
      if (!functions.validateCEP(addressData.zipcode)){
        errorList.push('address-zipcode');
      }

      if (!functions.validateStreet(addressData.address)){
        errorList.push('address-address');
      }

      if (!functions.validateStreetNumber(addressData.number)){
        errorList.push('address-number');
      }

      if (!functions.validateComplement(addressData.additional)){
        errorList.push('address-additional');
      }

      if (!functions.validateNeighborhood(addressData.neighborhood)){
        errorList.push('address-neighborhood');
      }

      if (!functions.validateCity(addressData.city)){
        errorList.push('address-city');
      }

      if (!functions.validateStateUF(addressData.state)){
        errorList.push('address-state');
      }

      //Payment
      if (!['cc-monthly', 'cc-annual', 'pix'].includes(paymentData.selected)){
        errorList.push('payment-selected');
      }

      if (paymentData.selected == 'cc-monthly'){
        ccData = paymentData.cc.monthly || {};        

        if (!functions.validateCreditCardNumber(ccData.number)){
          errorList.push('cc-monthly-number');
        }

        if (!functions.validateName(ccData.name)){
          errorList.push('cc-monthly-name');
        }

        if (!functions.validateCreditCardExpirationDate(ccData.expiration)){
          errorList.push('cc-monthly-expiration');
        }

        if (!functions.validateCreditCardCVV(ccData.cvv)){      
          errorList.push('cc-monthly-cvv');
        }
      }

      if (paymentData.selected == 'cc-annual'){
        ccData = paymentData.cc.annual || {};

        if (!functions.validateCreditCardNumber(ccData.number)){
          errorList.push('cc-annual-number');
        }

        if (!functions.validateName(ccData.name)){
          errorList.push('cc-annual-name');
        }

        if (!functions.validateCreditCardExpirationDate(ccData.expiration)){
          errorList.push('cc-annual-expiration');
        }

        if (!functions.validateCreditCardCVV(ccData.cvv)){      
          errorList.push('cc-annual-cvv');
        }
      }
    }catch(error){
      console.error(error);      
    }

    if (errorList.length > 0){
      console.log('ErrorList:', errorList, 'formData:', formData);

      setErrorList(errorList);
      setLoadState(false);
      return;
    }

    const processPayment = async (payload) => {
      if (payload.payment.method != 'pix'){
        await axios.post('http://localhost:3050/petlove/checkout/process-payment/credit-card', { ...payload })
          .then((response)=>{
            console.log('Payment Response:', response);
          })
          .catch((error)=>{
            console.error('Payment Error:', error);
          });      
      }
    }

    var payload = {
      customer: { ...userData, ...customerData },
      pets: petData,
      address: { ...addressData },
      payment: {
        method: paymentData.selected,
        coupon: paymentData.coupon
      },
      total: Math.round(totalMonthly * 100)
    }

    if (paymentData.selected != 'pix'){
      try{
        fetch('/publicKey.pem')
          .then((response) => response.text())
          .then((publicKeyPem) => {
            let ccEncrypted = crypto.encryptData(JSON.stringify(ccData), publicKeyPem);
            payload.payment.cc = ccEncrypted;

            processPayment(payload);            
          })
          .catch((error) => {
            console.error('Erro ao carregar a chave pública:', error);
          });
      }catch(error){
        console.error('Não foi possível criptogradar os dados de pagamento.', error);
      }
    }

    setLoadState(false);
  }
  
  useEffect(()=>{
    let subtotal = calculateMonthlySubtotal(formData);
    
    let total = calculateMonthlyTotal(formData, subtotal);

    setSubtotalMonthly(subtotal);
    setTotalMonthly(total);

    //console.log('subtotal:', subtotal, 'total:', total);
  }, [checkoutData.payment.selected, checkoutData.payment.coupon.valid, checkoutData.payment.coupon.value]);

  useEffect(()=>{
    //console.log(formData);

    const initScreen = () => {
      var userData = formData.userData || {};      

      if (!userData.name || !userData.email || !userData.phone || !userData.check){
        returnTo(2);
        return;
      }  

      var petArray = formData.petList || [];
      var petData = [];

      if (!Array.isArray(petArray) || petArray.length < 1){
        returnTo(1);
        return;
      }

      for(let i in petArray){
        let pet = petArray[i] || {};

        if (!pet.name || !pet.plan){ continue; }

        if (!pet.plan.price || !pet.plan.title){ continue; }

        if (!/^[0-9]{1,}$/.test(pet.plan.id)){ continue; }

        petData.push(pet);
      }

      if (petData.length < 1){
        returnTo(1);
        return;
      } 

      setCheckoutData({...checkoutData, ...formData.checkoutData});
    }

    initScreen();
  }, []);

  const orderSubtotal = formatCurrency( subtotalMonthly );
  const orderTotal = formatCurrency( totalMonthly );

  console.log(totalMonthly)

  return (
    <div className="font-medium w-full font-montserrat">
      <LayoutCotacaoPlanos title="Finalize a Contratação" position={2} />
      <div className="flex flex-col md:flex-row gap-1 w-full mt-5 p-5 md:p-10">      
        <div className="w-full rounded-lg shadow-lg md:w-1/3 text-start p-4 ">
          <h2 className="font-semibold">Cadastre Seu Endereço</h2>
          <div className="flex flex-col justify-center items-center my-2">
            <div className="w-[98%] h-14 sm:w-4/4 flex mb-4">
              <InputMask
                mask="999.999.999-99"
                name="customer-cpf"
                type="text"
                className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("customer-cpf")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                placeholder="CPF"
                pattern="[0-9]*"
                value={checkoutData.customer.cpf}
                onChange={inputHandler}
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="w-[98%] h-14 sm:w-4/4 flex mb-4">
              <InputMask
                mask="99999-999"
                name="address-zipcode"
                type="text"
                className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("address-zipcode")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                placeholder="CEP"
                value={checkoutData.address.zipcode}
                onChange={inputHandler}
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="w-[98%] h-14 sm:w-4/4 flex mb-4">
              <input
                name="address-address"
                type="text"
                className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("address-address")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                placeholder="Rua"
                maxLength={60}
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value={checkoutData.address.address}
                onChange={inputHandler}
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="mx-1 flex gap-2">
              <div className="w-1/2 h-14 flex mb-4">
                <InputMask
                  name="address-number"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("address-number")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                  placeholder="Número"
                  maxLength={8}
                  pattern="/^[0-9]{1,8}$/"
                  value={checkoutData.address.number}
                  onChange={inputHandler}
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
              <div className="w-1/2 h-14 flex mb-4">
                <input
                  name="address-additional"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("address-additional")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                  placeholder="Complemento"
                  maxLength={20}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value={checkoutData.address.additional}
                  onChange={inputHandler}
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
            </div>
            <div className="w-[98%] h-14 sm:w-4/4 flex mb-4">
              <input
                name="address-neighborhood"
                type="text"
                className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("address-neighborhood")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                placeholder="Bairro"
                maxLength={35}
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value={checkoutData.address.neighborhood}
                onChange={inputHandler}
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="mx-1 flex gap-2">
              <div className="w-2/3 h-14 flex mb-4">
                <input
                  name="address-city"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("address-city")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                  placeholder="Cidade"
                  maxLength={40}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value={checkoutData.address.city}
                  onChange={inputHandler}
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />                
              </div>
              <div className="w-1/3 h-14 flex mb-4">
                <input
                  name="address-state"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("address-state")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                  placeholder="Estado"
                  maxLength={2}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value={checkoutData.address.state}
                  onChange={inputHandler}
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg shadow-lg md:w-1/3 text-start p-4">
          <h2 className="font-semibold mb-2">Forma de Pagamento:</h2>
          <Accordion
            open={checkoutData.payment.selected === "cc-monthly"}
            className="mb-2 rounded-lg border border-blue-gray-100 px-2"
          >
            <AccordionHeader
              onClick={() => handlePaymentMethod("cc-monthly")}
              className={`border-b-0 transition-colors px-3 text-lg ${
                checkoutData.payment.selected === "cc-monthly" ? "text-bluePrime hover:!text-bluePrime2" : "hover:text-bluePrime"
              }`}
            >
              Mensal | Cartão de Crédito
            </AccordionHeader>
            <AccordionBody className="pt-2 text-base font-normal">
              <div className="w-[93%] h-14 sm:w-4/4 flex mb-4 m-3">
                <input
                  name="cc-monthly-name"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("cc-monthly-name")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                  placeholder="Nome Impresso no Cartão"
                  maxLength={30}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value={checkoutData.payment.cc.monthly.name}
                  onChange={inputHandler}
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
              <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
                <InputMask
                  name="cc-monthly-number"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("cc-monthly-number")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                  placeholder="Número do Cartão"
                  mask="9999 9999 9999 9999"
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value={checkoutData.payment.cc.monthly.number}
                  onChange={inputHandler}
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />                
              </div>
              <div className="w-full px-3 flex gap-2">
                <div className="w-[80%] h-14 flex mb-4">
                  <InputMask
                    name="cc-monthly-expiration"
                    type="text"
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("cc-monthly-expiration")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                    placeholder="Vencimento"
                    mask="99/9999"
                    maskChar=""
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                    value={checkoutData.payment.cc.monthly.expiration}
                    onChange={inputHandler}
                    title="Por favor, use apenas letras e acentos comuns."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
                <div className="w-[80%] h-14 flex mb-4">
                  <InputMask
                    name="cc-monthly-cvv"
                    type="text"
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("cc-monthly-cvv")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                    placeholder="CVV"
                    maxLength={4}
                    pattern="[0-9]*"
                    value={checkoutData.payment.cc.monthly.cvv}
                    onChange={inputHandler}
                    title="Por favor, use apenas letras e acentos comuns."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={checkoutData.payment.selected === "cc-annual"}
            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
          >
            <AccordionHeader
              onClick={() => handlePaymentMethod("cc-annual")}
              className={`border-b-0 transition-colors text-lg ${
                checkoutData.payment.selected === "cc-annual" ? "text-bluePrime hover:!text-bluePrime2" : "hover:text-bluePrime"
              }`}
            >
              Anual à Vista | Cartão de Crédito
            </AccordionHeader>
            <AccordionBody className="pt-2 text-base font-normal">
              <div className="w-[93%] h-14 sm:w-4/4 flex mb-4 m-3">
                <input
                  name="cc-annual-name"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("cc-annual-name")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                  placeholder="Nome Impresso no Cartão"
                  maxLength={30}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value={checkoutData.payment.cc.annual.name}
                  onChange={inputHandler}
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
              <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
                <InputMask
                  name="cc-annual-number"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("cc-annual-number")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                  placeholder="Número do Cartão"
                  mask="9999 9999 9999 9999"
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value={checkoutData.payment.cc.annual.number}
                  onChange={inputHandler}
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
              <div className="w-full px-3 flex gap-2">
                <div className="w-[80%] h-14 flex mb-4">
                  <InputMask
                    name="cc-annual-expiration"
                    type="text"
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("cc-annual-expiration")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                    placeholder="Vencimento"
                    mask="99/9999"
                    maskChar=""
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                    value={checkoutData.payment.cc.annual.expiration}
                    onChange={inputHandler}
                    title="Por favor, use apenas letras e acentos comuns."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
                <div className="w-[80%] h-14 flex mb-4">
                  <InputMask
                    name="cc-annual-cvv"
                    type="text"
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${(errorList.includes("cc-annual-cvv")) ? "ring-alertRed placeholder-alertRed" : "ring-bluePrime"}`}
                    placeholder="CVV"
                    maxLength={4}
                    pattern="[0-9]*"
                    value={checkoutData.payment.cc.annual.cvv}
                    onChange={inputHandler}
                    title="Por favor, use apenas letras e acentos comuns."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={checkoutData.payment.selected === "pix"}
            className="rounded-lg border border-blue-gray-100 px-4"
          >
            <AccordionHeader
              onClick={() => handlePaymentMethod("pix")}
              className={`border-b-0 transition-colors text-lg ${
                open === "pix" ? "text-bluePrime hover:!text-bluePrime2" : "hover:text-bluePrime"
              }`}
            >
              Anual à Vista | Pix
            </AccordionHeader>
            <AccordionBody className="pt-2 text-base font-normal">
              Pagar com pix
            </AccordionBody>
          </Accordion>
        </div>
        <div className="w-full md:w-1/3 rounded-lg shadow-lg text-start p-4">
          <h2 className="font-semibold"> Resumo do Pedido: </h2>
          {checkoutPetList()}
          <div className="border border-cyan-500 h-px w-full opacity-40 mb-2"></div>

          <div className="w-96 h-60 flex flex-col justify-between">
            {/* Segunda linha */}
            <div className={`flex justify-between items-center text-md font-semibold ${(formData.petList > 1) ? 'hidden' : ''}`}>
              <div className="text-zinc-800 text-opacity-70 text-sm">
                Desconto + pets
              </div>
              <div className="text-green-600">-R$ {formatCurrency(discountList.petDiscount)}</div>
            </div> 
            <div className={`flex justify-between items-center text-md font-semibold mt-1 ${(!checkoutData.payment.selected || checkoutData.payment.selected.includes('monthly' || 'pix')) ? 'hidden' : ''}`}>
              <div className={`text-zinc-800 text-opacity-70 text-sm`}>
                Desconto de pagamento anual
              </div>
              <div className="text-green-600">-R$ {formatCurrency(discountList.annualDiscount)}</div>
            </div>

            {/* Terceira linha */}
            <div className="flex justify-between items-center text-md font-semibold mt-3 mb-3">
              <div className="text-zinc-800 text-opacity-90">Subtotal</div>
              <div className="text-cyan-500">
                R$ {orderSubtotal}
                <span className={`text-black text-opacity-70 text-base ${(checkoutData.payment.selected == 'cc-annual' || checkoutData.payment.selected == 'pix') ? "hidden" : ""}`}> / mês</span>
              </div>              
            </div>

            {/* Quarta linha */}
            <div className="justify-between items-center text-md font-semibold mb-3">
              <div className="text-black text-opacity-90">
                Cupom de Desconto:
              </div>
              <div className="flex h-10 mt-2">
                <input
                  name="payment-coupon-code"
                  type="text"
                  className="w-full h-10 px-3 py-1 mr-4 ring-bluePrime border-0 placeholder ring-1 rounded-md focus:ring-bluePrime font-medium text-sm"
                  placeholder="Código do Cupom"
                  maxLength={25}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value={checkoutData.payment.coupon.code}
                  onChange={inputHandler}
                  title="Por favor, use apenas letras e números."
                  style={{
                    caretColor: "#03a8db 2px",
                  }}
                />
                <button 
                  className="text-white px-4 h-10 bg-[#1abd42] text-sm hover:bg-[#1adb4d] rounded-md"
                  onClick={verifyCoupon} 
                >
                  Aplicar
                </button>
              </div>
              <div className={`${checkoutData.payment.coupon.valid ? 'text-[#1abd42]' : 'text-alertRed text-opacity-80'} text-sm mt-2`}>{couponMessage}</div>
            </div>

            <div className={`flex justify-between items-center text-md font-semibold ${(checkoutData.payment.coupon.valid) ? '' : 'hidden'}`}>
              <div className={`text-zinc-800 text-opacity-70 text-sm`}>
                Desconto do cupom
              </div>
              <div className="text-green-600">-R$ {formatCurrency(discountList.couponDiscount)}</div>
            </div>
            
            <div className={`flex justify-between items-center text-md font-semibold ${(checkoutData.payment.selected == 'pix') ? '' : 'hidden'}`}>
              <div className={`text-zinc-800 text-opacity-70 text-sm`}>
                Desconto de pagamento no pix
              </div>
              <div className="text-green-600">-R$ {formatCurrency(discountList.pixDiscount)}</div>
            </div>

            {/* Linha horizontal */}
            <div className="border border-cyan-500 h-px w-full opacity-40 mt-2"></div>

            {/* Quinta linha */}
            <div className="flex justify-between items-center text-lg font-semibold mt-2">
              <div className="text-zinc-800">Total:</div>
              <div className="text-cyan-500">
                R$ {orderTotal} 
                <span className={`text-black text-opacity-70 text-base ${(checkoutData.payment.selected == 'cc-annual' || checkoutData.payment.selected == 'pix') ? "hidden" : ""}`}> / mês</span>
              </div>
            </div>
            <button 
              className={`text-white max-w-[225px] px-6 py-2 mt-4 ml-auto text-lg rounded-md inline-flex items-center transition ease-in-out duration-150 bg-bluePrime hover:bg-bluePrime2 ${(loadingState) ? "cursor-not-allowed bg-bluePrime2" : ""} )}`}
              onClick={validatePayload} 
            >
              <svg class={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${(loadingState) ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              { (loadingState) ? 'Processando' : 'Contratar' }
            </button>

          </div>
        </div>  
      </div>        
    </div>
  );
}
