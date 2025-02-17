import {
  Car,
  Wrench,
  Key,
  Fuel,
  Truck,
  Shield,
  Wind,
  house,
  Users,
  AlertTriangle,
  House,
  Hospital,
} from 'lucide-react';

const assistencias = [
  {
    id: 1,
    titulo: 'Assistência Veicular e Auto Socorro',
    descricao:
      'Suporte imediato em casos de pane, com serviços de reboque, recolha e troca de pneus para garantir a mobilidade do veículo.',
    icon: Wrench, // Representa conserto e reparos
  },
  {
    id: 2,
    titulo: 'Transporte Alternativo e Leva e Traz',
    descricao:
      'Disponibiliza opções como táxi, motorista substituto e serviço de leva e traz, assegurando deslocamento mesmo durante imprevistos.',
    icon: Car, // Remete à mobilidade veicular
  },
  {
    id: 3,
    titulo: 'Assistência Emergencial e Anjo da Guarda',
    descricao:
      'Atua como um verdadeiro anjo da guarda, oferecendo suporte emergencial — inclusive quando o segurado utiliza outro veículo — e orientação em situações críticas, como a perda de documentos.',
    icon: Shield, // Símbolo de proteção e segurança
  },
  {
    id: 4,
    titulo: 'Chaveiro e Guarda do Veículo',
    descricao:
      'Inclui serviços de chaveiro para resolver problemas emergentes e de guarda, garantindo a segurança do veículo em diferentes cenários.',
    icon: Key, // Representa serviços de chaveiro
  },
  {
    id: 5,
    titulo: 'Assistência Residencial e Higienização',
    descricao:
      'Oferece apoio para residências com serviços de higienização, especialmente em casos de alagamento, preservando o lar em momentos adversos.',
    icon: House, // Remete à limpeza e cuidados com o lar
  },
  {
    id: 6,
    titulo: 'Apoio Hospitalar e Hospedagem',
    descricao:
      'Disponibiliza hospedagem, inclusive em hotel após alta hospitalar, e facilita o regresso do usuário, proporcionando conforto durante a recuperação.',
    icon: Hospital, // Sugere “reabastecimento” e suporte para recuperação
  },
  {
    id: 7,
    titulo: 'Assistência para Ciclistas e Veículos Adicionais',
    descricao:
      'Amplia a proteção para outros meios de transporte, atendendo bicicletas e automóveis vinculados ao CPF do titular.',
    icon: Wind, // Evoca leveza e movimento, ideal para ciclistas
  },
  {
    id: 8,
    titulo: 'Suporte Especializado para Famílias',
    descricao:
      'Inclui serviços direcionados para diferentes faixas etárias, como assistência sênior, inspeção kids e até informação nutricional.',
    icon: Users, // Representa o cuidado com pessoas e famílias
  },
  {
    id: 9,
    titulo: 'Serviços de Transporte Especial',
    descricao:
      'Abrange transporte para delegacia, dentro do município ou para a recuperação do veículo, garantindo mobilidade em situações específicas.',
    icon: Truck, // Ícone típico para serviços de transporte e reboque
  },
  {
    id: 10,
    titulo: 'Histórico Veicular e Comunicação Urgente',
    descricao:
      'Fornece acesso ao histórico do veículo e permite a transmissão de mensagens urgentes, assegurando informações precisas e comunicação eficiente em emergências.',
    icon: AlertTriangle, // Indica alertas e comunicação em situações críticas
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
