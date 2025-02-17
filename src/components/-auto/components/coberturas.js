import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const coberturas = [
  {
    id: 1,
    titulo: 'Compreensiva',
    descricao:
      'Cobertura ampla que protege contra diversos riscos, como colisões, incêndios, roubos, furtos e outros danos acidentais, oferecendo tranquilidade completa ao segurado.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/colisao.png',
  },
  {
    id: 2,
    titulo: 'Incêndio e roubo',
    descricao: 'Protege o veículo contra danos causados por incêndio e roubo',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/roubo.png',
  },
  {
    id: 9,
    titulo: 'Indenização por roubo e/ou furto',
    descricao:
      'Combina diversas proteções, cobrindo não só roubos e furtos, mas também colisões',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/seguro.png',
  },
  {
    id: 5,
    titulo: 'Incêndio',
    descricao:
      'Foca na proteção contra danos decorrentes de incêndios, assegurando que o veículo seja reparado ou substituído em caso de sinistro.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/incendio.png',
  },
  {
    id: 8,
    titulo: 'Indenização integral por roubo e/ou furto',
    descricao:
      'Oferece cobertura que garante o valor total do veículo em caso de roubo ou furto',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/seguro.png',
  },
  {
    id: 10,
    titulo: 'Responsabilidade civil facultativa de veículos – RCFV',
    descricao:
      'Cobre danos materiais e corporais causados a terceiros em decorrência de acidentes com o veículo.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/vandalismo.png',
  },
];

const Coberturas = () => {
  const swiperRef = useRef(null);

  return (
    <>
      {/* Estilização para reposicionar a paginação */}
      <style>{`
        .swiper-pagination {
          bottom: -20px !important;
        }
      `}</style>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-bluePrime text-xl sm:text-4xl text-center">
          Conheça as nossas principais coberturas
        </h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-grayPrime text-base sm:text-4xl text-center mb-12">
          Coberturas Básicas
        </h2>

        {/* Container relativo para posicionar os botões de navegação */}
        <div className="relative max-w-6xl mx-auto">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletActiveClass: 'bg-bluePrime',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="py-8"
          >
            {coberturas.map(({ id, titulo, descricao, imageUrl }) => (
              <SwiperSlide key={id} className="h-auto">
                <div className="bg-white rounded-lg shadow-lg h-80 flex flex-col transition-transform hover:scale-105 overflow-hidden border border-bluePrime cursor-grab active:cursor-grabbing">
                  {/* Imagem ocupando a parte superior */}
                  <img
                    src={imageUrl}
                    alt={titulo}
                    className="w-full h-1/2 object-cover rounded-t-lg"
                  />
                  {/* Conteúdo do card */}
                  <div className="p-4 flex flex-col items-center text-center flex-grow">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {titulo}
                    </h3>
                    <p className="text-sm text-grayPrime line-clamp-4 overflow-hidden">
                      {descricao}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botões de navegação customizados, responsivos */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-2 sm:left-[-50px] top-1/2 transform -translate-y-1/2 bg-bluePrime2 text-white rounded-full p-3 hover:bg-bluePrime transition-colors z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-2 sm:right-[-50px] top-1/2 transform -translate-y-1/2 bg-bluePrime2 text-white rounded-full p-3 hover:bg-bluePrime transition-colors z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Coberturas;
