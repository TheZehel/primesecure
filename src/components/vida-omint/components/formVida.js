import axios from 'axios';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../globalsubcomponentes/icons/loadingSvg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

moment.locale('pt-br');

const ocupationOptions = [
  { value: 'Aposentado', label: 'Aposentado' },
  { value: 'Administrador de Empresa', label: 'Administrador de Empresa' },
  { value: 'Estudante Universitário', label: 'Estudante Universitário' },
  { value: 'Dona de casa', label: 'Dona de casa' },
  {
    value: 'Empresário e Prodt.Espetáculo',
    label: 'Empresário e Prodt.Espetáculo',
  },
  { value: 'Corretores de seguros', label: 'Corretores de seguros' },
  { value: 'Comerciante/Comerciario', label: 'Comerciante/Comerciario' },
  { value: 'Médico', label: 'Médico' },
  { value: 'Outro', label: 'Outro' },
];

const incomeRangeOptions = [
  { value: 'ate2.5k', label: 'Até R$2.500' },
  { value: '2.5k-5k', label: 'Entre R$2.500 e R$5.000' },
  { value: '5k-7.5k', label: 'Entre R$5.000 e R$7.500' },
  { value: '7.5k-10k', label: 'Entre R$7.500 e R$10.000' },
  { value: '10k+', label: 'Acima de R$10.000' },
];

const genderOptions = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
];

