import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateFields } from './components/passengers';
import StepperControl from './components/Stepper';
import Plans from './components/plans';
import Resume from './components/resume';
import Passengers from './components/passengers';
import Payment from './components/payment';
import Purchased from './components/purchased';

const IndexCotacaoTravel = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const avancarRef = useRef(null);
  const [shouldBounce, setShouldBounce] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [passengerErrors, setPassengerErrors] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [responsibleData, setResponsibleData] = useState({
    firstName: '',
    secondName: '',
    CPF: '',
    birthday: '',
    gender: '',
    politica: '',
    email: '',
    tell: '',
    socialName: '',
    zipCode: '',
    address: '',
    numberAddress: '',
    completeAddress: '',
    district: '',
    city: '',
  });

  // Carrega dados do sessionStorage ao montar o componente
  useEffect(() => {
    const storedData = sessionStorage.getItem('formData-Travel');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData.activeStep !== undefined) setActiveStep(parsedData.activeStep);
      if (parsedData.selectedPlan) setSelectedPlan(parsedData.selectedPlan);
      if (parsedData.passengers) setPassengers(parsedData.passengers);
      if (parsedData.responsibleData) setResponsibleData(parsedData.responsibleData);
      if (parsedData.passengerErrors) setPassengerErrors(parsedData.passengerErrors);
    }
  }, []);


  const handleNext = () => {
    if (activeStep === 0 && !selectedPlan) {
      alert('Você deve selecionar um plano para continuar.');
      return;
    }

    // Salvar os dados no sessionStorage
    const currentData = {
      activeStep: activeStep + 1,
      selectedPlan,
      passengers,
      responsibleData,
      passengerErrors,
    };
    sessionStorage.setItem('formData-Travel', JSON.stringify(currentData));

    // Avança para a próxima etapa
    if (activeStep < steps.length - 1) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);

      switch (nextStep) {
        case 1:
          navigate('/cotacao-primetravel/resumo');
          break;
        case 2:
          navigate('/cotacao-primetravel/passageiros');
          break;
        case 3:
          navigate('/cotacao-primetravel/pagamento');
          break;
        case 4:
          navigate('/cotacao-primetravel/obrigado');
          break;
        default:
          break;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };





  const handleBack = () => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1;

      // Salva o estado atual completo antes de voltar
      const currentData = {
        activeStep: prevStep,
        selectedPlan,
        passengers,
        responsibleData,
        passengerErrors,
        editingStates: {} // Mantém o estado de edição
      };
      sessionStorage.setItem('formData-Travel', JSON.stringify(currentData));

      setActiveStep(prevStep);

      switch (prevStep) {
        case 0:
          navigate('/cotacao-primetravel');
          break;
        case 1:
          navigate('/cotacao-primetravel/resumo');
          break;
        case 2:
          navigate('/cotacao-primetravel/passageiros');
          break;
        case 3:
          navigate('/cotacao-primetravel/pagamento');
          break;
        default:
          break;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollTo = () => {
    if (avancarRef.current) {
      const elementRect = avancarRef.current.getBoundingClientRect();
      const elementPosition = elementRect.top + window.scrollY;
      const offset = window.innerHeight * 0.5;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });

      setShouldBounce(true);

      setTimeout(() => {
        setShouldBounce(false);
      }, 1000);
    }
  };

  const steps = [
    <Plans onSelected={scrollTo} setSelectedPlan={setSelectedPlan} />,
    <Resume />,
    <Passengers
      data={passengers}
      responsibleData={responsibleData}
      setResponsibleData={setResponsibleData}
      errors={passengerErrors}
      onChange={(updatedPassengers) => {
        setPassengers(updatedPassengers);
        // Salva os dados atualizados no sessionStorage
        const currentData = JSON.parse(sessionStorage.getItem('formData-Travel') || '{}');
        currentData.passengers = updatedPassengers;
        sessionStorage.setItem('formData-Travel', JSON.stringify(currentData));
      }}
    />,
    <Payment />,
    <Purchased />,
  ];

  return (
    <div className="">
      <section className="max-w-6xl mx-auto mt-10">
        <StepperControl activeStep={activeStep} />
        <div className="my-10">{steps[activeStep]}</div>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-lg md:shadow-none md:static md:bg-transparent md:border-none md:backdrop-blur-none md:p-0 md:mt-10">
          <div className="max-w-6xl mx-auto flex justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={activeStep === 0}
              className="w-full md:w-auto px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Voltar
            </button>
            <button
              ref={avancarRef}
              onClick={() => {
                if (activeStep === 0 && !selectedPlan) {
                  alert('Você deve selecionar um plano para continuar.');
                } else {
                  handleNext();
                }
              }}
              className={`w-full md:w-auto px-4 py-2 rounded transition-all ${shouldBounce ? 'animate-bounce' : ''
                } ${activeStep === steps.length - 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : !selectedPlan && activeStep === 0
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-bluePrime text-white'
                }`}
            >
              Avançar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexCotacaoTravel;