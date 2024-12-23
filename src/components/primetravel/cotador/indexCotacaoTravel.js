//Dependências
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateFields } from './components/passengers';
//Componentes
import StepperControl from './components/Stepper';
import Plans from './components/plans';
import Resume from './components/resume';
import Passengers from './components/passengers';
import Payment from './components/payment';
import Purchased from './components/purchased';

const IndexCotacaoTravel = () => {
  //const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0); // Estado do passo atual
  const avancarRef = useRef(null); // Referência para o botão "Avançar"
  const [shouldBounce, setShouldBounce] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [passengerErrors, setPassengerErrors] = useState([]); // Erros dos passageiros
  const [passengers, setPassengers] = useState([]); // Dados dos passageiros
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

  useEffect(() => {
    const storedData = sessionStorage.getItem('formData-Travel');
    if (storedData) {
      const { activeStep, selectedPlan, passengers, responsibleData } =
        JSON.parse(storedData);

      if (activeStep !== undefined) setActiveStep(activeStep);
      if (selectedPlan) setSelectedPlan(selectedPlan);
      if (passengers) setPassengers(passengers); // Restaura passageiros
      if (responsibleData) setResponsibleData(responsibleData); // Restaura dados do responsável
    }
  }, []); // Executa apenas uma vez no carregamento inicial

  const handleNext = () => {
    if (activeStep === 0 && !selectedPlan) {
      alert('Você deve selecionar um plano para continuar.');
      return;
    }

    // Salva os dados completos no sessionStorage antes de avançar
    const currentData = {
      activeStep: activeStep + 1, // Salva o próximo passo
      selectedPlan,
      passengers,
      responsibleData,
    };
    sessionStorage.setItem('formData-Travel', JSON.stringify(currentData));

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

      // Troca a URL conforme a etapa anterior
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

  // Função para rolar a tela até o botão "Avançar"
  const scrollTo = () => {
    if (avancarRef.current) {
      // Pega a posição do botão Avançar
      const elementRect = avancarRef.current.getBoundingClientRect();
      const elementPosition = elementRect.top + window.scrollY;

      // Calcula um offset de 50% da altura da janela, você pode ajustar conforme necessário.
      const offset = window.innerHeight * 0.5;

      // Rola para a posição do botão menos o offset desejado, criando um efeito de parar 50% antes.
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });

      // Ativa o bounce
      setShouldBounce(true);

      setTimeout(() => {
        setShouldBounce(false);
      }, 1000);
    }
  };

  // Array de componentes dos passos
  const steps = [
    <Plans onSelected={scrollTo} setSelectedPlan={setSelectedPlan} />,
    <Resume />,
    <Passengers
      data={passengers}
      responsibleData={responsibleData}
      setResponsibleData={setResponsibleData}
      errors={passengerErrors}
      onChange={(updatedPassengers) => setPassengers(updatedPassengers)}
    />,
    <Payment />,
    <Purchased />,
  ];

  return (
    <section className="max-w-6xl mx-auto mt-10">
      <StepperControl activeStep={activeStep} />
      <div className="my-10">{steps[activeStep]}</div>
      <div className="flex justify-between mt-10">
        <button
          onClick={handleBack}
          disabled={activeStep === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
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
          className={`px-4 py-2 rounded transition-all ${
            shouldBounce ? 'animate-bounce' : ''
          } ${
            activeStep === steps.length - 1
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : !selectedPlan && activeStep === 0
              ? 'bg-gray-300 text-gray-600'
              : 'bg-bluePrime text-white'
          }`}
        >
          Avançar
        </button>
      </div>
    </section>
  );
};

export default IndexCotacaoTravel;
