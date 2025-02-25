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
import { incrementProductCount } from './modalSlice'; // ajuste o caminho conforme necessário

export function PopupBack({ productId, delay = 10800000, banner }) {
  const [open, setOpen] = React.useState(false);
  const [isMouseNearTop, setIsMouseNearTop] = React.useState(false);
  // Estado para armazenar o timestamp da última abertura
  const [lastOpenTime, setLastOpenTime] = React.useState(0);
  // Estado para armazenar a largura da viewport
  const [viewportWidth, setViewportWidth] = React.useState(window.innerWidth);

  // Atualiza a largura da viewport ao redimensionar a janela
  React.useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Busca a contagem específica para este produto
  const openCount = useSelector((state) => state.modal.counts[productId] || 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleOpen = () => {
    const now = Date.now();
    // Se o modal estiver fechado, verifica se já atingiu o limite ou se o delay não foi cumprido
    if (!open) {
      if (openCount >= 2) return;
      if (lastOpenTime && now - lastOpenTime < delay) {
        console.log('Delay não cumprido, aguarde um pouco.');
        return;
      }
      // Atualiza o timestamp e incrementa a contagem para este produto
      setLastOpenTime(now);
      dispatch(incrementProductCount(productId));
    }
    setOpen((cur) => !cur);
  };

  const handleNavigateToPrivacyPolicy = () => {
    navigate('/politicas-de-privacidade');
  };

  // Lógica de exit-intent com delay
  React.useEffect(() => {
    const threshold = 50; // distância em pixels do topo para disparar a ação

    const handleMouseMove = (event) => {
      const now = Date.now();
      const mouseY = event.clientY;
      if (mouseY < threshold && !open && openCount < 2) {
        if (lastOpenTime && now - lastOpenTime < delay) {
          return; // Não abre se o delay não foi cumprido
        }
        setIsMouseNearTop(true);
        setOpen(true);
        setLastOpenTime(now);
        dispatch(incrementProductCount(productId));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [open, openCount, dispatch, productId, lastOpenTime, delay]);

  // Ações dos botões da confirmação
  const handleConfirmYes = () => {
    setOpen(false);
    setIsMouseNearTop(false);
    navigate(-1);
  };

  const handleConfirmNo = () => {
    setOpen(false);
    setIsMouseNearTop(false);
    window.focus();
  };

  // Lógica de imagem: se a prop banner for informada, usa-a para escolher entre srcLarge e srcMobile.
  // Se viewportWidth >= 1500, utiliza banner.srcLarge; caso contrário, utiliza banner.srcMobile.
  // Se não houver banner, mantém os valores padrão.
  const mobileImageSrc = banner
    ? viewportWidth >= 1500
      ? banner.srcLarge
      : banner.srcMobile
    : 'https://placehold.co/600x300';
  const desktopImageSrc = banner
    ? viewportWidth >= 1500
      ? banner.srcLarge
      : banner.srcMobile
    : 'https://placehold.co/800';

  return (
    <>
      {open && (
        <Dialog
          size="lg"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none overflow-hidden"
        >
          <Card className="mx-auto w-full max-w-[55rem] border border-bluePrime2/30">
            {/* Layout para telas pequenas */}
            <div className="block md:hidden relative">
              <div className="border border-bluePrime2/30">
                <img
                  src={mobileImageSrc}
                  alt="Promoção - Mobile"
                  className="object-cover w-full h-auto"
                />
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
                  {/* <Typography className="-mb-2 text-grayPrime" variant="h6">
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
                  /> */}
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

            {/* Layout para telas maiores */}
            <div className="hidden md:flex">
              <div className="w-1/2 border border-bluePrime2/30">
                <img
                  src={desktopImageSrc}
                  alt="Promoção - Desktop"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-1/2 p-4 flex flex-col border border-bluePrime2/30">
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
