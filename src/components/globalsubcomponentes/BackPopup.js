import React, { useState, useEffect, useRef } from 'react';
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
import { incrementProductCount } from './modalSlice';

export function PopupBack({
  productId,
  delay = 10800000,
  banner: bannerProp,
  isPromotionOpen,
}) {
  // State variables
  const initialPopupShown = localStorage.getItem('popupShown') === 'true';
  const [open, setOpen] = useState(false);
  const [alreadyOpened, setAlreadyOpened] = useState(initialPopupShown);
  const [lastOpenTime, setLastOpenTime] = useState(0);

  // Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openCount = useSelector((state) => state.modal.counts[productId] || 0);

  // Refs for tracking mouse position
  const mouseTimerRef = useRef(null);
  const mouseEnteredTimeRef = useRef(null);

  // Get banner data
  const conversionData = bannerProp
    ? { banner: bannerProp }
    : getConversionData();
  const { banner } = conversionData;
  const mobileImageSrc = banner.srcMobile;
  const desktopImageSrc = banner.srcLarge;

  // Function to get banner and conversion data
  function getConversionData() {
    // ... existing banner mapping code
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
      '/seguro-celular-kakau': 'lead-seguro-celular-kakau-api',
    };
    const productBanners = {
      '/primetravel': {
        srcLarge:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-primetravel.png',
        srcMobile:
          'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-primetravel.png',
      },
      '/seguro-de-vida': {
        // srcLarge:
        //   'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/desktop/srclarge-carnaval-2025-vida.png',
        // srcMobile:
        //   'https://storage.googleapis.com/primesecure/pop-promo%C3%A7%C3%A3o/mobile/srcmobile-carnaval-2025-vida.png',
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
    const banner = productBanners[currentPath] || {
      srcLarge: 'https://link-default-grande.jpg',
      srcMobile: 'https://link-default-mobile.jpg',
    };
    return { conversionIdentifier, banner };
  }

  // Handle opening/closing the popup manually
  const handleOpen = () => {
    if (isPromotionOpen) return; // Never open if promotion is open

    const now = Date.now();
    if (!open) {
      if (openCount >= 2) return;
      if (lastOpenTime && now - lastOpenTime < delay) {
        console.log('Delay não cumprido, aguarde um pouco.');
        return;
      }
      setLastOpenTime(now);
      dispatch(incrementProductCount(productId));
      localStorage.setItem('popupShown', 'true');
      setAlreadyOpened(true);
    }
    setOpen((cur) => !cur);
  };

  const handleNavigateToPrivacyPolicy = () => {
    navigate('/politicas-de-privacidade');
  };

  // Effect to track mouse position and open popup
  useEffect(() => {
    console.log('BackPopup setup: isPromotionOpen =', isPromotionOpen);

    // IMPORTANT: If promotion is open, don't track mouse movement
    if (isPromotionOpen) {
      console.log('Promotion popup is open, not tracking mouse for BackPopup');
      // Clear any timers
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current);
        mouseTimerRef.current = null;
      }
      mouseEnteredTimeRef.current = null;
      return;
    }

    // Skip if we've already opened the popup too many times
    if (openCount >= 2) {
      return;
    }

    const threshold = 50; // Distance from top in pixels
    const hoverDelay = 3000; // Time mouse must stay at top (3 seconds)

    const handleMouseMove = (event) => {
      // DOUBLE CHECK: Never proceed if promotion popup is open
      if (isPromotionOpen) {
        if (mouseTimerRef.current) {
          clearTimeout(mouseTimerRef.current);
          mouseTimerRef.current = null;
        }
        mouseEnteredTimeRef.current = null;
        return;
      }

      const mouseY = event.clientY;
      const now = Date.now();

      // Mouse is near the top edge of the browser
      if (mouseY < threshold) {
        // Start tracking time if not already tracking
        if (!mouseEnteredTimeRef.current) {
          console.log('Mouse entered top area, starting timer');
          mouseEnteredTimeRef.current = now;

          // Set a timer to open the popup if mouse stays at top
          mouseTimerRef.current = setTimeout(() => {
            // Final check before showing popup
            if (!isPromotionOpen && mouseEnteredTimeRef.current) {
              // Calculate how long mouse has been at top
              const timeInTopArea = now - mouseEnteredTimeRef.current;

              if (timeInTopArea >= hoverDelay) {
                console.log('Mouse stayed at top for 3s, showing BackPopup');

                // Make sure promotion is closed and we haven't shown too many times
                if (!isPromotionOpen && !open && openCount < 2) {
                  // Check cooldown period
                  if (lastOpenTime && now - lastOpenTime < delay) {
                    console.log('Still in cooldown, not showing BackPopup');
                    return;
                  }

                  // Show popup
                  setOpen(true);
                  setLastOpenTime(now);
                  dispatch(incrementProductCount(productId));
                  localStorage.setItem('popupShown', 'true');
                  setAlreadyOpened(true);
                }
              }
            }
            mouseTimerRef.current = null;
          }, hoverDelay);
        }
      } else {
        // Mouse moved away from top - reset timer
        if (mouseEnteredTimeRef.current) {
          console.log('Mouse moved away from top area, canceling timer');
          mouseEnteredTimeRef.current = null;

          // Clear the timer
          if (mouseTimerRef.current) {
            clearTimeout(mouseTimerRef.current);
            mouseTimerRef.current = null;
          }
        }
      }
    };

    // Add mouse movement listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current);
        mouseTimerRef.current = null;
      }
    };
  }, [
    isPromotionOpen,
    open,
    openCount,
    lastOpenTime,
    delay,
    productId,
    dispatch,
  ]);

  // IMPORTANT: Return null if the promotion popup is open
  if (isPromotionOpen) {
    console.log('PromotionPopup is open - preventing BackPopup render');
    return null;
  }

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
            {/* Mobile layout */}
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

            {/* Desktop layout */}
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
                    id="name-desktop"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                  />
                  <Typography className="-mb-2 text-grayPrime" variant="h6">
                    Seu e-mail:
                  </Typography>
                  <input
                    type="email"
                    name="email"
                    id="email-address-desktop"
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
                    id="phone-desktop"
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
