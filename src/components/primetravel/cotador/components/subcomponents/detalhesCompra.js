import {
  CircleDollarSign,
  MapPin,
  MapPinHouse,
  Pencil,
  Plane,
  User,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../../utils/storageUtils';
import moment from 'moment';
import ListaPaises from '../../../components/ListaPaises';

export default function DetalhesCompra() {
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    const updateDetalhes = () => {
      const resume = loadFromStorage('resume', {});
      const plans = loadFromStorage('plans', {});
      const editQuote = loadFromStorage('editQuote', {});
      const responsiblePassenger = loadFromStorage('responsiblePassenger', {});
      const passengers = loadFromStorage('passengers', {});
      const cartao = loadFromStorage('cartao', {});

      // Buscar nome do destino a partir da sigla em ListaPaises
      const destinoNome = ListaPaises.find(
        (pais) => pais.regiao === editQuote?.CodigoDestino,
      )?.label;

      // Formatar datas
      const dataViagem = {
        inicio: editQuote?.DataInicioViagem
          ? moment(editQuote.DataInicioViagem).format('DD/MM/YYYY')
          : null,
        fim: editQuote?.DataFinalViagem
          ? moment(editQuote.DataFinalViagem).format('DD/MM/YYYY')
          : null,
      };

      const pagamento = {
        resume,
        plans,
        editQuote: {
          ...editQuote,
          destinoNome, // Nome do destino adicionado
          dataViagem, // Datas formatadas adicionadas
        },
        responsiblePassenger,
        passengers,
        cartao,
      };

      saveToStorage('pagamento', pagamento); // Atualiza o pagamento na sessionStorage
      setDetalhes(pagamento); // Atualiza o estado do componente
    };

    updateDetalhes();

    // Adiciona um listener para garantir que mudanças no sessionStorage atualizem o estado
    window.addEventListener('storage', updateDetalhes);

    // Remove o listener ao desmontar
    return () => window.removeEventListener('storage', updateDetalhes);
  }, []);

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
            value={`${detalhes?.responsiblePassenger?.firstName || ''} ${
              detalhes?.responsiblePassenger?.secondName || ''
            }`}
          />
          <InfoItem
            icon={<User className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="Passageiros adicionais:"
            value={Object.values(detalhes?.passengers || {})
              .map((p) => `${p.firstName} ${p.secondName}`)
              .join(', ')}
          />
          <InfoItem
            icon={<MapPinHouse className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="Endereço com número:"
            value={`${detalhes?.responsiblePassenger?.address || ''}, ${
              detalhes?.responsiblePassenger?.numberAddress || ''
            }`}
          />
          <InfoItem
            icon={<User className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="CPF:"
            value={detalhes?.responsiblePassenger?.CPF || ''}
          />
          <InfoItem
            icon={<CircleDollarSign className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="Preço:"
            value={detalhes?.resume?.total || 'R$ 0,00'} // Preço total do sessionStorage resume
          />
          <InfoItem
            icon={<MapPin className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="Destino:"
            value={detalhes?.editQuote?.destinoNome || 'Não especificado'} // Nome do destino
          />
          <InfoItem
            icon={<Plane className="w-4 h-4 mr-2 flex-shrink-0" />}
            label="Data da viagem:"
            value={
              detalhes?.editQuote?.dataViagem?.inicio &&
              detalhes?.editQuote?.dataViagem?.fim
                ? `${detalhes.editQuote.dataViagem.inicio} - ${detalhes.editQuote.dataViagem.fim}`
                : 'Não especificado'
            } // Data formatada
          />
        </div>

        <hr className="border-bluePrime/40 m-2 mt-4" />
        <div className="text-grayPrime font-semibold text-start text-base">
          Total:
          <span className="ml-2 text-bluePrime font-semibold break-words">
            {detalhes?.resume?.total || 'R$ 0,00'}
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
