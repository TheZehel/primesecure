import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const paymentErrorCodes = (code) => {
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
    };

    return 'Houve um problema ao processar seu pagamento. Por favor, tente novamente mais tarde.';
}

const alertCode = (code, data) => {
    var message = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';

    switch(code) {
        case 'recaptcha-invalid':
        case 'recaptcha-failed':
        case 'recaptcha-error':
            message = 'Não foi possível verificar sua ação de forma segura. Por favor, clique em "Não sou um robô" e tente novamente.';
            break;
        case 'name':
            message = 'Verifique se o campo "Nome" foi preenchido corretamente.';
            break;
        case 'email':
            message = 'Verifique se o campo "E-mail" foi preenchido corretamente.';
            break;
        case 'cpf':
            message = 'Verifique se o campo "CPF" foi preenchido corretamente.';
            break;
        case 'phone':
            message = 'Verifique se o campo "Telefone" foi preenchido corretamente.';
            break;
        case 'birthday':
            message = 'Verifique se o campo "Data de nascimento" foi preenchido corretamente.';
            break;
        case 'age':
            message = 'Você deve ter pelo menos 18 anos para fazer a contratação do seguro.';
            break;
        case 'weight':
            message = 'Verifique se o campo "Peso" foi preenchido corretamente.';
            break;
        case 'height':
            message = 'Verifique se o campo "Altura" foi preenchido corretamente.';
            break;
        case 'user-data':
            message = 'Verifique se todos os campos foram preenchidos corretamente na primeira etapa.';
            break;

        case 'plan-id':
            message = 'Selecione um plano para continuar com a contratação.';
            break;

        case 'zipcode':
            message = 'Verifique se o campo "CEP" foi preenchido corretamente na etapa de Endereço.';
            break;
        case 'city':
            message = 'Verifique se o campo "Cidade" foi preenchido corretamente na etapa de Endereço.';
            break;
        case 'address':
            message = 'Verifique se o campo "Endereço" foi preenchido corretamente na etapa de Endereço.';
            break;
        case 'number':
            message = 'Verifique se o campo "Número" foi preenchido corretament na etapa de Endereço.';
            break;
        case 'complement':
            message = 'Verifique se o campo "Complemento" foi preenchido corretamente na etapa de Endereço.';
            break;
        case 'neighborhood':
            message = 'Verifique se o campo "Bairro" foi preenchido corretamente na etapa de Endereço.';
            break;
        case 'state':
            message = 'Verifique se o campo "Estado" foi preenchido corretamente na etapa de Endereço.';
            break;
        case 'address-data':
            message = 'Verifique se todos os campos foram preenchidos corretamente na etapa de Endereço.';
            break;

        case 'period-invalid':
        case 'method-invalid':
            message = 'Selecione uma forma de pagamento para continuar com a contratação.';
            break;

        case 'decrypt':
        case 'decrypt-card':
        case 'pagarme-error':
        case 'payment-error':
            message = 'Ocorreu um erro ao processar seu pagamento. Por favor, verifique seus dados e tente novamente.';
            break;

        case 'card-name':
            message = 'Verifique se o nome impresso no cartão foi inserido corretamente.';
            break;
        case 'card-number':
            message = 'Verifique se o número do cartão de crédito foi inserido corretamente.';
            break;
        case 'card-expiration':
            message = 'Verifique se a data de validade do cartão foi inserida corretamente.';
            break;
        case 'card-cvv':
            message = 'Verifique se o CVV do cartão foi inserido corretamente.';
            break;
        
        case 'payment-failed':
            message = null;
            break;
            
        case 'payload-build-error':
        case 'soap-request-error':
            message = 'Ocorreu um erro inesperado durante a contratação do seguro.';
            break;        
    }

    if (data && (data.charges || data.invoices)) {
        let purchase = data.charges || data.invoices;
        purchase = { ...purchase[0] };

        console.log(purchase);

        let { last_transaction } = purchase;
        
        if (last_transaction && last_transaction.acquirer_return_code) {
            let code = last_transaction.acquirer_return_code;

            message = paymentErrorCodes(code);
        }
    }

    if (!message) {
        message = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
    }

    return message;
}

export default function DisplayMessage({ alert, messages, data }) {
    const [showAlert, setShowAlert] = useState(true);

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

    console.log(messageArray, data);

    return (
        <div className={`px-3 w-full fixed z-[100] transition-all duration-700 ease-in-out ${(messages.length > 0 && showAlert) ? "top-1" : "-top-full"}`} >
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