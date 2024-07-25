import GlobalFuntions from "../../../../globalsubcomponentes/globalFunctions";
const functions = new GlobalFuntions();

const {
    validateName,
    _validateName,
    validateEmail,
    validatePhone,
    validateCPF,
    validateDate,
    calculateAge,
    validateRG,
    _validateRG,
    validateCEP,
    validateCity,
    validateStreet,
    validateStreetNumber,
    validateComplement,
    validateNeighborhood,
    validateStateUF,
    validateYearBike,
    validadeYearBike,
    validateCreditCardExpirationDate,
    validateCreditCardCVV,
    validateCreditCardNumber,
    validateCreditCardName
} = functions;

export default class ValidateSteps {
    constructor() { }

    getDebugToken() {
        let token = null;
    
        let params = functions.getParamsFromUrl();
        if (params && params.t) token = params.t;
    
        return token;
      }
    
      setDebugToken(token) {
        if (!token) return null;
        functions.insertParamIntoUrl("t", token);
        
        return true;
      }

    validateFirstStep(name, email, phone, cpf, rg, birth, check, header) {
        var errorListTemp = [];

        var userData = { name, email, phone, cpf, rg, birth, check, header };

        const currentData = { ...JSON.parse(sessionStorage.getItem("bikeFormData")) };

        if (header) {
            userData = { ...userData, ...currentData.userData };
        }

        var {
            name: _name,
            email: _email,
            phone: _phone,
            cpf: _cpf,
            rg: _rg,
            birth: _birth,
            check: _check,
        } = userData;

        // Validar Nome
        if (!functions.validateNameLastName(_name)) errorListTemp.push("name");
        // Validar Email
        if (!functions.validateEmail(_email)) errorListTemp.push("email");
        // Validar Telefone
        if (!functions.validatePhone(_phone)) errorListTemp.push("phone");
        // Validar CPF
        if (!functions.validateCPF(_cpf)) errorListTemp.push("cpf");
        // Validar RG
        if (!functions.validateRG(_rg)) errorListTemp.push("rg");
        // Verificar Checkbox
        if (!_check) errorListTemp.push("check");

        var birthday = functions.refactoryDate(_birth, "DD/MM/YYYY", "YYYY-MM-DD");
        if (isNaN(new Date(birthday).getTime())) errorListTemp.push("birth");

        return errorListTemp;
    }

    validateFirstStep(form) {
        var {
            amount,
            brand_id,
            id,
            marca,
            model_id,
            plan,
            plan_code,
            plan_name,
            precoPhone,
        } = form;

        let errors = [];

        if (!amount) errors.push("amount");
        
        if (!/^[0-9]{1,}$/.test(id)) errors.push("id");
        
        if (!marca || typeof marca !== 'string') errors.push("marca");
        
        if (!/^[0-9]{1,}$/.test(model_id)) errors.push("model_id");
        
        if (!plan_code || typeof plan_code !== 'string') errors.push("plan_code");
       
        if (!plan_name || typeof plan_name !== 'string') errors.push("plan_name");
        
        if (!/^[0-9]{1,}$/.test(precoPhone)) errors.push("precoPhone");

        //if (!plan || !plan.id) errors.push("plan_id");

        //if (typeof plan !== 'object') errors.push("plan");
        //if (typeof plan === 'object') {
        //    let { code, id } = { ...plan };
        //    
        //    if (!/^[0-9]{1,}$/.test(code)) errors.push("plan_code");
        //    
        //    if (!/^[0-9]{1,}$/.test(id)) errors.push("plan_id");
        //},
        console.log(errors);    

        return errors;
    }

    validateSecondStep(form) {
        var errors = [];

        var {
            cpf = "",
            email = "",
            name = "",
            phone = "",
            birth = "",
            rg = "",
            check = false
        } = form;

        if (!functions.validateCPF(cpf)) errors.push("cpf");

        if (!functions.validateEmail(email)) errors.push("email");

        if (!functions.validateNameLastName(name)) errors.push("name");

        if (!functions.validatePhone(phone)) errors.push("phone");

        if (!functions.validateDate(birth)) errors.push("birth");

        if (!errors.includes('birth')) {
            let _birth = functions.refactoryDate(birth, "DD/MM/YYYY", "YYYY-MM-DD");
            let age = functions.calculateAge(_birth);

            if (age < 18) errors.push("age");
        }

        if (!functions.validateRG(rg)) errors.push("rg");

        if (!check) errors.push("check");

        return Array.isArray(errors) ? errors : [];
    }

    validateThirdStep(form) {
        var errors = [];

        var {
            state = "",
            address = "",
            city = "",
            neighborhood = "",
            number = "",
            cep = "",
            complement = ""
        } = form;

        if (!functions.validateStateUF(state)) errors.push("state");

        if (!functions.validateCity(city)) errors.push("city");

        if (!functions.validateStreet(address)) errors.push("address");

        if (!functions.validateStreetNumber(number)) errors.push("number");

        if (!functions.validateCEP(cep)) errors.push("cep");

        if (!functions.validateComplement(complement)) errors.push("complement");

        if (!functions.validateNeighborhood(neighborhood)) errors.push("neighborhood");

        return Array.isArray(errors) ? errors : [];
    }

