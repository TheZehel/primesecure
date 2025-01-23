import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepperControl from './components/Stepper';
import Plans from './components/plans';
import Resume from './components/resume';
import Passengers from './components/passengers';
import Payment from './components/payment';
import Purchased from './components/purchased';

const IndexCotacaoTravel = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [areAllPassengersComplete, setAreAllPassengersComplete] = useState(false);
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

  const notifyError = () => toast.error('Selecione um plano para continuar.');

  const handleNext = () => {
    const storedEditQuote = sessionStorage.getItem('editQuote');

    // Se NÃO existir, exibe o toast de erro e interrompe
    if (!storedEditQuote) {
      toast.error('Você precisa salvar os dados antes de continuar.');
      return;
    }

    // Se estiver no step 2 (Passageiros) e ainda estiver ícone vermelho, bloquemos a ação
    if (activeStep === 2 && !areAllPassengersComplete) {
      toast.error('Todos os passageiros devem ser adicionados antes de prosseguir.');
      return;
    }

    if (activeStep === 0 && !selectedPlan) {
      // Exibe notificação de erro se o plano não for selecionado
      notifyError();
      return;
    }

    // Verifica se todos os passageiros estão preenchidos
    if (activeStep === 2) { // Etapa 2: Passageiros
      const allPassengersFilled = passengers.every((p) =>
        ['firstName', 'secondName', 'CPF'].every((field) => p[field] && p[field].trim() !== '')
      );

      if (!allPassengersFilled) {
        toast.error('É preciso cadastrar todos os passageiros');
        return;
      }
    }

    // Se a etapa não tem erros, avança normalmente
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
      onChange={setPassengers}
      // Passamos a função que receberá se está completo ou não
      onPassengersStatusChange={setAreAllPassengersComplete}
    />,
    <Payment />,
    <Purchased />,
  ];

  return (
    <div className="w-full">
      <section className="max-w-6xl mx-auto mt-10">
        <StepperControl activeStep={activeStep} />
        <div className="my-10">{steps[activeStep]}</div>

        <div className="fixed
    bottom-0
    left-0
    right-0
    z-50
    bg-white/95
    backdrop-blur-sm
    border-t
    border-gray-200
    p-2            /* MENOR PADDING NO MOBILE */
    shadow-lg
    md:shadow-none
    md:static
    md:bg-transparent
    md:border-none
    md:backdrop-blur-none
    md:p-0         /* NO DESKTOP, ZERA PADDING */
    md:mt-10">
          <div className="max-w-6xl mx-auto flex justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={activeStep === 0 || !selectedPlan} // Desabilita o botão se não houver um plano selecionado
              className="w-full
        md:w-auto
        px-2 py-1   /* BOTÕES MENORES */
        bg-gray-300
        rounded
        disabled:opacity-50
        text-sm"
            >
              Voltar
            </button>
            <button
              ref={avancarRef}
              onClick={() => {
                // 1. Se estiver no step 0 e não tiver plano selecionado
                if (activeStep === 0 && !selectedPlan) {
                  notifyError();
                }
                // 2. Se estiver no step 2 (passageiros) e NÃO estiver completo (ícone vermelho)
                else if (activeStep === 2 && !areAllPassengersComplete) {
                  toast.error('Ainda faltam passageiros para serem preenchidos.');
                }
                // 3. Senão, avança
                else {
                  handleNext();
                }
              }}
              className={`w-full
        md:w-auto
        px-2 py-1
        rounded
        transition-all
        text-sm
    ${activeStep === steps.length - 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : !selectedPlan && activeStep === 0
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-bluePrime text-white'
                }
    ${shouldBounce ? 'animate-bounce' : ''}
                }`}
            >
              Avançar
            </button>

          </div>
        </div>
      </section>

      {/* Toast container for notifications */}
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
