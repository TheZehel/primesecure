import React from "react";

import imageManagerPrimeTravelLpVenda from "../bancodeimagens/BancoDeImgsTravelVenda";

export default function AlbertEinstein() {
  return (
    <section className="my-20">
      <div>
        <img
          src={imageManagerPrimeTravelLpVenda.Telemedicina.logoAlbertEinstein}
          alt="Logo Albert Einstein"
          className="mx-auto  font-montserrat"
        />
      </div>
      <div className="mx-5 sm:mx-20 p-5 sm:p-10">
        <p className="text-2xl text-justify">
          Todos os planos contam com o{" "}
          <span className="text-bluePrime font-bold text-justify">
            Pronto Atendimento Virtual | Seguro Viagem
          </span>
          , um serviço de orientação médica online para atendimento de sintomas
          de baixa complexidade com profissionais da Telemedicina do Einstein. O
          acesso a este benefício é rápido e fácil por meio do celular ou
          computador, basta apenas ter conexão com internet e que fica
          disponível 24h por dia 7 dias por semana.
        </p>
        <p className="mx-auto font-bold text-lg text-bluePrime mt-5">
          Você poderá resolver casos com sintomas não urgentes, como:
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center space-x-4 sm:flex-row sm:flex-wrap">
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravelLpVenda.Telemedicina.iconSintomasCovid}
            alt="Sintomas de COVID"
            className="w-16 h-auto sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Sintomas <br />
            COVID-19
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravelLpVenda.Telemedicina.iconFebre}
            alt="Febre"
            className="w-16 h-auto sm:w-16 sm:h-16"
          />
          <span className="text-md block mt-2 font-medium text-bluePrime">
            Sintomas <br />
            de Febre
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravelLpVenda.Telemedicina.iconGarganta}
            alt="Garganta"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Dores na <br />
            garganta
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravelLpVenda.Telemedicina.iconAlergias}
            alt="Alergias"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-md block mt-2 font-medium text-bluePrime">
            Alergias <br />
            ⠀⠀
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravelLpVenda.Telemedicina.iconDorDeCabeca}
            alt="Dores de cabeça"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Dores <br />
            de cabeça
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={
              imageManagerPrimeTravelLpVenda.Telemedicina.iconSintomasOculares
            }
            alt="Sintomas oculares"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Sintomas <br />
            oculares
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={
              imageManagerPrimeTravelLpVenda.Telemedicina.iconSintomasUrinarios
            }
            alt="Sintomas oculares"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Sintomas <br />
            urinários
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={
              imageManagerPrimeTravelLpVenda.Telemedicina.iconsSintomasAuditivos
            }
            alt="Sintomas oculares"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Sintomas <br />
            auditivos
          </span>
        </div>
      </div>
      {/* Linha 2 */}
      <div className="flex flex-wrap justify-center items-center space-x-4 sm:flex-row sm:flex-wrap sm:mt-16">
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={
              imageManagerPrimeTravelLpVenda.Telemedicina
                .iconSintomasRespiratorios
            }
            alt="Sintomas urinários"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Sintomas <br />
            respiratórios
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravelLpVenda.Telemedicina.iconDorNoPeito}
            alt="Sintomas auditivos"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Dor no <br />
            peito
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravelLpVenda.Telemedicina.iconPerdaDeForca}
            alt="Sintomas auditivos"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Perda de <br />
            força
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravelLpVenda.Telemedicina.iconDorDeBarriga}
            alt="Sintomas auditivos"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Dor de <br />
            barriga
          </span>
        </div>
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={
              imageManagerPrimeTravelLpVenda.Telemedicina.iconsSintomasAuditivos
            }
            alt="Sintomas auditivos"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Dor na <br />
            lombar
          </span>
        </div>
        {/* Adicione outros ícones e títulos aqui */}
      </div>
    </section>
  );
}
