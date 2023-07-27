import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const arrayDepoimentos = [
    { 
        title: 'Pedro Gustavo', 
        content: 'Precisei utilizar alguns dos serviços e achei o atendimento muito prático, só precisei enviar uma mensagem no wpp.' 
    },
    { 
        title: 'Rogério Beltrani', 
        content: 'Precisei Ir ao Hospital no Canadá e o Seguro me deu total suporte com a indenização. Realmente um seguro necessário! Não faço mais nenhuma viagem sem' 
    },
    { 
        title: 'Larissa Martins', 
        content: 'Simplesmente adorei o serviço de concierge, você fica sabendo exatamente todos os eventos do local' 
    },    
];


function ContainerDepoimetos(){

    return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
    >
      {arrayDepoimentos.map((depoimento, index) => (
        <SwiperSlide key={index}>
          <div>
            <h3>{depoimento.title}</h3>
            <p>{depoimento.content}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    
  );
};
/*<div className="montserrat">
      <h2 className="text-center text-4xl"> Nossos Planos</h2>
      <p>Arraste para o lado</p>
      <div onMouseEnter={handleSlideBounce} onTouchStart={handleSlideBounce}>
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1920: {
              slidesPerView: 4,
            },
          }}
          style={{ cursor: "pointer" }}
        >
          {planos.map((plano) => (
            <SwiperSlide key={plano.id}>
              <CardPlano
                title={plano.title}
                description={plano.description}
                price={plano.price}
                image={plano.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>*/
export default ContainerDepoimetos;
