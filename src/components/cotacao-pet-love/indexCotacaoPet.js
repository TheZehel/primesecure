import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PriceContainer from './components/priceContainer';
import BuyerData from './components/buyerData';
import PaymentStep from './components/paymentStep';
import GlobalFuntions from '../globalsubcomponentes/globalFunctions';
import HeaderCotacao from './components/HeaderCotacao';
import PetStepValidation from './components/stepsValidation';

import ModalPet from '../seguro-pet/components/modalPet';

import ThankYouPage from './components/ThankYouPage';
import axios from 'axios';
import confetti from 'canvas-confetti';

const globalFunctions = new GlobalFuntions();

const petStepValidation = new PetStepValidation();

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

export default function IndexCotacaoPetlove() {
  const pageSlug = globalFunctions.getPageSlug();

  const slugArray = globalFunctions.getPageSlugArray();

  const [screenReady, setScreenReady] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const [modalPetState, setModalPetState] = useState(false);

  const [reloadComponent, updateComponent] = useState(false);

  const [loading, setLoading] = useState(false);

  const [applyCoupon, setApplyCoupon] = useState(false);

  const [formData, setFormData] = useState({
    petList: [],
    regionData: {
      region: null,
      ibge: null,
    },
    userData: {
      name: '',
      email: '',
      phone: '',
      check: false,
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
        state: '',
      },
      region: {
        ibge: null,
        name: null,
      },
      payment: {
        selected: null,
        values: [0, 0, 0, 0, 0], //[ No discount, Pet discount, Annual discount, Coupon discount, Final value ]
        coupon: {
          code: '',
          value: 0,
          type: 'percentage',
          valid: null,
        },
        cc: {
          monthly: {
            number: '',
            name: '',
            expiration: '',
            cvv: '',
          },
          annual: {
            number: '',
            name: '',
            expiration: '',
            cvv: '',
          },
        },
        pix: {},
      },
    },
  });

  const emptyCC = {
    monthly: {
      number: '',
      name: '',
      expiration: '',
      cvv: '',
    },
    annual: {
      number: '',
      name: '',
      expiration: '',
      cvv: '',
    },
  };

  //console.log('FORMDATA:', formData);

  const navigate = useNavigate();

  function addParamToUrl(url, paramName, paramValue) {
    const urlObject = new URL(url);
    const params = new URLSearchParams(urlObject.search);

    params.set(paramName, paramValue);
    urlObject.search = params.toString();

    return urlObject.toString();
  }

  const saveProgress = async (data, slug, redirect) => {
    const params = new URLSearchParams(window.location.search);
    var token = params.get('token');

    var form = { ...data };
    var _token = '';

    if (token && token.length > 10) {
      form.token = token;
      _token = `?token=${token}`;
    }

    var formUpload = { ...form };
    formUpload.checkoutData.payment.cc = { ...emptyCC };

    setLoading(true);

    //console.log('Upload', formUpload)

    axios
      .post(`${apiUrl}/petlove/process/save-progress`, { ...formUpload })
      .then((response) => {
        let { data: _form } = response;

        console.log('Save', _form);

        if (_form.token) {
          _token = `?token=${_form.token}`;

          const oldUrl = window.location.href;
          const newUrl = addParamToUrl(oldUrl, 'token', _form.token);

          window.history.pushState(null, '', newUrl);
        }

        let ccForm = { ...form.checkoutData.payment.cc };

        if (Object.keys(ccForm).length < 1) {
          ccForm = { ...emptyCC };
        }

        if (_form.checkoutData.payment) {
          _form.checkoutData.payment.cc = ccForm;
        }

        setFormData({ ...form, ..._form });

        setLoading(false);

        if (redirect) {
          navigate(`/${pageSlug}/${slug}${_token}`);
        }
      })
      .catch((err) => {
        let error = { ...err };

        if (error && error.response) {
          error = error.response;
        }

        if (error && error.data) {
          error = error.data;
        }

        console.error('Token Load Error:', error);

        setFormData({ ...form });
        setLoading(false);

        if (redirect) {
          navigate(`/${pageSlug}/${slug}${_token}`);
        }
      });
  };

  const nextStep = (step, data) => {
    var form = { ...formData };

    //console.log('A:', step, data)

    if (step == 2) {
      if (
        slugArray.includes('dados-pessoais') ||
        slugArray.includes('pagamento')
      ) {
        console.error('Error:', slugArray);
        return;
      }

      if (!Array.isArray(data) || data.length < 1) {
        console.error(data);
        return;
      }

      form.petList = data;

      //console.log(form);

      saveProgress(form, 'dados-pessoais', true);

      return;
    }

    if (step == 3) {
      if (
        !data.name ||
        !data.email ||
        !data.phone ||
        !data.check ||
        !slugArray.includes('dados-pessoais')
      ) {
        return;
      }

      form.userData = { ...form.userData, ...data };

      saveProgress(form, 'pagamento', true);

      return;
    }

    if (step == 4) {
      navigate(`/${pageSlug}/obrigado`);
      return;
    }
  };

  const returnTo = (step) => {
    if (!/^[1-4]{1}$/.test(step)) {
      return;
    }

    const pages = ['', 'dados-pessoais', 'pagamento', 'obrigado'];
    //const page = `/${pageSlug}${pages[step - 1]}`;

    saveProgress(formData, pages[step - 1], true);
  };

  const updateData = (index, key, value) => {
    //console.log('Update Data:', index, key, value);
    if (!formData[index] === undefined || !formData[index][key] === undefined) {
      return;
    }

    formData[index][key] = value;
    setFormData(formData);
  };

  const petModalHandler = (form) => {
    if (form.region && /^[0-9]{1,9}$/.test(form.ibge)) {
      setFormData({
        ...formData,
        regionData: {
          region: form.region,
          ibge: form.ibge,
        },
        checkoutData: {
          ...formData.checkoutData,
          region: {
            ibge: form.ibge,
            name: form.region,
          },
        },
      });

      setModalPetState(false);

      updateComponent(!reloadComponent);
    }
  };

  const loadProgress = async (token) => {
    axios
      .get(`${apiUrl}/petlove/process/get-progress/${token}`)
      .then((response) => {
        let { data: form } = response;
        //let { form } = data;

        //console.log('Load Progress:', form);

        delete form.token;
        let _form = { ...formData, ...form };

        let ccForm = { ...form.checkoutData.payment.cc };

        if (Object.keys(ccForm).length < 1) {
          ccForm = { ...emptyCC };
        }

        if (_form.checkoutData.payment) {
          _form.checkoutData.payment.cc = ccForm;
        }

        console.log('Load Form:', _form);

        let formPet = sessionStorage.getItem('formPetData');

        try {
          formPet = JSON.parse(formPet);
        } catch (error) {}

        formPet = { ...formPet };

        formPet.petList = [..._form.petList];
        formPet.petRegion = { ..._form.regionData };
        formPet.userData = { ..._form.userData };

        if (Array.isArray(formData.petList) && formData.petList.length > 0) {
          console.log(formData.petList);

          let sortedPets = formData.petList.sort((a, b) => {
            let price = [
              a.plan.price.replace(/[^0-9]/g, ''),
              b.plan.price.replace(/[^0-9]/g, ''),
            ];

            price[0] = parseInt(price[0]);
            price[1] = parseInt(price[1]);

            if (price[0] > price[1]) {
              return 1;
            }

            if (price[0] < price[1]) {
              return -1;
            }

            return 0;
          });

          console.log('Loaded:', sortedPets);

          formData.petList = [...sortedPets];
        }

        sessionStorage.setItem('formPetData', JSON.stringify(formPet));

        setFormData(_form);

        setScreenReady(true);
      })
      .catch((err) => {
        let error = { ...err };

        if (error && error.response) {
          error = error.response;
        }

        if (error && error.data) {
          error = error.data;
        }

        console.error('Token Load Error:', error);

        setFormData(formData);

        setScreenReady(true);
      });
  };

  useEffect(() => {
    const initScreen = async () => {
      var currentStep = 0;

      if (slugArray.includes('dados-pessoais')) {
        currentStep = 1;
      }

      if (slugArray.includes('pagamento')) {
        currentStep = 2;
      }

      var sessionData = sessionStorage.getItem('formPetData');

      try {
        sessionData = JSON.parse(sessionData);
      } catch (error) {
        sessionData = {};
      }

      if (!sessionData || sessionData == null) {
        sessionData = {};
      }

      if (
        !sessionData ||
        !sessionData.petRegion ||
        !sessionData.petRegion.ibge ||
        !sessionData.petRegion.region
      ) {
        sessionData.petList = [];

        sessionStorage.setItem('formPetData', JSON.stringify(sessionData));

        setModalPetState(true);
      }

      //try {
      //  sessionData = JSON.parse(sessionData);
      //} catch (error) {
      //  sessionData = null;
      //}

      //console.log('Form Region:', sessionData);

      const data = sessionData || {};

      formData.regionData = {
        region: null,
        ibge: null,
        error: true,
      };

      try {
        if (petStepValidation.regionValidate(data.petRegion)) {
          formData.regionData = data.petRegion;
        }
      } catch (error) {
        console.error('Init pet data error:', error);
      }

      try {
        formData.petList = petStepValidation.firstStepValidation(data.petList);
      } catch (error) {
        console.error('Init pet data error:', error);
      }

      if (Array.isArray(formData.petList) && formData.petList.length > 0) {
        console.log(formData.petList);

        let sortedPets = formData.petList.sort((a, b) => {
          let price = [
            a.plan.price.replace(/[^0-9]/g, ''),
            b.plan.price.replace(/[^0-9]/g, ''),
          ];

          price[0] = parseInt(price[0]);
          price[1] = parseInt(price[1]);

          if (price[0] > price[1]) {
            return 1;
          }

          if (price[0] < price[1]) {
            return -1;
          }

          return 0;
        });

        console.log(sortedPets);

        formData.petList = [...sortedPets];
      }

      var userData = data.userData || {};

      var addressData = data.addressData || {};

      var regionData = data.petRegion || {};

      //console.log('Region Data:', regionData)

      try {
        formData.userData = {
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          check: userData.check || false,
          //cpf: userData.cpf || '',
          //address: { ...userData }
        };

        formData.regionData = {
          region: regionData.region || null,
          ibge: regionData.ibge || null,
        };
      } catch (error) {
        console.error('Init user data error:', error);
      }

      try {
        formData.checkoutData.customer.cpf = userData.cpf || '';

        formData.checkoutData.address = {
          ...formData.checkoutData.address,
          ...addressData,
        };

        formData.checkoutData.region = {
          ...formData.checkoutData.region,
          ibge: regionData.ibge || null,
          name: regionData.region || null,
        };
      } catch (error) {
        console.error('Init checkout data error:', error);
      }

      //console.log("Form Data:", formData);

      setFormData(formData);

      setScreenReady(true);
    };

    const initToken = async (token) => {
      loadProgress(token);
    };

    var token = '';

    try {
      const params = new URLSearchParams(window.location.search);
      token = params.get('token');

      if (token && token.length > 10) {
        //token = token.toLocaleUpperCase();
        initToken(token);
      } else {
        initScreen();
      }
    } catch (error) {
      console.error('Form Load Error:', error);
    }

    try {
      if (token) {
        return;
      }

      if (
        formData.regionData.error ||
        !formData.regionData.ibge ||
        !formData.regionData.region
      ) {
        setModalPetState(true);

        let form = {
          ...formData,
          petList: [],
        };

        setFormData(form);

        returnTo(1);

        return;
      }

      //console.log(formData.regionData);

      if (currentStep > 0) {
        if (formData.petList.length < 1) {
          returnTo(1);
          return;
        }

        if (currentStep == 2) {
          if (!petStepValidation.secondStepValidation(formData.userData)) {
            returnTo(2);
            return;
          }
        }
      }
    } catch (error) {
      console.error('Init Form Error:', error);
    }
  }, []);

  if (slugArray.includes('dados-pessoais') && screenReady) {
    return (
      <div>
        <BuyerData
          formData={formData}
          submitForm={nextStep}
          updateForm={updateData}
          returnTo={returnTo}
          reload={reloadComponent}
        />
        <ModalPet
          openModal={modalPetState}
          closeModal={() => {
            console.log('Close Modal');
          }}
          sendForm={petModalHandler}
          lastStep={true}
          required={true}
        />
      </div>
    );
  }

  if (slugArray.includes('pagamento') && screenReady) {
    return (
      <div>
        <PaymentStep
          returnTo={returnTo}
          updateForm={updateData}
          formData={formData}
          reload={reloadComponent}
          applyCoupon={applyCoupon}
          uploadToken={() => {
            saveProgress(formData, 'pagamento', false);
          }}
        />
        <ModalPet
          openModal={modalPetState}
          closeModal={() => {
            console.log('Close Modal');
          }}
          sendForm={petModalHandler}
          lastStep={true}
          required={true}
        />
      </div>
    );
  }

  if (slugArray.includes('obrigado') && screenReady) {
    return (
      <div>
        <ThankYouPage />
      </div>
    );
  }

  return (
    <div>
      <PriceContainer
        submitForm={nextStep}
        returnTo={returnTo}
        reload={reloadComponent}
      />
      <ModalPet
        openModal={modalPetState}
        closeModal={() => {
          console.log('Close Modal');
        }}
        sendForm={petModalHandler}
        lastStep={true}
        required={true}
      />
    </div>
  );
}
