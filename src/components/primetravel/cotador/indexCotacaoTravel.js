import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepperControl from './components/Stepper';
import Plans from './components/plans';
import Resume from './components/resume';
import Passengers from './components/passengers';
import Payment from './components/payment';
import Purchased from './components/purchased';
import { saveToStorage, loadFromStorage } from './utils/storageUtils';

const stepsConfig = [
  { component: Plans, path: '/cotacao-primetravel', label: 'Plano' },
  { component: Resume, path: '/cotacao-primetravel/resumo', label: 'Resumo' },
  {
    component: Passengers,
    path: '/cotacao-primetravel/passageiros',
    label: 'Passageiros',
  },
  {
    component: Payment,
    path: '/cotacao-primetravel/pagamento',
    label: 'Pagamento',
  },
  {
    component: Purchased,
    path: '/cotacao-primetravel/obrigado',
    label: 'Obrigado',
  },
];

const IndexCotacaoTravel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const avancarRef = useRef(null);

  // Recupera o `activeStep` inicial do `sessionStorage` ou da URL
  const getInitialStep = () => {
    const storedStep = parseInt(loadFromStorage('stepIndex', 0), 10) || 0;
    const urlStep = stepsConfig.findIndex(
      (step) => step.path === location.pathname,
    );

    return storedStep > urlStep ? storedStep : urlStep !== -1 ? urlStep : 0;
  };

  const [activeStep, setActiveStep] = useState(getInitialStep());
  const [areAllPassengersComplete, setAreAllPassengersComplete] =
    useState(false);
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

  const notifyError = () => toast.error('Selecione um plano para continuar.');

  useEffect(() => {
    const updatedStep = getInitialStep();
    setActiveStep(updatedStep);

    // Se stepIndex já for 4, força o redirecionamento para a página final
    if (updatedStep === 4) {
      navigate('/cotacao-primetravel/obrigado');
    }
  }, [navigate]);

  const handleNext = () => {
    const storedEditQuote = sessionStorage.getItem('editQuote');

    if (!storedEditQuote) {
      toast.error('Você precisa salvar os dados antes de continuar.');
      return;
    }

    if (activeStep === 2 && !areAllPassengersComplete) {
      toast.error(
        'Todos os passageiros devem ser adicionados antes de prosseguir.',
      );
      return;
    }

    if (activeStep === 0 && !selectedPlan) {
      notifyError();
      return;
    }

    if (activeStep === 2) {
      const allPassengersFilled = passengers.every((p) =>
        ['firstName', 'secondName', 'CPF'].every(
          (field) => p[field] && p[field].trim() !== '',
        ),
      );

      if (!allPassengersFilled) {
        toast.error('É preciso cadastrar todos os passageiros');
        return;
      }
    }

    if (activeStep < stepsConfig.length - 1) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1;
      setActiveStep(prevStep);
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

  const StepComponent = stepsConfig[activeStep].component;

  return (
    <div className="w-full">
      <section className="max-w-6xl mx-auto mt-10">
        <StepperControl activeStep={activeStep} />
        <div className="my-10">
          <StepComponent
            onSelected={scrollTo}
            setSelectedPlan={setSelectedPlan}
            data={passengers}
            responsibleData={responsibleData}
            setResponsibleData={setResponsibleData}
            errors={passengerErrors}
            onChange={setPassengers}
            onPassengersStatusChange={setAreAllPassengersComplete}
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-2 shadow-lg md:shadow-none md:static md:bg-transparent md:border-none md:backdrop-blur-none md:p-0 md:mt-10">
          <div className="m-auto max-w-4xl mt-3 rounded-xl flex gap-2">
            <button
              onClick={handleBack}
              disabled={activeStep === 0}
              className="w-1/2 px-2 py-1 bg-gray-300 rounded disabled:opacity-50 text-sm border border-bluePrime"
            >
              Voltar
            </button>

            <button
              ref={avancarRef}
              onClick={() => {
                if (activeStep === 0 && !selectedPlan) {
                  notifyError();
                } else if (activeStep === 2 && !areAllPassengersComplete) {
                  toast.error(
                    'Ainda faltam passageiros para serem preenchidos.',
                  );
                } else {
                  handleNext();
                }
              }}
              className={`w-1/2 px-2 py-1 rounded transition-all text-sm ${
                activeStep === stepsConfig.length - 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : !selectedPlan && activeStep === 0
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-bluePrime text-white'
              } ${shouldBounce ? 'animate-bounce' : ''}`}
            >
              Avançar
            </button>
          </div>
        </div>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default IndexCotacaoTravel;
