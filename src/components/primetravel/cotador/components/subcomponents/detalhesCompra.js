import { CircleDollarSign, MapPin, MapPinHouse, Pencil, Plane, User } from "lucide-react";
import React from "react";

export default function DetalhesCompra() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="m-4 p-6 bg-white rounded-lg border-2 border-grayPrime/30">
                {/* Título */}
                <div className="text-grayPrime font-semibold text-start text-lg">
                    Resumo do pedido:
                </div>
                <hr className="border-bluePrime/40 m-2" />

                {/* Conteúdo Responsivo */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-grayPrime text-left text-xs">
                    {/* Nome */}
                    <div className="flex items-start">
                        <Pencil className="w-4 h-4 mr-2 flex-shrink-0" />
                        <div>
                            <strong>Nome inteiro:</strong>
                            <span className="ml-2 text-bluePrime font-semibold break-words">João da Silva Pereira</span>
                        </div>
                    </div>

                    {/* Endereço */}
                    <div className="flex items-start">
                        <MapPinHouse className="w-4 h-4 mr-2 flex-shrink-0" />
                        <div>
                            <strong>Endereço com número:</strong>
                            <span className="ml-2 text-bluePrime font-semibold break-words">Rua das Flores, 1234</span>
                        </div>
                    </div>

                    {/* CPF */}
                    <div className="flex items-start">
                        <User className="w-4 h-4 mr-2 flex-shrink-0" />
                        <div>
                            <strong>CPF:</strong>
                            <span className="ml-2 text-bluePrime font-semibold break-words">123.456.789-00</span>
                        </div>
                    </div>

                    {/* Preço */}
                    <div className="flex items-start">
                        <CircleDollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                        <div>
                            <strong>Preço:</strong>
                            <span className="ml-2 text-bluePrime font-semibold break-words">R$ 1.500,00</span>
                        </div>
                    </div>

                    {/* Destino */}
                    <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <div>
                            <strong>Destino:</strong>
                            <span className="ml-2 text-bluePrime font-semibold break-words">São Paulo, SP</span>
                        </div>
                    </div>

                    {/* Data e hora */}
                    <div className="flex items-start">
                        <Plane className="w-4 h-4 mr-2 flex-shrink-0" />
                        <div>
                            <strong>Data e hora da viagem:</strong>
                            <span className="ml-2 text-bluePrime font-semibold break-words">12/01/2025 às 14:00</span>
                        </div>
                    </div>
                </div>

                <hr className="border-bluePrime/40 m-2 mt-4" />
                <div className="text-grayPrime font-semibold text-start text-base">
                    Total:
                    <span className="ml-2 text-bluePrime font-semibold break-words">Jeilton</span>
                </div>
            </div>
        </div>
    );
}
