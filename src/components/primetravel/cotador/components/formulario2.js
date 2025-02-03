import React from "react";
import InputMask from "react-input-mask";

const Formulario2 = ({
  firstNameRef,
  secondNameRef,
  CPFRef,
  birthdayRef,
  genderRef,
  exposedPersonRef,
  errors,
  passengerFirstName,
  passengerSecondName,
  passengerCPF,
  handleInputChange,
  handleSave,
}) => {
  return (
    <div>
      {/* COLUNA 1 */}
      <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
        <input
          ref={firstNameRef}
          name="firstName"
          type="text"
          placeholder={
            errors.firstName
              ? "Coloque somente o primeiro nome"
              : "Primeiro nome"
          }
          value={passengerFirstName}
          onChange={handleInputChange}
          className={`rounded-md border p-2 w-full ${errors.firstName
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        <input
          ref={secondNameRef}
          name="secondName"
          type="text"
          placeholder={
            errors.secondName
              ? "Coloque somente seu segundo nome"
              : "Segundo nome"
          }
          value={passengerSecondName}
          onChange={handleInputChange}
          className={`rounded-md border p-2 w-full ${errors.secondName
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        <InputMask
          ref={CPFRef}
          name="CPF"
          type="text"
          mask="999.999.999-99"
          placeholder={
            errors.CPF ? "Coloque o seu CPF completo" : "Seu CPF"
          }
          value={passengerCPF}
          onChange={handleInputChange}
          className={`rounded-md border p-2 w-full ${errors.CPF
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
      </div>

      {/* COLUNA 2 */}
      <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
        <input
          ref={birthdayRef}
          type="date"
          name="birthday"
          placeholder={
            errors.birthday
              ? "Coloque sua data de nascimento"
              : "Data de nascimento"
          }
          onChange={handleInputChange}
          className={`rounded-md border p-2 w-full ${errors.birthday
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        />
        <select
          ref={genderRef}
          name="gender"
          onChange={handleInputChange}
          className={`rounded-md border p-2 w-full ${errors.gender
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        >
          <option value="">Gênero</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
        <select
          ref={exposedPersonRef}
          name="exposedPerson"
          onChange={handleInputChange}
          className={`rounded-md border p-2 w-full ${errors.exposedPerson
              ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
              : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
            }`}
        >
          <option value="">Pessoa politicamente exposta?</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>
      </div>

      {/* BOTÃO SALVAR */}
      <div className="mt-4 text-end">
        <button
          onClick={handleSave}
          className="bg-bluePrime px-5 py-2 text-white rounded-md"
        >
          Salvar Passageiro
        </button>
      </div>
    </div>
  );
};

export default Formulario2;
