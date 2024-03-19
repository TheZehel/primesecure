import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import "animate.css";
import axios from "axios";

export default function Quotation() {
  const navigate = useNavigate();

  const protections = [
    { id: 1, title: "Quebra Acidental", isUnlimited: true },
    { id: 2, title: "Roubo", isUnlimited: true },
    { id: 3, title: "Furto qualificado", isUnlimited: true },
    { id: 4, title: "Sem carência", isUnlimited: true },
    { id: 5, title: "100% online", isUnlimited: true },
    { id: 6, title: "Assistência 24h", isUnlimited: true },
  ];

  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState(null);
  const [precoSelecionado, setPrecoSelecionado] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3050/kakau-phone/checkout/get-brands"
        );
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

  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    if (marcaSelecionada) {
      const fetchModelos = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3050/kakau-phone/checkout/get-models/${marcaSelecionada.value}`
          );
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

  const [modeloSelecionado, setModeloSelecionado] = useState(null);

  const handleModeloChange = (selectedOption) => {
    const currentData = JSON.parse(sessionStorage.getItem("formData")) || {};

    const updatedData = {
      ...currentData,
      modeloSelecionado: {
        ...selectedOption.additionalData,
        id: selectedOption.value,
        name: selectedOption.label,
      },
    };

    sessionStorage.setItem("formData", JSON.stringify(updatedData));
    setModeloSelecionado(selectedOption); // Atualiza o estado se necessário
  };

  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    if (modeloSelecionado) {
      const fetchPlanos = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3050/kakau-phone/checkout/get-products/${modeloSelecionado.value}`
          );
          console.log(response.data);
          setPlanos(response.data); // Atualize o estado com os planos recebidos
        } catch (error) {
          console.error("Erro ao buscar planos para o modelo: ", error);
        }
      };

      fetchPlanos();
    }
  }, [modeloSelecionado]);

  useEffect(() => {
    console.log(planos); // Isto vai imprimir o estado atual de `planos` toda vez que ele mudar
  }, [planos]);

  //essa função é chamada quando o usuário seleciona uma marca
  const handleMarcaChange = (selectedOption) => {
    setMarcaSelecionada(selectedOption);
  };

  //essa função é chamada quando o usuário seleciona um preço
  const handlePrecoChange = (selectedOption) => {
    setPrecoSelecionado(selectedOption);
  };

  const handleButtonClick = (id) => {
    setSelectedButton(id);
  };

  const handleAdvanceClick = () => {
    if (selectedButton === null) {
      setShowAlert(true); // Mostra o alerta se nenhum plano foi selecionado
      return; // Interrompe a execução
    }
    setShowAlert(false); // Esconde o alerta

    // Continua com a lógica para avançar, já que um plano foi selecionado
    const selectedPlanData = planos.find(
      (plano) => plano.id === selectedButton
    );
    if (selectedPlanData && marcaSelecionada && modeloSelecionado) {
      // Recupera o formData existente
      const currentData = JSON.parse(sessionStorage.getItem("formData")) || {};

      // Adiciona informações de marca e preço ao plano selecionado
      const planoCompleto = {
        ...selectedPlanData,
        marca: marcaSelecionada.label, // Utiliza label para uma descrição mais legível
        precoPhone: modeloSelecionado.value,
      };

      // Atualiza o formData com o plano selecionado incluindo marca e preço
      const updatedData = {
        ...currentData,
        selectedPlan: planoCompleto,
      };

      // Salva o formData atualizado no sessionStorage
      sessionStorage.setItem("formData", JSON.stringify(updatedData));

      // Navega para a próxima página
      navigate("/seguro-celular-kakau/cotacao/dados-cadastrais");
    } else {
      // Caso marca ou preço não tenham sido selecionados, você também pode adicionar verificações aqui
      console.error(
        "Nenhum plano ou informações de marca/preço foram selecionados."
      );
    }
  };

  const renderProtectionTitle = (protection, isUnlimited) => {
    if (protection.id === 6 && isUnlimited) {
      // Supondo que o id 6 corresponda à "Assistência 24h"
      return (
        <>
          {"Assistência 24h"}
          <br />
          {"ilimitada"}
        </>
      );
    } else {
      return protection.title;
    }
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  const isProtectionIncluded = (protectionId) => {
    // Primeiro, encontre o plano selecionado com base em `selectedButton`
    const selectedPlan = planos.find((plano) => plano.id === selectedButton);

    // Verifique se selectedPlan e selectedPlan.includedProtections estão definidos
    if (selectedPlan && selectedPlan.includedProtections) {
      return selectedPlan.includedProtections.includes(protectionId);
    }

    // Retorne false por padrão se o plano selecionado não estiver definido
    // ou se includedProtections não estiver presente
    return false;
  };

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
            Seguro Bike Prime Secure
          </p>*/}
          <div className="flex flex-col md:flex-row flex-wrap justify-center self-start sm:gap-11 mt-5 animate__animated animate__fadeInRight">
            <div className="relative flex flex-col max-w-full md:max-w-[496px] items-center w-full  border rounded-lg">
              {/*Parte superior */}
              <div className="relative  w-full  max-h-[182px] h-full flex items-center justify-center">
                <img
                  src="https://www.kakau.com.br/_next/image?url=%2Fassets%2Fimages%2Fprotege_planCover.webp&w=1920&q=75"
                  alt=""
                  className="w-full h-full rounded-t-lg"
                />
                <div className="w-[50%] flex flex-col  m-4 absolute left-0 items-center justify-center">
                  {" "}
                  {/* Adicione as classes 'absolute left-0' */}
                  <p className="text-sm font-bold text-center text-white">
                    Seguro Bicicleta
                  </p>
                  <p className="text-2xl font-extralighttext-center text-white">
                    Prime
                  </p>
                  <p className="text-2xl font-extrabold text-center text-white">
                    Mobi
                  </p>
                </div>
              </div>
              {/*Parte inferior */}
              <div className="m-4 ">
                <div className="flex flex-row items-center w-full p-2">
                  <div className="cursor-pointer mx-auto">
                    <Select
                      options={marcas}
                      className="w-[330px] text-base text-start border-none bg-transparent justify-between cursor-pointer"
                      classNamePrefix="react-select "
                      placeholder="Selecione o modelo"
                      isSearchable
                      onChange={handleMarcaChange}
                      styles={customStyles}
                      menuPortalTarget={document.body}
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center w-full p-2 ">
                  <div className="">
                    <Select
                      options={modelos}
                      className="w-[330px] text-base text-start border-none bg-transparent justify-between"
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
            {/*Div Infos*/}
            <div className="w-full md:max-w-[496px] flex flex-col-reverse md:flex-row">
              <div className="inline-flex items-center justify-start w-auto mx-auto md:w-1/2">
                <ul>
                  {protections.map((protection) => (
                    <li
                      key={protection.id}
                      className="flex flex-row-reverse text-gray-500 gap-2"
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
                      <p className="font-medium text-end">
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
                  <>
                    {planos.map((plano) => (
                      <div
                        className="transition animate__animated animate__fadeIn ease-in duration-100 flex-1"
                        key={plano.id}
                      >
                        <div className="flex flex-col gap-4 w-full min-w-[296px] px-2">
                          <button
                            onClick={() => handleButtonClick(plano.id)}
                            className={`relative cursor-pointer overflow-hidden border-2 border-solid rounded-md p-2 transition-all duration-500 ease-in-out ${
                              selectedButton === plano.id
                                ? "bg-bluePrime text-white transition-opacity ease-in duration-700 opacity-100 border border-grayPrime"
                                : "bg-white text-grayPrime hover:bg-slate-100"
                            }`}
                          >
                            <div className="inline-flex items-center justify-between w-full gap-4">
                              <div className="inline-flex text-start gap-0 sm:w-[50%]">
                                <p className="text-md">
                                  {plano.plan_name || plano.plan.name}
                                </p>{" "}
                                {/* Verifique se está acessando o nome corretamente */}
                              </div>
                              <div className="flex flex-col items-end ml-2 px-0">
                                <div>
                                  <p>
                                    <span className="text-sm">R$</span>{" "}
                                    <span className="font-bold text-xl">
                                      {plano.amount.toFixed(2)}{" "}
                                      {/* Formate o preço para ter duas casas decimais */}
                                    </span>
                                  </p>
                                </div>
                                <span>/mês</span>
                              </div>
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
