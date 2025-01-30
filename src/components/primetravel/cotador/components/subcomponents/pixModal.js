// src/components/ModalPix.jsx

import Modal from 'react-modal';
import { useEffect, useState, useRef } from 'react';
import PixIcon from '../../../../cotacao-pet-love/components/icons/pixIcon';
import CountdownTimer from '../../../../cotacao-pet-love/components/module/countdownTimer';

export default function ModalPix({
  isOpen,
  setIsOpen, // Recebe do pai a função de controle do estado
  pixData, // Dados retornados pela API
}) {
  const [expirationDate, setExpirationDate] = useState(null);
  const [pixCode, setPixCode] = useState('');
  const [pixCopied, setPixCopied] = useState(false);
  const textareaRef = useRef(null);

  const formatCurrency = (value) => {
    let options = {
      style: 'decimal',
      useGrouping: true,
      groupingSeparator: '.',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return value.toLocaleString(undefined, options);
  };

  const bodyScrollLock = (lock) => {
    document.body.style.overflow = lock ? 'hidden' : 'visible';
  };

  // Puxa a coleção "pagamento" da sessionStorage (se necessário)
  // const pixResponseData = JSON.parse(sessionStorage.getItem('pagamento')) || {};

  // Montar o objeto PIX para exibição (se necessário)
  // const pixData = {
  //   items: [
  //     {
  //       amount: plans.ValorProduto,
  //       description: plans.DescricaoProduto,
  //       quantity: 1,
  //     },
  //   ],
  //   customer: {
  //     name: `${pixResponseData?.firstName} ${pixResponseData?.secondName}`,
  //     email: pixResponseData?.Email,
  //     type: 'individual',
  //     document: pixResponseData?.NumeroCPF,
  //     phones: {
  //       home_phone: {
  //         country_code: '55',
  //         number: pixResponseData?.tell,
  //         area_code: pixResponseData?.tell?.slice(1, 3), // Extraindo DDD
  //       },
  //     },
  //   },
  //   payments: [
  //     {
  //       payment_method: 'pix',
  //       pix: {
  //         expires_in: expiration,
  //         additional_information: [
  //           {
  //             name: 'Quantidade',
  //             value: '1',
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // };

  const textareaCopy = () => {
    textareaRef.current.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 4000);
  };

  // Bloqueia scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      bodyScrollLock(true);
    }
    return () => bodyScrollLock(false);
  }, [isOpen]);

  // Seta dados para exibição no modal
  useEffect(() => {
    try {
      const { expires_in, qr_code, qr_code_url, message, paymentStatus } =
        pixData || {};
      if (!expires_in) return;

      // Calcula a data de expiração com base em 'expires_in' segundos a partir do momento atual
      const expirationTimestamp = Date.now() + parseInt(expires_in, 10) * 1000;
      const exp = new Date(expirationTimestamp);
      const formattedDate = {
        day: String(exp.getDate()).padStart(2, '0'),
        month: String(exp.getMonth() + 1).padStart(2, '0'),
        year: String(exp.getFullYear()).padStart(2, '0'),
        hour: String(exp.getHours()).padStart(2, '0'),
        minute: String(exp.getMinutes()).padStart(2, '0'),
      };

      setExpirationDate(
        `${formattedDate.day}/${formattedDate.month}/${formattedDate.year} - ${formattedDate.hour}:${formattedDate.minute}`,
      );

      setPixCode(qr_code || '');
    } catch (error) {
      console.error('Error modal pix:', error);
    }
  }, [pixData]);

  // Função que fecha o modal
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose} // Fecha ao clicar fora ou apertar ESC
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          zIndex: 1000,
        },
      }}
      className="fixed inset-0 flex items-center justify-center p-6"
      ariaHideApp={false}
    >
      <div className="animate__animated animate__fadeIn bg-white rounded-lg shadow px-5 py-4 mx-2 w-full sm:w-3/4 md:w-1/2 lg:w-2/5 border border-gray-300 overflow-auto">
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center text-xl font-medium py-1 px-3 border-b border-bluePrime">
          <h2>Pague via Pix para garantir sua compra</h2>
          <button
            className="bg-transparent"
            onClick={handleClose} // Chama handleClose para fechar
            aria-label="Fechar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <hr className="mb-4" />

        {/* Valor Pix */}
        <div>
          <h2 className="text-xl font-medium py-1 px-3 border-b border-gray-300 flex justify-between items-center">
            Total:{' '}
            <span id="valor-pix">
              R${' '}
              {pixData?.items?.[0]?.amount
                ? formatCurrency(pixData.items[0].amount / 100)
                : '0,00'}
            </span>
          </h2>
        </div>

        {/* Validade do pagamento */}
        <div className="py-1 px-3 border-b border-gray-300 flex justify-between items-center">
          <div className="text-sm font-medium">Validade do pagamento</div>
          <div className="text-right">
            <CountdownTimer
              modalState={isOpen}
              expiration={pixData?.expires_in}
              expired={false} // Ajuste conforme a lógica do seu CountdownTimer
            />
            <div id="pix-vencimento" className="text-sm">
              Vencimento em {expirationDate}
            </div>
          </div>
        </div>

        {/* QR Code e Código Pix */}
        <div className="p-2.5 border-b border-gray-300">
          <div className="text-base font-medium flex m-auto mr-2.5 text-teal-600">
            <PixIcon color="#32bcad" />
            <div className="mx-auto ml-2.5 text-lg font-medium text-gray-800">
              Escaneie o QR CODE
            </div>
          </div>
          <div className="w-fit m-5 mx-auto">
            {pixData?.qr_code_url ? (
              <img
                src={pixData.qr_code_url}
                alt="QR Code Pix"
                className="max-w-[180px]"
              />
            ) : (
              <p>QR Code não disponível.</p>
            )}
          </div>
          <div className="pt-1.25 flex">
            <div className="w-full max-w-screen-sm m-auto text-center">
              <div className="text-base font-bold text-gray-800 mb-0.5">
                Seu Código Pix
              </div>
              <textarea
                ref={textareaRef}
                rows="3"
                className="w-full text-xs p-1 px-5 resize-none text-left border border-gray-300 bg-gray-200 rounded-md select-none pointer-events-none overflow-hidden my-3"
                readOnly
                value={pixCode}
              />
              <button
                className="bg-blue-500 mx-auto text-white font-medium text-sm py-1 px-3 text-center flex items-center justify-center rounded-md transition ease-in-out duration-300 cursor-pointer"
                onClick={textareaCopy}
              >
                Copiar Código
              </button>
              <div
                className={`w-full max-w-[380px] mx-auto mt-1 font-medium text-[#4ED433] transition ease duration-300 ${
                  pixCopied ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Chave Pix copiada para área de transferência!
              </div>
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="pb-1 px-1 border-b border-gray-300 text-sm">
          <div className="px-4 pt-2.5 pb-0">
            <span className="font-semibold">1.</span> Acesse o app do seu banco
            ou Internet Banking.
          </div>
          <div className="px-4 py-1">
            <span className="font-semibold">2.</span> Escolha pagar via Pix.
          </div>
          <div className="px-4 py-1">
            <span className="font-semibold">3.</span> Cole o código acima ou
            escaneie o QR Code.
          </div>
          <div className="px-4 py-1 flex items-center">
            <span className="relative top-0.5 mr-1"></span>
            Aguarde um instante, você será redirecionado após o pagamento.
          </div>
          <div className="p-2.5 text-xs">
            *O pagamento pode levar até 10 minutos para ser processado.
          </div>
        </div>

        <hr className="mb-4" />
      </div>
    </Modal>
  );
}
