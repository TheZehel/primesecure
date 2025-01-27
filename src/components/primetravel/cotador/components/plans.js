import React, { useState, useRef, useEffect } from 'react';
import CardCotacao from './cardCotacao';
import ModalCoberturas from './modalCoberturas';
import EditQuote from './editQuote';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { saveToStorage, loadFromStorage } from '../utils/storageUtils'; // Importando o método saveToStorage

// const cardData = [
//   {
//     title: 'PRIME BR 15',
//     price: 'R$ 3,04',
//     discount: '65% OFF',
//     fullPrice: 'R$ 36,48',
//     coverage: 'R$ 15.000,00',
//     id: 1,
//   },
//   {
//     title: 'PRIME BR 30',
//     price: 'R$ 300,04',
//     discount: '65% OFF',
//     fullPrice: 'R$ 300,04',
//     coverage: 'R$ 30.000,00',
//     id: 2,
//   },
//   {
//     title: 'PRIME BR 60',
//     price: 'R$ 400,04',
//     discount: '65% OFF',
//     fullPrice: 'R$ 400,04',
//     coverage: 'R$ 60.000,00',
//     id: 3,
//   },
// ];

const API_BASE_URL =
  process.env.REACT_APP_ENVIRONMENT === 'PRODUCAO'
    ? process.env.REACT_APP_API_ENDPOINT_PRODUCTION
    : process.env.REACT_APP_API_ENDPOINT_SANDBOX;

console.log('API_BASE_URL:', API_BASE_URL);

