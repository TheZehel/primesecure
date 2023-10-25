import React from "react";
import InputMask from "react-input-mask";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function StepPayment() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="sm:mx-5 md:mx-10 lg:mx-10 w-full mx-5 max-w-6xl  my-5 rounded-xl shadow-uniform-shadow">
          <div className="rounded-lg max-w-6xl ml-5 mr-5 mt-5">
            <Accordion
              open={open === 1}
              className="mb-2 rounded-lg border border-blue-gray-100 px-2"
            >
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className={`border-b-0 transition-colors px-3 ${
                  open === 1 ? "text-blue-500 hover:!text-bluePrime" : ""
                }`}
              >
                Mensal | Cartão de Crédito
              </AccordionHeader>
              <AccordionBody className="pt-2 text-base font-normal">
                <div className="w-full h-14 sm:w-4/4 flex mb-4 m-3">
                  <input
                    type="text"
                    className="sm:w-[98%] w-[92%] h-full px-4 py-2 ring-bluePrime border-0 text-3xl placeholder ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime"
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
          </div>
          <div className="rounded-lg max-w-6xl  mb-5 p-3  m-2">
            <Accordion
              open={open === 3}
              className="rounded-lg border border-blue-gray-100 px-4"
            >
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className={`border-b-0 transition-colors ${
                  open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
                }`}
              >
                Anual à Vista | Pix
              </AccordionHeader>
              <AccordionBody className="pt-2 text-base font-normal">
                Pagar com pix
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </div>
      {/*}
      <div className=" m-auto max-w-6xl rounded-xl grid sm:grid-cols-2 grid-cols-1">
        <button className="border border-bluePrime p-2 sm:mr-2 m-1 rounded-lg font-bold">
          Voltar para planos
        </button>
        <button className="bg-bluePrime p-2 sm:ml-2 m-1 rounded-lg font-bold text-white transition ease-in-out delay-75 hover:translate-x-2  duration-300">
          Avançar
        </button>
      </div>
              */}
    </div>
  );
}
