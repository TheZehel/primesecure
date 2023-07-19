import React from "react";
import imageManagerPrimeTravel from "../../bancodeimagens/BancoDeImagensPrimeTravel";

export default function TelemedicinaTravel() {
  return (
    <div className="overflow-hidden bg-white font-sans mt-10 mb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-5 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          
          <div className="flex" style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <div className="lg:max-w-lg" style={{textAlign: 'left', marginTop: 'auto', marginBottom: 'auto'}}>
              <h1 className="font-semibold text-grayPrime" style={{fontSize: '1.5rem', lineHeight: '1.9rem'}}>
                O Unico Seguro de Viagem Que Oferece Telemedicina Com o Melhor Hospital de São Paulo 24H.
              </h1>
              <p className="mt-4" style={{color: "#919096", fontSize: "1.1rem"}}>
                Agora Todos os planos de Seguro Viagem da Prime Travel contam com o Pronto Atendimento Virtual do Einsten, um serviço de telemedicina para atendimento de sintomas de baixa complexidade, com a qualidade do Hospital Israelita Albert Einsten. O acesso a este beneficio é rápido e fácil por meio do celular ou computador, basta apenas ter conexão com intenet.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              style={{maxWidth: '60%', margin: '0 auto', borderRadius: '5px'}}
              src={imageManagerPrimeTravel.ImagensLandPage.ImgTelemedicina}
              alt="Brindes exclusivos"
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
