import { Check } from 'lucide-react';

const vantagens = [
  {
    id: 1,
    titulo: 'Proteção Contra Roubo e Furto',
    descricao: 'Indenização caso o veículo seja roubado e não recuperado.',
  },
  {
    id: 2,
    titulo: 'Cobertura para Colisões',
    descricao: 'Cobre danos ao seu carro em caso de acidente.',
  },
  {
    id: 3,
    titulo: 'Danos a Terceiros',
    descricao:
      'Indenização para danos materiais e corporais causados a terceiros.',
  },
  {
    id: 4,
    titulo: 'Cobertura Contra Fenômenos Naturais',
    descricao: 'Proteção contra enchentes, granizo, quedas de árvores e mais.',
  },
  {
    id: 5,
    titulo: 'Carro Reserva',
    descricao:
      'Disponibilização de um carro extra enquanto o veículo segurado está em reparo.',
  },
  {
    id: 6,
    titulo: 'Assistência 24h',
    descricao: 'Socorro mecânico, reboque, troca de pneus e muito mais.',
  },
  {
    id: 7,
    titulo: 'Seguro para Passageiros',
    descricao:
      'Cobertura para despesas médicas e hospitalares dos ocupantes do veículo.',
  },
  {
    id: 8,
    titulo: 'Facilidade de Pagamento',
    descricao: 'Parcelamento flexível sem comprometer seu orçamento.',
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

        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            {vantagens.map(({ id, titulo, descricao }) => (
              <div
                key={id}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="bg-bluePrime2/10 rounded-full p-2 flex-shrink-0">
                  <Check className="w-6 h-6 text-bluePrime" />
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
      </div>
    </section>
  );
}
