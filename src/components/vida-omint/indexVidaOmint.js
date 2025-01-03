import Superior from "./components/superior";
import PrimeIdeal from "./components/ideal";
import PrimeFoco from "./components/foco";
import PrimeVital from "./components/vital";
import { Briefcase, DollarSign, ShieldCheck } from "lucide-react";

export default function IndexVidaOmint() {
    return (
        <div>
            <Superior />

            <div>
                {/* Título e descrição inicial */}
                <h1 className="text-grayPrime text-xl sm:text-4xl text-center m-6">Para você</h1>
                <p className="font-light max-w-4xl text-gray-500 text-center mx-auto pb-10 px-4 sm:px-6">
                    A base de um bom planejamento financeiro está na proteção do seu patrimônio. Na hora de compor uma rentável carteira de investimentos, lembre-se de escolher o melhor em Seguro de Vida. Nós da Omint preparamos uma série de diferenciais para você incluir nos seus planos o amparo que a sua família precisa em uma trajetória de acumulação tranquila, independentemente dos seus objetivos.
                </p>

                {/* Grid de cards */}
                <h1 className="text-bluePrime text-xl sm:text-2xl text-center mb-6">Benefícios para você e sua família:</h1>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
                    {/* Card 1 */}
                    <div className="min-w-[300px] md:min-w-[300px] lg:max-w-[300px] md:w-auto bg-neutral-10 p-4 rounded-lg shadow-md mx-auto mb-4">
                        <ShieldCheck className="w-8 h-8 text-bluePrime mx-auto mb-3" />
                        <h2 className="text-base font-semibold text-gray-800 text-center mb-1">
                            Proteção do padrão de vida
                        </h2>
                        <hr className="border-gray-300 my-2" />
                        <p className="text-sm text-gray-600 text-justify">
                            Amparo financeiro para projetos pessoais, educação e manutenção do padrão de vida.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="min-w-[300px] md:min-w-[300px] lg:max-w-[300px] md:w-auto bg-neutral-10 p-4 rounded-lg shadow-md mx-auto mb-4">
                        <DollarSign className="w-8 h-8 text-bluePrime mx-auto mb-3" />
                        <h2 className="text-base font-semibold text-gray-800 text-center mb-1">
                            Planejamento Financeiro
                        </h2>
                        <hr className="border-gray-300 my-2" />
                        <p className="text-sm text-gray-600 text-justify">
                            Ativo essencial para estruturar investimentos, gerir riscos e proteger recursos acumulados.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="min-w-[300px] md:min-w-[300px] lg:max-w-[300px] md:w-auto bg-neutral-10 p-4 rounded-lg shadow-md mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-bluePrime mx-auto mb-3" />
                        <h2 className="text-base font-semibold text-gray-800 text-center mb-1">
                            Sucessão Patrimonial
                        </h2>
                        <hr className="border-gray-300 my-2" />
                        <p className="text-sm text-gray-600 text-justify">
                            Recursos isentos de impostos, garantindo liquidez e liberdade na escolha de beneficiários.
                        </p>
                    </div>
                </div>

                {/* Título para a seção de produtos */}
                <h1 className="text-grayPrime text-xl sm:text-4xl text-center mt-20">Confira nossos produtos:</h1>
                <PrimeIdeal />

                {/* Responsivo */}
                <div className="flex flex-col md:flex-row gap-8 p-4">
                    <PrimeFoco />
                    <PrimeVital />
                </div>
            </div>

        </div>
    );
}