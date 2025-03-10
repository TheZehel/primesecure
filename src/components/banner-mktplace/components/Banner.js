/**
 * Componente `Banner`
 *
 * Este componente exibe um carrossel de banners responsivos usando o Swiper.js.
 * Os banners mudam automaticamente e são interativos, permitindo redirecionar o usuário ao clicar.
 *
 * @module Banner
 * @memberof BannerMktplace
 * @alias BannerMktplace.Banner
 *
 * @requires react
 * @requires swiper/react
 * @requires swiper/css/pagination
 * @requires swiper/css/navigation
 * @requires react-router-dom
 * @requires swiper/modules
 * @requires "../css/style.css"
 *
 * @example
 * // Exemplo de uso:
 * import Banner from './components/Banner';
 *
 * function App() {
 *   return (
 *     <Banner />
 *   );
 * }
 *
 * @returns {JSX.Element} Um componente JSX contendo o carrossel de banners.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../css/style.css';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function Banner() {
  /**
   * Largura atual da janela de exibição.
   * @type {number}
   */
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  /**
   * Referência para o círculo de progresso de reprodução automática.
   * Utilizado para manipular o progresso visual do autoplay.
   * @type {React.RefObject<SVGElement>}
   */

  const progressCircle = useRef(null);
  /**
   * Referência para o conteúdo textual do progresso de reprodução automática.
   * Mostra o tempo restante em segundos.
   * @type {React.RefObject<HTMLSpanElement>}
   */
  const progressContent = useRef(null);

  /**
   * Função que atualiza o progresso do autoplay com base no tempo restante.
   * @param {Swiper} s - Instância do Swiper.
   * @param {number} time - Tempo restante em milissegundos.
   * @param {number} progress - Progresso entre 0 e 1.
   */
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  useEffect(() => {
    /**
     * Atualiza a largura da tela.
     */
    const updateScreenWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  /**
   * Lista de banners exibidos no carrossel.
   * @type {Array<Object>}
   * @property {number} id - Identificador único do banner.
   * @property {string} srcLarge - URL da imagem para telas grandes.
   * @property {string} srcMedium - URL da imagem para telas médias.
   * @property {string} srcMobile - URL da imagem para telas pequenas.
   * @property {string} alt - Texto alternativo para a imagem.
   * @property {string} href - URL de redirecionamento ao clicar no banner.
   */

  const banners = [
    {
      id: 1,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-consumidor-primetravel.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-consumidor-primetravel.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-consumidor-primetravel.png',
      alt: 'Banner de Natal para Telas Grandes',
      href: '/primetravel',
    },
    {
      id: 2,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-mulher-vida-sulamerica.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-mulher-vidasulamerica.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-mulher-vidasulamerica.png',
      alt: 'Banner de Natal para Telas Grandes',
      href: '/seguro-de-vida',
    },
    {
      id: 3,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-consumidor-residencial.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-consumidor-residencial.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-consumidor-residencial.png',
      alt: 'Banner de Natal para Telas Grandes',
      href: '/seguro-residencial-porto-2',
    },

    //{
    //  id: 4,
    //  srcLarge:
    //    "https://storage.googleapis.com/primesecure/banners/novembro/lp/celular/srclarge-black-friday-2024-celular-porto.//png",
    //  srcMedium:
    //    "https://storage.googleapis.com/primesecure/banners/novembro/lp/celular/srcmedium-black-friday-2024-celulpnar.g",
    //  srcMobile:
    //    "https://storage.googleapis.com/primesecure/banners/novembro/lp/celular/srcmobile-black-friday-2024-celular.png",
    //  alt: "Banner de Natal para Telas Grandes",
    //  href: "/equipamentos-portateis-3",
    //},
    {
      id: 5,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-consumidor-pet.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-consumidor-pet.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-consumidor-pet.png',
      alt: 'Banner de Natal para Telas Grandes',
      href: '/seguro-pet-porto',
    },
    {
      id: 6,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-consumidor-imovel.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-consumidor-imovel.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-consumidor-imovel.png',
      alt: 'Banner Consrociado de Imóvel para Telas Grandes',
      href: '/consorcio-imovel',
    },
    {
      id: 7,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-consumidor-auto.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-consumidor-auto.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-consumidor-auto.png',
      alt: 'Banner de Natal para Telas Grandes',
      href: '/consorcio-auto',
    },
    {
      id: 8,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-consumidor-odonto.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-consumidor-odonto.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-consumidor-odonto.png',
      alt: 'Banner de Natal para Telas Grandes',
      href: '/sulamerica-odonto',
    },
    {
      id: 9,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-consumidor-primetravel.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-consumidor-primetravel.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-consumidor-primetravel.png',
      alt: 'Banner de Natal para Telas Grandes',
      href: '/primetravel',
    },
    {
      id: 10,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-consumidor-celular.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-consumidor-celular.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-consumidor-celular.png',
      alt: 'Banner de Natal para Telas Grandes',
      href: '/simple2you',
    },
    {
      id: 11,
      srcLarge:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/large/srclarge-consumidor-bike.png',
      srcMedium:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/medium/srcmedium-consumidor-bike.png',
      srcMobile:
        'https://storage.googleapis.com/primesecure/home/Mar%C3%A7o2025/semana%20do%20consumidor/mobile/srcmobile-consumidor-bike.png',
      alt: 'Banner de Natal para Telas Grandes',
      href: '/seguro-bike',
    },
  ];

  return (
    <div className="m-5">
      <Swiper
        className="rounded-xl h-[141px] sm:h-[420px]"
        pagination={{ clickable: true }}
        loop={true}
        grabCursor={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={
                viewportWidth >= 1500
                  ? banner.srcLarge
                  : viewportWidth >= 1024
                  ? banner.srcMedium
                  : banner.srcMobile
              }
              alt={banner.alt}
              className="h-full w-full cursor-pointer mb-[33px] rounded-xl"
              onClick={() => (window.location.href = banner.href)}
            />
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
