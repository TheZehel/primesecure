import GlobalFuntions from "../../../../globalsubcomponentes/globalFunctions";
const functions = new GlobalFuntions();

export default class ValidateSteps {
  constructor() {}

  validateFirstStep(name, email, phone, cpf, rg, birth, check, header) {
    var errorListTemp = [];

    var userData = { name, email, phone, cpf, rg, birth, check, header };

    const currentData = { ...JSON.parse(sessionStorage.getItem("formData")) };

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
    if (!functions.validateName(_name)) errorListTemp.push("name");
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
}
