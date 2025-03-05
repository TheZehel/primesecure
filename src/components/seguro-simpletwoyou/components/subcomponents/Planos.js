import { CheckCircle, ShieldCheck, Wrench } from 'lucide-react';

export default function PlanosIdeais() {
  return (
    <section className="text-grayPrime">
      {/* Título e Subtítulo */}
      <div className="m-6 text-center">
        <h2 className=" font-bold text-2xl sm:text-5xl mt-16 mb-8">
          Escolha o plano ideal para a sua rotina...
        </h2>
        <p className="mt-2 text-sm">
          Os valores de cada plano variam de acordo com o celular segurado.
        </p>
      </div>

      {/* Cards dos Planos */}
      <div className="flex flex-wrap gap-6 justify-center mt-14">
        {/* Card - Plano Essencial */}
        <div className="w-72 bg-white shadow-lg rounded-lg h-36">
          <div className="bg-grayPrime text-white p-2 rounded-t-lg">
            <h3 className="text-lg font-bold">Plano Essencial</h3>
          </div>
          <div className="mt-4 flex items-center px-1">
            <ShieldCheck className="mr-2 text-bluePrime" size={20} />
            <span className="ml-2 text-grayPrime font-semibold">
              01 Cobertura
            </span>
          </div>
          <div className="mt-4 px-1">
            <div className="flex items-center">
              <CheckCircle className="mr-2 text-bluePrime" size={20} />
              <span className="text-grayPrime">Roubo ou Furto Qualificado</span>
            </div>
          </div>
        </div>

        {/* Card - Plano Mais */}
        <div className="w-72 bg-white shadow-lg rounded-lg h-52">
          <div className="p-2 rounded-t-lg bg-bluePrime text-white">
            <h3 className="text-lg font-bold">Plano Mais</h3>
          </div>
          <div className="mt-4 flex items-center px-1">
            <ShieldCheck className="mr-2 text-bluePrime" size={20} />
            <span className="ml-2 text-grayPrime font-semibold">
              03 Cobertura
            </span>
          </div>
          <div className="mt-4 space-y-2 px-1">
            <div className="flex items-center">
              <CheckCircle className="mr-2 text-bluePrime" size={20} />
              <span>Roubo ou Furto Qualificado</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 text-bluePrime" size={20} />
              <span>Quebra Acidental</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 text-bluePrime" size={20} />
              <span>Danos Líquidos</span>
            </div>
          </div>
        </div>

        {/* Card - Plano Completo */}
        <div className="w-72 bg-white shadow-lg rounded-lg h-72">
          <div className="p-2 rounded-t-lg  bg-bluePrime2 text-white">
            <h3 className="text-lg font-bold">Plano Completo</h3>
          </div>
          <div className="mt-4 flex items-center px-1">
            <ShieldCheck className="mr-2 text-bluePrime" size={20} />
            <span className="ml-2 text-grayPrime font-semibold">
              03 Cobertura
            </span>
          </div>
          <div className="mt-4 space-y-2 px-1">
            <div className="flex items-center">
              <CheckCircle className="mr-2 text-bluePrime" size={20} />
              <span>Roubo ou Furto Qualificado</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 text-bluePrime" size={20} />
              <span>Quebra Acidental</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 text-bluePrime" size={20} />
              <span>Danos Líquidos</span>
            </div>
          </div>
          <div className="mt-4 flex items-center px-1">
            <Wrench className="mr-2 text-bluePrime2" size={20} />
            <span className="ml-2 text-grayPrime font-semibold">
              01 Pacote de Assistências
            </span>
          </div>
          <div className="mt-4 flex items-center px-1">
            <CheckCircle className="mr-2 text-bluePrime" size={20} />
            <span>Assistência Conecte-se</span>
          </div>
        </div>
      </div>
    </section>
  );
}
