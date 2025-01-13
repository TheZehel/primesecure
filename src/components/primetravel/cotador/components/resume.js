import React from "react";
import { DollarSign, Plane, Users } from "lucide-react";

const invoices = [
  {
    planName: "Plano Familiar",
    passengers: "4",
    total: "R$ 1200,00",
  },
  {
    planName: "Plano Individual",
    passengers: "1",
    total: "R$ 300,00",
  },
  {
    planName: "Plano Empresarial",
    passengers: "6",
    total: "R$ 8000,00",
  },
  {
    planName: "Plano Viagem",
    passengers: "2",
    total: "R$ 600,00",
  },
  {
    planName: "Plano Premium",
    passengers: "3",
    total: "R$ 1500,00",
  },
];

export function InvoiceTable() {
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
          {invoices.map((invoice, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{invoice.planName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{invoice.passengers}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{invoice.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold">
            <td className="border border-gray-300 px-4 py-2 text-right" colSpan={2}>
              Total Geral
            </td>
            <td className="border border-gray-300 px-4 py-2 text-right">
              {invoices.reduce((sum, item) => {
                const value = parseFloat(item.total.replace("R$", "").replace(",", "."));
                return sum + value;
              }, 0).toLocaleString("pt-BR", {
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
