import axios from 'axios';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import moment from 'moment';

moment.locale('pt-br');

const ocupationOptions = [
    { value: 'Aposentado', label: 'Aposentado' },
    { value: 'Administrador de Empresa', label: 'Administrador de Empresa' },
    { value: 'Estudante Universitário', label: 'Estudante Universitário' },
    { value: 'Dona de casa', label: 'Dona de casa' },
    { value: 'Empresário e Prodt.Espetáculo', label: 'Empresário e Prodt.Espetáculo' },
    { value: 'Corretores de seguros', label: 'Corretores de seguros' },
    { value: 'Comerciante/Comerciario', label: 'Comerciante/Comerciario' },
    { value: 'Médico', label: 'Médico' },
    { value: 'Outro', label: 'Outro' },
];

const incomeRangeOptions = [
    { value: 'ate2.5k', label: 'Até R$2.500' },
    { value: '2.5k-5k', label: 'Entre R$2.500 e R$5.000' },
    { value: '5k-7.5k', label: 'Entre R$5.000 e R$7.500' },
    { value: '7.5k-10k', label: 'Entre R$7.500 e R$10.000' },
    { value: '10k+', label: 'Acima de R$10.000' },
];

const genderOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'nao-binario', label: 'Não Binário' },
    { value: 'prefiro-nao-dizer', label: 'Prefiro não dizer' },
];

export default function FormVidaOmint() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        ocupation: null,
        incomeRange: null,
        gender: null,
    });

    const handleOcupationChange = (selectedOcupation) => {
        setFormData({ ...formData, ocupation: selectedOcupation });
    };

    const handleIncomeRangeChange = (selectedIncomeRange) => {
        setFormData({ ...formData, incomeRange: selectedIncomeRange });
    };

    const handleGenderChange = (selectedGender) => {
        setFormData({ ...formData, gender: selectedGender });
    };

    const inputHandler = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, phone } = formData;

        if (!name || !email || !phone) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const response = await axios.post('/submit-form', formData);
            console.log('Formulário enviado:', response.data);
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
        }
    };

    return (
        <ConfigProvider locale={locale}>
            <form
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md mx-auto w-full max-w-lg sm:max-w-md lg:max-w-xl"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4 text-grayPrime text-center">Faça Sua Cotação</h2>
                <p className="text-lg mb-6 text-gray-600 text-center">
                    Preencha o formulário abaixo para iniciar sua cotação.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                    {/* Nome */}
                    <div className="col-span-1">
                        <label htmlFor="name" className="block font-bold text-grayPrime">
                            Nome Completo
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={inputHandler}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Seu nome"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="col-span-1">
                        <label htmlFor="email" className="block font-bold text-grayPrime">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={inputHandler}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Seu email"
                            required
                        />
                    </div>

                    {/* Telefone */}
                    <div className="col-span-1">
                        <label htmlFor="phone" className="block font-bold text-grayPrime">
                            Telefone
                        </label>
                        <InputMask
                            mask="(99) 99999-9999"
                            id="phone"
                            value={formData.phone}
                            onChange={inputHandler}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Seu telefone"
                            required
                        />
                    </div>

                    {/* Ocupação */}
                    <div className="col-span-1">
                        <label htmlFor="ocupation" className="block font-bold text-grayPrime">
                            Ocupação Atual
                        </label>
                        <Select
                            id="ocupation"
                            value={formData.ocupation}
                            onChange={handleOcupationChange}
                            options={ocupationOptions}
                            placeholder="Selecione"
                            className="mt-2 text-sm"
                        />
                    </div>

                    {/* Faixa de Renda */}
                    <div className="col-span-1">
                        <label htmlFor="incomeRange" className="block font-bold text-grayPrime">
                            Faixa de Renda
                        </label>
                        <Select
                            id="incomeRange"
                            value={formData.incomeRange}
                            onChange={handleIncomeRangeChange}
                            options={incomeRangeOptions}
                            placeholder="Selecione"
                            className="mt-2 text-sm"
                        />
                    </div>

                    {/* Sexo */}
                    <div className="col-span-1">
                        <label htmlFor="gender" className="block font-bold text-grayPrime">
                            Sexo
                        </label>
                        <Select
                            id="gender"
                            value={formData.gender}
                            onChange={handleGenderChange}
                            options={genderOptions}
                            placeholder="Selecione"
                            className="mt-2 text-sm"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-8 w-full bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Cotar Agora
                </button>
            </form>

        </ConfigProvider>
    );
}
