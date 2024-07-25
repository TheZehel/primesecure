import React, { useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";
import GlobalFuntions from "../../../globalsubcomponentes/globalFunctions";
import LayoutCotacaoPlanos from "./subcomponents/LayoutCotacao";
import { useNavigate } from "react-router-dom";
import { input } from "@material-tailwind/react";
import GoogleMaps from "./modules/map";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "animate.css";

import ValidateSteps from "./modules/_validations";

const validate = new ValidateSteps();

export default function AddressData({ updateFormData }) {
  const [errorList, setErrorList] = useState([]);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [validCep, setValidCep] = useState(false);

  const [userData, setUserData] = useState({
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [_number, setNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Assume-se que o índice da etapa atual é 1
    const currentStepIndex = 2;
    const lastCompletedStepIndex = parseInt(
      sessionStorage.getItem("lastCompletedStepIndex") || "1",
      10
    );

    // Se o índice da etapa atual for maior que o índice da última etapa completada + 1
    // Redireciona o usuário para a última etapa completada ou para a primeira etapa se nenhuma foi completada
    if (currentStepIndex > lastCompletedStepIndex + 1) {
      navigate("/hml-seguro-bike/cotacao/"); // Ou outra lógica de redirecionamento baseada no índice
    }
  }, [navigate]);

  //verifica se já possui os dados de cep, endereço, bairro, cidade e estado no formdata
  useEffect(() => {
    const loadFormData = () => {
      const savedFormData = sessionStorage.getItem("bikeFormData");
      
      if (savedFormData) {
        var formData = {};

        try { formData = JSON.parse(savedFormData); } catch(e) { formData = {}; }

        var { addressData } = formData;

        console.log('Load Session Storage:', { ...addressData, ...userData })
           
        setUserData({ ...addressData, ...userData });
      }
    };

    

    loadFormData();
  }, []);

  const [location, setLocation] = useState({
    lat: -23.5505199,
    lng: -46.6333094,
  });

  const inputNumberRef = useRef(null);

  // consulta VIACEP
  const fetchAddress = async (cep, _userData) => {
    cep = cep.replace(/\D/g, "");

    try {
      if (cep.length < 8) {
        setValidCep(false);
        return;
      }

      var response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      var data = await response.json();

      //console.log(data);

      if (data.erro) {
        setValidCep(false);
      } else {
        setValidCep(true);

        if (inputNumberRef.current) {
          //Muda o foco para input "Número"
          inputNumberRef.current.focus();
        }

        let addressLine = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;

        let apiKey = "AIzaSyCfw_i1zJOfveuviiJxZJC7Jt7dAl73SVY";

        await axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              addressLine
            )}&key=${apiKey}`
          )
          .then((response) => {
            const geolocation = response.data.results[0].geometry.location;

            let errors = [ ...errorList ];
            let errorsToRemove = ['state', 'city', 'address', 'number', 'cep', 'neighborhood'];
            
            errors = errors.filter(item => !errorsToRemove.includes(item));

            setErrorList([...errors]);

            setLocation({
              lat: geolocation.lat,
              lng: geolocation.lng,
            });
          })
          .catch((error) => {
            console.error("Erro ao obter a localização:", error);
          });

        console.log("_userData", _userData);

        //var _userData = { ...userData };

        for (var data in _userData) if (!_userData[data]) delete _userData[data];        

        setUserData({
          number: _number,
          ..._userData,
          cep:  data.cep || "",
          address: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || ""
        });
      }
    } catch (error) {
      // Lide com erros de rede, etc.
    }
  };

  // Função para lidar com a mudança nos inputs
  const inputHandler = (e) => {
    const { name = "", value = "" } = e.target;

    console.log(name, value);

    if (name == "complement" && errorList.includes('complement')) {
      let errors = [ ...errorList ];

      let index = errors.indexOf("complement");
      errors.splice(index, 1);

      setErrorList([ ...errors ]);
    }

    if (name == "number" && errorList.includes('number')) {
      let errors = [ ...errorList ];

      let index = errors.indexOf("number");
      errors.splice(index, 1);

      setErrorList([ ...errors ]);
      setNumber(value);
    }

    if (name == "cep") {
      if (value.length === 9 && userData.cep !== value) {
        var _userData = { ...userData, [name]: value };
        setUserData({ ..._userData });
        fetchAddress(value, _userData);
        return;
      }        
    }

    setUserData({ ...userData, [name]: value });
  };

  //instância da classe GlobalFuntions
  const functions = new GlobalFuntions();

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    let errorListTemp = []; // Lista temporária de erros

    try {
      var {
        address = "",
        cep = "",
        city = "",
        complement = "",
        neighborhood = "",
        number = "",
        state = ""
      } = { ...userData };

      console.log(userData)

      let errors = validate.validateThirdStep({ state, city, address, number, complement, neighborhood, cep });

      errorListTemp = [ ...errors ];

      setErrorList(errorListTemp);

      if (errorListTemp.length > 0) {
        return;
      }

      setErrorList([]);

      const storage = sessionStorage.getItem("bikeFormData");
      var currentData = {};

      try {
        currentData = JSON.parse(storage) || {};
      }catch(e){
        currentData = {};
      }
      
      const updateData = {
        ...currentData,
        addressData: userData,
      };

      const currentStepIndex = 2; // Esta é a segunda etapa, então o índice é 1
      sessionStorage.setItem(
        "lastCompletedStepIndex",
        currentStepIndex.toString()
      );

      // Em seguida, envia um evento para o DataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "dados-endereco-adicionados-bike-kakau",
        // Aqui você pode adicionar mais propriedades ao evento, se necessário
      });

      sessionStorage.setItem("bikeFormData", JSON.stringify(updateData));
      navigate("/hml-seguro-bike/cotacao/cadastro-bike");

    }catch(e) {
      errorListTemp.push("unhandled-error");
      
      setErrorList(errorListTemp);

      console.error('Unhandled Error:', e);
    }

    return;
    /*
    // Verifica se userData.cep existe antes de tentar usar replace
    const cep = userData.cep || ""; // Usa uma string vazia como fallback
    const cepDigits = cep.replace(/\D/g, "");
    
    console.log("CEP", cep);
    console.log("user", userData);
    // Validação de campos
    // Valida se o cep é válido
    if (!functions.validateCEP(cep)) {
      errorListTemp.push("cep");
    }

    if (!functions.validateStreetNumber(userData.number)) {
      errorListTemp.push("number");
    }

    // Se houver erros, atualiza a lista de erros e impede a navegação
    if (errorListTemp.length > 0) {
      setErrorList(errorListTemp);
    } else {
      // Se não houver erros, prossegue com a atualização dos dados e a navegação
      const currentData = JSON.parse(sessionStorage.getItem("bikeFormData")) || {};
      const updateData = {
        ...currentData,
        addressData: userData,
      };

      // Atualiza o progresso do usuário no processo
      const currentStepIndex = 2; // Esta é a segunda etapa, então o índice é 1
      sessionStorage.setItem(
        "lastCompletedStepIndex",
        currentStepIndex.toString()
      );

      // Em seguida, envia um evento para o DataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "dados-endereco-adicionados-bike-kakau",
        // Aqui você pode adicionar mais propriedades ao evento, se necessário
      });

      sessionStorage.setItem("bikeFormData", JSON.stringify(updateData));
      navigate("/hml-seguro-bike/cotacao/cadastro-bike");
      
    }*/
  };

  const navigateToBuyerData = () => {
    //Envia um evento para o DataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "voltar-dados-comprador-bike-kakau",
      // Aqui pode adicionar mais propriedades ao evento, se necessário
    });

    navigate("/hml-seguro-bike/cotacao/dados-cadastrais");
  };

  console.log("USER DATA:", userData)
  return (
    <div className=" mx-2 ">
      <LayoutCotacaoPlanos title="Informações de endereço" position={2} />
      <div className=" flex justify-center w-full animate__animated animate__fadeInRight ">
        <div className="flex items-center justify-center w-full max-w-[1025px]">
          <div className=" w-full  max-w-6xl   rounded-xl">
            <div className=" max-w-6xl mt-3 rounded-md w-full h-[200px]  sm:h-[150px]">
              <GoogleMaps geolocation={location} />
            </div>
            <form action="">
              <div className="bg-white rounded-b-lg max-w-6xl mt-3 ">
                <div className="flex flex-col sm:flex-row m-auto">
                  <InputMask
                    name="cep"
                    type="text"
                    value={userData.cep}
                    onChange={(e) => {
                      inputHandler(e);
                      //const newCep = e.target.value;
                      //console.log("New Cep", newCep);
                      //
                      //setUserData((prevUserData) => ({
                      //  ...prevUserData,
                      //  cep: newCep,
                      //}));
                      //if (newCep.length === 9) {
                      //  fetchAddress(newCep);
                      //}
                    }}
                    className={`inputClass ${
                      errorList.includes("cep")
                        ? "border-red-500 sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 text-3xl placeholder rounded-md focus:ring-2 focus:ring-inset animate__animated animate__bounce"
                        : "sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                    }`}
                    placeholder="CEP"
                    mask="99999-999"
                    maskChar={null}
                    title="Preencha o seu Cep"
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                  <InputMask
                    name="address"
                    type="text"
                    value={userData.address}
                    onChange={inputHandler}
                    className={`sm:w-full max-w h-full px-4 py-2 mx-1 my-1 text-3xl rounded-md focus:ring-2 focus:ring-inset ${
                      errorList.includes("address")
                      ? "border-red-500 animate__animated animate__bounce"
                      : "ring-bluePrime border-0 placeholder ring-1 focus:ring-bluePrime"
                    }`}                     
                    placeholder="Endereço"
                    title="Digite o seu endereço aqui"
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                  <InputMask
                    type="text"
                    name="number"
                    onChange={inputHandler}
                    mask={"9999"}
                    maskChar={null}
                    value={userData.number}
                    className={`inputClass ${
                      errorList.includes("number")
                        ? "border-red-500 sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 text-3xl placeholder rounded-md focus:ring-2 focus:ring-inset animate__animated animate__bounce"
                        : "sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                    }`}
                    placeholder="Numero"
                    title="Específique o número"
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row">
                  <InputMask
                    name="complement"
                    value={userData.complement}
                    type="text"
                    onChange={inputHandler}
                    className={`inputClass ${
                      errorList.includes("complement")
                        ? "border-red-500 sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 text-3xl placeholder rounded-md focus:ring-2 focus:ring-inset animate__animated animate__bounce"
                        : "sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                    }`}
                    placeholder="Complemento"
                    title="Específique um complemento."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                  <InputMask
                    type="text"
                    name="neighborhood"
                    value={userData.neighborhood}
                    onChange={inputHandler}
                    className={`inputClass ${
                      errorList.includes("neighborhood")
                        ? "border-red-500 sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 text-3xl placeholder rounded-md focus:ring-2 focus:ring-inset animate__animated animate__bounce"
                        : "sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                    }`}
                    placeholder="Bairro"
                    title="Específique seu bairro."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                  <InputMask
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={inputHandler}
                    className={`inputClass ${
                      errorList.includes("city")
                        ? "border-red-500 sm:w-[29.3%] max-w h-full px-4 py-2 mx-1 my-1 text-3xl placeholder rounded-md focus:ring-2 focus:ring-inset animate__animated animate__bounce"
                        : "sm:w-[29.3%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                    }`}
                    placeholder="Cidade"
                    title="Específique sua cidade."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                  <InputMask
                    type="text"
                    name="state"
                    value={userData.state}
                    onChange={inputHandler}
                    className={`inputClass ${
                      errorList.includes("state")
                        ? "border-red-500 sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 text-3xl placeholder rounded-md focus:ring-2 focus:ring-inset animate__animated animate__bounce"
                        : "sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                    }`}
                    placeholder="Estado"
                    title="Específique seu Estado."
                    style={{
                      fontSize: "20px",
                      caretColor: "#03a8db 2px",
                    }}
                  />
                </div>
              </div>
            </form>
            <div className=" m-auto max-w-6xl mt-3 rounded-xl grid gap-2 sm:grid-cols-2 grid-cols-1">
              <button
                onClick={navigateToBuyerData}
                className="border border-bluePrime p-2  rounded-lg font-bold"
              >
                Voltar para dados do comprador
              </button>
              <button
                onClick={handleSubmit}
                className="bg-bluePrime p-2  rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300"
              >
                Avançar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
