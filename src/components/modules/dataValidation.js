class DataValidation extends Object {
  constructor() {
    super();
    this.pattern = {
      data: /^(\d{2})\/(\d{2})\/(\d{4})$/,
      _data: /^(\d{2})\-(\d{2})\-(\d{4})$/,
      dataAmerica: /^(\d{4})\-(\d{2})\-(\d{2})$/,
      cpf: /^(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})$/,
      celular: /^\([0-9]{2}\)\s[0-9]{5}\-[0-9]{4}$/,
      _celular: /^\([0-9]{2}\)\s[0-9]{4}\-[0-9]{5}$/,
      telefone: /^\([0-9]{2}\)\s[0-9]{4}\-[0-9]{4}$/,
      cep: /^[0-9]{5}\-[0-9]{3}$/,
      destino: /^[1-8]{1}$/,
    };

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
  }
  validarDestino(destino_id) {
    if (!this.pattern.destino.test(destino_id)) {
      return false;
    }
    return true;
  }
  retornarDestino(destino_id) {
    if (!this.validarDestino(destino_id)) {
      return false;
    }
    return this.destinos[destino_id];
  }
  validarNome(nome) {
    nome = nome || "";
    nome = nome.toString().trim();
    if (nome.length < 3) {
      return false;
    } // || !nome.includes(' ')){ return false; }
    return true;
  }
  validarEmail(email) {
    email = email || "";
    email = email.toString().trim();
    if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
      return false;
    }
    return true;
  }
  validarData(date) {
    if (!this.pattern._data.test(date)) {
      return false;
    }

    var [, dia, mes, ano] = this.pattern._data.exec(date);
    var data = new Date(ano, mes - 1, dia);

    return (
      data.getFullYear() === parseInt(ano, 10) &&
      data.getMonth() === parseInt(mes, 10) - 1 &&
      data.getDate() === parseInt(dia, 10) &&
      !isNaN(data.getTime())
    );
  }
  validarDataTravel(date) {
    if (!this.pattern.data.test(date)) {
      return false;
    }

    var [, dia, mes, ano] = this.pattern.data.exec(date);
    var data = new Date(ano, mes - 1, dia);

    return (
      data.getFullYear() === parseInt(ano, 10) &&
      data.getMonth() === parseInt(mes, 10) - 1 &&
      data.getDate() === parseInt(dia, 10) &&
      !isNaN(data.getTime())
    );
  }
  validarTotalPassageiros(passageiros) {
    let total = 0;
    passageiros.map((qtd) => {
      total += qtd;
    });
    if (total > 0) {
      return true;
    }
    return false;
  }
  validarTelefone(numero) {
    numero = numero || "";
    numero = numero.toString().replace(/[^0-9]+/g, "");
    if (numero.length == 10 || numero.length == 11) {
      return true;
    }
    return false;
  }
  validarDestino(destino_id) {
    if (!this.pattern.destino.test(destino_id)) {
      return false;
    }
    return true;
  }
  retornarDestino(destino_id) {
    destino_id = destino_id || 0;
    destino_id = parseInt(destino_id);
    if (!this.validarDestino(destino_id)) {
      return false;
    }
    return this.destinos[destino_id];
  }
  aplicarMascara(valor, mascara) {
    let maskValue = "";
    let index = 0;
    for (let i = 0; i < mascara.length && index < valor.length; i++) {
      if (mascara[i] === "#") {
        maskValue += valor[index];
        index++;
      } else {
        maskValue += mascara[i];
      }
    }
    return maskValue;
  }
  validarTravelPayload(payload) {
    let errorList = [];

    if (!this.validarDestino(payload.destinyGroup)) {
      errorList.push("destinyGroup");
    }
    if (
      !this.validarTotalPassageiros([
        payload.old0,
        payload.old1,
        payload.old2,
        payload.old3,
      ])
    ) {
      errorList.push("ages");
    }
    if (!this.validarDataTravel(payload.departure)) {
      errorList.push("departure");
    }
    if (!this.validarDataTravel(payload.arrival)) {
      errorList.push("arrival");
    }
    if (!this.validarNome(payload.name)) {
      errorList.push("full-name");
    }
    if (!this.validarEmail(payload.email)) {
      errorList.push("email");
    }
    if (!this.validarTelefone(payload.phone)) {
      errorList.push("phone");
    }

    return errorList;
  }
  validarTravelPgVendaPayload(payload) {
    let erroList = [];

    if (!this.validarDestino(payload.destinyGroup)) {
      erroList.push("destinyGroup");
    }
    if (
      !this.validarTotalPassageiros([
        payload.old0,
        payload.old1,
        payload.old2,
        payload.old3,
      ])
    ) {
      erroList.push("ages");
    }
    if (!this.validarDataTravel(payload.departure)) {
      erroList.push("departure");
    }
    if (!this.validarDataTravel(payload.arrival)) {
      erroList.push("arrival");
    }
    return erroList;
  }
}

export default DataValidation;
