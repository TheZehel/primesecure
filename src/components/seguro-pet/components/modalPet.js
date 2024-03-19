import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "../../../assets/svg/searchIcon.svg";
import { useNavigate } from "react-router-dom";
//import { regions } from "./modules/regionsCredenciadas";
import "swiper/css";
import SimpleFormSectionPopup from "../../globalsubcomponentes/SimpleFormSectionPopup";

import axios from "axios";

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

console.log("apiUrl:", apiUrl);

export default function ModalPet({
  openModal,
  closeModal,
  sendForm,
  lastStep,
  required,
}) {
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openModal]);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      appElement={document.body}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
      }}
      className="fixed inset-0 flex items-center justify-center p-6 bg-gray-800 bg-opacity-50"
    >
      <PetModalContent
        closeModal={closeModal}
        lastStep={lastStep}
        sendForm={sendForm}
        required={required}
      />
    </Modal>
  );
}

function PetModalContent({ closeModal, sendForm, lastStep, required }) {
  const navigate = useNavigate();
  const [regionList, setRegionList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedRegionIbge, setSelectedRegionIbge] = useState(null);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const getRegions = async () => {
    try {
      console.log("apiUrl:", apiUrl);

      await axios
        .get(`${apiUrl}/petlove/plans/covered-cities`)
        .then((response) => {
          var res = response.data;

          if (Array.isArray(res.data)) {
            setRegionList(res.data);
          }
        })
        .catch((error) => {
          console.log("Não foi possível recuperar regiões:", error);
        });
    } catch (error) {
      console.log("Não foi possível recuperar regiões:", error);
    }
  };

  useEffect(() => {
    getRegions();
  }, []);

  useEffect(() => {}, [formStep]);

  const filteredRegions = regionList.filter((region) =>
    region.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (region, ibge) => {
    var sessionData = sessionStorage.getItem("formPetData");
    //console.log(ibge)
    try {
      sessionData = JSON.parse(sessionData);
    } catch (e) {
      sessionData = {};
    }

    console.log("sessionData:", sessionData);

    if (sessionData === null || !sessionData) {
      sessionData = {};
    }

    let petRegion = sessionData.petRegion;
    let petList = sessionData.petList;

    if (petRegion) {
      // eslint-disable-next-line eqeqeq
      if (petRegion.ibge != ibge || petRegion.region != region) {
        petRegion = {
          ibge: ibge,
          region: region,
        };

        petList = [];
      }
    } else {
      petRegion = {
        ibge: ibge,
        region: region,
      };

      petList = [];
    }

    sessionData.petRegion = petRegion;
    sessionData.petList = petList;

    sessionStorage.setItem("formPetData", JSON.stringify(sessionData));

    setSelectedRegionIbge(ibge);

    setSelectedRegion(region);
  };

  const handleConfirm = (data) => {
    // eslint-disable-next-line eqeqeq
    if (data == -1) {
      setFormStep(0);
      closeModal();
      return;
    }

    // eslint-disable-next-line eqeqeq
    if (formStep == 3) {
      console.log("Sem região");
      navigate("/obrigado");
      return;
    }

    if (selectedRegion && formStep < 1) {
      // eslint-disable-next-line eqeqeq
      if (lastStep == 1) {
        let form = {
          region: selectedRegion,
          ibge: selectedRegionIbge,
        };

        sendForm(form);

        closeModal();

        return;
      }

      setFormStep(1);
      return;
    }

    if (selectedRegion) {
      let form = {
        region: selectedRegion,
        ibge: selectedRegionIbge,
        ...data,
      };

      delete form.utm_campaign;
      delete form.utm_medium;
      delete form.utm_source;

      setFormData(form);

      // eslint-disable-next-line eqeqeq
      if (required == true) {
        form.ibge = selectedRegionIbge;
      }

      sendForm(form);

      closeModal();

      return;
    }
  };

  //console.log(formStep);
  if (formStep > 0) {
    return (
      <div className="animate__animated animate__fadeIn bg-white rounded-lg shadow py-1 px-0 border border-gray-300 overflow-hidden order-1 w-fit relative md:py-5 lg:py-10">
        <div className="pt-4 m-auto">
          <SimpleFormSectionPopup
            formData={formData}
            setFormData={(data) => setFormData({ formData, ...data })}
            form={handleConfirm}
          />
        </div>
        <div className="flex justify-between items-center p-3 absolute top-0 left-0">
          <button onClick={() => handleConfirm(-1)} className="bg-transparent">
            <FontAwesomeIcon
              icon={faTimes}
              className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer"
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="animate__animated animate__fadeIn bg-white rounded-lg shadow px-2 py-4 my-10 mx-auto h-100 border border-gray-300 overflow-hidden order-1 w-11/12 md:w-2/3 lg:w-2/4"
      style={{ height: "85vh", maxHeight: "560px" }}
    >
      <div
        className={`flex justify-between items-center p-3 ${
          // eslint-disable-next-line eqeqeq
          required == true ? "hidden" : ""
        }`}
      >
        <button onClick={() => handleConfirm(-1)} className="bg-transparent">
          <FontAwesomeIcon
            icon={faTimes}
            className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer"
          />
        </button>
      </div>
      <div>
        <div className="bg-white rounded-lg h-32 w-4/4 sm:w-3/4 p-5 mx-auto">
          <header className="flex justify-between items-center">
            <p className="text-2xl font-semibold">Selecione sua região</p>
          </header>
          <div
            className="mt-4 hover:text-bluePrime relative "
            style={{ maxHeight: "260px" }}
          >
            <div className="flex items-center">
              <input
                id="region_search"
                type="search"
                placeholder="Digite para filtrar regiões"
                className="px-3 py-2  my-2 mx-1 pr-10 border rounded-full w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img
                src={SearchIcon}
                alt="Icones Buscar"
                className="absolute right-4 top-2/2 transform -translate-y-2/2 h-5 w-5"
              />
            </div>

            <ul
              className="mt-1 overflow-y-scroll hover:text-bluePrime"
              style={{ maxHeight: "200px" }}
            >
              {filteredRegions.map((region, index) => (
                <li key={index} className="py-2">
                  <button
                    className={`text-gray-800 cursor-pointer ${
                      region.nome === selectedRegion
                        ? "bg-bluePrime px-2 py-1 rounded-lg text-white"
                        : "hover:text-bluePrime"
                    }`}
                    onClick={() => handleClick(region.nome, region.ibge)}
                  >
                    {region.nome}
                  </button>
                </li>
              ))}
              <li className="py-2">
                <button
                  onClick={() => {
                    /*navigate("/obrigado")*/ setFormStep(3);
                  }}
                  className="text-bluePrime hover:text-bluePrime2 underline font-semibold"
                >
                  Não encontrei minha região
                </button>
              </li>
              {/* Adicione mais itens aqui */}
            </ul>
          </div>
          <footer className="mt-4 flex justify-end">
            <button
              onClick={handleConfirm}
              className="w-full h-14 bg-bluePrime hover:bg-bluePrime2 text-white px-4 py-2 rounded"
            >
              Confirmar
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
