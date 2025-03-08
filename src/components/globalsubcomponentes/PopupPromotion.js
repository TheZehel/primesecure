import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import LoadingAnimation from './icons/loadingSvg';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFormField,
  updateMultipleFields,
} from '../../redux/slices/formSlice';

export function PromotionPopup({ banner: bannerProp, onClose }) {
  // Use Redux instead of FormContext
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const [localFormData, setLocalFormData] = useState({ ...formData });
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Extrai parâmetros UTM da URL
  const getUtmParams = () => {
    let params = {};
    let search = window.location.search.substring(1);
    if (search) {
      search.split('&').forEach((item) => {
        let data = item.split('=');
        params[data[0]] = decodeURIComponent(data[1]);
      });
    }
    return params;
  };

  useEffect(() => {
    const utmParams = getUtmParams();
    if (Object.keys(utmParams).length > 0) {
      // Atualiza tanto o estado local quanto o Redux
      setLocalFormData((prev) => ({ ...prev, ...utmParams }));
      dispatch(updateMultipleFields(utmParams));
    }
  }, [dispatch]);

  // Atualiza o estado local quando o estado do Redux mudar
  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  // Estado do popup: inicializa como false e será aberto conforme a condição
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lógica para exibir o popup somente se já se passaram 3 horas desde o último fechamento
  useEffect(() => {
    const lastPopupTimestamp = localStorage.getItem('lastPopupTimestamp');
    const now = Date.now();
    const threeHours = 3 * 60 * 60 * 1000;
    if (
      !lastPopupTimestamp ||
      now - parseInt(lastPopupTimestamp, 10) >= threeHours
    ) {
      setOpen(true);
    }
  }, []);

  // Mapeia a rota para identificador de conversão e banners
  const getConversionData = () => {
    const pathToIdentifierMap = {
      '/primetravel': 'lead-primetravel-popup',
      '/seguro-de-vida': 'lead-seguro-vida-popup',
      '/seguro-pet-porto': 'lead-seguro-pet-popup',
      '/seguro-residencial-porto-2': 'lead-seguro-residencial-popup',
      '/equipamentos-portateis-3': 'lead-seguro-celular-porto-popup',
      '/sulamerica-odonto': 'lead-sulamerica-odonto-popup',
      '/primetravel/': 'lead-primetravel-popup',
      '/seguro-de-vida/': 'lead-seguro-vida-popup',
      '/seguro-pet-porto/': 'lead-seguro-pet-popup',
      '/seguro-residencial-porto-2/': 'lead-seguro-residencial-popup',
      '/equipamentos-portateis-3/': 'lead-seguro-celular-porto-popup',
      '/sulamerica-odonto/': 'lead-sulamerica-odonto-popup',
      '/seguro-bike': 'lead-seguro-bike-popup',
      '/seguro-bike/': 'lead-seguro-bike-popup',
      '/seguro-celular-kakau': 'lead-seguro-celular-kakau-popup',
      '/seguro-celular-kakau/': 'lead-seguro-celular-kakau-popup',
      '/consorcio-imovel': 'lead-consorcio-imovel-popup',
      '/consorcio-imovel/': 'lead-consorcio-imovel-popup',
      '/consorcio-auto': 'lead-consorcio-auto-popup',
      '/consorcio-auto/': 'lead-consorcio-auto-popup',
      '/': 'lead-home-popup',
      '/sobre': 'lead-sobre-popup',
      '/contato': 'lead-contato-popup',
    };

    const productBanners = {
      '/primetravel': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-primetravel.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-primetravel.png',
      },
      '/': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-home.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-home.png',
      },
      '/sobre': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-home.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-home.png',
      },
      '/contato': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-home.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-home.png',
      },
      '/seguro-pet-porto': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-pet.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-pet.png',
      },
      '/seguro-residencial-porto-2': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-residencial.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-residencial.png',
      },
      '/equipamentos-portateis-3': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-celularPorto.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-celularPorto.png',
      },
      '/seguro-celular-kakau': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-cell.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-celular.png',
      },
      '/seguro-bike': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-bike.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-bike.png',
      },
      '/consorcio-imovel': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-imovel.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-imovel.png',
      },
      '/consorcio-auto': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-auto.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-auto.png',
      },
      '/seguro-vida-omint': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-vida.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-vida.png',
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

  const conversionData = bannerProp
    ? { banner: bannerProp }
    : getConversionData();
  const { banner } = conversionData;
  const mobileImageSrc = banner.srcMobile;
  const desktopImageSrc = banner.srcLarge;

  const getConversionIdentifier = () => {
    return getConversionData().conversionIdentifier;
  };

  // Função para emitir evento na dataLayer (RD Station)
  const emitDataLayerEvent = () => {
    return new Promise((resolve, reject) => {
      const urlToEventMap = {
        '/primetravel/': 'lead-primetravel-popup',
        '/seguro-de-vida/': 'lead-seguro-vida-popup',
        '/seguro-pet-porto/': 'lead-seguro-pet-popup',
        '/seguro-residencial-porto-2/': 'lead-seguro-residencial-popup',
        '/equipamentos-portateis-3/': 'lead-seguro-celular-porto-popup',
        '/sulamerica-odonto/': 'lead-sulamerica-odonto-popup',
        '/primetravel': 'lead-primetravel-popup',
        '/seguro-de-vida': 'lead-seguro-vida-popup',
        '/seguro-pet-porto': 'lead-seguro-pet-popup',
        '/seguro-residencial-porto-2': 'lead-seguro-residencial-popup',
        '/equipamentos-portateis-3': 'lead-seguro-celular-porto-popup',
        '/sulamerica-odonto': 'lead-sulamerica-odonto-popup',
        '/seguro-bike': 'lead-seguro-bike-popup',
        '/seguro-bike/': 'lead-seguro-bike-popup',
        '/seguro-celular-kakau': 'lead-seguro-celular-kakau-popup',
        '/seguro-celular-kakau/': 'lead-seguro-celular-kakau-popup',
        '/consorcio-imovel': 'lead-consorcio-imovel-popup',
        '/consorcio-imovel/': 'lead-consorcio-imovel-popup',
        '/consorcio-auto': 'lead-consorcio-auto-popup',
        '/consorcio-auto/': 'lead-consorcio-auto-popup',
        '/': 'lead-home-popup',
        '/sobre': 'lead-sobre-popup',
        '/contato': 'lead-contato-popup',
      };
      const path = window.location.pathname;
      const eventIdentifier = urlToEventMap[path];
      if (!eventIdentifier) {
        reject(`Nenhum evento foi encontrado para essa URL: ${path}`);
        return;
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventIdentifier,
      });
      resolve();
    });
  };

  const navigateBasedOnPath = () => {
    // Apenas gerencia o estado, sem redirecionar
    setSubmitSuccess(true);
    setTimeout(() => {
      finalizeAndClosePopup();
    }, 1500);
  };

  // Função para fechar o popup e realizar ações finais
  const finalizeAndClosePopup = () => {
    handleClose();
    setIsLoading(false);
  };

  // Função de envio do formulário com integração RD Station
  const handleSubmit = async () => {
    setIsLoading(true);
    // Atualiza o estado do Redux com todos os dados locais do formulário
    dispatch(updateMultipleFields(localFormData));

    const apiKey = process.env.REACT_APP_API_KEY_RD_STATION;
    const optionsRD = {
      method: 'POST',
      url: `https://api.rd.services/platform/conversions?api_key=${apiKey}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        event_type: 'CONVERSION',
        event_family: 'CDP',
        payload: {
          conversion_identifier: getConversionIdentifier(),
          email: localFormData.email,
          name: localFormData.name,
          mobile_phone: localFormData.phone,
          cf_source: localFormData.utm_source,
          cf_medium: localFormData.utm_medium,
          cf_campaign: localFormData.utm_campaign,
        },
      },
    };

    try {
      const responseRD = await axios.request(optionsRD);
      console.log('RD Station Response:', responseRD);
      await emitDataLayerEvent();

      // Exibe mensagem de sucesso sem redirecionar
      setSubmitSuccess(true);
      setTimeout(() => {
        finalizeAndClosePopup();
      }, 1500);
    } catch (error) {
      console.error('Error in RD Station or Data Layer event:', error);
      setSubmitSuccess(true);
      setTimeout(() => {
        finalizeAndClosePopup();
      }, 1500);
    }
  };

  const handleNavigateToPrivacyPolicy = () => {
    navigate('/politicas-de-privacidade');
  };

  // Ao fechar o popup, registra o horário no localStorage e notifica o componente pai
  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('lastPopupTimestamp', Date.now().toString());
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <>
      <Dialog
        size="lg"
        open={open}
        handler={handleClose}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-2 sm:m-auto sm:w-[58%] max-h-[70%] border border-bluePrime2/30">
          {/* Layout para telas pequenas */}
          <div className="block md:hidden">
            <div className="border border-bluePrime2/30">
              <img
                src={mobileImageSrc}
                alt="Promoção - Mobile"
                className="object-cover w-full h-auto rounded-t-lg"
              />
            </div>
            <div
              className="p-4 border border-bluePrime2/30 overflow-y-auto"
              style={{ maxHeight: '50vh' }}
            >
              <div className="relative">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="text-grayPrime"
                >
                  🎉 Promoção de carnaval! 🎉
                </Typography>
                <button
                  onClick={handleClose}
                  className="absolute top-0 right-0 mt-1 mr-1 text-bluePrime hover:text-bluePrime2 transition-colors"
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
              <CardBody className="flex flex-col gap-4 mt-4">
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
                  value={localFormData.name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setLocalFormData((prev) => ({ ...prev, [name]: value }));
                    dispatch(updateFormField({ field: name, value }));
                  }}
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
                  value={localFormData.email}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setLocalFormData((prev) => ({ ...prev, [name]: value }));
                    dispatch(updateFormField({ field: name, value }));
                  }}
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
                  value={localFormData.phone}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setLocalFormData((prev) => ({ ...prev, [name]: value }));
                    dispatch(updateFormField({ field: name, value }));
                  }}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                />
              </CardBody>
              <CardFooter className="pt-0">
                {submitSuccess ? (
                  <div className="text-center py-4 text-green-600 font-bold">
                    Enviado com sucesso! Obrigado.
                  </div>
                ) : (
                  <Button
                    variant="gradient"
                    onClick={handleSubmit}
                    fullWidth
                    disabled={isLoading}
                    className="bg-bluePrime hover:bg-bluePrime2 transition-colors h-10 flex justify-center items-center"
                  >
                    {isLoading ? <LoadingAnimation size="24" /> : 'Enviar'}
                  </Button>
                )}

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
                className="object-cover w-full h-full rounded-s-lg"
              />
            </div>
            <div className="w-1/2 p-4 flex flex-col border border-bluePrime2/30">
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
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
                  value={localFormData.name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setLocalFormData((prev) => ({ ...prev, [name]: value }));
                    dispatch(updateFormField({ field: name, value }));
                  }}
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
                  value={localFormData.email}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setLocalFormData((prev) => ({ ...prev, [name]: value }));
                    dispatch(updateFormField({ field: name, value }));
                  }}
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
                  value={localFormData.phone}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setLocalFormData((prev) => ({ ...prev, [name]: value }));
                    dispatch(updateFormField({ field: name, value }));
                  }}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                />
              </CardBody>
              <CardFooter className="pt-0">
                {submitSuccess ? (
                  <div className="text-center py-4 text-green-600 font-bold">
                    Enviado com sucesso! Obrigado.
                  </div>
                ) : (
                  <Button
                    variant="gradient"
                    onClick={handleSubmit}
                    fullWidth
                    disabled={isLoading}
                    className="bg-bluePrime hover:bg-bluePrime2 transition-colors h-10 flex justify-center items-center"
                  >
                    {isLoading ? <LoadingAnimation size="24" /> : 'Enviar'}
                  </Button>
                )}
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
