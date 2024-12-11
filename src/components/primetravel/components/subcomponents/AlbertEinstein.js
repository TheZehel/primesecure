import React from "react";
import GlobeImage from "../../../../../src/assets/img/world.jpg";

import imageManagerPrimeTravel from "../../bancodeimagens/BancoDeImagensPrimeTravel";

export default function AlbertEinstein() {
  return (
    <section className="my-20">
          <div className="mx-5  p-5 ">
        <h2 className="text-2xl font-bold mb-5 text-bluePrime mx-2">
        Plano EASY Multiviagens
        </h2>
        <h3 className="text-2xl font-bold mb-5 text-bluePrime2 mx-">
        Contrate uma única vez e use durante um ano
        </h3>
        <p className="text-lg mx-2 text-justify">
        É ideal para quem precisa estar protegido em duas ou mais viagens ao exterior durante o período de um ano. 
        Você não precisa fazer um seguro toda vez que viaja, com o EASY Multiviagens, você tem uma apólice válida por um ano, que pode ser ativada todas as vezes que necessitar!
        </p>
        <img src="https://storage.googleapis.com/primesecure/world.png" className="w-1/3 mx-auto" />
      </div>

      
      {/* <div className="flex flex-wrap justify-center items-center space-x-4 sm:flex-row sm:flex-wrap">
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravel.Telemedicina.iconSintomasCovid}
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
            src={imageManagerPrimeTravel.Telemedicina.iconFebre}
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
            src={imageManagerPrimeTravel.Telemedicina.iconGarganta}
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
            src={imageManagerPrimeTravel.Telemedicina.iconAlergias}
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
            src={imageManagerPrimeTravel.Telemedicina.iconDorDeCabeca}
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
            src={imageManagerPrimeTravel.Telemedicina.iconSintomasOculares}
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
            src={imageManagerPrimeTravel.Telemedicina.iconSintomasUrinarios}
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
            src={imageManagerPrimeTravel.Telemedicina.iconsSintomasAuditivos}
            alt="Sintomas oculares"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Sintomas <br />
            auditivos
          </span>
        </div>
      </div> */}
      {/* Linha 2 */}
      {/* <div className="flex flex-wrap justify-center items-center space-x-4 sm:flex-row sm:flex-wrap sm:mt-16">
        <div className="flex flex-col items-center w-16 h-auto sm:w-16 sm:h-16">
          <img
            src={imageManagerPrimeTravel.Telemedicina.iconSintomasRespiratorios}
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
            src={imageManagerPrimeTravel.Telemedicina.iconDorNoPeito}
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
            src={imageManagerPrimeTravel.Telemedicina.iconPerdaDeForca}
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
            src={imageManagerPrimeTravel.Telemedicina.iconDorDeBarriga}
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
            src={imageManagerPrimeTravel.Telemedicina.iconsSintomasAuditivos}
            alt="Sintomas auditivos"
            className="w-16 h-16 sm:w-16 sm:h-16"
          />
          <span className="text-sm block mt-2 font-medium text-bluePrime">
            Dor na <br />
            lombar
          </span>
        </div>
      </div> */}
    </section>
  );
}
