import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import Assistance from './components/Assistance';
import FormSeguroBikeBanner from './components/FormSeguroBikeBanner';
import NoBureaucracy from './components/NoBureaucracy';
import Plans from './components/Plans';
import Faq from './components/Faq';
import Virtual from './components/Virtual';
import Benefits from './components/Benefits';
import Advantages from './components/Advantages';
import CustomeFooter from './cotacao-seguro-bike/components/subcomponents/CustomFooter';
import BannerPromoBike from './components/BannersPromoBike';

export default function IndexSeguroBike() {
  const [lastStep, setLastStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

  const sendForm = (data) => {
    let form = {
      ...formData,
      ...data,
    };

    console.log('Enviando Formulário:', form);

    var sessionData = sessionStorage.getItem('formBikeData');

    try {
      sessionData = JSON.parse(sessionData);
    } catch (error) {
      console.error('Session Error:', error);
      sessionData = {};
    }

    if (!sessionData) {
      sessionData = {};
    }

    let userData = {};

    if (sessionData.userData) {
      userData = { ...sessionData.userData };
    }

    userData = {
      ...userData,
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    sessionData = {
      ...sessionData,
      userData: userData,
    };

    sessionStorage.setItem('formBikeData', JSON.stringify(sessionData));

    setFormData(form);

    navigate('/seguro-bike/cotacao');
  };

  return (
    <div>
      {/* <BannerPromoBike /> */}
      <FormSeguroBikeBanner
        callback={(data) => {
          sendForm({ ...data });
        }}
      />
      <Plans />
      <Virtual />
      <Assistance />
      <NoBureaucracy />
      <Advantages />
      <Benefits />
      <Faq />
      <CustomeFooter />
    </div>
  );
}
