import { Chip } from "@material-tailwind/react";
import React, { useState, useRef } from "react";
import {CirclePlus} from "lucide-react"
import { prepareCssVars } from "@mui/system";
import InputMask from "react-input-mask";

const Passengers = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [passengerFirstName, setPassengerFirstName] = useState("");
  const [passengerSecondName, setPassengerSecondName] = useState("");
  const [passengerCPF, setPassengerCPF] = useState("");
  const [passengerBirthday, setPassengerBirthday] = useState("");
  const [passengerGender, setPassengerGender] = useState("");
  const [passengerExposedPerson, setPessengerExposedPerson] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [passengerTell, setPassengerTell] = useState("");
  const [passengerSocialName, setPassengerSocialName] = useState("");
  const [passengerZipCode, setPassengerZipCode] = useState("");
  const [passengerAddress, setPassengerAddress] = useState("");
  const [passengerNumberAddress, setPassengerNumberAddress] = useState("");
  const [passengerCompleteAddress, setPassengerCompleteAddress] = useState("");
  const [passengerDistrict, setPassengerDistrict] = useState("");
  const [passengerCity, setPassengerCity] = useState("");
   const [errors, setErrors] = useState({ 
     firstName: false,
     secondName: false,
     CPF: false,
     birthday: false,
     gender: false,
     exposedPerson: false,
     email: false,
     tell: false,
     socialName: false,
     zipCode: false,
     address: false,
     numberAddress: false,
     completeAddress: false,
     district: false,
     city: false,
   }); // Controle de erros

  const firstNameRef = useRef(null); //Referencia para o campo de "Primeiro nome"
  const secondNameRef = useRef(null);
  const CPFRef = useRef(null);
  const birthdayRef = useRef(null);
  const genderRef = useRef(null);
  const exposedPersonRef = useRef(null);
  const emailRef = useRef(null);
  const tellRef = useRef(null);
  const socialNameRef = useRef(null);
  const zipCodeRef = useRef(null);
  const addressRef = useRef(null);
  const numberAddressRef = useRef(null);
  const completeAddressRef = useRef(null);
  const districtRef = useRef(null);
  const cityRef = useRef(null);

  const handleSave = () => {
    let hasError = false; // Controle de erros
  
    // Verifica todos os campos de uma vez
    const newErrors = {
      firstName: !passengerFirstName,
      secondName: !passengerSecondName,
      CPF: !passengerCPF,
      birthday: !passengerBirthday,
      gender: !passengerGender,
      exposedPerson: !passengerExposedPerson,
      email: !passengerEmail,
      tell: !passengerTell,
      socialName: false, // Opcional, pode ser removido se não for obrigatório
      zipCode: !passengerZipCode,
      address: !passengerAddress,
      numberAddress: !passengerNumberAddress,
      completeAddress: false, // Opcional
      district: !passengerDistrict,
      city: !passengerCity,
    };
  
    // Define se há algum erro
    Object.values(newErrors).forEach((value) => {
      if (value) hasError = true;
    });
  
    // Atualiza os erros no estado
    setErrors(newErrors);
  
    // Se houver erro, interrompe o fluxo
    if (hasError) {
      // Rola para o primeiro erro encontrado
      if (newErrors.firstName) {
        firstNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.secondName) {
        secondNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.CPF){
        CPFRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.birthday) {
        birthdayRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.gender) {
        genderRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.exposedPerson) {
        exposedPersonRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.email) {
        emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.tell) {
        tellRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.socialName) {
        socialNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.zipCode) {
        zipCodeRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.address) {
        addressRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.numberAddress) {
        numberAddressRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.completeAddress) {
        completeAddressRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.district) {
        districtRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      } else if (newErrors.city) {
        cityRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
      }
      return;
    }
  
    // Caso não tenha erros, salva o formulário
    setErrors({}); // Reseta os erros
    setIsSaved(true);
  };

  //Scrolla pra cima para o campo vazio 
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "firstName") {
      setPassengerFirstName(value);
      if (value) {
        setErrors((prev) => ({ ...prev, firstName: false })); // Remove o erro de primeiro nome
      }
    } else if (name === "secondName") {
      setPassengerSecondName(value);
      if (value) {
        setErrors((prev) => ({ ...prev, secondName: false })); // Remove o erro de segundo nome
      }
    } else if (name === "CPF") {
      setPassengerCPF(value);
      if(value){
        setErrors((prev) => ({...prev, CPF: false }));
      }
    } else if (name === "birthday"){
      setPassengerBirthday(value);
      if(value){
        setErrors((prev) => ({ ...prev, birthday: false}));
      } 
    } else if (name === "gender"){
      setPassengerGender(value);
      if(value){
        setErrors((prev) => ({...prev, gender: false}));
      }
    } else if (name === "exposedPerson"){
      setPessengerExposedPerson(value);
      if(value){
        setErrors((prev) => ({...prev, exposedPerson: false}));
      }
    } else if (name === "email"){
      setPassengerEmail(value);
      if(value){
        setErrors((prev) => ({...prev, email: false}));
      }
    } else if (name === "tell"){
      setPassengerTell(value);
      if(value){
        setErrors((prev) => ({...prev, tell: false}));
      }
    } else if (name === "socialName"){
      setPassengerSocialName(value);
      if(value){
        setErrors((prev) => ({...prev, socialName: false}));
      }
    } else if (name === "address"){
      setPassengerAddress(value);
      if(value){
        setErrors((prev) => ({...prev, address: false}));
      }
    } else if (name === "numberAddress"){
      setPassengerNumberAddress(value);
      if(value){
        setErrors((prev) => ({...prev, numberAddress: false}));
      }
    } else if (name === "completeAddress"){
      setPassengerCompleteAddress(value);
      if(value){
        setErrors((prev) => ({...prev, completeAddress: false}));
      }
    } else if (name === "district"){
      setPassengerDistrict(value);
      if(value){
        setErrors((prev) => ({...prev, district: false}));
      }
    } else if (name === "city"){
      setPassengerCity(value);
      if(value){
        setErrors((prev) => ({...prev, city: false}));
      }
    }
  };

  // const handleEdit = () => {
  //   // Atualiza o estado para "editar"
  //   setIsSaved(false);
  // };

  return (
    <div>
      {/* HEADER + TÍTULO */}
      <div>
        <h2 className="text-3xl font-bold text-[#313131]">Passageiros</h2>
        <p>Aqui você pode listar os planos disponíveis...</p>
      </div>

      <div className="bg-white shadow-md p-5 rounded-lg">
        {isSaved ? (
          // Exibe a versão compactada quando salvo
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-[#313131]">
                {passengerFirstName || "Passageiro"} {/* Nome salvo */}
              </h2>
              <Chip
                className="bg-bluePrime items-center"
                size="lg"
                value="Passageiro Responsável"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-bluePrime px-4 py-2 text-white rounded-md"
            >
              Editar Passageiro
            </button>
          </div>
        ) : (
          // Exibe o formulário quando não está salvo
          <>
            {/* FORMULÁRIO */}

            <div className=" flex space-x-2 items-start text-start mb-4">
              <h2 className="text-xl text-[#313131] font-bold">
                Passageiro Responsável:
              </h2>
              <Chip
                className="bg-bluePrime items-center"
                size="lg"
                value="Idade entre 0 e 75 Anos"
              />
            </div>

            {/* FORMULÁRIO */}
            {/* COLUNAS */}
            <div>
              {/* COLUNA 1 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                <input
                ref={firstNameRef} //Atribuir o ref ao campo "Primeiro nome"
                name="firstName" // Adicione o atributo name
                  type="text"
                  placeholder={errors.firstName ? "Coloque somente o primeiro nome" : "Primeiro nome"}
                  value={passengerFirstName}
                  onChange={handleInputChange}
                  className={`rounded-md border p-2 w-full ${
                    errors.firstName
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* INPUT SEGUNDO NOME */}
                <input
                ref={secondNameRef}
                name="secondName"
                  type="text"
                  placeholder={errors.secondName ? "Coloque somente seu segundo nome" : "Segundo nome"}
                  value={passengerSecondName}
                  onChange={handleInputChange}
                  className={`rounded-md border p-2 w-full ${
                    errors.secondName
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* CPF */}
                <InputMask
                ref={CPFRef}
                name="CPF"
                  type="text"
                  mask="999.999.999-99"
                  placeholder={errors.CPF ? "Coloque o seu CPF completo" : "Seu CPF"}
                  className={`rounded-md border p-2 w-full ${
                    errors.secondName
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
              </div>
              {/* COLUNA 2 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                {/* INPUT DATA */}
                <input
                  ref={birthdayRef}
                  type="date"
                  name="birthday"
                  placeholder={errors.birthday ? "Coloque sua data de nascimento" : "Data de nascimento"}
                  className={`rounded-md border p-2 w-full ${
                    errors.birthday
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"                    
                  }`}
                />
                {/* INPUT SEXO */}
                <select
                  ref={genderRef}
                  placeholder={errors.gender ? "Coloque o seu gênero" : "Gênero"}
                  name="sexo"
                  className={`rounded-md border p-2 w-full ${
                    errors.gender
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                >
                  <option value="0">Gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
                {/* INPUT PESSOA POLITICAMENTE EXPOSTA */}
                <select
                  ref={exposedPersonRef}
                  placeholder={errors.exposedPerson ? "" : "Pessoa politicamente exposta?"}
                  name="politica"
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                >
                  <option value="0">Pessoa políticamente exposta?</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
              {/* COLUNA 3 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                {/* INPUT CEP */}
                <input
                  ref={emailRef}
                  type="email"
                  placeholder={errors.email ? "Coloque um email válido" : "Seu email"}
                  name="email"
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* INPUT Telefone */}
                <InputMask
                  mask={"(99) 99999-9999"}                
                ref={emailRef}
                  type="text"
                  placeholder={errors.email ? "Coloque um telefone válido" : "Seu telefone"}
                  name="telefone"
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* INPUT NOME SOCIAL */}
                <input
                  ref={socialNameRef}
                  type="text"
                  placeholder={errors.socialName ? "Coloque um nome social válido" : "Seu nome social"}
                  name="social-name"
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
              </div>
              {/* COLUNA 4 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                {/* INPUT CEP */}
                <InputMask
                mask={"9999-999"}
                ref={zipCodeRef}
                  type="text"
                  placeholder={errors.zipCode ? "Coloque um CEP" : "Seu CEP"}
                  name="cep"
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* ENDEREÇO */}
                <input
                ref={addressRef}
                  type="text"
                  placeholder={errors.address ? "Coloque seu endereço" : "Seu endereço"}
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* NUMERO ENDEREÇO */}
                <input
                  ref={numberAddressRef}
                  type="text"
                  placeholder={errors.numberAddress ? "Seu número" : "Número"}
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
              </div>
              {/* COLUNA 5 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                {/* INPUT COMPLEMENTO */}
                <input
                  ref={completeAddressRef}
                  type="text"
                  placeholder={errors.completeAddress ? "" : "Complemento"}
                  name="complemento"
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* INPUT BAIRRO */}
                <input
                  ref={districtRef}
                  type="text"
                  placeholder={errors.district ? "Coloque um bairro válido" : "Seu bairro"}
                  name="bairro"
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* INPUT CIDADE*/}
                <input
                  ref={cityRef}
                  type="text"
                  placeholder={errors.city ? "Coloque um cidade válida" : "Sua cidade"}
                  name="cidade"
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
              </div>
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
          </>
        )}
      </div>

      {/* BOTÃO PLUS
      <div className="text-bluePrime font-bold flex flex-col items-center mt-7 text-md">
        <div>Adicionar Passageiro</div>
        <div className="mt-1">
          <CirclePlus/>
        </div>
      </div> */}

      <div className="bg-white shadow-md p-5 rounded-lg my-5">
        {isSaved ? (
          // Exibe a versão compactada quando salvo
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-[#313131]">
                {passengerFirstName || "Passageiro"} {/* Nome salvo */}
              </h2>
              <Chip
                className="bg-bluePrime items-center"
                size="lg"
                value="Passageiro Responsável"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-bluePrime px-4 py-2 text-white rounded-md"
            >
              Editar Passageiro
            </button>
          </div>
        ) : (
          // Exibe o formulário quando não está salvo
          <>
            {/* FORMULÁRIO */}

            <div className=" flex space-x-2 items-start text-start mb-4">
              <h2 className="text-xl text-[#313131] font-bold">
                Passageiro Responsável:
              </h2>
              <Chip
                className="bg-bluePrime items-center"
                size="lg"
                value="Idade entre 0 e 75 Anos"
              />
            </div>

            {/* FORMULÁRIO */}
            {/* COLUNAS */}
            <div>
              {/* COLUNA 1 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                <input
                ref={firstNameRef} //Atribuir o ref ao campo "Primeiro nome"
                name="firstName" // Adicione o atributo name
                  type="text"
                  placeholder={errors.firstName ? "Coloque somente o primeiro nome" : "Primeiro nome"}
                  value={passengerFirstName}
                  onChange={handleInputChange}
                  className={`rounded-md border p-2 w-full ${
                    errors.firstName
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* INPUT SEGUNDO NOME */}
                <input
                ref={secondNameRef}
                name="secondName"
                  type="text"
                  placeholder={errors.secondName ? "Coloque somente seu segundo nome" : "Segundo nome"}
                  value={passengerSecondName}
                  onChange={handleInputChange}
                  className={`rounded-md border p-2 w-full ${
                    errors.secondName
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
                {/* CPF */}
                <InputMask
                ref={CPFRef}
                name="CPF"
                  type="text"
                  mask="999.999.999-99"
                  placeholder={errors.CPF ? "Coloque o seu CPF completo" : "Seu CPF"}
                  className={`rounded-md border p-2 w-full ${
                    errors.secondName
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                />
              </div>
              {/* COLUNA 2 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                {/* INPUT DATA */}
                <input
                  ref={birthdayRef}
                  type="date"
                  name="birthday"
                  placeholder={errors.birthday ? "Coloque sua data de nascimento" : "Data de nascimento"}
                  className={`rounded-md border p-2 w-full ${
                    errors.birthday
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"                    
                  }`}
                />
                {/* INPUT SEXO */}
                <select
                  ref={genderRef}
                  placeholder={errors.gender ? "Coloque o seu gênero" : "Gênero"}
                  name="sexo"
                  className={`rounded-md border p-2 w-full ${
                    errors.gender
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                >
                  <option value="0">Gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
                {/* INPUT PESSOA POLITICAMENTE EXPOSTA */}
                <select
                  ref={exposedPersonRef}
                  placeholder={errors.exposedPerson ? "" : "Pessoa politicamente exposta?"}
                  name="politica"
                  className={`rounded-md border p-2 w-full ${
                    errors.exposedPerson
                    ? "border-red-500 placeholder:font-bold placeholder:text-red-500 focus:ring-red-500 ring-red-500"
                    : "border-bluePrime focus:ring-bluePrime ring-bluePrime"
                  }`}
                >
                  <option value="0">Pessoa políticamente exposta?</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Passengers;
