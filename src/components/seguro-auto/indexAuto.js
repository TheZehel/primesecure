import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Briefcase, DollarSign, ShieldCheck } from 'lucide-react';
import Assistencias from './components/assistencias';
import Vantagens from './components/vantagens';
import Coberturas from './components/coberturas';
import Superior from './components/superior';
import Cancel from './components/cancel';
import CoberturasAdicionais from './components/adicionais';
import FAQ from './components/perguntas';
import ServicoEspecializado from './components/especializado';

export default function IndexAuto() {
  return (
    <div>
      <Superior />
      <div>
        {/* Título e descrição inicial */}
        <h1 className="text-grayPrime text-xl sm:text-4xl text-center m-6">
          Proteja seu carro com o melhor seguro do mercado
        </h1>
        <p className="font-light max-w-4xl text-gray-500 text-center mx-auto pb-10 px-4 sm:px-6">
          Uma solução criada para oferecer proteção completa a veículos de alto
          valor, minimizando prejuízos e inconvenientes causados por imprevistos
          de forma rápida e especializada.
        </p>

        {/* Título para a seção de produtos */}
        <h1 className="text-grayPrime text-xl sm:text-4xl text-center mt-16">
          Por que escolher nosso seguro?
        </h1>
        <Assistencias />
        <Cancel />
        <Vantagens />
        <Coberturas />
        <CoberturasAdicionais />
        <ServicoEspecializado />
        <FAQ />
      </div>

      {/* ToastContainer para exibir as notificações */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
