export default function Faq() {
  return (
    <section>
      <div className="">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">
          O que o seguro não cobre?
        </h2>
      </div>
      <div className="max-w-[800px] mx-auto space-y-2">
        <div className="border border-1 rounded-2xl  p-4 text-start">
          <p className="px-10 text-xl text-grayPrime">
            Não está coberto o Furto simples.
          </p>
        </div>
        <div className="border border-1 rounded-2xl  p-4 text-start">
          <p className="px-10 text-xl text-grayPrime">
            Acidentes com bicicletas que não estiverem devidamente
            acondicionadas em racks específicos durante seu transporte.
          </p>
        </div>
        <div className="border border-1 rounded-2xl  p-4 text-start">
          <p className="px-10 text-xl text-grayPrime">
            Acessórios como GPS ou bolsa de ferramentas não estarão cobertos.
          </p>
        </div>
        <div className="border border-1 rounded-2xl  p-4 text-start">
          <p className="px-10 text-xl text-grayPrime">
            Ocorrências fora do Brasil.
          </p>
        </div>
        <div className="border border-1 rounded-2xl  p-4 text-start">
          <p className="px-10 text-xl text-grayPrime">
            Bicicletas sem nota fiscal ou comprovante de compra.
          </p>
        </div>
      </div>
    </section>
  );
}
