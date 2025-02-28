import React, { useState } from 'react';
import { Shield, Smartphone, Droplets, Globe } from 'lucide-react';

export default function ContainerBeneficios() {
  return (
    <div className="bg-transparent font-montserrat my-12">
      <div className="bg-transparent mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-blueprime2 font-bold mb-8 text-2xl sm:text-5xl">
          Coberturas que fazem sentido para seu dia
        </h2>
        <p className="text-center mb-12 text-grayPrime">
          Proteja o seu aparelho contra roubo ou furto qualificado e escolha as
          coberturas que se encaixam às suas necessidades. E o melhor? Tudo pelo
          aplicativo, na palma da sua mão.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <BeneficioCard
            icon={<Shield className="w-10 h-10 text-bluePrime" />}
            title="Roubo e Furto Qualificado"
            description="Garante o pagamento, até o limite máximo contratado, de uma indenização em caso de perdas e danos materiais devido a roubo ou furto qualificado."
          />

          <BeneficioCard
            icon={<Smartphone className="w-10 h-10 text-bluePrime" />}
            title="Queda ou Dano Acidental"
            description="Garante o pagamento da indenização por perdas e danos materiais causados em caso de quebra acidental ao aparelho celular."
          />

          <BeneficioCard
            icon={<Droplets className="w-10 h-10 text-bluePrime" />}
            title="Danos Líquidos"
            description="Garante o pagamento da indenização por danos materiais, causados aos seus bens em decorrência de danos acidentais e involuntários causados qualquer substância líquida."
          />

          <BeneficioCard
            icon={<Globe className="w-10 h-10 text-bluePrime" />}
            title="Cobertura Internacional"
            description="Estende as coberturas do plano contratado para qualquer lugar do mundo, garantindo a você o pagamento da indenização de acordo com as coberturas que você tiver contratado."
          />
        </div>
      </div>
    </div>
  );
}

function BeneficioCard({ icon, title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg p-6 h-full transition-all duration-300 border-2 ${
        isHovered
          ? 'border-bluePrime shadow-lg shadow-bluePrime/20 -translate-y-2'
          : 'border-gray-100 shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center text-center mb-4">
        <div className="mb-3">{icon}</div>
        <h3 className="font-bold text-xl text-grayPrime">{title}</h3>
      </div>

      <div
        className={`transition-all duration-300 ${
          isHovered
            ? 'opacity-100 max-h-96 transform-none'
            : 'opacity-0 max-h-0 overflow-hidden translate-y-4'
        }`}
      >
        {description && (
          <p className="text-grayPrime leading-relaxed text-center">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
