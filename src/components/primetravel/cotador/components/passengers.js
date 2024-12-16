import React, { useState } from "react";
import InputMask from "react-input-mask";
import { CirclePlus, Save } from "lucide-react";

// Validação genérica de campos
const validateFields = (data, requiredFields) => {
  const errors = {};
  requiredFields.forEach((field) => {
    errors[field] = !data[field] || data[field].trim() === ""; // Verifica campos vazios ou espaços em branco
  });
  return errors;
};

// Componente para o Primeiro Passageiro
const FirstPassenger = ({ data, onChange, errors }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#313131]">Passageiro responsável</h2>
      <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
        <input
          name="firstName"
          type="text"
          placeholder="Primeiro Nome"
          value={data.firstName}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className={`rounded-md border p-2 w-full ${errors.firstName ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        <input
          name="secondName"
          type="text"
          placeholder="Sobrenome"
          value={data.secondName}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className={`rounded-md border p-2 w-full ${errors.secondName ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        <InputMask
          name="CPF"
          mask="999.999.999-99"
          placeholder="CPF"
          value={data.CPF}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className={`rounded-md border p-2 w-full ${errors.CPF ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
      </div>
      <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
        <input
          name="birthday"
          type="date"
          value={data.birthday}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className={`rounded-md border p-2 w-full ${errors.birthday ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        <select
          name="gender"
          value={data.gender}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className={`rounded-md border p-2 w-full ${errors.gender ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
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
          className={`rounded-md border p-2 w-full ${errors.politica ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
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
          className={`rounded-md border p-2 w-full ${errors.email ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        <InputMask
          name="tell"
          mask="(99) 99999-9999"
          placeholder="Telefone"
          value={data.tell}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className={`rounded-md border p-2 w-full ${errors.tell ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        <input
          name="socialName"
          type="text"
          placeholder="Nome Social"
          value={data.socialName}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className={`rounded-md border p-2 w-full ${errors.socialName ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
      </div>
      {/* COLUNA 4 */}
      <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
        {/* INPUT CEP */}
        <InputMask
          mask={"9999-999"}
          type="text"
          placeholder={errors.zipCode ? "Coloque um CEP" : "Seu CEP"}
          name="zipCode"
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className={`rounded-md border p-2 w-full ${errors.zipCode ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
          }`}
        />
        {/* ENDEREÇO */}
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          placeholder={errors.address ? "Coloque seu endereço" : "Seu endereço"}
          className={`rounded-md border p-2 w-full ${errors.address
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        {/* NUMERO ENDEREÇO */}
        <input
          name="numberAddress"
          onChange={(e) => onChange(e.target.name, e.target.value)}
          value={data.numberAddress}
          type="text"
          placeholder={errors.numberAddress ? "Seu número" : "Número"}
          className={`rounded-md border p-2 w-full ${errors.numberAddress
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
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
          className={`rounded-md border p-2 w-full ${errors.completeAddress ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        {/* INPUT BAIRRO */}
        <input
          onChange={(e) => onChange(e.target.name, e.target.value)}
          value={data.bairro}
          type="text"
          placeholder={errors.district ? "Coloque um bairro válido" : "Seu bairro"}
          name="district"
          className={`rounded-md border p-2 w-full ${errors.district
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        {/* INPUT CIDADE*/}
        <input
          onChange={(e) => onChange(e.target.name, e.target.value)}
          value={data.city}
          type="text"
          placeholder={errors.city ? "Coloque um cidade válida" : "Sua cidade"}
          name="city"
          className={`rounded-md border p-2 w-full ${errors.city
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
      </div>
      <button
  className="bg-green-500 px-4 py-2 text-white rounded-md mt-4"
  onClick={() => onSave("firstPassenger")}
>
  <Save className="inline-block mr-2" />
  Salvar
</button>
    </div>
  );
};

// Componente para Passageiros Adicionais
const Passenger = ({ id, data, onChange }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <h3 className="text-lg font-bold text-[#313131]">Passageiro {id + 2}</h3>
      <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
        <input
          name="firstName"
          type="text"
          placeholder="Primeiro Nome"
          value={data.firstName}
          onChange={(e) => onChange(id, e.target.name, e.target.value)}
          className="rounded-md border p-2 w-full border-blue-500 focus:ring-blue-500"
        />
        <input
          name="secondName"
          type="text"
          placeholder="Sobrenome"
          value={data.secondName}
          onChange={(e) => onChange(id, e.target.name, e.target.value)}
          className="rounded-md border p-2 w-full border-blue-500 focus:ring-blue-500"
        />
        <InputMask
          name="CPF"
          mask="999.999.999-99"
          placeholder="CPF"
          value={data.CPF}
          onChange={(e) => onChange(id, e.target.name, e.target.value)}
          className="rounded-md border p-2 w-full border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className="bg-green-500 px-4 py-2 text-white rounded-md"
          onClick={() => onSave(id)}
        >
          <Save className="inline-block mr-2" />
          Salvar
        </button>
        <button
          className="bg-red-500 px-4 py-2 text-white rounded-md"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="inline-block mr-2" />
          Remover
        </button>
      </div>
    </div>
  );
};

// Componente Principal
const Passengers = () => {
  const [responsibleData, setResponsibleData] = useState({
    firstName: "",
    secondName: "",
    CPF: "",
    birthday: "",
    gender: "",
    politica: "",
    email: "",
    tell: "",
    socialName: "",
    zipCode: "",
    address: "",
    numberAddress: "",
    completeAddress: "",
    district: "",
    city: "",
  });
  const [responsibleErrors, setResponsibleErrors] = useState({});
  const [passengers, setPassengers] = useState([]);
  const [savedData, setSavedData] = useState({});

  

  const handleSave = (id) => {
    if (id === "firstPassenger") {
      setSavedData((prev) => ({ ...prev, firstPassenger: responsibleData }));
      alert("Passageiro responsável salvo!");
    } else {
      const savedPassenger = passengers[id];
      setSavedData((prev) => ({
        ...prev,
        [`passenger${id + 1}`]: savedPassenger,
      }));
      alert(`Passageiro ${id + 2} salvo!`);
    }
  };
  

  const handleResponsibleChange = (field, value) => {
    setResponsibleData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePassengerChange = (id, field, value) => {
    const updatedPassengers = passengers.map((p, index) =>
      index === id ? { ...p, [field]: value } : p
    );
    setPassengers(updatedPassengers);
  };

  const handleRemovePassenger = (id) => {
    const updatedPassengers = passengers.filter((_, index) => index !== id);
    setPassengers(updatedPassengers);
  };

  const validateAndAddPassenger = () => {
    const requiredFields = [
      "firstName",
      "secondName",
      "CPF",
      "birthday",
      "gender",
      "politica",
      "email",
      "tell",
      "zipCode",
      "address",
      "numberAddress",
      "district",
      "city",
    ];

    const responsibleValidation = validateFields(responsibleData, requiredFields);
    setResponsibleErrors(responsibleValidation);

    if (Object.values(responsibleValidation).some((err) => err)) {
      console.log("Erros encontrados no Passageiro Responsável:", responsibleValidation);
      return;
    }

    if (passengers.length >= 7) {
      console.log("Limite de passageiros atingido.");
      return;
    }

    setPassengers((prev) => [
      ...prev,
      {
        firstName: "",
        secondName: "",
        CPF: "",
      },
    ]);
  };

  return (
    <div>
      <FirstPassenger
        data={responsibleData}
        onChange={handleResponsibleChange}
        errors={responsibleErrors}
      />
      <div className="mt-4">
        {passengers.map((passenger, index) => (
          <Passenger
            key={index}
            id={index}
            data={passenger}
            onChange={handlePassengerChange}
            onRemove={handleRemovePassenger}
          />
        ))}
        <button
          className="bg-blue-500 px-4 py-2 text-white rounded-md mt-4"
          onClick={validateAndAddPassenger}
        >
          <CirclePlus className="inline-block mr-2" />
          Adicionar Passageiro
        </button>
        <button
          className="bg-green-500 px-4 py-2 text-white rounded-md mt-4 ml-4"
          onClick={handleSave}
        >
          <Save className="inline-block mr-2" />
          Salvar
        </button>
      </div>
    </div>
  );
};

export default Passengers;
