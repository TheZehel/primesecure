import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { DatePicker, Space } from "antd";
import InputMask from "react-input-mask";
import Modal from "react-modal";
import imageManager from "../../bancoDeImagens";
import { Chip } from "@material-tailwind/react";
import ListaPaises from "./ListaPaises";
import DataValidation from "../../modules/dataValidation";

export default function FormTravelBanner() {
  const [formData, setFormData] = useState(() => {
    // Recuperando os dados do localStorage
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          destination: "",
          departureDate: "",
          returnDate: "",
          passengers: { "0-40": 0, "41-64": 0, "65-75": 0, "76-99": 0 },
          name: "",
          email: "",
          phone: "",
        };
  });

  function formatStringDate(dateString){
    let pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!pattern.test(dateString)){ return false; }
    
    let [, day, month, year] = pattern.exec(dateString);
    let newDate = `${year}-${month}-${day}`;

    return newDate; 
  }

  async function submitFormToRD(payload, redirect){
    const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;
    const options = {
      method: "POST",
      url: `https://api.rd.services/platform/conversions?api_key=${apiKey}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: payload,
      },
    };
    
    await axios.request(options)
      .then( (response)=>{ console.log(response.data); })
      .catch((error)=>{ console.error(error); });
    
    //console.log('Form RD:', options.data.payload);
    //console.log('Redirect:', redirect);
    window.location.href = redirect;
  }

  function convertToForm(payload, leadIdentifier){
    //console.log(payload);
    let form = {
      conversion_identifier: leadIdentifier,
      cf_destinationcountry: payload.destiny.value,
      cf_destinationregion: customValidation.retornarDestino(payload.destiny.regiao) || payload.destiny.value,//
      cf_departuredate: (payload.departure || '').toString(),
      cf_arrivaldate: (payload.arrival || '').toString(),
      cf_passengers_0_to_40: (payload.old0 || '0').toString(),
      cf_passengers_41_to_64: (payload.old1 || '0').toString(),
      cf_passengers_65_to_75: (payload.old2 || '0').toString(),
      cf_passengers_76_to_99: (payload.old3 || '0').toString(),
      name: (payload.name || '').toString(), 
      email: (payload.email || '').toString(), 
      mobile_phone: (payload.phone || '').toString(),
      personal_phone: (payload.phone || '').toString() 
    }

    if (payload.phone.replace(/[^0-9]+/g, '').length == 10){ delete form.mobile_phone; }else{ delete form.personal_phone; }
    if (form.cf_passengers_0_to_40 == 0){ delete form.cf_passengers_0_to_40; }
    if (form.cf_passengers_41_to_64 == 0){ delete form.cf_passengers_41_to_64; }
    if (form.cf_passengers_65_to_75 == 0){ delete form.cf_passengers_65_to_75; }
    if (form.cf_passengers_76_to_99 == 0){ delete form.cf_passengers_76_to_99; }
    return form;
  }

  function todayStringDate(){
    let today = new Date();
    today = today.toISOString().split('T')[0];
    return today; //formatStringDate(today);
  }

  const customValidation = new DataValidation();
  const [errorList, setErrorList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(JSON.stringify(formData));

    // Armazenando os dados no localStorage
    //localStorage.setItem("formData", JSON.stringify(formData));

    // Envie o formData para uma API ou o próximo componente
    //window.location.href = "https://google.com.br";
    
    //console.log(formData);
    let destiny = selectedOption || { value: '', label: '', regiao: 0 };

    let totalPassengers = 0;
    olds.map((qtd, i)=>{ totalPassengers += qtd; });
    totalPassengers = `${totalPassengers} Passageiro(s)` ;

    let payload = {
      destiny: destiny,
      destinyGroup: destiny.regiao,
      departure: dates[0],
      arrival: dates[1],
      ages: totalPassengers,
      old0: olds[0] || 0,
      old1: olds[1] || 0,
      old2: olds[2] || 0,
      old3: olds[3] || 0,
      name: inputName,
      email: inputEmail,
      phone: inputPhone
    }
    
    let errors = customValidation.validarTravelPayload(payload);
    console.log(errors);
    console.log(payload)
    if (errors.length > 0){ setErrorList(errors); return; }

    let form = convertToForm(payload, "lead-primetravel-api");
    console.log(form);
    
    delete payload.destiny;
    let fullUrl = 'https://primetravel.primesecure.com.br/cotacao-rapida?';

    for(let key in payload){
      let value = payload[key] || '';
      if (key == 'departure' || key == 'arrival'){ value = formatStringDate(value); }
      value = encodeURIComponent(value);

      let urlEncode = `${key}=${value}`;
      fullUrl += urlEncode;
      if (key != 'phone'){ fullUrl += '&'; }
    }

    submitFormToRD(form, fullUrl);
    //console.log(fullUrl);
    //window.location.href = fullUrl;
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (errorList.includes('destinyGroup')){ let errors = errorList.filter(item=> item != 'destinyGroup'); setErrorList(errors); }
    console.log(`Option selected:`, selectedOption);
  };

  const [dates, setDates] = useState(['00/00/0000', '00/00/0000']);

  const onChangeDeparture = (date, dateString) => {
    console.log('Departure', date, dateString);
    let departure = dateString || todayStringDate();//formatStringDate(dateString) || todayStringDate();
    if (errorList.includes('departure')){ let errors = errorList.filter(item=> item != 'departure'); setErrorList(errors); }
    setDates([departure, dates[1]]);    
  };

  const onChangeArrival = (date, dateString) => {
    console.log('Arrival', date, dateString);    
    let arrival = dateString || todayStringDate();//formatStringDate(dateString) || todayStringDate();
    if (errorList.includes('arrival')){ let errors = errorList.filter(item=> item != 'arrival'); setErrorList(errors); }
    setDates([dates[0], arrival]);
  };

  const [modalOpen, setModalIsOpen] = useState(false);
  const [olds, setOlds] = useState([0, 0, 0, 0]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(olds.reduce((a, b) => a + b, 0));
  }, [olds]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleOld = (index, value) => {
    if (errorList.includes('ages')){ let errors = errorList.filter(item=> item != 'ages'); setErrorList(errors); }
    if ((value > 0 && total < 10) || (value < 0 && olds[index] > 0)) {
      setOlds(olds.map((old, i) => (i === index ? old + value : old)));
    }
  };

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [phoneMask, setPhoneMask] = useState('(99) 9999-99999');

  const inputHandler = (event)=>{
    let id = event.target.id;
    let value = event.target.value;
    //console.log(id, value);

    if (errorList.includes(id)){ let errors = errorList.filter(item=> item != id); setErrorList(errors); }

    if (id == 'full-name'){ setInputName(value); }
    if (id == 'email'){ setInputEmail(value); }
    if (id == 'phone'){ 
      setInputPhone(value); 
      if (value.replace(/[^0-9]+/g, '').length < 11 && phoneMask == '(99) 99999-9999'){ setPhoneMask('(99) 9999-99999'); }
      if (value.replace(/[^0-9]+/g, '').length > 10 && phoneMask == '(99) 9999-99999'){ setPhoneMask('(99) 99999-9999'); }      
    }
  } 
  
  return (
    <section
      className="p-10"
      id="banner-travel"
      style={{
        backgroundImage: `url(${imageManager.banners.bannerPrimeTravel})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto pt-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="animate__animated animate__fadeIn">
            <Chip value="Sua Viagem Mais Segura Com" className="bg-bluePrime" />
            <h1 className="text-4xl font-bold mb-4 text-white">
              Prime Travel{" "}
            </h1>
            <p className="text-white">
              Não importa como e para onde você viaja, nós te protegemos. Ainda
              Contamos Com + de 30 Coberturas.
            </p>
          </div>
          <div className="animate__animated animate__zoomIn rounded-lg bg-white p-10 sm:p-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Faça Sua Cotação Gratuita
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Inicie sua cotação online preenchendo o formulário abaixo.
            </p>
            <form
              action=""
              className="sm:flex flex-col sm:flex-row justify-center items-center mx-auto gap-x-6 gap-y-4 mt-10 max-w-xl sm:mt-10"
            >
              <div className="w-full gap-x-8 gap-y-6 grid grid-cols-1 ">
                <div>
                  <label
                    id="label-destinyGroup"
                    htmlFor=""
                    className={errorList.includes("destinyGroup") ? "block text-sm font-semibold leading-6 text-alertRed" : "block text-sm font-semibold leading-6 text-gray-900"}
                  >
                    Destino
                  </label>
                  <div className="mt-2.5">
                    <Select
                      value={selectedOption}
                      onChange={handleChange}
                      options={ListaPaises}
                      isSearchable
                      placeholder="Selecione o Destino..."
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <label
                      id="label-departure"
                      htmlFor=""
                      className={errorList.includes("departure") ? "block text-sm font-semibold leading-6 text-alertRed" : "block text-sm font-semibold leading-6 text-gray-900"}
                    >
                      Data de Ida
                    </label>
                    <div className="mt-2.5">
                      <Space direction="vertical">
                        <DatePicker
                          format="DD/MM/YYYY"
                          onChange={onChangeDeparture}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                        />
                      </Space>
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      id="label-arrival"
                      htmlFor=""
                      className={errorList.includes("arrival") ? "block text-sm font-semibold leading-6 text-alertRed" : "block text-sm font-semibold leading-6 text-gray-900"}
                    >
                      Data de Volta
                    </label>
                    <div className="mt-2.5">
                      <Space direction="vertical">
                        <DatePicker
                          format="DD/MM/YYYY"
                          onChange={onChangeArrival}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                        />
                      </Space>
                    </div>
                  </div>
                </div>
                <div className="">
                  <label 
                    htmlFor="passengers" 
                    className={errorList.includes("ages") ? "form-label block text-sm font-semibold leading-6 text-alertRed" : "form-label block text-sm font-semibold leading-6 text-gray-900"} 
                    id="label-ages"
                  >
                    Passageiros
                  </label>
                  <input
                    type="text"
                    className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6 cursor-pointer"
                    id="ages"
                    name="ages"
                    value={
                      olds.reduce((total, age) => total + age, 0) > 0
                        ? `${olds.reduce(
                            (total, age) => total + age,
                            0
                          )} Passageiros`
                        : "Selecionar Passageiros"
                    }
                    onClick={openModal}
                    readOnly
                    required
                  />

                  <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="fixed inset-0 flex items-center justify-center p-6 bg-gray-800 bg-opacity-50"
                  >
                    <div className="animate__animated animate__fadeIn bg-white rounded-lg shadow px-5 py-4 mx-auto w-96 h-96 border border-gray-300">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl">Idade do(s) passageiro(s)</h2>
                        <button onClick={closeModal} className="bg-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <hr className="mb-4" />
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl">0 a 40 anos</h3>
                        <div className="flex items-center justify-around w-32">
                          <button
                            onClick={() => handleOld(0, -1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={olds[0]}
                            readOnly
                            className=" text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={() => handleOld(0, 1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl">41 a 64 anos</h3>
                        <div className="flex items-center justify-around w-32">
                          <button
                            onClick={() => handleOld(1, -1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={olds[1]}
                            readOnly
                            className=" text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={() => handleOld(1, 1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl">65 a 75 anos</h3>
                        <div className="flex items-center justify-around w-32">
                          <button
                            onClick={() => handleOld(2, -1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={olds[2]}
                            readOnly
                            className=" text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={() => handleOld(2, 1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl">76 a 99 anos</h3>
                        <div className="flex items-center justify-around w-32">
                          <button
                            onClick={() => handleOld(3, -1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={olds[3]}
                            readOnly
                            className=" text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                          />
                          <button
                            onClick={() => handleOld(3, 1)}
                            className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={closeModal}
                        className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-2/4 items-center "
                      >
                        Aplicar
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>
              <div className="w-full gap-x-8 gap-y-6 grid grid-cols-1 mt-5 sm:m-0">
                <div>
                  <label
                    id="label-name"
                    htmlFor=""
                    className={errorList.includes("full-name") ? "block text-sm font-semibold leading-6 text-alertRed" : "block text-sm font-semibold leading-6 text-gray-900"}
                  >
                    Nome Completo
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={ (e)=>{ inputHandler(e); } }
                      type="text"
                      name="full-name"
                      id="full-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    id="label-email"
                    htmlFor=""
                    className={errorList.includes("email") ? "block text-sm font-semibold leading-6 text-alertRed" : "block text-sm font-semibold leading-6 text-gray-900"}
                  >
                    E-mail
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={ (e)=>{ inputHandler(e); } }
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    id="label-phone"
                    htmlFor="phone"
                    className={errorList.includes("phone") ? "block text-sm font-semibold leading-6 text-alertRed" : "block text-sm font-semibold leading-6 text-gray-900"}
                  >
                    Telefone
                  </label>
                  <div className="mt-2.5">
                    <InputMask
                      id="phone"
                      onChange={ (e)=>{ inputHandler(e); } }
                      mask={phoneMask}
                      maskChar={null}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </form>
            <button
              className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-full flex mt-3 justify-center items-center"
              onClick={handleSubmit}
            >
              Cotar Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
