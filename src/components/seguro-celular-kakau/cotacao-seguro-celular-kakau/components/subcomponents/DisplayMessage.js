import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const alertCode = (code, data) => {
    var message = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';

    switch(code) {
        case 'recaptcha-invalid':
        case 'recaptcha-failed':
        case 'recaptcha-error':
            message = 'Não foi possível verificar sua ação de forma segura. Por favor, clique em "Não sou um robô" e tente novamente.';
            break;
        case 'recaptcha-expired':
            message = 'Por favor, clique em "Não sou um robô" para finalizar a contratação.';
            break;

        case 'bike_plan_id':
        case 'bike_brand_id':
        case 'plan_id':
        case 'bike_data':
            message = 'Ocorreu um erro ao processar os dados da contratação, verifique se a primeira etapa foi preenchida corretamente.';
            break;
        case 'bike-year':
        case 'bike-model':
        case 'bike_serial_number':
            message = 'Ocorreu um erro ao processar os dados da contratação, verifique se a quarta etapa foi preenchida corretamente.';
            break;

        case 'name':
            message = 'Verifique se o campo "Nome" foi preenchido corretamente na segunda etapa.';
            break;
        case 'email':
            message = 'Verifique se o campo "E-mail" foi preenchido corretamente na segunda etapa.';
            break;
        case 'cpf':
            message = 'Verifique se o campo "CPF" foi preenchido corretamente na segunda etapa.';
            break;
        case 'phone':
            message = 'Verifique se o campo "Telefone" foi preenchido corretamente na segunda etapa.';
            break;
        case 'birthday':
            message = 'Verifique se o campo "Data de nascimento" foi preenchido corretamente na segunda etapa.';
            break;
        case 'underage':
            message = 'Você deve ter pelo menos 18 anos para fazer a contratação do seguro.';
            break;
        case 'customer_data':
            message = 'Verifique se todos os campos foram preenchidos corretamente na segunda etapa.';
            break;

        case 'zipcode':
            message = 'Verifique se o campo "CEP" foi preenchido corretamente na terceira etapa.';
            break;
        case 'city':
            message = 'Verifique se o campo "Cidade" foi preenchido corretamente na terceira etapa.';
            break;
        case 'street':
            message = 'Verifique se o campo "Endereço" foi preenchido corretamente na terceira etapa.';
            break;
        case 'number':
            message = 'Verifique se o campo "Número" foi preenchido corretament na terceira etapa.';
            break;
        case 'complement':
            message = 'Verifique se o campo "Complemento" foi preenchido corretamente na terceira etapa.';
            break;
        case 'neighborhood':
            message = 'Verifique se o campo "Bairro" foi preenchido corretamente na terceira etapa.';
            break;
        case 'state':
            message = 'Verifique se o campo "Estado" foi preenchido corretamente na terceira etapa.';
            break;
        case 'address_data':
            message = 'Verifique se todos os campos foram preenchidos corretamente na terceira etapa.';
            break;

        case 'period-invalid':
        case 'method-invalid':
            message = 'Selecione uma forma de pagamento para continuar com a contratação.';
            break;

        case 'decrypt':
        case 'cc_data':
        case 'payment_data':
            message = 'Ocorreu um erro ao processar seu pagamento. Por favor, verifique seus dados e tente novamente.';
            break;

        case 'cc_name':
            message = 'Verifique se o nome impresso no cartão foi inserido corretamente.';
            break;
        case 'cc_number':
            message = 'Verifique se o número do cartão de crédito foi inserido corretamente.';
            break;
        case 'cc_expiration':
            message = 'Verifique se a data de validade do cartão foi inserida corretamente.';
            break;
        case 'cc_cvv':
            message = 'Verifique se o CVV do cartão foi inserido corretamente.';
            break;
            
        case 'payload_data':
        case 'api_error':
        case 'api_data':
            message = 'Ocorreu um erro inesperado durante a contratação do seguro.';
            break;    
            
        case 'cpf-in-use':
            message = 'O CPF informado já está vinculado a outra conta de e-mail.';
            break;
        case 'email-in-use':
            message = 'O e-mail informado já está vinculado a outro CPF.';
            break;
        case 'imei-in-use':
            message = 'O IMEI informado já está vinculado a outra apólice.';
            break;
        case 'imei-invalid':
        case 'invalid-model_id':
        case 'error-imei-validation':
            message = 'Verifique se o IMEI do aparelho foi inserido corretamente e corresponde com o modelo selecionado.';
            break;

        case 'invalid-coupon':
            message = 'O cupom informado não é válido.';
            break;
    }

    if (!message) message = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';

    return message;
}

export default function DisplayMessage({ alert, messages, data }) {
    const [showAlert, setShowAlert] = useState(true);

    if (messages.length > 1) messages = [ messages[0] ];

    let style = "bg-red-100 border-red-400 text-red-700";
    let messageArray = [];

    if (alert == "success") {
        style = "bg-green-100 border-green-400 text-green-700";

        for(let i in messages) {
            let message = messages[i];
            messageArray.push(message);
        }
    }else{
        for(let i in messages) {
            let code = messages[i];
            let purchase = code == 'payment-failed' ? data : null;
            let message = alertCode(code, purchase);

            messageArray.push(message);
        }
    }

    //console.log(messageArray, data);

    return (
        <div className={`px-3 w-full fixed z-[100] transition-all duration-700 ease ${(messages.length > 0 && showAlert) ? "top-1" : "-top-full"}`} >
            <div className={`border px-1 py-3 rounded relative pr-5 sm:px-4 ${style}`} role="alert" >
                { 
                    messageArray.map((message, index) => {
                        return (
                            <div key={index} className="block pr-3 sm:inline sm:pr-0">{message}</div>
                        );
                    })
                }                    
                <span
                    className="absolute top-0 bottom-0 right-0 px-2 py-3"
                    onClick={() => { setShowAlert(null); }}
                >
                    <IoClose className="hover:bluePrime w-[24px] h-[24px] cursor-pointer" />
                </span>
            </div>
        </div>
    );
}