import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { Pen, Save } from 'lucide-react';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import moment from 'moment';
import { loadFromStorage, saveToStorage } from '../utils/storageUtils';
import { toast, ToastContainer } from 'react-toastify';
import ListaPaises from '../../components/ListaPaises';

const destinations = [
  { value: '1', label: 'África', code: 'AF' },
  { value: '2', label: 'América Central', code: 'AC' },
  { value: '3', label: 'Ásia', code: 'AS' },
  { value: '4', label: 'Europa', code: 'EU' },
  { value: '5', label: 'América do Norte', code: 'AN' },
  { value: '6', label: 'Oceania', code: 'OC' },
  { value: '7', label: 'América do Sul', code: 'AS' },
  { value: '8', label: 'Brasil', code: 'BR' },
  { value: '9', label: 'Múltiplos destinos', code: 'MD' },
];

const ageGroups = [
  { label: '0 a 75 anos', id: 0 },
  { label: '76 a 85 anos', id: 1 },
  { label: '86 a 99 anos', id: 2 },
];

const defaultState = {
  CodigoDestino: '',
  CodigoMotivoViagem: '',
  IncluiEuropa: '0',
  DataInicioViagem: null,
  DataFinalViagem: null,
  QtdePassSenior: '0',
  QtdePassNaoSenior: '0',
  CupomDesconto: '',
  DiasMultiviagem: '0',
  CodigoTipoProduto: '',
  CNPJ: '',
  olds: [0, 0, 0],
  // Utilizaremos selectedOption para o destino, além de um campo destiny, se necessário
  selectedOption: null,
  destiny: null,
  reason: {},
  name: '',
  email: '',
  phone: '',
};