const Plans = ({ onSelected, setSelectedPlan }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null); // Gerencia o ID do plano selecionado
  const [plansData, setPlansData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const swiperRef = useRef(null);

  // Carregar plano salvo no sessionStorage ao montar o componente
  useEffect(() => {
    const savedPlan = loadFromStorage('plans', null);
    if (savedPlan) {
      setSelectedPlanId(savedPlan.id); // Atualiza o estado local com o ID salvo
      setSelectedPlan(savedPlan); // Atualiza o estado do componente pai
    }
  }, [setSelectedPlan]);

  // Buscar planos da API
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true); // Ativa o estado de carregamento
      try {
        const sessionData = JSON.parse(sessionStorage.getItem('editQuote'));
        if (!sessionData) {
          console.error('Nenhuma informação encontrada no sessionStorage.');
          setIsLoading(false); // Desativa o loading caso os dados estejam ausentes
          return;
        }

        const payload = {
          CodigoDestino: sessionData.CodigoDestino,
          CodigoMotivoViagem: sessionData.CodigoMotivoViagem,
          IncluiEuropa: sessionData.IncluiEuropa,
          DataInicioViagem: sessionData.DataInicioViagem || sessionData.departure,
          DataFinalViagem: sessionData.DataFinalViagem || sessionData.arrival,
          QtdePassNaoSenior: sessionData.QtdePassNaoSenior,
          QtdePassSenior: sessionData.QtdePassSenior,
          CupomDesconto: sessionData.CupomDesconto,
          DiasMultiviagem: sessionData.DiasMultiviagem,
          CodigoTipoProduto: sessionData.CodigoTipoProduto,
          CNPJ: sessionData.CNPJ,
        };

        console.log('Enviando payload para a API:', payload);

        const response = await axios.post(`${API_BASE_URL}/omint-viagem/process/comissoes`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const products = response.data.data[0];

        // Verifique se `products` é um array antes de definir `plansData`
        if (Array.isArray(products)) {
          setPlansData(products);
        } else {
          console.error('Dados inesperados recebidos da API:', products);
          setPlansData([]); // Reseta como array vazio se os dados forem inválidos
        }

        console.log('Planos recebidos da API:', products);

        const savedPlan = loadFromStorage('plans', null);
        if (savedPlan) {
          const selectedPlan = products.find(plan => plan.CodigoProduto === savedPlan.CodigoProduto);
          if (selectedPlan) {
            setSelectedPlanId(selectedPlan.CodigoProduto);
            setSelectedPlan(selectedPlan);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar os planos:', error.response?.data || error.message);
      } finally {
        setIsLoading(false); // Garante que o estado de carregamento seja atualizado
      }
    };

    fetchPlans();
  }, [setSelectedPlan]);

  // Enviar informações para a API
  const sendQuoteToAPI = async () => {
    const sessionData = JSON.parse(sessionStorage.getItem('editQuote'));

    if (!sessionData) {
      console.error('Nenhuma informação encontrada no sessionStorage.');
      return;
    }
    // Preparar o payload, excluindo SessionID e formatando conforme necessário
    const payload = {
      CodigoDestino: sessionData.CodigoDestino,
      CodigoMotivoViagem: sessionData.CodigoMotivoViagem,
      IncluiEuropa: sessionData.IncluiEuropa,
      DataInicioViagem: sessionData.DataInicioViagem || sessionData.departure,
      DataFinalViagem: sessionData.DataFinalViagem || sessionData.arrival,
      QtdePassNaoSenior: sessionData.QtdePassNaoSenior,
      QtdePassSenior: sessionData.QtdePassSenior,
      CupomDesconto: sessionData.CupomDesconto,
      DiasMultiviagem: sessionData.DiasMultiviagem,
      CodigoTipoProduto: sessionData.CodigoTipoProduto,
      CNPJ: sessionData.CNPJ,
      email: sessionData.email,
      name: sessionData.name,
      phone: sessionData.phone,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/omint-viagem/submit`, payload);
      console.log('Informações enviadas com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar as informações para a API:', error.response || error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 10000); // Tempo limite de 10 segundos
    return () => clearTimeout(timeout);
  }, []);

  // Função chamada ao selecionar um plano
  const handleCardSelected = (id) => {
    const selectedPlan = plansData.find((plan) => plan.CodigoProduto === id);
    setSelectedPlanId(id); // Atualiza o estado local com o ID selecionado
    setSelectedPlan(selectedPlan); // Atualiza o estado de planos do componente pai

    // Salva o plano selecionado no sessionStorage
    saveToStorage('plans', selectedPlan);

    if (onSelected) onSelected(id); // Chama o callback, se fornecido
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };
  return (
    <div>
      <div>
        <CardCotacao />
      </div>

      <div>
        <EditQuote />
        <h2 className="text-sm sm:text-xl lg:text-2xl font-bold text-[#313131] mt-8 mr-8 ml-8">
          Selecionamos os Melhores Planos Para Você.
        </h2>

        <p className="text-sm sm:text-lg lg:text-xl mb-5 mr-8 ml-8">
          Agora com prorrogação de estadia disponível em todos os planos!
        </p>
      </div>

      {Array.isArray(plansData) && plansData.length > 0 ? (
        <div className="relative">
          <Swiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="max-w-[85%] mx-auto scale-90 md:scale-95 lg:scale-100"
          >
            {plansData.map((plan) => (
              <SwiperSlide key={plan.CodigoProduto}>
                <div
                  className={`border rounded-lg shadow-lg p-2 sm:p-4 ${selectedPlanId === plan.CodigoProduto ? 'border-bluePrime' : ''
                    }`}
                >
                  <h5 className="text-gray-500 uppercase text-center font-semibold text-xs sm:text-sm md:text-base">
                    {plan.DescricaoProduto}
                  </h5>
                  <div className="text-center mt-2">
                    <div className="flex flex-col items-center">
                      <h6 className="text-xs sm:text-sm md:text-base font-medium">
                        <span className="text-gray-600">{plan.QuantidadeParcelas}x</span>{' '}
                        <span className="text-[#313131] text-sm sm:text-lg md:text-xl font-bold">
                          R$ {plan.ValorParcelado.toFixed(2)}
                        </span>{' '}
                        <span className="text-gray-600">Sem Juros</span>
                      </h6>
                      <p className="bg-green-500 font-bold text-xs sm:text-sm md:text-base mt-1 text-white py-1 px-2 rounded-md">
                        {plan.CodigoProduto}
                      </p>
                      <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">
                        <span className="font-bold">R$ {plan.ValorProduto}</span>{' '}
                        <span className="font-normal">à vista</span>
                      </p>
                      <div className="border-t border-gray-300 my-2 w-3/4 mx-auto"></div>
                      <div className="flex justify-between items-center text-xs sm:text-sm md:text-base px-4">
                        <h6 className="text-gray-700 font-medium">Cobertura Total:</h6>
                        <h6 className="text-bluePrime font-bold">{plan.coverage}</h6>
                      </div>
                    </div>
                    <div className="flex flex-col items-center mt-4 space-y-2">
                      <button
                        onClick={() => handleCardSelected(plan.CodigoProduto)}
                        className={`${selectedPlanId === plan.CodigoProduto ? 'bg-bluePrime2' : 'bg-bluePrime'
                          } cursor-pointer text-white uppercase text-xs sm:text-sm md:text-base py-1 px-3 rounded-md shadow-md w-full flex items-center justify-center`}
                      >
                        <input
                          className="accent-bluePrime rounded-full mr-2 cursor-pointer"
                          type="checkbox"
                          checked={selectedPlanId === plan.CodigoProduto}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleCardSelected(plan.CodigoProduto);
                          }}
                        />
                        {selectedPlanId === plan.CodigoProduto ? 'Selecionado' : 'Contratar'}
                      </button>
                    </div>
                    <div>
                      <hr className="my-4" />
                      <ul className="space-y-1 text-start text-xs sm:text-sm md:text-base">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-1">✔</span>
                          Despesas Médicas e Hospitalares (incluso Covid-19)
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-1">✔</span>
                          Despesas odontológicas
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-1">✔</span>
                          Despesas farmacêuticas
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-1">✔</span>
                          Perda de bagagem
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-1">✔</span>
                          Atraso de bagagem (superior a 8h)
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-1">✔</span>
                          Cancelamento ou Atraso de voo (superior a 8h)
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-1">✔</span>
                          E muito mais...
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-bluePrime text-white p-2 rounded-full shadow-md hover:bg-bluePrime2"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-bluePrime text-white p-2 rounded-full shadow-md hover:bg-bluePrime2"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col items-center mt-6 space-y-3">
        <ModalCoberturas />
      </div>
    </div>
  );
};

export default Plans;
