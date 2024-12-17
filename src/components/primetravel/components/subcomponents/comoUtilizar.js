import { ArrowRight, ArrowBigDown } from 'lucide-react';
import React from 'react';

const ComoUtilizar = () => {
  return (
    <section className="passos">
      <div className="container mx-auto px-4">
        <div className="row">
          <div className="titulo text-center mb-6">
            <h2 className="text-4xl font-bold text-grayPrime">Saiba como utilizar</h2>
          </div>
        </div>
        <div className="row grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 items-center justify-center">
          <div className="flex flex-col justify-center items-center w-full md:w-64 h-64 shadow-lg rounded-lg border-bluePrime border-2">
            <h1 className="text-8xl text-bluePrime pb-4">1</h1>
            <p className="text-center text-grayPrime">
              Teve um imprevisto no seu destino? <br />
              Sem problemas!
            </p>
          </div>
          <div className="flex md:block justify-center">
            <ArrowRight size={54} className="hidden md:block text-bluePrime" />
            <ArrowBigDown size={54} className="block md:hidden text-bluePrime" />
          </div>
          <div className="flex flex-col justify-center items-center w-full md:w-64 h-64 shadow-lg rounded-lg border-bluePrime border-2">
            <h1 className="text-8xl text-bluePrime pb-4">2</h1>
            <p className="text-center text-grayPrime">
              Acione a Prime Travel em um dos nossos diversos canais.
            </p>
          </div>
          <div className="flex md:block justify-center">
            <ArrowRight size={54} className="hidden md:block text-bluePrime" />
            <ArrowBigDown size={54} className="block md:hidden text-bluePrime" />
          </div>
          <div className="flex flex-col justify-center items-center w-full md:w-64 h-64 shadow-lg rounded-lg border-bluePrime border-2">
            <h1 className="text-8xl text-bluePrime pb-4">3</h1>
            <p className="text-center text-grayPrime">
              Receba assistência em português com agilidade, segurança e praticidade.
            </p>
          </div>
          <div className="flex md:block justify-center">
            <ArrowRight size={54} className="hidden md:block text-bluePrime" />
            <ArrowBigDown size={54} className="block md:hidden text-bluePrime" />
          </div>
          <div className="flex flex-col justify-center items-center w-full md:w-64 h-64 shadow-lg rounded-lg border-bluePrime border-2">
            <h1 className="text-8xl text-bluePrime pb-4">4</h1>
            <p className="text-center text-grayPrime">
              Pronto, é só curtir cada segundo da sua viagem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoUtilizar;
