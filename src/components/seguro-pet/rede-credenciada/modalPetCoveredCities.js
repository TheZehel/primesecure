// React
import React, { useState, useEffect } from "react";

//icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "../../../assets/svg/searchIcon.svg";

//requisição api
import axios from "axios";
const enviroment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

export default function ModalPetCoveredCities({
  isOpen,
  onClose,
  onFetchCoverage,
}) {
  //definição de estados
  const [searchTerm, setSearchTerm] = useState("");
  const [regionList, setRegionList] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedRegionIbge, setSelectedRegionIbge] = useState(null);

  //impede a rolagem quando o modal esta aberto
  document.body.style.overflow = "hidden";

  //puxa as regiões disponíveis
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
    if (isOpen) {
      getRegions();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Se o modal não está aberto, nada é retornado
  if (!isOpen) return null;

  const filteredRegions = regionList.filter((region) =>
    region.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //puxa as informações das clínicas
  const fetchCoverageData = async (ibgeCode) => {
    try {
      const response = await axios.post(`${apiUrl}/petlove/plans/coverage`, {
        ibgeCode,
      });

      // Imprimindo a resposta no console
      console.log("Dados de Cobertura Recebidos:", response.data.result.data);

      return response.data.result.data; // Acessando a parte correta da resposta
    } catch (error) {
      console.error("Erro ao obter dados de cobertura:", error);
      console.log("Dados recebidos na resposta de erro:", error.response?.data);
      return []; // Retornar um array vazio em caso de erro
    }
  };

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

    fetchCoverageData(ibge).then((data) => {
      console.log("Dados para passar para CardsOverflow:", data); // Imprimir dados antes de passar
      onFetchCoverage(data, region); // Passando os dados para o componente pai
    });
  };

  //confirmação do botão selecionado
  const handleConfirm = (data) => {
    // Exemplo: Se data for -1, feche o modal e retorne ao estado inicial
    if (data === -1) {
      // Reset qualquer estado se necessário
      onClose(); // Feche o modal
      return;
    }

    // Exemplo: Se não houver região selecionada e precisar de uma ação específica
    if (!selectedRegion) {
      console.log("Sem região selecionada");
      // Implemente a ação necessária, como navegar para outra página
      return;
    }

    // Se uma região foi selecionada, faça algo com essa seleção
    if (selectedRegion) {
      // Implemente a lógica necessária aqui
      console.log("Região selecionada:", selectedRegion, selectedRegionIbge);
      onClose(); // Feche o modal após a ação
    }
  };

  return (
    <div>
      {/* Background do Modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="animate__animated animate__fadeIn fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow px-5 py-4 border border-gray-300 overflow-hidden w-11/12 md:w-2/3 lg:w-2/4"
          style={{ maxHeight: "85vh" }}
        >
          {/* Header do Modal */}
          <div className="flex mb-3 justify-between">
            <h3 className="text-2xl">Localização</h3>
            <button onClick={onClose} className="bg-transparent">
              <FontAwesomeIcon
                icon={faTimes}
                className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer"
              />
            </button>
          </div>
          {/* Body Modal */}
          <div
            className="mt-4 hover:text-bluePrime relative text-start mx-20"
            style={{ maxHeight: "260px" }}
          >
            <div className="flex items-center">
              <input
                id="region_search"
                type="search"
                placeholder="Digite para filtrar sua cidade"
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
                    /*navigate("/obrigado") setFormStep(3);*/
                  }}
                  className="text-bluePrime hover:text-bluePrime2 underline font-semibold"
                >
                  Não encontrei minha cidade
                </button>
              </li>
            </ul>
          </div>
          {/* Footer Modal Com Botão */}
          <footer className="mt-4 flex justify-end">
            <button
              onClick={handleConfirm}
              className="w-full h-14 bg-bluePrime hover:bg-bluePrime2 text-white px-4 py-2 rounded mx-20 "
            >
              Confirmar
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
