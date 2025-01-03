import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Heart, AlertCircle, CrossIcon, Pill, Home, Activity, Hand, Church, Hospital, Skull } from 'lucide-react';

const PrimeVital = () => {
    const coverages = [
        {
            id: 1,
            title: 'Morte - Cobertura Vitalícia',
            description: 'Garante o pagamento do capital segurado, de uma única vez, aos beneficiários em caso de morte do segurado por causas naturais ou acidentais, devidamente coberta pelo seguro, durante a vigência da apólice.',
            icon: <Skull className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
        {
            id: 2,
            title: 'Morte – Cobertura Temporária',
            description: 'Garante o pagamento do capital segurado, de uma única vez, aos beneficiários em caso de morte do segurado por causas naturais ou acidentais, devidamente coberta pelo seguro, durante a vigência da apólice.',
            icon: <AlertCircle className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
        {
            id: 3,
            title: 'Morte Acidental',
            description: 'Garante o pagamento do capital segurado, de uma única vez, aos beneficiários em caso de morte do segurado durante a vigência da apólice exclusivamente decorrente de acidente pessoal coberto.',
            icon: <Activity className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
        {
            id: 4,
            title: 'Invalidez Permanente Total ou Parcial por Acidente',
            description: 'Garante o pagamento de indenização ao segurado, proporcional à incapacidade física permanente, total ou parcial, decorrente de acidente pessoal coberto.',
            icon: <Activity className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
        {
            id: 5,
            title: 'Invalidez Permanente Majorada',
            description: 'Garante o pagamento de indenização complementar ao segurado em caso de lesão de determinados órgãos que determine a caracterização de invalidez permanente em virtude de acidente pessoal coberto.',
            icon: <Heart className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
        {
            id: 6,
            title: 'Doenças Graves Ampliada',
            description: 'Garante o pagamento do capital segurado contratado ao segurado no caso de diagnóstico definitivo de uma doença grave coberta ou da realização de um procedimento médico coberto.',
            icon: <Pill className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
        {
            id: 7,
            title: 'Funeral Individual',
            description: 'Garante ao responsável pelo pagamento o reembolso das despesas incorridas com o funeral do segurado no caso de sua morte, até o limite do capital segurado contratado.',
            icon: <Church className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
        {
            id: 8,
            title: 'Funeral Familiar',
            description: 'Garante o pagamento do capital segurado contratado ao segurado no caso de diagnóstico definitivo de uma doença grave coberta ou da realização de um procedimento médico coberto.',
            icon: <Church className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
        {
            id: 9,
            title: 'DIH – Diária de Internação Hospitalar',
            description: 'Garante ao segurado o pagamento de uma diária segurada, para cada dia de internação hospitalar, por motivo de acidente pessoal ou doença.',
            icon: <Hospital className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
        {
            id: 10,
            title: 'Jazigo',
            description: 'Garante ao responsável pelo pagamento o reembolso de despesas com aquisição de jazigo no caso de morte do segurado, por causas naturais ou acidentais.',
            icon: <Church className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
        },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full border-gray-200 border-2 ml-40">
                <div className="text-center">
                    <h1 className="text-xl sm:text-4xl text-center text-bluePrime mb-4">Prime Vital</h1>
                    <p className='text-bluePrime text-xl sm:text-xl text-center mb-6'>
                        Não espere o imprevisto para agir. Com o Prime Vital, sua proteção é vitalícia.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        Ideal para planejamento financeiro e sucessão patrimonial.
                    </p>
                    <p className="m-10 mb-4 text-bluePrime2 font-semibold text-xl">
                        Arraste para o lado e conheça as coberturas disponíveis.
                    </p>

                    <Hand className='w-6 h-6 text-bluePrime2 mb-2 mx-auto' />
                </div>

                <div className="w-[300px] h-[300px] mt-6 mx-auto">
                    <Swiper
                        effect={"cards"}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                    >
                        {coverages.map((coverage) => (
                            <SwiperSlide
                                key={coverage.id}
                                className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center"
                            >
                                {coverage.icon}
                                <h2 className="text-lg font-semibold text-gray-800">{coverage.title}</h2>
                                <p className="text-sm text-gray-600 mt-5">{coverage.description}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default PrimeVital;