const EditQuote = () => {
  // Carregar dados do sessionStorage
  const [formData, setFormData] = useState(() => {
    const stored = sessionStorage.getItem('editQuote');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        selectedOption: ListaPaises.find((pais) => pais.code === parsed.CodigoDestino) || null,
        olds: Array.isArray(parsed.olds) ? parsed.olds : [0, 0, 0],
        DataInicioViagem: parsed.departure ? moment(parsed.departure, 'YYYY-MM-DD') : null,
        DataFinalViagem: parsed.arrival ? moment(parsed.arrival, 'YYYY-MM-DD') : null,
        departure: parsed.departure ? moment(parsed.departure, 'YYYY-MM-DD') : null,
        arrival: parsed.arrival ? moment(parsed.arrival, 'YYYY-MM-DD') : null,
      };
    }
    return defaultState;
  });




  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    const updatedData = {
      ...formData,
      selectedOption: formData.selectedOption?.value || '',
      CodigoDestino: formData.selectedOption?.regiao || '', // Garante que a região seja salva
      departure: moment.isMoment(formData.departure)
        ? formData.departure.format('YYYY-MM-DD')
        : null,
      arrival: moment.isMoment(formData.arrival)
        ? formData.arrival.format('YYYY-MM-DD')
        : null,
    };

    // Salva os dados atualizados no sessionStorage
    sessionStorage.setItem('editQuote', JSON.stringify(updatedData));
    setIsEditing(false);

    toast.success('Dados atualizados com sucesso!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });

    console.log('Dados atualizados no sessionStorage:', updatedData);
  };

  const handleOld = (index, value) => {
    const updatedOlds = [...formData.olds];
    if (value === 1 && updatedOlds.reduce((total, num) => total + num, 0) < 8) {
      updatedOlds[index] += 1;
    } else if (value === -1 && updatedOlds[index] > 0) {
      updatedOlds[index] -= 1;
    }
    setFormData((prev) => ({ ...prev, olds: updatedOlds }));
  };

  const selectHandler = (event) => {
    const selectedValue = event.target.value; // Valor selecionado no dropdown
    const selectedOption = ListaPaises.find((pais) => pais.value === selectedValue); // Encontra o país na lista

    setFormData((prev) => ({
      ...prev,
      selectedOption, // Atualiza o país selecionado
      CodigoDestino: selectedOption?.code || '', // Define o código do país
    }));

    // Atualiza o sessionStorage com os novos dados
    const updatedFormData = {
      ...formData,
      selectedOption,
      CodigoDestino: selectedOption?.code || '',
    };
    sessionStorage.setItem('editQuote', JSON.stringify(updatedFormData));
  };



  const onChangeDeparture = (date) => {
    setFormData((prev) => ({
      ...prev,
      departure: moment.isMoment(date) ? date : null,
      DataInicioViagem: moment.isMoment(date) ? date : null,
      DataFinalViagem:
        prev.DataFinalViagem && moment.isMoment(date) && date.isAfter(prev.DataFinalViagem)
          ? null
          : prev.DataFinalViagem,
    }));
  };

  const onChangeArrival = (date) => {
    setFormData((prev) => ({
      ...prev,
      arrival: moment.isMoment(date) ? date : null,
      DataFinalViagem: moment.isMoment(date) ? date : null,
    }));
  };


  const disabledDepartureDate = (current) =>
    current && current.isBefore(moment().startOf('day'));

  const disabledArrivalDate = (current) =>
    (formData.DataInicioViagem &&
      current &&
      current.isBefore(formData.DataInicioViagem)) ||
    (current && current.isBefore(moment().startOf('day')));

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 sm:p-2 mr-2 ml-2 max-w-[calc(100%-16px)]">
      <ToastContainer />
      {/* Layout para telas maiores */}
      <div className="hidden lg:grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-center">
        <div>
          <h4 className="text-sm font-bold sm:text-xs md:text-sm">Destino</h4>
          {isEditing ? (
            <select
              value={formData.selectedOption?.value || ''}
              onChange={selectHandler}
              className="mt-2 sm:mt-1 md:mt-2 cursor-pointer w-3/4 rounded-md border px-2 py-1 text-sm shadow-sm text-center ring-offset-whitePrime"
            >
              <option value="" disabled>
                Selecione o Destino...
              </option>
              {ListaPaises.map((dest) => (
                <option key={dest.value} value={dest.value}>
                  {dest.label}
                </option>
              ))}
            </select>

          ) : (
            <p className="text-base sm:text-sm md:text-base text-center">
              {formData.selectedOption?.label || 'Destino não selecionado'}
            </p>
          )}
        </div>

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
        </div>

        <div>
          <h4 className="text-sm font-bold sm:text-xs md:text-sm">Período</h4>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <DatePicker
                  locale={locale}
                  value={formData.DataInicioViagem}
                  onChange={onChangeDeparture}
                  placeholder="Data de ida"
                  disabledDate={disabledDepartureDate}
                  format="DD/MM/YYYY"
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 text-[#313131] placeholder:text-[#313131]"
                />
              </div>
              <div className="w-full">
                <DatePicker
                  locale={locale}
                  value={formData.DataFinalViagem}
                  onChange={onChangeArrival}
                  placeholder="Volta"
                  disabledDate={disabledArrivalDate}
                  format="DD/MM/YYYY"
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime lg:text-lg lg:leading-6 text-[#313131] placeholder:text-[#313131]"
                />
              </div>
            </div>
          ) : (
            <p className="text-base sm:text-sm md:text-base text-center">
              {formData.DataInicioViagem && formData.DataFinalViagem
                ? `De ${formData.DataInicioViagem.format('DD/MM/YYYY')} até ${formData.DataFinalViagem.format('DD/MM/YYYY')}`
                : 'Período não selecionado'}
            </p>

          )}
        </div>

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
              <Pen className="w-5 h-5" />
              <span>Editar</span>
            </button>
          )}
        </div>
      </div>

      {/* Layout para telas menores */}
      <div className="lg:hidden text-xs flex flex-col space-y-2">
        {isEditing ? (
          <>
            <div className="flex flex-col space-y-4">
              <div>
                <h4 className="text-sm font-bold">Destino</h4>
                <select
                  value={formData.selectedOption?.value || ''}
                  onChange={selectHandler}
                  className="mt-2 cursor-pointer w-full rounded-md border px-2 py-1 text-sm shadow-sm text-center ring-offset-whitePrime"
                >
                  <option value="" disabled>
                    Selecione o Destino...
                  </option>
                  {destinations.map((dest) => (
                    <option key={dest.value} value={dest.value}>
                      {dest.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="text-sm font-bold">Passageiros</h4>
                <button
                  onClick={openModal}
                  className="bg-bluePrime text-white py-1 px-4 rounded shadow hover:bg-bluePrime2"
                >
                  Selecionar Passageiros
                </button>
              </div>

              <div>
                <h4 className="text-sm font-bold">Período</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <DatePicker
                      locale={locale}
                      value={formData.DataInicioViagem}
                      onChange={onChangeDeparture}
                      placeholder="Data de ida"
                      disabledDate={disabledDepartureDate}
                      format="DD/MM/YYYY"
                      className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime text-[#313131] placeholder:text-[#313131]"
                    />
                  </div>
                  <div>
                    <DatePicker
                      locale={locale}
                      value={formData.DataFinalViagem}
                      onChange={onChangeArrival}
                      placeholder="Volta"
                      disabledDate={disabledArrivalDate}
                      format="DD/MM/YYYY"
                      className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-bluePrime text-[#313131] placeholder:text-[#313131]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <span>{formData.selectedOption?.label || 'Destino não selecionado'}</span>
            <span>{formData.olds.reduce((total, age) => total + age, 0)} Passageiro(s)</span>
            <span>
              {formData.DataInicioViagem && formData.DataFinalViagem
                ? `De ${formData.DataInicioViagem.format('DD/MM/YYYY')} até ${formData.DataFinalViagem.format('DD/MM/YYYY')}`
                : 'Período não selecionado'}
            </span>
          </div>
        )}

        <div className="flex justify-end mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white py-2 px-2 rounded-md shadow-sm hover:bg-green-600 flex items-center gap-x-1 ml-auto"
            >
              <Save className="w-3 h-3" />
              <span>Salvar</span>
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-bluePrime text-white py-2 px-2 rounded-md shadow-sm hover:bg-bluePrime2 flex items-center gap-x-1 ml-auto"
            >
              <Pen className="w-3 h-3" />
              <span>Editar</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]" />
          <div className="fixed inset-0 flex items-center justify-center z-[1001]">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Idade dos Passageiros</h2>
              {ageGroups.map((group, index) => (
                <div key={group.id} className="flex items-center justify-between mb-2">
                  <h3 className="text-xl">{group.label}</h3>
                  <div className="flex items-center justify-around w-32">
                    <button
                      onClick={() => handleOld(index, -1)}
                      className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={formData.olds[index]}
                      readOnly
                      className="text-center block w-12 h-8 text-lg rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm"
                    />
                    <button
                      onClick={() => handleOld(index, 1)}
                      className="bg-bluePrime hover:bg-bluePrime2 text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={closeModal}
                className="bg-bluePrime text-white py-2 px-4 rounded mt-4 w-full"
              >
                Fechar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditQuote;
