import { Chip } from "@material-tailwind/react";
import React, { useState } from "react";
import {CirclePlus} from "lucide-react"

const Passengers = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [passengerName, setPassengerName] = useState("");

  const handleSave = () => {
    // Atualiza o estado para "salvo"
    setIsSaved(true);
  };

  const handleEdit = () => {
    // Atualiza o estado para "editar"
    setIsSaved(false);
  };

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
                {passengerName || "Passageiro"} {/* Nome salvo */}
              </h2>
              <Chip
                className="bg-bluePrime items-center"
                size="lg"
                value="Passageiro Responsável"
              />
            </div>
            <button
              onClick={handleEdit}
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
                  type="text"
                  placeholder="Primeiro Nome"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* INPUT SEGUNDO NOME */}
                <input
                  type="text"
                  placeholder="Segundo Nome"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* CPF */}
                <input
                  type="text"
                  placeholder="CPF"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
              </div>
              {/* COLUNA 2 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                {/* INPUT DATA */}
                <input
                  type="date"
                  name="date"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* INPUT SEXO */}
                <select
                  name="sexo"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset cursor-pointer"
                >
                  <option value="0">Gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
                {/* INPUT PESSOA POLITICAMENTE EXPOSTA */}
                <select
                  name="politica"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset cursor-pointer"
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
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* INPUT Telefone */}
                <input
                  type="text"
                  placeholder="Telefone"
                  name="telefone"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* INPUT NOME SOCIAL */}
                <input
                  type="text"
                  placeholder="Nome Social"
                  name="social-name"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
              </div>
              {/* COLUNA 4 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                {/* INPUT EMAIL */}
                <input
                  type="text"
                  placeholder="Cep"
                  name="cep"
                  className="rounded-md border border-bluePrime w-full sm:w-[32.5%] p-2 focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* ENDEREÇO */}
                <input
                  type="text"
                  placeholder="Endereço"
                  className="rounded-md border border-bluePrime w-full sm:w-[50%] p-2 focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* NUMERO ENDEREÇO */}
                <input
                  type="text"
                  placeholder="Número"
                  className="rounded-md border border-bluePrime w-full sm:w-[14.5%] p-2 focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
              </div>
              {/* COLUNA 5 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                {/* INPUT COMPLEMENTO */}
                <input
                  type="text"
                  placeholder="Complemento"
                  name="complemento"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* INPUT BAIRRO */}
                <input
                  type="text"
                  placeholder="Bairro"
                  name="bairro"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* INPUT CIDADE*/}
                <input
                  type="text"
                  placeholder="Cidade"
                  name="cidade"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
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
                {passengerName || "Passageiro"} {/* Nome salvo */}
              </h2>
              <Chip
                className="bg-bluePrime items-center"
                size="lg"
                value="Passageiro Responsável"
              />
            </div>
            <button
              onClick={handleEdit}
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
                  type="text"
                  placeholder="Primeiro Nome"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* INPUT SEGUNDO NOME */}
                <input
                  type="text"
                  placeholder="Segundo Nome"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* CPF */}
                <input
                  type="text"
                  placeholder="CPF"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
              </div>
              {/* COLUNA 2 */}
              <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0 mt-2">
                {/* INPUT DATA */}
                <input
                  type="date"
                  name="date"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset"
                />
                {/* INPUT SEXO */}
                <select
                  name="sexo"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset cursor-pointer"
                >
                  <option value="0">Gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
                {/* INPUT PESSOA POLITICAMENTE EXPOSTA */}
                <select
                  name="politica"
                  className="rounded-md border border-bluePrime p-2 w-full focus:ring-bluePrime ring-bluePrime focus:ring-1 focus:ring-inset cursor-pointer"
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
