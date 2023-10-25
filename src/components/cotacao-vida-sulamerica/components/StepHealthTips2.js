import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import { Transition } from "@headlessui/react";

// Componente reutilizável
function SelectTextareaComponent({ options, placeholder, infoText }) {
  const [value, setValue] = useState(options[0].value);

  return (
    <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl my-5 rounded-xl shadow-uniform-shadow sm:p-5 p-5 ">
      <div className="items-start justify-start text-start">
        <p>{infoText}</p> {/* Renderiza o texto informativo */}
      </div>
      <div className="flex justify-start">
        <SelectButton
          value={value}
          onChange={(e) => setValue(e.value)}
          options={options}
          className="flex"
          itemTemplate={(option) => (
            <div
              onClick={() => setValue(option.value)}
              className={`
                p-3 mr-1 transition-all duration-500 ease-in-out rounded-lg my-4
                ${
                  value === option.value
                    ? "bg-bluePrime text-white px-10 m-0"
                    : "bg-white border border-bluePrime"
                }
              `}
            >
              {option.label}
            </div>
          )}
        />
      </div>
      <Transition
        show={value === "sim"}
        enter="transition-opacity ease-in-out duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in-out duration-300"
        leaveFrom="opacity-0"
        leaveTo="opacity-0"
      >
        <div className="mt-1 block w-full">
          <textarea
            placeholder={placeholder}
            className="block w-full rounded-md border-bluePrime shadow-sm focus:border-indigo-300 focus:ring focus:ring-bluePrime focus:ring-opacity-70"
            rows="3"
          ></textarea>
        </div>
      </Transition>
    </div>
  );
}

export default function StepHealthTips2() {
  // Configuração dos botões
  const options = [
    { label: "Sim", value: "sim" },
    { label: "Não", value: "não" },
  ];

  // Array de objetos com informações para cada instância do componente
  const infoObjects = [
    {
      infoText:
        "Sofro de problema no coração, como: Pressão alta, arritmia, taquicardia, sopro e outros.",
      placeholder:
        "Conte-nos um pouco mais sobre? Informar medicação e dosagem*",
    },
    {
      infoText:
        "Tenho alergias a medicamentos, como: Penicilina, Aspirina, Ibuprofeno e outros.",
      placeholder:
        "Conte-nos um pouco mais sobre? Informar medicação e dosagem*",
    },
    {
      infoText: "Sou portador de doença crônica ou congênita.",
      placeholder:
        "Conte-nos um pouco mais sobre? Informar medicação e dosagem*",
    },
    {
      infoText:
        "Tenho ou já tive qualquer tipo de câncer, como: Linfoma, tumor, neoplasia e outros.",
      placeholder:
        "Conte-nos um pouco mais sobre? Informar medicação e dosagem*",
    },
    {
      infoText: "Faço uso contínuo de medicamentos.",
      placeholder:
        "Conte-nos um pouco mais sobre? Informar medicação e dosagem*",
    },
    {
      infoText:
        "Sofro, ou realizo tratamento de ansiedade, depressão ou síndrome do pânico.",
      placeholder:
        "Conte-nos um pouco mais sobre? Informar medicação e dosagem*",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center justify-center sm:m-0 mx-2">
        {/* Utilização do componente reutilizável com a prop infoText */}
        {infoObjects.map((infoObject, index) => (
          <SelectTextareaComponent
            key={index}
            options={options}
            placeholder={infoObject.placeholder}
            infoText={infoObject.infoText}
          />
        ))}
      </div>
      <div className=" m-auto max-w-6xl rounded-xl grid sm:grid-cols-2 grid-cols-1">
        <button className="border border-bluePrime p-2 sm:mr-2 m-1 rounded-lg font-bold">
          Voltar para planos
        </button>
        <button className="bg-bluePrime p-2 sm:ml-2 m-1 rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300">
          Avançar
        </button>
      </div>
    </div>
  );
}
