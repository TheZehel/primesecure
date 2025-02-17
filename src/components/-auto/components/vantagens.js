import { Phone, Glasses, Car, Clipboard } from 'lucide-react';

const vantagens = [
  {
    id: 1,
    titulo: 'Atendimento',
    descricao: 'Atendimento humanizado.',
    icon: Phone,
  },
  {
    id: 2,
    titulo: 'Vidros',
    descricao:
      'Garantia automática dos vidros básicos (laterais, traseiros e para-brisa).',
    icon: Glasses,
  },
  {
    id: 3,
    titulo: 'Concessionárias',
    descricao: 'Concessionárias e oficinas especializadas.',
    icon: Car,
  },
  {
    id: 4,
    titulo: 'Contratação',
    descricao: 'Contratação simples.',
    icon: Clipboard,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function Vantagens() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-grayPrime text-xl sm:text-4xl text-center mb-12">
          Vantagens Exclusivas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vantagens.map(({ id, titulo, descricao, icon: Icon }) => (
            <div
              key={id}
              className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="bg-bluePrime2/10 rounded-full p-2 flex-shrink-0">
                <Icon className="w-6 h-6 text-bluePrime" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-grayPrime mb-1">
                  {titulo}
                </h3>
                <p className="text-grayPrime text-sm leading-relaxed">
                  {descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
