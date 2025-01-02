import { Ambulance, Apple, Brain, Church, Dog, House, Laptop, Shield, Skull, Syringe } from 'lucide-react';
import React, { useState } from 'react';

const PrimeFoco = () => {
    const [activeTab, setActiveTab] = useState('coverages');
    const [openCoverage, setOpenCoverage] = useState(null);

    const coverages = [
        {
            id: 1,
            title: 'Morte - Cobertura Temporária',
            description: "Garante o pagamento do capital segurado, de uma única vez, aos beneficiários em caso de morte do segurado por causas naturais ou acidentais, devidamente coberta pelo seguro, durante a vigência da apólice.",
            icon: <Skull className="w-6 h-6 text-bluePrime" />,
        },
        {
            id: 2,
            title: 'Morte acidental',
            description: `Garante o pagamento do capital segurado, de uma única vez, aos beneficiários em caso de morte do segurado durante a vigência da apólice exclusivamente decorrente de acidente pessoal coberto.`,
            icon: <Skull className="w-6 h-6 text-bluePrime" />,
        },
        {
            id: 3,
            title: 'Invalidez Permanente Total ou Parcial por Acidente',
            description: 'Garante o pagamento de indenização ao segurado, proporcional à incapacidade física permanente, total ou parcial, decorrente de acidente pessoal coberto.',
            icon: <Ambulance className="w-6 h-6 text-bluePrime" />,
        },
        {
            id: 4,
            title: 'Invalidez Permanente Total ou Parcial por Acidente Majorada',
            description: 'Garante o pagamento de indenização complementar ao segurado em caso de lesão de determinados órgãos que determine a caracterização de invalidez permanente em virtude de acidente pessoal coberto. Cobertura disponível apenas para médicos, dentistas e enfermeiros.',
            icon: <Ambulance className="w-6 h-6 text-bluePrime" />,
        },
        {
            id: 5,
            title: "Doenças Graves",
            description: 'Garante o pagamento do capital segurado contratado ao segurado no caso de diagnóstico definitivo de uma doença grave coberta ou da realização de um procedimento médico coberto, desde que sobreviva após 30 dias do referido diagnóstico ou procedimento.',
            icon: <Ambulance className="w-6 h-6 text-bluePrime" />,
        },
        {
            id: 6,
            title: 'Doenças Graves Ampliada',
            description: `Garante o pagamento do capital segurado contratado ao segurado no caso de diagnóstico definitivo de uma doença grave coberta ou da realização de um procedimento médico coberto, desde que sobreviva após 30 dias do referido diagnóstico ou procedimento. O rol de doenças graves e procedimentos médicos cobertos nesta garantia é mais amplo do que o previsto na cobertura de doenças graves.`,
            icon: <Syringe className="w-6 h-6 text-bluePrime" />,
        },
        {
            id: 7,
            title: 'DIH - Diária de Internação',
            description: `Garante ao segurado o pagamento de uma diária segurada, na hipótese de ocorrência de um evento coberto, para cada dia de internação hospitalar, por motivo de acidente pessoal ou doença, ocorrido durante a vigência da apólice.`,
            icon: <Syringe className="w-6 h-6 text-bluePrime" />,
        },
        {
            id: 8,
            title: 'Funeral Individual',
            description: `Garante ao responsável pelo pagamento o reembolso das despesas incorridas com o funeral do segurado no caso de sua morte, por causas naturais ou acidentais, durante a vigência da apólice, até o limite do capital segurado contratado. Como alternativa, poderá ser acionado o serviço de assistência funeral, pelo qual a prestadora de serviços de assistência, contratada pela Omint, assumirá as providências necessárias para a realização do funeral, como contratação dos serviços, registros em cartório, sepultamento/cremação, traslado, entre outros serviços.`,
            icon: <Syringe className="w-6 h-6 text-bluePrime" />,
        },
        {
            id: 9,
            title: 'Funeral Familiar',
            description: `Garante o pagamento do capital segurado contratado ao segurado no caso de diagnóstico definitivo de uma doença grave coberta ou da realização de um procedimento médico coberto, desde que sobreviva após 30 dias do referido diagnóstico ou procedimento. O rol de doenças graves e procedimentos médicos cobertos nesta garantia é mais amplo do que o previsto na cobertura de doenças graves.`,
            icon: <Syringe className="w-6 h-6 text-bluePrime" />,
        },
        {
            id: 10,
            title: 'Jazigo',
            description: `Garante ao responsável pelo pagamento o reembolso de despesas com aquisição de jazigo no caso de morte do segurado, por causas naturais ou acidentais, durante a vigência da apólice.`,
            icon: <Church className="w-6 h-6 text-bluePrime" />
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 pt-32 pb-24">
                <h1 className="text-5xl mb-8 text-bluePrime font-semibold">Prime Foco</h1>
                <p className="text-xl font-semibold max-w-2xl text-bluePrime text-center mx-auto">
                    Onde esta o foco da sua vida nesse momento?
                </p>
                <p className='text-xl font-light max-w-2xl text-gray-500 text-center mx-auto'>
                    Chegou o Prime Foco, o novo seguro em pareciria com Vida Omint que vai te ajudar a manter o foco nos seus objetivos, sem se preocupar com imprevistos.
                </p>
            </div>

            {/* Navigation */}
            <div className="border-t border-b border-gray-300">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex space-x-8 text-center items-center justify-center">
                        <button
                            className={`py-6 px-2 relative ${activeTab === 'coverages' ? 'text-bluePrime' : 'text-grayPrime'}`}
                            onClick={() => setActiveTab('coverages')}
                        >
                            Coberturas
                            {activeTab === 'coverages' && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-bluePrime"></div>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 py-24">
                {activeTab === 'coverages' && (
                    <div className="grid gap-4">
                        {coverages.map((coverage) => (
                            <div key={coverage.id} className="border border-gray-300 rounded-md">
                                <button
                                    onClick={() => setOpenCoverage(openCoverage === coverage.id ? null : coverage.id)}
                                    className="w-full p-4 flex justify-between items-center"
                                >
                                    <span className="flex items-center space-x-3">
                                        {coverage.icon}
                                        {/* Adicionando o className diretamente no título */}
                                        <span className="text-lg font-medium text-grayPrime">{coverage.title}</span>
                                    </span>
                                    <span className={`transform transition-transform ${openCoverage === coverage.id ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                {openCoverage === coverage.id && (
                                    <div className="p-4">
                                        {/* Adicionando o className diretamente na descrição */}
                                        <p className="text-sm text-gray-600">{coverage.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
};

export default PrimeFoco;