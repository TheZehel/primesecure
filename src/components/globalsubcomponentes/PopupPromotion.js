import React from 'react';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import ReactInputMask from 'react-input-mask';

export function PromotionPopup({ banner: bannerProp }) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  // Estado para acompanhar a largura da viewport (caso precise usar em outras lógicas)
  const [viewportWidth, setViewportWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Função que mapeia a rota para o identificador e os banners
  const getConversionData = () => {
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
      '/seguro-vida-omint': 'lead-vida-omint-api',
    };

    const productBanners = {
      '/primetravel': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/primetravel/desktop.jpeg',
        srcMobile: '',
      },
      '/seguro-de-vida': {
        srcLarge: 'https://link-para-imagem-grande-seguro-de-vida.jpg',
        srcMobile: 'https://link-para-imagem-mobile-seguro-de-vida.jpg',
      },
      '/seguro-pet-porto': {
        srcLarge: 'https://link-para-imagem-grande-seguro-de-vida.jpg',
        srcMobile: 'https://link-para-imagem-mobile-seguro-de-vida.jpg',
      },
      '/seguro-residencial-porto-2': {
        srcLarge: 'https://link-para-imagem-grande-seguro-de-vida.jpg',
        srcMobile: 'https://link-para-imagem-mobile-seguro-de-vida.jpg',
      },
      '/equipamentos-portateis-3': {
        srcLarge: 'https://link-para-imagem-grande-seguro-de-vida.jpg',
        srcMobile: 'https://link-para-imagem-mobile-seguro-de-vida.jpg',
      },
      '/sulamerica-odonto': {
        srcLarge: 'https://link-para-imagem-grande-seguro-de-vida.jpg',
        srcMobile: 'https://link-para-imagem-mobile-seguro-de-vida.jpg',
      },
      '/seguro-bike': {
        srcLarge: 'https://link-para-imagem-grande-seguro-de-vida.jpg',
        srcMobile: 'https://link-para-imagem-mobile-seguro-de-vida.jpg',
      },
      '/consorcio-imovel': {
        srcLarge: 'https://link-para-imagem-grande-seguro-de-vida.jpg',
        srcMobile: 'https://link-para-imagem-mobile-seguro-de-vida.jpg',
      },
      '/consorcio-auto': {
        srcLarge: 'https://link-para-imagem-grande-seguro-de-vida.jpg',
        srcMobile: 'https://link-para-imagem-mobile-seguro-de-vida.jpg',
      },
      '/seguro-vida-omint': {
        srcLarge: 'https://link-para-imagem-grande-seguro-de-vida.jpg',
        srcMobile: 'https://link-para-imagem-mobile-seguro-de-vida.jpg',
      },
    };

    const currentPath = window.location.pathname;
    const conversionIdentifier =
      pathToIdentifierMap[currentPath] || 'default-identifier';

    const bannerMapping = productBanners[currentPath] || {
      srcLarge: 'https://link-default-grande.jpg',
      srcMobile: 'https://link-default-mobile.jpg',
    };

    return { conversionIdentifier, banner: bannerMapping };
  };

  // Se a prop banner for informada, ela tem precedência; caso contrário, usa o mapeamento de rotas.
  const conversionData = bannerProp
    ? { banner: bannerProp }
    : getConversionData();
  const { banner } = conversionData;

  // Define as URLs de imagem: mobile sempre usa srcMobile e desktop sempre usa srcLarge.
  const mobileImageSrc = banner.srcMobile;
  const desktopImageSrc = banner.srcLarge;

  // Função para obter o identificador de conversão (exemplo de uso)
  const getConversionIdentifier = () => {
    return getConversionData().conversionIdentifier;
  };

  // Exemplo de uso do identificador (apenas exibindo no console)
  const handleOpen = () => {
    const conversionIdentifier = getConversionIdentifier();
    console.log('Conversion Identifier:', conversionIdentifier);
    setOpen((cur) => !cur);
  };

  const handleNavigateToPrivacyPolicy = () => {
    navigate('/politicas-de-privacidade');
  };

  return (
    <>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
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

          {/* Layout para telas médias e maiores */}
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
    </>
  );
}

export default PromotionPopup;
