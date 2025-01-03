import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import required modules
import { EffectCards } from 'swiper/modules';
import { Ambulance, Church, Hand, Skull, Syringe } from 'lucide-react';

export default function PrimeFoco() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-xl ml-40 rounded-lg p-6 max-w-md w-full border-gray-200 border-2">

                {/* Texto introdutório fora do Swiper */}
                <div className="text-center">
                    <h1 className="text-xl sm:text-4xl text-center text-bluePrime mb-4">Prime Foco</h1>
                    <p className="text-bluePrime text-xl sm:text-xl text-center mb-6">
                        Onde está o foco da sua vida nesse momento?
                    </p>
                    <p className="text-xs sm:text-xs text-gray-600 mt-2">
                        Chegou o Prime Foco, o novo seguro em parceria com Vida Omint que vai te ajudar a
                        manter o foco nos seus objetivos, sem se preocupar com imprevistos.
                    </p>

                    <p className="m-10 mb-4 text-bluePrime2 font-semibold text-xl">
                        Arraste para o lado e conheça as coberturas disponíveis.
                    </p>

                    <Hand className="w-6 h-6 text-bluePrime2 mb-2 mx-auto" />
                </div>

                <div className="w-[300px] h-[300px] mt-6 mx-auto">
                    {/* Swiper */}
                    <Swiper
                        effect="cards"
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                    >
                        {/* Slide 1 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Skull className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-lg font-semibold text-gray-800">Morte - Cobertura Temporária</h2>
                            <p className="text-sm text-gray-600 mt-5">
                                Garante o pagamento do capital segurado, de uma única vez, aos beneficiários em caso de morte do segurado por causas naturais ou acidentais.
                            </p>
                        </SwiperSlide>

                        {/* Slide 2 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Skull className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-lg font-semibold text-gray-800">Morte Acidental</h2>
                            <p className="text-sm text-gray-600 mt-5">
                                Garante o pagamento do capital segurado, de uma única vez, aos beneficiários em caso de morte do segurado durante a vigência da apólice exclusivamente decorrente de acidente pessoal coberto.
                            </p>
                        </SwiperSlide>

                        {/* Slide 3 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Ambulance className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-lg font-semibold text-gray-800">
                                Invalidez Permanente Total ou Parcial por Acidente
                            </h2>
                            <p className="text-sm text-gray-600 mt-5">
                                Garante o pagamento de indenização ao segurado, proporcional à incapacidade física permanente, total ou parcial, decorrente de acidente pessoal coberto.
                            </p>
                        </SwiperSlide>

                        {/* Slide 4 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Ambulance className="w-7 h-7 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-sm font-semibold text-gray-800">
                                Invalidez Permanente Total ou Parcial por Acidente Majorada
                            </h2>
                            <p className="text-sm text-gray-600 mt-3">
                                Garante o pagamento de indenização complementar ao segurado em caso de lesão de determinados órgãos que determine a caracterização de invalidez permanente em virtude de acidente pessoal coberto. Cobertura disponível apenas para médicos, dentistas e enfermeiros.
                            </p>
                        </SwiperSlide>

                        {/* Slide 5 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Syringe className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-lg font-semibold text-gray-800">Doenças Graves</h2>
                            <p className="text-sm text-gray-600 mt-5">
                                Garante o pagamento do capital segurado contratado ao segurado no caso de diagnóstico definitivo de uma doença grave coberta ou da realização de um procedimento médico coberto, desde que sobreviva após 30 dias do referido diagnóstico ou procedimento.
                            </p>
                        </SwiperSlide>

                        {/* Slide 6 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Syringe className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-lg font-semibold text-gray-800">Doenças Graves Ampliada</h2>
                            <p className="text-sm text-gray-600 mt-5">
                                Garante o pagamento do capital segurado ao segurado em caso de diagnóstico de doença grave ou procedimento médico coberto, desde que sobreviva por 30 dias após o diagnóstico. Essa cobertura inclui mais doenças e procedimentos do que a cobertura básica.
                            </p>
                        </SwiperSlide>

                        {/* Slide 7 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Syringe className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-lg font-semibold text-gray-800">DIH - Diária de Internação</h2>
                            <p className="text-sm text-gray-600 mt-5">
                                Garante ao segurado o pagamento de uma diária segurada, na hipótese de ocorrência de um evento coberto, para cada dia de internação hospitalar, por motivo de acidente pessoal ou doença, ocorrido durante a vigência da apólice.
                            </p>
                        </SwiperSlide>

                        {/* Slide 8 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Church className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-lg font-semibold text-gray-800">Funeral Individual</h2>
                            <p className="text-sm text-gray-600 mt-5">
                                Garante ao responsável pelo pagamento o reembolso das despesas incorridas com o funeral do segurado no caso de sua morte, por causas naturais ou acidentais, durante a vigência da apólice, até o limite do capital segurado contratado.
                            </p>
                        </SwiperSlide>

                        {/* Slide 9 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Church className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-lg font-semibold text-gray-800">Funeral Familiar</h2>
                            <p className="text-sm text-gray-600 mt-5">
                                Garante o pagamento do capital segurado contratado ao segurado no caso de diagnóstico definitivo de uma doença grave coberta ou da realização de um procedimento médico coberto, desde que sobreviva após 30 dias do referido diagnóstico ou procedimento.
                            </p>
                        </SwiperSlide>

                        {/* Slide 10 */}
                        <SwiperSlide className="flex flex-col justify-between items-center p-4 w-full h-[400px] bg-white rounded-lg shadow-md border-2 border-bluePrime text-center">
                            <Church className="w-8 h-8 text-bluePrime mb-2 mx-auto" />
                            <h2 className="text-lg font-semibold text-gray-800">Jazigo</h2>
                            <p className="text-sm text-gray-600 mt-5">
                                Garante ao responsável pelo pagamento o reembolso de despesas com aquisição de jazigo no caso de morte do segurado, por causas naturais ou acidentais, durante a vigência da apólice.
                            </p>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
