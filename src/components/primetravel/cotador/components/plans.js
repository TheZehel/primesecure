import React, { useState, useEffect } from 'react';
import CardCotacao from './cardCotacao';
import ModalCoberturas from './modalCoberturas';
import EditQuote from './editQuote';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowRight } from 'lucide-react';

const cardData = [
  {
    title: 'PRIME BR 15',
    price: 'R$ 3,04',
    discount: '65% OFF',
    fullPrice: 'R$ 36,48',
    coverage: 'R$ 15.000,00',
    isSelected: false,
    id: 1,
  },
  {
    title: 'PRIME BR 30',
    price: 'R$ 300,04',
    discount: '65% OFF',
    fullPrice: 'R$ 300,04',
    coverage: 'R$ 30.000,00',
    isSelected: false,
    id: 2,
  },
  {
    title: 'PRIME BR 60',
    price: 'R$ 400,04',
    discount: '65% OFF',
    fullPrice: 'R$ 400,04',
    coverage: 'R$ 60.000,00',
    isSelected: false,
    id: 3,
  },
];

const Plans = ({ onSelected, setSelectedPlan }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('formData-Travel');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.selectedPlan) {
        setSelectedPlanId(parsedData.selectedPlan.id);
      }
    }
  }, []);

  const handleCardSelected = (id) => {
    const selectedPlan = cardData.find((card) => card.id === id);
    setSelectedPlanId(id);

    const storedData = sessionStorage.getItem('formData-Travel');
    const updatedData = storedData ? JSON.parse(storedData) : {};
    updatedData.selectedPlan = selectedPlan;
    sessionStorage.setItem('formData-Travel', JSON.stringify(updatedData));

    setSelectedPlan(selectedPlan); // Atualize o estado no componente pai

    if (onSelected) onSelected(id);
  };

  return (
    <div>
      <div>
        <CardCotacao />
      </div>
      <div>
        <EditQuote />
        <h2 className="text-base sm:text-2xl lg:text-3xl font-bold text-[#313131] mt-8 mr-8 ml-8">
          Selecionamos os Melhores Planos Para Você.
        </h2>


        <p className="text-base sm:text-xl lg:text-2xl mb-5 mr-8 ml-8">
          Agora com prorrogação de estadia disponível em todos os planos!
        </p>

        <p className='text-bluePrime2 font-bold text-base sm:text-xl lg:text-2xl mt-5 mr-8 ml-8'>
          Arraste para o lado e veja os planos disponíveis
        </p>

        <ArrowRight className='text-bluePrime2 flex items-center' />
      </div>

      {/* Renderizando cards em um Swiper */}
      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-full md:max-w-[768px] lg:max-w-[1024px] mx-auto scale-90 md:scale-95 lg:scale-100"
        >
          {cardData.map((card) => (
            <SwiperSlide key={card.id}>
              <div
                className={`border rounded-lg shadow-lg p-4 ${selectedPlanId === card.id ? 'border-bluePrime' : ''
                  }`}
              >
                <h5 className="text-gray-500 uppercase text-center font-semibold text-sm md:text-base lg:text-lg">
                  {card.title}
                </h5>
                <div className="text-center mt-4">
                  <div className="flex flex-col items-center">
                    <h6 className="text-sm md:text-base lg:text-lg font-medium">
                      <span className="text-gray-600">12x</span>{' '}
                      <span className="text-[#313131] text-lg md:text-xl lg:text-2xl font-bold">
                        {card.price}
                      </span>{' '}
                      <span className="text-gray-600">Sem Juros</span>
                    </h6>
                    <p className="bg-green-500 font-bold text-xs md:text-sm lg:text-base mt-1 text-white py-1 px-2 rounded-md">
                      {card.discount}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2 text-xs md:text-sm lg:text-base">
                    <span className="font-bold">{card.fullPrice}</span>{' '}
                    <span className="font-normal">à vista</span>
                  </p>
                  <div className="border-t border-gray-300 my-4 w-3/4 mx-auto"></div>
                  <div className="flex justify-between items-center text-xs md:text-sm lg:text-base px-4">
                    <h6 className="text-gray-700 font-medium">Cobertura Total:</h6>
                    <h6 className="text-bluePrime font-bold">{card.coverage}</h6>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-6 space-y-3">
                  <button
                    onClick={() => handleCardSelected(card.id)}
                    className={`${selectedPlanId === card.id
                      ? 'bg-bluePrime2'
                      : 'bg-bluePrime'
                      } cursor-pointer text-white uppercase text-xs md:text-sm lg:text-base py-2 px-4 rounded-md shadow-md w-full flex items-center justify-center`}
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
                <hr className="my-4" />
                <ul className="space-y-2 text-start">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    Despesas Médicas e Hospitalares (incluso Covid-19)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    Despesas odontológicas
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    Despesas farmacêuticas
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    Perda de bagagem
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    Atraso de bagagem (superior a 8h)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    Cancelamento ou Atraso de voo (superior a 8h)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    E muito mais...
                  </li>
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      <div className="flex flex-col items-center mt-6 space-y-3">
        <ModalCoberturas />
      </div>
    </div>
  );
};

export default Plans;
