import React, { useState, useRef, useEffect } from 'react';
import CardCotacao from './cardCotacao';
import ModalCoberturas from './modalCoberturas';
import EditQuote from './editQuote';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { saveToStorage, loadFromStorage } from '../utils/storageUtils'; // Importando o método saveToStorage

const cardData = [
  {
    title: 'PRIME BR 15',
    price: 'R$ 3,04',
    discount: '65% OFF',
    fullPrice: 'R$ 36,48',
    coverage: 'R$ 15.000,00',
    id: 1,
  },
  {
    title: 'PRIME BR 30',
    price: 'R$ 300,04',
    discount: '65% OFF',
    fullPrice: 'R$ 300,04',
    coverage: 'R$ 30.000,00',
    id: 2,
  },
  {
    title: 'PRIME BR 60',
    price: 'R$ 400,04',
    discount: '65% OFF',
    fullPrice: 'R$ 400,04',
    coverage: 'R$ 60.000,00',
    id: 3,
  },
];

const Plans = ({ onSelected, setSelectedPlan }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null); // Gerencia o ID do plano selecionado
  const swiperRef = useRef(null);

  // Carregar plano salvo no sessionStorage ao montar o componente
  useEffect(() => {
    const savedPlan = loadFromStorage('plans', null);
    if (savedPlan) {
      setSelectedPlanId(savedPlan.id); // Atualiza o estado local com o ID salvo
      setSelectedPlan(savedPlan); // Atualiza o estado do componente pai
    }
  }, [setSelectedPlan]);

  // Função chamada ao selecionar um plano
  const handleCardSelected = (id) => {
    const selectedPlan = cardData.find((card) => card.id === id);
    setSelectedPlanId(id); // Atualiza o estado local com o ID selecionado
    setSelectedPlan(selectedPlan); // Atualiza o estado de planos do componente pai (se necessário)

    // Salva o plano selecionado no sessionStorage
    saveToStorage('plans', selectedPlan);

    if (onSelected) onSelected(id); // Chama o callback, se fornecido
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };
  return (
    <div>
      <div>
        <CardCotacao />
      </div>

      <div>
        <EditQuote />
        <h2 className="text-sm sm:text-xl lg:text-2xl font-bold text-[#313131] mt-8 mr-8 ml-8">
          Selecionamos os Melhores Planos Para Você.
        </h2>

        <p className="text-sm sm:text-lg lg:text-xl mb-5 mr-8 ml-8">
          Agora com prorrogação de estadia disponível em todos os planos!
        </p>
      </div>

      <div className="relative">
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-[85%] mx-auto scale-90 md:scale-95 lg:scale-100"
        >
          {cardData.map((card) => (
            <SwiperSlide key={card.id}>
              <div
                className={`border rounded-lg shadow-lg p-2 sm:p-4 ${selectedPlanId === card.id ? 'border-bluePrime' : ''
                  }`}
              >
                <h5 className="text-gray-500 uppercase text-center font-semibold text-xs sm:text-sm md:text-base">
                  {card.title}
                </h5>
                <div className="text-center mt-2">
                  <div className="flex flex-col items-center">
                    <h6 className="text-xs sm:text-sm md:text-base font-medium">
                      <span className="text-gray-600">12x</span>{' '}
                      <span className="text-[#313131] text-sm sm:text-lg md:text-xl font-bold">
                        {card.price}
                      </span>{' '}
                      <span className="text-gray-600">Sem Juros</span>
                    </h6>
                    <p className="bg-green-500 font-bold text-xs sm:text-sm md:text-base mt-1 text-white py-1 px-2 rounded-md">
                      {card.discount}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">
                    <span className="font-bold">{card.fullPrice}</span>{' '}
                    <span className="font-normal">à vista</span>
                  </p>
                  <div className="border-t border-gray-300 my-2 w-3/4 mx-auto"></div>
                  <div className="flex justify-between items-center text-xs sm:text-sm md:text-base px-4">
                    <h6 className="text-gray-700 font-medium">Cobertura Total:</h6>
                    <h6 className="text-bluePrime font-bold">{card.coverage}</h6>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4 space-y-2">
                  <button
                    onClick={() => handleCardSelected(card.id)}
                    className={`${selectedPlanId === card.id ? 'bg-bluePrime2' : 'bg-bluePrime'
                      } cursor-pointer text-white uppercase text-xs sm:text-sm md:text-base py-1 px-3 rounded-md shadow-md w-full flex items-center justify-center`}
                  >
                    <input
                      className="accent-bluePrime rounded-full mr-2 cursor-pointer"
                      type="checkbox"
                      checked={selectedPlanId === card.id}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCardSelected(card.id);
                      }}
                    />
                    {selectedPlanId === card.id ? 'Selecionado' : 'Contratar'}
                  </button>
                </div>
                <div>
                  <hr className="my-4" />
                  <ul className="space-y-1 text-start text-xs sm:text-sm md:text-base">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-1">✔</span>
                      Despesas Médicas e Hospitalares (incluso Covid-19)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-1">✔</span>
                      Despesas odontológicas
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-1">✔</span>
                      Despesas farmacêuticas
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-1">✔</span>
                      Perda de bagagem
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-1">✔</span>
                      Atraso de bagagem (superior a 8h)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-1">✔</span>
                      Cancelamento ou Atraso de voo (superior a 8h)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-1">✔</span>
                      E muito mais...
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-bluePrime text-white p-2 rounded-full shadow-md hover:bg-bluePrime2"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-bluePrime text-white p-2 rounded-full shadow-md hover:bg-bluePrime2"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center mt-6 space-y-3">
        <ModalCoberturas />
      </div>
    </div>
  );
};

export default Plans;
