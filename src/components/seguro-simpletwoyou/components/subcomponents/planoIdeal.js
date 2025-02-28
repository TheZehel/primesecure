import { CheckCircle } from 'lucide-react';

export default function PlanoIdealCard() {
  return (
    <section className="text-grayPrime">
      {/* Título e Subtítulo */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">
          Escolha o plano ideal para a sua rotina...
        </h2>
        <p className="mt-2 text-sm">
          Os valores de cada plano variam de acordo com o celular segurado.
        </p>
      </div>

      {/* Cards dos Planos */}
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Card - Plano Essencial */}
        <div className="w-72 bg-white shadow-lg rounded-lg p-4">
          <div className="bg-grayPrime text-white p-2 rounded-t-lg">
            <h3 className="text-lg font-bold">Plano Essencial</h3>
          </div>
          <div className="mt-4 flex items-center">
            <img
              src="/img/site.IconeCobertura.png?2PQwpzSge2miNvHjQW0dgg"
              alt="Ícone Cobertura"
              className="w-7 h-7"
            />
            <span className="ml-2">01 Cobertura</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>Roubo ou Furto Qualificado</span>
            </div>
          </div>
        </div>

        {/* Card - Plano Mais */}
        <div className="w-72 bg-white shadow-lg rounded-lg p-4">
          <div className="p-2 rounded-t-lg bg-bluePrime text-white">
            <h3 className="text-lg font-bold">Plano Mais</h3>
          </div>
          <div className="mt-4 flex items-center">
            <img
              src="/img/site.IconeCobertura.png?2PQwpzSge2miNvHjQW0dgg"
              alt="Ícone Cobertura"
              className="w-7 h-7"
            />
            <span className="ml-2">03 Cobertura</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>Roubo ou Furto Qualificado</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>Quebra Acidental</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>Danos Líquidos</span>
            </div>
          </div>
        </div>

        {/* Card - Plano Completo */}
        <div className="w-72 bg-white shadow-lg rounded-lg p-4">
          <div className="p-2 rounded-t-lg  bg-bluePrime2 text-white">
            <h3 className="text-lg font-bold">Plano Completo</h3>
          </div>
          <div className="mt-4 flex items-center">
            <img
              src="/img/site.IconeCobertura.png?2PQwpzSge2miNvHjQW0dgg"
              alt="Ícone Cobertura"
              className="w-7 h-7"
            />
            <span className="ml-2">03 Cobertura</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>Roubo ou Furto Qualificado</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>Quebra Acidental</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>Danos Líquidos</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <img
              src="/img/site.IconePlanoAssistencia.png?NWi4rE+tXs8_os_PGJWZqg"
              alt="Ícone Assistência"
              className="w-7 h-7"
            />
            <span className="ml-2">01 Pacote de Assistências</span>
          </div>
          <div className="mt-4 flex items-center">
            <CheckCircle className="mr-2" size={20} />
            <span>Assistência Conecte-se</span>
          </div>
        </div>
      </div>
    </section>
  );
}
