class PagarMeFunctions extends Object {
    constructor(){
        super();
    }

    errorMessages(transaction){
        let return_code = transaction.acquirer_return_code || false;
        let gateway_response = transaction.gateway_response;

        let messages = [
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

        if (!return_code){
            return messages[1];
        }
        
        //if (antifraud.status == "reproved"){ 
        //    return messages[0];
        //} 
    
        if (gateway_response && gateway_response.code != "200"){ 
            return messages[1]; 
        }   
    
        if (return_code == "1000"){ 
            return messages[5]; 
        }
    
        if (return_code == "1001"){ 
            return messages[7]; 
        }
    
        if (return_code == "1004"){ 
            return messages[9]; 
        }
    
        if (return_code == "1007"){ 
            return messages[5]; 
        }
    
        if (return_code == "1009"){ 
            return messages[10]; 
        }
    
        if (return_code == "1016"){ 
            return messages[3]; 
        }
    
        if (return_code == "1019"){ 
            return messages[5]; 
        }
    
        if (return_code == "1022"){ 
            return messages[5]; 
        }
    
        if (return_code == "1025"){ 
            return messages[6]; 
        }
    
        if (return_code == "1035"){ 
            return messages[5]; 
        }
    
        if (return_code == "1040"){ 
            return  messages[5]; 
        }
    
        if (return_code == "1045"){ 
            return messages[7]; 
        }
    
        if (return_code == "9200"){ 
            return messages[5];  
        }
    
        if (return_code == "9201"){ 
            return messages[11];  
        }
        
        if (return_code == "9113"){ 
            return messages[4]; 
        }

        return messages[1];
    }

}

export default PagarMeFunctions;