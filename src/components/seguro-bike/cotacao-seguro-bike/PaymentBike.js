import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LayoutCotacaoPlanos from './components/subcomponents/LayoutCotacao';
import chip from '../../../assets/svg/payment-card/cc-chip.svg';
import bandeira from '../../../assets/svg/payment-card/cc-visa.svg';
import imgDefault from '../../../assets/svg/payment-card/cc-icon.svg';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { Checkbox, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import BrandCards from '../../modules/BrandCards';
import 'animate.css';
import LoadingAnimation from './components/subcomponents/loadingSvg';
import DisplayMessage from './components/subcomponents/DisplayMessage';

import ReCAPTCHA from 'react-google-recaptcha';

import CryptoFunctions from '../../globalsubcomponentes/CryptoFunctions';
import ValidateSteps from './components/modules/_validations';
import { clear } from '@testing-library/user-event/dist/clear';

import ModalCoupon from './components/subcomponents/ModalCoupon';
import GlobalFuntions from '../../globalsubcomponentes/globalFunctions';

const crypto = new CryptoFunctions();

const validate = new ValidateSteps();
const functions = new GlobalFuntions();

const enviroment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

const ccNumberFormated = (cc) => {
  cc = cc.toString().replace(/\D/g, '');
  cc = cc.replace(/(\d{4})(?=\d)/g, '$1 ');

  return cc || '0000 0000 0000 0000';
};

const cardsBrand = [
  {
    name: 'Visa',
    img: BrandCards('visa'),
    initialNumbers: [4],
    length: [16],
  },

  {
    name: 'Mastercard',
    img: BrandCards.Mastercard,
    initialNumbers: [5],
    length: [16],
  },
  {
    name: 'American Express',
    img: BrandCards.AmericanExpress,
    initialNumbers: [3, 37],
    length: [15],
  },
  {
    name: 'Diners Club',
    img: BrandCards.DinersClub,
    initialNumbers: [30, 36, 38],
    length: [14],
  },
  {
    name: 'Discover',
    img: BrandCards.Discover,
    initialNumbers: [6],
    length: [16],
  },
  {
    name: 'JCB',
    img: BrandCards.JCB,
    initialNumbers: [3, 35],
    length: [16],
  },
];

export default function PaymentBike({
  brand,
  setSuccessToken,
  recaptchaRef,
  couponToken,
  setCoupon,
  initCoupon,
  _coupon,
}) {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState(''); //useState("4111111111111111");
  const [cardHolder, setCardHolder] = useState(''); //useState("MATHEUS MARQUES");
  const [expirationDate, setExpirationDate] = useState(''); //useState("11/30");
  const [cvc, setCvc] = useState(''); //useState("010");

  const [displayCoupon, setDisplayCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState({
    code: '',
    type: '',
    value: 0,
    valid: null,
  });

  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);

  const [errorList, setErrorList] = useState([]);

  const [recaptchaVersion, setRecaptchaVersion] = useState(3);
  const recaptchaV2Ref = React.createRef();

  const [planData, setPlanData] = useState({});

  var messageTimeOut = null;

  useEffect(() => {
    const currentStepIndex = 4; // Step do componente atual
    let lastCompletedStepIndex = parseInt(
      sessionStorage.getItem('lastCompletedStepIndex') || '0',
      10,
    );

    // Atualiza lastCompletedStepIndex se o usuário estiver avançando para uma nova etapa
    if (currentStepIndex > lastCompletedStepIndex) {
      sessionStorage.setItem(
        'lastCompletedStepIndex',
        String(currentStepIndex),
      );
      lastCompletedStepIndex = currentStepIndex; // Garante que a lógica abaixo use o valor atualizado
    }

    // Verifica se o usuário tem permissão para acessar a etapa atual
    if (currentStepIndex > lastCompletedStepIndex + 1) {
      // Redireciona para a etapa permitida mais avançada
      navigate('/seguro-bike/cotacao/');
    }
  }, [navigate]);

  useEffect(() => {
    var formData = {};
    try {
      formData = JSON.parse(sessionStorage.getItem('bikeFormData'));
    } catch (e) {
      formData = {};
    }

    if (formData && formData.selectedPlanId)
      setPlanData(formData.selectedPlanId);

    //console.log(initCoupon, couponData)

    //if ((!couponData || !couponData.code || !couponData.valid) && (initCoupon && (initCoupon.valid || initCoupon.active))) setCouponData(initCoupon);

    return () => {
      if (messageTimeOut) clearTimeout(messageTimeOut);
    };
  }, []);

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
        }),
      );
    };

    // Obter a bandeira com base no número do cartão
    const cardBrand = findCardBrand(cardNumber);

    let brand = '';
    if (cardBrand) {
      brand = cardBrand.name.toLowerCase().replace(/\s/g, '');
    }

    // Caso especial para "Diners Club" devido ao compartilhamento de dígitos iniciais
    if (
      cardBrand &&
      cardBrand.name === 'diners' &&
      !cardNumber.startsWith('36')
    ) {
      brand = ''; // Resetar bandeira se a condição específica não for atendida
    }

    // Mantenha a lógica do switch se necessário para tratamentos específicos
    // ...

    if (brand === '') {
      return <div></div>; // ou <img src={imgDefault} alt="Default Card" />
    }

    // Usa a função 'BrandCards' para renderizar a imagem baseada na bandeira detectada
    return <BrandCards brand={brand} />;
  };

  console.log(errorList, planData);

  // Funções de manipulação para cada campo
  const handleCardNumberChange = (e) => {
    let errors = [...errorList];

    let index = errors.indexOf('card-number');
    errors.splice(index, 1);

    setErrorList([...errors]);

    setCardNumber(e.target.value);
  };

  const handleCardHolderChange = (e) => {
    let errors = [...errorList];

    let index = errors.indexOf('card-name');
    errors.splice(index, 1);

    setErrorList([...errors]);

    setCardHolder(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    let errors = [...errorList];

    let index = errors.indexOf('card-expiration');
    errors.splice(index, 1);

    setErrorList([...errors]);

    setExpirationDate(e.target.value);
  };

  const handleCvcChange = (e) => {
    let errors = [...errorList];

    let index = errors.indexOf('card-cvv');
    errors.splice(index, 1);

    setErrorList([...errors]);

    setCvc(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);

  const buildPaylod = (form) => {
    var {
      selectedPlanId = {},
      dataBike = {},
      buyerData = {},
      addressData = {},
    } = form;

    var {
      plan_id = '',
      marcaId = '',
      bike_price_id = '',
      id = '',
      marca = '',
      amount = '',
    } = selectedPlanId;

    var { modality = '', year = '', serieNumber = '' } = dataBike;

    var {
      state = '',
      address = '',
      city = '',
      neighborhood = '',
      number = '',
      cep = '',
      complement = '',
    } = addressData;

    var {
      cpf = '',
      email = '',
      name = '',
      phone = '',
      birth = '',
      rg = '',
      check = false,
    } = buyerData;

    var payload = {
      plan_id: id,
      bike_brand_id: marcaId,
      bike_plan_id: id,
      bike_modality_id: parseInt(modality, 10),
      bike_model: marca,
      bike_year: parseInt(year, 10),
      bike_serial_number: serieNumber,
      amount: amount,
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
          complement: complement || '',
          state: state,
        },
      },
      coupon: { ..._coupon },
      voucher: { ..._coupon },
    };

    //console.log(payload);

    return payload || {};
  };

  const triggerDataLayerEvent = async (formData) => {
    //if (enviroment == 'SANDBOX') { return; }

    window.dataLayer.push({
      event: 'purchase-bike-kakau',
      ecommerce: {
        purchase: {
          actionField: {
            email: formData?.buyerData?.email, // Email do comprador
            transaction_id: '', // ID da transação
            affiliation: 'Brasil', // Nome da afiliação
            value: formData?.selectedPlanId?.amount, // Valor total
            currency: 'BRL', // Moeda
            coupon: '', // Cupom, se aplicável
            payment_method: 'Cartão de Crédito', // Método de pagamento
          },
          // Adicione aqui detalhes dos produtos, se necessário
          products: [
            {
              name: 'Bike Kakau - Produto',
              id: formData?.selectedPlanId?.bike_price_id,
              price: formData?.selectedPlanId?.amount,
              category: 'Seguro de Bike',
              quantity: 1,
            },
          ],
        },
      },
    });
  };

  const sendDataToRD = async (formData) => {
    const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;

    const rdStationData = {
      event_type: 'CONVERSION',
      event_family: 'CDP',
      payload: {
        conversion_identifier: 'cliente-seguro-bike-kakau',
        email: formData?.buyerData?.email,
        name: formData?.buyerData?.name,
        cpf: formData?.buyerData?.cpf,
        mobile_phone: formData?.buyerData?.phone || 'Ferrou',
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

    const headers = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const rdStationResponse = await axios.post(
      `https://api.rd.services/platform/conversions?api_key=${apiKey}`,
      rdStationData,
      headers,
    );

    console.log('RD Station Response:', rdStationResponse.data);
  };

  const handleAddCard = async () => {
    let cardData = {
      name: cardHolder,
      number: cardNumber,
      expiration: expirationDate,
      cvv: cvc,
    };

    //console.log(cardData)

    let errors = validate.validateFifthStep(cardData);

    console.log(errors);

    setErrorList([...errors]);

    let debugToken = validate.getDebugToken();
    //console.log("Debug Token A", debugToken);

    let params = functions.getParamsFromUrl();

    let _cardNumber = cardNumber || '';
    _cardNumber = _cardNumber.replace(/\D/g, '');

    let _card = {
      numberMask: '',
      firstnumbers: cardNumber.slice(0, 6),
      lastNumbers: cardNumber.slice(-4),
      name: cardHolder,
      expiration: expirationDate,
    };

    for (let i in cardNumber) {
      if (i % 4 && i > 0) _card.numberMask += ' ';
      _card.numberMask += 'X';
    }

    if (errors.length > 0) {
      await axios
        .post(`${apiUrl}/kakau-bike/log-history/update`, {
          logToken: debugToken,
          step: 5,
          data: { ..._card, errors },
          error: true,
        })
        .then((response) => {
          console.log('Usuário atualizado com sucesso', response.data);
          const { success, token } = response.data;

          console.log('Token', token, 'Success', success);

          if (success && token) {
            debugToken = token;
            validate.setDebugToken(token);
          }
        })
        .catch((err) => {
          let error = err;

          if (error && error.response) error = error.response;
          if (error && error.data) error = error.data;

          console.error('Erro ao atualizar usuário', error);
        });
      return;
    }

    var formData = {};

    try {
      formData = JSON.parse(sessionStorage.getItem('bikeFormData'));
    } catch (e) {
      formData = {};
    }

    console.log(formData);

    errors = validate.validatePayload(formData);

    if (errors.length > 0) {
      await axios
        .post(`${apiUrl}/kakau-bike/log-history/update`, {
          logToken: debugToken,
          step: 6,
          data: { ...formData, errors },
          error: true,
        })
        .then((response) => {
          console.log('Usuário atualizado com sucesso', response.data);
          const { success, token } = response.data;

          console.log('Token', token, 'Success', success);

          if (success && token) {
            debugToken = token;
            validate.setDebugToken(token);
          }
        })
        .catch((err) => {
          let error = err;

          if (error && error.response) error = error.response;
          if (error && error.data) error = error.data;

          console.error('Erro ao atualizar usuário', error);
        });
      setErrorList([...errors]);
      console.error('Payload Errors:', errors);
      return;
    }

    setIsLoading(true);

    var dataToSend = buildPaylod(formData) || {};

    if (params && params.t && params.t.length > 0)
      dataToSend.progressToken = params.t;

    dataToSend.recaptcha = {
      token: null,
      version: recaptchaVersion,
    };

    try {
      /*
      let token = "";

      if (recaptchaVersion == 3) {
        token = await new Promise(async (resolve, reject) => {
          try {
            let t = await recaptchaRef.executeAsync();
            resolve(t);
          } catch (e) {
            console.error("Erro ao capturar token do Recaptcha:", e);
            resolve(null);
          }
        });
      }

      if (recaptchaVersion == 2) {
        token = recaptchaV2Ref.current.getValue();

        if (!token) {
          setAlertMessages(["recaptcha-expired"]);

          clearTimeout(messageTimeOut);

          messageTimeOut = setTimeout(() => {
            setAlertMessages([]);
          }, 6000);
        }
      }

      dataToSend.recaptcha.token = token;
      */
    } catch (e) {
      console.error('Erro ao capturar token do Recaptcha:', e);
      setIsLoading(false);
    }

    //console.log(dataToSend)

    //if (!dataToSend.recaptcha.token) {
    //  setIsLoading(false);
    //  return;
    //}

    try {
      await fetch('/publicKey.pem')
        .then((response) => response.text())
        .then(async (publicKeyPem) => {
          let encrypted = crypto.encryptData(
            JSON.stringify(cardData),
            publicKeyPem,
          );

          let payment = {
            amount: dataToSend.amount * 100,
            ccData: encrypted,
          };

          delete dataToSend.amount;

          dataToSend = { ...dataToSend, payment };
        })
        .catch((err) => {
          let error = err;

          if (error && error.response) error = error.response;

          if (error && error.data) error = error.data;

          console.error('Erro ao carregar a chave pública:', error);
        });

      var url =
        'http://localhost:3050/kakau-bike/process/process-payment/credit-card';

      if (enviroment != 'SANDBOX') {
        url =
          'https://api-primesecure.onrender.com/kakau-bike/process/process-payment/credit-card';
      }

      await axios
        .post(url, dataToSend)
        .then(async (response) => {
          let { data = {} } = response;
          let { token = '' } = data;

          console.log(response.data);

          setSuccessToken(token);

          setPurchaseSuccess(true);
          setAlertMessages(['Pagamento processado com sucesso!']);

          triggerDataLayerEvent(formData);

          await sendDataToRD(formData);

          var _dataToSend = { ...dataToSend };
          _dataToSend.payment.ccData = _card;

          await axios
            .post(`${apiUrl}/kakau-bike/log-history/update`, {
              logToken: debugToken,
              step: 7,
              data: { dataToSend: _dataToSend, response: data },
              error: false,
            })
            .then((response) => {
              console.log('Usuário atualizado com sucesso', response.data);
              const { success, token } = response.data;

              console.log('Token', token, 'Success', success);

              if (success && token) {
                debugToken = token;
                validate.setDebugToken(token);
              }
            })
            .catch((err) => {
              let error = err;

              if (error && error.response) error = error.response;
              if (error && error.data) error = error.data;

              console.error('Erro ao atualizar usuário', error);
            });

          setTimeout(() => {
            clearTimeout(messageTimeOut);
            setAlertMessages([]);

            setIsLoading(false);

            let url = functions.setPathFromParams(
              '/seguro-bike/cotacao/pagamento-confirmado',
              { ...params, t: debugToken },
            );
            navigate(url);
          }, 5000);
        })
        .catch(async (err) => {
          setPurchaseSuccess(false);

          let error = err;

          if (error && error.response) error = error.response;

          if (error && error.data) error = error.data;

          error = { ...error };

          await axios
            .post(`${apiUrl}/kakau-bike/log-history/update`, {
              logToken: debugToken,
              step: 7,
              data: { error },
              error: true,
            })
            .then((response) => {
              console.log('Usuário atualizado com sucesso', response.data);
              const { success, token } = response.data;

              console.log('Token', token, 'Success', success);

              if (success && token) {
                debugToken = token;
                validate.setDebugToken(token);
              }
            })
            .catch((err) => {
              let error = err;

              if (error && error.response) error = error.response;
              if (error && error.data) error = error.data;

              console.error('Erro ao atualizar usuário', error);
            });

          var { errors, errorResponse = null } = error;

          if (errorResponse) console.log('Error Response:', errorResponse);

          if (Array.isArray(errors)) {
            setAlertMessages([...errors]);

            if (
              errors.includes('recaptcha-invalid') ||
              errors.includes('recaptcha-failed')
            ) {
              setRecaptchaVersion(2);
            }

            clearTimeout(messageTimeOut);

            messageTimeOut = setTimeout(() => {
              setAlertMessages([]);
            }, 6000);
          }

          console.error('Erro ao processar os dados no backend:', error);

          setIsLoading(false); // Finaliza o carregamento em caso de falha
        });
    } catch (e) {
      console.error('Erro ao enviar dados para o servidor:', e);
      setIsLoading(false);
    }
  };

  const validateCoupon = async () => {
    if (typeof couponCode != 'string' || couponCode.length < 1) {
      setCouponData({ code: '', type: '', value: 0, valid: false });
      setCoupon({ code: '', type: '', value: 0, valid: false });
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    var url = `http://localhost:3050/kakau-bike/process/validate-coupon/${couponCode}`;

    if (enviroment != 'SANDBOX')
      url = `https://api-primesecure.onrender.com/kakau-bike/process/validate-coupon/${couponCode}`;

    await axios
      .get(url)
      .then(async (response) => {
        const { data } = response;
        let { error = false, coupon = {} } = data;

        const invalid = error || !coupon || !coupon.active;

        if (invalid) {
          setCouponData({ code: couponCode, type: '', value: 0, valid: false });
          setCoupon({ code: couponCode, type: '', value: 0, valid: false });
          setIsLoading(false);
          return;
        }

        setCouponData({
          code: coupon.code,
          type: coupon.type,
          value: coupon.amount,
          valid: true,
        });
        setCoupon({
          code: coupon.code,
          type: coupon.type,
          value: coupon.amount,
          valid: true,
        });
        setTimeout(() => {
          if (displayCoupon) setDisplayCoupon(false);
        }, 4000);
        setIsLoading(false);
      })
      .catch((err) => {
        setCouponData({ code: couponCode, type: '', value: 0, valid: false });
        setCoupon({ code: couponCode, type: '', value: 0, valid: false });
        setIsLoading(false);
        return;
      });
  };

  useEffect(() => {
    if (!_coupon) {
      setCouponCode('');
      setCouponData({ code: '', type: '', value: 0, valid: false });
      setCoupon({ code: '', type: '', value: 0, valid: false });
      return;
    }

    setCouponCode(_coupon.code || '');

    if (
      !_coupon ||
      !_coupon.code ||
      typeof _coupon.code != 'string' ||
      _coupon.code.length < 1
    ) {
      setCouponData({ code: '', type: '', value: 0, valid: false });
      setCoupon({ code: '', type: '', value: 0, valid: false });
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    var url = `http://localhost:3050/kakau-bike/process/validate-coupon/${_coupon.code}`;
    if (enviroment != 'SANDBOX')
      url = `https://api-primesecure.onrender.com/kakau-bike/process/validate-coupon/${_coupon.code}`;

    axios
      .get(url)
      .then(async (response) => {
        const { data } = response;
        let { error = false, coupon = {} } = data;

        const invalid = error || !coupon || !coupon.active;

        if (invalid) {
          setCouponData({
            code: _coupon.code,
            type: '',
            value: 0,
            valid: false,
          });
          setCoupon({ code: _coupon.code, type: '', value: 0, valid: false });

          setIsLoading(false);
          return;
        }

        setCouponData({
          code: coupon.code,
          type: coupon.type,
          value: coupon.amount,
          valid: true,
        });
        setCoupon({
          code: coupon.code,
          type: coupon.type,
          value: coupon.amount,
          valid: true,
        });

        setTimeout(() => {
          if (displayCoupon) setDisplayCoupon(false);
        }, 4000);
        setIsLoading(false);
      })
      .catch((err) => {
        setCouponData({ code: _coupon.code, type: '', value: 0, valid: false });
        setCoupon({ code: _coupon.code, type: '', value: 0, valid: false });

        setIsLoading(false);
        return;
      });
  }, [_coupon.code]);

  return (
    <div className="mx-2">
      <ModalCoupon
        coupon={couponCode}
        closeModal={setDisplayCoupon}
        showModal={displayCoupon}
        setCoupon={(value) => {
          setCouponCode(value.toString().toUpperCase());
        }}
        applyCoupon={validateCoupon}
        couponData={_coupon}
      />
      <DisplayMessage
        alert={purchaseSuccess ? 'success' : 'error'}
        messages={[...alertMessages]}
      />
      <LayoutCotacaoPlanos
        title="Finalize o pagamento"
        position={4}
        couponData={_coupon}
      />
      <div className="animate__animated animate__fadeInRight  container mx-auto  bg-[#ffffff] rounded-2xl flex flex-col mt-3 md:flex-row gap-8 justify-center sm:justify-between items-center max-w-[1025px] ">
        {/* Formulário */}
        <div className="form bg-[#ffffff] rounded-lg flex flex-col gap-4 w-full md:w-1/2 ">
          <div
            className={`font-semibold text-bluePrime text-[16px] w-fit ml-[5px] mr-auto cursor-pointer hover:text-bluePrime2 ${
              displayCoupon ? '' : ''
            }`}
            onClick={() => setDisplayCoupon(!displayCoupon)}
          >
            Tem um cupom de desconto? Clique aqui.
          </div>
          <div className="grid gap-1.5">
            <label
              htmlFor="card-number"
              className="font-semibold text-lg leading-6 tracking-tight text-uppercase text-grayPrime"
            >
              Número do cartão
            </label>
            <InputMask
              id="card-number"
              className={`bg-[#ffffff] border rounded-md h-10 px-4 w-full text-grayPrime uppercase ${
                errorList.includes('card-number')
                  ? 'border-red-500 animate__animated animate__bounce'
                  : 'border-[#03a8db]'
              }`}
              mask={'9999 9999 9999 9999'}
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
              className={`bg-[#ffffff] border rounded-md h-10 px-4 w-full text-grayPrime uppercase ${
                errorList.includes('card-name')
                  ? 'border-red-500 animate__animated animate__bounce'
                  : 'border-[#03a8db]'
              }`}
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
                className={`bg-[#ffffff] border rounded-md h-10 px-4 w-full text-grayPrime uppercase ${
                  errorList.includes('card-expiration')
                    ? 'border-red-500 animate__animated animate__bounce'
                    : 'border-[#03a8db]'
                }`}
                mask={'99/99'}
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
                className={`bg-[#ffffff] border rounded-md h-10 px-4 w-full text-grayPrime uppercase ${
                  errorList.includes('card-cvv')
                    ? 'border-red-500 animate__animated animate__bounce'
                    : 'border-[#03a8db]'
                }`}
                mask={'999'}
                maskChar={null}
                onChange={handleCvcChange}
                value={cvc}
              />
            </div>
          </div>
          <div
            className={`w-full ${recaptchaVersion == 3 ? 'hidden' : 'flex'}`}
          >
            <div className={`mr-auto mt-3 flex`}>
              <ReCAPTCHA
                ref={recaptchaV2Ref}
                sitekey="6LcPxSEoAAAAAMqfJybG3yJBIO-Ox1oaC6jIrSPV"
                onChange={(token) => {
                  console.log('Recaptcha V2', token);
                }}
              />
            </div>
          </div>

          <button
            onClick={handleAddCard}
            className="mt-4 flex  h-[50px] justify-center items-center py-4 bg-bluePrime rounded-md cursor-pointer border-none font-bold text-lg leading-7 transition-all duration-300 hover:brightness-110 text-white"
          >
            {isLoading ? <LoadingAnimation /> : 'Realizar Pagamento'}
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
            {ccNumberFormated(cardNumber) || '0000 0000 0000 0000'}
          </div>
          <div className="mt-3">
            <div className="text-xs text-gray-300 text-start">
              Nome do titular
            </div>
            <div className="text-sm font-bold text-white uppercase text-start">
              {cardHolder || 'NOME DO TITULAR'}
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div>
              <div className="text-xs text-gray-300">Expiração</div>
              <div className="text-sm font-bold text-white uppercase">
                {expirationDate || '00/00'}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-300">CVV</div>
              <div className="text-sm font-bold text-white uppercase">
                {cvc || '000'}
              </div>
            </div>
            <div>
              <img src={chip} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
