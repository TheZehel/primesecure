import React, { useEffect, useState } from 'react';
import TabsNavigation from './subcomponents/navigation';
import DetalhesCompra from './subcomponents/detalhesCompra';
import Purchased from './purchased';
import { loadFromStorage, saveToStorage } from '../utils/storageUtils';
import axios from 'axios';

const Payment = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState('TMA'); // "TMA" = Cartão, "PIX" = Pix
  const [cardData, setCardData] = useState(null);
  const [isEmissaoConcluida, setIsEmissaoConcluida] = useState(false);

  /**
   * Gera um objeto JSON de pagamento consolidado com base
   * nos dados do sessionStorage e do estado local (formaPagamento, cardData).
   */
  const buildPaymentJSON = () => {
    // Carrega do storage
    const editQuote = loadFromStorage('editQuote', {});
    const plans = loadFromStorage('plans', {});
    const passengers = loadFromStorage('passengers', []); // Demais passageiros
    const responsiblePassenger = loadFromStorage('responsiblePassenger', {});
    const resume = loadFromStorage('resume', {});

    // 🔹 Montamos um array 'allTravelers' onde o 1º é o "responsiblePassenger"
    // e depois vêm todos os 'passengers'.
    const allTravelers = [responsiblePassenger, ...passengers];
    const quantidadeViajantes = allTravelers.length; // ex.: 1 + passengers.length

    // Monta a lista "Viajantes" que a API exige
    const viajantesArray = allTravelers.map((person, index) => {
      // Se for o primeiro, "Viajante". Se for o segundo ou mais, "Viajante2", etc.
      const paramName = index === 0 ? 'Viajante' : `Viajante${index + 1}`;

      return {
        parametername: paramName,
        parameterlist: [
          {
            parametername: 'DataNascimentoViajante',
            parametervalue: person.birthday || '1999-01-01',
          },
          {
            parametername: 'NomeViajante',
            parametervalue: person.firstName || `NomeV${index + 1}`,
          },
          {
            parametername: 'SobrenomeViajante',
            parametervalue: person.secondName || `SobrenomeV${index + 1}`,
          },
          {
            parametername: 'NomeSocialViajante',
            parametervalue: person.socialName || `NomeSocialV${index + 1}`,
          },
          {
            parametername: 'SexoViajante',
            parametervalue: person.gender || 'M',
          },
          {
            parametername: 'CPFViajante',
            parametervalue: person.CPF || '778.261.566-61',
          },
          { parametername: 'PPEViajante', parametervalue: '0' },
          { parametername: 'PPERelacionamentoViajante', parametervalue: '' },
        ],
      };
    });

    // Agora montamos o resto do JSON, inclusive "QuantidadeViajantes"
    return {
      // Exemplo: se houver SessionID
      SessionID: editQuote?.SessionID || '',

      CodigoMotivoViagem: editQuote.CodigoMotivoViagem || '',
      CodigoTipoProduto: editQuote.CodigoTipoProduto || '',
      CodigoProduto: plans.CodigoProduto || '',
      CodigoOrigem: 'SP',
      CodigoDestino: editQuote.CodigoDestino || '',
      DataInicioViagem: editQuote.departure || '',
      DataFinalViagem: editQuote.arrival || '',
      DiasMultiviagem: editQuote.DiasMultiviagem || '0',
      CupomDesconto: editQuote.CupomDesconto || '',
      CNPJ: editQuote.CNPJ || '',

      // Dados pessoais do responsável (para a política da API)
      TipoDocumento: 'CPF',
      NumeroCPF: responsiblePassenger.CPF || '872.614.621-52',
      DataNascimento: responsiblePassenger.birthday || '1990-09-01',
      Nome: responsiblePassenger.firstName || 'CENARIO4',
      Sobrenome: responsiblePassenger.secondName || 'CENARIO4',
      NomeSocial: responsiblePassenger.socialName || 'NomeSocial CENARIO4',
      Sexo: responsiblePassenger.gender || 'M',
      Email: responsiblePassenger.email || 'test@test.com',
      CEP: responsiblePassenger.zipCode || '13846555',
      Rua: responsiblePassenger.address || 'TESTE',
      Bairro: responsiblePassenger.district || 'TESTE',
      CodigoEstado: responsiblePassenger.state || 'SP',
      Cidade: responsiblePassenger.city || 'TESTE',
      Numero: responsiblePassenger.numberAddress || '123',
      DDD: responsiblePassenger.DDD || '',
      NumeroTelefone: responsiblePassenger.tell || '11111111',
      TipoTelefone: responsiblePassenger.TipoTelefone || '',
      EmailEmergencia: responsiblePassenger.EmailEmergencia || '',
      DDDEmergencia: responsiblePassenger.DDDEmergencia || '',
      TelefoneEmergencia: responsiblePassenger.TelefoneEmergencia || '',
      TipoTelefoneEmergencia: responsiblePassenger.TipoTelefoneEmergencia || '',
      NomeEmergencia: responsiblePassenger.NomeEmergencia || '',
      SobrenomeEmergencia: responsiblePassenger.SobrenomeEmergencia || '',
      NomeSocialEmergencia: responsiblePassenger.NomeSocialEmergencia || '',

      // 🔹 Passageiros (responsável + demais)
      QuantidadeViajantes: String(quantidadeViajantes),
      Viajantes: viajantesArray,

      // Se a API exigir esse campo, mesmo vazio:
      CoberturasAdicionais: [],

      // Exemplo: Forma de Pagamento e dados do Cartão
      FormaPagamento: 'TMA',
      NumeroParcelas: '1',
      CartaoDataExpiracao: '12/25',
      CartaoTitular: 'Nome Titular',
      CartaoNumero: '0000000000000001',
      CartaoCodigoSeguranca: '123',

      // Preço total
      PrecoTotal: resume.total || 'R$ 0,00',
    };
  };

  // Sempre que formaPagamento ou cardData mudar, refazemos o paymentJSON
  useEffect(() => {
    const json = buildPaymentJSON();
    setPaymentData(json);
    saveToStorage('pagamento', json);
  }, [formaPagamento, cardData]);

  /**
   * handleConfirmPayment:
   * Chamada pelo subcomponente (Cartão/Pix) na hora de clicar "Realizar Pagamento".
   * Aqui podemos enviar o JSON para a API ou fazer o que for necessário.
   */
  // Função que faz o POST para a API
  const handleEnviarParaAPI = async () => {
    if (!paymentData) return;
    try {
      console.log('Enviando dados de pagamento...', paymentData);

      // Exemplo de requisição POST
      const response = await axios.post(
        'http://localhost:3050/omint-viagem/process/emissao-bilhete',
        paymentData,
      );

      console.log('Resposta da API:', response.data);
      // Se chegar até aqui, a emissão foi concluída
      setIsEmissaoConcluida(true);
    } catch (error) {
      console.error('Erro ao enviar pagamento para API:', error);
      // Trate o erro (toast, modal, etc.)
    }
  };

  /**
   * handleConfirmPayment:
   * Chamado pelo subcomponente "CreditCard" ou "Pix"
   * ao clicar em "Realizar Pagamento".
   * Nesta hora, enviamos o paymentData para a rota da API.
   */
  const handleConfirmPayment = () => {
    handleEnviarParaAPI();
  };

  return (
    <div className="w-full h-auto flex flex-col items-center overflow-x-hidden">
      {/* Resumo da Compra (Desktop) */}
      <div className="hidden sm:block w-full max-w-7xl px-2 sm:px-4">
        <DetalhesCompra pagamento={paymentData} />
      </div>

      {/* Conteúdo Principal */}
      <div className="w-full max-w-5xl p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#313131] mb-2 sm:mb-4">
          Pagamento
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          Escolha o método de pagamento desejado:
        </p>

        <TabsNavigation
          setFormaPagamento={setFormaPagamento}
          // Quando o usuário finalizar no cartão, chamamos handleConfirmPayment
          onCreditCardSubmit={(dadosCartao) => {
            setCardData(dadosCartao);
            // Envia para a API
            handleConfirmPayment();
          }}
          // Se houver Pix e "Realizar Pagamento", chamaria também:
          onPixConfirm={() => {
            handleConfirmPayment();
          }}
        />

        {/* Resumo da Compra (Mobile) */}
        <div className="block sm:hidden w-full max-w-7xl px-2 sm:px-4 mt-4">
          <DetalhesCompra pagamento={paymentData} />
        </div>
      </div>

      {/* Exemplo: se emissão concluída, mostra a tela de sucesso */}
      {isEmissaoConcluida && <Purchased paymentData={paymentData} />}
    </div>
  );
};

export default Payment;
