//Seo
import { Helmet } from "react-helmet";

import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from 'react-router-dom';

import InputMask from "react-input-mask";

import { FaSyncAlt } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";


import card from "@material-tailwind/react/theme/components/card";

import axios from "axios";

import CryptoFunctions  from "../globalsubcomponentes/CryptoFunctions";

import LoadingIcon from "../cotacao-pet-love/components/icons/loadingIcon";


import CardBrands from "./components/icons/CardBrands";


const crypto = new CryptoFunctions();

const enviroment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${(enviroment)}`];

const errorCodes = (code) => {
    if (!code || !/^[0-9]{1,}$/.test(code)){
        return 'Houve um problema ao processar seu pagamento. Por favor, tente novamente mais tarde.';
    }

    code = code.toString();

    const errorMessages = [            
        "O seu pagamento esta sendo processado pelo órgão de pagamento e será aprovado em até um dia útil.", //0
        "Houve um problema ao processar seu pagamento. Por favor, tente novamente mais tarde.", //1
        "Seu cartão foi recusado. Por favor, verifique os detalhes do seu cartão e tente novamente.", //2
        "O valor do seu pedido excede o limite de crédito do seu cartão. Por favor, tente um cartão diferente.", //3
        "Ocorreu um erro ao processar seu pagamento. Por favor, aguarde alguns minutos antes de tentar novamente.", //4
        "A compra não foi autorizada pela operadora do cartão de crédito.", //5
        "Cartão desabilitado. Entre em contato com a operadora do cartão de crédito.", //6
        "Cartão vencido ou data de vencimento incorreta. Por favor, verifique os dados do cartão.", //7
        "Código de segurança inválido. Por favor, verifique os dados do cartão.", //8
        "Cartão com restrição. Entre em contato com a operadora do cartão de crédito.", //9
        "O pagamento não foi aprovado pela operadora do cartão de crédito. Por favor, verifique os dados do cartão e tente novamente.", //10 
        "Pagamento recusado por excesso de retentativas. Por favor, aguarde alguns instantes e tente novamente." //11            
    ];

    switch (code) {
        case "1000":
        case "1007":
        case "1019":
        case "1022":
        case "1035":
        case "1040":
        case "9200":
        case "2000":
        case "2002":
            return errorMessages[5];
        case "1001":
        case "1045":
            return errorMessages[7];
        case "1004":
            return errorMessages[9];
        case "1009":
            return errorMessages[10];
        case "1016":
            return errorMessages[3];
        case "1025":
            return errorMessages[6];
        case "9201":
            return errorMessages[11];
        case "9113":
            return errorMessages[4];
    }

    return 'Houve um problema ao processar seu pagamento. Por favor, tente novamente mais tarde.';
};

const link = "https://www.sulamerica.com.br/manuais/CondicoesEspeciaisDaAssistenciaPessoal.pdf";

const plans = [
  {
    headTitle: "",
    title: "",
    price: "",
    award: "",
    resume: "",
    resumeDesc: "",
    features: [],
    bgColor: "bluePrime",
    textColor: "white",
    planId: 0,
  },
  {
    headTitle: "PRIME BASIC",
    title: "Pacote 1",
    price: "3490",
    award: "Sorteio de R$20.000,00",
    resume: "Detalhes:",
    resumeDesc: "Assistência Pessoal + Assistência Residencial + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
    features: [
      { 
        label: "Morte Acidental",
        value: "100 mil" 
      }, 
      {
        label: "Invalidez Permanente Total por Acidente", 
        value: "50 mil" 
      },
      {
        label: "Funeral Familiar Até 10 mil",
        value: "(Prestação de Serviço)"
      }
    ],
    bgColor: "bluePrime",
    textColor: "white",
    planId: 1,
  },
  {
    headTitle: "PRIME SILVER",
    title: "Pacote 2",
    price: "4250",//"4249",
    award: "Sorteio de R$20.000,00",
    resume: "Detalhes:",
    resumeDesc: "Assistência Pessoal + Assistência Residencial + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
      //"Assistência pessoal + residencial + dezenas de serviços Desconto em farmácia + funeral familiar + Médico na Tela Familiar.",
      features: [
        { 
          label: "Morte Acidental",
          value: "150 mil" 
        }, 
        {
          label: "Invalidez Permanente Total por Acidente", 
          value: "75 mil" 
        },
        {
          label: "Funeral Familiar Até 10 mil",
          value: "(Prestação de Serviço)"
        }
      ],
    bgColor: "bluePrime",
    textColor: "white",
    planId: 2,
  },
  {
    headTitle: "PRIME GOLD",
    title: "Pacote 3",
    price: "5014",
    award: "Sorteio de R$20.000,00",
    resume: "Detalhes:",
    resumeDesc:
      "Assistência Pessoal + Assistência Residencial + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
      features: [
        { 
          label: "Morte Acidental",
          value: "200 mil" 
        }, 
        {
          label: "Invalidez Permanente Total por Acidente", 
          value: "100 mil" 
        },
        {
          label: "Funeral Familiar Até 10 mil",
          value: "(Prestação de Serviço)"
        }
      ],
    bgColor: "bluePrime",
    textColor: "white",
    planId: 3,
  },
  {
    headTitle: "PRIME DIAMOND",
    title: "Pacote 4",
    price: "6532",//"6531",
    award: "Sorteio de R$20.000,00",
    resume: "Detalhes:",
    resumeDesc:
      "Assistência Pessoal + Assistência Residencial + Desconto Farmácia + Funeral Familiar + Médico na Tela Familiar.",
      features: [
        { 
          label: "Morte Acidental",
          value: "300 mil" 
        }, 
        {
          label: "Invalidez Permanente Total por Acidente", 
          value: "150 mil" 
        },
        {
          label: "Funeral Familiar Até 10 mil",
          value: "(Prestação de Serviço)"
        }
      ],
    bgColor: "bluePrime",
    textColor: "white",
    planId: 4,
  },
];

function InvoicePaymentVida() {
    const [paymentMethod, setPaymentMethod] = useState("current-card");
    const [processing, setProcessing] = useState(true);

    const [errorList, setErrorList] = useState([]);
    const [errorAlert, setErrorAlert] = useState(null);

    const [displaySuccess, setDisplaySuccess] = useState(false);
    
    const [document, setDocument] = useState({});
    const [subscription, setSubscription] = useState({});
    const [invoice, setInvoice] = useState({});

    const [encrypted, setEncrypted] = useState(null);

    const [contractData, setContractData] = useState({});

    var params = useParams();
    params = { ...params };

    const { subscriptionId } = params;

    const [cardData, setCardData] = useState({ name: "", number: "", expiration: "", cvv: "" });

    const inputHandler = (e) => {
        if (!e || !e.target || !e.target.name) return;       
        var { value, name } = e.target;

        if (name.includes("card-")) {
            let label = name.replace("card-", "");

            if (errorList.includes(name)) {
                let erros = errorList.filter((error) => error != name);
                setErrorList([...erros]);
            }

            setCardData({...cardData, [label]: value});
            return;
        }
    };

    const validateInput = (input, value) => {
        if (input == "card-name") {
            let name = value || '';
            name = name.toString().trim();
        
            if (name.length < 4) return false;           

            return true
        }

        if (input == "card-number") {
            var cartaoPattern = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;

            if (!cartaoPattern.test(value)) return false; 
        
            let numeroCartao = value.replace(/[^0-9]+/g, "").toString();        
            let soma = 0;
            let dobrar = false;
        
            for (let i = numeroCartao.length - 1; i >= 0; i--) {
                let digito = parseInt(numeroCartao.charAt(i), 10);
        
                if (dobrar) 
                    if ((digito *= 2) > 9) digito -= 9;

                soma += digito; 
                dobrar = !dobrar;
            }
        
            if ((soma % 10) != 0) return false; 
        
            return true;
        }

        if (input == "card-expiration") {
            let pattern_A = /^(\d{2})\/(\d{4})$/;
            let pattern_B = /^(\d{2})\/(\d{2})$/; 
            let datePattern = /^(\d{4})\-(\d{2})\-(\d{2})$/;
        
            if (!pattern_A.test(value) && !pattern_B.test(value)) return false;            
            
            let hoje = (new Date()).toISOString().split('T')[0];
        
            let [, hojeAno, hojeMes, hojeDia] = datePattern.exec(hoje);
        
            if (pattern_A.test(value)){
                let [, mes, ano] = pattern_A.exec(value);                
                if (parseInt(mes) < 1) return false;        
                if (parseInt(mes) > 12) return false;        
                if (parseInt(hojeAno) > parseInt(ano)) return false;        
                if (parseInt(hojeAno) == parseInt(ano) && parseInt(hojeMes) > parseInt(mes) ) return false;               
        
                return true
            }
        
            let [, mes, ano] = pattern_B.exec(value);
            ano = `20${ano}`;
        
            if (parseInt(mes) < 1 ) return false;        
            if (parseInt(mes) > 12 ) return false;        
            if (parseInt(hojeAno) > parseInt(ano)) return false;         
            if (parseInt(hojeAno) == parseInt(ano) && parseInt(hojeMes) > parseInt(mes) ) return false; 
        
            return true;
        }

        if (input == "card-cvv") {
            if (/^[0-9]{3,4}$/.test(value)) return true;
            return false;        
        }
    };

    const encryptCard = async () => {
        if (processing) return;       

        try {
            await fetch('/publicKey.pem')
                .then((response) => response.text())
                .then(async (publicKey) => {
                    var subscription_id = 'sub_' + subscriptionId;
                    var card = { ...cardData };
                    var encrypted = crypto.encryptData(JSON.stringify({ ...card, subscription_id }), publicKey);                    

                    console.log('Encrypted:', encrypted);

                    setProcessing(true);
                    setCardData({ ...card });                    
                    setEncrypted(encrypted);
                })
                .catch((error) => {
                    console.error('Erro ao carregar a chave pública:', error);
                });
        }catch(error){
            console.error('Não foi possível criptogradar os dados de pagamento.', error);
        }
    };

    const retryPayment = () => {
        if (processing || (invoice && invoice.status == 'paid')) return;
        setProcessing(true);
        
        try {
            axios.post(`${apiUrl}/vida-sulamerica/try-subscription-charge`, { subscription_id: 'sub_' + subscriptionId })
                .then((response)=>{
                    let data = response.data;

                    if (data && data.invoice && data.invoice.status) {
                        setInvoice({ ...data.invoice });

                        if (data.invoice.status == 'paid') {
                            setDisplaySuccess(true);
                            setErrorAlert(null);
                        }else{
                            let transaction = { ...data.invoice };
                            transaction = { ...transaction.charge };
                            transaction = { ...transaction.last_transaction };

                            let code = transaction.acquirer_return_code || '0';
                            let message = errorCodes(code);

                            setErrorAlert({ message, delay: 8000 });
                        }
                    }

                    console.log('Pagamento processado com sucesso!', data);

                    setProcessing(false);                
                })
                .catch((err)=>{
                    let error = err;

                    if (error && error.response) error = error.response;
                    if (error && error.data) error = error.data;                    

                    console.error('Erro ao processar pagamento', error);

                    setProcessing(false);                
                });

        } catch(e) {
            let error = e;
            console.error('Erro ao processar retentativa de pagamento', error);
        }    
    };

    const displaySuccessMessage = () => {
        if (displaySuccess) setTimeout(() => { setDisplaySuccess(null); }, 8000);        

        return (
            <div className={`px-3 w-full fixed z-[100] transition-all duration-800 ease-in-out ${displaySuccess ? 'top-1' : '-top-full'}`}>
                <div className="bg-green-100 border border-green-400 text-green-700 px-1 py-3 rounded relative pr-5 sm:px-4" role="alert">
                    <span className="block pr-3 sm:inline sm:pr-0">Sua assinatura foi ativada com sucesso!</span>
                    <span 
                        className="absolute top-0 bottom-0 right-0 px-2 py-3 mr-2"
                        onClick={() => { setDisplaySuccess(null); }}
                    > 
                        <IoClose className="hover:bluePrime w-[24px] h-[24px] cursor pointer" />
                    </span>
                </div>
            </div> 
        )
    }

    const displayErrorMessage = () => {   
        let error = { ...errorAlert };    
        if (error && error.delay) setTimeout(() => { setErrorAlert(null); }, error.delay);        
    
        return(
          <div className={`px-3 w-full fixed z-[100] transition-all duration-800 ease-in-out ${error.message ? 'top-1' : '-top-full'}`}>
            <div className="bg-red-100 border border-red-400 text-red-700 px-1 py-3 rounded relative pr-5 sm:px-4" role="alert">
                <span className="block pr-3 sm:inline sm:pr-0">{error.message}</span>
                <span 
                    className="absolute top-0 bottom-0 right-0 px-2 py-3 mr-2"
                    onClick={() => { setErrorAlert(null); }}
                > 
                    <IoClose className="hover:bluePrime w-[24px] h-[24px] cursor pointer" />
                </span>
            </div>
          </div>  
        );
    };

    useEffect(()=>{
        try {
            if (!encrypted || !processing || !subscriptionId) {
                if (processing) setProcessing(false);
                return;
            }

            axios.post( `${apiUrl}/vida-sulamerica/update-subscription-charge`, { encrypted } )
                .then((response)=>{
                    let data = response.data;

                    if (data && data.invoice && data.invoice.status) {
                        setInvoice({ ...data.invoice });

                        if (data.invoice.status == 'paid') {
                            setDisplaySuccess(true);
                            setErrorAlert(null);
                        }else{
                            let transaction = { ...data.invoice };
                            transaction = { ...transaction.charge };
                            transaction = { ...transaction.last_transaction };

                            let code = transaction.acquirer_return_code || '0';
                            let message = errorCodes(code);

                            setErrorAlert({ message, delay: 8000 });
                        }
                    }

                    console.log('Pagamento processado com sucesso!', data);

                    setProcessing(false);
                    setEncrypted(null);
                })
                .catch((err)=>{
                    let error = err;

                    if (error && error.response) error = error.response;
                    if (error && error.data) error = error.data;

                    console.error('Erro ao processar pagamento', error);

                    setProcessing(false);
                    setEncrypted(null);
                });
        }catch(e){
            console.error('Erro ao carregar dados de pagamento', e);
        }
    }, [encrypted]);    

    useEffect(()=>{
        if (!subscriptionId) return;        

        axios.get(`${apiUrl}/vida-sulamerica/data/get-invoice-data/${subscriptionId}`)
            .then((response) => {
                var { data } = response;

                if (!data || !data.document || !data.subscription || !data.invoice) {
                    console.log("Erro ao carregar dados!");
                    return;
                }

                var {
                    document,
                    subscription,
                    invoice
                } = data;         

                setSubscription(subscription);
                setDocument(document);
                setInvoice(invoice);

                setContractData({plan: document.plan});
            })
            .catch((err) => {
                let error = err;

                if (error && error.response) error = error.response;
                if (error && error.data) error = error.data;                

                console.log('Erro na requisição', error);
            });
    }, []);

    useEffect(()=>{
        try {
            if (!invoice || !invoice.id || !subscriptionId) return;            

            axios.get(`${apiUrl}/vida-sulamerica/data/get-invoice-data/${subscriptionId}`)
                .then((response) => {
                    var { data } = response;

                    if (!data || !data.document || !data.subscription || !data.invoice) {
                        console.log("Erro ao carregar dados!");
                        return;
                    }

                    var {
                        document,
                        subscription,
                    } = data;         

                    setSubscription(subscription);
                    setDocument(document);

                    setContractData({plan: document.plan});
                })
                .catch((err) => {
                    let error = err;

                    if (error && error.response) error = error.response;
                    if (error && error.data) error = error.data;                    

                    console.log('Erro na requisição', error);
                });
        } catch(e){
            console.error('Erro ao atualizar invoice', e);
        }
    }, [invoice]);
    
    console.log('Subscription:', subscription);
    console.log('Invoice:', invoice);  
    console.log('Document:', document);

    console.log('ContractData:', contractData);

    var invoiceData = {
        date: (invoice.cycle) ? invoice.cycle.start_at : "",
        value: (invoice.amount) ? invoice.amount : "",
        cycle: (invoice.cycle) ? invoice.cycle.cycle : ""
    };

    let plan = { ...plans[0] };
    if (document && document.plan && document.plan.id) plan = { ...plans[document.plan.id] };

    try{
        if (invoiceData.date) {
            let date = new Date(invoiceData.date);
            
            if (!date.getTime()){
                invoiceData.date = "";
                return;
            }

            let day = date.getDate().toString().padStart(2, '0');
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let year = date.getFullYear().toString();
          
            invoiceData.date = `${day}/${month}/${year}`;
        }
    }catch(e){
        console.error('Erro ao carregar data da fatura', e);
    }

    try{
        if (invoiceData.value && /^[0-9]{1,}$/.test(invoiceData.value)) {
            invoiceData.value = (parseFloat(invoiceData.value) / 100).toFixed(2);
            invoiceData.value = invoiceData.value.replace('.', ',');
        }else{
            invoiceData.value = "";
        }
    }catch(e){
        console.error('Erro ao carregar valor da fatura', e);
    }

    var subCard = { ...subscription.card };

    var contract = { ...document.plan };

    console.log('errorList', errorList)

    return (
        <div className="InvoicePayment">
            {displaySuccessMessage()}
            {displayErrorMessage()}
            <Helmet>
                <title>Seguro de Vida SulAmérica | Prime Secure Marketplace</title>
                <meta
                    name="description"
                    content="Coberturas que protegem sua renda em casos de doença ou acidente. Simule para conhecer todas as opções de proteções."
                />

                <meta
                    name="keywords"
                    content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Seguro de Vida, SulAmérica, Cobertura de Vida, Plano de Seguro de Vida, Seguro de Vida Individual, Seguro de Vida Familiar, Seguro de Vida para Empresas, Seguro de Vida Online, Seguro de Vida Confiável, Seguro de Vida Personalizado, Seguro de Vida Completo, Proteção Financeira, Segurança Financeira, Benefícios de Seguro de Vida, Seguro de Vida a Termo, Seguro de Vida Integral, Cobertura por Morte Acidental"
                />
                <meta
                    property="og:title"
                    content="Seguro de Vida SulAmérica | Prime Secure Marketplace"
                />
                <meta
                    property="og:description"
                    content="O Plano de Saúde Pet oferece uma ampla rede de clínicas e profissionais qualificados para o bem-estar completo do seu pet."
                />
                <meta
                    property="og:image"
                    content="https://storage.googleapis.com/primesecure/logo-sulamerica-vida.png"
                />
                <meta
                    property="og:url"
                    content="https://primesecure.com.br/cotacao-vida-sulamerica/"
                />
                <link
                    rel="canonical"
                    href="https://primesecure.com.br/cotacao-vida-sulamerica/"
                />
            </Helmet>
            <div className="w-full flex mt-5">
                <img 
                    src="https://storage.googleapis.com/primesecure/logo-sulamerica-vida.png" 
                    alt="Logo SulAmérica Vida" 
                    className={`mx-auto w-[140px] sm:w-[160px]`} 
                /> 
            </div>
            <div
                className="w-full flex flex-wrap justify-center gap-x-[15px] mt-5 sm:mt-8"
            >
                <div
                    className="w-1/2 min-w-[330px] max-w-[420px]"
                >                    
                    <div
                        className="py-[20px] pl-[20px] flex bg-white shadow-petlove-shadow rounded-lg"
                    >
                        
                            <FaUserCircle className="min-w-[34px] w-[34px] min-h-[34px] h-[34px] my-auto text-bluePrime opacity-70" />
                            
                        
                        <div
                            className="w-full ml-[10px] text-[14px]"
                        >
                            <div
                                className="font-semibold h-[17px] leading-[17px] text-[15px] text-left"
                            >
                                {(subscription.customer) ? subscription.customer.name : "" }
                            </div>
                            <div
                                className="font-medium h-[17px] leading-[17px] mt-[2px] text-left"
                            >
                                {(subscription.customer) ? subscription.customer.email : "" }
                            </div>                            
                        </div>                        
                    </div>
                    <div
                        className="p-[20px] my-[15px] bg-white shadow-petlove-shadow rounded-lg"
                    >
                        
                        <div className="w-full rounded-xl mx-auto lg:mx-0 lg:mt-0 order-1 lg:order-2">
                                <div className="rounded-lg h-full flex flex-col">
                                    <div className="mb-2 text-left">
                                        <div className="font-normal font-semibold mb-3">
                                            {plan.headTitle}
                                        </div>
                                        <div className="text-left text-gray-500 text-opacity-80 text-sm font-normal mb-5 leading-4">
                                            {plan.resumeDesc}
                                        </div>
                                        <div className="flex justify-start mb-5">
                                            <div className="flex items-center">
                                                <FontAwesomeIcon
                                                    icon={faMoneyBill}
                                                    className="w-3 h-3 p-1 bg-white rounded-full border border-cyan-500"
                                                />
                                                <div className="ml-2 text-sm">{plan.award}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`text-bluePrime2 text-sm text-start font-extrabold mb-2`}>
                                                Detalhes:
                                            </div>
                                            <div className="text-[10px] sm:text-[11px">
                                                {plan.features.map((feature, idx) => {
                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`flex items-center justify-between py-[1px] px-[5px] bg-[#313131]/5 rounded-lg mb-[8px] flex`}
                                                        >
                                                            <div
                                                                className={`text-left text-grayPrime font-medium py-[3px] px-[8px] flex font-semibold w-full`}
                                                            >
                                                                <div className="w-max my-auto opacity-80]">{feature.label}</div>
                                                                <div className="w-fit my-auto ml-auto text-right break-keep opacity-80">{feature.value}</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="text-left mt-3 mx-1">
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[12px] text-bluePrime hover:text-bluePrime2 font-semibold underline underline-offset-2"
                                            >
                                                Mais detalhes...
                                            </a>
                                        </div>                                         
                                    </div>
                                </div>
                            </div>      

                    </div>
                </div>
                <div
                    className="w-1/2 min-w-[330px] max-w-[420px] "
                >
                    <div
                        className="py-[20px] p-[20px] flex bg-white shadow-petlove-shadow rounded-lg"
                    >
                        <div 
                            className="min-w-[34px] w-[34px] min-h-[34px] h-[34px] my-auto rounded-full bg-[#9EFF7C] overflow-hidden flex"
                        >
                            <FaSyncAlt className="m-auto text-[#FFFFFF] w-[20px] h-[20px]" />
                        </div>
                        <div
                            className="ml-[10px] text-[12px] "
                        >
                            <div
                                className="font-semibold h-[17px] leading-[17px] text-left"
                            >
                                Cobrança - {invoiceData.date}
                            </div>
                            <div
                                className="font-semibold h-[17px] leading-[17px] mt-[2px] text-left"
                            >
                                Valor: R$ {invoiceData.value}
                            </div>                            
                        </div> 
                        <div
                            className={`text-[11px] leading-[10px] py-[8px] px-[10px] rounded-lg ml-auto my-auto font-semibold 
                                ${(invoice.status == 'paid') ? "text-[#4F7F40] bg-[#E4F7C8]" : "text-[#C63737] bg-[#FFCDD2]"}
                            `} 
                        >
                            {(invoice.status == 'paid') ? 'Pago' : 'Falhou'}
                        </div>                       
                    </div>
                    <div
                        className="p-[20px] mt-[15px] bg-white shadow-petlove-shadow rounded-lg"
                    >
                        <div
                            className="flex mb-[20px]"
                        >
                            <div 
                                className="min-w-[34px] w-[34px] min-h-[25px] h-[25px] flex"
                            >
                                <div 
                                    className="min-w-[30px] w-[30px] min-h-[30px] h-[30px] mx-auto rounded-full flex"
                                >
                                    <FaRegCreditCard className="m-auto text-bluePrime w-[26px] h-[26px]" />
                                </div>

                            </div>
                            <div
                                className="w-full ml-[10px] text-[15px] font-bold my-auto text-left"
                            >
                                <div
                                    className="leading-[16px]"
                                >
                                    Pagamento de Fatura 
                                </div>   
                                <div
                                    className="font-semibold text-[11px] text-left opacity-60"
                                >
                                    Recorrência: {invoiceData.cycle} de 12    
                                </div>         
                            </div>                                
                        </div>
                        <div
                            className={`w-full h-[50px] mt-[15px] pl-[15px] pr-[20px] rounded-lg bg-white shadow-petlove-shadow flex border ${paymentMethod == "current-card" ? "border-[#03A8DB] cursor-default" : "border-[#000000]/[0.08] cursor-pointer"}`}
                            onClick={()=>{ 
                                if (paymentMethod != 'current-card' && !processing && invoice.status != 'paid') setPaymentMethod('current-card');                                 
                                if (invoice.status == 'paid') setPaymentMethod('current-card');                                
                            }}
                        >
                            <div
                                className="w-[42px] h-[42px] mr-[5px] my-auto flex"
                            >
                                <CardBrands brand={subCard.brand} />
                            </div>
                            <div
                                className="ml-[5px] text-[13px] font-semibold my-auto"
                            >
                                {subCard.brand}
                            </div>
                            <div
                                className="ml-[15px] text-[13px] font-semibold my-auto flex"
                            >
                                
                                <div className="w-fit h-fit my-auto leading-[10px] mr-[5px] pt-[3px]">****</div> 
                                <div className="">{subCard.last_digits}</div>
                            </div>
                            <div
                                className={`h-[16px] w-[16px] rounded-full ml-auto my-auto flex border-[2px] ${paymentMethod == "current-card" ? "border-[#03A8DB]" : "border-[#000000]/[0.3]"} `} 
                            >
                                <div
                                    className={`h-[8px] w-[8px] rounded-full bg-[#03A8DB] m-auto ${paymentMethod != "current-card" ? "hidden" : ""}`}
                                >                                    
                                </div>
                            </div>
                        </div>
                        <div
                            className={`w-full h-[50px] mt-[10px] pl-[15px] pr-[20px] rounded-lg bg-white shadow-petlove-shadow flex border 
                                ${paymentMethod != "current-card" ? "border-[#03A8DB] cursor-default hidden" : "border-[#000000]/0.08 cursor-pointer"}
                                ${invoice.status == "paid" ? "hidden" : ""}
                            `}
                            onClick={()=>{ 
                                if (paymentMethod != 'new-card' && !processing && invoice.status != 'paid') { 
                                    setPaymentMethod('new-card'); 
                                } 
                                if (invoice.status == 'paid') {
                                    setPaymentMethod('current-card');
                                }
                            }}
                        >
                            <div
                                className={`w-[42px] h-[42px] mr-[5px] my-auto flex`}
                            >
                                <FaRegCreditCard className="m-auto text-[#666666] opacity-80 w-[24px] h-[24px]" />
                            </div>
                            <div
                                className="ml-[5px] text-[13px] font-semibold my-auto text-[#666666]"
                            >
                                Novo cartão de crédito
                            </div>
                            <div
                                className={`h-[16px] w-[16px] rounded-full border-[2px] ml-auto my-auto flex ${paymentMethod != "current-card" ? "border-[#03A8DB]" : "border-[#000000]/[0.3]"}`}
                            >
                                <div
                                    className={`h-[8px] w-[8px] rounded-full bg-[#03A8DB] m-auto ${paymentMethod == "current-card" ? "hidden" : ""}`}
                                >                                    
                                </div>
                            </div>
                        </div>
                        <div
                            className={`w-full mt-[15px] px-[20px] rounded-lg bg-white shadow-petlove-shadow overflow-hidden 
                                ${paymentMethod == "current-card" ? "max-h-0" : "max-h-max border border-[#03A8DB]"} 
                                ${invoice.status == "paid" ? "hidden" : ""}
                            `}
                        >
                            <div
                                className="w-full text-[13px] text-left font-semibold my-3"
                            >
                                Novo Cartão de Crédito
                            </div>
                            <input
                                name="card-name"
                                type="text"
                                className={`w-full px-4 py-1 text-[13px] border-0 ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime placeholder 
                                    ${(errorList.includes('card-name')) ? "ring-alertRed" : "ring-bluePrime"}
                                `}
                                placeholder="Nome Impresso no Cartão"
                                value={cardData.name}
                                onChange={inputHandler}
                            />
                            <InputMask
                                name="card-number"
                                type="text"
                                className={`w-full px-4 py-1 mt-3 text-[13px] border-0 ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime placeholder 
                                    ${(errorList.includes('card-number')) ? "ring-alertRed" : "ring-bluePrime"}
                                `}
                                placeholder="Número do Cartão"
                                mask={"9999 9999 9999 9999"}
                                maskChar={null}
                                value={cardData.number}
                                onChange={inputHandler}
                            />
                            <div
                                className="flex mt-3 gap-3"
                            >
                                <InputMask
                                    name="card-expiration"
                                    type="text"
                                    className={`w-full px-4 py-1 text-[13px] border-0 ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime placeholder 
                                        ${(errorList.includes('card-expiration')) ? "ring-alertRed" : "ring-bluePrime"}
                                    `}
                                    placeholder="Vencimento"
                                    mask={"99/9999"}
                                    maskChar={null}
                                    value={cardData.expiration}
                                    onChange={inputHandler}
                                />
                                <InputMask
                                    name="card-cvv"
                                    type="text"
                                    className={`w-full px-4 py-1 text-[13px] border-0 ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime placeholder 
                                        ${(errorList.includes('card-cvv')) ? "ring-alertRed" : "ring-bluePrime"}
                                    `}
                                    placeholder="CVV"
                                    mask={"999"}
                                    maskChar={null}
                                    value={cardData.cvv}
                                    onChange={inputHandler}
                                />
                            </div>
                            <div
                                className={`w-full mt-4 mb-3 text-center font-medium text-white text-[14px] h-[32px] rounded-[6px] inline-flex items-center transition ease-in-out duration-150 
                                    ${(processing) ? "cursor-not-allowed bg-bluePrime2 hover:bg-bluePrime2 " : "cursor-pointer bg-[#41D134] hover:bg-greenPromo " } 
                                    ${(invoice.status == 'paid') ? "cursor-not-allowed bg-[#313131]/[0.6] hover:bg-[#313131]/[0.6]" : " " }
                                `}
                                onClick={()=>{
                                    if (processing) { return; }
                                    if (invoice && invoice.status == 'paid') { return; }

                                    let valid = true;
                                    let inputs = ['card-name', 'card-number', 'card-expiration', 'card-cvv'];

                                    let errors = [];

                                    for(let i in inputs){
                                        let input = inputs[i];
                                        input = input.replace('card-', '');

                                        if (!validateInput(inputs[i], cardData[input])){
                                            errors.push(inputs[i]);
                                            valid = false;
                                        }
                                    }

                                    setErrorList([...errorList, ...errors]);

                                    if (!valid){ return; }

                                    encryptCard();
                                }}
                            >
                                <div className="flex m-auto">
                                    <LoadingIcon display={(processing && invoice.status != 'paid')} />
                                    {(processing) ? 'Processando' : 'Pagar Fatura'}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`w-full mt-1 text-center font-medium text-white text-[14px] h-[32px] rounded-[6px] inline-flex items-center transition ease-in-out duration-150 
                                ${ (paymentMethod != "current-card") ? "hidden " : "" } 
                                ${ (processing) ? "cursor-not-allowed bg-bluePrime2 hover:bg-bluePrime2 " : "cursor-pointer bg-[#41D134] hover:bg-greenPromo " }      
                                ${ (invoice.status == 'paid') ? "hidden " : " " }                       
                            }`}
                            onClick={()=>{
                                if (processing) { return; }
                                if (invoice && invoice.status == 'paid') { return; }

                                retryPayment();
                            }}
                        >
                            <div className="flex m-auto">
                                <LoadingIcon display={(processing && invoice.status != 'paid')} />
                                {(processing) ? 'Processando' : 'Pagar Fatura'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );

}

export default InvoicePaymentVida;