import React, { useState } from "react";
import Select from "react-select";
import { DatePicker } from "antd";
import Modal from "react-modal";
import moment from "moment";

export default function CardCotacao() {
  const [errorList, setErrorList] = useState([]);
  const [formData, setFormData] = useState({
    selectedOption: null,
    departure: null,
    arrival: null,
    olds: [0, 0, 0, 0],
  });
  const [modalOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleOld = (index, value) => {
    if (errorList.includes("ages")) {
      const errors = errorList.filter((item) => item !== "ages");
      setErrorList(errors);
    }

    const formOlds = [...formData.olds];
    const totalPassengers = formOlds.reduce((total, num) => total + num, 0);

    if ((value > 0 && totalPassengers < 10) || (value < 0 && formOlds[index] > 0)) {
      formOlds[index] += value;
      setFormData({ ...formData, olds: formOlds });
    }
  };

  const disabledDepartureDate = (current) => {
    const limitAfter = formData.arrival ? moment(formData.arrival, "DD/MM/YYYY") : null;
    return current && (limitAfter ? current.isAfter(limitAfter, "day") : false) || current.isBefore(moment().startOf("day"));
  };

  const disabledArrivalDate = (current) => {
    let limitBefore = formData.departure;
    //Gera TimeStamp da "Data de Ida" para interagir com DatePicker
    limitBefore = moment(limitBefore, "DD/MM/YYYY");
    return (
      //Bloqueia datas anteriores a "Data de Ida"
      (current && current < moment().startOf("day")) ||
      //Bloqueia datas anterios a hoje na input "Data de Volta"
      current < limitBefore.startOf("day")
    );

    const onChangeDeparture = (date, dateString) => {
      if (errorList.includes("departure")) {
        const errors = errorList.filter((item) => item !== "departure");
        setErrorList(errors);
      }
      setFormData({ ...formData, departure: dateString });
    };

    const onChangeArrival = (date, dateString) => {
      if (errorList.includes("arrival")) {
        const errors = errorList.filter((item) => item !== "arrival");
        setErrorList(errors);
      }
      setFormData({ ...formData, arrival: dateString });
    };

    return (
      <div className="max-w-screen-xl w-full mx-auto bg-bluePrime2/90 p-10 rounded-b-lg">
        <h3 className="text-xl sm:text-2xl text-white text-center">
          Preencha abaixo e realize a sua cotação instantânea
        </h3>
        <div className="flex flex-col items-center justify-center gap-4 mt-5 md:grid md:grid-cols-3 lg:flex lg:flex-row lg:h-16 gap-x-1">
          <div className="w-full sm:w-[200px]">
            <label
              className={
                errorList.includes("departure")
                  ? "block text-sm font-semibold leading-6 text-alertRed"
                  : "block text-sm font-semibold leading-6 text-white"
              }
            >
              Data de Ida
            </label>
            <DatePicker
              placeholder="Data de ida"
              disabledDate={disabledDepartureDate}
              format="DD/MM/YYYY"
              onChange={onChangeDeparture}
              className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm"
            />
          </div>

          <div className="w-full sm:w-[200px]">
            <label
              className={
                errorList.includes("arrival")
                  ? "block text-sm font-semibold leading-6 text-alertRed"
                  : "block text-sm font-semibold leading-6 text-white"
              }
            >
              Data de Volta
            </label>
            <DatePicker
              placeholder="Data de Volta"
              disabledDate={disabledArrivalDate}
              format="DD/MM/YYYY"
              onChange={onChangeArrival}
              className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm"
            />
          </div>

          <div className="w-full sm:w-[200px]">
            <label
              className={
                errorList.includes("ages")
                  ? "block text-sm font-semibold leading-6 text-alertRed"
                  : "block text-sm font-semibold leading-6 text-white"
              }
            >
              Passageiros
            </label>
            <input
              type="text"
              value={`${formData.olds.reduce((sum, age) => sum + age, 0)} Passageiros`}
              readOnly
              className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm cursor-pointer"
              onClick={openModal}
            />
          </div>
        </div>

        <Modal isOpen={modalOpen} onRequestClose={closeModal}>
          <h2>Idade dos Passageiros</h2>
          {formData.olds.map((old, index) => (
            <div key={index}>
              <span>Faixa {index + 1}</span>
              <button onClick={() => handleOld(index, -1)}>-</button>
              <span>{old}</span>
              <button onClick={() => handleOld(index, 1)}>+</button>
            </div>
          ))}
          <button onClick={closeModal}>Fechar</button>
        </Modal>
      </div>
    );
  }
}
