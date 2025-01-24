import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { CirclePlus, Save, Trash2, Edit, Users, User, Star } from 'lucide-react';
import GlobalFuntions from '../../../globalsubcomponentes/globalFunctions';
import { saveToStorage, loadFromStorage } from '../utils/storageUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PassengerVisualizer from './subcomponents/passengerVisualizer';
import moment from 'moment'; // ADIÇÃO IMPORTANTE: para lidar com datas

// Instância das funções globais
const globalFunctions = new GlobalFuntions();

// Validação genérica de campos
export const validateFields = (data, requiredFields) => {
  const errors = {};
  requiredFields.forEach((field) => {
    switch (field) {
      case 'CPF':
        errors[field] = !globalFunctions.validateCPF(data[field]);
        break;
      case 'email':
        errors[field] = !globalFunctions.validateEmail(data[field]);
        break;
      case 'tell':
        errors[field] = !globalFunctions.validatePhone(data[field]);
        break;
      default:
        errors[field] = !data[field] || data[field].trim() === '';
    }
  });
  return errors;
};

// Lógica de busca no ViaCEP
const fetchAddressFromCEP = async (cep, onChange) => {
  const cleanedCep = cep.replace(/\D/g, '');
  if (cleanedCep.length !== 8) return;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    if (!response.ok) throw new Error('Erro ao buscar o CEP.');
    const data = await response.json();
    if (data.erro) return;

    // Atualiza apenas os campos de endereço
    onChange('address', data.logradouro || '');
    onChange('district', data.bairro || '');
    onChange('city', data.localidade || '');
    onChange('state', data.uf || '');
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error);
  }
};

