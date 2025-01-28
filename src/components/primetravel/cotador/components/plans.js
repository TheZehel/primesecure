// Plans.js
import React, { useState, useRef, useEffect } from 'react';
import CardCotacao from './cardCotacao';
import ModalCoberturas from './modalCoberturas';
import EditQuote from './editQuote';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { saveToStorage, loadFromStorage } from '../utils/storageUtils';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import { DatePicker } from 'antd';
import { Pen, Save } from 'lucide-react';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import ListaPaises from '../../components/ListaPaises';
// import 'antd/dist/antd.css'; // Importação do CSS do Ant Design

const europeanCountries = [
  "Alemanha", "Áustria", "Bélgica", "Bulgária", "Chipre", "Croácia", "Dinamarca",
  "Eslováquia", "Eslovênia", "Espanha", "Estônia", "Finlândia", "França",
  "Grécia", "Hungria", "Irlanda", "Itália", "Letônia", "Lituânia", "Luxemburgo",
  "Malta", "Países Baixos", "Polônia", "Portugal", "República Tcheca",
  "Romênia", "Suécia", "Noruega", "Suíça", "Reino Unido", "Islândia",
  "Liechtenstein", "Andorra", "Mônaco", "São Marino", "Vaticano"
];

const destinations = [
  { value: '1', label: 'África', code: 'AF' },
  { value: '2', label: 'América Central', code: 'AC' },
  { value: '3', label: 'Ásia', code: 'AS' },
  { value: '4', label: 'Europa', code: 'EU' },
  { value: '5', label: 'América do Norte', code: 'AN' },
  { value: '6', label: 'Oceania', code: 'OC' },
  { value: '7', label: 'América do Sul', code: 'AS' },
  { value: '8', label: 'Brasil', code: 'BR' },
  { value: '9', label: 'Múltiplos destinos', code: 'MD' },
];

const ageGroups = [
  { label: '0 a 75 anos', id: 0 },
  { label: '76 a 85 anos', id: 1 },
  { label: '86 a 99 anos', id: 2 },
];


const API_BASE_URL =
  process.env.REACT_APP_ENVIRONMENT === 'PRODUCAO'
    ? process.env.REACT_APP_API_ENDPOINT_PRODUCTION
    : process.env.REACT_APP_API_ENDPOINT_SANDBOX;



