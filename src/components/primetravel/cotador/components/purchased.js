import React, { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storageUtils";
import {
  Pencil,
  User,
  MapPinHouse,
  CircleDollarSign,
  MapPin,
  Plane,
  Phone,
} from "lucide-react";
import moment from "moment";

// Tabela de destinos: value -> label
const destinations = [
  { value: "1", label: "África", code: "AF" },
  { value: "2", label: "América Central", code: "AC" },
  { value: "3", label: "Ásia", code: "AS" },
  { value: "4", label: "Europa", code: "EU" },
  { value: "5", label: "América do Norte", code: "AN" },
  { value: "6", label: "Oceania", code: "OC" },
  { value: "7", label: "América do Sul", code: "AS" },
  { value: "8", label: "Brasil", code: "BR" },
  { value: "9", label: "Múltiplos destinos", code: "MD" },
];

const Purchased = () => {
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    const updateDetalhes = () => {
      // Carrega várias chaves do sessionStorage
      const resume = loadFromStorage("resume", {});
      const plans = loadFromStorage("plans", {});
      const editQuote = loadFromStorage("editQuote", {});
      const responsiblePassenger = loadFromStorage("responsiblePassenger", {});
      const passengers = loadFromStorage("passengers", []);

      // Exemplo: se 'passengers' for um objeto, use:
      // const passengersObj = loadFromStorage('passengers', {});
      // const passengers = Object.values(passengersObj);

      // Monta um objeto único
      const pagamento = {
        resume,
        plans,
        editQuote,
        responsiblePassenger,
        passengers,
      };

      // Salva se quiser unificar (opcional)
      saveToStorage("pagamento", pagamento);
      setDetalhes(pagamento);
    };

    updateDetalhes();

    // Se quiser que reaja ao evento storage (mudanças em outra aba, etc.)
    window.addEventListener("storage", updateDetalhes);
    return () => window.removeEventListener("storage", updateDetalhes);
  }, []);

  // 1) DADOS DO RESPONSÁVEL
  const r = detalhes?.responsiblePassenger || {};
  // Calcula idade a partir de "birthday" (formato YYYY-MM-DD, por exemplo)
  let idade = "";
  if (r.birthday) {
    // Tenta calcular diferença em anos
    const diffYears = moment().diff(r.birthday, "years");
    idade = diffYears >= 0 ? diffYears : "";
  }

  // Endereço completo
  const enderecoCompleto = [
    r.address,
    r.numberAddress,
    r.city,
    r.district,
    r.completeAddress
  ]
    .filter(Boolean) // remove strings vazias/undefined
    .join(", ");

  // 2) DEMAIS PASSAGEIROS
  // Se 'passengers' é array
  const passengerList = Array.isArray(detalhes?.passengers)
    ? detalhes.passengers
    : [];

  // 3) DESTINO E DATAS
  const foundDestination = destinations.find(
    (dest) => dest.value === detalhes?.editQuote?.selectedOption
  );
  const destinoSelecionado = foundDestination
    ? foundDestination.label
    : "Não selecionado";

  const dataIda =
    detalhes?.editQuote?.departure &&
    moment(detalhes.editQuote.departure).format("DD/MM/YYYY");
  const dataVolta =
    detalhes?.editQuote?.arrival &&
    moment(detalhes.editQuote.arrival).format("DD/MM/YYYY");

  // 4) PLANO ESCOLHIDO (nome, preço unitário)
  const plan = detalhes?.plans || {};
  const precoUnitario = plan.price || "R$ 0,00";
  const planoNome = plan.title || "Nenhum plano";

  // 5) TOTAL GERAL
  const total = detalhes?.resume?.total || "R$ 0,00";

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-md shadow">
      {/* MENSAGEM DE AGRADECIMENTO */}
      <h2 className="text-3xl font-bold text-[#313131] mb-4">Obrigado!</h2>
      <p className="mb-6 text-gray-700">
        Aqui você pode ver o seu pedido...
      </p>

      {/* RESUMO */}
      <div className="space-y-6">
        {/* PASSAGEIRO RESPONSÁVEL */}
        <h3 className="text-xl font-semibold mb-2">Passageiro Responsável</h3>
        <div className="border border-gray-200 rounded p-3 text-sm grid gap-2">
          <InfoLine label="Nome Completo" value={`${r.firstName || ""} ${r.secondName || ""}`} />
          <InfoLine label="CPF" value={r.CPF || ""} />
          <InfoLine label="Idade" value={idade ? `${idade} anos` : "Não informada"} />
          <InfoLine label="Telefone" value={r.tell || ""} />
          <InfoLine label="Endereço Completo" value={enderecoCompleto || "Não informado"} />
        </div>

        {/* DEMAIS PASSAGEIROS */}
        <h3 className="text-xl font-semibold mb-2">Demais Passageiros</h3>
        {passengerList.length > 0 ? (
          <div className="border border-gray-200 rounded p-3 text-sm space-y-3">
            {passengerList.map((p, idx) => {
              // Se quiser calcular idade deles também, repita a lógica
              let idadePass = "";
              if (p.birthday) {
                const diff = moment().diff(p.birthday, "years");
                idadePass = diff >= 0 ? diff : "";
              }

              return (
                <div key={idx} className="border-b border-gray-100 pb-2">
                  <InfoLine
                    label="Nome Completo"
                    value={`${p.firstName || ""} ${p.secondName || ""}`}
                  />
                  <InfoLine label="CPF" value={p.CPF || ""} />
                  <InfoLine label="Idade" value={idadePass ? `${idadePass} anos` : "Não informada"} />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-600">Nenhum passageiro adicional cadastrado.</p>
        )}

        {/* DESTINO E DATAS */}
        <h3 className="text-xl font-semibold mb-2">Destino e Datas</h3>
        <div className="border border-gray-200 rounded p-3 text-sm grid gap-2">
          <InfoLine label="Destino" value={destinoSelecionado} />
          <InfoLine
            label="Data de Ida e Volta"
            value={
              dataIda && dataVolta
                ? `${dataIda} - ${dataVolta}`
                : "Não especificado"
            }
          />
        </div>

        {/* PLANO ESCOLHIDO + PREÇO UNITÁRIO */}
        <h3 className="text-xl font-semibold mb-2">Plano Escolhido</h3>
        <div className="border border-gray-200 rounded p-3 text-sm grid gap-2">
          <InfoLine label="Nome do Plano" value={planoNome} />
          <InfoLine label="Preço Unitário" value={precoUnitario} />
        </div>

        {/* TOTAL GERAL */}
        <h3 className="text-xl font-semibold mb-2">Total</h3>
        <div className="border border-gray-200 rounded p-3 text-sm">
          {total}
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para exibir uma linha de informação
function InfoLine({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <span className="font-medium">{label}:</span>
      <span className="sm:ml-2 text-bluePrime font-semibold break-words">
        {value}
      </span>
    </div>
  );
}

export default Purchased;
