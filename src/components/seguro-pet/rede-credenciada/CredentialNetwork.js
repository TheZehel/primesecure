import React from "react";
import { useState, useEffect } from "react";

//components
import CardsOverflow from "./CardsOverflow";
import ModalPetCoveredCities from "./modalPetCoveredCities";
import Maps from "./Maps";

export default function CredentialNetwork() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [coverageData, setCoverageData] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isSpecificPositionSelected, setIsSpecificPositionSelected] =
    useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectecRegionName, setSelectedRegionName] = useState("");

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    } else {
      console.error("Geolocation não suportada pelo navegador.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const onSelectPosition = (position) => {
    if (position && position.lat != null && position.lng != null) {
      setSelectedPosition(position);
      setIsSpecificPositionSelected(true);
      console.log(
        "onSelectPosition - selected position set to:",
        position,
        "isSpecificPositionSelected set to true"
      );
    } else {
      setIsSpecificPositionSelected(false);
      console.log("onSelectPosition - Invalid position:", position);
    }
  };

  console.log(
    " (CredentialNetwork.js) local específico selecionado useEffect: ",
    isSpecificPositionSelected
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFetchCoverage = (data, regionName) => {
    setCoverageData(data);
    setSelectedRegionName(regionName);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Coluna da Esquerda */}
      <div className="flex flex-col w-full md:w-1/2 p-4">
        {/* Barra de Pesquisa 
        <div className="flex items-center p-4 bg-white border-b border-gray-200 shadow-xl rounded-xl mb-5 hidden">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Filtre por categorias, clínicas ou procedimentos"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-bluePrime"
            />
          </div>
          <button className="flex items-center justify-center px-4 bg-bluePrime text-white rounded-tr-lg rounded-lg hover:bg-bluePrime ml-2 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
            >
              <path d="M4.141 8.664a8.177 8.177 0 1115.167 6.12A8.177 8.177 0 014.14 8.665zM9.015 5.35a6.928 6.928 0 105.42 12.751A6.928 6.928 0 009.014 5.35z"></path>
              <path d="M16.622 16.622a.625.625 0 01.884 0l5.858 5.859a.625.625 0 01-.884.884l-5.858-5.859a.625.625 0 010-.884z"></path>
            </svg>
            <span className="ml-2">Buscar</span>
          </button>
        </div>*/}
        <div className="flex mb-3 justify-between">
          <button className="mt-0 ml-5" onClick={openModal}>
            <p className="hover:underline hover:decoration-sky-500">
              Alterar Rede Credenciada:{" "}
              <span className="font-bold text-bluePrime">
                {selectecRegionName || ""}
              </span>
            </p>
          </button>
          {/*<button>
            <p onClick={getUserLocation}>Ordenar por minha localização</p>
  </button>*/}
        </div>
        {/* Cards */}
        <div className="overflow-auto h-[650px] sm:h-[465px]">
          <CardsOverflow
            coverageData={coverageData}
            onSelectPosition={setSelectedPosition}
          />
        </div>
      </div>

      {/* Coluna da Direita */}
      <div className="hidden md:block md:w-1/2 p-4 ">
        <Maps
          coverageData={coverageData}
          selectedPosition={selectedPosition}
          isSpecificPositionSelected={isSpecificPositionSelected}
          userLocation={userLocation}
        />
      </div>
      <ModalPetCoveredCities
        isOpen={isModalOpen}
        onClose={closeModal}
        onFetchCoverage={handleFetchCoverage}
      />
    </div>
  );
}
