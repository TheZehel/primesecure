import { Card, CardBody, CardHeader, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import PixIcon from "../../../../cotacao-pet-love/components/icons/pixIcon";
import ModalPix from "./pixModal";

export default function PagamentoPix() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado que controla se o modal está aberto

    return (
        <>
            <Card className="px-4 border-none shadow-none">
                <div className="flex items-center justify-center p-4 text-lg text-bluePrime bg-transparent">
                    <PixIcon
                        className="hover:bluePrime"
                        color="#32BCAD"
                        height="1.5rem"
                        width="1.5rem"
                        opacity="1"
                    />
                    <span className="ml-3">
                        Anual à Vista | Pix
                    </span>
                </div>
                <CardBody className="pt-2 text-base font-normal">
                    <p className="leading-6">
                        Para seguir o seu pagamento com Pix, clique no botão
                        <Button
                            onClick={() => setIsModalOpen(true)} // Abre o modal ao clicar
                            className="font-semibold bg-pixGreen px-4 py-1 rounded-md text-white whitespace-nowrap"
                        >
                            Pagar com Pix
                        </Button>
                        logo em seguida uma nova janela irá se abrir com mais instruções para finalizar a compra.
                    </p>
                </CardBody>
            </Card>

            {/* Modal Pix */}
            <ModalPix
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen} // Passamos a função para fechar o modal
            />
        </>
    );
}
