import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { DatePicker, Space, ConfigProvider } from 'antd';
import InputMask from 'react-input-mask';
import Modal from 'react-modal';
import imageManager from '../../bancoDeImagens';
import { Chip } from '@material-tailwind/react';
import ListaPaises from './ListaPaises';
import DataValidation from '../../modules/dataValidation';
import moment from 'moment';
import { Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerPix from './subcomponents/BannerPix';
import BannerParcelamento from './subcomponents/BannerParcelamento';
import 'moment/locale/pt-br';
import locale from 'antd/lib/date-picker/locale/pt_BR';

moment.locale('pt-br');

// Function to format date to Brazilian format for display (dd-mm-yyyy)
const formatDateToBrazilian = (dateString) => {
  return moment(dateString, 'YYYY-MM-DD').format('DD-MM-YYYY');
};

// Function to convert date to ISO format for storage (yyyy-mm-dd)
const formatDateToISO = (dateString) => {
  return moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD');
};

const getUtmParams = () => {
  let params = {};
  let search = window.location.search.substring(1);

  if (search) {
    search.split('&').forEach((item) => {
      let data = item.split('=');
      params[data[0]] = decodeURIComponent(data[1]);
    });
  }
  return params;
};

const reasonOptions = [
  { value: 'lazer/negocios', label: 'Lazer/Negócios' },
  { value: 'esporte de competicao', label: 'Esporte de Competição' },
];

export default function FormTravelBanner2() {
  const [errorList, setErrorList] = useState([]);
  const customValidation = new DataValidation();
  const navigate = useNavigate();


  const handleNavigateToPrivacyPolicy = () => {
    navigate('/politicas-de-privacidade');
  };

  const handleReasonChange = (selectedReason) => {
    const CodigoMotivoViagem = selectedReason.value === 'lazer/negocios' ? 'L' : 'E';
    const updatedFormData = {
      ...formData,
      reason: selectedReason,
      CodigoMotivoViagem,
    };
    setFormData(updatedFormData);
    sessionStorage.setItem('editQuote', JSON.stringify(updatedFormData));
  };

  const onChangeDeparture = (date, dateString) => {
    // Convert to Brazilian format explicitly
    const formattedDate = moment(date).format('DD-MM-YYYY');
    setFormData({ ...formData, departure: formattedDate });

    // Store in ISO format for sessionStorage
    const isoDate = moment(date).format('YYYY-MM-DD');
    const sessionData = JSON.parse(sessionStorage.getItem('editQuote')) || {};
    sessionData.departure = isoDate;
    sessionStorage.setItem('editQuote', JSON.stringify(sessionData));
  };


  const onChangeArrival = (date, dateString) => {
    // Convert to Brazilian format explicitly
    const formattedDate = moment(date).format('DD-MM-YYYY');
    setFormData({ ...formData, arrival: formattedDate });

    // Store in ISO format for sessionStorage
    const isoDate = moment(date).format('YYYY-MM-DD');
    const sessionData = JSON.parse(sessionStorage.getItem('editQuote')) || {};
    sessionData.arrival = isoDate;
    sessionStorage.setItem('editQuote', JSON.stringify(sessionData));
  };

  // Update date-related validation functions
  const disabledDepartureDate = (current) => {
    let limitAfter = formData.arrival
      ? moment(formData.arrival, 'DD-MM-YYYY')
      : null;
    return (
      (current && limitAfter && current.isAfter(limitAfter, 'day')) ||
      current < moment().startOf('day')
    );
  };

  const disabledArrivalDate = (current) => {
    let limitBefore = formData.departure
      ? moment(formData.departure, 'DD-MM-YYYY')
      : null;
    return (
      (current && limitBefore && current < limitBefore.startOf('day')) ||
      current < moment().startOf('day')
    );
  };

  const selectHandler = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = ListaPaises.find((pais) => pais.value === selectedValue);

    setFormData((prevFormData) => {
      const updatedData = {
        ...prevFormData,
        selectedOption,
      };

      if (selectedOption?.value === "Brasil") {
        updatedData.CodigoTipoProduto = "VN";
      } else {
        updatedData.CodigoTipoProduto = "VI";
      }

      const sessionData = JSON.parse(sessionStorage.getItem('editQuote')) || {};
      sessionData.CodigoTipoProduto = updatedData.CodigoTipoProduto;
      sessionData.selectedOption = selectedOption;
      sessionStorage.setItem('editQuote', JSON.stringify(sessionData));

      return updatedData;
    });

    if (errorList.includes('destinyGroup')) {
      const errors = errorList.filter((item) => item !== 'destinyGroup');
      setErrorList(errors);
    }
  };

  const [modalOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleOld = (index, value) => {
    let formOlds = [...formData.olds];

    if (value === 1 && formOlds.reduce((sum, age) => sum + age, 0) < 8) {
      formOlds[index] += 1;
    } else if (value === -1 && formOlds[index] > 0) {
      formOlds[index] -= 1;
    }

    const QtdePassNaoSenior = formOlds[0];
    const QtdePassSenior = formOlds[1] + formOlds[2];

    const updatedFormData = {
      ...formData,
      olds: formOlds,
      QtdePassNaoSenior,
      QtdePassSenior,
    };

    setFormData(updatedFormData);
    sessionStorage.setItem('editQuote', JSON.stringify(updatedFormData));
  };

  const inputHandler = (event) => {
    let id = event.target.id;
    let value = event.target.value;

    if (errorList.includes(id)) {
      let errors = errorList.filter((item) => item !== id);
      setErrorList(errors);
    }

    if (id === 'name') {
      setFormData({ ...formData, name: value });
    }
    if (id === 'email') {
      setFormData({ ...formData, email: value });
    }
    if (id === 'phone') {
      setFormData({ ...formData, phone: value });
    }
  };

  const [formData, setFormData] = useState({
    SessionID: '9728E25D9CAA49CA9CA06DF047F2280A',
    CodigoDestino: '',
    CodigoMotivoViagem: '',
    IncluiEuropa: '0',
    DataInicioViagem: null,
    DataFinalViagem: null,
    QtdePassSenior: '0',
    QtdePassNaoSenior: '0',
    CupomDesconto: '',
    DiasMultiviagem: '0',
    CodigoTipoProduto: '',
    CNPJ: '',
    olds: [0, 0, 0],
    selectedOption: null,
    reason: null,
    name: '',
    email: '',
    phone: '',
    departure: null,
    arrival: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const utmParams = getUtmParams();

    const payload = {
      destiny: formData.selectedOption || { value: '', label: '', regiao: 0 },
      departure: formData.departure,
      arrival: formData.arrival,
      ages: Array.isArray(formData.olds)
        ? formData.olds.reduce((total, age) => total + age, 0)
        : 0,
      name: formData.name,
      email: formData.email,
      phone: formData.phone.replace(/\D/g, ''),
      reason: formData.reason ? formData.reason.value : '',
      ...utmParams,
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.departure || !payload.arrival || !payload.destiny.value || !payload.reason) {
      toast.error('Por favor, preencha todos os campos obrigatórios.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      console.log('Enviando dados...', payload);
      console.log('Salvando formData no sessionStorage:', formData);
      sessionStorage.setItem('editQuote', JSON.stringify(formData));
      navigate('/cotacao-primetravel');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      navigate('/cotacao-primetravel');
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <section
        className="p-5"
        id="banner-travel"
        style={{
          backgroundImage: `url(${imageManager.banners.bannerPrimeTravel})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="container mx-auto pt-10">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="animate__animated animate__fadeIn">
              <BannerPix />
              <Chip
                value="Sua Viagem Mais Segura Com"
                className="bg-bluePrime text-lg"
              />
              <h1 className="text-4xl font-bold mb-4 text-white">
                Prime Travel{' '}
              </h1>
              <p className="text-white text-2xl font-semibold">
                Não importa como e para onde você viaja, nós te protegemos.
                Ainda Contamos Com + de 30 Coberturas.
              </p>
              <p className="text-white text-lg font-semibold pt-5">
                Em parceiria com:
              </p>
              <img
                src="https://storage.googleapis.com/primesecure/logo-omint.png"
                alt="Logo Ominit Travel"
                className="m-auto w-32 justify-center items-center p-2"
              />
              <BannerParcelamento />
            </div>
            <div className="animate__animated animate__zoomIn rounded-lg bg-white p-6 shadow-lg ml-auto mr-0 pr-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center">
                Faça Sua Cotação Gratuita
              </h2>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Inicie sua cotação online preenchendo o formulário abaixo.
              </p>

              <form className="grid grid-cols-2 gap-4 mt-6" onSubmit={handleSubmit}>
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <div className="mt-2.5">
                      <DatePicker
                        locale={locale}
                        id="departure"
                        selected={
                          formData.departure
                            ? moment(formData.departure, 'DD-MM-YYYY')
                            : null
                        }
                        onChange={onChangeDeparture}
                        placeholderText="Data de ida"
                        disabledDate={disabledDepartureDate}
                        dateFormat="dd-MM-yyyy"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime text-lg leading-6 text-center"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mt-2.5">
                      <DatePicker
                        id="arrival"
                        locale={locale}
                        selected={
                          formData.arrival
                            ? moment(formData.arrival, 'DD-MM-YYYY')
                            : null
                        }
                        onChange={onChangeArrival}
                        placeholderText="Volta"
                        disabledDate={disabledArrivalDate}
                        dateFormat="dd-MM-yyyy"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime text-lg leading-6 text-center"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mt-2.5">
                    <select
                      id="destinyGroup"
                      value={formData.selectedOption?.value || ''}
                      onChange={(e) => {
                        const selectedOption = ListaPaises.find(
                          (pais) => pais.value === e.target.value
                        );

                        const paisesEuropa = [
                          'França', 'Espanha', 'Itália', 'Reino Unido', 'Alemanha', 'Grécia',
                          'Portugal', 'Áustria', 'Bélgica', 'Holanda', 'Suíça', 'Suécia',
                          'Noruega', 'Dinamarca', 'Albânia', 'Andorra', 'Armênia', 'Bielorrússia',
                          'Bósnia e Herzegovina', 'Bulgária', 'Chipre', 'Croácia', 'Eslováquia',
                          'Eslovênia', 'Estônia', 'Finlândia', 'Geórgia', 'Hungria', 'Irlanda',
                          'Islândia', 'Letônia', 'Liechtenstein', 'Lituânia', 'Luxemburgo',
                          'Macedônia do Norte', 'Malta', 'Moldávia', 'Mônaco', 'Montenegro',
                          'Polônia', 'República Tcheca', 'Romênia', 'Rússia', 'San Marino',
                          'Sérvia', 'Ucrânia', 'Vaticano'
                        ];
                        const IncluiEuropa = paisesEuropa.includes(selectedOption?.value) ? '1' : '0';

                        const updatedFormData = {
                          ...formData,
                          selectedOption,
                          CodigoDestino: selectedOption?.regiao || '',
                          CodigoTipoProduto: selectedOption?.value === 'Brasil' ? 'VN' : 'VI',
                          IncluiEuropa,
                        };

                        setFormData(updatedFormData);

                        const sessionData = JSON.parse(sessionStorage.getItem('editQuote')) || {};
                        sessionData.CodigoDestino = selectedOption?.regiao || '';
                        sessionData.CodigoTipoProduto = updatedFormData.CodigoTipoProduto;
                        sessionData.IncluiEuropa = IncluiEuropa;
                        sessionStorage.setItem('editQuote', JSON.stringify(sessionData));
                      }}
                      className="block w-full placeholder:text-grayPrime rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime text-lg leading-6 text-center"
                    >
                      <option value="" disabled>
                        Selecione destino
                      </option>
                      {ListaPaises.map((pais) => (
                        <option key={pais.value} value={pais.value}>
                          {pais.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="mt-2.5">
                    <select
                      id="reason"
                      value={formData.reason?.value || ''}
                      onChange={(e) => {
                        const selectedReason = reasonOptions.find(
                          (reason) => reason.value === e.target.value
                        );
                        handleReasonChange(selectedReason);
                      }}
                      className="block w-full placeholder:text-grayPrime rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime text-lg leading-6 text-center"
                    >
                      <option value="" disabled>
                        Motivo da viagem
                      </option>
                      {reasonOptions.map((reason) => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-[#313131] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 cursor-pointer"
                    id="ages"
                    name="ages"
                    value={
                      formData.olds.reduce((total, age) => total + age, 0) > 0
                        ? `${formData.olds.reduce(
                          (total, age) => total + age,
                          0,
                        )} Passageiros`
                        : 'Selecione os Passageiros'
                    }
                    onClick={openModal}
                    readOnly
                    required
                  />

                  <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="fixed inset-0 flex items-center justify-center p-6 bg-gray-800 bg-opacity-50"
                    ariaHideApp={false}
                  >
                    <div className="animate__animated animate__fadeIn bg-white rounded-lg shadow px-5 py-4 mx-auto w-96 h-96 border border-gray-300">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl">
                          Idade do(s) passageiro(s)
                        </h2>
                        <button
                          onClick={closeModal}
                          className="bg-transparent"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <hr className="mb-4" />
                      {['0 a 71 anos', '72 a 85 anos', '86 a 99 anos'].map(
                        (group, index) => (
                          <div
                            className="flex items-center justify-between mb-2"
                            key={index}
                          >
                            <h3 className="text-xl">{group}</h3>
                            <div className="flex items-center justify-around w-32">
                              <button
                                onClick={() => handleOld(index, -1)}
                                className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                value={formData.olds[index]}
                                readOnly
                                className="text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                              />
                              <button
                                onClick={() => handleOld(index, 1)}
                                className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ),
                      )}
                      <button
                        onClick={closeModal}
                        className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-1/2 mx-auto block"
                      >
                        Aplicar
                      </button>
                    </div>
                  </Modal>
                </div>
                <div>
                  <div className="mt-2.5">
                    <input
                      onChange={inputHandler}
                      value={formData.name}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nome completo"
                      autoComplete="family-name"
                      className="w-full px-3 py-2 border rounded-md text-lg border-gray-300 focus:border-bluePrime focus:ring-1 focus:ring-bluePrime focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-2.5">
                    <input
                      onChange={inputHandler}
                      value={formData.email}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      placeholder="Seu email"
                      className="w-full px-3 py-2 border rounded-md text-lg border-gray-300 focus:border-bluePrime focus:ring-1 focus:ring-bluePrime focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-2.5">
                    <InputMask
                      mask="(99) 99999-9999"
                      maskChar={null}
                      maxLength="16"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Seu telefone"
                      className="w-full px-3 py-2 border rounded-md text-lg border-gray-300 focus:border-bluePrime focus:ring-1 focus:ring-bluePrime focus:outline-none"
                      onChange={inputHandler}
                      value={formData.phone}
                    />
                  </div>
                </div>
              </form>
              <button
                type="submit"
                className="col-span-2 bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-full flex justify-center items-center text-lg mt-3"
                onClick={(e) => {
                  handleSubmit(e);
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({ event: 'lead-primetravel' });
                }}
              >
                Cotar Agora
              </button>
              <div className="sm:w-4/4 flex mt-5 text-start">
                <Typography className="">
                  Ao preencher aceito os
                  <button
                    onClick={handleNavigateToPrivacyPolicy}
                    className="font-medium transition-colors hover:text-bluePrime2"
                  >
                    &nbsp;Termos & Condições
                  </button>
                </Typography>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </section>
    </ConfigProvider>
  );
}