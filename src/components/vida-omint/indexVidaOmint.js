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
                <h1 className="text-6xl mb-8 text-grayPrime font-semibold pt-32">Para você</h1>
                <p className="text-l font-light max-w-7xl text-gray-500 text-center mx-auto pb-10">
                    A base de um bom planejamento financeiro está na proteção do seu patrimônio. Na hora de compor uma rentável carteira de investimentos, lembre-se de escolher o melhor em Seguro de Vida. Nós da Omint preparamos uma série de diferenciais para você incluir nos seus planos o amparo que a sua família precisa em uma trajetória de acumulação tranquila, independentemente dos seus objetivos.
                </p>

                {/* Grid de cards */}
                <h1 className="text-4xl mb-8 text-bluePrime font-semibold">Benefícios para você e sua família:</h1>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 p-4">
                    {/* Card 1 */}
                    <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
                        <h2 className="flex items-center space-x-2 text-xl font-semibold text-gray-800 mb-4">
                            <ShieldCheck className="w-6 h-6 text-bluePrime m-6" />
                            Proteção do padrão de vida
                        </h2>
                        <hr className="border-gray-300 my-4" />
                        <p className="text-gray-600">
                            Amparo financeiro para os seus projetos de vida pessoal e familiar, educação dos filhos e despesas com financiamentos e manutenção do padrão de vida da família.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
                        <h2 className="flex items-center space-x-2 text-xl font-semibold text-gray-800 mb-4">
                            <DollarSign className="w-6 h-6 text-bluePrime m-6" />
                            Planejamento Financeiro
                        </h2>
                        <hr className="border-gray-300 my-4" />
                        <p className="text-gray-600">
                            Ativo de proteção indispensável para estruturar carteiras de investimentos, gerenciar riscos e cobrir os recursos acumulados.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
                        <h2 className="flex items-center space-x-2 text-xl font-semibold text-gray-800 mb-4">
                            <Briefcase className="w-6 h-6 text-bluePrime m-6" />
                            Sucessão Patrimonial
                        </h2>
                        <hr className="border-gray-300 my-4" />
                        <p className="text-gray-600">
                            Recursos financeiros livres de impostos que proporcionam tranquilidade e liquidez durante processos de inventários: pagamento do ITCMD, honorários advocatícios, despesas cartorárias, entre outras. Além de tudo isso, os beneficiários podem ser de livre escolha.
                        </p>
                    </div>
                </div>
            </div>


            <h1 className="text-6xl mb-8 text-grayPrime font-semibold mt-20">Confira nossos produtos:</h1>
            <PrimeIdeal />
            <div className="flex flex-col md:flex-row gap-8 p-4">
                <PrimeFoco />
                <PrimeVital />
            </div>
        </div>
    );
}