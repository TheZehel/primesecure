import BannerPix from '../../primetravel/components/subcomponents/BannerPix';
import FormVidaOmint from './formVida';
import React from 'react';

export default function Superior() {
  return (
    <div className="relative min-h-screen">
      {/* Container principal com background */}
      <div className="absolute inset-0">
        <img
          src="https://storage.googleapis.com/primesecure/vida-omint/VidaOmint.png"
          className="w-full h-full object-cover brightness-50 lg:object-cover"
          alt="Imagem de fundo"
        />
      </div>

      {/* Conteúdo principal */}
      <div className="relative min-h-screen flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 py-8 lg:py-6 gap-12 pl-8 lg:pl-16">
        {/* Conteúdo à esquerda */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-white max-w-lg">
          <div className="flex flex-col items-center lg:items-center mb-5">
            <img
              src="https://storage.googleapis.com/primesecure/logo-omint.png"
              alt="Logo Omint"
              className="w-20 sm:w-24 lg:w-48 h-auto"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-left">
            Benefícios Vida Omint Ideal
          </h1>
          <p className="bg-bluePrime font-sans font-bold uppercase py-1.5 px-4 rounded-lg text-base sm:text-lg mb-4">
            Seguro de vida
          </p>
          {/* <p className="text-sm sm:text-lg lg:text-xl mb-6 text-center lg:text-left leading-relaxed">
            O seguro que protege o que é importante <br />
            pra você, por você.
          </p> */}

          <div className="mt-10 w-80">{/* <BannerPix /> */}</div>
        </div>

        {/* Formulário alinhado mais à direita */}
        <div className="w-full lg:w-1/2 max-w-lg lg:max-w-md mx-auto lg:mr-12 lg:ml-auto">
          <FormVidaOmint />
        </div>
      </div>
    </div>
  );
}
