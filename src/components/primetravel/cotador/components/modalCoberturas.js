import React, { useState } from "react";
import { X } from "lucide-react";
import CoverageData from "../modules/Modulocoberturas";

export const ModalCoberturas = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            {/* Link para abrir o modal */}
            <a href="#!" onClick={openModal} className="text-blue-500 underline">
                Ver Coberturas
            </a>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="bg-white rounded-lg shadow-lg relative overflow-hidden"
                        style={{
                            width: "90vw", // 90% da largura da viewport
                            height: "90vh", // 90% da altura da viewport
                            maxWidth: "1000px", // Tamanho máximo para desktops maiores
                        }}
                    >
                        {/* Botão de fechar */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Título */}
                        <h2 className="text-lg font-bold mb-4 text-center p-4">Tabela de Coberturas</h2>

                        {/* Conteúdo scrollável */}
                        <div
                            className="overflow-y-auto"
                            style={{
                                height: "calc(90vh - 80px)", // Altura do modal menos o espaço ocupado pelo título e margens
                                padding: "0 16px 16px", // Espaçamento interno
                            }}
                        >
                            <table className="table-auto w-full border-collapse text-xs">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-2 py-1 text-left w-2/5" rowSpan={2}>
                                            Lista de coberturas
                                        </th>
                                        <th
                                            className="border px-2 py-1 text-center bg-blue-100"
                                            colSpan={2}
                                        >
                                            Planos Nacionais
                                        </th>
                                        <th
                                            className="border px-2 py-1 text-center bg-blue-200"
                                            colSpan={3}
                                        >
                                            Planos Internacionais
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-1 text-center bg-blue-100">Plano PRIME 30</th>
                                        <th className="border px-2 py-1 text-center bg-blue-100">Plano PRIME 60</th>
                                        <th className="border px-2 py-1 text-center bg-blue-200">Plano PRIME 40</th>
                                        <th className="border px-2 py-1 text-center bg-blue-200">Plano PRIME 80</th>
                                        <th className="border px-2 py-1 text-center bg-blue-200">Plano PRIME 150</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CoverageData.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border px-2 py-1 flex items-center gap-2">
                                                {item.icon} {/* Aqui renderiza o ícone do item */}
                                                <span>{item.description}</span>
                                            </td>
                                            {item.plans.map((plan, planIndex) => (
                                                <td
                                                    key={planIndex}
                                                    className={`border px-2 py-1 text-center truncate ${planIndex < 2 ? "bg-blue-100" : "bg-blue-200"
                                                        }`}
                                                >
                                                    {plan}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalCoberturas;
