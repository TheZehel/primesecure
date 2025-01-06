export default function Superior() {
    return (
        <div className="relative overflow-hidden h-auto">
            {/* Imagem de fundo que cresce verticalmente */}
            <img
                src="https://storage.googleapis.com/primesecure/vida-omint/vida-omint.png"
                className="w-full object-cover brightness-50 min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] xl:min-h-[900px]"
                alt="Imagem de fundo"
            />

            {/* Conteúdo sobre a imagem */}
            <div className="absolute top-0 left-0 flex flex-col justify-center items-center h-full p-8 text-white ml-5 lg:ml-20">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-4 text-center">
                    Benefício da Prime
                </h1>

                <p className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1.5 px-3 rounded-lg bg-bluePrime text-base sm:text-lg lg:text-lg mb-4 text-center">
                    Seguro de vida
                </p>

                <p className="text-sm sm:text-lg lg:text-lg mb-6 text-center leading-relaxed">
                    O seguro que protege o que é importante <br />
                    pra você, por você.
                </p>

                <div className="flex flex-col items-center">
                    <p className="text-xs sm:text-sm lg:text-sm mb-2 text-center">Em parceria com:</p>
                    <img
                        src="https://storage.googleapis.com/primesecure/logo-omint.png"
                        alt="Logo Omint"
                        className="w-16 sm:w-20 lg:w-24 h-auto"
                    />
                </div>
            </div>
        </div>
    );
}
