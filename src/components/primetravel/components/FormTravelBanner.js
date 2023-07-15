import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { DatePicker, Space } from "antd";
import InputMask from "react-input-mask";
import Modal from "react-modal";
import imageManager from "../../bancoDeImagens";
import { Chip } from "@material-tailwind/react";
import ListaPaises from "./ListaPaises";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));

    // Armazenando os dados no localStorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Envie o formData para uma API ou o próximo componente
    //window.location.href = "https://google.com.br";
    console.log(formData);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
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
    if ((value > 0 && total < 10) || (value < 0 && olds[index] > 0)) {
      setOlds(olds.map((old, i) => (i === index ? old + value : old)));
    }
  };

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
                    htmlFor=""
                    className="block text-sm font-semibold leading-6 text-gray-900"
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
                      htmlFor=""
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Data de Ida
                    </label>
                    <div className="mt-2.5">
                      <Space direction="vertical">
                        <DatePicker
                          onChange={onChange}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                        />
                      </Space>
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Data de Volta
                    </label>
                    <div className="mt-2.5">
                      <Space direction="vertical">
                        <DatePicker
                          onChange={onChange}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                        />
                      </Space>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5">
                  <label htmlFor="passengers" className="form-label">
                    Passageiros
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6 cursor-pointer"
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
                    htmlFor=""
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Nome Completo
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    E-mail
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Telefone
                  </label>
                  <div className="mt-2.5">
                    <InputMask
                      mask="(99) 9.9999-9999"
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