const Plans = ({ onSelected, setSelectedPlan }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [plansData, setPlansData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);

  const fetchPlans = async () => {
    const sessionData = JSON.parse(sessionStorage.getItem('editQuote'));

    if (!sessionData?.CodigoDestino) {
      console.warn('Destino não definido. Não buscar planos.');
      setPlansData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
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

      if (Array.isArray(products)) {
        setPlansData(products);
        console.log('Planos recebidos da API:', products);
      } else {
        console.error('Dados inesperados recebidos da API:', products);
        setPlansData([]);
      }
    } catch (error) {
      console.error('Erro ao buscar os planos:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Estado para rastrear o destino atual
  const [currentDestination, setCurrentDestination] = useState(() => {
    const sessionData = JSON.parse(sessionStorage.getItem('editQuote'));
    return sessionData?.CodigoDestino || null;
  });

  // Função de callback para atualizar o destino
  const handleDestinationChange = (newDestination) => {
    console.log('Destino atualizado para:', newDestination);
    setCurrentDestination(newDestination);
    // Opcional: Resetar o plano selecionado quando o destino muda
    setSelectedPlanId(null);
    setSelectedPlan(null);
    saveToStorage('plans', null); // Limpar plano salvo
  };

  // Carregar plano salvo no sessionStorage ao montar o componente
  useEffect(() => {
    const savedPlan = loadFromStorage('plans', null);
    if (savedPlan) {
      setSelectedPlanId(savedPlan.CodigoProduto);
      setSelectedPlan(savedPlan);
      console.log('Plano salvo carregado:', savedPlan);
    }
  }, [setSelectedPlan]);

  // Buscar planos da API sempre que 'currentDestination' mudar
  useEffect(() => {
    fetchPlans();

    const handleStorageChange = () => {
      console.log('SessionStorage alterado. Recarregando os planos.');
      fetchPlans();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
    setSelectedPlanId(id);
    setSelectedPlan(selectedPlan);

    // Salva o plano selecionado no sessionStorage
    saveToStorage('plans', selectedPlan);

    if (onSelected) onSelected(id);
    console.log('Plano selecionado:', selectedPlan);
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  // Carregar dados do sessionStorage
  const [formData, setFormData] = useState(() => {
    const stored = sessionStorage.getItem('editQuote');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        selectedOption: ListaPaises.find((pais) => pais.regiao === parsed.CodigoDestino) || null,
        olds: Array.isArray(parsed.olds) ? parsed.olds : [0, 0, 0],
        DataInicioViagem: parsed.DataInicioViagem ? moment(parsed.DataInicioViagem) : null,
        DataFinalViagem: parsed.DataFinalViagem ? moment(parsed.DataFinalViagem) : null,
      };
    }
    return {
      CodigoDestino: '',
      selectedOption: null,
      olds: [0, 0, 0],
      DataInicioViagem: null,
      DataFinalViagem: null,
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    const updatedData = {
      ...formData,
      CodigoDestino: formData.CodigoDestino || '', // Define o código do país
      departure: moment.isMoment(formData.departure)
        ? formData.departure.format('YYYY-MM-DD')
        : null,
      arrival: moment.isMoment(formData.arrival)
        ? formData.arrival.format('YYYY-MM-DD')
        : null,
      selectedOption: undefined, // Não precisa ser salvo
    };

    sessionStorage.setItem('editQuote', JSON.stringify(updatedData));

    setIsEditing(false);

    toast.success('Dados atualizados com sucesso!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });

    console.log('Dados atualizados no sessionStorage:', updatedData);

    // Recarrega os planos após salvar
    await fetchPlans();
  };



  const handleOld = (index, value) => {
    const updatedOlds = [...formData.olds];
    if (value === 1 && updatedOlds.reduce((total, num) => total + num, 0) < 8) {
      updatedOlds[index] += 1;
    } else if (value === -1 && updatedOlds[index] > 0) {
      updatedOlds[index] -= 1;
    }
    setFormData((prev) => ({ ...prev, olds: updatedOlds }));
  };

  const selectHandler = (event) => {
    const selectedRegiao = event.target.value;

    // Verifica se o destino selecionado está na Europa
    const isInEurope = europeanCountries.some((country) =>
      ListaPaises.some((pais) => pais.label === country && pais.regiao === selectedRegiao)
    );

    // Atualiza o estado e o sessionStorage
    setFormData((prev) => ({
      ...prev,
      CodigoDestino: selectedRegiao,
      IncluiEuropa: isInEurope ? "1" : "0",
      selectedOption: ListaPaises.find((pais) => pais.regiao === selectedRegiao) || null,
    }));

    // Atualiza o sessionStorage editQuote
    const sessionData = JSON.parse(sessionStorage.getItem('editQuote')) || {};
    const updatedData = {
      ...sessionData,
      CodigoDestino: selectedRegiao,
      IncluiEuropa: isInEurope ? "1" : "0",
    };

    sessionStorage.setItem('editQuote', JSON.stringify(updatedData));

    console.log('Destino e IncluiEuropa atualizados no sessionStorage:', updatedData);
  };


  const onChangeDeparture = (date) => {
    setFormData((prev) => ({
      ...prev,
      DataInicioViagem: date, // Atualiza diretamente o valor
      departure: date ? date.format('YYYY-MM-DD') : null, // Adiciona formato string para o storage
      DataFinalViagem:
        prev.DataFinalViagem && date && date.isAfter(prev.DataFinalViagem)
          ? null // Limpa a data final se necessário
          : prev.DataFinalViagem,
    }));
  };

  const onChangeArrival = (date) => {
    setFormData((prev) => ({
      ...prev,
      DataFinalViagem: date, // Atualiza diretamente o valor
      arrival: date ? date.format('YYYY-MM-DD') : null, // Adiciona formato string para o storage
    }));
  };



  const disabledDepartureDate = (current) =>
    current && current.isBefore(moment().startOf('day'));

  const disabledArrivalDate = (current) =>
    (formData.DataInicioViagem &&
      current &&
      current.isBefore(formData.DataInicioViagem)) ||
    (current && current.isBefore(moment().startOf('day')));

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <div>
        <CardCotacao />
      </div>

      <div>
        {/* Passe a função de callback para EditQuote */}
        <div className="bg-white border rounded-lg shadow-md p-4 sm:p-2 mr-2 ml-2 max-w-[calc(100%-16px)]">
          <ToastContainer />
          {/* Layout para telas maiores */}
          <div className="hidden lg:grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-center">
            <div>
              <h4 className="text-sm font-bold sm:text-xs md:text-sm">Destino</h4>
              {isEditing ? (
                <select
                  value={formData.CodigoDestino || ''}
                  onChange={(event) => {
                    selectHandler(event);
                  }}
                  className="mt-2 cursor-pointer w-full rounded-md border px-2 py-1 text-sm shadow-sm text-center"
                >
                  <option value="" disabled>
                    Selecione o Destino...
                  </option>
                  {ListaPaises.map((pais) => (
                    <option key={pais.regiao} value={pais.regiao}>
                      {pais.label}
                    </option>
                  ))}
                </select>

              ) : (
                <p className="text-base sm:text-sm md:text-base text-center">
                  {formData.selectedOption?.label || 'Destino não selecionado'}
                </p>
              )}

              {/* Exibir status de carregamento ou quantidade de planos */}
              {isLoading ? (
                <p>Carregando...</p>
              ) : (
                <p>{plansData.length} planos carregados.</p>
              )}
            </div>


            <div>
              <h4 className="text-sm font-bold sm:text-xs md:text-sm">Passageiros</h4>
              {isEditing ? (
                <button
                  onClick={openModal}
                  className="bg-bluePrime text-white py-1 px-4 rounded shadow hover:bg-bluePrime2 mt-2 sm:py-1 sm:px-3 sm:mt-1 md:py-1 md:px-4 md:mt-2"
                >
                  Selecionar Passageiros
                </button>
              ) : (
                <p className="text-base sm:text-sm md:text-base">
                  {formData.olds.reduce((total, age) => total + age, 0)} Passageiro(s)
                </p>

              )}
            </div>

            <div>
              <h4 className="text-sm font-bold sm:text-xs md:text-sm">Período</h4>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <DatePicker
                      locale={locale}
                      value={formData.DataInicioViagem} // Exibe a data inicial
                      onChange={onChangeDeparture} // Atualiza o estado ao alterar
                      placeholder="Data de ida"
                      disabledDate={(current) =>
                        current && (current.isBefore(moment().startOf('day')) || current.isAfter(moment('2025-12-31')))
                      }
                      format="DD/MM/YYYY"
                      className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 text-[#313131] placeholder:text-[#313131]"
                    />
                  </div>
                  <div className="w-full">
                    <DatePicker
                      locale={locale}
                      value={formData.DataFinalViagem} // Exibe a data final
                      onChange={onChangeArrival} // Atualiza o estado ao alterar
                      placeholder="Volta"
                      disabledDate={(current) =>
                        current &&
                        (current.isBefore(formData.DataInicioViagem) || current.isAfter(moment('2025-12-31')))
                      }
                      format="DD/MM/YYYY"
                      className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 text-[#313131] placeholder:text-[#313131]"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-base sm:text-sm md:text-base text-center">
                  {formData.DataInicioViagem && formData.DataFinalViagem
                    ? `De ${formData.DataInicioViagem.format('DD/MM/YYYY')} até ${formData.DataFinalViagem.format('DD/MM/YYYY')}`
                    : 'Período não selecionado'}
                </p>

              )}
            </div>

            <div className="flex justify-center mt-4 md:mt-0">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 flex items-center gap-x-2 sm:py-1 sm:px-3 sm:text-sm md:py-2 md:px-4"
                >
                  <Save className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span>Salvar</span>
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-bluePrime text-white py-2 px-4 rounded-md shadow-sm hover:bg-bluePrime2 flex items-center gap-x-2 sm:py-1 sm:px-3 sm:text-sm md:py-2 md:px-4"
                >
                  <Pen className="w-5 h-5" />
                  <span>Editar</span>
                </button>
              )}
            </div>
          </div>

          {/* Layout para telas menores */}
          <div className="lg:hidden text-xs flex flex-col space-y-2">
            {isEditing ? (
              <>
                <div className="flex flex-col space-y-4">
                  <div>
                    <h4 className="text-sm font-bold">Destino</h4>
                    <select
                      value={formData.selectedOption?.value || ''}
                      onChange={selectHandler}
                      className="mt-2 cursor-pointer w-full rounded-md border px-2 py-1 text-sm shadow-sm text-center ring-offset-whitePrime"
                    >
                      <option value="" disabled>
                        Selecione o Destino...
                      </option>
                      {destinations.map((dest) => (
                        <option key={dest.value} value={dest.value}>
                          {dest.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold">Passageiros</h4>
                    <button
                      onClick={openModal}
                      className="bg-bluePrime text-white py-1 px-4 rounded shadow hover:bg-bluePrime2"
                    >
                      Selecionar Passageiros
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold">Período</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <DatePicker
                          locale={locale}
                          value={formData.DataInicioViagem}
                          onChange={onChangeDeparture}
                          placeholder="Data de ida"
                          disabledDate={disabledDepartureDate}
                          format="DD/MM/YYYY"
                          className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime text-[#313131] placeholder:text-[#313131]"
                        />
                      </div>
                      <div>
                        <DatePicker
                          locale={locale}
                          value={formData.DataFinalViagem}
                          onChange={onChangeArrival}
                          placeholder="Volta"
                          disabledDate={disabledArrivalDate}
                          format="DD/MM/YYYY"
                          className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime text-[#313131] placeholder:text-[#313131]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span>{formData.selectedOption?.label || 'Destino não selecionado'}</span>
                <span>{formData.olds.reduce((total, age) => total + age, 0)} Passageiro(s)</span>
                <span>
                  {formData.DataInicioViagem && formData.DataFinalViagem
                    ? `De ${formData.DataInicioViagem.format('DD/MM/YYYY')} até ${formData.DataFinalViagem.format('DD/MM/YYYY')}`
                    : 'Período não selecionado'}
                </span>
              </div>
            )}

            <div className="flex justify-end mt-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white py-2 px-2 rounded-md shadow-sm hover:bg-green-600 flex items-center gap-x-1 ml-auto"
                >
                  <Save className="w-3 h-3" />
                  <span>Salvar</span>
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-bluePrime text-white py-2 px-2 rounded-md shadow-sm hover:bg-bluePrime2 flex items-center gap-x-1 ml-auto"
                >
                  <Pen className="w-3 h-3" />
                  <span>Editar</span>
                </button>
              )}
            </div>
          </div>

          {/* Modal */}
          {modalOpen && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]" />
              <div className="fixed inset-0 flex items-center justify-center z-[1001]">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">Idade dos Passageiros</h2>
                  {ageGroups.map((group, index) => (
                    <div key={group.id} className="flex items-center justify-between mb-2">
                      <h3 className="text-xl">{group.label}</h3>
                      <div className="flex items-center justify-around w-32">
                        <button
                          onClick={() => handleOld(index, -1)}
                          className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={formData.olds[index]}
                          readOnly
                          className="text-center block w-12 h-8 text-lg rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm"
                        />
                        <button
                          onClick={() => handleOld(index, 1)}
                          className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={closeModal}
                    className="bg-bluePrime text-white py-2 px-4 rounded mt-4 w-full"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
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
