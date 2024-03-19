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
      creditCard: /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
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

    if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
      return false;
    }

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
    return /^.{2,50}$/.test(city);
  }

  validateStreet(street) {
    return /^.{2,60}$/.test(street);
  }

  validateStreetNumber(number) {
    return /^.{1,20}$/.test(number);
  }

  validateComplement(complement) {
    return /^.{0,35}$/.test(complement);
  }

  validateNeighborhood(neighborhood) {
    return /^.{1,33}$/.test(neighborhood);
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
    year = year.replace(/\D/g, "");

    if (year.length != 4) {
      return false;
    }

    return true;
  }

  validateModality(modality) {
    // verificar se a modalidade foi selecionada se não for retorna falso
    return modality >= "1" && modality <= "6";
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
    if (/^[0-9]{3,4}$/.test(cvv)) {
      return true;
    }

    return false;
  }

  refactoryDate(date, format, output) {
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
}

export default GlobalFuntions;
