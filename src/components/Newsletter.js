import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHandPeace } from "@fortawesome/free-solid-svg-icons";

export default function Newsletter() {
  return (
    <div className="relative isolate overflow-hidden  py-16 sm:py-24 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className=" font-bold tracking-tight text-2xl text-grayPrime sm:text-2xl">
              Inscreva-se em Nossa Newsletter.
            </h2>
            <p className="mt-4 text-lg leading-8 text-grayPrime">
              Fique por dentro das últimas notícias e atualizações do setor de
              seguros. Nosso compromisso é fornecer a você conteúdo relevante e
              atualizado para te ajudar a proteger o que é mais importante.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-grayPrime shadow-sm ring-1 ring-inset ring-grayPrime/25 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                placeholder="Insira o seu e-mail"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-bluePrime px-3.5 py-2.5 text-sm font-semibold text-grayPrimee shadow-sm hover:bg-bluePrime2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bluePrime"
              >
                Inscrever
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-bluePrime">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="h-6 w-6 text-bluePrime"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-grayPrime">
                Notícias Semanais
              </dt>
              <dd className="mt-2 leading-7 text-grayPrime text-left">
                Receba diretamente em seu e-mail informações e insights semanais
                sobre o mercado de seguros. Esteja sempre a par das últimas
                tendências e novidades.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-bluePrime">
                <FontAwesomeIcon
                  icon={faHandPeace}
                  className="h-6 w-6 text-bluePrime"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-grayPrime">Sem Spam</dt>
              <dd className="mt-2 leading-7 text-grayPrime text-left">
                Respeitamos sua caixa de entrada. Nos comprometemos a enviar
                apenas o conteúdo que é importante para você. Mantemos sua
                privacidade e nunca compartilhamos seus dados.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute  xl:-top-6 bg-grayPrime" aria-hidden="true">
        <div className="" />
      </div>
    </div>
  );
}
