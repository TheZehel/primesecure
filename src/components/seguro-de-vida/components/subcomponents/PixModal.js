import Modal from "react-modal";
import PixIcon from "../../../cotacao-pet-love/components/icons/pixIcon";
import { useEffect, useState, useRef } from "react";

function CountdownTimer({ modalState, expiration, expired }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [expirated, setExpirated] = useState(false);
  const [timeData, setTimeData] = useState({
    days: "00",
    minutes: "60",
    seconds: "00"
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!expiration) {
      console.log("Expiration not set");
      return;
    }
    console.log("Expiration:", expiration);

    const updateTimer = () => {
      const now = new Date();
      const timeLeft = new Date(expiration) - now;

      if (timeLeft <= 0 && !expirated) {
        clearInterval(intervalRef.current);
        expired(true);
        setExpirated(true);
        return;
      }

      const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));
      const days = String(Math.floor(totalSeconds / (60 * 60 * 24))).padStart(2, '0');
      const minutes = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');

      setTimeData({ days, minutes, seconds });
      setTimeLeft(timeLeft);
    };

    intervalRef.current = setInterval(updateTimer, 1000);
    updateTimer(); 

    return () => clearInterval(intervalRef.current);
  }, [expiration, expirated, expired]);

  const { days, minutes, seconds } = timeData;

  return (
    <div
      id="pix-timer"
      className="text-[14px] font-semibold text-bluePrime sm:text-sm sm:font-bold"
    >
      <div className="hidden ss:hidden sm:block">
        {days > 0 && `${days} dia${parseInt(days) > 1 ? 's' : ''} `}
        {minutes} minuto{parseInt(minutes) > 1 ? 's' : ''} {seconds} segundo{parseInt(seconds) > 1 ? 's' : ''}
      </div>
      <div className="block sm:hidden">
        {days > 0 && `${days}d `}
        {minutes}m {seconds}s
      </div>
    </div>
  );
}

