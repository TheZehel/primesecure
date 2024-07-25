//import { Input } from "antd";
import React, { useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";
import GoogleMaps from "./modules/map";
import axios from "axios";

import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";
const functions = new GlobalFuntions();

export default function StepAddres({
  updateFormData,
  formData,
  isValidCep,
  setValidCep,
  isValidAddress,
  isValidNumber,
  isValidNeighborhood,
  isValidCity,
  isValidState,
  //refreshCep,
  //refreshAddress,
  refreshNumber,
  //refreshNeighborhood,
  //refreshCity,
  //refreshState,
}) {
  const [location, setLocation] = useState({ 
    lat: -23.533773, 
    lng: -46.62529 
  });

  const inputNumberRef = useRef(null);

  // consulta VIACEP
  const fetchAddress = async (cep) => {
    //cep = cep.replace(/\D/g, "");
    const isValidCep = functions.validateCEP(cep);

    try {
      if (!isValidCep) {
        return;
      }

      var response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      var data = await response.json();

      //console.log(data);

      if (data.erro) {
        setValidCep(false);
      } else {
        setValidCep(true);

        if (inputNumberRef.current) {
          //Muda o foco para input "Número"
          inputNumberRef.current.focus();
        }

        let addressLine = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;

        let apiKey = "AIzaSyCfw_i1zJOfveuviiJxZJC7Jt7dAl73SVY";

        await axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              addressLine
            )}&key=${apiKey}`
          )
          .then((response) => {
            const geolocation = response.data.results[0].geometry.location;

            const { lat, lng } = geolocation;

            if (lat != location.lat || lng != location.lng) {
              setLocation({
                lat: geolocation.lat,
                lng: geolocation.lng,
              });
            }
          })
          .catch((error) => {
            console.error("Erro ao obter a localização:", error);
          });

        updateFormData({
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        });
      }
    } catch (error) {
      // Lide com erros de rede, etc.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value); // Adiciona para verificar os valores recebidos

    if (name === "cep") {
      if (formData.cep == value) {
        return;
      }

      const isValidCep = functions.validateCEP(value);

      setValidCep(isValidCep);
      fetchAddress(value);
    }

    updateFormData({ [name]: value });
  };

  //console.log(isValidCep);

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="  sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl  my-5 rounded-xl">
          {/*<div className="max-w-6xl ml-5 mr-5 mt-5 p-20 rounded-md">*/}
          <div className="w-full h-[200px] px-5 sm:h-[350px]">
            <GoogleMaps geolocation={location} />
          </div>
          <div className="bg-white rounded-b-lg max-w-6xl mx-5 mb-5 p-3 ">
            <div className="flex flex-col sm:flex-row m-auto">
              <InputMask
                name="cep"
                type="text"
                onChange={handleChange}
                className={`sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ${
                  isValidCep ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={isValidCep ? "CEP" : "CEP Inválido"}
                value={formData && formData.cep ? formData.cep : ""}
                mask="99999-999"
                maskChar={null}
                title="Preencha o seu Cep"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                  animation: isValidCep ? "none" : "bounce 0.5s ease",
                }}
              />
              <InputMask
                type="text"
                name="address"
                value={formData && formData.address ? formData.address : ""}
                onChange={handleChange}
                className={`sm:w-full max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime 
                ${isValidAddress ? "ring-bluePrime" : "ring-red-500"}
                border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder="Endereço"
                title="Digite o seu endereço aqui"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <input
                key={refreshNumber}
                name="number"
                value={formData.number || ""}
                onChange={handleChange}
                maxLength={8}
                type="text"
                ref={inputNumberRef}
                className={`sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ${
                  isValidNumber ? "ring-bluePrime" : "ring-red-500"
                } border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder={isValidNumber ? "Número" : "Número Inválido"}
                title="Específique o número"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                  animation: isValidNumber ? "none" : "bounce 0.5s ease",
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <InputMask
                type="text"
                name="complement"
                className={`sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime 
                ${isValidNeighborhood ? "ring-bluePrime" : "ring-red-500"}
                border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder="Complemento"
                title="Específique um complemento."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                name="neighborhood"
                value={
                  formData && formData.neighborhood
                    ? formData.neighborhood
                    : ""
                }
                onChange={handleChange}
                className={`sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime 
                ${isValidNeighborhood ? "ring-bluePrime" : "ring-red-500"}
                border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder="Bairro"
                title="Específique seu bairro."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                disabled
                type="text"
                name="city"
                value={formData && formData.city ? formData.city : ""}
                onChange={handleChange}
                className={`sm:w-[29.3%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime 
                ${isValidCity ? "ring-bluePrime" : "ring-red-500"}
                border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder="Cidade"
                title="Específique sua cidade."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                disabled
                type="text"
                name="state"
                value={formData && formData.state ? formData.state : ""}
                onChange={handleChange}
                className={`sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime 
                ${isValidState ? "ring-bluePrime" : "ring-red-500"}
                border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime`}
                placeholder="Estado"
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
