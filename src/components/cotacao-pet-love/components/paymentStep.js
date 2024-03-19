import React, { useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";
import LayoutCotacaoPlanos from "./layoutCotacaoPlanos";
import axios from "axios";
import forge from "node-forge";

import Modal from "react-modal";

import PagarMeFunctions from "./module/pagarmeFunctions";

import CryptoFunctions from "../../globalsubcomponentes/CryptoFunctions";
import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";

import PixIcon from "../components/icons/pixIcon";
import CardIcon from "../components/icons/cardIcon.js";
import CloseIcon from "../components/icons/closeIcon.js";
import LoadingIcon from "../components/icons/loadingIcon";

import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate } from "react-router";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import ModalPix from "./modalPix";

const crypto = new CryptoFunctions();
const functions = new GlobalFuntions();
const pagarme = new PagarMeFunctions();

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

const validationsRelationship = {
  "user-name": (value) => functions.validateName(value),
  "user-email": (value) => functions.validateEmail(value),
  "user-phone": (value) => functions.validateCellPhone(value),
  "user-check": (value) => {
    return value;
  },

  "customer-cpf": (value) => functions.validateCPF(value),

  "address-zipcode": (value) => functions.validateCEP(value),
  "address-address": (value) => functions.validateStreet(value),
  "address-number": (value) => functions.validateStreetNumber(value),
  "address-additional": (value) => functions.validateComplement(value),
  "address-neighborhood": (value) => functions.validateNeighborhood(value),
  "address-city": (value) => functions.validateCity(value),
  "address-state": (value) => functions.validateStateUF(value),

  "region-ibge": (value) => {
    return /^[0-9]{1,9}$/.test(value);
  },
  "region-name": (value) => functions.validateCity(value),

  "payment-selected": (value) =>
    ["cc-monthly", "cc-annual", "pix"].includes(value),

  "cc-monthly-number": (value) => functions.validateCreditCardNumber(value),
  "cc-monthly-name": (value) => functions.validateName(value),
  "cc-monthly-expiration": (value) =>
    functions.validateCreditCardExpirationDate(value),
  "cc-monthly-cvv": (value) => functions.validateCreditCardCVV(value),

  "cc-annual-number": (value) => functions.validateCreditCardNumber(value),
  "cc-annual-name": (value) => functions.validateName(value),
  "cc-annual-expiration": (value) =>
    functions.validateCreditCardExpirationDate(value),
  "cc-annual-cvv": (value) => functions.validateCreditCardCVV(value),
};

