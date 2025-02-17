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
import ListaPaises from "../../components/ListaPaises";

const Purchased = () => {
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    const updateDetalhes = () => {
      const resume = loadFromStorage("resume", {});
      const plans = loadFromStorage("plans", {});
      const editQuote = loadFromStorage("editQuote", {});
      const responsiblePassenger = loadFromStorage("responsiblePassenger", {});
      const passengers = loadFromStorage("passengers", []);

      // Busca o nome do destino pelo código no ListaPaises
      const destinoNome = ListaPaises.find(
        (pais) => pais.regiao === editQuote?.CodigoDestino
      )?.label;

      // Formata as datas
      const dataViagem = {
        inicio: editQuote?.DataInicioViagem
          ? moment(editQuote.DataInicioViagem).format("DD/MM/YYYY")
          : "Não especificado",
        fim: editQuote?.DataFinalViagem
          ? moment(editQuote.DataFinalViagem).format("DD/MM/YYYY")
          : "Não especificado",
      };

      // Adiciona o nome do plano e preço unitário a partir de `plans`
      const planoNome = plans?.DescricaoProduto || "Nenhum plano";
      const precoUnitario = plans?.ValorProduto
        ? `R$ ${plans.ValorProduto.toFixed(2)}`
        : "R$ 0,00";

      const pagamento = {
        resume,
        plans: {
          ...plans,
          planoNome,
          precoUnitario,
        },
        editQuote: {
          ...editQuote,
          destinoNome,
          dataViagem,
        },
        responsiblePassenger,
        passengers,
      };

      saveToStorage("pagamento", pagamento);
      setDetalhes(pagamento);
    };

    updateDetalhes();

    window.addEventListener("storage", updateDetalhes);
    return () => window.removeEventListener("storage", updateDetalhes);
  }, []);

  // Responsável
  const r = detalhes?.responsiblePassenger || {};
  let idade = "";
  if (r.birthday) {
    const diffYears = moment().diff(r.birthday, "years");
    idade = diffYears >= 0 ? diffYears : "";
  }

  const enderecoCompleto = [
    r.address,
    r.numberAddress,
    r.city,
    r.district,
    r.completeAddress,
  ]
    .filter(Boolean)
    .join(", ");

  // Passageiros
  const passengerList = Array.isArray(detalhes?.passengers)
    ? detalhes.passengers
    : [];

  // Destino e datas
  const destinoSelecionado = detalhes?.editQuote?.destinoNome || "Não especificado";
  const dataIda = detalhes?.editQuote?.dataViagem?.inicio || "Não especificado";
  const dataVolta = detalhes?.editQuote?.dataViagem?.fim || "Não especificado";

  // Plano escolhido
  const planoNome = detalhes?.plans?.planoNome || "Nenhum plano";
  const precoUnitario = detalhes?.plans?.precoUnitario || "R$ 0,00";

  // Total geral
  const total = detalhes?.resume?.total || "R$ 0,00";

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-md shadow">
      <h2 className="text-3xl font-bold text-[#313131] mb-4">Obrigado!</h2>
      <p className="mb-6 text-gray-700">Aqui você pode ver o seu pedido...</p>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-2">Passageiro Responsável</h3>
        <div className="border border-gray-200 rounded p-3 text-sm grid gap-2">
          <InfoLine label="Nome Completo" value={`${r.firstName || ""} ${r.secondName || ""}`} />
          <InfoLine label="CPF" value={r.CPF || ""} />
          <InfoLine label="Idade" value={idade ? `${idade} anos` : "Não informada"} />
          <InfoLine label="Telefone" value={r.tell || ""} />
          <InfoLine label="Endereço Completo" value={enderecoCompleto || "Não informado"} />
        </div>

        <h3 className="text-xl font-semibold mb-2">Demais Passageiros</h3>
        {passengerList.length > 0 ? (
          <div className="border border-gray-200 rounded p-3 text-sm space-y-3">
            {passengerList.map((p, idx) => {
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

        <h3 className="text-xl font-semibold mb-2">Destino e Datas</h3>
        <div className="border border-gray-200 rounded p-3 text-sm grid gap-2">
          <InfoLine label="Destino" value={destinoSelecionado} />
          <InfoLine label="Data de Ida" value={dataIda} />
          <InfoLine label="Data de Volta" value={dataVolta} />
        </div>

        <h3 className="text-xl font-semibold mb-2">Plano Escolhido</h3>
        <div className="border border-gray-200 rounded p-3 text-sm grid gap-2">
          <InfoLine label="Nome do Plano" value={planoNome} />
          <InfoLine label="Preço Unitário" value={precoUnitario} />
        </div>

        <h3 className="text-xl font-semibold mb-2">Total</h3>
        <div className="border border-gray-200 rounded p-3 text-sm">{total}</div>
      </div>
    </div>
  );
};

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
