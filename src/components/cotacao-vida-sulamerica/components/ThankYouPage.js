import React, { useState, useEffect } from "react";
import axios from "axios";
import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faClose } from "@fortawesome/free-solid-svg-icons";

const formatCurrency = (value) => {
  let options = {
    style: "decimal",
    useGrouping: true,
    groupingSeparator: ".",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  let price = value.toLocaleString(undefined, options);

  return price;
};

const functions = new GlobalFuntions();

const enviroment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

export default function ThankYouPage({ token }) {
  const [userData, setUserData] = useState({
    customer: {
      name: "",
      cpf: "",
      phone: "",
      email: "",
    },
    address: {
      zipcode: "",
      city: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      state: "",
    },
    plan: {
      price: "",
      started_at: "",
      ended_at: "",
      objResponse: {
        valorPremio: "",
        numApolice: "",
        numSorteio: "",
      },
    },
    payment: {
      amount: "",
      method: "",
      period: "",
      card: {
        first_six_digits: "",
        last_four_digits: "",
        brand: "",
      },
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .post(`${apiUrl}/vida-sulamerica/data/getThankYouPageData`, {
        token: token,
      })
      .then((response) => {
        let { data } = response;
        data = { ...data };

        console.log("User data loaded:", data); // Log para verificar os dados carregados
        setUserData({ ...data });
      })
      .catch((err) => {
        let error = err;

        if (error && error.response) {
          error = error.response;
        }

        if (error && error.data) {
          error = error.data;
        }

        console.log("Error loading user data:", error); // Log para verificar erro
      });
  }, [token]);

  var { name, cpf, phone, email } = userData.customer;

  var { zipcode, city, street, number, complement, neighborhood, state } =
    userData.address;

  var { price, started_at, ended_at, objResponse } = userData.plan;

  console.log(started_at, ended_at);

  if (/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(started_at)) {
    started_at = functions.refactoryDate(
      started_at,
      "YYYY-MM-DD",
      "DD/MM/YYYY"
    );
  }

  if (/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(ended_at)) {
    ended_at = functions.refactoryDate(ended_at, "YYYY-MM-DD", "DD/MM/YYYY");
  }

  var { amount, method, period, card } = userData.payment;

  card = { ...card };
  objResponse = { ...objResponse };
  price = /^[0-9]{2,}$/.test(price) ? formatCurrency(price / 100) : "";
  amount = /^[0-9]{2,}$/.test(amount) ? formatCurrency(amount / 100) : "";

  var { retorno, numApolice, numSorteio } = objResponse;

  var { first_six_digits, last_four_digits, brand } = card;

  let first_four_digits = /^[0-9]{6}$/.test(first_six_digits)
    ? first_six_digits.slice(0, 4)
    : "";

  return (
    <div className="mt-5">
      <div
        className={`max-w-[850px] pt-[25px] p-[15px] mx-auto text-left text-black bg-white rounded-md shadow-lg sm:px-[20px] md:px-[45px] lg:px-[60px] ${
          !token ? "hidden" : ""
        }`}
      >
        <h1 className="text-2xl text-center sm:text-3x1">Pagamento Aprovado</h1>
        {retorno >= 0 && (
          <p className="mt-8 text-[15px] leading-[24px] text-center sm:text-[17px] md:text-[18px]">
            Obrigado por escolher a Prime Secure para sua segurança e proteção.
            <br />
            Sua contratação foi concluída com sucesso.
            <br />
          </p>
        )}
        {retorno < 0 && (
          <p className="mt-8 text-[15px] leading-[24px] text-center sm:text-[17px] md:text-[18px]">
            Obrigado por escolher a Prime Secure para sua segurança e proteção.
            <br />
            <div className="text-[16px] mt-[15px]">
              Você receberá por e-mail contendo todos os detalhes da contratação
              em até 1 dia útil.
            </div>
            <br />
          </p>
        )}
        {retorno >= 0 && (
          <p className="mt-8 leading-[28px] w-fit mx-auto text-[14px] md:mx-0 sm:text-[16px]">
            Número da Apólice: {numApolice}
            <br />
            Data de Emissão: {started_at}
            <br />
            Vigência:{" "}
            <span className="text-[14px]">
              {started_at} a {ended_at}
            </span>
            <br />
            Número do Sorteio: {numSorteio}1<br />
            Prêmio {period == "monthly" ? "Mensal" : "Anual"}: R${" "}
            {period == "monthly" ? price : amount}
          </p>
        )}
        {retorno >= 0 && (
          <p className="mt-4 mb-8 text-[14px] text-center md:text-left sm:text-[16px] md:text-[17px]">
            Confira abaixo os detalhes da sua contratação.
          </p>
        )}
        {retorno < 0 && (
          <p className="mt-4 mb-5 text-[14px] text-center md:text-left sm:text-[14px] md:text-[15px]">
            Mais detalhes da contratação:
          </p>
        )}
        <div className="mt-4 flex flex-wrap justify-center w-full gap-y-[20px] text-[14px]">
          <div className="w-1/2 min-w-[320px] flex">
            <div className="">
              <h4 className="font-semibold text-[#313131]">
                Dados do Segurado
              </h4>
              <p className="mt-1">
                {name}
                <br />
                CPF: {cpf}
                <br />
                {phone}
                <br />
                {email}
              </p>
            </div>
          </div>
          <div className="w-1/2 min-w-[320px]">
            <h4 className="font-semibold text-[#313131]">
              Endereço do Segurado
            </h4>
            <p className="mt-1">
              {street}, {number} {complement ? "- " + complement : ""}
              <br />
              {neighborhood}, {city} - {state}
              <br />
              CEP: {zipcode}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap w-full justify-center gap-y-[20px] text-[14px]">
          <div className="w-1/2 min-w-[320px] hidden">
            <h4 className="font-semibold text-[#313131]">Detalhes do Plano</h4>
            <p className="mt-1 ">
              Pacote 3 - Melhor Custo Benefício
              <br />
            </p>
            <p className="max-w-[320px] text-sm mt-1">
              Assistência pessoal + residencial + dezenas de serviços Desconto
              em farmácia + funeral familiar + Médico na Tela Familiar.
            </p>
            <p className="mt-1">Sorteio de R$20.000,00</p>
            <p className="mt-1 text-sm">
              MA - 200 mil
              <br />
              IPA - 100 mil
            </p>
            <div className="text-left mt-2 text-xs">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-bluePrime hover:text-bluePrime2 font-semibold underline underline-offset-2"
              >
                Mais detalhes...
              </a>
            </div>
          </div>
          <div className="w-1/2 min-w-[320px]">
            <h4 className="font-semibold text-[#313131]">Forma de Pagamento</h4>
            <p className={`mt-1  ${method != "credit" ? "hidden" : ""}`}>
              Cartão de Crédito
              <br />
              {brand} {first_four_digits} **** **** {last_four_digits}
              <br />
              Total: R$ {price}
              {period == "monthly" ? "/mês" : ""}
              <br />
            </p>
          </div>
          <div className="w-1/2 min-w-[320px]"></div>
        </div>
        {retorno >= 0 && (
          <h3 className="w-fit mt-8 mb-4 mx-auto font-semibold text-[#313131] text-[14px] text-center">
            Você receberá em breve um e-mail contendo todos os detalhes da
            contratação.
          </h3>
        )}
      </div>
      <div>
        <img
          src="https://storage.cloud.google.com/primesecure/34bebeae-logo-namu.svg"
          alt=""
          className="w-[150px] mx-auto"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-greenPromo p-2 px-10 font-bold rounded-md mt-4"
        >
          Cadastro
        </button>
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userData={userData}
        />
      )}
    </div>
  );
}

