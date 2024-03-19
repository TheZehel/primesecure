import React, { useState, useEffect } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import InputMask from "react-input-mask";
//import axios from "axios";
import GlobalFuntions from "../../../globalsubcomponentes/globalFunctions";
//import { Checkbox, Typography, select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import "animate.css";
//import ErrorList from "antd/es/form/ErrorList";

export default function DataPhone({ updateForm }) {
  useEffect(() => {
    const loadFormData = () => {
      const savedFormData = sessionStorage.getItem("formData");
      if (savedFormData) {
        const formData = JSON.parse(savedFormData);

        const { celNumber, celNumberConfirmation, nf, imei } =
          formData.dataPhone || {};
        setUserData({
          celNumber,
          celNumberConfirmation,
          nf,
          imei,
        });
      }
    };

    loadFormData();
  }, []);

  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(() => {
    // Tenta recuperar 'formData' do sessionStorage
    const savedFormData = sessionStorage.getItem("formData");
    let initialUserData = {
      celNumber: "",
      celNumberConfirmation: "",
      nf: "",
      imei: "",
    };

    // Puxas as infos do localstorage
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      const { marca, title, precoPhone, serieNumber } =
        formData.selectedPlan || {};

      initialUserData = {
        ...initialUserData,
        model: marca || initialUserData.model,
        value: title || initialUserData.value,
        precoPhone: precoPhone || initialUserData.precoPhone,
      };
    }
    console.log("initialUserData:", initialUserData);

    return initialUserData;
  });

  console.log("SavedDataBike", userData);
  console.log("formDta Stagio DataBike:", userData);

  const navigate = useNavigate();

  const functions = new GlobalFuntions();

  const inputHandler = (e) => {
    var value = e.target.value;
    var name = e.target.name;

    if (errorList.includes(name)) {
      var errors = [...errorList].filter((item) => item !== name);
      //console.log(errors);
      setErrorList(errors);
    }

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorListTemp = [];

    //verifica o serial number
    if (!functions.validateSerialNumberBike(userData.imei)) {
      errorListTemp.push("imei");
    }
    //verificar se o numero do celular é valido
    if (!functions.validatePhone(userData.celNumber)) {
      errorListTemp.push("celNumber");
    }

    //valida se os numero de celNumber e celNumberConfirmation são iguais, apaga o numero errado preenchido e informa no placeholder "os numeros não são iguais"
    const sameNumber = () => {
      if (userData.celNumber !== userData.celNumberConfirmation) {
        setError("Os números não são iguais");
      }
    };

    // Atualizar o estado de errorList com a nova lista de erros
    setErrorList(errorListTemp);

    // Verificar se não há erros antes de prosseguir
    if (errorListTemp.length === 0) {
      const currentData = JSON.parse(sessionStorage.getItem("formData")) || {};
      const updateData = {
        ...currentData,
        dataPhone: userData,
      };

      sessionStorage.setItem("formData", JSON.stringify(updateData));

      // Navegar para a próxima página se não houver erros
      navigate("/seguro-celular-kakau/cotacao/pagamento");
    } else {
      // Tratar os erros aqui, por exemplo, exibindo-os ao usuário
      console.log("Erros encontrados:", errorListTemp);
    }
  };

  return (
    <div className=" mx-2">
      <LayoutCotacaoPlanos title="Informações do Celular" position={3} />
      <section className="mt-3 sm:mt-5 flex justify-center w-full animate__animated animate__fadeInRight">
        <div className="w-full sm:max-w-[1025px]">
          <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <InputMask
                name="celNumber"
                type="text"
                mask="(99) 9.9999-9999"
                maskChar={null}
                className={`celNumber ${
                  errorList.includes("celNumber")
                    ? "border-red-500 animate__animated animate__bounce w-full rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime "
                }`}
                placeholder="Numero do Celular"
                value={userData.celNumber}
                onChange={inputHandler}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              <InputMask
                type="text"
                className={`inputClass ${
                  errorList.includes("nf")
                    ? "border-red-500 animate__animated animate__bounce w-full mt-4 rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                }`}
                placeholder="Data Emissão Nota Fiscal"
                maxLength="20"
                onChange={inputHandler}
                value={userData.nf}
                name="nf"
                mask="99/99/9999"
                title="Insira sua data de nascimento"
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
            </div>
            {/* Cpf, RG, Telefone */}
            <div className="w-full md:w-1/2 px-2 mb-4">
              <InputMask
                name="celNumberConfirmation"
                type="text"
                mask="(99) 9.9999-9999"
                maskChar={null}
                className={`celNumberConfirmation ${
                  errorList.includes("celNumberConfirmation")
                    ? "border-red-500 animate__animated animate__bounce w-full rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime "
                }`}
                placeholder="Confirme o Número do Celular"
                value={userData.celNumberConfirmation}
                onChange={inputHandler}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              <InputMask
                type="imei"
                className={`inputClass ${
                  errorList.includes("imei")
                    ? "border-red-500 animate__animated animate__bounce w-full mt-4 rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                }`}
                placeholder="IMEI / N Série"
                mask="999999999999999999999"
                onChange={inputHandler}
                value={userData.imei}
                name="imei"
                maskChar={null}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
            </div>

            <div className="w-full px-2">
              <button
                onClick={handleSubmit}
                type="submit"
                className="h-14 w-full bg-cyan-500 hover:bg-bluePrime2 rounded-md shadow text-white flex items-center justify-center cursor-pointer mt-4 font-bold"
              >
                Prosseguir
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