export default function ModalPix({ isOpen, onClose, orderTotal, transaction, expired }) {
  const [expiration, setExpiration] = useState(null);

  const [expirationDate, setExpirationDate] = useState(null);

  const time = useRef(new Date());

  const [total, setTotal] = useState(null);

  const [QRCodeUrl, setQRCodeUrl] = useState(null);

  const [pixCode, setPixCode] = useState("");

  const [pixCopied, setPixCopied] = useState(false);

  const textareaRef = useRef(null);

  const formatCurrency = (value) => {
    let options = {
      style: "decimal",
      useGrouping: true,
      groupingSeparator: ".",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
  
    let price = value.toLocaleString(undefined, options);
  
    return price;
  }; 

  //console.log(transaction);

  //{ order_id, charge_id, qr_code, qr_code_url, expires_at }
  //transaction = {
  //  qr_code: "00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/9dd52f13-8105-4d7f-83bc-ece48d6c49325204000053039865406528.025802BR5925PRIME SECURE CORRETORA DE6014RIO DE JANEIRO62290525paclp9yuhuxxbis1eleeixcdn630430A9",
  //  qr_code_url: "https://api.pagar.me/core/v5/transactions/tran_P6lWMEjUeUw1rz0q/qrcode?payment_method=pix",
  //  expires_at: "2024-11-02T19:00:00Z",
  //  amount: 1000
  //};

  const bodyScrollLock = (lock) => {
    if (lock) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";    
  };

  const pixTimeout = useRef(null);

  const textareaCopy = () => {
    textareaRef.current.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setPixCopied(true);
    pixTimeout.current = setTimeout(()=>{ clearTimeout(pixTimeout.current); setPixCopied(false); }, 4000)
  }

  useEffect(()=>{
    return () => { if (pixTimeout && pixTimeout.current) clearTimeout(pixTimeout.current); }
  }, []);

  useEffect(()=>{
    try{
      if (!transaction) return;

      let {
        expires_at,
        amount,
        qr_code,
        qr_code_url
      } = transaction;

      if (!expires_at) return;      

      setExpiration(expires_at);
      setTotal(amount);

      let exp = new Date(expires_at);

      exp = {
        day: String( exp.getDate() ).padStart(2, '0'),
        month: String( exp.getMonth() + 1 ).padStart(2, '0'),
        year: String( exp.getFullYear() ).padStart(2, '0'),
        hour: String( exp.getHours() ).padStart(2, '0'),
        minute: String( exp.getMinutes() ).padStart(2, '0'),
        second: String( exp.getSeconds() ).padStart(2, '0'),
      };

      exp = `${exp.day}/${exp.month}/${exp.year} - ${exp.hour}:${exp.minute}`;

      setExpirationDate(exp);
      setQRCodeUrl(qr_code_url || "");
      setPixCode(qr_code || "");

    }catch(error){
      console.error('Error modal pix:', error);
    }
  }, [transaction]);

  var pixTotal = total / 100;
  pixTotal = formatCurrency(pixTotal);

  if (!transaction) return(<></>); 

  //return(<></>);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            zIndex: 1000,
          },
        }}
        className="fixed inset-0 flex items-center justify-center sm:p-6"
      >
        {/*Etapa de Resumo da Compra*/}
        <div className="animate__animated animate__fadeIn bg-white rounded-lg shadow sm:px-5 py-4 mx-2 w-[100%] sm:w-650 xl:w-950 xl:h-3/4 h-screen-90 sm:h-6/6 border border-gray-300 overflow-auto">
          <div className="flex justify-between items-center text-xl font-medium py-1 px-3 border-b border-bluePrime">
            <h2>Pague sua fatura via Pix</h2>
            <button className="bg-transparent" onClick={()=>{ console.log('close'); onClose();}}>
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
          <div>
            <h2 className="text-xl font-medium py-1 px-3 border-b border-gray-300 flex justify-between items-center">
              Total: <span id="valor-pix">R$ {pixTotal}</span>
            </h2>
          </div>
          <div className="py-1 px-3 border-b border-gray-300 flex justify-between items-center">
            <div className="text-sm font-medium">Validade do pagamento</div>
            <div className="text-right">
              <div>
                {/*<div
                  id="pix-timer"
                  className="text-xs font-bold text-bluePrime"
                >
                  18 minutos 14 segundos
                </div>*/}
                <CountdownTimer
                  modalState={isOpen}
                  expiration={expiration}
                  expired={ (exp) => { expired(exp); } }
                />
                <div id="pix-vencimento" className="text-sm">
                  <span className="hidden sm:block">Vencimento em</span> {expirationDate}
                </div>
              </div>
            </div>
          </div> 
          <div className="p-2.5 border-b border-gray-300 ">
            <div className="text-base font-medium flex m-auto mr-2.5 text-teal-600">
              <PixIcon color="#32bcad" />
              <div className="mx-auto ml-2.5 text-lg font-medium text-gray-800">
                Escaneie o QR CODE
              </div>
            </div>
            <div
              id="pix-qrcode-container"
              className="w-fit m-5 mx-auto transition-all ease-in-out duration-300"
            >
              <img src={QRCodeUrl} alt="" className="max-w-[180px]"/>
            </div>
            <div id="pix-txt-container" className="pt-1.25 flex">
              <div className="w-full max-w-screen-sm m-auto text-center transition-all ease-in-out duration-300">
                <div className="text-base font-bold text-gray-800 mb-0.5">
                  Seu Código Pix
                </div>
                <textarea
                  ref={textareaRef}
                  id="pix-textarea"
                  rows="3"
                  cols="60"
                  className="w-full text-xs p-1 px-5 resize-none text-left border border-gray-300 bg-gray-200 rounded-md select-none pointer-events-none overflow-none -ms-overflow-style-none my-3"
                  readOnly
                  value={pixCode}
                ></textarea>
                <div
                  id="copiar-container"
                  className="w-full pt-1.25 font-medium text-lg text-green-500 text-center h-0 overflow-hidden"
                >
                  <span
                    id="copiar-mensagem"
                    className="opacity-0 transition-all ease-in-out duration-300"
                  >
                    Chave Pix copiada para área de transferência!
                  </span>
                </div>
                <button
                  id="btn-copiar-pix"
                  className="bg-blue-500 mx-auto text-white font-medium text-sm py-1 px-3 text-center flex items-center justify-center rounded-md transition ease-in-out duration-300 cursor-pointer"
                  type="button" // or "submit" depending on the context
                  onClick={textareaCopy}
                >
                  Copiar Código
                </button>
                <div
                  className={`w-full max-w-[380px] mx-auto mt-1 font-medium text-[#4ED433] transition ease duration-300 ${pixCopied ? "opacity-100" : "opacity-0"}`}
                >
                  Chave Pix copiada para área de transferência!
                </div>
              </div>
            </div>
            <div
              id="sucesso-container"
              className="w-full pb-2.5 font-medium text-lg text-green-500 text-center hidden"
            >
              <span className="transition-all ease-in-out duration-300">
                Pagamento efetuado com sucesso!
              </span>
            </div>
          </div>

          {/*Etapa Instruções*/}
          <div className="pb-1 px-1 border-b border-gray-300 text-sm">
            <div className="instrucao-pix px-4 pt-2.5 pb-0">
              <span className="font-semibold">1.</span> Acesse o app do seu
              banco ou Internet Banking.
            </div>
            <div className="instrucao-pix px-4 py-1">
              <span className="font-semibold">2.</span> Escolha pagar via Pix.
            </div>
            <div className="instrucao-pix px-4 py-1">
              <span className="font-semibold">3.</span> Cole o código acima ou
              escaneie o QR Code.
            </div>
            <div className="px-4 py-1 flex items-center">
              {/* Incluir o ícone do relógio usando o pacote FontAwesome */}
              <span className="relative top-0.5 mr-1">
                {/* Substitua por um componente FontAwesome se estiver disponível */}
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="clock"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  {/* Seu caminho SVG aqui */}
                </svg>
              </span>
              {/*Aguarde um instante, você será redirecionado após o pagamento.*/}
            </div>
            <div className="instrucao-pix p-2.5 text-xs">
              *O pagamento pode levar até 10 minutos para ser processado.
            </div>
          </div>
          <hr className="mb-4" />

          {/*<button className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-2/4 items-center ">
            Aplicar
            </button>*/}
        </div>
      </Modal>
    </div>
  );
}
