import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
//import { regions } from "./modules/regionsCredenciadas";
import "swiper/css";

import FormTravelBanner from "../FormTravelBanner";

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
    ></Modal>
  );
}

function PetModalContent({ closeModal, sendForm, lastStep, required }) {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {}, [formStep]);

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
        <FormTravelBanner />
      </div>
      <div></div>
    </div>
  );
}
