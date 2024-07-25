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
  constructor() {}

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

  getProgressToken() {
    let token = null;

    let params = functions.getParamsFromUrl();
    if (params && params.p) token = params.p;

    return token;
  }

  setProgressToken(token) {
    if (!token) return null;
    functions.insertParamIntoUrl("p", token);
    
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
      plan_id = "",
      marcaId = "",
      bike_price_id = "",
      id = "",
      marca = "",
      amount = ""
    } = form;

    let errors = [];

    let idPattern = /^[0-9]{1,4}$/;	

    //if (!idPattern.test(plan_id)) errors.push("plan_id");

    if (!idPattern.test(bike_price_id)) errors.push("bike_price_id");

    if (!idPattern.test(id)) errors.push("id");

    if (!idPattern.test(marcaId)) errors.push("marcaId");

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

    try{
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
    }catch(e){
      console.error(e);
    }

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
    
    let errors = [];

    var {
      modality = "",
      year = "",
      serieNumber = ""
    } = form;

    serieNumber = serieNumber.toString().trim();

    if (!functions.validadeYearBike(year)) errors.push("year");

    if (!functions.validateModality(modality)) errors.push("modality");

    if (serieNumber.length < 1 || serieNumber.length > 10) errors.push("serieNumber");

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
      selectedPlanId = {},
      dataBike = {},
      buyerData = {},
      addressData = {},
      cardData = {}
    } = form;

    var {
      plan_id = "",
      marcaId = "",
      bike_price_id = "",
      id = "",
      marca = "",
      amount = ""
    } = selectedPlanId;

    var {
      modality = "",
      year = "",
      serieNumber = ""
    } = dataBike;

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

    let idPattern = /^[0-9]{1,4}$/;	

    //Primeira Etapa

    //if (!idPattern.test(plan_id)) errors.push("plan_id");

    if (!idPattern.test(bike_price_id)) errors.push("bike_price_id");

    if (!idPattern.test(id)) errors.push("id");

    if (!idPattern.test(marcaId)) errors.push("marcaId");

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

    if (!functions.validadeYearBike(year)) errors.push("year");

    if (!idPattern.test(modality)) errors.push("modality");

    if (!serieNumber.length > 1 && serieNumber.length < 16) errors.push("serieNumber");

    //Ultima Etapa

    //if (!functions.validateCreditCardNumber(cardNumber)) errors.push("cardNumber");

    //if (!functions.validateCreditCardName(cardName)) errors.push("cardName");

    //if (!functions.validateCreditCardExpirationDate(expiration)) errors.push("expiration");

    //if (!functions.validateCreditCardCVV(cvv)) errors.push("cvv");

    return errors;    
  }
}