// Primeiro Passageiro (Responsável)
const FirstPassenger = ({
  onSave,
  data,
  onChange,
  errors,
  passengersCount,
  maxPassengers,
  responsibleTravelDate // ADIÇÃO IMPORTANTE
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const hasErrors = onSave();
    if (!hasErrors) {
      saveToStorage('responsiblePassenger', data); // Salva no sessionStorage
      toast.success('Dados salvos com sucesso!');
      setIsEditing(false);
    }
  };

  // ADIÇÃO IMPORTANTE: Calcula a data-limite (departure - 18 anos)
  // Se não tiver departure (data de viagem), caímos num fallback "hoje - 18 anos"
  const departureMoment = responsibleTravelDate
    ? moment(responsibleTravelDate)
    : moment();
  const minBirthdate = departureMoment.subtract(18, 'years').format('YYYY-MM-DD');

  return (
    <div>
      <PassengerVisualizer
        currentPassengers={passengersCount}
        maxPassengers={maxPassengers}
      />

      <div className="bg-gray-50 p-4 rounded-md mb-4 shadow-sm sm:m-0 mx-2 shadow-indigo-500/40">
        {isEditing ? (
          <>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#313131] flex items-center">
              <Star size={20} className="mr-2 text-bluePrime" />
              Passageiro responsável
            </h2>

            <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
              <input
                name="firstName"
                type="text"
                placeholder="Primeiro Nome"
                value={data.firstName}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={`rounded-md border p-2 w-full ${errors.firstName
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
              <input
                name="secondName"
                type="text"
                placeholder="Sobrenome"
                value={data.secondName}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={`rounded-md border p-2 w-full ${errors.secondName
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
              <InputMask
                name="CPF"
                mask="999.999.999-99"
                placeholder="CPF"
                value={data.CPF}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={`rounded-md border p-2 w-full ${errors.CPF
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
            </div>
            <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
              {/* ADIÇÃO IMPORTANTE: max = minBirthdate */}
              <input
                name="birthday"
                type="date"
                value={data.birthday}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                max={minBirthdate}
                className={`rounded-md border p-2 w-full ${errors.birthday
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
              <select
                name="gender"
                value={data.gender}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={`rounded-md border p-2 w-full ${errors.gender
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              >
                <option value="">Selecione o Gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
              <select
                name="politica"
                value={data.politica}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={`rounded-md border p-2 w-full ${errors.politica
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              >
                <option value="">Pessoa politicamente exposta?</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>
            <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                value={data.email}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={`rounded-md border p-2 w-full ${errors.email
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
              <InputMask
                name="tell"
                mask="(99) 99999-9999"
                placeholder="Telefone"
                value={data.tell}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={`rounded-md border p-2 w-full ${errors.tell
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
              <input
                name="socialName"
                type="text"
                placeholder="Nome Social"
                value={data.socialName}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={`rounded-md border p-2 w-full ${errors.socialName
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
            </div>
            {/* CEP / Endereço */}
            <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
              <InputMask
                mask={'99999-999'}
                type="text"
                placeholder={errors.zipCode ? 'Coloque um CEP' : 'Seu CEP'}
                name="zipCode"
                value={data.zipCode}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => fetchAddressFromCEP(e.target.value, onChange)}
                className={`rounded-md border p-2 w-full ${errors.zipCode
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                placeholder={
                  errors.address ? 'Coloque seu endereço' : 'Seu endereço'
                }
                className={`rounded-md border p-2 w-full ${errors.address
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
              <input
                name="numberAddress"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={data.numberAddress}
                type="text"
                placeholder={errors.numberAddress ? 'Seu número' : 'Número'}
                className={`rounded-md border p-2 w-full ${errors.numberAddress
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
            </div>
            {/* Complemento, Bairro, Cidade */}
            <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
              <input
                name="completeAddress"
                type="text"
                placeholder="Complemento"
                value={data.completeAddress}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={`rounded-md border p-2 w-full ${errors.completeAddress
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
              <input
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={data.district}
                type="text"
                placeholder={
                  errors.district ? 'Coloque um bairro válido' : 'Seu bairro'
                }
                name="district"
                className={`rounded-md border p-2 w-full ${errors.district
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
              <input
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={data.city}
                type="text"
                placeholder={
                  errors.city ? 'Coloque uma cidade válida' : 'Sua cidade'
                }
                name="city"
                className={`rounded-md border p-2 w-full ${errors.city
                    ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                    : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                  }`}
              />
            </div>

            {/* Botão salvar */}
            <div className="mt-4 flex justify-end">
              <button
                className="bg-green-500 px-4 py-2 text-white rounded-md"
                onClick={handleSave}
              >
                <Save className="inline-block mr-2" />
                Salvar
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#313131] flex items-center">
                <Star size={20} className="mr-2 text-bluePrime" />
                Passageiro responsável
              </h2>

              <p>
                Nome: {data.firstName} {data.secondName}
              </p>
              <p>CPF: {data.CPF}</p>
            </div>
            <button
              className="bg-yellow-500 px-4 py-2 text-white rounded-md"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="inline-block mr-2" />
              Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Passageiros adicionais
const Passenger = ({
  id,
  data,
  onChange,
  onRemove,
  onSave,
  errors,
  isEditing,
  setIsEditing
}) => {
  const handleSave = () => {
    const hasErrors = onSave(id);
    if (!hasErrors) {
      setIsEditing(false);
      toast.success('Dados salvos com sucesso!');
    }
  };

  // ADIÇÃO IMPORTANTE: Limitar data de nascimento ao ano atual
  // (Não deixa escolher nascimento no futuro).
  const currentYear = new Date().getFullYear();
  const maxPassengerDate = `${currentYear}-12-31`;

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4 shadow-sm sm:m-0 mx-2 shadow-indigo-500/40">
      {isEditing ? (
        <>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#313131] flex items-center">
            <User size={20} className="mr-2 text-bluePrime" />
            Passageiro {id + 2}
          </h3>

          <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
            <input
              name="firstName"
              type="text"
              placeholder="Primeiro Nome"
              value={data.firstName}
              onChange={(e) => onChange(id, e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${errors.firstName
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                }`}
            />
            <input
              name="secondName"
              type="text"
              placeholder="Sobrenome"
              value={data.secondName}
              onChange={(e) => onChange(id, e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${errors.secondName
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                }`}
            />
            <InputMask
              name="CPF"
              mask="999.999.999-99"
              placeholder="CPF"
              value={data.CPF}
              onChange={(e) => onChange(id, e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${errors.CPF
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                }`}
            />
          </div>
          <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
            {/* ADIÇÃO IMPORTANTE: max = ano atual */}
            <input
              name="birthday"
              type="date"
              value={data.birthday}
              onChange={(e) => onChange(id, e.target.name, e.target.value)}
              max={maxPassengerDate}
              className={`rounded-md border p-2 w-full ${errors.birthday
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                }`}
              placeholder="Data de Nascimento"
            />
            <select
              name="gender"
              value={data.gender}
              onChange={(e) => onChange(id, e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${errors.gender
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                }`}
            >
              <option value="">Selecione o Gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
            <select
              name="politica"
              value={data.politica}
              onChange={(e) => onChange(id, e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${errors.politica
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
                }`}
            >
              <option value="">Pessoa politicamente exposta?</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="bg-red-500 px-4 py-2 text-white rounded-md"
              onClick={() => onRemove(id)}
            >
              <Trash2 className="inline-block mr-2" />
              Remover
            </button>
            <button
              className="bg-green-500 px-4 py-2 text-white rounded-md"
              onClick={handleSave}
            >
              <Save className="inline-block mr-2" />
              Salvar
            </button>
          </div>
        </>
      ) : (
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#313131] flex items-center">
                <User size={20} className="mr-2 text-bluePrime" />
                Passageiro {id + 2}
              </h2>
              <p>
                Nome: {data.firstName} {data.secondName}
              </p>
              <p>CPF: {data.CPF}</p>
            </div>
            <button
              className="bg-yellow-500 px-4 py-2 text-white rounded-md flex items-center"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="inline-block mr-2" />
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Passengers = ({
  data,
  responsibleData,
  setResponsibleData,
  onChange,
  onPassengersStatusChange,
}) => {
  const [responsibleErrors, setResponsibleErrors] = useState({});
  const [isResponsibleSaved, setIsResponsibleSaved] = useState(false);

  const [passengers, setPassengers] = useState([]);
  const [passengerErrors, setPassengerErrors] = useState([]);
  const [passengerEditingStatus, setPassengerEditingStatus] = useState([]);

  const [maxPassengers, setMaxPassengers] = useState(0);
  const [currentPassengers, setCurrentPassengers] = useState(0);

  // ADIÇÃO IMPORTANTE: Precisamos da data de viagem (departure) para checar +18
  const [travelDate, setTravelDate] = useState(null);

  useEffect(() => {
    // 1. Carrega responsável
    const storedResponsible = loadFromStorage('responsiblePassenger', {});
    if (Object.keys(storedResponsible).length > 0) {
      setResponsibleData(storedResponsible);
      setIsResponsibleSaved(true);
    }

    // 2. Carrega passageiros adicionais
    const storedPassengers = loadFromStorage('passengers', []);
    if (Array.isArray(storedPassengers)) {
      setPassengers(storedPassengers);
      setPassengerEditingStatus(storedPassengers.map(() => false));
    }

    // 3. Carrega editQuote para pegar o limite e data de viagem
    const storedEditQuote = loadFromStorage('editQuote', {});
    const sumOfOlds = storedEditQuote.olds?.reduce((sum, num) => sum + num, 0) || 0;
    setMaxPassengers(sumOfOlds);

    // ADIÇÃO IMPORTANTE: Pegamos a departure
    if (storedEditQuote.departure) {
      setTravelDate(storedEditQuote.departure);
    }
  }, [setResponsibleData]);

  // Sempre que mudar a contagem, avisamos o pai
  useEffect(() => {
    const isAllComplete = currentPassengers === maxPassengers && maxPassengers > 0;
    if (onPassengersStatusChange) {
      onPassengersStatusChange(isAllComplete);
    }
  }, [currentPassengers, maxPassengers, onPassengersStatusChange]);

  // Recalcula a contagem atual
  useEffect(() => {
    const responsibleCount = Object.keys(responsibleData).length > 0 ? 1 : 0;
    setCurrentPassengers(responsibleCount + passengers.length);
  }, [responsibleData, passengers]);

  // Valida e salva responsável
  const handleSaveResponsible = () => {
    const requiredFields = [
      'firstName',
      'secondName',
      'CPF',
      'birthday',
      'gender',
      'politica',
      'email',
      'tell',
      'zipCode',
      'address',
      'numberAddress',
      'district',
      'city',
    ];
    const errors = validateFields(responsibleData, requiredFields);
    setResponsibleErrors(errors);

    const hasErrors = Object.values(errors).some((err) => err);

    // ADIÇÃO IMPORTANTE: verificar se é maior de 18
    if (!hasErrors && travelDate && responsibleData.birthday) {
      const departureMoment = moment(travelDate);
      const birthMoment = moment(responsibleData.birthday);
      const ageAtTravel = departureMoment.diff(birthMoment, 'years');
      if (ageAtTravel < 18) {
        toast.error('O responsável deve ter pelo menos 18 anos na data da viagem.');
        return true; // sinaliza erro
      }
    }

    if (!hasErrors) {
      saveToStorage('responsiblePassenger', responsibleData);
      setIsResponsibleSaved(true);
    }
    return hasErrors;
  };

  // Altera dados do responsável
  const handleResponsibleChange = (field, value) => {
    setResponsibleData((prev) => ({ ...prev, [field]: value }));
  };

  // Altera dados de passageiro
  const handlePassengerChange = (id, field, value) => {
    const updated = passengers.map((p, index) =>
      index === id ? { ...p, [field]: value } : p
    );
    setPassengers(updated);
    saveToStorage('passengers', updated);
  };

  // Remove passageiro
  const handleRemovePassenger = (id) => {
    const updated = passengers.filter((_, index) => index !== id);
    setPassengers(updated);
    setPassengerEditingStatus(updated.map(() => false));
    saveToStorage('passengers', updated);
  };

  // Salva um passageiro adicional
  const handleSavePassenger = (id) => {
    const requiredFields = [
      'firstName',
      'secondName',
      'CPF',
      'birthday',
      'gender',
      'politica',
    ];
    const passengerData = passengers[id];
    const errors = validateFields(passengerData, requiredFields);

    setPassengerErrors((prev) => {
      const updatedErrors = [...prev];
      updatedErrors[id] = errors;
      return updatedErrors;
    });

    const hasErrors = Object.values(errors).some((err) => err);
    if (!hasErrors) {
      const updatedEditingStatus = passengerEditingStatus.map((status, index) =>
        index === id ? false : status
      );
      setPassengerEditingStatus(updatedEditingStatus);
      saveToStorage('passengers', passengers);
    }
    return hasErrors;
  };

  // Adiciona novo passageiro
  const addPassenger = () => {
    if (currentPassengers < maxPassengers) {
      const newPassenger = {
        firstName: '',
        secondName: '',
        CPF: '',
        birthday: ''
      };
      const updated = [...passengers, newPassenger];
      setPassengers(updated);
      setPassengerEditingStatus([...passengerEditingStatus, true]);
      saveToStorage('passengers', updated);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="light"
      />

      {/* PASSAGEIRO RESPONSÁVEL */}
      <FirstPassenger
        data={responsibleData}
        onChange={handleResponsibleChange}
        errors={responsibleErrors}
        onSave={handleSaveResponsible}
        passengersCount={currentPassengers}
        maxPassengers={maxPassengers}
        responsibleTravelDate={travelDate} // ADIÇÃO IMPORTANTE
      />

      {/* PASSAGEIROS ADICIONAIS */}
      <div className="mt-4 space-y-4">
        {passengers.map((passenger, index) => (
          <Passenger
            key={index}
            id={index}
            data={passenger}
            isEditing={passengerEditingStatus[index]}
            onChange={handlePassengerChange}
            onRemove={handleRemovePassenger}
            onSave={handleSavePassenger}
            errors={passengerErrors[index] || {}}
            setIsEditing={(editing) =>
              setPassengerEditingStatus((prev) =>
                prev.map((status, i) => (i === index ? editing : status))
              )
            }
          />
        ))}

        {/* Botão de adicionar passageiro */}
        {currentPassengers < maxPassengers ? (
          <button
            className={`px-4 py-2 mt-4 rounded-md text-white ${isResponsibleSaved ? 'bg-bluePrime' : 'bg-gray-400 opacity-50'
              }`}
            onClick={addPassenger}
            disabled={!isResponsibleSaved}
          >
            <CirclePlus className="inline-block mr-2" />
            Adicionar Passageiro
          </button>
        ) : (
          <div className="flex justify-center items-center px-4 py-2 mt-4 text-center space-x-3 text-grayPrime font-semibold rounded-md">
            <Users size={24} className="text-bluePrime" />
            <p>Todos os passageiros adicionados com sucesso!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Passengers;