function Modal({ open, onClose, userData }) {
  if (!open) return null;

  const handleButtonClick = async () => {
    console.log("handleButtonClick called");
    if (!userData || !userData.customer) {
      console.error("Dados do usuário não encontrados.");
      return;
    }

    const { name, cpf, phone, email } = userData.customer;
    if (!name || !cpf || !phone || !email) {
      console.error("Campos obrigatórios estão faltando.", {
        name,
        cpf,
        phone,
        email,
      });
      return;
    }

    const payload = {
      email,
      name,
      sector: "Saúde",
      cpf,
      phone,
      business_unit: "Namu",
    };

    console.log("Sending payload:", payload);

    try {
      const response = await axios.post(
        `${apiUrl}/vida-sulamerica/create-user-namu`,
        payload
      );
      console.log("Usuário criado com sucesso:", response.data);
      // Aqui você pode adicionar qualquer lógica adicional após o usuário ser criado com sucesso
    } catch (error) {
      console.error(
        "Erro ao criar usuário:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-8 shadow-lg z-50 max-w-lg w-full relative">
        {/* Header com ícone "x" */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="al items-start">
          <img
            src="https://storage.cloud.google.com/primesecure/34bebeae-logo-namu.svg"
            alt=""
            className="w-[150px] mx-auto"
          />
        </div>
        <h2 className="text-2xl mb-4">Saúde, bem-estar físico e mental. </h2>
        <p className="mb-4">
          Clique no botão abaixo para ganhar acesso gratuito ao App da Namu{" "}
        </p>
        <button
          onClick={handleButtonClick}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Resgatar Acesso Gratuito
        </button>
      </div>
    </div>
  );
}
