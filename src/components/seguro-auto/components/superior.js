import SimpleFormSection from '../../globalsubcomponentes/SimpleFormSection';
import React, { useState } from 'react';

export default function Superior() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  return (
    // Use min-h-screen instead of h-screen
    <div className="min-h-screen lg:min-h-[80vh] w-full overflow-hidden relative">
      {/* Background image with absolute positioning */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://storage.googleapis.com/primesecure/seguro-auto/auto.png"
          className="w-full h-full object-cover brightness-50"
          alt="Imagem de fundo"
        />
      </div>

      {/* Content container with flex */}
      <div className="relative flex flex-col lg:flex-row items-center lg:items-center lg:justify-between px-6 py-8 lg:py-12 gap-4 sm:px-8 w-full min-h-screen lg:min-h-[80vh]">
        {/* Bloco de texto */}
        <div className="flex flex-col items-center lg:items-start text-white max-w-lg text-center lg:text-left z-10 m-8 mb-14 sm:m-12 md:m-16 lg:m-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Benefícios Auto
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 leading-relaxed">
            Seguro para clientes únicos com veículos a partir de R$ 220 mil
            reais.
            <br /> Solicite uma cotação gratuita hoje mesmo!
          </p>
          <p className="bg-bluePrime font-sans font-bold uppercase py-2 px-6 rounded-lg text-sm sm:text-lg">
            Seguro auto
          </p>
        </div>

        {/* Formulário */}
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-auto max-w-lg z-10">
          <SimpleFormSection formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}