export default function FormVidaOmint() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dataNascimento: '',
    ocupation: null,
    incomeRange: null,
    gender: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOcupationChange = (selectedOcupation) => {
    setFormData({ ...formData, ocupation: selectedOcupation });
  };

  const handleIncomeRangeChange = (selectedIncomeRange) => {
    setFormData({ ...formData, incomeRange: selectedIncomeRange });
  };

  const handleGenderChange = (selectedGender) => {
    setFormData({ ...formData, gender: selectedGender });
  };

  const inputHandler = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });

    if (value) {
      setErrors({ ...errors, [id]: '' });
    }
  };

  const validateForm = () => {
    const {
      name,
      email,
      phone,
      dataNascimento,
      ocupation,
      incomeRange,
      gender,
    } = formData;
    let newErrors = {};

    if (!name) newErrors.name = 'Nome é obrigatório.';
    if (!email) newErrors.email = 'Email é obrigatório.';
    if (!phone) newErrors.phone = 'Telefone é obrigatório.';
    if (!dataNascimento)
      newErrors.dataNascimento = 'Data de nascimento é obrigatória.';
    if (!ocupation) newErrors.ocupation = 'Ocupação é obrigatória.';
    if (!incomeRange) newErrors.incomeRange = 'Faixa de renda é obrigatória.';
    if (!gender) newErrors.gender = 'Sexo é obrigatório.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigateBasedOnPath = () => {
    if (window.location.pathname.includes('/seguro-residencial-porto-2')) {
      window.location.href = 'https://residencial.primesecure.com.br/';
    } else if (
      window.location.pathname.includes('seguro-pet-porto') ||
      window.location.pathname.includes('seguro-bike') ||
      window.location.pathname.includes('seguro-celular-kakau') ||
      window.location.pathname.includes('seguro-de-vida')
    ) {
      console.log('Form data submitted:', formData);
    } else {
      navigate('/obrigado');
    }
  };

  const handleButtonClick = async () => {
    // Se a validação falhar, exibe o toast, toca som de erro e interrompe a execução
    if (!validateForm()) {
      toast.error('Preencha todos os dados para continuar');

      // Toca o som de erro com volume definido para 20%
      const errorAudio = new Audio(
        'https://storage.googleapis.com/primesecure/audios-site/mixkit-wrong-electricity-buzz-955.wav',
      );
      errorAudio.volume = 0.1;
      errorAudio.play();

      return;
    }

    setIsLoading(true);

    try {
      const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;
      const optionsRD = {
        method: 'POST',
        url: `https://api.rd.services/platform/conversions?api_key=${apiKey}`,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          event_type: 'CONVERSION',
          event_family: 'CDP',
          payload: {
            conversion_identifier: 'lead-vida-omint-api',
            email: formData.email,
            name: formData.name,
            mobile_phone: formData.phone,
            cf_ocupation: formData.ocupation?.value,
            cf_income_range: formData.incomeRange?.value,
            cf_gender: formData.gender?.value,
            cf_birth_date: formData.dataNascimento,
          },
        },
      };

      const responseRD = await axios.request(optionsRD);
      console.log('RD Station Response:', responseRD);

      const responseBackend = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT_PRODUCTION}/argus/lead-consorcio`,
        {
          ...formData,
          currentPath: window.location.pathname,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Backend Response:', responseBackend);

      // Toca o som de sucesso com volume definido para 20%
      const successAudio = new Audio(
        'https://storage.googleapis.com/primesecure/audios-site/mixkit-fantasy-game-success-notification-270.wav',
      );
      successAudio.volume = 0.1;
      successAudio.play();

      sessionStorage.setItem('formData', JSON.stringify(formData));
      navigateBasedOnPath();
    } catch (error) {
      console.error('Erro na comunicação com RD Station ou Backend:', error);

      // Se houver uma resposta da API, exibe o erro específico
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
        toast.error(
          `Erro: ${error.response.data.message || 'Falha na requisição'}`,
        );
      } else {
        toast.error('Ocorreu um erro, tente novamente.');
      }

      // Toca o som de erro com volume definido para 20%
      const errorAudio = new Audio(
        'https://storage.googleapis.com/primesecure/audios-site/mixkit-wrong-electricity-buzz-955.wav',
      );
      errorAudio.volume = 0.1;
      errorAudio.play();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <form
        className="bg-white p-3 rounded-lg shadow-md mx-auto w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonClick();
        }}
      >
        <h2 className="text-xl font-bold mb-2 text-grayPrime text-center">
          Faça Sua Cotação
        </h2>
        <p className="text-sm mb-4 text-gray-600 text-center">
          Preencha o formulário abaixo para iniciar sua cotação.
        </p>

        {/* Nome */}
        <div className="col-span-1">
          <label
            htmlFor="name"
            className="block font-bold text-grayPrime text-sm"
          >
            Nome Completo
          </label>
          <div className="mb-4">
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={inputHandler}
              className={`w-full mt-1 p-1.5 border rounded-md focus:outline-none focus:ring-2 text-sm ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Seu nome"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-4">
          {/* Data de Nascimento */}
          <div className="col-span-1">
            <label
              htmlFor="dataNascimento"
              className="block text-sm font-bold text-grayPrime"
            >
              Data de Nascimento
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="dataNascimento"
                id="dataNascimento"
                value={formData.dataNascimento}
                onChange={inputHandler}
                className={`w-full mt-1 p-1.5 border rounded-md focus:outline-none focus:ring-2 text-sm ${
                  errors.dataNascimento ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Data de nascimento"
              />
              {errors.dataNascimento && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dataNascimento}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label
              htmlFor="email"
              className="block font-bold text-grayPrime text-sm"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={inputHandler}
              className={`w-full mt-1 p-1.5 border rounded-md focus:outline-none focus:ring-2 text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Seu email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Telefone */}
          <div className="col-span-1">
            <label
              htmlFor="phone"
              className="block font-bold text-grayPrime text-sm"
            >
              Telefone
            </label>
            <InputMask
              mask="(99) 99999-9999"
              id="phone"
              value={formData.phone}
              onChange={inputHandler}
              className={`w-full mt-1 p-1.5 border rounded-md focus:outline-none focus:ring-2 text-sm ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Seu telefone"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Ocupação */}
          <div className="col-span-1">
            <label
              htmlFor="ocupation"
              className="block font-bold text-grayPrime text-sm"
            >
              Ocupação Atual
            </label>
            <Select
              id="ocupation"
              value={formData.ocupation}
              onChange={handleOcupationChange}
              options={ocupationOptions}
              className={`w-full mt-1 p-1.5 border rounded-md focus:outline-none focus:ring-2 text-sm ${
                errors.ocupation ? 'border-red-500' : 'border-white'
              }`}
              placeholder="Sua ocupação"
            />
            {errors.ocupation && (
              <p className="text-red-500 text-xs mt-1">{errors.ocupation}</p>
            )}
          </div>
        </div>

        {/* Faixa de Renda + Sexo */}
        <div className="grid grid-cols-2 gap-x-3 mt-4">
          <div className="col-span-1">
            <label
              htmlFor="incomeRange"
              className="block font-bold text-grayPrime text-sm"
            >
              Faixa de Renda
            </label>
            <Select
              id="incomeRange"
              value={formData.incomeRange}
              onChange={handleIncomeRangeChange}
              options={incomeRangeOptions}
              className={`w-full mt-1 p-1.5 border rounded-md focus:outline-none focus:ring-2 text-sm ${
                errors.incomeRange ? 'border-red-500' : 'border-white'
              }`}
              placeholder="Sua renda"
            />
            {errors.incomeRange && (
              <p className="text-red-500 text-xs mt-1">{errors.incomeRange}</p>
            )}
          </div>

          <div className="col-span-1">
            <label
              htmlFor="gender"
              className="block font-bold text-grayPrime text-sm"
            >
              Sexo
            </label>
            <Select
              id="gender"
              value={formData.gender}
              onChange={handleGenderChange}
              options={genderOptions}
              className={`w-full mt-1 p-1.5 border rounded-md focus:outline-none focus:ring-2 text-sm ${
                errors.gender ? 'border-red-500' : 'border-white'
              }`}
              placeholder="Seu gênero"
            />
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>
        </div>

        <div className="xl:mx-20">
          <button
            type="submit"
            className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-full flex mt-3 justify-center items-center max-h-10"
          >
            {isLoading ? <LoadingAnimation /> : 'Cotar Agora'}
          </button>
        </div>
      </form>
    </ConfigProvider>
  );
}
