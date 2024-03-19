import React, { useState, useEffect } from "react";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import InputMask from "react-input-mask";
import GlobalFuntions from "../../../globalsubcomponentes/globalFunctions";
import { useNavigate } from "react-router-dom";
import "animate.css";

export default function DataBike({ updateForm }) {
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
      navigate("/seguro-bike/cotacao/"); // Ou outra lógica de redirecionamento baseada no índice
    }
  }, [navigate]);

  useEffect(() => {
    const loadFormData = () => {
      const savedFormData = sessionStorage.getItem("formData");
      if (savedFormData) {
        const formData = JSON.parse(savedFormData);

        // Ajuste aqui para garantir que você está carregando `precoBike` de `formData.dataBike`
        const { year, modality, serieNumber, model } = formData.dataBike || {};
        // Tenta carregar `precoBike` tanto de `dataBike` quanto de `selectedPlanId`
        const precoBike =
          formData.dataBike?.precoBike ||
          formData.selectedPlanId?.bike_price_amount ||
          "";

        setUserData({
          year,
          modality,
          precoBike, // Usa o valor ajustado
          serieNumber,
          model,
        });
      }
    };

    loadFormData();
  }, []);

  const [errorList, setErrorList] = useState([]);
  const [userData, setUserData] = useState(() => {
    // Tenta recuperar 'formData' do sessionStorage
    const savedFormData = sessionStorage.getItem("formData");
    let initialUserData = {
      model: "",
      value: "",
      precoBike: "",
      year: "",
      modality: "",
      serieNumber: "",
    };

    // Puxas as infos do localstorage
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      const { marca, title, precoBike } = formData.selectedPlanId || {};

      initialUserData = {
        ...initialUserData,
        model: marca || initialUserData.model,
        value: title || initialUserData.value,
        precoBike: precoBike || initialUserData.precoBike,
      };
    }
    console.log("initialUserData:", initialUserData);

    return initialUserData;
  });

  useEffect(() => {
    // Esse useEffect sera executado toda vez que precoBike for alterado
    // Aqui você pode fazer o que quiser com `userData.precoBike`
    console.log("precoBike alterado:", userData.precoBike);
    // Exemplo: Atualizar sessionStorage com os novos dados
    const currentData = JSON.parse(sessionStorage.getItem("formData")) || {};
    const updatedData = {
      ...currentData,
      dataBike: {
        ...currentData.dataBike,
        precoBike: userData.precoBike,
      },
    };
    sessionStorage.setItem("formData", JSON.stringify(updatedData));
  }, [userData.precoBike]);

  console.log("SavedDataBike", userData);
  console.log("formDta Stagio DataBike:", userData);

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

    // Validar ano da bike
    if (!functions.validadeYearBike(userData.year)) {
      errorListTemp.push("year");
    }
    // Verifica o serial number
    if (!functions.validateSerialNumberBike(userData.serieNumber)) {
      errorListTemp.push("serieNumber");
    }

    // Valida a seleção da modalidade
    if (!functions.validateModality(userData.modality)) {
      errorListTemp.push("modality");
    }
    console.log("Erro: ", userData);
    // Atualizar o estado de errorList com a nova lista de erros
    setErrorList(errorListTemp);

    // Verificar se não há erros antes de prosseguir
    if (errorListTemp.length === 0) {
      const currentData = JSON.parse(sessionStorage.getItem("formData")) || {};
      const updateData = {
        ...currentData,
        dataBike: {
          ...currentData.dataBike,
          ...userData,
          // Aqui você assegura que precoBike seja incluído. Se precoBike já está em userData, essa linha é redundante,
          // mas se precoBike vem de outro lugar (ex: currentData.selectedPlanId), você deve incluí-lo explicitamente aqui.
          precoBike:
            userData.precoBike || currentData.selectedPlanId?.precoBike,
        },
      };

      // Atualiza o progresso do usuário no processo
      const currentStepIndex = 3; // Esta é a segunda etapa, então o índice é 1
      sessionStorage.setItem(
        "lastCompletedStepIndex",
        currentStepIndex.toString()
      );

      sessionStorage.setItem("formData", JSON.stringify(updateData));

      // Navegar para a próxima página se não houver erros
      navigate("/seguro-bike/cotacao/pagamento");
    } else {
      // Tratar os erros aqui, por exemplo, exibindo-os ao usuário
      console.log("Erros encontrados:", errorListTemp);
    }
  };

  return (
    <div className=" mx-2">
      <LayoutCotacaoPlanos title="Informações da bike" position={3} />
      <section className="mt-3 sm:mt-5 flex justify-center w-full animate__animated animate__fadeInRight">
        <div className="w-full sm:max-w-[1025px]">
          <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <input
                name="model"
                type="text"
                className="w-full  px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Modelo da Bike"
                value={userData.model}
                onChange={inputHandler}
                disabled={true}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              <input
                name="precoBike"
                type="text"
                className="w-full  px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                placeholder="Valor da Bike"
                value={userData.precoBike}
                disabled={true}
                mask="999.999,99"
                onChange={inputHandler}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
              <InputMask
                name="year"
                type="text"
                className={`inputClass ${
                  errorList.includes("year")
                    ? "border-red-500 animate__animated animate__bounce w-full mt-4 rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                }`}
                placeholder="Ano da Bike"
                mask="9999"
                maskChar={null}
                value={userData.year}
                onChange={inputHandler}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              />
            </div>
            {/* Cpf, RG, Telefone */}
            <div className="w-full md:w-1/2 px-2 mb-4">
              <select
                name="modality"
                type="select"
                className={`inputClass ${
                  errorList.includes("modality")
                    ? "border-red-500 animate__animated animate__bounce w-full  rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                }`}
                placeholder="Selecione o seu Peso"
                onChange={inputHandler}
                value={userData.modality}
                style={{ fontSize: "24px", caretColor: "#03a8db 2px" }}
              >
                <option value="" disabled selected>
                  Selecione uma Opção
                </option>
                <option value="1">Mountain Bike</option>
                <option value="2">Speed</option>
                <option value="3">Triathlon</option>
                <option value="4">Urbana</option>
                <option value="5">Elétrica</option>
                <option value="6">Ciclocross</option>
              </select>
              <InputMask
                type="text"
                className={`inputClass ${
                  errorList.includes("serieNumber")
                    ? "border-red-500 animate__animated animate__bounce w-full mt-4 rounded-md px-4 py-2 text-3xl"
                    : "w-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime mt-4"
                }`}
                placeholder="N Série"
                onChange={inputHandler}
                value={userData.serieNumber}
                name="serieNumber"
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
