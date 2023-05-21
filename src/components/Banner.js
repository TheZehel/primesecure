import React from "react";

export const Banner = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4">
            <div className="text-gray-800">
              <h1 className="text-4xl font-bold mb-4">Seu Título Aqui</h1>
              <p className="text-lg mb-4">Seu parágrafo aqui</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  className="object-cover opacity-50 hover:opacity-100 transition-opacity"
                  src="caminho/para/sua/imagem.jpg"
                  alt="Imagem do banner"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
