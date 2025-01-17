import { parse } from "path-browserify";

class GlobalFuntions extends Object {
  constructor() {
    super();
    this.pattern = {
      data: /^(\d{2})\/(\d{2})\/(\d{4})$/,
      _data: /^(\d{2})\-(\d{2})\-(\d{4})$/,
      dataAmerica: /^(\d{4})\-(\d{2})\-(\d{2})$/,
      cpf: /^(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})$/,
      celular:
        /^\([0-9]{2}\)\s[0-9]{5}\-[0-9]{4}$|\([0-9]{2}\)\s[0-9]{4}\-[0-9]{5}$/,
      telefone: /^\([0-9]{2}\)\s[0-9]{4}\-[0-9]{4}$/,
      cep: /^[0-9]{5}\-[0-9]{3}$|[0-9]{8}$/,
      destino: /^[1-8]{1}$/,
      creditCard: /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}|[0-9]{16}$/,
      expirationDate: /^(\d{2})\/(\d{4})$|(\d{2})\/(\d{2})$/,
      rg: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}-[0-9X]$/,
    };

    this.listaUF = [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ];
    this.destinos = [
      false,
      "Brasil",
      "América Latina (inclui México)",
      "Europa",
      "Estados Unidos e Canadá",
      "Ásia",
      "África",
      "Oceania",
      "Múltiplos destinos",
    ];
    this.locationsName = {
      Home: "",
      "Seguro Viagem": "primetravel",
      "Seguro Residencial": "seguro-residencial-porto-2",
      "Seguro Pet": "seguro-pet-porto",
      Odonto: "sulamerica-odonto",
      Vida: "seguro-de-vida",
      Celular: "equipamentos-portateis-3",
    };
  }

  getCampaignParams(retunType) {
    var url = window.location.search;
    url = url.substring(1);

    var params = url.split("&");

    var utmParams = {};

    for (let key in params) {
      var [name, value] = params[key].split("=");
      name = name.toLowerCase();

      if (!["utm_source", "utm_medium", "utm_campaign"].includes(name)) {
        continue;
      }

      let decodedValue = decodeURIComponent(value);
      try {
        decodedValue = JSON.parse(decodedValue);
      } catch (error) {
        //Caso ocorre erro, igonarar decode
      }

      utmParams[name] = decodedValue;
    }

    if (retunType == "object") {
      return utmParams;
    }

    params = [];

    for (let utm in utmParams) {
      let value = utmParams[utm];
      params.push(`${utm}=${encodeURIComponent(value)}`);
    }

    params = params.join("&");

    return params;
  }

  getPageSlug() {
    var pathname = window.location.pathname.split("/");

    pathname = pathname.filter((element) => element !== "");
    pathname = pathname[0] || "";

    return pathname.toLocaleLowerCase();
  }

  getPageSlugArray() {
    var result = [];
    var pathname = window.location.pathname.split("/");

    pathname = pathname.filter((element) => element !== "");

    for (let i in pathname) {
      result.push(pathname[i].toLowerCase());
    }

    return result;
  }

  getPageName(slug) {
    slug = slug || "";
    slug = slug.toLocaleLowerCase();

    let name = "";

    for (let s in this.locationsName) {
      let location = this.locationsName[s];

      if (slug == location.toLocaleLowerCase()) {
        name = s;
        break;
      }

      continue;
    }
    return name;
  }

  validateFullName(name) {
    name = name || "";
    name = name.toString().trim();

    if (name.length < 5 || !name.includes(" ")) {
      return false;
    }

    var parts = name.split(" ");
    var count = 0;

    for (let _name of parts) {
      if (_name.length > 1) count++;
    }

    if (count < 1) return false;

    return true;
  }

  validateNameLastName(name) {
    if (typeof name !== "string") return false;
    name = name.trim();

    if (name.length < 5 || !name.includes(" ")) return false;

    name = name.split(" ");

    const firstName = name[0];

    name.shift();

    var lastName = name.join(' ').trim();

    if (firstName.length < 2 || lastName.length < 2) return false;

    return true;
  }

  // validação onde pode somente o primeiro nome, ao reconhecer espaço ou caracteres após o espaço invalida
  validateFirstName(name) {
    if (typeof name !== "string") return false;
    name = name.trim();

    if (name.length < 2 || name.includes(" ")) return false;

    return true;
  }

  _validateName(name) {
    name = name || "";
    name = name.toString().trim();

    if (name.length < 5 || !name.includes(" ")) {
      return false;
    }

    var parts = name.split(" ");
    var count = 0;

    for (let _name of parts) {
      if (_name.length > 1) count++;
    }

    if (count < 1) return false;

    return true;
  }

  validateName(name) {
    name = name || "";
    name = name.toString().trim();

    const parts = name.split(" ");

    // Verifica se o nome tem pelo menos duas partes e cada parte tem pelo menos 3 caracteres
    if (parts.length < 2 || parts.some((part) => part.length < 3)) {
      return false;
    }

    return true;
  }

  validateEmail(email) {
    email = email || "";
    email = email.toString().trim();

    let pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!pattern.test(email)) {
      return false;
    }

    if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
      return false;
    }

    return true;
  }

  validatePassword(password) {
    password = password || "";
    password = password.toString().trim();

    // Verifica se possui pelo menos 8 caracteres, 1 número, 1 letra maiúscula e 1 letra minúscula
    if (
      password.length < 8 ||
      !/[0-9]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      return false;
    }

    // Se a senha passou por todas as verificações, retorna true
    return true;
  }

  validatePhone(phone) {
    phone = phone || "";
    phone = phone.replace(".", "");

    if (this.pattern.celular.test(phone) || this.pattern.telefone.test(phone)) {
      return true;
    }
    return false;
  }

  _validatePhone(phone) {
    phone = phone.replace(/\D/g, "");

    if (phone.length < 10 || phone.length > 11) {
      return false;
    }

    return true;
  }

  validateCellPhone(phone) {
    phone = phone || "";
    phone = phone.replace(/\D/g, "");

    if (phone.length == 11) {
      return true;
    }

    return false;
  }

  validateCPF(cpf) {
    if (!this.pattern.cpf.test(cpf)) {
      return false;
    }

    cpf = cpf.replace(/\D/g, "");

    let soma = 0;
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
      resto = 0;
    }

    if (resto != parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
      resto = 0;
    }

    if (resto != parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  _validateRG(rg) {
    const _rg = rg.replace(/\.|-/g, "");

    if (_rg.length !== 9) {
      return false;
    }

    const digit = parseInt(_rg.charAt(8), 10);

    let sum = 0;

    for (let i = 0; i < 8; i++) {
      sum += parseInt(_rg.charAt(i), 10) * (9 - i);
    }

    const _digit = sum % 11;

    return digit === _digit;
  }

  validateRG(rg) {
    rg = rg || "";
    return this.pattern.rg.test(rg);
  }

  validateCEP(cep) {
    cep = cep || "";
    cep = cep.replace(/\D/g, "");

    if (cep.length < 8) {
      return false;
    }

    return true;
  }

  validateCity(city) {
    return typeof city === "string" && /^.{2,50}$/.test(city);
  }

  validateStreet(street) {
    return typeof street === "string" && /^.{2,60}$/.test(street);
  }

  validateStreetNumber(number) {
    if (typeof number !== "string" && typeof number !== "number") {
      return false;
    }

    return /^.{1,20}$/.test(number);
  }

  validateComplement(complement) {
    return /^.{0,35}$/.test(complement);
  }

  validateNeighborhood(neighborhood) {
    return typeof neighborhood === "string" && /^.{1,40}$/.test(neighborhood);
  }

  validateStateUF(uf) {
    uf = uf || "";

    if (!this.listaUF.includes(uf.toUpperCase())) {
      return false;
    }

    return true;
  }

  validadeYearBike(year) {
    year = year || "";
    year = year.toString().replace(/\D/g, "");

    if (!/^[0-9]{4}$/.test(year)) {
      return false;
    }

    var _year = new Date().getFullYear();
    year = parseInt(year);

    if (_year < year) {
      return false;
    }

    return true;
  }

  validateModality(modality) {
    // verificar se a modalidade foi selecionada se não for retorna falso
    if (!modality || !/^[1-6]{1}$/.test(modality)) {
      return false;
    }

    modality = parseInt(modality);

    return modality >= 1 && modality <= 6;
  }

  validateSerialNumberBike(serieNumber) {
    if (typeof serieNumber !== "string") {
      // Retorna falso ou trata como quiser quando serieNumber não é uma string
      return false;
    }
    // Agora é seguro chamar .trim() porque garantimos que serieNumber é uma string
    const trimmedSerieNumber = serieNumber.trim();
    return trimmedSerieNumber.length >= 1 && trimmedSerieNumber.length <= 10;
  }

  validateCreditCardName(name) {
    name = name || "";

    if (!name || !name.includes(" ")) {
      return false;
    }

    let parts = name.split(" ");
    let count = 0;
    let valid = true;

    for (let _name of parts) {
      if (_name.length > 1) count++;
      if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        valid = false;
      }
    }

    return count > 1 && valid;
  }

  validateCreditCardNumber(numero) {
    if (!this.pattern.creditCard.test(numero)) {
      return false;
    }
    numero = numero.replace(/[^0-9]+/g, "").toString();

    let soma = 0;
    let dobrar = false;

    for (let i = numero.length - 1; i >= 0; i--) {
      let digito = parseInt(numero.charAt(i), 10);

      if (dobrar) {
        if ((digito *= 2) > 9) {
          digito -= 9;
        }
      }

      soma += digito;
      dobrar = !dobrar;
    }

    if (soma % 10 != 0) {
      return false;
    }

    return true;
  }

  validateCreditCardExpirationDate(expirationDate) {
    let pattern_A = /^(\d{2})\/(\d{4})$/;
    let pattern_B = /^(\d{2})\/(\d{2})$/;

    if (!pattern_A.test(expirationDate) && !pattern_B.test(expirationDate)) {
      return false;
    }

    let today = new Date().toISOString().split("T")[0];

    let [, currentYear, currentMonth, currentDay] =
      /^(\d{4})\-(\d{2})\-(\d{2})$/.exec(today);

    let [month, year] = expirationDate.split("/");

    if (year.length == 2) {
      year = `20${year}`;
    }

    if (parseInt(month) < 1 || parseInt(month) > 12) {
      return false;
    }

    if (parseInt(currentYear) > parseInt(year)) {
      return false;
    }

    if (
      parseInt(currentYear) == parseInt(year) &&
      parseInt(currentMonth) > parseInt(month)
    ) {
      return false;
    }

    return true;
  }

  validateCreditCardCVV(cvv) {
    cvv = cvv || "";
    cvv = cvv.toString();

    if (/^[0-9]{3,4}$/.test(cvv)) {
      return true;
    }

    return false;
  }

  refactoryDate(date, format, output) {
    date = date || "";
    format = format || "";
    output = output || "";

    if (!date || !format || !output) {
      return date;
    }

    if (typeof format !== "string" || typeof output !== "string") {
      return date;
    }

    var error = false;
    var validation = [];

    for (const char of format) {
      if (["D", "M", "Y"].includes(char) && !validation.includes(char)) {
        validation.push(char);
      }
    }

    if (validation.length !== 3) {
      return date;
    }

    validation = [];

    for (const char of output) {
      if (["D", "M", "Y"].includes(char) && !validation.includes(char)) {
        validation.push(char);
      }
    }

    if (validation.length !== 3) {
      return date;
    }

    var separator = "";

    for (const char of format) {
      if (!["D", "M", "Y"].includes(char)) {
        separator = char;
        break;
      }
    }

    const _in = date.split(separator);

    for (const char of output) {
      if (!["D", "M", "Y"].includes(char)) {
        separator = char;
        break;
      }
    }

    var _format = "";
    var _output = "";
    var result = [];

    for (const char of format) {
      if (!["D", "M", "Y"].includes(char)) {
        continue;
      }

      if (_format.includes(char)) {
        continue;
      }

      _format += char;
    }

    for (const char of output) {
      if (!["D", "M", "Y"].includes(char)) {
        continue;
      }

      if (_output.includes(char)) {
        continue;
      }

      _output += char;
    }

    for (let i = 0; i < 3; i++) {
      let index = _output.indexOf(_format[i]);

      if (index < 0) {
        continue;
      }

      result[i] = _in[index];
    }

    return result.join(separator);
  }

  _refactoryDate(date, format, output) {
    if (!date) {
      return "";
    }

    let separator = "";

    for (const char of format) {
      if (!["D", "M", "Y"].includes(char)) {
        separator = char;
        break;
      }
    }

    const parts = date.split(separator);

    const formatIndex = {
      day: format.indexOf("D"),
      month: format.indexOf("M"),
      year: format.indexOf("Y"),
    };

    if (
      formatIndex.day < formatIndex.month &&
      formatIndex.day < formatIndex.year
    ) {
      formatIndex.day = 0;
    }

    if (
      formatIndex.day < formatIndex.year &&
      formatIndex.day < formatIndex.month
    ) {
      formatIndex.day = 0;
    }

    if (
      formatIndex.month < formatIndex.day &&
      formatIndex.month < formatIndex.year
    ) {
      formatIndex.month = 1;
    }

    if (
      formatIndex.month < formatIndex.year &&
      formatIndex.month < formatIndex.day
    ) {
      formatIndex.month = 1;
    }

    if (
      formatIndex.year < formatIndex.day &&
      formatIndex.year < formatIndex.month
    ) {
      formatIndex.year = 2;
    }

    if (
      formatIndex.year < formatIndex.month &&
      formatIndex.year < formatIndex.day
    ) {
      formatIndex.year = 2;
    }

    const outputIndex = {
      day: output.indexOf("D"),
      month: output.indexOf("M"),
      year: output.indexOf("Y"),
    };

    for (const char of output) {
      if (!["D", "M", "Y"].includes(char)) {
        separator = char;
        break;
      }
    }

    if (
      outputIndex.day < outputIndex.month &&
      outputIndex.month < outputIndex.year
    ) {
      return [parts[0], parts[1], parts[2]].join(separator);
    }

    if (
      outputIndex.day < outputIndex.year &&
      outputIndex.year < outputIndex.month
    ) {
      return [parts[0], parts[2], parts[1]].join(separator);
    }

    if (
      outputIndex.month < outputIndex.day &&
      outputIndex.day < outputIndex.year
    ) {
      return [parts[1], parts[0], parts[2]].join(separator);
    }

    if (
      outputIndex.month < outputIndex.year &&
      outputIndex.year < outputIndex.day
    ) {
      return [parts[1], parts[2], parts[0]].join(separator);
    }

    if (
      outputIndex.year < outputIndex.day &&
      outputIndex.day < outputIndex.month
    ) {
      return [parts[2], parts[0], parts[1]].join(separator);
    }

    if (
      outputIndex.year < outputIndex.month &&
      outputIndex.month < outputIndex.day
    ) {
      return [parts[2], parts[1], parts[0]].join(separator);
    }

    return date;
  }

  calculateAge(date) {
    if (!date) {
      return -1;
    }

    const today = new Date();
    const birthDate = new Date(date);

    if (!birthDate.getTime()) {
      return -1;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  calculateFullAge(date) {
    if (!date) {
      return -1;
    }

    const today = new Date();
    const birthDate = new Date(date);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return {
      years: years,
      months: months,
      days: days
    };
  }

  validateDate(date) {
    if (!date) {
      return false;
    }

    if (!this.pattern.data.test(date)) {
      return false;
    }

    date = this.refactoryDate(date, "DD/MM/YYYY", "YYYY-MM-DD");

    if (isNaN(new Date(date).getTime())) {
      return false;
    }

    return true;
  }

  getParamsFromObj(obj) {
    for (const _key in obj) if (!obj[_key]) delete obj[_key];

    const params = Object.entries(obj)
      .map(([key, value]) => {
        if (Array.isArray(value)) value = JSON.stringify(value);
        if (typeof value === 'object') value = JSON.stringify(value);

        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');

    return params;
  }

  getParamsFromUrl() {
    var url = window.location.search;
    url = url.substring(1);

    if (!url) return {};

    const paramsArray = url.split('&');
    const obj = {};

    paramsArray.forEach((param) => {
      const [key, value] = param.split('=');
      let decodedValue = decodeURIComponent(value);
      let valid = true;

      try { decodedValue = JSON.parse(decodedValue); } catch (error) { }

      if (typeof decodeURIComponent(key) !== 'string' || decodeURIComponent(key).length == 0) valid = false;
      if (typeof decodedValue !== 'string' || decodedValue.length == 0) valid = false;

      if (valid) obj[decodeURIComponent(key)] = decodedValue;
    });

    return obj;
  }

  setPathFromParams(path, params) {
    if (!path) return "";
    if (typeof params !== "object") return path;

    let _params = this.getParamsFromObj(params);
    if (typeof _params === 'string' && _params.length > 0) path += `?${_params}`;

    return path;
  }

  insertParamIntoUrl(key, value) {
    let newUrl = new URL(window.location.href);
    newUrl.searchParams.set(key, value);
    window.history.replaceState(null, '', newUrl);
  }

  updateUrlFromObj(obj) {
    const params = this.getParamsFromObj(obj);
    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = baseUrl + '?' + params;
    window.history.replaceState(null, '', newUrl);
  }

  applyDocumentMask(value, mask) {
    if (typeof value !== 'string' || typeof mask !== 'string') return value;

    value = value.replace(/\D/g, "");

    if (value.length > mask.replace(/[^#]/g, "").length) value = value.slice(0, mask.replace(/[^#]/g, "").length);
    if (value.length < mask.replace(/[^#]/g, "").length) mask = mask.slice(0, value.length);

    for (let i = 0; i < value.length; i++) mask = mask.replace(/#/, value[i]);

    return mask;
  }
}

export default GlobalFuntions;
