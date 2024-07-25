import React, { useState, useEffect } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutCotacaoPlanos from "./components/subcomponents/LayoutCotacao";
import chip from "../../../assets/svg/payment-card/cc-chip.svg";
//import bandeira from "../../../assets/svg/payment-card/cc-visa.svg";
import imgDefault from "../../../assets/svg/payment-card/cc-icon.svg";
import InputMask from "react-input-mask";
//import axios from "axios";
//import { Checkbox, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import BrandCards from "../../modules/BrandCards";
import "animate.css";
import axios from "axios";
import LoadingAnimation from "./components/subcomponents/loadingSvg";

import CryptoFunctions from "../../globalsubcomponentes/CryptoFunctions";
import ValidateSteps from "./components/modules/_validations";

import DisplayMessage from "./components/subcomponents/DisplayMessage";
import ModalCoupon from "./components/subcomponents/ModalCoupon";

import ProgressManager from "./components/modules/progress";
import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";


const crypto = new CryptoFunctions();
const validate = new ValidateSteps();
const progress = new ProgressManager();
const functions = new GlobalFuntions();

const enviroment = process.env.REACT_APP_ENVIRONMENT;

export default function PaymentPhone({ brand, setSuccessToken, _couponData, _setCouponData }) {
  const navigate = useNavigate();

  useEffect(() => {
    const currentStepIndex = 4; // Step do componente atual
    let lastCompletedStepIndex = parseInt(
      sessionStorage.getItem("lastCompletedStepIndex") || "0",
      10
    );

    // Atualiza lastCompletedStepIndex se o usuário estiver avançando para uma nova etapa
    if (currentStepIndex > lastCompletedStepIndex) {
      sessionStorage.setItem(
        "lastCompletedStepIndex",
        String(currentStepIndex)
      );
      lastCompletedStepIndex = currentStepIndex; // Garante que a lógica abaixo use o valor atualizado
    }

    // Verifica se o usuário tem permissão para acessar a etapa atual
    if (currentStepIndex > lastCompletedStepIndex + 1) {
      // Redireciona para a etapa permitida mais avançada
      progress.navigateTo(2, "/seguro-celular-kakau/cotacao/cadastro-celular", navigate);
      //navigate("/seguro-celular-kakau/cotacao/cadastro-celular");
    }
  }, [navigate]);

  const cardsBrand = [
    {
      name: "Visa",
      img: BrandCards("visa"),
      initialNumbers: [4],
      length: [16],
    },

    {
      name: "Mastercard",
      img: BrandCards.Mastercard,
      initialNumbers: [5],
      length: [16],
    },
    {
      name: "American Express",
      img: BrandCards.AmericanExpress,
      initialNumbers: [3, 37],
      length: [15],
    },
    {
      name: "Diners Club",
      img: BrandCards.DinersClub,
      initialNumbers: [30, 36, 38],
      length: [14],
    },
    {
      name: "Discover",
      img: BrandCards.Discover,
      initialNumbers: [6],
      length: [16],
    },
    {
      name: "JCB",
      img: BrandCards.JCB,
      initialNumbers: [3, 35],
      length: [16],
    },
  ];

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");

  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);

  const [errorList, setErrorList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState(_couponData);
  const [displayCoupon, setDisplayCoupon] = useState(false);


  const CardBrandImage = ({ cardNumber }) => {
    // Função para encontrar a bandeira do cartão
    const findCardBrand = (number) => {
      // Verifique os primeiros 4 dígitos para maior precisão quando necessário
      const firstFourDigits = number.substring(0, 4);
      const firstTwoDigits = number.substring(0, 2);
      const firstDigit = number.substring(0, 1);

      return cardsBrand.find((brand) =>
        brand.initialNumbers.some((initNum) => {
          // Para comparação com precisão de até 4 dígitos
          const strInitNum = initNum.toString();
          if (strInitNum.length === 4) {
            return firstFourDigits.startsWith(strInitNum);
          } else if (strInitNum.length === 2) {
            return firstTwoDigits === strInitNum;
          } else {
            return firstDigit === strInitNum;
          }
        })
      );
    };

    // Obter a bandeira com base no número do cartão
    const cardBrand = findCardBrand(cardNumber);

    let brand = "";
    if (cardBrand) {
      brand = cardBrand.name.toLowerCase().replace(/\s/g, "");
    }

    // Caso especial para "Diners Club" devido ao compartilhamento de dígitos iniciais
    if (
      cardBrand &&
      cardBrand.name === "diners" &&
      !cardNumber.startsWith("36")
    ) {
      brand = ""; // Resetar bandeira se a condição específica não for atendida
    }

    // Mantenha a lógica do switch se necessário para tratamentos específicos
    // ...

    if (brand === "") {
      return <div></div>; // ou <img src={imgDefault} alt="Default Card" />
    }

    // Usa a função 'BrandCards' para renderizar a imagem baseada na bandeira detectada
    return <BrandCards brand={brand} />;
  };

  var messageTimeOut = null;

  useEffect(() => {
    return () => {
      if (messageTimeOut) clearTimeout(messageTimeOut);
    };
  }, []);

  // Funções de manipulação para cada campo
  const handleCardNumberChange = (e) => {
    let errors = [ ...errorList ];

    let index = errors.indexOf("card-number");
    errors.splice(index, 1);

    setErrorList([ ...errors ]);

    setCardNumber(e.target.value);
  };

  const handleCardHolderChange = (e) => {
    let errors = [ ...errorList ];

    let index = errors.indexOf("card-name");
    errors.splice(index, 1);

    setErrorList([ ...errors ]);

    setCardHolder(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    let errors = [ ...errorList ];

    let index = errors.indexOf("card-expiration");
    errors.splice(index, 1);

    setErrorList([ ...errors ]);

    setExpirationDate(e.target.value);
  };

  const handleCvcChange = (e) => {
    let errors = [ ...errorList ];

    let index = errors.indexOf("card-cvv");
    errors.splice(index, 1);

    setErrorList([ ...errors ]);

    setCvc(e.target.value);
  };

  const buildPaylod = (form) => {
    var {
      addressData = {},
      buyerData = {},
      dataPhone = {},
      modeloSelecionado = {},
      selectedPlan = {}
    } = form;

    var {
      id: product_id = "",
      amount = 0
    } = selectedPlan;

    var {
      celNumber: cellphone = "",
      imei = "",
      nf = ""
    } = dataPhone;

    var {
      cpf = "",
      email = "",
      name = "",
      phone = "",
      birth = "",
      rg = "",
      check = false
    } = buyerData;

    var {
      state = "",
      address = "",
      city = "",
      neighborhood = "",
      number = "",
      cep = "",
      complement = ""
    } = addressData;

    var payload = {
      product_id,
      cellphone,
      imei,
      invoice_date: nf,
      amount,
      customer: {
        cpf: cpf,
        email: email,
        name: name,
        phone: phone,
        birthday: birth,
        rg: rg,        
        address: {
          street: address,
          city: city,
          neighborhood: neighborhood,
          number: number,
          state: state,
          zipcode: cep,
          complement: complement || "",
          state: state,
        },
      },
      phone: {
        modelData: { ...modeloSelecionado },
        planData: { ...selectedPlan }
      },
      coupon: { ..._couponData },
      voucher: { ..._couponData },
    };

    return payload || {};
  };

  const validateCoupon = async () => {
    if (typeof couponCode != "string" || couponCode.length < 1) {
      setCouponData({ code: "", type: "", value: 0, valid: false });
      _setCouponData({ code: "", type: "", value: 0, valid: false });
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    var url = `http://localhost:3050/kakau-bike/process/validate-coupon/${couponCode}`;

    if (enviroment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-bike/process/validate-coupon/${couponCode}`;

    await axios.get(url)
      .then(async (response) => {
        const { data } = response;
        let { error = false, coupon = {} } = data;

        const invalid = error || !coupon || !coupon.active;

        if (invalid) {
          setCouponData({ code: couponCode, type: "", value: 0, valid: false });
          _setCouponData({ code: couponCode, type: "", value: 0, valid: false });
          setIsLoading(false);
          return;
        }

        setCouponData({ code: coupon.code, type: coupon.type, value: coupon.amount, valid: true });
        _setCouponData({ code: coupon.code, type: coupon.type, value: coupon.amount, valid: true });
        setTimeout(()=>{ if (displayCoupon) setDisplayCoupon(false); }, 4000)
        setIsLoading(false);
      })
      .catch((err) => {
        setCouponData({ code: couponCode, type: "", value: 0, valid: false });
        _setCouponData({ code: couponCode, type: "", value: 0, valid: false });
        setIsLoading(false);
        return;
      });
  };

  useEffect(() => {
    if (!_couponData) {
      setCouponCode("");
      setCouponData({ code: "", type: "", value: 0, valid: false });
      _setCouponData({ code: "", type: "", value: 0, valid: false });
      return;
    }

    setCouponCode(_couponData.code || "");

    if (!_couponData || !_couponData.code || typeof _couponData.code != "string" || _couponData.code.length < 1) {
      setCouponData({ code: "", type: "", value: 0, valid: false });
      _setCouponData({ code: "", type: "", value: 0, valid: false });
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    
    var url = `http://localhost:3050/kakau-bike/process/validate-coupon/${_couponData.code}`;
    if (enviroment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-bike/process/validate-coupon/${_couponData.code}`;

    axios.get(url)
      .then(async (response) => {
        const { data } = response;
        let { error = false, coupon = {} } = data;

        const invalid = error || !coupon || !coupon.active;

        if (invalid) {
          setCouponData({ code: _couponData.code, type: "", value: 0, valid: false });
          _setCouponData({ code: _couponData.code, type: "", value: 0, valid: false });

          setIsLoading(false);
          return;
        }

        setCouponData({ code: coupon.code, type: coupon.type, value: coupon.amount, valid: true });
        _setCouponData({ code: coupon.code, type: coupon.type, value: coupon.amount, valid: true });

        setTimeout(()=>{ if (displayCoupon) setDisplayCoupon(false); }, 4000)
        setIsLoading(false);
      })
      .catch((err) => {
        setCouponData({ code: _couponData.code, type: "", value: 0, valid: false });
        _setCouponData({ code: _couponData.code, type: "", value: 0, valid: false });

        setIsLoading(false);
        return;
      });
    
  }, [_couponData.code]);

  const triggerDataLayerEvent = (formData) => {
    window.dataLayer.push({
      event: "purchase-celular-kakau",
      ecommerce: {
        purchase: {
          actionField: {
            transaction_id: "", // ID da transação
            affiliation: "Brasil", // Nome da afiliação
            value: formData?.selectedPlan?.amount, // Valor total
            currency: "BRL", // Moeda
            coupon: "", // Cupom, se aplicável
            payment_method: "Cartão de Crédito", // Método de pagamento
          },
          // Adicione aqui detalhes dos produtos, se necessário
          products: [
            {
              name: "Celular Kakau - Produto",
              id: formData?.selectedPlan?.id,
              price: formData?.selectedPlan?.amount,
              category: "Seguro de Celular",
              quantity: 1,
            },
          ],
        },
      },
    });
  };

  const sendDataToRD = async (formData) => {
    const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;

    var {
      addressData = {},
      buyerData = {},
      dataPhone = {},
      modeloSelecionado = {},
      selectedPlan = {}
    } = formData;

    var {
      celNumber: cellphone = "",
      imei = "",
      nf = ""
    } = dataPhone;

    var {
      brand = {},
      manufacturer_name = "",
    } = modeloSelecionado;

    brand = brand?.name || "";

    var {
      cpf = "",
      email = "",
      name = "",
      phone = "",
    } = buyerData;

    var {
      state = "",
      address = "",
      city = "",
      neighborhood = "",
      number = "",
      cep = "",
      complement = ""
    } = addressData;

    const rdStationData = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "cliente-seguro-celular-kakau",
        email: email,
        name: name,
        cpf: cpf,
        mobile_phone: phone || "Ferrou",
        cf_endereco: address,
        cf_numero_endereco: number,
        cf_complemento: complement,
        cf_bairro: neighborhood,
        cf_cep: cep,
        state: state,
        city: city,
        cf_marca_celular: brand,
        cf_modelo_celular: manufacturer_name,
        cf_data_nf_celular: nf,
        cf_numero_celular_segurado: cellphone,
        cf_imei_celular: imei,
        cf_plano_celular_kakau: selectedPlan?.plan_name,
        traffic_source: formData?.utm_source,
        traffic_medium: formData?.utm_medium,
        traffic_campaign: formData?.utm_campaign,
      },
    };

    const headers = {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },      
    };

    const rdStationResponse = await axios.post(
      `https://api.rd.services/platform/conversions?api_key=${apiKey}`,
      rdStationData,
      headers
    );

    console.log("RD Station Response:", rdStationResponse.data);
  };

  const handleAddCard = async () => {
    let cardData = {
      name: cardHolder,
      number: cardNumber,
      expiration: expirationDate,
      cvv: cvc
    };

    let errors = validate.validateFifthStep(cardData);
    console.log(errors);

    let _cardNumber = cardNumber || '';
    _cardNumber = _cardNumber.replace(/\D/g, '');

    let _card = {
      numberMask: "",
      firstnumbers: cardNumber.slice(0, 6),
      lastNumbers: cardNumber.slice(-4),
      name: cardHolder,
      expiration: expirationDate,
    };

    for(let i in cardNumber) { 
      if (i % 4 && i > 0) _card.numberMask += ' '      
      _card.numberMask += "X"; 
    }

    setErrorList([...errors]);

    if (errors.length > 0) {
      await progress.updateDegubLogData({ ..._card }, 5, errors);
      return;
    }
    
    var formData = {};

    try {
      formData = JSON.parse(sessionStorage.getItem("phoneFormData"));
    }catch(e){
      formData = {};
    }

    errors = validate.validatePayload(formData);

    if (errors.length > 0) {
      setErrorList([...errors]);    
      await progress.updateDegubLogData({ ...formData }, 6, errors);
      console.error('Payload Errors:', errors);
      return;
    }

    setIsLoading(true);

    let params = functions.getParamsFromUrl();

    var dataToSend = buildPaylod(formData) || {};

    if (params && params.t && params.t.length > 0) dataToSend.progressToken = params.t;

    try {
      await fetch("/publicKey.pem")
        .then((response) => response.text())
        .then(async (publicKeyPem) => {
          let encrypted = crypto.encryptData(
            JSON.stringify(cardData),
            publicKeyPem
          );

          let payment = {
            amount: dataToSend.amount * 100,
            ccData: encrypted
          };

          delete dataToSend.amount;

          dataToSend = { ...dataToSend, payment };
        })
        .catch((err) => {
          let error = err;

          if (error && error.response) error = error.response;
          if (error && error.data) error = error.data;

          console.error("Erro ao carregar a chave pública:", error);
        });

      var url = "http://localhost:3050/kakau-phone/checkout/process-payment";
      
      if (enviroment != "SANDBOX") url = "https://api-primesecure.onrender.com/kakau-phone/checkout/process-payment";      

      await axios.post(url, dataToSend)
        .then(async (response)=>{
          let { data = {} } = response;
          let { token = "" } = data;

          console.log(response.data);

          setSuccessToken(token);

          setPurchaseSuccess(true);
          setAlertMessages(['Pagamento processado com sucesso!']);

          triggerDataLayerEvent(formData);

          var _dataToSend = { ...dataToSend };
          _dataToSend.payment.ccData = _card;

          await progress.updateDegubLogData({ dataToSend: _dataToSend, response: data }, 7, false);

          await sendDataToRD(formData);

          setTimeout(() => {
            clearTimeout(messageTimeOut);
            setAlertMessages([]);

            setIsLoading(false);
            progress.navigateTo(8, "/seguro-celular-kakau/cotacao/pagamento-confirmado", navigate);
            //navigate("/seguro-celular-kakau/cotacao/pagamento-confirmado");
          }, 5000);
        })
        .catch(async (err) => {
          setPurchaseSuccess(false);

          let error = err;

          if (error && error.response) error = error.response;
          if (error && error.data) error = error.data;

          await progress.updateDegubLogData({ error }, 7, {errors: error});

          var {
            errors,
            errorResponse = null
          } = error || {};

          if (errorResponse) console.log('Error Response:', errorResponse);          

          if (Array.isArray(errors)) {
            setAlertMessages([ ...errors ]);
    
            clearTimeout(messageTimeOut);

            messageTimeOut = setTimeout(() => {
              setAlertMessages([]);
            }, 6000);
          }

          console.error("Erro ao processar os dados no backend:", error);

          setIsLoading(false); // Finaliza o carregamento em caso de falha
        });
    }catch(e){
      console.error('Erro ao enviar dados para o servidor:', e);
      setIsLoading(false);
    }
  };

  const _handleAddCard = async () => {
    const formData = JSON.parse(sessionStorage.getItem("phoneFormData"));
    setIsLoading(true);

    // Montar o objeto com todas as informações
    const dataToSend = {
      product_id: formData.selectedPlan.id,
      mobile_number: formData.dataPhone.celNumber.replace(/\./g, ""),
      imei: formData.dataPhone.imei,
      invoice_date: formData.dataPhone.nf,

      customer: {
        cpf: formData.buyerData.cpf.replace(/\D/g, ""),
        email: formData.buyerData.email,
        first_name: formData.buyerData.name.split(" ")[0],
        last_name: formData.buyerData.name.split(" ").slice(1).join(" "),
        phone_number: formData.buyerData.phone.replace(/\./g, ""),
        birthday: formData.buyerData.birth,
        address: {
          name: formData.addressData.address,
          city: formData.addressData.city,
          neighborhood: formData.addressData.neighborhood,
          number: formData.addressData.number,
          state: formData.addressData.state,
          zipcode: formData.addressData.cep.replace(/\D/g, ""),
          complement: formData.addressData.complement || "",
        },
      },
      payment: {
        method: "credit_card",
        subscription: {
          //amount: formData.selectedPlanId.amount * 100, // Convertido para centavos
          //installments: 1, // Exemplo fixo de 1 parcela
        },
        credit_card: {
          first_name: cardHolder.split(" ")[0],
          last_name: cardHolder.split(" ").slice(1).join(" "),
          number: cardNumber.replace(/\s/g, ""),
          cvv: cvc,
          month: expirationDate.split("/")[0],
          year: expirationDate.split("/")[1],
        },
      },
      phone: {
        modelData: { ...formData.modeloSelecionado },
        planData: { ...formData.selectedPlan }
      }
    };

    console.log("Dados a serem enviados:", dataToSend);

    try {
      await fetch("/publicKey.pem")
        .then((response) => response.text())
        .then(async (publicKeyPem) => {
          let ccEncrypted = crypto.encryptData(
            JSON.stringify(dataToSend.payment.credit_card),
            publicKeyPem
          );

          dataToSend.payment.credit_card = ccEncrypted;
        })
        .catch((error) => {
          console.error("Erro ao carregar a chave pública:", error);
        });

      await axios
        .post(
          "http://localhost:3050/kakau-phone/checkout/process-payment/credit-card",
          dataToSend
        )
        .then(async (response) => {
          let { data = {} } = response;
          let { token = "" } = data;

          setSuccessToken(token);

          console.log(response.data);

          window.dataLayer.push({
            event: "purchase-celular-kakau",
            ecommerce: {
              purchase: {
                actionField: {
                  transaction_id: "", // ID da transação
                  affiliation: "Brasil", // Nome da afiliação
                  value: formData.selectedPlanId.amount, // Valor total
                  currency: "BRL", // Moeda
                  coupon: "", // Cupom, se aplicável
                  payment_method: "Cartão de Crédito", // Método de pagamento
                },
                // Adicione aqui detalhes dos produtos, se necessário
                products: [
                  {
                    name: "Phone Kakau - Produto",
                    id: formData.selectedPlanId.bike_price_id,
                    price: formData.selectedPlanId.amount,
                    category: "Seguro de Bike",
                    quantity: 1,
                  },
                ],
              },
            },
          });

          const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;
          const rdStationData = {
            event_type: "CONVERSION",
            event_family: "CDP",
            payload: {
              conversion_identifier: "cliente-seguro-celular-kakau",
              email: formData?.buyerData?.email,
              name: formData?.buyerData?.name,
              cpf: formData?.buyerData?.cpf,
              mobile_phone: formData?.buyerData?.phone || "Ferrou",
              cf_endereco: formData?.addressData?.address,
              cf_numero_endereco: formData?.addressData?.number,
              cf_complemento: formData?.addressData?.complement,
              cf_bairro: formData?.addressData?.neighborhood,
              cf_cep: formData?.addressData?.cep,
              cf_modalidade_bike: formData?.dataBike?.modality,
              cf_modelo_bike: formData?.selectedPlanId?.marca,
              cf_ano_bike: formData?.dataBike?.year,
              cf_serie_number_bike: formData?.dataBike?.serieNumber,
              cf_preco_bike: formData?.selectedPlanId?.amount.toString(),
              state: formData?.addressData?.state,
              city: formData?.addressData?.city,
              traffic_source: formData?.utm_source,
              traffic_medium: formData?.utm_medium,
              traffic_campaign: formData?.utm_campaign,
            },
          };

          const rdStationResponse = await axios.post(
            `https://api.rd.services/platform/conversions?api_key=${apiKey}`,
            rdStationData,
            {
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          console.log("RD Station Response:", rdStationResponse.data);

          setTimeout(() => {
            setIsLoading(false); // Desativa o carregamento antes de navegar
            progress.navigateTo(8, "/seguro-celular-kakau/cotacao/pagamento-confirmado", navigate);
            //navigate("/seguro-celular-kakau/cotacao/pagamento-confirmado");
          }, 5000); // Espera por 5 segundos
        })
        .catch((error) => {
          console.error("Erro ao enviar dados para o backend:", error);
          setIsLoading(false); // Finaliza o carregamento em caso de falha
        });
    } catch (error) {
      console.error(
        "Não foi possível criptogradar os dados de pagamento.",
        error
      );
    }
  };

  const navigateToPhoneData = async () => {
    //Envia um evento para o DataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "voltar-dados-celular-celular-kakau",
      // Aqui pode adicionar mais propriedades ao evento, se necessário
    });

    await progress.navigateTo(4, "/seguro-celular-kakau/cotacao/cadastro-celular", navigate);
    //navigate("/seguro-celular-kakau/cotacao/cadastro-celular");
  };

  return (
    <div className="mx-2 relative">
      <ModalCoupon
        coupon={couponCode}
        closeModal={setDisplayCoupon}
        showModal={displayCoupon}
        setCoupon={(value) => {
          setCouponCode(value.toString().toUpperCase());
        }}
        applyCoupon={validateCoupon}
        couponData={_couponData}
      />
      <DisplayMessage alert={(purchaseSuccess ? "success" : "error")} messages={[...alertMessages]} />
      <LayoutCotacaoPlanos title="Finalize o pagamento" position={4} couponData={couponData} />
      <div className="animate__animated animate__fadeInRight  container mx-auto  bg-[#ffffff] rounded-2xl flex flex-col mt-3 md:flex-row gap-8 justify-center sm:justify-between items-center max-w-[1025px] ">
        {/* Formulário */}
        <div className="form bg-[#ffffff] rounded-lg flex flex-col gap-4 w-full md:w-1/2 ">
          <div className="grid gap-1.5">
            <div
              className={`font-semibold text-bluePrime text-[16px] w-fit ml-[5px] mr-auto cursor-pointer hover:text-bluePrime2 ${
                displayCoupon ? "" : ""
              }`}
              onClick={() => setDisplayCoupon(!displayCoupon)}
            >
              Tem um cupom de desconto? Clique aqui.
            </div>
            <label
              htmlFor="card-number"
              className="font-semibold text-lg leading-6 tracking-tight text-uppercase text-grayPrime"
            >
              Número do cartão
            </label>
            <InputMask
              id="card-number"
              className="bg-[#ffffff] border border-[#03a8db] rounded-md h-10 px-4 w-full text-grayPrime uppercase"
              mask={"9999 9999 9999 9999"}
              maskChar={null}
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>

          <div className="grid gap-1.5">
            <label
              htmlFor="card-holder"
              className="font-semibold text-lg leading-6 tracking-tight text-uppercase text-grayPrime"
            >
              Nome do titular
            </label>
            <input
              id="card-holder"
              className="bg-[#ffffff] border border-[#03a8db] rounded-md h-10 px-4 w-full text-grayPrime uppercase"
              onChange={handleCardHolderChange}
              value={cardHolder}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 grid gap-1.5">
              <label
                htmlFor="expiration-date"
                className="font-semibold text-lg leading-6 tracking-tight text-uppercase text-grayPrime"
              >
                Expiração
              </label>
              <InputMask
                id="expiration-date"
                className="bg-[#ffffff] border border-[#03a8db] rounded-md h-10 px-4 w-full text-grayPrime uppercase"
                mask={"99/99"}
                maskChar={null}
                onChange={handleExpirationDateChange}
                value={expirationDate}
              />
            </div>

            <div className="flex-1 grid gap-1.5">
              <label
                htmlFor="security-code"
                className="font-semibold text-lg leading-6 tracking-tight text-uppercase text-grayPrime"
              >
                CVV
              </label>
              <InputMask
                id="security-code"
                className="bg-[#ffffff] border border-[#03a8db] rounded-md h-10 px-4 w-full text-grayPrime uppercase"
                mask={"999"}
                maskChar={null}
                onChange={handleCvcChange}
                value={cvc}
              />
            </div>
          </div>

          <button
            onClick={handleAddCard}
            className="mt-4 flex  h-[50px] justify-center items-center py-4 bg-bluePrime rounded-md cursor-pointer border-none font-bold text-lg leading-7 transition-all duration-300 hover:brightness-110 text-white"
          >
            {isLoading ? <LoadingAnimation /> : "Realizar Pagamento"}
          </button>
        </div>

        {/* Cartão */}
        <div className="p-6 bg-gradient-to-r from-bluePrime to-bluePrime2 rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-between">
            <div>
              <img src={imgDefault} alt="" />
            </div>
            <div>
              <CardBrandImage cardNumber={cardNumber} />
            </div>
          </div>
          <div className="flex justify-between items-center mb-6"></div>
          <div className="text-white text-2xl font-bold text-start ">
            {cardNumber || "0000 0000 0000 0000"}
          </div>
          <div className="mt-3">
            <div className="text-xs text-gray-300 text-start">
              Nome do titular
            </div>
            <div className="text-sm font-bold text-white uppercase text-start">
              {cardHolder || "NOME DO TITULAR"}
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div>
              <div className="text-xs text-gray-300">Expiração</div>
              <div className="text-sm font-bold text-white uppercase">
                {expirationDate || "00/00"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-300">CVC</div>
              <div className="text-sm font-bold text-white uppercase">
                {cvc || "000"}
              </div>
            </div>
            <div>
              <img src={chip} alt="" />
            </div>
          </div>
        </div>
        <button
          onClick={()=>{
            if (isLoading) return;
            navigateToPhoneData();
          }}
          className="mt-4  w-[50%] h-[50px] justify-center items-center py-4 bg-gray-400 rounded-md cursor-pointer border-none font-bold text-lg leading-7 transition-all duration-300 hover:brightness-110 text-white mr-auto flex sm:hidden"
        >
          Voltar
        </button>
      </div>
      <div className={`w-full mx-auto left-0 right-0 max-w-screen-lg absolute top-0 flex`}>
        <button
          onClick={()=>{
            if (isLoading) return;
            navigateToPhoneData();
          }}
          className="mt-4  px-8 my-auto top-0 h-[45px] justify-center items-center py-4 bg-gray-400 rounded-md cursor-pointer border-none font-bold text-lg leading-7 transition-all duration-300 hover:brightness-110 text-white hidden sm:flex"
        >
          Voltar
        </button>        
      </div>
    </div>
  );
}
