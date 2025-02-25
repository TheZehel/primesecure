import React from 'react';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import ReactInputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { incrementOpenCount } from './modalSlice'; // ajuste o caminho conforme sua estrutura

export function PopupBack() {
  const [open, setOpen] = React.useState(false);
  const [isMouseNearTop, setIsMouseNearTop] = React.useState(false);
  // Usando Redux para armazenar a contagem de aberturas
  const openCount = useSelector((state) => state.modal.openCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Função para mapear o caminho para um identificador de conversão (se necessário)
  const getConversionIdentifier = () => {
    const pathToIdentifierMap = {
      '/primetravel': 'lead-primetravel-api',
      '/seguro-de-vida': 'lead-seguro-de-vida-api',
      '/seguro-pet-porto': 'lead-seguro-pet-api',
      '/seguro-residencial-porto-2': 'lead-seguro-residencial-api',
      '/equipamentos-portateis-3': 'lead-seguro-celular-api',
      '/sulamerica-odonto': 'lead-sulamerica-odonto-api',
      '/seguro-bike': 'lead-seguro-bike-api',
      '/consorcio-imovel': 'lead-consorcio-imovel-api',
      '/consorcio-auto': 'lead-consorcio-auto',
    };

    return (
      pathToIdentifierMap[window.location.pathname] || 'default-identifier'
    );
  };

  // Função que pode ser usada para disparar algum evento com o identificador (se necessário)
  const handleOpen = () => {
    const conversionIdentifier = getConversionIdentifier();
    console.log('Conversion Identifier:', conversionIdentifier);
    // Se estiver abrindo (modal fechado) e ainda não ultrapassou o limite, incrementa a contagem
    if (!open) {
      if (openCount >= 2) return;
      dispatch(incrementOpenCount());
    }
    setOpen((cur) => !cur);
  };

  const handleNavigateToPrivacyPolicy = () => {
    navigate('/politicas-de-privacidade');
  };

  // Detecta se o mouse está perto do topo e, nesse caso, abre o modal
  React.useEffect(() => {
    const threshold = 50; // distância em pixels do topo para disparar a ação

    const handleMouseMove = (event) => {
      const mouseY = event.clientY;
      // Abre o modal via exit-intent somente se o modal estiver fechado e o limite não foi atingido
      if (mouseY < threshold && !open && openCount < 2) {
        setIsMouseNearTop(true);
        setOpen(true);
        dispatch(incrementOpenCount());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [open, openCount, dispatch]);

  // Ações dos botões da confirmação
  const handleConfirmYes = () => {
    setOpen(false);
    setIsMouseNearTop(false);
    navigate(-1); // Exemplo: volta uma página (pode ser ajustado conforme necessário)
  };

  const handleConfirmNo = () => {
    setOpen(false);
    setIsMouseNearTop(false);
    window.focus(); // Tenta recuperar o foco para a janela atual
  };

  return (
    <>
      {/* O modal é aberto somente se o estado "open" estiver verdadeiro */}
      {open && (
        <Dialog
          size="lg"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[55rem] border border-bluePrime2/30">
            {/* Layout para telas pequenas: mostra a imagem mobile e o formulário em coluna */}
            <div className="block md:hidden relative">
              {/* Imagem Mobile */}
              <div className="border border-bluePrime2/30">
                <img
                  src="https://placehold.co/600x300"
                  alt="Promoção - Mobile"
                  className="object-cover w-full h-auto"
                />
                {/* Botão "X" posicionado em cima da imagem */}
                <button
                  onClick={handleOpen}
                  className="absolute top-2 right-2 text-bluePrime hover:text-bluePrime2 transition-colors z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
              {/* Formulário */}
              <div className="p-4 border border-bluePrime2/30">
                <CardBody className="flex flex-col gap-4">
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    className="text-grayPrime"
                  >
                    🎉 Promoção de carnaval! 🎉
                  </Typography>
                  <Typography
                    className="mb-3 font-normal text-grayPrime"
                    variant="paragraph"
                  >
                    Seja notificado sobre nossas promoções e novidades.
                  </Typography>
                  {/* Input para Nome */}
                  <Typography className="-mb-2 text-grayPrime" variant="h6">
                    Seu nome:
                  </Typography>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  />
                  <Typography className="-mb-2 text-grayPrime" variant="h6">
                    Seu e-mail:
                  </Typography>
                  <input
                    type="email"
                    name="email"
                    id="email-address"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  />
                  <Typography className="-mb-2 text-grayPrime" variant="h6">
                    Seu telefone:
                  </Typography>
                  <ReactInputMask
                    size="lg"
                    mask="(99) 9.9999-9999"
                    maskChar={null}
                    maxLength="16"
                    type="text"
                    name="phone"
                    id="phone"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    variant="gradient"
                    onClick={handleOpen}
                    fullWidth
                    className="bg-bluePrime hover:bg-bluePrime2 transition-colors"
                  >
                    Enviar
                  </Button>
                  <Typography
                    variant="small"
                    className="mt-4 flex justify-center text-grayPrime"
                  >
                    <div className="flex mt-5 text-start">
                      <Typography>
                        Ao preencher aceito os
                        <button
                          onClick={handleNavigateToPrivacyPolicy}
                          className="font-medium text-grayPrime hover:text-bluePrime transition-colors"
                        >
                          &nbsp;Termos & Condições
                        </button>
                      </Typography>
                    </div>
                  </Typography>
                </CardFooter>
              </div>
            </div>

            {/* Layout para telas médias e maiores: duas colunas */}
            <div className="hidden md:flex">
              {/* Coluna esquerda: imagem desktop */}
              <div className="w-1/2 border border-bluePrime2/30">
                <img
                  src="https://placehold.co/800"
                  alt="Promoção - Desktop"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Coluna direita: formulário */}
              <div className="w-1/2 p-4 flex flex-col border border-bluePrime2/30">
                {/* Botão "X" */}
                <div className="flex justify-end">
                  <button
                    onClick={handleOpen}
                    className="text-bluePrime hover:text-bluePrime2 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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
                <CardBody className="flex flex-col gap-4 flex-grow">
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    className="text-grayPrime"
                  >
                    🎉 Promoção de carnaval! 🎉
                  </Typography>
                  <Typography
                    className="mb-3 font-normal text-grayPrime"
                    variant="paragraph"
                  >
                    Seja notificado sobre nossas promoções e novidades.
                  </Typography>
                  {/* Input para Nome */}
                  <Typography className="-mb-2 text-grayPrime" variant="h6">
                    Seu nome:
                  </Typography>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  />
                  <Typography className="-mb-2 text-grayPrime" variant="h6">
                    Seu e-mail:
                  </Typography>
                  <input
                    type="email"
                    name="email"
                    id="email-address"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  />
                  <Typography className="-mb-2 text-grayPrime" variant="h6">
                    Seu telefone:
                  </Typography>
                  <ReactInputMask
                    size="lg"
                    mask="(99) 9.9999-9999"
                    maskChar={null}
                    maxLength="16"
                    type="text"
                    name="phone"
                    id="phone"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    variant="gradient"
                    onClick={handleOpen}
                    fullWidth
                    className="bg-bluePrime hover:bg-bluePrime2 transition-colors"
                  >
                    Enviar
                  </Button>
                  <Typography
                    variant="small"
                    className="mt-4 flex justify-center text-grayPrime"
                  >
                    <div className="flex mt-5 text-start">
                      <Typography>
                        Ao preencher aceito os
                        <button
                          onClick={handleNavigateToPrivacyPolicy}
                          className="font-medium text-grayPrime hover:text-bluePrime transition-colors"
                        >
                          &nbsp;Termos & Condições
                        </button>
                      </Typography>
                    </div>
                  </Typography>
                </CardFooter>
              </div>
            </div>
          </Card>
        </Dialog>
      )}
    </>
  );
}

export default PopupBack;
