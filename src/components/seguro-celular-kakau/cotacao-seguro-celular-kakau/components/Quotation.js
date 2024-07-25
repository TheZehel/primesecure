import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import "animate.css";
import axios from "axios";
import LoadingAnimation from "./subcomponents/loadingSvg2";

import ProgressManager from "./modules/progress";
const progress = new ProgressManager();

export default function Quotation() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const protections = [
    { id: 1, title: "Quebra acidental", isUnlimited: true },
    { id: 2, title: "Imersão em líquidos", isUnlimited: true },
    { id: 3, title: "Danos elétricos", isUnlimited: true },  
    { id: 5, title: "Furto qualificado", isUnlimited: true },
    { id: 6, title: "Roubo", isUnlimited: true },
    //{ id: 4, title: "Sem carência", isUnlimited: true },
    { id: 7, title: "100% online", isUnlimited: true },
    //{ id: 6, title: "Sem multa", isUnlimited: true },
    //{ id: 7, title: "Assistência 24h", isUnlimited: true },
  ];

  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState(null);

  const [precoSelecionado, setPrecoSelecionado] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedPlanCode, setSelectedPlanCode] = useState(null);

  const [showAlert, setShowAlert] = useState(false);

  const [modelos, setModelos] = useState([]);
  const [modeloSelecionado, setModeloSelecionado] = useState(null);

  const [planos, setPlanos] = useState([]);

  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [infoModal, showInfoModal] = useState(false);

  console.log('Button:', selectedButton);

  const environment = process.env.REACT_APP_ENVIRONMENT;

  const plansProtection = {
    "karfqa": [1, 2, 3, 4, 5, 6, 7], //"Roubo e Quebra Acidental"
    "karf": [5, 6, 7], //"Roubo ou Furto Qualificado"
    "kaqa": [1, 2, 3, 7]//"Quebra Acidental"
  };

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        var url = "http://localhost:3050/kakau-phone/checkout/get-brands";

        if (environment != "SANDBOX") url = "https://api-primesecure.onrender.com/kakau-phone/checkout/get-brands";

        var response = await axios.get(url);

        if (!Array.isArray(response?.data)) response = { data: [] };

        const marcasData = response.data.map((marca) => ({
          value: marca.id,
          label: marca.name,
        }));

        setMarcas(marcasData);
      } catch (error) {
        console.error("Erro ao buscar marcas: ", error);
      }
    };

    fetchMarcas();
  }, []);

  useEffect(() => {
    var formData = sessionStorage.getItem("phoneFormData");

    try {
      formData = JSON.parse(formData) || {};
    } catch (e) {
      formData = {};
    }

    console.log('FORM DATA:', formData)

    var {
      modeloSelecionado = {}
    } = formData;

    var {
      brand = {}
    } = modeloSelecionado;

    var {
      id,
      name
    } = brand;

    if (/^[0-9]{1,5}$/.test(id) && typeof name === "string" && name.length > 2) {
      setMarcaSelecionada({
        value: id,
        label: name
      });
    }
  }, [marcas]);

  useEffect(()=>{
    if (marcaSelecionada && /^[0-9]{1,5}$/.test(marcaSelecionada?.value)){
      const fetchModelos = async () => {
        try {
          var url = `http://localhost:3050/kakau-phone/checkout/get-models/${marcaSelecionada.value}`;
          
          if (environment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-phone/checkout/get-models/${marcaSelecionada.value}`;

          var response = await axios.get(url);

          if (!Array.isArray(response?.data)) response = { data: [] };

          console.log('Modelos:', response.data);

          const modelosData = response.data.map((modelo) => ({
            value: modelo.id,
            label: modelo.name,
            additionalData: {
              device_value: modelo.device_value,           
              identifiers: modelo.identifiers,
              manufacturer_name: modelo.manufacturer_name,
              storage: modelo.storage,
              brand: modelo.brand,
            },
          }));

          setModelos(modelosData);
        } catch (error) {
          console.error("Erro ao buscar modelos: ", error);
        }
      };

      fetchModelos();
    }
  }, [marcaSelecionada]);

  useEffect(() => {
    var formData = sessionStorage.getItem("phoneFormData");

    try {
      formData = JSON.parse(formData) || {};
    } catch (e) {
      formData = {};
    }

    console.log('FORM DATA:', formData)

    var {
      modeloSelecionado = {}
    } = formData;

    var {
      id = 0,
      name = ''
    } = modeloSelecionado;

    delete modeloSelecionado.id;
    delete modeloSelecionado.name;

    console.log('Modelo:', id, name);

    if (/^[0-9]{1,11}$/.test(id) && typeof name === "string" && name.length > 2) {
      setModeloSelecionado({
        additionalData: { ...modeloSelecionado },
        value: id,
        label: name
      });
    }
  }, [modelos]);

  useEffect(() => {
    //if (!marcaSelecionada ) return;
    if (modeloSelecionado && /^[0-9]{1,11}$/.test(modeloSelecionado?.value)) {
      setIsLoading(true);

      const fetchPlanos = async () => {
        try {
          var url = `http://localhost:3050/kakau-phone/checkout/get-products/${modeloSelecionado.value}`;
          
          if (environment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-phone/checkout/get-products/${modeloSelecionado.value}`;

          var response = await axios.get(url);

          if (!Array.isArray(response?.data)) response = { data: [] };

          console.log('Planos:', response.data);

          setPlanos(response.data);
        } catch (error) {
          console.error("Erro ao buscar planos para o modelo: ", error);
        } finally {
          setTimeout(() => {
            setIsLoading(false); // Desativa o loading após finalizar a busca
          }, 3000); // 3000 milissegundos = 3 segundos
        }
      };

      fetchPlanos();
    }
  }, [modeloSelecionado]);

  useEffect(() => {
    const fetchPlanos = async () => {
      if (!marcaSelecionada || !/^[0-9]{1,4}$/.test(marcaSelecionada?.value)) return;
      if (!modeloSelecionado || !/^[0-9]{1,4}$/.test(modeloSelecionado?.value)) return;

      setIsLoading(true); // Ativa o loading antes de começar a busca

      try {
        var url = `http://localhost:3050/kakau-phone/checkout/get-products/${modeloSelecionado.value}`;
          
        if (environment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-phone/checkout/get-products/${modeloSelecionado.value}`;

        await axios.get(url)
          .then((response) => {
            let { data = [] } = response;

            console.log("Planos Data", data)

            setPlanos(data);
          })
          .catch((error) => {
            console.error("Erro ao buscar planos: ", error);
          });        
      } catch (error) {
        console.error("Erro ao buscar planos: ", error);
      } finally {
        showInfoModal(false); 
        setModalText("");
        setModalTitle("");

        setTimeout(() => {
          setIsLoading(false); // Desativa o loading após finalizar a busca
        }, 3000); // 3000 milissegundos = 3 segundos
      }
    };

    fetchPlanos();
  }, [marcaSelecionada, modeloSelecionado]);

  useEffect(() => {
    var formData = sessionStorage.getItem("phoneFormData");

    try {
      formData = JSON.parse(formData) || {};
    } catch (e) {
      formData = {};
    }

    var {
      selectedPlan = {}
    } = formData;

    var {
      id,
      plan_name = null,
      plan_code = null,
      plan = {}
    } = selectedPlan;

    try {
      const selectPhonePlan = (plan_id, plan_code) => {
        if (!Array.isArray(planos) || planos.length == 0) return;

        var selected = true;
        var selectedPlan = null;

        if (!/^[0-9]{1,4}$/.test(plan_id)) selected = false;

        if (!selected) selectedPlan = planos.find((plan) => (plan.plan_code == plan_code));

        if (!selected && !selectedPlan) selectedPlan = planos.find((plan) => (plan.plan_code == 'karfqa'));//'karf'));

        if (!selected && selectedPlan) {
          setSelectedButton(selectedPlan.id);
          setSelectedPlanCode(selectedPlan.plan_code);
          return;
        }

        selectedPlan = planos.find((plan) => (plan.plan_id == plan_id));

        if (!selectedPlan) selectedPlan = planos.find((plan) => (plan.plan_code == plan_code));

        if (selectedPlan) {
          setSelectedButton(selectedPlan.id);
          setSelectedPlanCode(selectedPlan.plan_code);
          return;
        }
      };

      selectPhonePlan(id, plan_code);
    }catch(e){
      console.error("Erro ao buscar planos", e);
    }
  }, [planos]);

  /*  
  useEffect(() => {
    if (marcaSelecionada) {
      const fetchModelos = async () => {
        try {
          var url = `http://localhost:3050/kakau-phone/checkout/get-models/${marcaSelecionada.value}`;
          if (environment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-phone/checkout/get-models/${marcaSelecionada.value}`;

          const response = await axios.get(url);
          const modelosData = response.data.map((modelo) => ({
            value: modelo.id,
            label: modelo.name,
            additionalData: {
              manufacturer_name: modelo.manufacturer_name,
              device_value: modelo.device_value,
              storage: modelo.storage,
              identifiers: modelo.identifiers,
              brand: modelo.brand,
            },
          }));
          setModelos(modelosData);
        } catch (error) {
          console.error("Erro ao buscar modelos: ", error);
        }
      };

      fetchModelos();
    }
  }, [marcaSelecionada]);
  */
  const handleModeloChange = (selectedOption) => {
    const currentData = JSON.parse(sessionStorage.getItem("phoneFormData")) || {};
    console.log('Modelo Change:', selectedOption)

    const updatedData = {
      ...currentData,
      modeloSelecionado: {
        ...selectedOption.additionalData,
        id: selectedOption.value,
        name: selectedOption.label,
      },
    };

    sessionStorage.setItem("phoneFormData", JSON.stringify(updatedData));
    setModeloSelecionado(selectedOption); // Atualiza o estado se necessário
  };

  //essa função é chamada quando o usuário seleciona uma marca
  const handleMarcaChange = (selectedOption) => {
    //console.log(selectedOption);
    setMarcaSelecionada(selectedOption);
  };

  const handleButtonClick = (id, plan_code) => {
    showInfoModal(false); 
    setModalText("");
    setModalTitle("");

    setSelectedButton(id);
    setSelectedPlanCode(plan_code);
  };

  const handleAdvanceClick = async () => {
    if (selectedButton === null) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    const selectedPlanData = planos.find((plano) => plano.id === selectedButton);

    if (selectedPlanData && marcaSelecionada && modeloSelecionado) {
      
      const currentData = JSON.parse(sessionStorage.getItem("phoneFormData")) || {};

      const planoCompleto = {
        ...selectedPlanData,
        marca: marcaSelecionada.label,
        precoPhone: modeloSelecionado.value,
      };

      // Atualiza o formData com o plano selecionado incluindo marca e preço
      const updatedData = {
        ...currentData,
        selectedPlan: planoCompleto,
      };

      sessionStorage.setItem("lastCompletedStepIndex", "0");

      // Salva o formData atualizado no sessionStorage
      sessionStorage.setItem("phoneFormData", JSON.stringify(updatedData));

      const currentStepIndex = 0; // A etapa atual é a 0
      const lastCompletedStepIndex = parseInt(
        sessionStorage.getItem("lastCompletedStepIndex") || "-1",
        10
      );

      // Atualiza o lastCompletedStepIndex se o usuário completou esta etapa com sucesso
      if (currentStepIndex >= lastCompletedStepIndex) {
        sessionStorage.setItem(
          "lastCompletedStepIndex",
          currentStepIndex.toString()
        ); 
      }

      await progress.updateDegubLogData(planoCompleto, 1, false);

      // Em seguida, envia um evento para o DataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 
        event: "plano-selecionado-celular-kakau", 
        // Aqui você pode adicionar mais propriedades ao evento, se necessário
      });
      
      progress.redirectWithParams("/seguro-celular-kakau/cotacao/dados-cadastrais", {}, navigate);      
      //navigate("/seguro-celular-kakau/cotacao/dados-cadastrais");
    } else {
      console.error("Nenhum plano ou informações de marca/preço foram selecionados.");

      let payload = {};
      if (selectedPlanData) payload = { ...payload, ...selectedPlanData };
      if (marcaSelecionada) payload = { ...payload, marca: marcaSelecionada?.label };
      if (modeloSelecionado) payload = { ...payload, precoPhone: modeloSelecionado?.value };

      await progress.updateDegubLogData(payload, 1, true);
    }
  };

  const renderProtectionTitle = (protection, isUnlimited) => {
    if (protection.id === 7 && isUnlimited) {
      // Supondo que o id 6 corresponda à "Assistência 24h"
      return (
        <div>
          <div>Assistência 24h</div>          
          <div className="leading-[14px]">ilimitada</div>
        </div>
      );
    } else {
      return protection.title;
    }
  };

  const [windowWidth, setWindowWidth] = useState(window?.innerWidth || 1024);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      cursor: "pointer",
      //fontSize: (windowWidth > 420) ? "16px" : "13px"
      // Adiciona estilos para o controle aqui, se necessário
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      border: "80px", // Corrigido para 'none' ou especifique uma largura válida e estilo de borda, por exemplo, '1px solid #ccc'
      backgroundColor: state.isSelected ? "#03a8db" : "white",
      color: state.isSelected ? "white" : "#313131",
      "&:hover": {
        backgroundColor: "lightblue",
      },
      with: "80%",
      //fontSize: (windowWidth > 420) ? "16px" : "13px"
      // Adiciona outros estilos de opção aqui, se necessário
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      // Aqui vamos adicionar o estilo para a barra de rolagem
      "::-webkit-scrollbar": {
        width: "3px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#03a8db",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    // Adiciona mais customizações de estilo para outras partes aqui, se necessário
  };

  const _isProtectionIncluded = (protectionId) => {
    const selectedPlan = planos.find((plano) => plano.id === selectedButton);

    if (selectedPlan && selectedPlan.includedProtections) return selectedPlan.includedProtections.includes(protectionId);
    

    return false;
  };

  const isProtectionIncluded = (protection_id) => {
    if (!selectedPlanCode) return false;

    const selectedPlan = planos.find((plano) => plano.plan_code === selectedPlanCode);

    if (!plansProtection[selectedPlanCode] || !Array.isArray(plansProtection[selectedPlanCode])) return false;
    
    if (selectedPlan && plansProtection[selectedPlanCode].includes(protection_id)) return true;

    return false;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      let { id = "" } = event?.target || {};      
      if (id != "info-modal" && infoModal) {
        showInfoModal(false);
        setModalText("");
        setModalTitle("");
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window?.innerWidth || 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" mx-2">
      {showAlert && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  mt-1 animate__animated animate__fadeIn sticky top-0 left-0 w-full z-[1000]"
          role="alert"
        >
          <strong className="font-bold">Por favor, </strong>
          <span className="block sm:inline">
            escolha um plano antes de avançar.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setShowAlert(false)}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <section>
        <div className=" mx-auto">
          <LayoutCotacaoPlanos
            title="Cote abaixo o seu Seguro Celular:"
            position={0}
          />
          {/*<p className="text-xl sm:text-4xl text-center mb-6">
            Seguro Celular Prime Secure
          </p>*/}
          <div className="flex flex-col md:flex-row flex-wrap justify-center self-start sm:gap-11 mt-5 animate__animated animate__fadeInRight">
            <div className="relative flex flex-col max-w-full md:max-w-[496px] items-center w-full  border rounded-lg h-fit">
              {/*Parte superior */}
              <div className="relative  w-full  max-h-[215x] h-full flex items-center justify-center overflow-hidden rounded-t-lg sm:max-h-[182px]">
                <img
                  src="https://www.kakau.com.br/_next/image?url=%2Fassets%2Fimages%2Fprotege_planCover.webp&w=1920&q=75"
                  alt=""
                  className="w-full h-full rounded-t-lg"
                />
                <div className="w-full h-full rounded-t-lg opacity-20 absolute inset-0 bg-black"></div>
                <div className="w-[60%] ss:w-[50%] flex flex-col mx-1 ss:mx-3 my-4 absolute left-0 items-center justify-center">
                  <div className="max-w-[190px] sm:max-w-[240px] ss:max-w-[200px] mx-auto">
                    {" "}
                    {/* Adicione as classes 'absolute left-0' */}
                    <p className="text-[12px] font-semibold text-center text-white uppercase bg-bluePrime rounded-[5px] py-[4px] w-full hidden ss:block">
                      Seguro Celular
                    </p>
                    <p className="mt-1 text-xl font-extralighttext-center text-white font-bold">
                      Prime Phone
                    </p>
                    <p className="mt-2 font-extralight text-center text-white font-bold text-[11px] sm:text-[13px] ss:text-[12px]">
                      Proteção que cabe no seu bolso, sem carência e sem burocracia.
                    </p>
                  </div>

                </div>
              </div>
              {/*Parte inferior */}
              <div className="px-[5px] py-4 ss:px-2 sm:px-4 flex w-full">
                <div className="flex pr-2 ss:px-2 ml-auto">
                <ul className="text-left text-[12px] ss:text-[14px] h-fit my-auto">
                    <li className="flex flex-row text-gray-700 gap-2 transition ease-in duration-75 mr-auto">
                      <div className="flex justify-center items-center ">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500" // Usa a cor determinada pela lógica acima
                        />
                      </div>
                      <p className="font-medium text-start whitespace-nowrap">
                        Sem carência
                      </p>
                    </li>
                    <li className="flex flex-row text-gray-700 gap-2 transition ease-in duration-75 mr-auto">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500" // Usa a cor determinada pela lógica acima
                        />
                      </div>
                      <p className="font-medium text-start whitespace-nowrap">
                        Sem multa
                      </p>
                    </li>
                    <li className="flex flex-row text-gray-700 gap-2 transition ease-in duration-75">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500" // Usa a cor determinada pela lógica acima
                        />
                      </div>
                      <p className="font-medium text-start whitespace-nowrap">
                        Comodidade
                      </p>
                    </li>
                    <li className="flex flex-row text-gray-700 gap-2 transition ease-in duration-75">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500" // Usa a cor determinada pela lógica acima
                        />
                      </div>
                      <p className="font-medium text-start whitespace-nowrap">
                        Agilidade
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="w-full max-w-[330px] mr-auto">
                  <div className="flex flex-row items-center py-2 ss:p-2">
                    <div className="flex w-full max-w-[330px]">
                      <Select
                        options={marcas}
                        value={marcaSelecionada}
                        className="w-full max-w-[330px] text-base text-start border-none bg-transparent justify-between cursor-pointer"
                        classNamePrefix="react-select "
                        placeholder="Selecione a Marca"
                        isSearchable
                        onChange={handleMarcaChange}
                        styles={customStyles}
                        menuPortalTarget={document.body}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-center py-2 ss:p-2 ">
                    <div className="flex w-full max-w-[330px]">
                      <Select
                        options={modelos}
                        value={modeloSelecionado}
                        className="w-full max-w-[330px] text-base text-start border-none bg-transparent justify-between"
                        classNamePrefix="react-select"
                        placeholder="Escolha o modelo"
                        isSearchable
                        onChange={handleModeloChange} // Use a função definida acima
                        styles={customStyles}
                        menuPortalTarget={document.body}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/*Div Infos*/}
            <div className="w-full md:max-w-[500px] flex flex-col-reverse sm:flex-row">
              <div className="inline-flex items-center justify-start w-auto mx-auto min-w-[180px] sm:w-1/2">
                <ul className={`mx-auto md:mr-auto md:ml-0 ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
                  {protections.map((protection) => (
                    <li
                      key={protection.id}
                      className="flex flex-row-reverse text-gray-500 mt-[5px] gap-x-2"
                    >
                      <div className="flex justify-center items-center">
                        {isProtectionIncluded(protection.id) ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-green-500"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCancel}
                            className="text-red-500"
                          />
                        )}
                      </div>
                      <p className="font-medium text-sm text-end">
                        {renderProtectionTitle(
                          protection,
                          protection.isUnlimited
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative flex flex-row-reverse flex-wrap w-full gap-2 py-6">
                {marcaSelecionada !== null && modeloSelecionado !== null ? (
                  isLoading ? ( // Verifica se está carregando
                    <div className="flex justify-center items-center mx-auto">
                      <LoadingAnimation style={{ width: "100px" }} />
                    </div>
                  ) : (
                    <>
                      {planos.map((plano) => {
                        let planName = plano.plan_name;

                        switch (plano.plan_code) {
                          case "karf":
                            planName = "Prime Avançado";
                            break;
                          case "karfqa":
                            planName = "Prime Premium";
                            break;
                          case "kaqa":
                            planName = "Prime Essencial";
                            break;
                        }

                        return (
                          <div
                            className="transition animate__animated animate__fadeIn ease-in duration-100 flex-1"
                            key={plano.id}
                          >
                            <div className="flex flex-col gap-y-4 w-full min-w-[296px] min-h-[70px]">
                              <button
                                onClick={() => handleButtonClick(plano.id, plano.plan_code)}
                                className={`relative cursor-pointer overflow-hidden border-2 border-solid rounded-md px-2 py-[24px] transition-all duration-500 ease-in-out min-h-[65px] ${
                                  selectedButton === plano.id
                                    ? "bg-bluePrime text-white transition-opacity ease-in duration-700 opacity-100 border border-grayPrime"
                                    : "bg-white text-grayPrime hover:bg-slate-100"
                                }`}
                              >
                                <div className="inline-flex items-start justify-between w-full gap-4">
                                  <div className="inline-flex items-start gap-x-4 my-auto">
                                    <div
                                      className={`flex items-center justify-center rounded-[9999px] min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] my-auto ${
                                        selectedButton === plano.id
                                          ? "bg-white border-none"
                                          : "bg-transparent border-2 border-solid"
                                      }`}
                                    >
                                      {selectedButton === plano.id && (
                                        <FontAwesomeIcon
                                          icon={faCheck}
                                          className="text-bluePrime"
                                        />
                                      )}
                                    </div>
                                    <p className="text-start text-md text my-auto">
                                      {planName}
                                    </p>{" "}
                                    {/* Usando plan_name para o título do plano */}
                                  </div>
                                  <div className={`flex flex-col items-end ml-auto mr-1 relative ${plano.plan_code === "karfqa" ? "pt-[12px]" : "py-[4px]" }`}>
                                    <div>
                                      <p className="flex">
                                        <span className="text-[16px] mr-[5px] leading-[22px]">R$ </span>
                                        <span className="font-bold text-lg leading-[22px]">
                                          {plano.amount.toLocaleString("pt-BR", {})}
                                          {/* Formatando o amount para o formato de moeda */}
                                        </span>
                                      </p>
                                      <div className="text-[13px] text-right leading-[14px]">/mês</div>
                                    </div>
                                  </div>
                                </div>
                                <div className={`font-bold flex px-[4px] py-[2px] text-[9px] border-[1px] rounded-[8px] absolute top-[8px] right-[10px]
                                  ${selectedButton === plano.id ? "border-bluePrime text-white" : "border-bluePrime text-white bg-bluePrime" }
                                  ${plano.plan_code === "karfqa" ? "" : "hidden" }                              
                                `}>
                                  MAIS VENDIDO
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      )}
                      <button
                        className="mt-4 w-full md:w-auto px-6 py-3 bg-bluePrime text-white font-bold rounded-lg hover:bg-bluePrime2 transition duration-300"
                        //onClick={() => alert("Ação do botão")}
                        onClick={handleAdvanceClick}
                      >
                        Avançar
                      </button>
                    </>
                  )
                ) : (
                  <img
                    className="absolute h-full w-full left-0 top-0 right-0 bottom-0 bg-none"
                    src="https://www.kakau.com.br/assets/icons/protege-plans.svg"
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
