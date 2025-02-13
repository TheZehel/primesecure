import {
  Car,
  Wrench,
  Key,
  Fuel,
  Truck,
  Shield,
  Wind,
  GlassWater,
  Users,
  AlertTriangle,
} from 'lucide-react';

const assistencias = [
  {
    id: 1,
    titulo: 'Guincho 24h',
    descricao: 'Serviço de reboque para qualquer emergência.',
    icon: Truck,
  },
  {
    id: 2,
    titulo: 'Carro Reserva',
    descricao: 'Veículo substituto enquanto o seu está no conserto.',
    icon: Car,
  },
  {
    id: 3,
    titulo: 'Assistência Mecânica',
    descricao: 'Suporte para falhas mecânicas e elétricas.',
    icon: Wrench,
  },
  {
    id: 4,
    titulo: 'Troca de Pneus',
    descricao: 'Troca de pneu furado no local da ocorrência.',
    icon: Wind,
  },
  {
    id: 5,
    titulo: 'Chaveiro 24h',
    descricao: 'Abertura do veículo em caso de perda de chave.',
    icon: Key,
  },
  {
    id: 6,
    titulo: 'Pane Seca',
    descricao: 'Entrega emergencial de combustível.',
    icon: Fuel,
  },
  {
    id: 7,
    titulo: 'Transporte Alternativo',
    descricao: 'Auxílio para transporte quando o carro não puder ser usado.',
    icon: Users,
  },
  {
    id: 8,
    titulo: 'Proteção contra Alagamento',
    descricao: 'Cobertura para remoção do veículo em enchentes.',
    icon: GlassWater,
  },
  {
    id: 9,
    titulo: 'Assistência para Vidros',
    descricao: 'Troca ou reparo de vidros danificados.',
    icon: Shield,
  },
  {
    id: 10,
    titulo: 'Proteção contra Vandalismo',
    descricao: 'Cobertura para depredação do veículo.',
    icon: AlertTriangle,
  },
];

export default function Assistencias() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {assistencias.map(({ id, titulo, descricao, icon: Icon }) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <Icon className="w-12 h-12 text-bluePrime mb-4" />
            <h3 className="text-xl font-semibold text-grayPrime mb-2">
              {titulo}
            </h3>
            <p className="text-grayPrime text-sm">{descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