    validateFourthStep(form) {
        let idPattern = /^[0-9]{1,4}$/;
        let imeiPattern = /^[0-9]{15}$/;

        let errors = [];

        var {
            celNumber: cellphone = "",
            imei = "",
            nf = ""
        } = form;

        if (!functions.validatePhone(cellphone)) errors.push("cellphone");

        if (!imeiPattern.test(imei)) errors.push("imei");

        try {
            if (/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(nf)) { 
                let nf_date = functions.refactoryDate(nf, "DD/MM/YYYY", "YYYY-MM-DD");
                nf_date = new Date(nf_date);
    
                if (nf_date.getTime() > 0) {
                //if (functions.validateDate(nf)) {
                    let today = new Date();
    
                    if (nf_date.getTime() > today.getTime()) errors.push("nf");
                } else { errors.push("nf"); } 
            } else { errors.push("nf"); } 
        } catch(e) { }

        return errors;
    }

    validateFifthStep(form) {
        var errors = [];

        var {
            number: cardNumber,
            name: cardName,
            expiration,
            cvv
        } = form;

        if (!functions.validateCreditCardNumber(cardNumber)) errors.push("card-number");

        if (!functions.validateCreditCardName(cardName)) errors.push("card-name");

        if (!functions.validateCreditCardExpirationDate(expiration)) errors.push("card-expiration");

        if (!functions.validateCreditCardCVV(cvv)) errors.push("card-cvv");

        return errors;
    }

    validatePayload(form) {
        var errors = [];

        var {
            selectedPlan = {},
            dataPhone = {},
            buyerData = {},
            addressData = {},
            cardData = {}
        } = form;

        var {
            id: product_id = ""
        } = selectedPlan;

        var {
            celNumber: cellphone = "",
            imei = "",
            nf = ""
        } = dataPhone;

        var {
            state = "",
            address = "",
            city = "",
            neighborhood = "",
            number = "",
            cep = "",
            complement = ""
        } = addressData;

        var {
            cpf = "",
            email = "",
            name = "",
            phone = "",
            birth = "",
            rg = "",
            check = false
        } = buyerData;


        var {
            number: cardNumber,
            name: cardName,
            expiration,
            cvv
        } = cardData;

        let idPattern = /^[0-9]{1,11}$/;
        let imeiPattern = /^[0-9]{15}$/;

        //Primeira Etapa
        //console.log(product_id)
        if (!idPattern.test(product_id)) errors.push("product_id");

        //Segunda Etapa

        if (!functions.validateCPF(cpf)) errors.push("cpf");

        if (!functions.validateEmail(email)) errors.push("email");

        if (!functions.validateNameLastName(name)) errors.push("name");

        if (!functions.validatePhone(phone)) errors.push("phone");

        if (!functions.validateDate(birth)) errors.push("birth");

        if (!errors.includes('birth')) {
            let _birth = functions.refactoryDate(birth, "DD/MM/YYYY", "YYYY-MM-DD");
            let age = functions.calculateAge(_birth);

            if (age < 18) errors.push("age");
        }

        if (!functions.validateRG(rg)) errors.push("rg");

        if (!check) errors.push("check");

        //Terceira Etapa

        if (!functions.validateStateUF(state)) errors.push("state");

        if (!functions.validateCity(city)) errors.push("city");

        if (!functions.validateStreet(address)) errors.push("address");

        if (!functions.validateStreetNumber(number)) errors.push("number");

        if (!functions.validateCEP(cep)) errors.push("cep");

        if (!functions.validateComplement(complement)) errors.push("complement");

        if (!functions.validateNeighborhood(neighborhood)) errors.push("neighborhood");

        //Quarta Etapa

        if (!functions.validatePhone(cellphone)) errors.push("cellphone");

        if (!imeiPattern.test(imei)) errors.push("imei");

        if (/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(nf)) { 
            let nf_date = functions.refactoryDate(nf, "DD/MM/YYYY", "YYYY-MM-DD");
            nf_date = new Date(nf_date);

            if (functions.validateDate(nf)) {
                let today = new Date();

                if (nf_date.getTime() > today.getTime()) errors.push("nf");
            } else { errors.push("nf"); } 
        } else { errors.push("nf"); } 

        //if (!serieNumber.length > 1 && serieNumber.length < 16) errors.push("serieNumber");

        //Ultima Etapa

        //if (!functions.validateCreditCardNumber(cardNumber)) errors.push("cardNumber");

        //if (!functions.validateCreditCardName(cardName)) errors.push("cardName");

        //if (!functions.validateCreditCardExpirationDate(expiration)) errors.push("expiration");

        //if (!functions.validateCreditCardCVV(cvv)) errors.push("cvv");

        return errors;
    }
}