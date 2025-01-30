// src/components/PagamentoPix.jsx

import axios from 'axios';
import { Card, CardBody, Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import PixIcon from '../../../../cotacao-pet-love/components/icons/pixIcon';
import ModalPix from './pixModal';
import { loadFromStorage } from '../../utils/storageUtils';
import { montarObjetoPix } from '../../utils/pixUtils';

export default function PagamentoPix() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla se o modal está aberto
  const [pixResponse, setPixResponse] = useState(null); // Armazena a resposta da API
  const [isLoading, setIsLoading] = useState(false); // Controla o estado de carregamento
  const [error, setError] = useState(null); // Armazena erros, se houver

  // Determinar a URL base com base no ambiente
  const environment = process.env.REACT_APP_ENVIRONMENT || 'SANDBOX';
  const baseURL =
    environment === 'PRODUCAO'
      ? process.env.REACT_APP_API_ENDPOINT_PRODUCTION
      : process.env.REACT_APP_API_ENDPOINT_SANDBOX;

  const handlePagarComPix = async () => {
    setIsLoading(true);
    setError(null);
    setPixResponse(null);

    // Recuperar os dados de pagamento da sessionStorage
    const pagamento = loadFromStorage('pagamento', {});
    console.log('Pagamento carregado para PIX:', pagamento); // Log para depuração
    const pixObject = montarObjetoPix(pagamento);

    if (!pixObject) {
      setError('Dados de pagamento inválidos.');
      setIsLoading(false);
      return;
    }

    try {
      // Enviar o objeto PIX para a API backend usando axios
      const response = await axios.post(
        `${baseURL}/omint-viagem/checkout/pix`,
        pixObject,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const data = response.data;
        setPixResponse(data); // Armazena a resposta da API
        setIsModalOpen(true); // Abre o modal para exibir a resposta
      } else {
        setError('Erro inesperado ao processar o pagamento PIX.');
      }
    } catch (err) {
      console.error('Erro na requisição PIX:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro de rede ao processar o pagamento PIX.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="px-4 border-none shadow-none w-full max-w-md mx-auto lg:max-w-4xl">
        <div className="flex items-center justify-center p-4 text-lg text-bluePrime bg-transparent flex-col sm:flex-row">
          <PixIcon
            className="hover:bluePrime"
            color="#32BCAD"
            height="1.5rem"
            width="1.5rem"
            opacity="1"
          />
          <span className="ml-0 mt-2 sm:ml-3 sm:mt-0 text-center sm:text-left">
            À Vista no Pix
          </span>
        </div>

        <CardBody className="pt-2 text-base font-normal">
          <p className="leading-6 text-gray-800">
            Para seguir o seu pagamento com Pix, clique no botão
            <Button
              onClick={handlePagarComPix} // Envia o pagamento ao clicar
              className="font-semibold bg-pixGreen px-4 py-2 rounded-md text-white mt-4 sm:mt-0 sm:ml-2 block sm:inline-block w-full sm:w-auto text-center"
              disabled={isLoading} // Desabilita o botão durante o carregamento
            >
              {isLoading ? 'Processando...' : 'Pagar com Pix'}
            </Button>
            logo em seguida uma nova janela irá se abrir com mais instruções
            para finalizar a compra.
          </p>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </CardBody>
      </Card>

      {/* Modal Pix */}
      {pixResponse && (
        <ModalPix
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen} // Função para fechar o modal
          pixData={pixResponse} // Dados retornados pela API
        />
      )}
    </>
  );
}
