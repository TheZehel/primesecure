import React from 'react';

export default function PersonalizarContainer() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-44 p-4 mt-28">
      <div>
        <img
          src="https://storage.googleapis.com/primesecure/lp-celular/personalize.png"
          className="border-2 border-white rounded-md shadow-lg"
          alt="Coberturas Personalização"
        />
      </div>
      <div className="text-left">
        <div className="mb-4">
          <span className="block text-3xl md:text-5xl font-bold">
            ...ou personalize
            <br />
            como quiser!
          </span>
          <span className="block text-base max-w-sm">
            Contrate apenas as coberturas e os pacotes de assistências que fazem
            sentido para o seu dia a dia.
            <br />
            <br />
            Simples. E do seu jeito!
          </span>
        </div>
      </div>
    </div>
  );
}
