import React from "react";
import InputMask from "react-input-mask";

export default function StepAddres() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="bg-slate-600  sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl  my-5 rounded-xl">
          <div className="bg-red-500 max-w-6xl ml-5 mr-5 mt-5 p-20">
            Google Maps Here
          </div>
          <div className="bg-white rounded-b-lg max-w-6xl mx-5 mb-5 p-3">
            <div className="flex flex-col sm:flex-row m-auto">
              <InputMask
                type="text"
                className="sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="CEP"
                maxLength="25"
                mask="99999-999"
                title="Preencha o seu Cep"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                className="sm:w-full max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Endereço"
                maxLength="100"
                title="Digite o seu endereço aqui"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                className="sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Numero"
                maxLength="8"
                title="Específique o número"
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <InputMask
                type="text"
                className="sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Complemento"
                maxLength="140"
                title="Específique um complemento."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                className="sm:w-[30%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Bairro"
                maxLength="60"
                title="Específique seu bairro."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                className="sm:w-[29.3%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Cidade"
                maxLength="60"
                title="Específique sua cidade."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
              <InputMask
                type="text"
                className="sm:w-[18.9%] max-w h-full px-4 py-2 mx-1 my-1 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Estado"
                maxLength="60"
                title="Específique sua cidade."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">Continuar</div>
    </div>
  );
}
