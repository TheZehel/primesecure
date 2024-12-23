export default function Superior() {
    return (
        <div className="relative">
            {/* Imagem de fundo */}
            <img
                src="https://storage.googleapis.com/primesecure/vida-omint/vida-omint.png"
                className="w-full h-auto brightness-50"
                alt="Imagem de fundo"
            />

            {/* Conteúdo sobre a imagem */}
            <div className="absolute top-0 left-0 flex flex-col justify-center items-start h-full p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">Benefício da Prime</h1>

                <p className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1.5 px-3 rounded-lg bg-bluePrime text-lg mb-4">
                    Seguro de vida
                </p>

                <p className="text-lg mb-6">
                    O seguro que protege o que é importante pra você, por você.
                </p>

                <div className="flex items-center">
                    <p className="mr-2">Em parceria com:</p>
                    <img
                        src="https://storage.googleapis.com/primesecure/logo-omint.png"
                        alt="Logo Omint"
                        className="w-24 h-auto"
                    />
                </div>
            </div>
        </div>
    );
}
