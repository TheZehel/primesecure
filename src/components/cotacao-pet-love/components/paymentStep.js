import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function PaymentStep() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="flex flex-col md:flex-row gap-1 w-full mt-10 p-5 md:p-10 font-montserrat">
      <div className="w-full rounded-lg shadow-lg md:w-1/3 text-start p-4 ">
        <h2 className="font-semibold">Cadastre Seu Endereço</h2>
        <div className="flex flex-col justify-center items-center my-2">
          <div className="w-[98%] h-14 sm:w-4/4 flex mb-4">
            <input
              type="text"
              className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
              placeholder="CPF"
              maxLength="60"
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value=""
              onChange="{(e) => setPetName(e.target.value)}"
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "20px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="w-[98%] h-14 sm:w-4/4 flex mb-4">
            <input
              type="text"
              className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
              placeholder="CEP"
              maxLength="60"
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value=""
              onChange="{(e) => setPetName(e.target.value)}"
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "20px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="w-[98%] h-14 sm:w-4/4 flex mb-4">
            <input
              type="text"
              className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
              placeholder="Endereço"
              maxLength="60"
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value=""
              onChange="{(e) => setPetName(e.target.value)}"
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "20px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="mx-1 flex gap-2">
            <div className="w-1/2 h-14 flex mb-4">
              <input
                type="text"
                className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Número"
                maxLength="60"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value=""
                onChange="{(e) => setPetName(e.target.value)}"
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="w-1/2 h-14 flex mb-4">
              <input
                type="text"
                className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Complemento"
                maxLength="60"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value=""
                onChange="{(e) => setPetName(e.target.value)}"
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
          </div>
          <div className="w-[98%] h-14 sm:w-4/4 flex mb-4">
            <input
              type="text"
              className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
              placeholder="Bairro"
              maxLength="60"
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value=""
              onChange="{(e) => setPetName(e.target.value)}"
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "20px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="mx-1 flex gap-2">
            <div className="w-1/2 h-14 flex mb-4">
              <input
                type="text"
                className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Estado"
                maxLength="60"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value=""
                onChange="{(e) => setPetName(e.target.value)}"
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="w-1/2 h-14 flex mb-4">
              <input
                type="text"
                className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Cidade"
                maxLength="60"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value=""
                onChange="{(e) => setPetName(e.target.value)}"
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg shadow-lg md:w-1/3 text-start p-4">
        <h2 className="font-semibold">Forma de Pagamento:</h2>
        <Accordion
          open={open === 1}
          className="mb-2 rounded-lg border border-blue-gray-100 px-2"
        >
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className={`border-b-0 transition-colors px-3 ${
              open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
            }`}
          >
            Mensal | Cartão de Crédito
          </AccordionHeader>
          <AccordionBody className="pt-2 text-base font-normal">
            <div className="w-[93%] h-14 sm:w-4/4 flex mb-4 m-3">
              <input
                type="text"
                className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Número do Cartão"
                maxLength="60"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value=""
                onChange="{(e) => setPetName(e.target.value)}"
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
              <input
                type="text"
                className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Nome Impresso no Cartão"
                maxLength="60"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value=""
                onChange="{(e) => setPetName(e.target.value)}"
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="w-full px-3 flex gap-2">
              <div className="w-[80%] h-14 flex mb-4">
                <input
                  type="text"
                  className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                  placeholder="Vencimento"
                  maxLength="60"
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value=""
                  onChange="{(e) => setPetName(e.target.value)}"
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
              <div className="w-[80%] h-14 flex mb-4">
                <input
                  type="text"
                  className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                  placeholder="CVV"
                  maxLength="60"
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value=""
                  onChange="{(e) => setPetName(e.target.value)}"
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className={`border-b-0 transition-colors ${
              open === 2 ? "text-bluePrime hover:!text-bluePrime2" : ""
            }`}
          >
            Anual à Vista | Cartão de Crédito
          </AccordionHeader>
          <AccordionBody className="pt-2 text-base font-normal">
            <div className="w-[93%] h-14 sm:w-4/4 flex mb-4 m-3">
              <input
                type="text"
                className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Número do Cartão"
                maxLength="60"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value=""
                onChange="{(e) => setPetName(e.target.value)}"
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="w-full px-3 h-14 sm:w-4/4 flex mb-4 items-center justify-center">
              <input
                type="text"
                className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                placeholder="Nome Impresso no Cartão"
                maxLength="60"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                value=""
                onChange="{(e) => setPetName(e.target.value)}"
                title="Por favor, use apenas letras e acentos comuns."
                style={{
                  fontSize: "20px",
                  caretColor: "#03a8db 2px",
                }}
              />
            </div>
            <div className="w-full px-3 flex gap-2">
              <div className="w-[80%] h-14 flex mb-4">
                <input
                  type="text"
                  className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                  placeholder="Vencimento"
                  maxLength="60"
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value=""
                  onChange="{(e) => setPetName(e.target.value)}"
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
              <div className="w-[80%] h-14 flex mb-4">
                <input
                  type="text"
                  className="w-full h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
                  placeholder="CVV"
                  maxLength="60"
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
                  value=""
                  onChange="{(e) => setPetName(e.target.value)}"
                  title="Por favor, use apenas letras e acentos comuns."
                  style={{
                    fontSize: "20px",
                    caretColor: "#03a8db 2px",
                  }}
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className={`border-b-0 transition-colors ${
              open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
            }`}
          >
            Anual à Vista | Pix
          </AccordionHeader>
          <AccordionBody className="pt-2 text-base font-normal">
            Pagar com pix
          </AccordionBody>
        </Accordion>
      </div>
      <div className="w-full rounded-lg shadow-lg md:w-1/3 text-start p-4">
        <h2 className="font-semibold"> Resumo do Pedido: </h2>
        <div className="w-96 h-60 flex flex-col justify-between">
          {/* Primeira linha */}
          <div className="flex justify-between items-center text-md font-semibold">
            <div className="text-zinc-800 text-opacity-70">
              Nome | Nome Plano
            </div>
            <div className="text-cyan-500">R$49,90</div>
          </div>

          {/* Segunda linha */}
          <div className="flex justify-between items-center text-md font-semibold">
            <div className="text-zinc-800 text-opacity-70">
              Desconto de pagamento anual
            </div>
            <div className="text-green-600">-R$10,00</div>
          </div>

          {/* Terceira linha */}
          <div className="flex justify-between items-center text-md font-semibold">
            <div className="text-zinc-800 text-opacity-70">Subtotal</div>
            <div className="text-cyan-500">R$49,90</div>
          </div>

          {/* Quarta linha */}
          <div className="flex justify-between items-center text-md font-semibold">
            <div className="text-zinc-800 text-opacity-70">
              Cupom de Desconto
            </div>
            <div className="text-white">Aplicar</div>
          </div>

          {/* Linha horizontal */}
          <div className="border border-cyan-500 h-px w-full"></div>

          {/* Quinta linha */}
          <div className="flex justify-between items-center text-xl font-semibold">
            <div className="text-zinc-800">Total:</div>
            <div className="text-cyan-500">R$39,90</div>
          </div>
        </div>
      </div>
    </div>
  );
}
