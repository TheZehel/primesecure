import React from 'react';
import {
  Shield,
  User,
  AlertTriangle,
  Lock,
  Glasses,
  Truck,
  Package,
  AlertCircle,
  DollarSign,
  Calendar,
  Users,
  MapPin,
  Zap,
} from 'lucide-react';

const coberturasAdicionais = [
  {
    id: 1,
    titulo: 'RCFV - Danos corporais e materiais',
    descricao:
      'Protege contra danos corporais e materiais causados a terceiros em acidentes envolvendo o veículo.',
    icon: Shield,
  },
  {
    id: 2,
    titulo: 'RCFV - Danos morais e estéticos',
    descricao:
      'Oferece cobertura para danos morais e estéticos decorrentes de acidentes.',
    icon: User,
  },
  {
    id: 3,
    titulo: 'APP - Morte, invalidez e DHMO',
    descricao:
      'Cobre situações de morte, invalidez e despesas hospitalares (DHMO) em casos de acidentes.',
    icon: AlertTriangle,
  },
  {
    id: 4,
    titulo: 'Blindagem',
    descricao:
      'Garantia de proteção extra com cobertura para a blindagem do veículo.',
    icon: Lock,
  },
  {
    id: 5,
    titulo: 'Vidros especiais e vidros VIP',
    descricao:
      'Protege vidros de alto padrão, oferecendo cobertura diferenciada para vidros especiais e VIP.',
    icon: Glasses,
  },
  {
    id: 6,
    titulo: 'Complementar despesas de locomoção',
    descricao:
      'Oferece apoio financeiro para despesas adicionais de locomoção em situações imprevistas.',
    icon: Truck,
  },
  {
    id: 7,
    titulo: 'Objetos pessoais deixados no veículo',
    descricao:
      'Cobre perdas ou danos de objetos pessoais que foram deixados no veículo durante sinistros.',
    icon: Package,
  },
  {
    id: 8,
    titulo: 'Roubo e/ou furto de rodas',
    descricao:
      'Protege contra o roubo ou furto de rodas, garantindo a reposição em caso de sinistro.',
    icon: AlertCircle,
  },
  {
    id: 9,
    titulo: 'Despesas extraordinárias',
    descricao:
      'Cobre custos extras decorrentes de sinistros, oferecendo suporte financeiro adicional.',
    icon: DollarSign,
  },
  {
    id: 10,
    titulo: 'Valor de novo por 365 dias',
    descricao:
      'Garante a reposição do veículo pelo seu valor de novo durante 365 dias após o sinistro.',
    icon: Calendar,
  },
  {
    id: 11,
    titulo: 'RCFV - Dirigentes, cócios e prepostos',
    descricao:
      'Protege contra danos causados por dirigentes, funcionários e representantes em acidentes.',
    icon: Users,
  },
  {
    id: 12,
    titulo: 'Extensão de perímetro para América do Sul',
    descricao:
      'Estende a cobertura para incidentes ocorridos na América do Sul.',
    icon: MapPin,
  },
  {
    id: 13,
    titulo: 'Extensão de tumultos',
    descricao:
      'Cobre danos decorrentes de tumultos e manifestações, ampliando a proteção do veículo.',
    icon: Zap,
  },
];

export default function CoberturasAdicionais() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-grayPrime text-xl sm:text-4xl text-center mb-12">
          Coberturas Adicionais
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coberturasAdicionais.map(({ id, titulo, descricao, icon: Icon }) => (
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
