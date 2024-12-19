import React, { useState } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import { DatePicker, Space } from "antd";
import Select from "react-select";
import Modal from "react-modal";

import "animate.css";
import ListaPaises from "../../components/ListaPaises";
import { Pen, Save } from "lucide-react";
import locale from "antd/lib/date-picker/locale/pt_BR"; // Importa locale

moment.locale("pt-br");

const EditQuote = () => {
    const [formData, setFormData] = useState({
        departure: null,
        arrival: null,
        olds: [0, 0, 0],
        selectedOption: null,
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleOld = (index, value) => {
        let formOlds = [...formData.olds];
        if (value === 1 && formOlds.reduce((sum, age) => sum + age, 0) < 8) {
            formOlds[index] += 1;
        } else if (value === -1 && formOlds[index] > 0) {
            formOlds[index] -= 1;
        }
        setFormData({ ...formData, olds: formOlds });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Dados salvos:", formData);
    };

    const selectHandler = (selectedOption) => {
        setFormData({ ...formData, selectedOption });
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const onChangeDeparture = (date) => {
        setFormData({
            ...formData,
            departure: date ? date.format("DD/MM/YYYY") : null,
            arrival:
                formData.arrival &&
                    moment(formData.arrival, "DD/MM/YYYY").isBefore(date)
                    ? null
                    : formData.arrival,
        });
    };

    const onChangeArrival = (date) => {
        setFormData({
            ...formData,
            arrival: date ? date.format("DD/MM/YYYY") : null,
        });
    };

    const disabledDepartureDate = (current) => {
        let limitAfter = formData.arrival;
        // Gera TimeStamp da "Data de Volta" para interagir com DatePicker
        limitAfter = moment(limitAfter, 'DD/MM/YYYY');
        return (
            // Bloqueia datas após a data da input "Data de Ida"
            (current && current.isAfter(limitAfter, 'day')) ||
            // Bloqueia datas anteriores a hoje na input "Data de Ida"
            current < moment().startOf('day')
        );
    };

    const disabledArrivalDate = (current) => {
        let limitBefore = formData.departure;
        // Gera TimeStamp da "Data de Ida" para interagir com DatePicker
        limitBefore = moment(limitBefore, 'DD/MM/YYYY');
        return (
            // Bloqueia datas anteriores a "Data de Ida"
            (current && current < moment(limitBefore, 'DD/MM/YYYY').startOf('day')) ||
            // Bloqueia datas anteriores a hoje na input "Data de Volta"
            current < moment().startOf('day')
        );
    };

    return (
        <div className="w-full bg-white border rounded-lg shadow-md p-4 sm:p-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-center">
                {/* Destino */}
                <div>
                    <h4 className="text-sm font-bold sm:text-xs md:text-sm">Destino</h4>
                    {isEditing ? (
                        <select
                            id="destinyGroup"
                            value={formData.selectedOption?.value || ""}
                            onChange={(e) =>
                                selectHandler({
                                    label: e.target.options[e.target.selectedIndex].text,
                                    value: e.target.value,
                                })
                            }
                            className="mt-2 sm:mt-1 md:mt-2 cursor-pointer w-3/4 rounded-md border px-2 py-1 text-sm shadow-sm text-center ring-offset-whitePrime"
                        >
                            <option value="" disabled className="text-center">
                                Selecione o Destino...
                            </option>
                            <option value="1" className="text-center">África</option>
                            <option value="2" className="text-center">América Central</option>
                            <option value="3" className="text-center">Ásia</option>
                            <option value="4" className="text-center">Europa</option>
                            <option value="5" className="text-center">América do Norte</option>
                            <option value="6" className="text-center">Oceania</option>
                            <option value="7" className="text-center">América do Sul</option>
                            <option value="8" className="text-center">Brasil</option>
                            <option value="9" className="text-center">Múltiplos destinos</option>
                        </select>
                    ) : (
                        <p className="text-base sm:text-sm md:text-base text-center">
                            {formData.selectedOption?.label || "Destino não selecionado"}
                        </p>
                    )}
                </div>





                {/* Passageiros */}
                <div>
                    <h4 className="text-sm font-bold sm:text-xs md:text-sm">Passageiros</h4>
                    {isEditing ? (
                        <button
                            onClick={openModal}
                            className="bg-bluePrime text-white py-1 px-4 rounded shadow hover:bg-bluePrime2 mt-2 sm:py-1 sm:px-3 sm:mt-1 md:py-1 md:px-4 md:mt-2"
                        >
                            Selecionar Passageiros
                        </button>
                    ) : (
                        <p className="text-base sm:text-sm md:text-base">
                            {formData.olds.reduce((total, age) => total + age, 0)} Passageiro(s)
                        </p>
                    )}

                    <Modal
                        isOpen={modalOpen}
                        onRequestClose={closeModal}
                        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
                        ariaHideApp={false}
                    >
                        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Idade dos Passageiros</h2>
                            {["0 a 75 anos", "76 a 85 anos", "86 a 99 anos"].map(
                                (group, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between mb-2"
                                    >
                                        <h3 className="text-xl sm:text-lg md:text-xl">{group}</h3>
                                        <div className="flex items-center justify-around w-32">
                                            <button
                                                onClick={() => handleOld(index, -1)}
                                                className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none sm:w-6 sm:h-6 md:w-7 md:h-7"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                value={formData.olds[index]}
                                                readOnly
                                                className="text-center block w-12 h-8 text-lg rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:w-10 sm:h-7 sm:text-base md:w-11 md:h-8"
                                            />
                                            <button
                                                onClick={() => handleOld(index, 1)}
                                                className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center focus:outline-none sm:w-6 sm:h-6 md:w-7 md:h-7"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                            <button
                                onClick={closeModal}
                                className="bg-bluePrime text-white py-2 px-4 rounded"
                            >
                                Fechar
                            </button>
                        </div>
                    </Modal>
                </div>

                {/* Período */}
                <div>
                    <h3 className="text-sm font-bold sm:text-xs md:text-sm">Período</h3> {/* Título adicionado */}
                    {isEditing ? (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="w-full">
                                <div className="mt-2.5">
                                    <Space direction="vertical">
                                        <DatePicker
                                            locale={locale}
                                            id="departure"
                                            selected={
                                                formData.departure
                                                    ? moment(formData.departure, 'DD/MM/YYYY')
                                                    : null
                                            }
                                            onChange={onChangeDeparture}
                                            placeholderText="Data de ida"
                                            disabledDate={disabledDepartureDate}
                                            dateFormat="dd/MM/yyyy"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 text-[#313131] placeholder:text-[#313131]"
                                        />
                                    </Space>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="mt-2.5">
                                    <Space direction="vertical">
                                        <DatePicker
                                            id="arrival"
                                            locale={locale}
                                            selected={
                                                formData.arrival
                                                    ? moment(formData.arrival, 'DD/MM/YYYY')
                                                    : null
                                            }
                                            onChange={onChangeArrival}
                                            placeholderText="Volta"
                                            disabledDate={disabledArrivalDate}
                                            dateFormat="dd/MM/yyyy"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 text-[#313131] placeholder:text-[#313131]"
                                        />
                                    </Space>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-base sm:text-sm md:text-base text-center">
                            {formData.departure && formData.arrival
                                ? `De ${moment(formData.departure).format('DD/MM/YYYY')} até ${moment(formData.arrival).format('DD/MM/YYYY')} (${moment(formData.arrival).diff(moment(formData.departure), 'days')} dias)`
                                : "Período não selecionado"}
                        </p>
                    )}
                </div>



                {/* Botão de Ação */}
                <div className="flex justify-center mt-4 md:mt-0">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 flex items-center gap-x-2 sm:py-1 sm:px-3 sm:text-sm md:py-2 md:px-4"
                        >
                            <Save className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            <span>Salvar</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleEditToggle}
                            className="bg-bluePrime text-white py-2 px-4 rounded-md shadow-sm hover:bg-bluePrime2 flex items-center gap-x-2 sm:py-1 sm:px-3 sm:text-sm md:py-2 md:px-4"
                        >
                            <Pen className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            <span>Editar Cotação</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditQuote;
