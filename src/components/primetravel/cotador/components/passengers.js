import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { CirclePlus, Save, Trash2, Edit, UsersRound, Star } from 'lucide-react';
import GlobalFuntions from '../../../globalsubcomponentes/globalFunctions';

const globalFunctions = new GlobalFuntions();

// Validação genérica de campos
const validateFields = (data, requiredFields) => {
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
  const cleanedCep = cep.replace(/\D/g, ''); // Remove tudo que não é número

  if (cleanedCep.length !== 8) {
    //alert("CEP inválido. O CEP deve ter 8 dígitos.");
    return;
  }

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${cleanedCep}/json/`,
    );
    if (!response.ok) throw new Error('Erro ao buscar o CEP.');
    const data = await response.json();

    //console.log(data);

    if (data.erro) {
      //alert("CEP não encontrado. Verifique o CEP e tente novamente.");
      return;
    }

    // Preenche os campos
    onChange('address', data.logradouro || '');
    onChange('district', data.bairro || '');
    onChange('city', data.localidade || '');
    onChange('state', data.uf || '');
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error);
    //console.log("Erro ao buscar o CEP. Tente novamente.", error);
    //alert("Erro ao buscar o CEP. Tente novamente.");
  }
};

// Componente para o Primeiro Passageiro
const FirstPassenger = ({ onSave, data, onChange, errors }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => {
    const hasErrors = onSave(); // Validação
    if (!hasErrors) {
      setIsEditing(false); // Só fecha se não houver erros
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4 shadow-sm sm:m-0 mx-2 shadow-indigo-500/40">
      {isEditing ? (
        // Modo de edição
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
              className={`rounded-md border p-2 w-full ${
                errors.firstName
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
              className={`rounded-md border p-2 w-full ${
                errors.secondName
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
              className={`rounded-md border p-2 w-full ${
                errors.CPF
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
          </div>
          <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
            <input
              name="birthday"
              type="date"
              value={data.birthday}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${
                errors.birthday
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
            <select
              name="gender"
              value={data.gender}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${
                errors.gender
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
              className={`rounded-md border p-2 w-full ${
                errors.politica
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
              className={`rounded-md border p-2 w-full ${
                errors.email
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
              className={`rounded-md border p-2 w-full ${
                errors.tell
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
              className={`rounded-md border p-2 w-full ${
                errors.socialName
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
          </div>
          {/* COLUNA 4 */}
          <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
            {/* INPUT CEP */}
            <InputMask
              mask={'99999-999'}
              type="text"
              placeholder={errors.zipCode ? 'Coloque um CEP' : 'Seu CEP'}
              name="zipCode"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => fetchAddressFromCEP(e.target.value, onChange)}
              className={`rounded-md border p-2 w-full ${
                errors.zipCode
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
            {/* ENDEREÇO */}
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              placeholder={
                errors.address ? 'Coloque seu endereço' : 'Seu endereço'
              }
              className={`rounded-md border p-2 w-full ${
                errors.address
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
            {/* NUMERO ENDEREÇO */}
            <input
              name="numberAddress"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              value={data.numberAddress}
              type="text"
              placeholder={errors.numberAddress ? 'Seu número' : 'Número'}
              className={`rounded-md border p-2 w-full ${
                errors.numberAddress
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
          </div>
          {/* COLUNA 5 */}
          <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
            {/* INPUT COMPLEMENTO */}
            <input
              name="completeAddress"
              type="text"
              placeholder="Complemento"
              value={data.completeAddress}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${
                errors.completeAddress
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
            {/* INPUT BAIRRO */}
            <input
              onChange={(e) => onChange(e.target.name, e.target.value)}
              value={data.district}
              type="text"
              placeholder={
                errors.district ? 'Coloque um bairro válido' : 'Seu bairro'
              }
              name="district"
              className={`rounded-md border p-2 w-full ${
                errors.district
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
            {/* INPUT CIDADE*/}
            <input
              onChange={(e) => onChange(e.target.name, e.target.value)}
              value={data.city}
              type="text"
              placeholder={
                errors.city ? 'Coloque um cidade válida' : 'Sua cidade'
              }
              name="city"
              className={`rounded-md border p-2 w-full ${
                errors.city
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
          </div>
          {/* Outros campos permanecem inalterados */}
          <div className="mt-4 flex justify-end">
            <button
              className="bg-green-500 px-4 py-2 text-white rounded-md flex items-center"
              onClick={handleSave} // Chama a validação e só fecha se não houver erros
            >
              <Save className="inline-block mr-2" />
              Salvar
            </button>
          </div>
        </>
      ) : (
        // Modo de visualização (Card)
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
            onClick={() => setIsEditing(true)} // Retorna ao modo de edição
          >
            <Edit className="inline-block mr-2" />
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

// Componente para Passageiros Adicionais
const Passenger = ({ id, data, onChange, onRemove, onSave, errors }) => {
  // Adicione 'errors' aqui

  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => {
    const hasErrors = onSave(id);
    if (!hasErrors) {
      setIsEditing(false); // Fecha o modo de edição apenas se não houver erros
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4 shadow-sm sm:m-0 mx-2 shadow-indigo-500/40">
      {isEditing ? (
        <>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#313131] flex items-center">
            <UsersRound size={20} className="mr-2 text-bluePrime" />
            Passageiro {id + 2}
          </h3>

          <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
            <input
              name="firstName"
              type="text"
              placeholder="Primeiro Nome"
              value={data.firstName}
              onChange={(e) => onChange(id, e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${
                errors.firstName
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
              className={`rounded-md border p-2 w-full ${
                errors.secondName
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
              className={`rounded-md border p-2 w-full ${
                errors.CPF
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
            />
          </div>
          <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
            <input
              name="birthday"
              type="date"
              value={data.birthday}
              onChange={(e) => onChange(id, e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${
                errors.birthday
                  ? 'border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500'
                  : 'border-bluePrime focus:ring-bluePrime ring-bluePrime'
              }`}
              placeholder="Data de Nascimento"
            />
            <select
              name="gender"
              value={data.gender}
              onChange={(e) => onChange(id, e.target.name, e.target.value)}
              className={`rounded-md border p-2 w-full ${
                errors.gender
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
              className={`rounded-md border p-2 w-full ${
                errors.politica
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
        // Visualização como Card
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#313131] flex items-center">
              <UsersRound size={20} className="mr-2 text-bluePrime" />
              Passageiro {id + 2}
            </h3>

            <p>
              Nome: {data.firstName} {data.secondName}
            </p>
            <p>CPF: {data.CPF}</p>
          </div>
          <button
            className="bg-yellow-500 px-4 py-2 text-white rounded-md"
            onClick={() => setIsEditing(true)} // Alterna para o modo de edição
          >
            <Edit className="inline-block mr-2" />
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

// Componente Principal
const Passengers = () => {
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
  const [responsibleErrors, setResponsibleErrors] = useState({});
  const [isResponsibleSaved, setIsResponsibleSaved] = useState(false);
  const [passengers, setPassengers] = useState([]);
  const [passengerErrors, setPassengerErrors] = useState([]);

  // useEffect(() => {
  //   const storedData = sessionStorage.getItem('formData-Travel');
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     setResponsibleData(parsedData.responsibleData || responsibleData);
  //     setPassengers(parsedData.passengers || []);
  //   }
  // }, []);

  //Atualiza o sessionStorage sempre que os dados mudam
  useEffect(() => {
    sessionStorage.setItem(
      'passengersData',
      JSON.stringify({ responsibleData, passengers }),
    );
  });

  // Valida e salva o passageiro responsável
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
    if (!hasErrors) {
      setIsResponsibleSaved(true);
    }
    return hasErrors; // Retorna se há erros
  };

  const handleResponsibleChange = (field, value) => {
    setResponsibleData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePassengerChange = (id, field, value) => {
    const updatedPassengers = passengers.map((p, index) =>
      index === id ? { ...p, [field]: value } : p,
    );
    setPassengers(updatedPassengers);
  };

  const handleRemovePassenger = (id) => {
    const updatedPassengers = passengers.filter((_, index) => index !== id);
    setPassengers(updatedPassengers);
  };

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

    // Valida os campos do passageiro usando a função otimizada
    const errors = validateFields(passengerData, requiredFields);

    // Atualiza os erros do passageiro no estado
    setPassengerErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[id] = errors;
      return updatedErrors;
    });

    // Retorna se há erros
    return Object.values(errors).some((err) => err);
  };

  const addPassenger = () => {
    if (passengers.length >= 6) return;
    setPassengers([...passengers, { firstName: '', secondName: '', CPF: '' }]);
  };

  return (
    <div>
      <FirstPassenger
        data={responsibleData}
        onChange={handleResponsibleChange}
        errors={responsibleErrors}
        onSave={handleSaveResponsible} // Chama a validação do responsável
      />
      <div className="mt-4">
        {passengers.map((passenger, index) => (
          <Passenger
            key={index}
            id={index}
            data={passenger}
            onChange={handlePassengerChange}
            onRemove={handleRemovePassenger}
            onSave={() => handleSavePassenger(index)} // Valida os dados
            errors={passengerErrors[index] || {}} // Passa os erros do passageiro específico
          />
        ))}
        <button
          className={`px-4 py-2 mt-4 rounded-md text-white ${
            isResponsibleSaved ? 'bg-bluePrime' : 'bg-gray-400 opacity-50'
          }`}
          onClick={addPassenger}
          disabled={!isResponsibleSaved}
        >
          <CirclePlus className="inline-block mr-2" />
          Adicionar Passageiro
        </button>
      </div>
    </div>
  );
};

export default Passengers;
