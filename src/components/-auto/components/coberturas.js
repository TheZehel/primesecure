import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const coberturas = [
  {
    id: 1,
    titulo: 'Colisão, Batidas e Acidentes',
    descricao: 'Cobre danos ao seu veículo em caso de colisão.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/colisao.png',
  },
  {
    id: 2,
    titulo: 'Roubo e Furto',
    descricao: 'Indenização caso o veículo seja roubado e não recuperado.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/roubo.png',
  },
  {
    id: 3,
    titulo: 'Danos a Terceiros',
    descricao:
      'Indenização para danos materiais e corporais causados a terceiros.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/danos.png',
  },
  {
    id: 4,
    titulo: 'Fenômenos Naturais',
    descricao: 'Proteção contra enchentes, granizo, quedas de árvores e mais.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/fenomeno.png',
  },
  {
    id: 5,
    titulo: 'Incêndio e Explosão',
    descricao: 'Cobertura contra incêndios e explosões acidentais.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/incendio.png',
  },
  {
    id: 6,
    titulo: 'Carro Reserva',
    descricao:
      'Disponibilização de um carro extra enquanto o veículo segurado está em reparo.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/reserva.png',
  },
  {
    id: 7,
    titulo: 'Assistência 24h',
    descricao: 'Socorro mecânico, reboque, troca de pneus e muito mais.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/mecanico.png',
  },
  {
    id: 8,
    titulo: 'Seguro para Passageiros',
    descricao:
      'Cobertura para despesas médicas e hospitalares dos ocupantes do veículo.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/seguro.png',
  },
  {
    id: 9,
    titulo: 'Vidros, Faróis e Retrovisores',
    descricao:
      'Troca ou reparo de vidros, faróis e retrovisores em caso de danos.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/vidros.png',
  },
  {
    id: 10,
    titulo: 'Atos de Vandalismo',
    descricao: 'Indenização em caso de depredação do veículo.',
    imageUrl:
      'https://storage.googleapis.com/primesecure/seguro-auto/vandalismo.png',
  },
];

const Coberturas = () => {
  return (
    <>
      {/* Bloco de estilo para reposicionar a paginação */}
      <style>{`
        .swiper-pagination {
          bottom: -20px !important;
        }
      `}</style>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-grayPrime text-xl sm:text-4xl text-center mb-12">
          Nossas Coberturas
        </h2>

        <div className="max-w-6xl mx-auto">
          <Swiper
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
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="py-8"
          >
            {coberturas.map(({ id, titulo, descricao, imageUrl }) => (
              <SwiperSlide key={id} className="h-auto">
                <div className="bg-white rounded-lg shadow-lg h-80 flex flex-col transition-transform hover:scale-105 overflow-hidden border border-bluePrime">
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
        </div>
      </div>
    </>
  );
};

export default Coberturas;
