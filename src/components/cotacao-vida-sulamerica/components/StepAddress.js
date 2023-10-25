import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";

export default function StepAddres({ updateFormData }) {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // consulta VIACEP
  const fetchAddress = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setAddress(data.logradouro);
      setNeighborhood(data.bairro);
      setCity(data.localidade);
      setState(data.uf);
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  // atualiza o formData com os dados do endereço
  useEffect(() => {
    updateFormData({
      cep,
      address,
      neighborhood,
      city,
      state,
    });
  }, [cep, address, neighborhood, city, state, updateFormData]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="  sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl  my-5 rounded-xl">
          <div className="bg-red-500 max-w-6xl ml-5 mr-5 mt-5 p-20 rounded-md">
            Google Maps Here
          </div>
          <div className="bg-white rounded-b-lg max-w-6xl mx-5 mb-5 p-3">
            <div className="flex flex-col sm:flex-row m-auto">
              <InputMask
                type="text"
                value={cep}
                onChange={(e) => {
                  const newCep = e.target.value;
                  setCep(newCep);
                  if (newCep.length === 9) {
                    // Comprimento do CEP com o '-' incluso
                    fetchAddress(newCep);
                  }
                }}
                className="sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="CEP"
                maxLength="25"
                mask="99999-999"
                title="Preencha o seu Cep"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="sm:w-full max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Endereço"
                maxLength="100"
                title="Digite o seu endereço aqui"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                className="sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Numero"
                maxLength="8"
                title="Específique o número"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <InputMask
                type="text"
                className="sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Complemento"
                maxLength="140"
                title="Específique um complemento."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Bairro"
                maxLength="60"
                title="Específique seu bairro."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="sm:w-[29.3%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Cidade"
                maxLength="60"
                title="Específique sua cidade."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Estado"
                maxLength="60"
                title="Específique sua cidade."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/*
      <div className=" m-auto max-w-6xl rounded-xl grid sm:grid-cols-2 grid-cols-1">
        <button className="border border-bluePrime p-2 mr-2 rounded-lg font-bold">
          Voltar para planos
        </button>
        <button className="bg-bluePrime p-2 ml-2 rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300">
          Avançar
        </button>
              </div>*/}
    </div>
  );
}