const formatCurrency = (value) => {
  let options = {
    style: "decimal",
    useGrouping: true,
    groupingSeparator: ".",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  let price = value.toLocaleString(undefined, options);

  return price;
};

const calculatePetDiscount = (pets, selected) => {
  var finalDiscount = 0;

  for (let i in pets) {
    let pet = pets[i] || {};

    if (i == 0) {
      continue;
    }

    let price = pet.plan.price || "0";

    price = price.replace(/\D/g, "");
    price = parseInt(price);

    if (selected == "cc-annual" || selected == "pix") {
      price = price * 0.9;
    }

    let discount = i < 3 ? i * 0.1 : 0.3;

    finalDiscount += Math.round(price * discount);
  }

  finalDiscount = finalDiscount / 100;

  console.log('Calculate Pet Discount:', finalDiscount);

  return finalDiscount;
};

const calculatePixDiscount = (subtotal, selected) => {
  let discount = subtotal * 0.02;
  discount = Math.round(discount * 100) / 100;

  if (selected != "pix") {
    discount = 0;
  }

  console.log('Pix Discount:', discount);

  return discount;
};

const calculateAnnualDiscount = (subtotal, selected, petList) => {
  let discount = subtotal * 0.1;
  discount = Math.round(discount * 100) / 100;

  if (selected != "cc-annual" && selected != "pix") {
    discount = 0;
  }

  console.log('Annual Discount:', discount);

  return discount;
};

const calculateCouponDiscount = (subtotal, coupon) => {
  //console.log('cupom-subtotal', subtotal, 'cupom-value', coupon.value);
  if (!coupon || !coupon.code || !coupon.value || !coupon.valid) {
    return 0;
  }

  let discount = subtotal * (coupon.value / 100);
  discount = Math.round(discount * 100) / 100;

  console.log('Coupon Discount:', discount);

  return discount;
};

export default function PaymentStep({
  formData,
  updateForm,
  returnTo,
  reload,
}) {
  const [open, setOpen] = React.useState(1);
  const [discountList, setDiscountList] = useState({
    petDiscount: 0,
    annualDiscount: 0,
    pixDiscount: 0,
    couponDiscount: 0,
  });

  const eventSourceRef = useRef(null);
  const recaptchaV2Ref = React.createRef();
  const recaptchaV3Ref = React.createRef();

  const [loadingState, setLoadState] = useState(false);

  const [errorList, setErrorList] = useState([]);
  const [errorAlert, setErrorAlert] = useState(null);

  const [subtotalMonthly, setSubtotalMonthly] = useState(0);
  const [totalMonthly, setTotalMonthly] = useState(0);

  const [couponMessage, setCouponMessage] = useState("");

  const [recaptchaVersion, setRecaptchaVersion] = useState(3);
  const [recaptchaV2Token, setRecaptchaV2Token] = useState(null);
  const [recaptchaV3Token, setRecaptchaV3Token] = useState(null);

  const grecaptchaObject = window.grecaptcha;

  const [checkoutData, setCheckoutData] = useState({
    customer: {
      cpf: "",
    },
    address: {
      zipcode: "",
      address: "",
      number: "",
      additional: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    region: {
      ibge: null,
      name: null,
    },
    payment: {
      selected: null,
      values: {
        subtotal: 0,
        petDiscount: 0,
        annualDiscount: 0,
        pixDiscount: 0,
        couponDiscount: 0,
        total: 0,
      },
      coupon: {
        code: "",
        value: 0,
        type: "percentage",
        valid: null,
        applied: false,
      },
      cc: {
        monthly: {
          number: "",
          name: "",
          expiration: "",
          cvv: "",
        },
        annual: {
          number: "",
          name: "",
          expiration: "",
          cvv: "",
        },
      },
      pix: {},
    },
  });

  const calculateMonthlySubtotal = (formData) => {
    let subtotal = 0;
    let petList = formData.petList || [];

    for (let i in petList) {
      let pet = petList[i] || {};

      let price = pet.plan.price || "0";

      price = price.replace(/\D/g, "");
      price = parseInt(price);

      subtotal += price;
    }
    
    subtotal = Math.round(subtotal) / 100;

    let values = {
      subtotal: 0,
      petDiscount: 0,
      annualDiscount: 0,
      pixDiscount: 0,
      couponDiscount: 0,
      total: 0,
    };

    values.subtotal = Math.round(subtotal * 100);

    let checkout = { ...checkoutData };
    checkout = checkout.payment || {};

    discountList.petDiscount = calculatePetDiscount(
      formData.petList,
      checkout.selected
    );

    values.petDiscount = Math.round(discountList.petDiscount * 100);

    //console.log('Tipo:', checkout.selected);

    if (checkout.selected == "cc-annual" || checkout.selected == "pix") {
      subtotal = subtotal * 12;
      //values.subtotal = subtotal;

      discountList.annualDiscount = calculateAnnualDiscount(
        subtotal,
        checkout.selected,
        formData.petList
      );

      values.annualDiscount = Math.round(discountList.annualDiscount * 100);
      
      subtotal -= discountList.annualDiscount;

      //console.log('pix', discountList.pixDiscount)

      discountList.petDiscount = discountList.petDiscount * 12;

      values.petDiscount = Math.round(discountList.petDiscount * 100);

      subtotal -= discountList.petDiscount;

      //console.log('Values:', values.total);

      values.total = Math.round(subtotal * 100);

      updateForm("checkoutData", "payment", {
        ...formData["checkoutData"]["payment"],
        values: {
          ...formData["checkoutData"]["payment"]["values"],
          ...values,
        },
      });

      setCheckoutData({
        ...checkoutData,
        payment: {
          ...checkoutData.payment,
          values: {
            ...formData["checkoutData"]["payment"]["values"],
            ...values,
          },
        },
      });

      setDiscountList(discountList);

      return subtotal;
    }

    //console.log('Values:', values.total);

    subtotal -= discountList.petDiscount;
    values.total = Math.round(subtotal * 100);

    //console.log('Values:', values.total);

    values.annualDiscount = 0;
    values.pixDiscount = 0;
    values.petDiscount = Math.round(discountList.petDiscount * 100);

    updateForm("checkoutData", "payment", {
      ...formData["checkoutData"]["payment"],
      values: {
        ...checkoutData.payment.values,
        ...values,
      },
    });

    setCheckoutData({
      ...checkoutData,
      payment: {
        ...checkoutData.payment,
        values: {
          ...checkoutData.payment.values,
          ...values,
        },
      },
    });

    setDiscountList(discountList);

    return subtotal;
  };

  const calculateMonthlyTotal = (formData, subtotal) => {
    let checkout = { ...checkoutData };
    let total = subtotal;

    let values = {
      couponDiscount: 0,
      pixDiscount: 0,
      total: 0,
    };

    //console.log('Values:', values.total);

    discountList.couponDiscount = calculateCouponDiscount(
      total,
      checkout.payment.coupon
    );
    values.couponDiscount = Math.round(discountList.couponDiscount * 100);
    total -= discountList.couponDiscount;

    discountList.pixDiscount = calculatePixDiscount(
      total,
      checkout.payment.selected
    );

    //console.log('Values:', values.total);

    values.pixDiscount = Math.round(discountList.pixDiscount * 100);
    total -= discountList.pixDiscount;

    //console.log('Values:', values.total);

    values.total = Math.round(total * 100);

    //console.log('Values:', values.total);

    //console.log('Totals:', values);

    updateForm("checkoutData", "payment", {
      ...formData["checkoutData"]["payment"],
      values: {
        ...formData["checkoutData"]["payment"]["values"],
        ...values,
      },
    });

    setCheckoutData({
      ...checkoutData,
      payment: {
        ...checkoutData.payment,
        values: {
          ...checkoutData.payment.values,
          ...values,
        },
      },
    });

    setDiscountList(discountList);

    return total;
  };

  const checkoutPetList = () => {
    return (
      <div className="w-96 flex flex-col justify-between pt-3 pb-2">
        <div className="font-semibold mb-3 text-zinc-800 text-opacity-80 text-sm">
          Região: <span className="">{checkoutData.region.name}</span>
        </div>
        {formData.petList.map((pet, index) => {
          return (
            <div className="flex justify-between items-center text-md font-semibold mb-1">
              <div className="text-black text-opacity-70 text-sm">
                <div className="">
                  {pet.name} | <span className="text-xs">{pet.plan.title}</span>{" "}
                  <span
                    className={`text-[#1adb4d] ml-1 text-xs ${
                      index == 0 ? "hidden" : ""
                    }`}
                  >
                    (-{index < 3 ? index : 3}0%)
                  </span>
                </div>
                <div className="text-xs"> </div>
              </div>
              <div className="text-cyan-500">R$ {pet.plan.price}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const errorListHandler = (input, value) => {
    let errors = [...errorList];

    if (errors.includes(input)) {
      if (validationsRelationship[input](value)) {
        errors = errors.filter((item) => item != input);
        setErrorList(errors);
      }
    }
  };

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    var data = { ...checkoutData };
    var nameArray = name.split("-");

    if (nameArray[0] == "customer") {
      data.customer[nameArray[1]] = value;

      errorListHandler(name, value);

      updateForm("checkoutData", nameArray[0], {
        ...formData["checkoutData"]["customer"],
        ...data["customer"],
      });

      setCheckoutData({
        ...checkoutData,
        ...data,
      });
      return;
    }

    if (nameArray[0] == "address") {
      if (nameArray[1] == "number") {
        value = value.replace(/\D/g, "");
      }

      if (nameArray[1] == "zipcode" && value.length == 9) {
        autoFillAddress(value);
      }

      //console.log(name, value)
      errorListHandler(name, value);

      data.address[nameArray[1]] = value;

      updateForm("checkoutData", nameArray[0], {
        ...formData["checkoutData"]["address"],
        ...data["address"],
      });

      setCheckoutData({
        ...checkoutData,
        ...data,
      });

      return;
    }

    if (nameArray[0] == "payment") {
      if (nameArray[1] == "coupon") {
        value = value.toUpperCase();
        value = value.replace(/\s/g, "");
        //data.payment[nameArray[1]] = value;

        let coupon = checkoutData.payment.coupon;
        coupon.code = value;

        errorListHandler(name, value);

        updateForm("checkoutData", nameArray[0], {
          ...formData["checkoutData"]["payment"],
          coupon: coupon,
        });

        setCheckoutData({
          ...checkoutData,
          ...data,
        });

        return;
      }
    }

    if (["cc", "pix"].includes(nameArray[0])) {
      if (nameArray[2] == "cvv") {
        value = value.replace(/\D/g, "");
      }

      errorListHandler(name, value);

      data.payment[nameArray[0]][nameArray[1]][nameArray[2]] = value;

      setCheckoutData({
        ...checkoutData,
        ...data,
      });
      return;
    }
  };

  const autoFillAddress = async (zipcode) => {
    if (!/^[0-9]{5}\-[0-9]{3}$/.test(zipcode)) {
      return;
    }

    zipcode = zipcode.replace(/\D/g, "");

    let url = `https://viacep.com.br/ws/${zipcode}/json/`;
    try {
      await axios
        .get(url)
        .then((response) => {
          if (response.status == 200) {
            let address = {
              address: response.data.logradouro || "",
              neighborhood: response.data.bairro || "",
              city: response.data.localidade || "",
              state: response.data.uf || "",
            };

            let errors = [...errorList];

            if (!address.address) {
              errors.push("address-address");
            } else {
              errors = errors.filter(
                (item) => item != "address-address" && item != "address-zipcode"
              );
            }

            if (!address.neighborhood) {
              errors.push("address-neighborhood");
            } else {
              errors = errors.filter((item) => item != "address-neighborhood");
            }

            if (!address.city) {
              errors.push("address-city");
            } else {
              errors = errors.filter((item) => item != "address-city");
            }

            if (!address.state) {
              errors.push("address-state");
            } else {
              errors = errors.filter((item) => item != "address-state");
            }

            checkoutData.address = { ...checkoutData.address, ...address };

            setErrorList(errors);

            updateForm("checkoutData", "address", {
              ...formData["checkoutData"]["address"],
              ...checkoutData["address"],
            });
            setCheckoutData(checkoutData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [pixData, setPixData] = useState(null);

  const openPixModal = (transaction) => {
    setIsPixModalOpen(true);
  };

  const closePixModal = () => {
    setIsPixModalOpen(false);
  };

  const handlePaymentMethod = (value) => {
    if (value == "pix") {
      //return;
    }

    if (checkoutData.payment.selected == value) {
      //value = null;
      return;
    }

    checkoutData.payment.selected = value;

    setCheckoutData({ ...checkoutData });

    // Não abra o modal aqui. Em vez disso, apenas defina o estado.
    //const isPix = value === "pix";
    //setIsPixSelected(isPix);
  };

  const verifyCoupon = async () => {
    //if (loadingCoupon){
    //  return;
    //}

    //setLoadCoupon(true);
    setCouponMessage("");

    let couponCode = checkoutData.payment.coupon.code;

    //console.log('Códiog Cupom:', couponCode);

    if (!couponCode) {
      return;
    }

    if (!/^[a-zA-Z0-9]{1,25}$/.test(couponCode)) {
      setCouponMessage("Cupom inválido!");
      return;
    }

    await axios
      .get(`${apiUrl}/petlove/checkout/verify-coupon/${couponCode}`)
      .then((response) => {
        let res = response.data;

        let coupon = res.data || {};

        if (coupon.valid && !coupon.error) {
          coupon.applied = true;
        }

        //console.log("Cupom Response:", coupon);

        checkoutData.payment.coupon = {
          ...checkoutData.payment.coupon,
          ...coupon,
        };

        setCheckoutData(checkoutData);
        setCouponMessage(res.message);
      })
      .catch((error) => {
        let message = "Ocorreu um erro ao validar o cupom.";

        checkoutData.payment.coupon = {
          ...checkoutData.payment.coupon,
          ...{
            value: 0,
            valid: false,
            applied: false,
          },
        };

        console.error("Cupom Error Response:", error);

        setCheckoutData(checkoutData);

        if (!error || !error.response || !error.response.data) {
          console.error(error);
          setCouponMessage(message);
          return;
        }

        if (error.response.data.message) {
          setCouponMessage(error.response.data.message);
          return;
        }

        setCouponMessage(message);
      });

    //setLoadCoupon(false);
  };

  const displayErrorMessage = () => {
    //if (!errorAlert || !errorAlert.message){
    //  return;
    //}

    let error = { ...errorAlert };

    if (error && error.delay) {
      setTimeout(() => {
        setErrorAlert(null);
      }, error.delay);
    }

    return (
      <div
        class={`px-3 w-full fixed z-[100] transition-all duration-700 ease-in-out ${
          error.message ? "top-1" : "-top-full"
        }`}
      >
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-1 py-3 rounded relative pr-5 sm:px-4"
          role="alert"
        >
          <span class="block pr-3 sm:inline sm:pr-0">{error.message}</span>
          <span
            class="absolute top-0 bottom-0 right-0 px-2 py-3"
            onClick={() => {
              setErrorAlert(null);
            }}
          >
            <CloseIcon
              className="hover:bluePrime"
              color={"red"}
              height="1.5rem"
              width="1.5rem"
              opacity="1"
            />
          </span>
        </div>
      </div>
    );
  };

  const _datalayerEvent = (payload) => {
    window.dataLayer = window.dataLayer || [];

    setLoadState(false);

    console.log('Payload', payload);

    const {
      payment,
      pets
    } = payload;

    var products = [];

    var actionField = {
      transaction_id: '',
      affiliation: "Brasil",
      value: null,
      currency: "BRL",
      coupon: '',
      payment_method: ''
    }

    try {
      var {
        method,
        coupon,
        totals
      } = payment;

      if (coupon && coupon.code && coupon.valid) {
        actionField.coupon = coupon.code;
      }

      for (let i = 0; i < 3; i++){ 
        actionField.transaction_id += Math.random(0).toString(36).slice(-10); 
      }

      const methods = {
        'cc-monthly': 'Cartão de Crédito',
        'cc-annual': 'Cartão de Crédito',
        'pix': 'Pix'
      };

      const type = {
        'cc-monthly': 'Mensal',
        'cc-annual': 'Anual',
        'pix': 'Anual'
      }; 
      
      actionField.payment_method = methods[method];
      
      var fullPrice = 0;

      var discounts = 0;

      if (totals && totals.total) {
        for ( let key in totals ) {
          let discount = totals[key]; 

          if (key.includes('Discount')){
            discounts += discount;
          }
        }
      }

      if ( method == 'cc-mensal' ){
        discounts = discounts * 12;
      }

      let petNumber = pets.length;

      let discountPerPet = (petNumber > 0) ? (discounts / petNumber) : 0; 
      discountPerPet = Math.round(discountPerPet);      

      for (let i in pets) {
        let pet = pets[i];

        let price = pet.plan.price || '0';
        price = price.replace(',', '.');
        price = parseFloat(price) * 100 * 12;

        let finalPrice = price - discountPerPet;

        fullPrice += finalPrice;

        let plan = 'Petlove ' + pet.plan.title;
        let id = pet.plan.id;

        let product = {
          name: "Plano Petlove",
          id: id.toString(),
          price: finalPrice / 100,
          category: plan,
          quantity: 1,
          payment_type: type[method]
        }

        products.push(product);
      }

      actionField.value = fullPrice / 100;      

      console.log(discounts, discountPerPet, actionField, products);     
    } catch(e) {
      console.error(e);
    }

    let _dataLayer = {
      event: 'purchase',
      ecommercer: {
        purchase: {
          actionField: { ...actionField },
          products: [ ...products ]
        }
      }
    }

    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        purchase: {
          actionField: {
            transaction_id: "k_tr_yr7n2jcegqrghaerhjg9d13c2kunyzh6wrvhi", // ID da transação
            affiliation: "Brasil", // Nome da afiliação
            value: 222, // Valor total
            currency: "BRL", // Moeda
            coupon: "", // Cupom, se aplicável
            payment_method: "Cartão de Crédito", // Método de pagamento
            
          },
          // Adicione aqui detalhes dos produtos, se necessário
          products: [
            {
              name: "Petlove - Produto",
              id: "transaareharecao.id",
              price: 222,
              category: "Categoria",
              quantity: 1,
            },
          ],
        },
      },
    });

    //window.dataLayer.push({ ..._dataLayer });

    console.log('DataLayer:', _dataLayer);

    //let products = [];

    //console.log('paymentData:', paymentData, 'petData:', petData);

    //for(let i in petData){
    //  let pet = petData[i] || {};

    //  if (!pet.name || !pet.plan){ 
    //    errorList.push('pet-list');
    //    break; 
    //  }

    //  if (!pet.plan.price || !pet.plan.title){ 
    //    errorList.push('pet-list');
    //    break;
    //  }

    //  if (!/^[0-9]{1,}$/.test(pet.plan.id)){ 
    //    errorList.push('pet-list');
    //    break; 
    //  }
    //}

  };

  const datalayerEvent = (payload, order_id) => {
    window.dataLayer = window.dataLayer || [];

    setLoadState(false);

    console.log('Payload', payload);

    const {
      payment,
      pets
    } = payload;

    var products = [];

    var actionField = {
      transaction_id: '',
      affiliation: "Brasil",
      value: null,
      currency: "BRL",
      coupon: '',
      payment_method: '',
      payment_type: ''
    }

    try {
      var {
        method,
        coupon,
        totals
      } = payment;

      if (coupon && coupon.code && coupon.valid) {
        actionField.coupon = coupon.code;
      }

      if (!order_id){
        order_id = '';

        for (let i = 0; i < 3; i++){ 
          order_id += Math.random(0).toString(36).slice(-10); 
        }

        actionField.transaction_id = '_or_' + order_id;
      }      

      const methods = {
        'cc-monthly': 'Cartão de Crédito',
        'cc-annual': 'Cartão de Crédito',
        'pix': 'Pix'
      };

      const type = {
        'cc-monthly': 'Mensal',
        'cc-annual': 'Anual',
        'pix': 'Anual'
      }; 
      
      actionField.payment_method = methods[method];

      actionField.payment_type = type[method];
      
      var fullPrice = 0;

      var discounts = 0;

      if (totals && totals.total) {
        for ( let key in totals ) {
          let discount = totals[key]; 

          if (key.includes('Discount')){
            discounts += discount;
          }
        }
      }

      if ( method == 'cc-mensal' ){
        discounts = discounts * 12;
      }

      let petNumber = pets.length;

      let discountPerPet = (petNumber > 0) ? (discounts / petNumber) : 0; 
      discountPerPet = Math.round(discountPerPet);      

      for (let i in pets) {
        let pet = pets[i];

        let price = pet.plan.price || '0';
        price = price.replace(',', '.');
        price = parseFloat(price) * 100 * 12;

        let finalPrice = price - discountPerPet;

        fullPrice += finalPrice;

        let plan = 'Petlove ' + pet.plan.title;
        let id = pet.plan.id;

        let product = {
          name: "Plano Petlove",
          id: id.toString(),
          price: finalPrice / 100,
          category: plan,
          quantity: 1
        };

        products.push(product);
      }

      actionField.value = fullPrice / 100;

    } catch(e) {
      console.error(e);
    }

    let _dataLayer = {
      event: 'purchase-petlove',
      ecommerce: {
        purchase: {
          actionField: { ...actionField },
          products: [ ...products ]
        }
      }
    };

    window.dataLayer.push({ ..._dataLayer });
    //console.log('DataLayer:', _dataLayer);
  };

  const validatePayload = async () => {    
    if (loadingState){ 
      return; 
    }

    if (pixData && checkoutData.payment.selected == "pix") {
      openPixModal(pixData);
      return;
    }

    setLoadState(true);

    let errorList = [];

    let customerData = checkoutData.customer || {};
    let addressData = checkoutData.address || {};
    let paymentData = checkoutData.payment || {};
    let regionData = checkoutData.region || {};

    let petData = formData.petList || [];
    let userData = formData.userData || {};
    let ccData = {};

    try {
      //Lista Pet
      for (let i in petData) {
        let pet = petData[i] || {};

        if (!pet.name || !pet.plan) {
          errorList.push("pet-list");
          break;
        }

        if (!pet.plan.price || !pet.plan.title) {
          errorList.push("pet-list");
          break;
        }

        if (!/^[0-9]{1,}$/.test(pet.plan.id)) {
          errorList.push("pet-list");
          break;
        }
      }

      //User
      if (!functions.validateName(userData.name)) {
        errorList.push("user-name");
      }

      if (!functions.validateEmail(userData.email)) {
        errorList.push("user-email");
      }

      if (!functions.validateCellPhone(userData.phone)) {
        errorList.push("user-phone");
      }

      if (!userData.check) {
        errorList.push("user-check");
      }

      //Customer
      if (!functions.validateCPF(customerData.cpf)) {
        errorList.push("customer-cpf");
      }

      //Address
      if (!functions.validateCEP(addressData.zipcode)) {
        errorList.push("address-zipcode");
      }

      if (!functions.validateStreet(addressData.address)) {
        errorList.push("address-address");
      }

      if (!functions.validateStreetNumber(addressData.number)) {
        errorList.push("address-number");
      }

      if (!functions.validateComplement(addressData.additional)) {
        errorList.push("address-additional");
      }

      if (!functions.validateNeighborhood(addressData.neighborhood)) {
        errorList.push("address-neighborhood");
      }

      if (!functions.validateCity(addressData.city)) {
        errorList.push("address-city");
      }

      if (!functions.validateStateUF(addressData.state)) {
        errorList.push("address-state");
      }

      //Payment
      if (!["cc-monthly", "cc-annual", "pix"].includes(paymentData.selected)) {
        errorList.push("payment-selected");
      }

      if (paymentData.selected == "cc-monthly") {
        ccData = paymentData.cc.monthly || {};

        if (!functions.validateCreditCardNumber(ccData.number)) {
          errorList.push("cc-monthly-number");
        }

        if (!functions.validateName(ccData.name)) {
          errorList.push("cc-monthly-name");
        }

        if (!functions.validateCreditCardExpirationDate(ccData.expiration)) {
          errorList.push("cc-monthly-expiration");
        }

        if (!functions.validateCreditCardCVV(ccData.cvv)) {
          errorList.push("cc-monthly-cvv");
        }
      }

      if (paymentData.selected == "cc-annual") {
        ccData = paymentData.cc.annual || {};

        if (!functions.validateCreditCardNumber(ccData.number)) {
          errorList.push("cc-annual-number");
        }

        if (!functions.validateName(ccData.name)) {
          errorList.push("cc-annual-name");
        }

        if (!functions.validateCreditCardExpirationDate(ccData.expiration)) {
          errorList.push("cc-annual-expiration");
        }

        if (!functions.validateCreditCardCVV(ccData.cvv)) {
          errorList.push("cc-annual-cvv");
        }
      }
    } catch (error) {
      console.error(error);
    }

    if (errorList.length > 0) {
      console.error("ErrorList:", errorList, "formData:", formData);

      setErrorList(errorList);

      setLoadState(false);

      return;
    }

    let sessionPetData = sessionStorage.getItem("formPetData");
    try {
      sessionPetData = JSON.parse(sessionPetData);
    } catch (error) {
      sessionPetData = null;
    }

    if (!sessionPetData) {
      sessionPetData = {
        userData: {},
      };
    }

    if (!sessionPetData.userData) {
      sessionPetData.userData = {};
    }

    sessionPetData.userData.cpf = customerData.cpf;
    sessionPetData.addressData = { ...addressData };

    try {
      sessionStorage.setItem("formPetData", JSON.stringify(sessionPetData));
    } catch (error) {
      console.error(error);
    }

    var recaptchaToken = null;

    if (recaptchaVersion == 3) {
      recaptchaToken = await recaptchaV3Ref.current.executeAsync();
    } else {
      recaptchaToken = recaptchaV2Ref.current.getValue(); //recaptchaV2Token;

      //console.log('Token:', recaptchaToken);
    }

    const processPayment = async (payload) => {
      //console.log('Payload:', payload);

      setErrorAlert(null);

      var url = `${apiUrl}/petlove/checkout/process-payment/credit-card`;

      if (payload.payment.method == "pix") {
        url = `${apiUrl}/petlove/checkout/process-payment/pix`;
      }

      await axios
        .post(url, { ...payload })
        .then(async (response) => {
          //console.log('Payment Response:', response.data);

          await responseHandler(response.data, false, payload);
        })
        .catch(async (e) => {
          let error = e;

          if (error && error.response) {
            error = error.response;

            if (error && error.data) {
              error = error.data;
            }
          }

          console.error("Payment Error:", error);

          await responseHandler(error, true, payload);
        });            
    }

    var discountValues = { ...discountList };

    var paymentValues = { ...paymentData.values };

    for (let i in discountValues) {
      discountValues[i] = Math.round(discountValues[i] * 100);
    }

    if (paymentData.selected.includes("monthly")) {
      discountValues.annualDiscount = 0;
    }

    if (!paymentData.selected.includes("pix")) {
      discountValues.pixDiscount = 0;
    }

    if (
      paymentData.selected.includes("annual") ||
      paymentData.selected.includes("pix")
    ) {
      paymentValues.subtotal = paymentValues.subtotal * 12;
    }

    //console.log('PaymentData:', paymentValues)

    var payload = {
      customer: { ...userData, ...customerData },
      pets: petData,
      address: { ...addressData },
      region: { ...regionData },
      payment: {
        method: paymentData.selected,
        coupon: paymentData.coupon,
        totals: {
          ...paymentValues,
          ...discountValues,
        },
      },
      recaptcha: {
        token: recaptchaToken,
        version: recaptchaVersion,
      },
      total: Math.round(totalMonthly * 100)
    }

    console.log('Payload:', payload);
    
    //datalayerEvent(payload);

    //return;

    try {
      await fetch("/publicKey.pem")
        .then((response) => response.text())
        .then(async (publicKeyPem) => {
          let ccEncrypted = crypto.encryptData(
            JSON.stringify(ccData),
            publicKeyPem
          );

          payload.payment.cc = ccEncrypted;

          await processPayment(payload);
        })
        .catch((error) => {
          console.error("Erro ao carregar a chave pública:", error);
        });
    } catch (error) {
      console.error(
        "Não foi possível criptogradar os dados de pagamento.",
        error
      );
    }

    grecaptchaObject.reset();

    setLoadState(false);
  };

  const navigate = useNavigate();

  const responseHandler = async (response, error, payload) => {
    //setRecaptchaV2Token('');

    if (!error) {
      //console.log('Resposta pagamento:', response);

      var order_id = response.id;

      datalayerEvent(payload, order_id);

      const savePlans = (plans) => {
        var sessionData = sessionStorage.getItem("formPetData");
        try {
          sessionData = JSON.parse(sessionData);
        } catch (error) {
          console.error("Erro ao recuperar dados de sessão", error);
          sessionData = {};
        }

        if (!sessionData) {
          sessionData = {};
        }

        sessionData.plansData = plans;

        try {
          sessionStorage.setItem("formPetData", JSON.stringify(sessionData));
        } catch (error) {
          console.error("Erro ao salvar dados de sessão", error);
        }
      };

      if (response && response.charges) {
        let charge = { ...response.charges[0] };

        let method = null;
        let status = null;
        let last_transaction = null;

        if (charge && charge.payment_method && charge.last_transaction) {
          method = charge.payment_method.toString().toLowerCase();
          status = charge.status.toString().toLowerCase();

          last_transaction = {
            ...charge.last_transaction,
            order_id: order_id,
          };
        }

        if (method == "pix" && status == "pending") {
          setPixData(last_transaction);

          openPixModal(last_transaction);

          return;
        } else if (method == "pix") {
          setPixData(null);
        }
      }

      let { address, customer, payment, petlove } = response.data;

      if (
        payment &&
        payment.order &&
        payment.status &&
        petlove &&
        petlove.plans
      ) {
        let { status } = payment;

        let { plans } = petlove;

        if (status == "paid" && Array.isArray(plans) && plans.length > 0) {
          savePlans(plans);

          try {
            if (recaptchaV2Ref) {
              recaptchaV2Ref.current.destroy();
            }

            if (recaptchaV3Ref) {
              recaptchaV3Ref.current.destroy();
            }

            if (grecaptchaObject) {
              grecaptchaObject.reset();
            }
          } catch (error) {
            console.error(error);
          }

          navigate("/cotacao-pet-love/obrigado");

          return;
        }
      }

      if (
        payment &&
        payment.subscription &&
        payment.status &&
        petlove &&
        petlove.plans
      ) {
        let { status } = payment;

        let { plans } = petlove;

        if (status == "active" && Array.isArray(plans) && plans.length > 0) {
          savePlans(plans);

          try {
            if (recaptchaV2Ref) {
              recaptchaV2Ref.current.destroy();
            }

            if (recaptchaV3Ref) {
              recaptchaV3Ref.current.destroy();
            }

            if (grecaptchaObject) {
              grecaptchaObject.reset();
            }
          } catch (error) {
            console.error(error);
          }

          navigate("/cotacao-pet-love/obrigado");

          return;
        }
      }

      let alert = {
        message:
          "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
        delay: null,
      };

      setErrorAlert({ ...alert });
      return;
    }

    if (error) {
      console.error("Resposta pagamento:", response);

      let errorList = [...response.errorList];

      let paymentType = checkoutData.payment.selected;

      let errorType = null;

      let stepError = 3;

      for (let i in errorList) {
        let error = errorList[i];

        if (error.includes("-")) {
          errorType = error.split("-")[0];

          errorType = errorType.toString().toLowerCase();

          if (
            error.includes("card") &&
            (paymentType == "cc-monthly" || paymentType == "cc-annual")
          ) {
            if (error != "card-data" && error != "card-crypt") {
              errorList[i] = error.replace("card", paymentType);
            }
          }
        }

        if (error && error.step && error.step < stepError) {
          stepError = error.step;
        }
      }

      setErrorList(errorList);

      let alert = {
        message:
          "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
        delay: null,
      };

      if (stepError < 3) {
        //Retornar etapa caso o erro não esteja na finalização
      }

      if (errorList.includes("recaptcha-error")) {
        setRecaptchaVersion(2);
        alert.message =
          'Não foi possível verificar sua ação de forma segura. Por favor, clique em "Não sou um robô" e tente novamente.';
      }

      if (errorType == "checkout") {
        alert.message =
          "Ocorreu um erro durante a cotação. Por favor, tente novamente mais tarde.";
      }

      if (errorType == "price") {
        alert.message =
          "Ocorreu um erro durante a cotação. Por favor, tente novamente mais tarde.";
      }

      if (errorType == "card") {
        if (
          errorList.includes("card-crypt") ||
          errorList.includes("card-data")
        ) {
          alert.message =
            "Não foi possível processar o pagamento. Por favor, verfique os dados do cartão e tente novamente.";
        }
      }

      if (errorType == "region" || errorType == "pets" || errorType == "pet") {
        alert.message =
          "Ocorreu um erro durante a cotação. Por favor, tente novamente mais tarde.";
        //Abrir modal de regiões (Etapa 0)
      }

      if (errorList.includes("address-data")) {
        alert.message =
          "Não foi validar o endereço cadastrado. Por favor, verfique os dados do endereço e tente novamente.";
      }

      if (errorType == "payment") {
        alert.message =
          "Ocorreu um problema ao processar seu pagamento. Por favor, verifique os detalhes do seu cartão e tente novamente.";

        if (errorList.includes("payment-method")) {
          alert.message =
            "Não foi possível processar o pagamento. Por favor, verfique os dados do cartão e tente novamente.";
        }

        if (errorList.includes("payment-coupon")) {
          alert.message =
            "Cupom inválido. Por favor, verifique os dados e tente novamente.";
        }

        if (errorList.includes("payment-data")) {
          alert.message =
            "Não foi possível processar o pagamento. Por favor, verfique os dados do cartão e tente novamente.";
        }

        if (errorList.includes("payment-subscription-error")) {
          //alert.message = '';
        }

        if (errorList.includes("payment-purchase-error")) {
          //alert.message = '';
        }

        if (errorList.includes("payment-error")) {
          //alert.message = '';
        }

        if (errorList.includes("purchase-subscription-error"))
          if (errorList.includes("payment-refused")) {
            alert.message = pagarme.errorMessages(response.data);
            //console.log('Pagarme:', pagarme.errorMessages(response.data));
          }

        setErrorAlert({ ...alert });
        return;
      }

      setErrorAlert({ ...alert });
    }
  };

  const openSSEConection = async (order_id) => {
    const url = `${apiUrl}/petlove/process/verify-pix/${order_id}`;

    //console.log('SSE URL', url);

    try {
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.addEventListener("message", (event) => {
        //console.log('Message Received:', event.data);
        var response = null;

        try {
          response = JSON.parse(event.data);

          //console.log('Message Pix', response);
        } catch (error) {
          response = event.data || "";
          response = response.toString();

          if (response.includes("paid")) {
            response = {
              status: "paid",
            };
          }

          if (response.includes("not-found")) {
            response = {
              status: "not-found",
            };
          }

          if (response.includes("pending")) {
            response = {
              status: "pending",
            };
          }

          if (!response || !response.status) {
            response = null;
          }

          //console.log('Message Pix Error', response);
        }

        if (response && response.status && response.status == "paid") {
          console.log("Pix pago com sucesso!");

          eventSource.close();

          setPixData(null);

          try {
            if (recaptchaV2Ref) {
              recaptchaV2Ref.current.destroy();
            }

            if (recaptchaV3Ref) {
              recaptchaV3Ref.current.destroy();
            }

            if (grecaptchaObject) {
              grecaptchaObject.reset();
            }
          } catch (error) {
            console.error(error);
          }

          //setIsPixModalOpen(false);

          navigate("/cotacao-pet-love/obrigado");

          return;
        }
      });

      //eventSource.onerror = async (event) => {
      //  console.error('Pix SSE Error');

      //  eventSource.close();

      //  setTimeout( async ()=>{
      //    openSSEConection(order_id);

      //  }, 6000);
      //};
    } catch (error) {
      console.error("SSE Error:", error);
    }
  };

  const recaptchaHandler = (value, version) => {
    if (version == 2) {
      setRecaptchaV2Token(value);
    }

    if (version == 3) {
      setRecaptchaV3Token(value);
    }

    //console.log('Recaptcha' + version + ':', value);
  };

  useEffect(() => {
    let subtotal = calculateMonthlySubtotal(formData);

    let total = calculateMonthlyTotal(formData, subtotal);

    setSubtotalMonthly(subtotal);
    setTotalMonthly(total);
  }, [
    checkoutData.payment.selected,
    checkoutData.payment.coupon.valid,
    checkoutData.payment.coupon.value,
  ]);

  useEffect(() => {
    //console.log('Pix Data:', pixData);

    try {
      if (!pixData) {
        return;
      }

      openSSEConection(pixData.order_id);
    } catch (error) {
      console.error("Error SSE", error);
    }
  }, [pixData]);

  useEffect(() => {
    //console.log(formData);
    //setLoadState(false);

    const initScreen = () => {
      var userData = formData.userData || {};

      if (
        !userData.name ||
        !userData.email ||
        !userData.phone ||
        !userData.check
      ) {
        returnTo(2);
        return;
      }

      var petArray = formData.petList || [];
      var petData = [];

      if (!Array.isArray(petArray) || petArray.length < 1) {
        returnTo(1);
        return;
      }

      for (let i in petArray) {
        let pet = petArray[i] || {};

        if (!pet.name || !pet.plan) {
          continue;
        }

        if (
          !pet.plan.price ||
          !pet.plan.title ||
          !/^[0-9]{1,}$/.test(pet.plan.id)
        ) {
          continue;
        }

        petData.push(pet);
      }

      if (petData.length < 1) {
        returnTo(1);
        return;
      }

      let sessionPetData = sessionStorage.getItem("formPetData");
      try {
        sessionPetData = JSON.parse(sessionPetData);
      } catch (error) {
        sessionPetData = null;
      }

      if (!sessionPetData) {
        sessionPetData = {};
      }

      try {
        if (sessionPetData) {
          if (sessionPetData.userData) {
            checkoutData.customer.cpf = sessionPetData.userData.cpf;
          }

          if (sessionPetData.addressData) {
            checkoutData.address = {
              ...checkoutData.address,
              ...sessionPetData.addressData,
            };
          }
        }
      } catch (error) {
        console.error(error);
      }

      setCouponMessage("");

      setCheckoutData({
        ...checkoutData,
        ...formData.checkoutData,
      });
    };

    initScreen();
  }, []);

  const orderSubtotal = formatCurrency(subtotalMonthly);
  const orderTotal = formatCurrency(totalMonthly);

  return (
    <div className="font-medium w-full font-montserrat">
      {displayErrorMessage()}
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
                className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                  errorList.includes("customer-cpf")
                    ? "ring-alertRed placeholder-alertRed"
                    : "ring-bluePrime"
                }`}
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
                className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                  errorList.includes("address-zipcode")
                    ? "ring-alertRed placeholder-alertRed"
                    : "ring-bluePrime"
                }`}
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
                className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                  errorList.includes("address-address")
                    ? "ring-alertRed placeholder-alertRed"
                    : "ring-bluePrime"
                }`}
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
            <div className="w-[98%] mx-1 flex gap-2">
              <div className="w-1/2 h-14 flex mb-4">
                <InputMask
                  name="address-number"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                    errorList.includes("address-number")
                      ? "ring-alertRed placeholder-alertRed"
                      : "ring-bluePrime"
                  }`}
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
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                    errorList.includes("address-additional")
                      ? "ring-alertRed placeholder-alertRed"
                      : "ring-bluePrime"
                  }`}
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
                className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                  errorList.includes("address-neighborhood")
                    ? "ring-alertRed placeholder-alertRed"
                    : "ring-bluePrime"
                }`}
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
            <div className="w-[98%] mx-1 flex gap-2">
              <div className="w-2/3 h-14 flex mb-4">
                <input
                  name="address-city"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                    errorList.includes("address-city")
                      ? "ring-alertRed placeholder-alertRed"
                      : "ring-bluePrime"
                  }`}
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
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                    errorList.includes("address-state")
                      ? "ring-alertRed placeholder-alertRed"
                      : "ring-bluePrime"
                  }`}
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
            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
          >
            <AccordionHeader
              onClick={() => handlePaymentMethod("cc-monthly")}
              className={`border-b-0 transition-colors text-lg justify-start ${
                checkoutData.payment.selected === "cc-monthly"
                  ? "text-bluePrime hover:!text-bluePrime2"
                  : "hover:text-bluePrime"
              }`}
            >
              <CardIcon
                className="hover:bluePrime"
                color={
                  checkoutData.payment.selected == "cc-monthly"
                    ? "#03a8db"
                    : "black "
                }
                height="1.5rem"
                width="1.5rem"
                opacity="1"
              />
              <span
                className="ml-3"
                onClick={(e) => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "mensal-cartao-credito-selecionado",
                  });
                }}
              >
                Mensal | Cartão de Crédito
              </span>
            </AccordionHeader>
            <AccordionBody className="pt-2 text-base font-normal">
              <div className="w-[93%] h-14 sm:w-4/4 flex mb-4 m-3">
                <input
                  name="cc-monthly-name"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                    errorList.includes("cc-monthly-name")
                      ? "ring-alertRed placeholder-alertRed"
                      : "ring-bluePrime"
                  }`}
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
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                    errorList.includes("cc-monthly-number")
                      ? "ring-alertRed placeholder-alertRed"
                      : "ring-bluePrime"
                  }`}
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
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                      errorList.includes("cc-monthly-expiration")
                        ? "ring-alertRed placeholder-alertRed"
                        : "ring-bluePrime"
                    }`}
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
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                      errorList.includes("cc-monthly-cvv")
                        ? "ring-alertRed placeholder-alertRed"
                        : "ring-bluePrime"
                    }`}
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
              className={`border-b-0 transition-colors text-lg justify-start ${
                checkoutData.payment.selected === "cc-annual"
                  ? "text-bluePrime hover:!text-bluePrime2"
                  : "hover:text-bluePrime"
              }`}
            >
              <CardIcon
                className="hover:bluePrime"
                color={
                  checkoutData.payment.selected == "cc-annual"
                    ? "#03a8db"
                    : "black "
                }
                height="1.5rem"
                width="1.5rem"
                opacity="1"
              />
              <span
                className="ml-3"
                onClick={(e) => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "anual-avista-cartao-credito-selecionado",
                  });
                }}
              >
                Anual à Vista | Cartão de Crédito
              </span>
            </AccordionHeader>
            <AccordionBody className="pt-2 text-base font-normal">
              <div className="w-[93%] h-14 sm:w-4/4 flex mb-4 m-3">
                <input
                  name="cc-annual-name"
                  type="text"
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                    errorList.includes("cc-annual-name")
                      ? "ring-alertRed placeholder-alertRed"
                      : "ring-bluePrime"
                  }`}
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
                  className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                    errorList.includes("cc-annual-number")
                      ? "ring-alertRed placeholder-alertRed"
                      : "ring-bluePrime"
                  }`}
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
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                      errorList.includes("cc-annual-expiration")
                        ? "ring-alertRed placeholder-alertRed"
                        : "ring-bluePrime"
                    }`}
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
                    className={`w-full h-full px-4 py-2 border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                      errorList.includes("cc-annual-cvv")
                        ? "ring-alertRed placeholder-alertRed"
                        : "ring-bluePrime"
                    }`}
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
            className={`rounded-lg border px-4 ${
              checkoutData.payment.selected === "pix"
                ? "border-bluePrime"
                : "border-blue-gray-100"
            } border-opacity-80`}
          >
            <AccordionHeader
              onClick={() => handlePaymentMethod("pix")}
              className={`border-b-0 transition-colors text-lg justify-start ${
                checkoutData.payment.selected === "pix"
                  ? "text-bluePrime hover:!text-bluePrime2"
                  : "hover:text-bluePrime"
              }`}
            >
              <PixIcon
                className="hover:bluePrime"
                color={
                  checkoutData.payment.selected == "pix" ? "#32BCAD" : "black "
                }
                height="1.5rem"
                width="1.5rem"
                opacity="1"
              />
              <span
                className="ml-3"
                onClick={(e) => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "anual-avista-pix-selecionado",
                  });
                }}
              >
                Anual à Vista | Pix
              </span>
            </AccordionHeader>
            <AccordionBody className="pt-2 text-base font-normal">
              <p className="leading-6">
                Para seguir o seu pagamento com Pix, clique no botão{" "}
                <span
                  onClick={() => {
                    validatePayload();
                    //handleOpenPixModal();
                  }}
                  className="font-semibold bg-pixGreen px-1 py-0.5 rounded-md cursor-pointer text-white whitespace-nowrap"
                >
                  "Pagar com Pix"
                </span>{" "}
                logo em seguida uma nova janela irá se abrir com mais instruções
                para finaizar a compra.
              </p>
            </AccordionBody>
          </Accordion>
        </div>
        <div className="w-full md:w-1/3 rounded-lg shadow-lg text-start p-4 overflow-hidden">
          <h2 className="font-semibold"> Resumo do Pedido: </h2>
          {checkoutPetList()}
          <div className="border border-cyan-500 h-px w-full opacity-40 mb-2"></div>

          <div className="flex flex-col justify-between overflow-auto">
            {/* Segunda linha */}
            <div
              className={`flex justify-between items-center text-md font-semibold ${
                formData.petList > 1 ? "hidden" : ""
              }`}
            >
              <div className="text-zinc-800 text-opacity-70 text-sm">
                Desconto + pets
              </div>
              <div className="text-green-600">
                -R$ {formatCurrency(discountList.petDiscount)}
              </div>
            </div>
            <div
              className={`flex justify-between items-center text-md font-semibold ${
                !checkoutData.payment.selected ||
                checkoutData.payment.selected.includes("monthly" || "pix")
                  ? "hidden"
                  : ""
              }`}
            >
              <div className={`text-zinc-800 text-opacity-70 text-sm`}>
                Desconto de pagamento anual
              </div>
              <div className="text-green-600">
                -R$ {formatCurrency(discountList.annualDiscount)}
              </div>
            </div>

            {/* Terceira linha */}
            <div className="flex justify-between items-center text-md font-semibold mt-3 mb-3">
              <div className="text-zinc-800 text-opacity-90">Subtotal</div>
              <div className="text-cyan-500">
                R$ {orderSubtotal}
                <span
                  className={`text-black text-opacity-70 text-base ${
                    checkoutData.payment.selected == "cc-annual" ||
                    checkoutData.payment.selected == "pix"
                      ? "hidden"
                      : ""
                  }`}
                >
                  {" "}
                  / mês
                </span>
              </div>
            </div>

            {/* Quarta linha */}
            <div className="justify-between items-center text-md font-semibold mb-3 mx-1">
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
              <div
                className={`${
                  checkoutData.payment.coupon.valid
                    ? "text-[#1abd42]"
                    : "text-alertRed text-opacity-80"
                } text-sm mt-2`}
              >
                {couponMessage}
              </div>
            </div>

            <div
              className={`flex justify-between items-center text-md font-semibold ${
                checkoutData.payment.coupon.valid ? "" : "hidden"
              }`}
            >
              <div className={`text-zinc-800 text-opacity-70 text-sm`}>
                Desconto do cupom
              </div>
              <div className="text-green-600">
                -R$ {formatCurrency(discountList.couponDiscount)}
              </div>
            </div>

            <div
              className={`flex justify-between items-center text-md font-semibold ${
                checkoutData.payment.selected == "pix" ? "" : "hidden"
              }`}
            >
              <div className={`text-zinc-800 text-opacity-70 text-sm`}>
                Desconto de pagamento no pix
              </div>
              <div className="text-green-600">
                -R$ {formatCurrency(discountList.pixDiscount)}
              </div>
            </div>

            {/* Linha horizontal */}
            <div className="border border-cyan-500 h-px w-full opacity-40 mt-2"></div>

            {/* Quinta linha */}
            <div className="flex justify-between items-center text-lg font-semibold mt-2">
              <div className="text-zinc-800">Total:</div>
              <div className="text-cyan-500">
                R$ {orderTotal}
                <span
                  className={`text-black text-opacity-70 text-base ${
                    checkoutData.payment.selected == "cc-annual" ||
                    checkoutData.payment.selected == "pix"
                      ? "hidden"
                      : ""
                  }`}
                >
                  {" "}
                  / mês
                </span>
              </div>
            </div>
            <div
              className={`${
                recaptchaVersion == 3 ? "hidden" : "flex"
              } ml-auto mt-2`}
            >
              <ReCAPTCHA
                ref={recaptchaV2Ref}
                sitekey="6LcPxSEoAAAAAMqfJybG3yJBIO-Ox1oaC6jIrSPV"
                onChange={(value) => {
                  recaptchaHandler(value, 2);
                }}
                grecaptcha={grecaptchaObject}
              />
            </div>
            <div className="">
              <ReCAPTCHA
                ref={recaptchaV3Ref}
                sitekey="6LeUriEoAAAAAJK28iP3cIgAsRKUl4TCJhBC-GEO"
                size="invisible"
              />
            </div>
            <button
              className={`text-white max-w-[225px] px-6 py-2 mt-4 ml-auto text-lg rounded-md inline-flex items-center transition ease-in-out duration-150 ${
                checkoutData.payment.selected == "pix"
                  ? "bg-pixGreen hover:bg-pixGreenDark"
                  : "bg-bluePrime hover:bg-bluePrime2"
              } ${loadingState ? "cursor-not-allowed bg-bluePrime2" : ""}`}
              onClick={() => {
                //if (checkoutData.payment.selected == "pix"){
                //  handleOpenPixModal();
                //  return;
                //} 
                //datalayerEvent()
                //return;               
                validatePayload();
              }}
              disabled={loadingState}
            >
              <LoadingIcon display={loadingState} />
              {loadingState
                ? "Processando"
                : checkoutData.payment.selected == "pix"
                ? "Pagar com Pix"
                : "Contratar"}
            </button>

            <ModalPix
              isOpen={isPixModalOpen}
              onClose={closePixModal}
              orderTotal={orderTotal}
              transaction={pixData}
              expired={(expired) => {
                //pixExpirationHandler(expired);
                if (expired) {
                  setPixData(null);
                  setIsPixModalOpen(false);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
