import { CircleDollarSign, MapPin, MapPinHouse, Pencil, Plane, User } from "lucide-react";
import React from "react";

export default function DetalhesCompra() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="m-4 p-6 bg-white rounded-lg border-2 border-bluePrime/80">
                {/* Título */}
                <div className="text-grayPrime font-semibold text-start text-lg">
                    Detalhes da compra:
                </div>

                {/* Conteúdo em 3 linhas (grid de 3 colunas) */}
                <div className="mt-3 grid grid-cols-3 gap-x-16 gap-y-4 text-grayPrime text-left text-xs">
                    <div className="flex items-center">
                        <Pencil className="w-4 h-4 mr-2" />
                        <strong>Nome inteiro:</strong>
                    </div>
                    <div className="flex items-center">
                        <MapPinHouse className="w-4 h-4 mr-2" />
                        <strong>Endereço com número:</strong>
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <strong>CPF:</strong>
                    </div>
                    <div className="flex items-center">
                        <CircleDollarSign className="w-4 h-4 mr-2" />
                        <strong>Preço:</strong>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <strong>Destino:</strong>
                    </div>
                    <div className="flex items-center">
                        <Plane className="w-4 h-4 mr-2" />
                        <strong>Data e hora da viagem:</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
