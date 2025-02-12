//importações

import { Briefcase, DollarSign, ShieldCheck } from 'lucide-react';

export default function IndexAuto() {
  return (
    <div>
      <div>
        {/* Título e descrição inicial */}
        <h1 className="text-grayPrime text-xl sm:text-4xl text-center m-6">
          A melhor cobertura para o seu carro.
        </h1>
        <p className="font-light max-w-4xl text-gray-500 text-center mx-auto pb-10 px-4 sm:px-6">
          A Simular Seguros através da Prime Seguradora oferece um seguro
          exclusivo contra Furto e Roubo, com aceitação para carros de qualquer
          marca, modelo e ano, com valor até 80% mais barato que o seguro
          convencional e disponibiliza a seu segurado Assistência 24h em todo o
          Brasil. Serviços como Guincho, Chaveiro, Troca de Pneu e Transporte
          até residência.
          <br />
          Com este seguro essencial contra Furto e Roubo e Assistência 24h, a
          Prime proporciona um seguro de qualidade que é acessível a todos.
          Oferecendo a estes clientes uma opção mais econômica e ao mesmo tempo
          eficaz para proteção do seu veículo sem ter que pagar por serviços que
          não deseja usufruir.
        </p>

        {/* Título para a seção de produtos */}
        <h1 className="text-grayPrime text-xl sm:text-4xl text-center mt-20">
          Confira nossas assistências:
        </h1>
      </div>
    </div>
  );
}
