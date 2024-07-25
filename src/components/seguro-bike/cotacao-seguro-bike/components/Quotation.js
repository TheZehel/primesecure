import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import "animate.css";
import axios from "axios";
import LoadingAnimation from "./subcomponents/loadingSvg2";
import { Helmet } from "react-helmet";

import { FaQuestionCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

import { IoCaretDownSharp } from "react-icons/io5";

import ValidateSteps from "./modules/_validations";
import GlobalFuntions from "../../../globalsubcomponentes/globalFunctions";

const validation = new ValidateSteps;
const functions = new GlobalFuntions();

const environment = process.env.REACT_APP_ENVIRONMENT;

export default function Quotation() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  var protections = [
    { id: 1, title: "Quebra Acidental", key: "quebra_acidental" },
    { id: 2, title: "Roubo e Furto Qualificado", key: "roubo_ou_furto" },
    //{ id: 4, title: "Sem carência", key: "sem_carencia" },
    { id: 5, title: "100% online", key: "cem_online" },
    { id: 6, title: "Assistência", key: "assistencia24" },
  ];

  var assistences = [
    { id: 1, title: "Chaveiro", text: "Chaveiro em caso de perda ou quebra das chaves que prendem a bicicleta protegida, impedindo o seu uso.", key: "chaveiro" },
    { id: 2, title: "Reboque", text: "Transporte adequado para o serviço de leva e traz da bicicleta protegida, em caso de acidente ou mal súbito.", key: "reboque" },
    { id: 3, title: "Transporte", text: "Taxi ou Uber para levar o ciclista em caso de acidente ou mal súbito.", key: "transporte" },
  ];

  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        var url = "http://localhost:3050/kakau-bike/process/bike-brands"

        if (environment != "SANDBOX") url = "https://api-primesecure.onrender.com/kakau-bike/process/bike-brands"

        const response = await axios.get( url );
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
    var formData = sessionStorage.getItem("bikeFormData");

    try {
      formData = JSON.parse(formData) || {};
    } catch (e) {
      formData = {};
    }

    var {
      selectedPlanId = {}
    } = formData;

    var {
      marcaId = null,
      marca = null,
    } = selectedPlanId;

    if (/^[0-9]{1,5}$/.test(marcaId) && typeof marca === "string" && marca.length > 2) {
      setMarcaSelecionada({
        value: marcaId,
        label: marca
      });
    }
  }, [marcas]);

  const [precos, setPrecos] = useState([]);

  useEffect(() => {
    const fetchPrecos = async () => {
      try {
        var url = "http://localhost:3050/kakau-bike/process/get-bike-price";

        if (environment != "SANDBOX") url = "https://api-primesecure.onrender.com/kakau-bike/process/get-bike-price";

        const response = await axios.get( url );
        const precosData = response.data.map((preco) => ({
          value: preco.id, // Mantém como identificador único para cada seleção
          label: `R$ ${preco.amount.toLocaleString("pt-BR")}`, // Formata o preço para real brasileiro
        }));
        setPrecos(precosData);
        console.log("Precos Data", precosData);
      } catch (error) {
        console.error("Erro ao buscar preços: ", error);
      }
    };

    fetchPrecos();
  }, []);

  useEffect(() => {
    var formData = sessionStorage.getItem("bikeFormData");

    try {
      formData = JSON.parse(formData) || {};
    } catch (e) {
      formData = {};
    }

    var {
      selectedPlanId = {}
    } = formData;

    var {
      bike_price_id = null,
      bike_price_amount = null
    } = selectedPlanId;

    if (/^[0-9]{1,4}$/.test(bike_price_id) && /^[0-9]{3,6}$/.test(bike_price_amount)) {
      setPrecoSelecionado({
        value: bike_price_id,
        label: `R$ ${bike_price_amount.toLocaleString("pt-BR")}`
      });
    }
  }, [precos]);

  const [marcaSelecionada, setMarcaSelecionada] = useState(null);
  const [precoSelecionado, setPrecoSelecionado] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const [_selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlanCode, setSelectedPlanCode] = useState(null);

  const [showAlert, setShowAlert] = useState(false);

  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [infoModal, showInfoModal] = useState(false);

  //essa função é chamada quando o usuário seleciona uma marca
  const handleMarcaChange = (selectedOption) => {
    setMarcaSelecionada(selectedOption);
  };

  //essa função é chamada quando o usuário seleciona um preço
  const handlePrecoChange = (selectedOption) => {
    setPrecoSelecionado(selectedOption);
    //console.log("Preco selecionado", selectedOption);
  };

  const handleButtonClick = (id, plan_id, plan_code) => {
    showInfoModal(false); 
    setModalText("");
    setModalTitle("");

    setSelectedButton(id);
    setSelectedPlanCode(plan_code);
    setSelectedPlanId(plan_id);
  };

  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    var formData = sessionStorage.getItem("bikeFormData");
    
    showInfoModal(false); 
    setModalText("");
    setModalTitle("");

    try {
      formData = JSON.parse(formData) || {};
    } catch (e) {
      formData = {};
    }

    var {
      selectedPlanId = {}
    } = formData;

    var {
      id = null,
      plan_id = null,
      plan_code = null,
      plan_name = null,
    } = selectedPlanId;

    var selectedPlan = null;

    try {
      const selectBikePlan = (id, plan_id, plan_code) => {
        if (!Array.isArray(planos) || planos.length == 0) return;       

        var selected = true;
        var selectedPlan = null;
        
        if (!/^[0-9]{1,4}$/.test(id) && !/^[0-9]{1,4}$/.test(plan_id)) selected = false;

        if (!selected) selectedPlan = planos.find((plan) => (plan.plan_code == plan_code));

        if (!selected && !selectedPlan) selectedPlan = planos.find((plan) => (plan.plan_code == 'mobi_active'));

        if (!selected && selectedPlan) {
          setSelectedButton(selectedPlan.id);
          setSelectedPlanCode(selectedPlan.plan_code);
          setSelectedPlanId(selectedPlan.plan_id);
          return;
        }

        selectedPlan = planos.find((plan) => (plan.id == id && plan.plan_id == plan_id));

        if (!selectedPlan) selectedPlan = planos.find((plan) => (plan.plan_code == plan_code));

        if (selectedPlan) {
          setSelectedButton(selectedPlan.id);
          setSelectedPlanCode(selectedPlan.plan_code);
          setSelectedPlanId(selectedPlan.plan_id);
          return;
        }
      }      

      selectBikePlan(selectedButton || id, _selectedPlanId || plan_id, selectedPlanCode || plan_code);

    }catch(e){
      console.error("Erro ao buscar planos", e);
    }
  }, [planos]);

  useEffect(() => {
    const fetchPlanos = async () => {
      if (!precoSelecionado || !/^[0-9]{1,4}$/.test(precoSelecionado?.value)) return;
      if (!marcaSelecionada || !/^[0-9]{1,4}$/.test(marcaSelecionada?.value)) return;

      setIsLoading(true); // Ativa o loading antes de começar a busca

      try {
        var url = `http://localhost:3050/kakau-bike/process/get-bike-plan/${precoSelecionado.value}`

        if (environment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-bike/process/get-bike-plan/${precoSelecionado.value}`;

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
  }, [precoSelecionado, marcaSelecionada]);

  const handleAdvanceClick = async () => {
    if (selectedButton === null) {
      // Mostra o alerta
      setShowAlert(true);
      return; // Interrompe a execução da função aqui
    }
    setShowAlert(false); // Esconde o alerta se o plano estiver selecionado e prossegue

    let debugToken = validation.getDebugToken();
    //console.log("Debug Token A", debugToken);    
      
    let params = functions.getParamsFromUrl();

    // Continua com a lógica para avançar, já que um plano foi selecionado
    const selectedPlanData = planos.find((plan) => plan.id === selectedButton);
    if (selectedPlanData && marcaSelecionada && precoSelecionado) {
      // Recupera o formData existente
      const currentData = JSON.parse(sessionStorage.getItem("bikeFormData")) || {};

      // Adiciona informações de marca e preço ao plano selecionado
      const planoCompleto = {
        ...selectedPlanData,
        marca: marcaSelecionada.label, // Utiliza label para uma descrição mais legível
        marcaId: marcaSelecionada.value,
        precoBike: precoSelecionado.label,
      };

      // Atualiza o formData com o plano selecionado incluindo marca e preço
      const updatedData = {
        ...currentData,
        selectedPlanId: planoCompleto,
      };

      sessionStorage.setItem("lastCompletedStepIndex", "0");
      // Salva o formData atualizado no sessionStorage
      sessionStorage.setItem("bikeFormData", JSON.stringify(updatedData));

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

      // Em seguida, envia um evento para o DataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "plano-selecionado-bike-kakau",
        // Aqui você pode adicionar mais propriedades ao evento, se necessário
      });

      var url = `http://localhost:3050/kakau-bike/log-history/update`;
      if (environment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-bike/log-history/update`;

      await axios.post(url, { logToken: debugToken, step: 1, data: { ...planoCompleto }, error: false } )
        .then((response)=>{
          console.log("Usuário atualizado com sucesso", response.data);
          const { success, token } = response.data;

          console.log("Token", token, 'Success', success);     

          if (success && token) {    
            debugToken = token;
            validation.setDebugToken(token);   
          }
        })
        .catch((err)=>{
          let error = err;

          if (error && error.response) error = error.response;
          if (error && error.data) error = error.data;

          console.error("Erro ao atualizar usuário", error);
        });

      url = functions.setPathFromParams("/seguro-bike/cotacao/dados-cadastrais", { ...params, t: debugToken });
      navigate(url);
    } else {
      // Caso marca ou preço não tenham sido selecionados, você também pode adicionar verificações aqui
      console.error("Nenhum plano ou informações de marca/preço foram selecionados.");

      var url = `http://localhost:3050/kakau-bike/log-history/update`;
      if (environment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-bike/log-history/update`;

      let payload = {};
      if (selectedPlanData) payload = { ...payload, ...selectedPlanData };
      if (marcaSelecionada) payload = { ...payload, marca: marcaSelecionada.label, marcaId: marcaSelecionada.value };
      if (precoSelecionado) payload = { ...payload, precoBike: precoSelecionado.label, precoBikeId: precoSelecionado.value };

      axios.post(url, { logToken: debugToken, step: 1, data: { ...payload }, error: true } )
        .then((response)=>{
          console.log("Usuário atualizado com sucesso", response.data);
        })
        .catch((err)=>{
          let error = err;
      
          if (error && error.response) error = error.response;
          if (error && error.data) error = error.data;
      
          console.error("Erro ao atualizar usuário", error);
        });
    }
  };

  
  const [windowWidth, setWindowWidth] = useState(window?.innerWidth || 1024);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      cursor: "pointer",
      fontSize: (windowWidth > 400) ? "16px" : "13px"
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
      fontSize: (windowWidth > 400) ? "16px" : "13px"
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

  const infoModalRef = React.createRef();

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

  //console.log("Marcas:", marcas);

  //console.log("Marca Selecionada", marcaSelecionada);
  //console.log("Preco Selecionado", precoSelecionado);

  return (
    <div className=" mx-2">
      <Helmet>
        <title>Modelo da Bike | Cotação Seguro Bike</title>
      </Helmet>
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
            title="Cote abaixo o seu Seguro Bike:"
            position={0}
          />

          {/*<p className="text-xl sm:text-4xl text-center mb-6">
            Seguro Bike Prime Secure
          </p>*/}
          <div className="flex flex-col md:flex-row flex-wrap justify-center self-start sm:gap-11 mt-5 animate__animated animate__fadeInRight">
            <div className="relative flex flex-col max-w-full md:max-w-[496px] items-center w-full  border rounded-lg h-fit">
              {/*Parte superior */}
              <div className="relative  w-full  max-h-[215x] h-full flex items-center justify-center overflow-hidden rounded-t-lg sm:max-h-[182px]">
                <img
                  src="https://www.kakau.com.br/_next/image?url=%2Fassets%2Fimages%2Fmobi_planCover.webp&w=1920&q=75"
                  alt=""
                  className="w-full h-full rounded-t-lg"
                />
                <div className="w-full h-full rounded-t-lg opacity-10 absolute inset-0 bg-black"></div>
                <div className="w-[50%] flex flex-col  mx-3 my-4 absolute left-0 items-center justify-center">
                  {" "}
                  {/* Adicione as classes 'absolute left-0' */}
                  <p className="text-[10px] font-semibold text-center text-white uppercase bg-bluePrime rounded-[5px] py-[4px] w-full hidden sm:block">
                    SEGURANÇA PARA PEDALAR À VONTADE
                  </p>
                  <p className="mt-1 text-xl font-extralighttext-center text-white font-bold">
                    Seguro Bicicleta
                  </p>
                  <p className="mt-2 text-[10px] font-extralighttext-center text-white font-bold sm:text-[13px]">
                    A proteção perfeita para bicicletas manuais e elétricas.
                  </p>

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
                    <li className="flex flex-row text-gray-700 gap-2 transition ease-in duration-75 hidden">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500" // Usa a cor determinada pela lógica acima
                        />
                      </div>
                      <p className="font-medium text-start whitespace-nowrap">
                        100% online
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
                        className="w-full text-base text-start border-none bg-transparent justify-between cursor-pointer text-[14px] ss:text-[16px]"
                        classNamePrefix="react-select "
                        placeholder="Marcas de bicicletas"
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
                        options={precos}
                        value={precoSelecionado}
                        className="w-full text-base text-start border-none bg-transparent justify-between"
                        classNamePrefix="react-select"
                        placeholder="Preço da bicicleta"
                        isSearchable
                        onChange={handlePrecoChange}
                        styles={customStyles}
                        menuPortalTarget={document.body}
                      />
                    </div>
                  </div>                  
                </div>
              </div>
            </div>
            {/*Div Infos*/}
            <div className="w-full md:max-w-[496px] flex flex-col-reverse sm:flex-row">
              <div className={`inline-flex items-center justify-start w-auto mx-auto sm:w-1/2 ${(!marcaSelecionada && !precoSelecionado && !isLoading) ? "pb-[0px]" : "pb-[64px]"}`}>
                <div className="sm:mx-auto">
                  <ul>
                    <li className="flex flex-row-reverse text-gray-700 gap-2 transition ease-in duration-75">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500" // Usa a cor determinada pela lógica acima
                        />
                      </div>
                      <p className="font-medium text-end whitespace-nowrap text-[16px]">
                        Bicicletas elétricas
                      </p>
                    </li>
                    <li className="flex flex-row-reverse text-gray-700 gap-2 transition ease-in duration-75 mb-[14px]">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500" // Usa a cor determinada pela lógica acima
                        />
                      </div>
                      <p className="font-medium text-end whitespace-nowrap text-[16px]">
                        Bicicletas manuais
                      </p>
                    </li>
                    {protections.map((protection) => {
                      let iconColor;
                      let includeProtection = false;

                      let plan_code = "";

                      if (selectedButton !== null) {
                        const selectedPlan = planos.find(
                          (plan) => plan.id === selectedButton
                        );
                        
                        plan_code = selectedPlan?.plan_code;

                        // Verifica se a propriedade correspondente à proteção está presente e é true no plano selecionado
                        includeProtection =
                          selectedPlan?.plan_website_benefits[protection.key]; // Ajuste 'key' para o identificador correto
                      }

                      // Determina a cor do ícone com base na inclusão da proteção e se um plano está selecionado
                      if (selectedButton === null) {
                        iconColor = "text-gray-500"; // Cinza para quando nenhum plano estiver selecionado
                      } else if (includeProtection) {
                        iconColor = "text-green-500"; // Verde para cobertura incluída
                      } else {
                        iconColor = "text-red-500"; // Vermelho para cobertura não incluída
                      }

                      let sufix = '';

                      if (protection.key === 'assistencia24') sufix = '24h';
                      if (protection.key === 'assistencia24' && plan_code === 'mobi_perform') sufix = '24h ilimitada';

                      return (
                        <li
                          key={protection.id}
                          className="flex flex-row-reverse text-gray-700 gap-2 transition ease-in duration-75"
                        >
                          <div className="flex justify-center items-center">
                            <FontAwesomeIcon
                              icon={includeProtection ? faCheck : faCancel}
                              className={iconColor} // Usa a cor determinada pela lógica acima
                            />
                          </div>
                          <p className="font-medium text-end whitespace-nowrap text-[15px]">
                            {protection.title} {sufix}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                  <div className={`relative ${selectedPlanCode == "mobi_urban" ? "hidden" : ""}`}>
                    <div 
                      id="info-modal"  
                      ref={infoModalRef}    
                      className={`absolute left-1/2 transform -translate-x-1/2 sm:translate-x-0 md:-translate-x-1/2 max-w-[325px] w-[325px] shadow-md rounded-md bg-white p-3 text-left pr-[40px] border-[1px] border-[#000000] border-opacity-5 text-[14px] leading-[18px] z-[200] 
                        ${( infoModal && modalText && modalTitle ) ? "" : "hidden"}
                      }`}
                    >
                      <div id="info-modal" >
                        <div>{ modalText }</div>
                      </div>
                      <div 
                        id="info-modal"
                        className="text-[24px] flex absolute top-[10px] right-[10px] cursor-pointer"
                        onClick={() => { showInfoModal(false); setModalText(""); setModalTitle(""); }}
                      >
                        <IoCloseSharp />
                      </div>
                    </div>

                    <ul className="bg-[#EEE] shadow-sm w-full w-max-[197px] mx-auto px-[15px] pb-[10px] pt-[13px] rounded-[10px] relative mt-2">
                      <div className="text-white text-[28px] w-fit mx-auto absolute -top-[8px] left-0 right-0">
                        <IoCaretDownSharp />
                      </div>
                      <div className="w-fit mx-auto">
                        {assistences.map((assistence) => {
                          return (
                            <li
                              key={assistence.id}
                              className="flex flex-row-reverse text-gray-700 gap-2 transition ease-in duration-75"
                            >
                              <div 
                                className="flex justify-center items-center cursor-pointer"
                                onClick={()=>{
                                  showInfoModal(true);
                                  setModalText(assistence.text);   
                                  setModalTitle(assistence.title);                           
                                }} 
                              >
                                <FaQuestionCircle className="text-[14px]"/>
                              </div>
                              <p 
                                className="font-medium text-end whitespace-nowrap cursor-pointer text-gray-700"
                                onClick={()=>{
                                  showInfoModal(true);
                                  setModalText(assistence.text);   
                                  setModalTitle(assistence.title);                           
                                }}                                
                              >
                                {assistence.title}
                              </p>
                            </li>
                          );
                        })}                        
                      </div>
                    </ul>
                  </div>                  
                </div>
              </div>

              <div className="relative flex flex-row-reverse flex-wrap w-full gap-2 py-6">
                {marcaSelecionada !== null && precoSelecionado !== null ? (
                  isLoading ? ( // Verifica se está carregando
                    <div className="flex justify-center items-center mx-auto">
                      <LoadingAnimation style={{ width: "100px" }} />
                    </div>
                  ) : (
                    <>
                      {planos.map((plano) => (
                        <div
                          className="transition animate__animated animate__fadeIn ease-in duration-100 flex-1"
                          key={plano.id}
                        >
                          <div className="flex flex-col gap-4 w-full min-w-[296px] w-full pl-2">
                            <button
                              onClick={() => handleButtonClick(plano.id, plano.plan_id, plano.plan_code)}
                              className={`relative cursor-pointer overflow-hidden border-2 border-solid rounded-md px-2 py-[24px] transition-all duration-500 ease-in-out min-h-[65px] ${
                                selectedButton === plano.id
                                  ? "bg-bluePrime text-white transition-opacity ease-in duration-700 opacity-100 border border-grayPrime"
                                  : "bg-white text-grayPrime hover:bg-slate-100"
                              }`}
                            >
                              <div className="inline-flex items-center w-full">
                                <div className="inline-flex items-center gap-y-4">
                                  <div
                                    className={`flex items-center justify-center rounded-[9999px] min-w-[22px] min-h-[22px] max-w-[22px] max-h-[22px] mr-3 ${
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
                                  <p className="w-[110px] text-left text-[15px]">{plano.plan_name}</p>{" "}
                                  {/* Usando plan_name para o título do plano */}
                                </div>
                                <div className={`flex flex-col items-end ml-auto relative ${plano.plan_code === "mobi_active" ? "pt-[4px]" : "py-[2px]"}`}>
                                  <div className="flex">
                                    <p>
                                      {/*<span className="text-sm">R$</span>{" "}*/}
                                      <span className="font-bold text-[20px]">
                                        {plano.amount.toLocaleString("pt-BR", {
                                          style: "currency",
                                          currency: "BRL",
                                        })}{" "}
                                        {/* Formatando o amount para o formato de moeda */}
                                      </span>
                                    </p>
                                    <div className="mt-auto ml-[4px] text-[14px]">/mês</div>
                                  </div>                                  
                                </div>
                              </div>
                              <div className={`font-bold flex px-[4px] py-[2px] text-[9px] border-[1px] rounded-[8px] absolute top-[8px] right-[10px]
                                ${selectedButton === plano.id ? "border-bluePrime text-white" : "border-bluePrime text-white bg-bluePrime" }
                                ${plano.plan_code === "mobi_active" ? "" : "hidden" }                              
                              `}>
                                MAIS VENDIDO
                              </div>
                            </button>
                          </div>
                        </div>
                      ))}
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
                    className="absolute h-full w-full left-0 top-0 right-0 bottom-0 bg-none sm:p-[10px] hidden sm:block sm:max-w-[400px]"
                    src="https://www.kakau.com.br/assets/icons/mobi-plans.svg"
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
