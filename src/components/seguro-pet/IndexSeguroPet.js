//Seo
import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Components

import FormSeguroPetBanner from './components/FormSeguroPetBanner';
//import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
//import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from '../globalsubcomponentes/ConteudoSessaoInfo';
import sessaoInfoLp from '../modules/SessaoInfoLp';
import FaqPet from './components/subcomponents/FaqPet';
import PlanSlider from './components/planSlider';
import ModalPet from './components/modalPet';
import CountDown from './components/subcomponents/CountDownBanner';
import DiscountsAndAdvantages from './components/DiscountsAndAdvantages';
import HealthDecisionSection from './components/HealthDecisionSection';
import HowItWorksSection from './components/HowItWorksSection';
import MicroChipSection from './components/MicroChipSection';
import Partners from './components/Partners';
import PetLocator from './components/PetLocator';
import TestimonialVideos from './components/TestimonialVideos';
import BestClinics from './components/BestClinics';
import LifePet from './components/LifePet';
import SpecializedService from './components/SpecializedService';
import SomeQuestions from './components/SomeQuestions';
import Cancel from './components/Cancel';
import CoParticipation from './components/CoParticipation';
import CredentialNetworkBanner from './components/CredentialNetworkBanner';
import BannerPromos from './components/BannerPromosPet';
import confetti from 'canvas-confetti';

function IndexSeguroPet() {
  const [lastStep, setLastStep] = useState(0);

  const [modalOpen, setModalIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    ibge: '',
  });

  useEffect(() => {
    const hasVisited = localStorage.getItem('visited');
    if (!hasVisited) {
      const audio = new Audio(
        'https://storage.googleapis.com/primesecure/audios-site/carnaval-eft.mp3',
      );
      audio.volume = 0.1;
      audio
        .play()
        .then(() => {
          // Dispara confetes durante 3 segundos
          const duration = 3000;
          const animationEnd = Date.now() + duration;
          const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0,
          };

          function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
          }

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
              clearInterval(interval);
              return;
            }
            const particleCount = 50 * (timeLeft / duration);
            confetti(
              Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0, 0.5), y: Math.random() - 0.2 },
              }),
            );
            confetti(
              Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.5, 1), y: Math.random() - 0.2 },
              }),
            );
          }, 250);
        })
        .catch((error) => {
          console.error('Erro ao reproduzir o áudio:', error);
        });

      localStorage.setItem('visited', 'true');
    }
  }, []);

  const navigate = useNavigate();

  const closeModal = (data) => {
    setModalIsOpen(false);
  };

  const openModalStep = (step) => {
    setLastStep(step);
    setModalIsOpen(true);
  };

  const sendForm = (data) => {
    let form = {
      ...formData,
      ...data,
    };

    console.log('Enviando Formulário:', form);

    var sessionData = sessionStorage.getItem('formPetData');

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

    sessionStorage.setItem('formPetData', JSON.stringify(sessionData));

    setFormData(form);

    navigate('/cotacao-pet-love');
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  const targetDate = new Date('December 31, 2023 00:00:00');
  return (
    <div className="IndexSeguroPet">
      <Helmet>
        <title>Plano de Saúde PetLove | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="O Plano de Saúde Pet oferece uma ampla rede de clínicas e profissionais qualificados para o bem-estar completo do seu pet."
        />

        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Plano de Saúde Pet, Saúde Pet, Plano Pet, Prime, Cobertura para Pets, Seguro para Cães, Seguro para Gatos, Plano de Saúde para Animais, Assistência Veterinária, Cobertura Veterinária, Plano de Saúde Animal, Seguro Pet Online, Seguro Pet Confiável, Seguro para Animais de Estimação, Cuidados com Pets, Bem-estar Animal, Plano Pet Completo, Plano Pet Personalizado, Seguro Pet Integral, Seguro Pet Emergencial"
        />
        <meta
          property="og:title"
          content="Plano de Saúde PetLove | Prime Secure Marketplace"
        />
        <meta
          property="og:description"
          content="O Plano de Saúde Pet oferece uma ampla rede de clínicas e profissionais qualificados para o bem-estar completo do seu pet."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-petlove-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://www.primesecure.com.br/seguro-pet-porto"
        />
        <link
          rel="canonical"
          href="https://www.primesecure.com.br/seguro-pet-porto"
        />
      </Helmet>
      {/*<CountDown targetDate={targetDate} />*/}
      <BannerPromos />
      <FormSeguroPetBanner
        callback={(data) => {
          setFormData({ ...data });
          openModalStep(1);
        }}
      />
      <PetLocator />
      <PlanSlider openModalStep={openModalStep} />
      <BestClinics openModalStep={openModalStep} />
      <HealthDecisionSection openModalStep={openModalStep} />
      <MicroChipSection openModalStep={openModalStep} />
      <DiscountsAndAdvantages openModalStep={openModalStep} />
      <HowItWorksSection openModalStep={openModalStep} />
      <Cancel openModalStep={openModalStep} />
      <SomeQuestions openModalStep={openModalStep} />
      <TestimonialVideos openModalStep={openModalStep} />
      <SpecializedService openModalStep={openModalStep} />
      <CredentialNetworkBanner />
      <CoParticipation />
      <LifePet openModalStep={openModalStep} />
      <FaqPet />
      <Partners />
      <ModalPet
        openModal={modalOpen}
        closeModal={closeModal}
        sendForm={sendForm}
        lastStep={lastStep}
      />
    </div>
  );
}

export default IndexSeguroPet;
