import React, { useEffect, useState } from 'react';
import TabsNavigation from './subcomponents/navigation';
import DetalhesCompra from './subcomponents/detalhesCompra';
import Purchased from './purchased';

const Payment = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState("TMA"); // Estado para armazenar a forma de pagamento

  useEffect(() => {
    const buildPaymentJSON = () => {
      // Buscar os dados do sessionStorage
      const pagamento = JSON.parse(sessionStorage.getItem('pagamento')) || {};
      const editQuote = JSON.parse(sessionStorage.getItem('editQuote')) || {};
      const plans = JSON.parse(sessionStorage.getItem('plans')) || {};
      const passengers = JSON.parse(sessionStorage.getItem('passengers')) || [];
      const responsiblePassenger = JSON.parse(sessionStorage.getItem('responsiblePassenger')) || {};

      // Criar estrutura base do JSON
      const paymentJSON = {
        CodigoMotivoViagem: editQuote.CodigoMotivoViagem || "",
        CodigoTipoProduto: editQuote.CodigoTipoProduto || "",
        CodigoProduto: plans.CodigoProduto || "",
        CodigoOrigem: "SP",
        CodigoDestino: editQuote.CodigoDestino || "",
        DataInicioViagem: editQuote.departure || "",
        DataFinalViagem: editQuote.arrival || "",
        DiasMultiviagem: editQuote.DiasMultiviagem || "0",
        CupomDesconto: editQuote.CupomDesconto || "",
        CNPJ: editQuote.CNPJ || "",
        TipoDocumento: "CPF",
        NumeroCPF: responsiblePassenger.CPF || "872.614.621-52",
        DataNascimento: responsiblePassenger.birthday || "1990-09-01",
        Nome: responsiblePassenger.firstName || "CENARIO4",
        Sobrenome: responsiblePassenger.secondName || "CENARIO4",
        NomeSocial: responsiblePassenger.socialName || "NomeSocial CENARIO4",
        Sexo: responsiblePassenger.gender || "M",
        Email: responsiblePassenger.email || "test@test.com",
        CEP: responsiblePassenger.zipCode || "13846555",
        Rua: responsiblePassenger.address || "TESTE",
        Bairro: responsiblePassenger.district || "TESTE",
        CodigoEstado: responsiblePassenger.state || "SP",
        Cidade: responsiblePassenger.city || "TESTE",
        Numero: responsiblePassenger.numberAddress || "123",
        DDD: responsiblePassenger.DDD || "",
        NumeroTelefone: responsiblePassenger.tell || "11111111",
        TipoTelefone: responsiblePassenger.TipoTelefone || "",
        EmailEmergencia: responsiblePassenger.EmailEmergencia || "",
        DDDEmergencia: responsiblePassenger.DDDEmergencia || "",
        TelefoneEmergencia: responsiblePassenger.TelefoneEmergencia || "",
        TipoTelefoneEmergencia: responsiblePassenger.TipoTelefoneEmergencia || "",
        NomeEmergencia: responsiblePassenger.NomeEmergencia || "",
        SobrenomeEmergencia: responsiblePassenger.SobrenomeEmergencia || "",
        NomeSocialEmergencia: responsiblePassenger.NomeSocialEmergencia || "",
        QuantidadeViajantes: String(passengers.length || 1),
        Viajantes: passengers.map((passenger, index) => ({
          parametername: `Viajante${index + 1}`,
          parameterlist: [
            { parametername: "DataNascimentoViajante", parametervalue: passenger.birthday || "1999-01-01" },
            { parametername: "NomeViajante", parametervalue: passenger.firstName || `NomeV${index + 1}` },
            { parametername: "SobrenomeViajante", parametervalue: passenger.secondName || `SobrenomeV${index + 1}` },
            { parametername: "NomeSocialViajante", parametervalue: passenger.NomeSocial || `NomeSocialV${index + 1}` },
            { parametername: "SexoViajante", parametervalue: passenger.gender || "M" },
            { parametername: "CPFViajante", parametervalue: passenger.CPF || "778.261.566-61" },
            { parametername: "PPEViajante", parametervalue: "0" },
            { parametername: "PPERelacionamentoViajante", parametervalue: "" },
          ],
        })),

        // 🔹 ATUALIZAÇÃO DA FORMA DE PAGAMENTO 🔹
        FormaPagamento: formaPagamento, // Atualiza de acordo com a escolha do usuário
        NumeroParcelas: "1",
        CartaoDataExpiracao: "12/25",
        CartaoTitular: "Nome Titular",
        CartaoNumero: "0000000000000001",
        CartaoCodigoSeguranca: "123",
      };

      console.log("JSON de pagamento gerado:", JSON.stringify(paymentJSON, null, 2));
      return paymentJSON;
    };

    setPaymentData(buildPaymentJSON());
  }, [formaPagamento]); // Atualiza sempre que a forma de pagamento mudar

  return (
    <div className="w-full h-auto flex flex-col items-center overflow-x-hidden">
      {/* 🔹 Resumo da Compra (Desktop) - No topo */}
      <div className="hidden sm:block w-full max-w-7xl px-2 sm:px-4">
        <DetalhesCompra paymentData={paymentData} />
      </div>

      {/* Conteúdo Principal */}
      <div className="w-full max-w-5xl p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#313131] mb-2 sm:mb-4">
          Pagamento
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          Escolha o método de pagamento desejado:
        </p>

        {/* Navegação por Abas */}
        <TabsNavigation setFormaPagamento={setFormaPagamento} />

        {/* 🔹 Resumo da Compra (Mobile) - No final */}
        <div className="block sm:hidden w-full max-w-7xl px-2 sm:px-4 mt-4">
          <DetalhesCompra paymentData={paymentData} />
        </div>
      </div>

      <Purchased paymentData={paymentData} />
    </div>
  );
};

export default Payment;
