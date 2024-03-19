import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import "animate.css";
import axios from "axios";
import LoadingAnimation from "./subcomponents/loadingSvg2";

export default function Quotation() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const protections = [
    { id: 1, title: "Quebra Acidental", key: "quebra_acidental" },
    { id: 2, title: "Roubo", key: "roubo_ou_furto" },
    { id: 4, title: "Sem carência", key: "sem_carencia" },
    { id: 5, title: "100% online", key: "cem_online" },
    { id: 6, title: "Assistência 24h", key: "assistencia24" },
  ];

  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3050/kakau-bike/process/bike-brands"
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

  const [precos, setPrecos] = useState([]);

  useEffect(() => {
    const fetchPrecos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3050/kakau-bike/process/get-bike-price"
        );
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

  const [marcaSelecionada, setMarcaSelecionada] = useState(null);
  const [precoSelecionado, setPrecoSelecionado] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  //essa função é chamada quando o usuário seleciona uma marca
  const handleMarcaChange = (selectedOption) => {
    setMarcaSelecionada(selectedOption);
  };

  //essa função é chamada quando o usuário seleciona um preço
  const handlePrecoChange = (selectedOption) => {
    setPrecoSelecionado(selectedOption.value || 0);
    console.log("Preco selecionado", selectedOption);
  };

  const handleButtonClick = (id) => {
    setSelectedButton(id);
  };

  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    const fetchPlanos = async () => {
      if (!precoSelecionado) return;

      setIsLoading(true); // Ativa o loading antes de começar a busca

      try {
        const response = await axios.get(
          `http://localhost:3050/kakau-bike/process/get-bike-plan/${precoSelecionado}`
        );
        setPlanos(response.data);
      } catch (error) {
        console.error("Erro ao buscar planos: ", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false); // Desativa o loading após finalizar a busca
        }, 3000); // 3000 milissegundos = 3 segundos
      }
    };

    fetchPlanos();
  }, [precoSelecionado]);

  const handleAdvanceClick = () => {
    if (selectedButton === null) {
      // Mostra o alerta
      setShowAlert(true);
      return; // Interrompe a execução da função aqui
    }
    setShowAlert(false); // Esconde o alerta se o plano estiver selecionado e prossegue

    // Continua com a lógica para avançar, já que um plano foi selecionado
    const selectedPlanData = planos.find((plan) => plan.id === selectedButton);
    if (selectedPlanData && marcaSelecionada && precoSelecionado) {
      // Recupera o formData existente
      const currentData = JSON.parse(sessionStorage.getItem("formData")) || {};

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
      sessionStorage.setItem("formData", JSON.stringify(updatedData));

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
      navigate("/seguro-bike/cotacao/dados-cadastrais");
    } else {
      // Caso marca ou preço não tenham sido selecionados, você também pode adicionar verificações aqui
      console.error(
        "Nenhum plano ou informações de marca/preço foram selecionados."
      );
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      cursor: "pointer",
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
            title="Cote abaixo o seu Seguro Bike:"
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
                  src="https://www.kakau.com.br/_next/image?url=%2Fassets%2Fimages%2Fmobi_planCover.webp&w=1920&q=75"
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
                      placeholder="Marcas de bicicletas"
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
                      options={precos}
                      className="w-[330px] text-base text-start border-none bg-transparent justify-between"
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
            {/*Div Infos*/}
            <div className="w-full md:max-w-[496px] flex flex-col-reverse md:flex-row">
              <div className="inline-flex items-center justify-start w-auto mx-auto md:w-1/2">
                <ul>
                  {protections.map((protection) => {
                    let iconColor;
                    let includeProtection = false;

                    if (selectedButton !== null) {
                      const selectedPlan = planos.find(
                        (plan) => plan.id === selectedButton
                      );

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

                    return (
                      <li
                        key={protection.id}
                        className="flex flex-row-reverse text-gray-500 gap-2 transition ease-in duration-75"
                      >
                        <div className="flex justify-center items-center">
                          <FontAwesomeIcon
                            icon={includeProtection ? faCheck : faCancel}
                            className={iconColor} // Usa a cor determinada pela lógica acima
                          />
                        </div>
                        <p className="font-medium text-end whitespace-nowrap">
                          {protection.title}
                        </p>
                      </li>
                    );
                  })}
                </ul>
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
                                <div className="inline-flex items-center gap-4">
                                  <div
                                    className={`flex items-center justify-center rounded-[9999px] min-w-[22px] min-h-[22px] max-w-[22px] max-h-[22px] ${
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
                                  <p className="">{plano.plan_name}</p>{" "}
                                  {/* Usando plan_name para o título do plano */}
                                </div>
                                <div className="flex flex-col items-end ml-2 px-4">
                                  <div>
                                    <p>
                                      <span className="text-sm">R$</span>{" "}
                                      <span className="font-bold text-2xl">
                                        {plano.amount.toLocaleString("pt-BR", {
                                          style: "currency",
                                          currency: "BRL",
                                        })}{" "}
                                        {/* Formatando o amount para o formato de moeda */}
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
                  )
                ) : (
                  <img
                    className="absolute h-full w-full left-0 top-0 right-0 bottom-0 bg-none"
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
