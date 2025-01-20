import React, { useEffect, useState } from "react";
import { DollarSign, Plane, Users } from "lucide-react";
import { loadFromStorage } from "../utils/storageUtils"; // Para carregar do sessionStorage

export function InvoiceTable() {
  const [plans, setPlans] = useState([]);
  const [passengerCount, setPassengerCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Carrega os dados do sessionStorage
    const storedPlan = loadFromStorage("plans", {});
    const storedQuote = loadFromStorage("editQuote", { olds: [0, 0, 0] });

    // Processa os passageiros e total com base nos dados do sessionStorage
    const totalPassengers = storedQuote.olds.reduce((sum, count) => sum + count, 0);
    const planPrice = storedPlan?.price ? parseFloat(storedPlan.price.replace("R$", "").replace(",", ".")) : 0;

    // Atualiza os estados
    setPlans(storedPlan ? [storedPlan] : []);
    setPassengerCount(totalPassengers);
    setTotal(planPrice * totalPassengers);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              <div className="flex items-center">
                <Plane className="mr-2 text-sm text-blue-500" />
                Nome do Plano
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex justify-center">
                <Users className="mr-2 text-sm text-blue-500" />
                Qtd Passageiros
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2 text-right">
              <div className="flex justify-end">
                <DollarSign className="mr-2 text-sm text-blue-500" />
                Total
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {plans.length > 0 ? (
            plans.map((plan, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{plan.title}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{passengerCount}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {(parseFloat(plan.price.replace("R$", "").replace(",", ".")) * passengerCount).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                Nenhum plano selecionado.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="font-semibold">
            <td className="border border-gray-300 px-4 py-2 text-right" colSpan={2}>
              Total Geral
            </td>
            <td className="border border-gray-300 px-4 py-2 text-right">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default InvoiceTable;
