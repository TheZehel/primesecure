import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Briefcase, DollarSign, ShieldCheck } from 'lucide-react';
import Assistencias from './components/assistencias';
import Vantagens from './components/vantagens';
import Coberturas from './components/coberturas';
import Superior from './components/superior';

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
          A Prime oferece um seguro exclusivo contra Furto e Roubo, com
          aceitação para carros de qualquer marca, modelo e ano, com valor até
          80% mais barato que o seguro convencional e disponibiliza a seu
          segurado Assistência 24h em todo o Brasil. Serviços como Guincho,
          Chaveiro, Troca de Pneu e Transporte até residência.
          <br />
          Com este seguro essencial contra Furto e Roubo e Assistência 24h, a
          Prime proporciona um seguro de qualidade que é acessível a todos.
          Oferecendo a estes clientes uma opção mais econômica e ao mesmo tempo
          eficaz para proteção do seu veículo sem ter que pagar por serviços que
          não deseja usufruir.
        </p>

        {/* Título para a seção de produtos */}
        <h1 className="text-grayPrime text-xl sm:text-4xl text-center mt-20">
          Por que escolher nosso seguro?
        </h1>
        <Assistencias />
        <Vantagens />
        <Coberturas />
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
