import { Wifi } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { saveToStorage } from '../../utils/storageUtils';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimation from '../../../../globalsubcomponentes/icons/loadingSvg'; // Atualizado para importar LoadingAnimation
import { useNavigate } from 'react-router-dom';
import Purchased from '../purchased';

const CreditCard = ({ onSubmit }) => {
    const [isPaid, setIsPaid] = useState(false);

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        cardNumber: false,
        cardHolder: false,
        expirationDate: false,
        cvc: false,
    });

    const cardNumberRef = useRef(null);
    const cardHolderRef = useRef(null);
    const expirationDateRef = useRef(null);
    const cvcRef = useRef(null);
    const [plansData, setPlansData] = useState(null);
    const [selectedParcelas, setSelectedParcelas] = useState(1);
    const [valorTotal, setValorTotal] = useState(0);

    const [totalPago, setTotalPago] = useState(valorTotal); // Estado para armazenar o valor exibido no "Total a pagar"


    // Puxa "pagamento" do sessionStorage
    const pagamento = JSON.parse(sessionStorage.getItem('pagamento'));

    console.log("DADO PAGAMENTO creditCard.js: ", pagamento);

    const paymentJSON = {
        CodigoMotivoViagem: pagamento.editQuote.CodigoMotivoViagem || "",
        CodigoTipoProduto: pagamento.editQuote.CodigoTipoProduto || "",
        CodigoProduto: pagamento.plans.CodigoProduto || "",
        CodigoOrigem: "SP",
        CodigoDestino: pagamento.editQuote.CodigoDestino || "",
        DataInicioViagem: pagamento.editQuote.departure || "",
        DataFinalViagem: pagamento.editQuote.arrival || "",
        DiasMultiviagem: pagamento.editQuote.DiasMultiviagem || "0",
        CupomDesconto: pagamento.editQuote.CupomDesconto || "",
        CNPJ: pagamento.editQuote.CNPJ || "",
        TipoDocumento: "CPF",
        NumeroCPF: responsiblePassenger.CPF || "872.614.621-52",
        DataNascimento: responsiblePassenger.birthday || "1990-09-01",
        Nome: responsiblePassenger.firstName || "CENARIO4",
        Sobrenome: responsiblePassenger.secondName || "CENARIO4",
        NomeSocial: responsiblePassenger.socialName || "NomeSocial CENARIO4",
        Sexo: responsiblePassenger.gender || "M",
        Email: responsiblePassenger.email || "test@test.com",
        CEP: responsiblePassenger.zipCode || "13846555",
        Rua: responsiblePassenger.address || "TESTE",
        Bairro: responsiblePassenger.district || "TESTE",
        CodigoEstado: responsiblePassenger.state || "SP",
        Cidade: responsiblePassenger.city || "TESTE",
        Numero: responsiblePassenger.numberAddress || "123",
        DDD: responsiblePassenger.DDD || "",
        NumeroTelefone: responsiblePassenger.tell || "11111111",
        TipoTelefone: responsiblePassenger.TipoTelefone || "",
        EmailEmergencia: responsiblePassenger.EmailEmergencia || "",
        DDDEmergencia: responsiblePassenger.DDDEmergencia || "",
        TelefoneEmergencia: responsiblePassenger.TelefoneEmergencia || "",
        TipoTelefoneEmergencia: responsiblePassenger.TipoTelefoneEmergencia || "",
        NomeEmergencia: responsiblePassenger.NomeEmergencia || "",
        SobrenomeEmergencia: responsiblePassenger.SobrenomeEmergencia || "",
        NomeSocialEmergencia: responsiblePassenger.NomeSocialEmergencia || "",
        QuantidadeViajantes: String(passengers.length || 1),
        Viajantes: passengers.map((passenger, index) => ({
            parametername: `Viajante${index + 1}`,
            parameterlist: [
                { parametername: "DataNascimentoViajante", parametervalue: passenger.birthday || "1999-01-01" },
                { parametername: "NomeViajante", parametervalue: passenger.firstName || `NomeV${index + 1}` },
                { parametername: "SobrenomeViajante", parametervalue: passenger.secondName || `SobrenomeV${index + 1}` },
                { parametername: "NomeSocialViajante", parametervalue: passenger.NomeSocial || `NomeSocialV${index + 1}` },
                { parametername: "SexoViajante", parametervalue: passenger.gender || "M" },
                { parametername: "CPFViajante", parametervalue: passenger.CPF || "778.261.566-61" },
                { parametername: "PPEViajante", parametervalue: "0" },
                { parametername: "PPERelacionamentoViajante", parametervalue: "" },
            ],
        }))

    };

    useEffect(() => {
        sessionStorage.removeItem('cartao');

        // Carregar os dados do `resume` da sessionStorage
        const storedResume = JSON.parse(sessionStorage.getItem('resume'));
        if (storedResume && storedResume.total) {
            const totalNumerico = parseFloat(storedResume.total.replace('R$', '').replace('.', '').replace(',', '.'));
            setValorTotal(totalNumerico);
        }
    }, []);

    const handleInputChange = (name, value) => {
        if (name === 'cardNumber') {
            setCardNumber(value);
            if (value) setErrors((prev) => ({ ...prev, cardNumber: false }));
        } else if (name === 'cardHolder') {
            setCardHolder(value);
            if (value) setErrors((prev) => ({ ...prev, cardHolder: false }));
        } else if (name === 'expirationDate') {
            setExpirationDate(value);
            if (value) setErrors((prev) => ({ ...prev, expirationDate: false }));
        } else if (name === 'cvc') {
            setCvc(value);
            if (value) setErrors((prev) => ({ ...prev, cvc: false }));
        }
    };

    const handleParcelamentoChange = (event) => {
        const parcelas = parseInt(event.target.value, 10);
        setSelectedParcelas(parcelas);
    };

    const handleAddCard = async () => {
        const newErrors = {
            cardNumber: !cardNumber,
            cardHolder: !cardHolder,
            expirationDate: !expirationDate,
            cvc: !cvc,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            toast.error('Preencha todos os dados do cartão para continuar!', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'light',
            });
            return;
        }

        setLoading(true); // Inicia o loading

        try {
            // Simula um tempo de processamento (remova ou ajuste no seu caso real)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const cardData = {
                cardNumber,
                cardHolder,
                expirationDate,
                cvc,
                numeroParcelas: selectedParcelas,
                valorTotal,
            };

            // Salva os dados no sessionStorage
            saveToStorage('cartao', cardData);

            toast.success('Pagamento realizado com sucesso!', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'light',
            });

            // Callback para ações adicionais
            if (onSubmit) onSubmit(cardData);

            // 3. Ao final, dizemos que está pago, trocando para "página de obrigado" local
            setIsPaid(true);
        } catch (error) {
            toast.error('Erro ao processar o pagamento. Tente novamente.', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'light',
            });
            console.error(error);
        } finally {
            setLoading(false); // Finaliza o loading
        }
    };

    const formatCardNumber = (number) => {
        return number.replace(/(\d{4})/g, '$1 ').trim();
    };

    // 4. Renderização condicional:
    // Se o pagamento já foi feito, mostra o componente de "Obrigado"
    if (isPaid) {
        return (
            <div>
                <Purchased />
                <ToastContainer />
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-[1024px] w-full mx-auto px-4 grid gap-8 lg:grid-cols-2 p-4 md:p-6">
                {/* Formulário de Entrada */}
                <div className="grid gap-4">
                    <div className="grid gap-1.5">
                        <label htmlFor="card-number" className="font-semibold">
                            Número do Cartão
                        </label>
                        <InputMask
                            name="cardNumber"
                            inputRef={cardNumberRef}
                            id="card-number"
                            mask="9999 9999 9999 9999"
                            value={cardNumber}
                            placeholder="0000 0000 0000 0000"
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-bluePrime'
                                }`}
                        />
                    </div>

                    <div className="grid gap-1.5">
                        <label htmlFor="card-holder" className="font-semibold">
                            Nome do Titular
                        </label>
                        <input
                            name="cardHolder"
                            ref={cardHolderRef}
                            id="card-holder"
                            value={cardHolder}
                            placeholder="NOME COMPLETO"
                            onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                            className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.cardHolder ? 'border-red-500' : 'border-bluePrime'
                                }`}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="expiration-date" className="font-semibold">
                                Expiração
                            </label>
                            <InputMask
                                name="expirationDate"
                                inputRef={expirationDateRef}
                                id="expiration-date"
                                mask="99/99"
                                value={expirationDate}
                                placeholder="MM/AA"
                                onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                                className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.expirationDate ? 'border-red-500' : 'border-bluePrime'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="cvc" className="font-semibold">
                                CVV
                            </label>
                            <InputMask
                                name="cvc"
                                inputRef={cvcRef}
                                id="cvc"
                                mask="999"
                                value={cvc}
                                placeholder="000"
                                onChange={(e) => handleInputChange('cvc', e.target.value)}
                                className={`border rounded-md h-10 px-4 w-full focus:outline-none ${errors.cvc ? 'border-red-500' : 'border-bluePrime'
                                    }`}
                            />
                        </div>
                    </div>

                    <div className="grid gap-1.5">
                        <label htmlFor="parcelas" className="font-semibold">Escolha o Parcelamento</label>
                        <select
                            id="parcelas"
                            value={selectedParcelas}
                            onChange={handleParcelamentoChange}
                            className="border rounded-md h-10 px-4 w-full focus:outline-none border-bluePrime"
                        >
                            <option value={1}>À vista R$ {valorTotal.toFixed(2)}</option>
                            {[...Array(11)].map((_, index) => {
                                const parcelas = index + 2; // Começa de 2 para evitar repetir o "À vista"
                                return (
                                    <option key={parcelas} value={parcelas}>
                                        {parcelas}x de R$ {(valorTotal / parcelas).toFixed(2)}
                                    </option>
                                );
                            })}
                        </select>
                        <p className="mt-2 text-md font-semibold text-gray-600">
                            Total a pagar:
                        </p>
                        <p className="text-lg text-bluePrime2 font-bold">
                            {selectedParcelas}x de R$ {(valorTotal / selectedParcelas).toFixed(2)}
                        </p>
                    </div>

                    <button
                        onClick={handleAddCard}
                        disabled={loading}
                        className={`mt-4 w-full h-12 font-bold rounded-md transition-all ${loading
                            ? 'bg-bluePrime2 cursor-not-allowed'
                            : 'bg-bluePrime text-white hover:bg-bluePrime2'
                            } flex items-center justify-center`}
                    >
                        {loading ? <LoadingAnimation /> : 'Realizar Pagamento'}
                    </button>
                </div>

                {/* Cartão Virtual */}
                <div className="bg-gradient-to-r from-bluePrime to-bluePrime2 text-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[450px] h-auto sm:h-[210px] md:h-[220px] lg:h-[240px] mx-auto flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <div style={{ transform: 'rotate(90deg)' }}>
                            <Wifi />
                        </div>
                    </div>

                    <div className="flex flex-col items-start mt-4 sm:mt-6">
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight sm:tracking-wide whitespace-nowrap overflow-hidden">
                            {cardNumber ? formatCardNumber(cardNumber) : '0000 0000 0000 0000'}
                        </h4>

                        <div className="mt-2 sm:mt-3 flex flex-col items-start">
                            <div className="text-xs">Nome do Titular</div>
                            <div className="text-xs font-bold uppercase">
                                {cardHolder || 'NOME COMPLETO'}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between w-full text-xs">
                        <div>
                            <div>Expiração</div>
                            <div className="text-sm font-bold">{expirationDate || '00/00'}</div>
                        </div>
                        <div>
                            <div>CVV</div>
                            <div className="text-sm font-bold">{cvc || '000'}</div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreditCard;
