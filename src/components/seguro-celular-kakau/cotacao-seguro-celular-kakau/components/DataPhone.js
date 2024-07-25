import React, { useState, useEffect } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import InputMask from "react-input-mask";
import axios from "axios";
import GlobalFuntions from "../../../globalsubcomponentes/globalFunctions";
//import { Checkbox, Typography, select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import "animate.css";
//import ErrorList from "antd/es/form/ErrorList";
import DisplayMessage from "../components/subcomponents/DisplayMessage";

import ProgressManager from "./modules/progress";

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];
const progress = new ProgressManager();

export default function DataPhone({ updateForm, couponData }) {
  const navigate = useNavigate();
  useEffect(() => {
    // Assume-se que o índice da etapa atual é 1
    const currentStepIndex = 3;
    const lastCompletedStepIndex = parseInt(
      sessionStorage.getItem("lastCompletedStepIndex") || "2",
      10
    );

    // Se o índice da etapa atual for maior que o índice da última etapa completada + 1
    // Redireciona o usuário para a última etapa completada ou para a primeira etapa se nenhuma foi completada
    if (currentStepIndex > lastCompletedStepIndex + 1) {
      navigate("/seguro-celular-kakau/cotacao/endereco"); // Ou outra lógica de redirecionamento baseada no índice
    }
  }, [navigate]);

  useEffect(() => {
    const loadFormData = () => {
      const savedFormData = sessionStorage.getItem("phoneFormData");
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
  const [alertMessages, setAlertMessages] = useState([]);
  const [userData, setUserData] = useState(() => {
    // Tenta recuperar 'formData' do sessionStorage
    const savedFormData = sessionStorage.getItem("phoneFormData");
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

  console.log("SavedDataCelular", userData);
  console.log("formDta Stagio DataCelular:", userData);

  const functions = new GlobalFuntions();

  var alertTimeout = null;

  const inputHandler = (e) => {
    var value = e.target.value;
    var name = e.target.name;

    if ((name == "celNumber" || name == "celNumberConfirmation") && errorList.includes("diffNumbers")) {
      var errors = [...errorList].filter((item) => item !== "diffNumbers");
      setErrorList(errors);

      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));

      return;
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorListTemp = [];
    //verificar se o numero do celular é valido

    let celNumber = userData.celNumber || '';
    celNumber = celNumber.replace(/\D/g, '');

    if (!/^[0-9]{11}$/.test(celNumber)) errorListTemp.push("phone");

    if (!/^[0-9]{15}$/.test(userData?.imei)) errorListTemp.push("imei");

    console.log(userData.imei, userData.celNumber)

    //verifica o serial number
    //if (!functions.validateSerialNumberBike(userData.imei)) {
    //  errorListTemp.push("imei");
    //}

    var formData = {};
    formData = sessionStorage.getItem("phoneFormData");

    try { formData = JSON.parse(formData); } catch (e) { formData = {}; }

    var {
      modeloSelecionado = {}
    } = formData;

    var {
      id: model_id = ""
    } = modeloSelecionado;

    console.log(formData);

    if (!/^[0-9]{1,11}$/.test(model_id)) errorListTemp.push("model_id");

    let now = new Date();
    let invoice_data = null;

    if (/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(userData?.nf)) {
      invoice_data = functions.refactoryDate(userData.nf, 'DD/MM/YYYY', 'YYYY-MM-DD');
      invoice_data = new Date(invoice_data);

      if (!invoice_data || !invoice_data.getTime()) errorListTemp.push("nf");
      if (!errorListTemp.includes('nf') && invoice_data.getTime() > now.getTime()) errorListTemp.push("nf");
    } else {
      errorListTemp.push("nf");
    }

    console.log('ErrorList:', errorListTemp)

    console.log('USER DATA:', userData);

    if (errorListTemp.length > 0) {
      await progress.updateDegubLogData(userData, 4, errorListTemp);
      setErrorList([...errorList, ...errorListTemp]);
      return;
    }

    if (userData.celNumber !== userData.celNumberConfirmation && !errorListTemp.includes("diffNumbers")) {
      setError("Os números não são iguais");
      errorListTemp.push("diffNumbers");
    };

    await axios.post(`${apiUrl}/kakau-phone/checkout/validate-imei`, {imei: userData?.imei, model_id})
      .then((response) => {
        var { data } = response;

        console.log('Imei Validation:', data);
      })
      .catch((err)=>{
        let error = err;

        if (error && error.response) error = error.response;
        if (error && error.data) error = error.data;

        var { errorList = [] } = error;

        if (Array.isArray(errorList) && errorList.length > 0) {
          clearTimeout(alertTimeout);
          
          alertTimeout = setTimeout(() => {
            setAlertMessages([]);
          }, 8000);

          errorListTemp = [ ...errorListTemp, 'imei' ];

          setAlertMessages([ ...errorList ]);
        }

        if (error.errorList) errorListTemp = [ ...errorListTemp, ...error.errorList ];
      });

    //valida se os numero de celNumber e celNumberConfirmation são iguais, apaga o numero errado preenchido e informa no placeholder "os numeros não são iguais"
    //const sameNumber = () => {
    //  if (userData.celNumber !== userData.celNumberConfirmation) {
    //    setError("Os números não são iguais");
    //    errorListTemp.push("diffNumbers");
    //  };
    //};    

    // Atualizar o estado de errorList com a nova lista de erros
    setErrorList(errorListTemp);

    // Verificar se não há erros antes de prosseguir
    if (errorListTemp.length === 0) {
      clearTimeout(alertTimeout);
      setAlertMessages([]);

      const currentData = JSON.parse(sessionStorage.getItem("phoneFormData")) || {};
      const updateData = {
        ...currentData,
        dataPhone: userData,
      };

      // Atualiza o progresso do usuário no processo
      const currentStepIndex = 3; // Esta é a segunda etapa, então o índice é 1
      sessionStorage.setItem(
        "lastCompletedStepIndex",
        currentStepIndex.toString()
      );

      sessionStorage.setItem("phoneFormData", JSON.stringify(updateData));
      await progress.updateDegubLogData(userData, 4, false);

      // Em seguida, envia um evento para o DataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "dados-celular-kakau-adicionados",
        // Aqui você pode adicionar mais propriedades ao evento, se necessário
      });
      
      progress.navigateTo(4, "/seguro-celular-kakau/cotacao/pagamento", navigate);
      // Navegar para a próxima página se não houver erros
      //navigate("/seguro-celular-kakau/cotacao/pagamento");
    } else {
      // Tratar os erros aqui, por exemplo, exibindo-os ao usuário
      await progress.updateDegubLogData(userData, 4, errorListTemp);
      console.log("Erros encontrados:", errorListTemp);
    }
  };

  const navigateToAddress = async () => {
    //Envia um evento para o DataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "voltar-dados-endereco-celular-kakau",
      // Aqui pode adicionar mais propriedades ao evento, se necessário
    });
    await progress.navigateTo(3, "/seguro-celular-kakau/cotacao/endereco", navigate);
    //navigate("/seguro-celular-kakau/cotacao/endereco");
  };

  return (
    <div className=" mx-2 relative">
      <DisplayMessage alert="error" messages={[...alertMessages]} />
      <LayoutCotacaoPlanos title="Informações do Celular" position={3} couponData={couponData} />
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
                  (errorList.includes("celNumber") || errorList.includes("diffNumbers"))
                    ? "border-red-500 animate__animated animate__bounce w-full rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime "
                }`}
                placeholder="Numero do Celular"
                value={userData.celNumber || ''}
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
                value={userData.nf || ''}
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
                  (errorList.includes("celNumberConfirmation") || errorList.includes("diffNumbers"))
                    ? "border-[1px] border-red-500 animate__animated animate__bounce w-full rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime "
                }`}
                placeholder="Confirme o Número do Celular"
                value={userData.celNumberConfirmation || ''}
                onChange={inputHandler}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              <InputMask
                type="imei"
                className={`inputClass ${
                  errorList.includes("imei")
                    ? "border-[1px] border-red-500 animate__animated animate__bounce w-full mt-4 rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                }`}
                placeholder="IMEI do Celular"
                mask="999999999999999"
                onChange={inputHandler}
                value={userData.imei || ''}
                name="imei"
                maskChar={null}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
            </div>

            <div className="w-full px-2 m-auto max-w-6xl mt-3 rounded-xl grid gap-2 grid-cols-1">
              <button
                onClick={()=>{
                  navigateToAddress();
                }}
                type="submit"
                className="h-14 rounded-md shadow flex items-center justify-center cursor-pointer mt-4 font-bold border border-bluePrime py-2 order-2 sm:order-1 block sm:hidden"
              >
                Voltar para endereço do comprador
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="h-14 w-full bg-cyan-500 hover:bg-bluePrime2 rounded-md shadow text-white flex items-center justify-center cursor-pointer mt-4 font-bold order-1 sm:order-2"
              >
                Prosseguir
              </button>
            </div>
          </form>
        </div>
      </section>
      <div className={`w-full mx-auto left-0 right-0 max-w-screen-lg absolute top-0 flex hidden sm:block`}>
        <button
          onClick={()=>{
            navigateToAddress();
          }}
          className="mt-4 flex px-8 my-auto top-0 h-[45px] justify-center items-center py-4 bg-gray-400 opacity-80 rounded-md cursor-pointer border-none font-bold text-lg leading-7 transition-all duration-300 hover:brightness-110 text-white"
        >
          Voltar
        </button>        
      </div>
    </div>
  );
}
