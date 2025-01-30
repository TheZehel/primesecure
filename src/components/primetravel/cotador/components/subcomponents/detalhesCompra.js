import {
  CircleDollarSign,
  MapPin,
  MapPinHouse,
  Pencil,
  Plane,
  User,
} from 'lucide-react';
import React from 'react';

/**
 * Exibe resumo do pedido, recebendo "pagamento" (paymentJSON) como prop.
 * Se preferir, pode também buscar do sessionStorage (apenas leitura), mas sem sobrescrever.
 */
export default function DetalhesCompra({ pagamento }) {
  if (!pagamento) {
    return <div className="m-4">Carregando detalhes...</div>;
  }

  // Exemplo de desestruturação
  const {
    Nome,
    Sobrenome,
    NumeroCPF,
    PrecoTotal,
    CodigoDestino,
    DataInicioViagem,
    DataFinalViagem,
  } = pagamento;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="m-4 p-6 bg-white rounded-lg border-2 border-grayPrime/30">
        <div className="text-grayPrime font-semibold text-start text-lg">
          Resumo do pedido:
        </div>
        <hr className="border-bluePrime/40 m-2" />

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-grayPrime text-left text-xs">
          <InfoItem
            icon={<Pencil className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="Nome inteiro:"
            value={`${Nome || ''} ${Sobrenome || ''}`}
          />
          <InfoItem
            icon={<User className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="CPF:"
            value={NumeroCPF || ''}
          />
          <InfoItem
            icon={<CircleDollarSign className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="Preço:"
            value={PrecoTotal || 'R$ 0,00'}
          />
          <InfoItem
            icon={<MapPinHouse className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="Destino (sigla):"
            value={CodigoDestino || 'Não especificado'}
          />
          <InfoItem
            icon={<Plane className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="Data da viagem:"
            value={
              DataInicioViagem && DataFinalViagem
                ? `${DataInicioViagem} - ${DataFinalViagem}`
                : 'Não especificado'
            }
          />
        </div>

        <hr className="border-bluePrime/40 m-2 mt-4" />
        <div className="text-grayPrime font-semibold text-start text-base">
          Total:
          <span className="ml-2 text-bluePrime font-semibold break-words">
            {PrecoTotal || 'R$ 0,00'}
          </span>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start">
      {icon}
      <div>
        <strong>{label}</strong>
        <span className="ml-2 text-bluePrime font-semibold break-words">
          {value}
        </span>
      </div>
    </div>
  );
}
