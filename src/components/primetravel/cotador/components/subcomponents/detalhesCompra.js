import { CircleDollarSign, MapPin, MapPinHouse, Pencil, Plane, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "../../utils/storageUtils";
import moment from "moment";

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

export default function DetalhesCompra() {
    const [detalhes, setDetalhes] = useState(null);

    useEffect(() => {
        const updateDetalhes = () => {
            const resume = loadFromStorage("resume", {});
            const plans = loadFromStorage("plans", {});
            const editQuote = loadFromStorage("editQuote", {});
            const responsiblePassenger = loadFromStorage("responsiblePassenger", {});
            const passengers = loadFromStorage("passengers", {});
            const cartao = loadFromStorage("cartao", {}); // Verifica os dados do cartão

            const pagamento = {
                resume,
                plans,
                editQuote,
                responsiblePassenger,
                passengers,
                cartao,
            };

            saveToStorage("pagamento", pagamento); // Atualiza o pagamento na sessionStorage
            setDetalhes(pagamento); // Atualiza o estado do componente
        };

        updateDetalhes();

        // Adiciona um listener para garantir que mudanças no sessionStorage atualizem o estado
        window.addEventListener("storage", updateDetalhes);

        // Remove o listener ao desmontar
        return () => window.removeEventListener("storage", updateDetalhes);
    }, []);

    const formatarData = (data) =>
        moment(data).format("DD/MM/YYYY");

    const destinoSelecionado = destinations.find(
        (dest) => dest.value === detalhes?.editQuote?.selectedOption
    )?.label;

    const dataIda =
        detalhes?.editQuote?.departure &&
        formatarData(detalhes.editQuote.departure);
    const dataVolta =
        detalhes?.editQuote?.arrival &&
        formatarData(detalhes.editQuote.arrival);

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
                        value={`${detalhes?.responsiblePassenger?.firstName || ""} ${detalhes?.responsiblePassenger?.secondName || ""
                            }`}
                    />
                    <InfoItem
                        icon={<User className="w-4 h-4 mr-2 flex-shrink-0" />}
                        label="Passageiros adicionais:"
                        value={Object.values(detalhes?.passengers || {})
                            .map((p) => `${p.firstName} ${p.secondName}`)
                            .join(", ")}
                    />
                    <InfoItem
                        icon={<MapPinHouse className="w-4 h-4 mr-2 flex-shrink-0" />}
                        label="Endereço com número:"
                        value={`${detalhes?.responsiblePassenger?.address || ""}, ${detalhes?.responsiblePassenger?.numberAddress || ""
                            }`}
                    />
                    <InfoItem
                        icon={<User className="w-4 h-4 mr-2 flex-shrink-0" />}
                        label="CPF:"
                        value={detalhes?.responsiblePassenger?.CPF || ""}
                    />
                    <InfoItem
                        icon={<CircleDollarSign className="w-4 h-4 mr-2 flex-shrink-0" />}
                        label="Preço:"
                        value={detalhes?.plans?.price || "R$ 0,00"}
                    />
                    <InfoItem
                        icon={<MapPin className="w-4 h-4 mr-2 flex-shrink-0" />}
                        label="Destino:"
                        value={destinoSelecionado || "Não selecionado"}
                    />
                    <InfoItem
                        icon={<Plane className="w-4 h-4 mr-2 flex-shrink-0" />}
                        label="Data da viagem:"
                        value={
                            dataIda && dataVolta
                                ? `${dataIda} - ${dataVolta}`
                                : "Não especificado"
                        }
                    />
                </div>

                <hr className="border-bluePrime/40 m-2 mt-4" />
                <div className="text-grayPrime font-semibold text-start text-base">
                    Total:
                    <span className="ml-2 text-bluePrime font-semibold break-words">
                        {detalhes?.resume?.total || "R$ 0,00"}
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
