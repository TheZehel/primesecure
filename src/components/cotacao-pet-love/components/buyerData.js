import React, { useState } from "react";
import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";
import InputMask from "react-input-mask";
import { Checkbox, Typography } from "@material-tailwind/react";

export default function PetAdded() {
  //const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  //instância da classe GlobalFuntions
  const globalFunctions = new GlobalFuntions();

  const handleTelefoneChange = (e) => {
    const valor = e.target.value;
    // Remove caracteres que não são números, '-', '(', ou ')'
    const valorFiltrado = valor.replace(/[^0-9()-]/g, "");
    setTelefone(valorFiltrado);
  };

  const handleEmailChange = (e) => {
    const valor = e.target.value;
    // Validação de email será aqui
    setEmail(valor);
  };

  const handleSubmit = () => {
    let patternToUse;

    const len = telefone.replace(/\D/g, "").length; // Conta apenas os números

    if (len <= 10) {
      patternToUse = globalFunctions.pattern.telefone;
    } else {
      patternToUse = globalFunctions.pattern.celular;
    }

    if (!patternToUse.test(telefone)) {
      // Mostrar mensagem de erro
      console.error("Número de telefone inválido");
      return;
    }

    // Teste envio do form
    //console.log("Formulário enviado com sucesso");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="text-center text-grayPrime sm:text-5xl text-lg font-extrabold font-montserrat mx-10">
          Agora Precisamos de Algumas Informações Suas:
        </div>
        <div className="flex flex-col justify-center items-center my-5">
          <div className="h-20 sm:w-2/4 flex ">
            <input
              type="text"
              className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
              placeholder="Nome"
              maxLength="60"
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value=""
              onChange="{(e) => setPetName(e.target.value)}"
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "24px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="h-20 sm:w-2/4 flex mt-5">
            <input
              type="text"
              className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
              placeholder="E-mail"
              maxLength="60"
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value={email}
              onChange={handleEmailChange}
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "24px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="h-20 sm:w-2/4 flex mt-5 mx-10">
            <InputMask
              type="text"
              className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
              placeholder="Telefone"
              mask="(99) 9.9999-9999"
              maskChar={null}
              maxLength="16"
              value={telefone}
              onChange={handleTelefoneChange}
              title="Preencha com o seu numero de celular ou telefone"
              style={{
                fontSize: "24px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="sm:w-2/4 flex mt-5 text-start">
            <Checkbox
              label={
                <Typography variant="small" color="gray">
                  Eu aceito os
                  <a
                    href="https://www.google.com.br"
                    className="font-medium transition-colors hover:text-bluePrime2"
                  >
                    &nbsp;Termos & Condições
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="h-14 w-3/5 bg-cyan-500 hover:bg-bluePrime2 rounded-2xl shadow mx-auto text-white flex items-center justify-center cursor-pointer">
            <span class="font-bold">Prosseguir</span>
          </div>
        </div>
      </form>
    </div>
  );
}
