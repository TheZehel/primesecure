import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Importa o useNavigate
import TabsNavigation from './subcomponents/navigation';
import DetalhesCompra from './subcomponents/detalhesCompra';
import { loadFromStorage, saveToStorage } from '../utils/storageUtils';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import LoadingAnimation from '../../../../components/globalsubcomponentes/icons/loadingSvg';
import { getStateCodeFromCity } from '../utils/generateCodigoOrigem';

// Função para extrair DDD e número
function extractDDDAndNumber(fullPhone) {
  const digitsOnly = (fullPhone || '').replace(/\D/g, '');
  if (!digitsOnly) return { ddd: '', numero: '' };
  const ddd = digitsOnly.slice(0, 2);
  const numero = digitsOnly.slice(2);
  return { ddd, numero };
}

const Payment = () => {
  // Hook para navegar
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState('TMA'); // "TMA" (cartão) ou "PIX"
  const [cardData, setCardData] = useState(null);

  // Estado de loading e erros
  const [loading, setLoading] = useState(false);

  /**
   * buildPaymentJSON():
   * Monta o objeto final que será enviado na requisição.
   */
  const buildPaymentJSON = () => {
    const editQuote = loadFromStorage('editQuote', {});
    const plans = loadFromStorage('plans', {});
    const passengers = loadFromStorage('passengers', []);
    const responsiblePassenger = loadFromStorage('responsiblePassenger', {});
    const resume = loadFromStorage('resume', {});

    // Monta lista de viajantes
    const allTravelers = [responsiblePassenger, ...passengers];
    const viajantesArray = allTravelers.map((person, index) => ({
      parametername: index === 0 ? 'Viajante' : `Viajante${index + 1}`,
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
    }));

    const { ddd, numero } = extractDDDAndNumber(
      responsiblePassenger.tell || '',
    );
    const { ddd: emergDDD, numero: emergNumero } = extractDDDAndNumber(
      responsiblePassenger.TelefoneEmergencia || '',
    );

    // Aqui usamos a função do generateCodigoOrigem.js
    // Pegamos a cidade do usuário e convertemos para sigla de estado
    const codigoOrigem = getStateCodeFromCity(responsiblePassenger.city || '');

    return {
      SessionID: editQuote?.SessionID || '',
      CodigoMotivoViagem: editQuote.CodigoMotivoViagem || '',
      CodigoTipoProduto: editQuote.CodigoTipoProduto || '',
      CodigoProduto: plans.CodigoProduto || '',
      CodigoOrigem: codigoOrigem || '',
      CodigoDestino: editQuote.CodigoDestino || '',
      DataInicioViagem: editQuote.departure || '',
      DataFinalViagem: editQuote.arrival || '',
      DiasMultiviagem: editQuote.DiasMultiviagem || '0',
      CupomDesconto: editQuote.CupomDesconto || '',
      CNPJ: editQuote.CNPJ || '',

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

      DDD: ddd || '11',
      NumeroTelefone: numero || '99999999',
      TipoTelefone: responsiblePassenger.TipoTelefone || 'CELUL',

      DDDEmergencia: ddd || '',
      TelefoneEmergencia: numero || '',
      TipoTelefoneEmergencia: responsiblePassenger.TipoTelefone || '',
      NomeEmergencia: responsiblePassenger.firstName || '',
      SobrenomeEmergencia: responsiblePassenger.secondName || '',
      NomeSocialEmergencia: responsiblePassenger.socialName || '',

      QuantidadeViajantes: String(allTravelers.length),
      Viajantes: viajantesArray,

      CoberturasAdicionais: [],

      FormaPagamento: 'TMA',
      NumeroParcelas: '1',
      CartaoDataExpiracao: '12/25',
      CartaoTitular: 'Nome Titular',
      CartaoNumero: '0000000000000001',
      CartaoCodigoSeguranca: '123',

      PrecoTotal: resume.total || 'R$ 0,00',
    };
  };

  // Recalcula o JSON sempre que formaPagamento ou cardData mudar
  useEffect(() => {
    const json = buildPaymentJSON();
    setPaymentData(json);
    saveToStorage('pagamento', json);
  }, [formaPagamento, cardData]);

  // Envia para a API
  const handleEnviarParaAPI = async () => {
    if (!paymentData) return;

    setLoading(true);
    try {
      console.log('Enviando dados de pagamento...', paymentData);

      const response = await axios.post(
        'http://localhost:3050/omint-viagem/process/emissao-bilhete',
        paymentData,
      );
      console.log('Resposta da API:', response.data);

      // Se deu sucesso, ResponseCode === 0
      if (response.data?.ResponseCode === 0) {
        // Exibir um toast de sucesso
        toast.success('Pagamento efetuado com sucesso!', {
          position: 'top-right',
          autoClose: false,
          theme: 'light',
        });

        // Navegar para a página de sucesso
        setTimeout(() => {
          navigate('/cotacao-primetravel/obrigado');
        }, 2000);
      } else {
        // Exibir toast de erro
        const errorMsg =
          response.data?.ResponseDescription ||
          '[ERRO] Pagamento não efetuado.';

        toast.error(errorMsg, {
          position: 'top-right',
          autoClose: false,
          theme: 'light',
        });
        console.log('Mostrando toast de erro...');

        // Force um delay antes de qualquer outra ação
        await new Promise((r) => setTimeout(r, 3000));
      }
    } catch (error) {
      console.error('Erro ao enviar pagamento para API:', error);

      // Erro do servidor ou da própria request
      const errMessage =
        error?.response?.data?.ResponseDescription ||
        error?.message ||
        'Falha ao processar pagamento.';
      toast.error(errMessage, {
        position: 'top-right',
        autoClose: 4000,
        theme: 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  // Chamado ao finalizar no cartão ou PIX
  const handleConfirmPayment = () => {
    handleEnviarParaAPI();
  };

  return (
    <div className="w-full h-auto flex flex-col items-center overflow-x-hidden">
      <ToastContainer style={{ zIndex: 999999 }} />

      {/* Se estiver em loading, exibe um overlay */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="p-4 bg-white rounded-md shadow-md">
            <p>Processando pagamento...</p>
            {/* <LoadingAnimation /> */}
          </div>
        </div>
      )}

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

        {/* TabsNavigation que chama onCreditCardSubmit ou onPixConfirm */}
        <TabsNavigation
          setFormaPagamento={setFormaPagamento}
          onCreditCardSubmit={(dadosCartao) => {
            setCardData(dadosCartao);
            handleConfirmPayment();
          }}
          onPixConfirm={() => {
            handleConfirmPayment();
          }}
        />

        {/* Resumo da Compra (Mobile) */}
        <div className="block sm:hidden w-full max-w-7xl px-2 sm:px-4 mt-4">
          <DetalhesCompra pagamento={paymentData} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
