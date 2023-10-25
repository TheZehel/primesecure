import imageManagerSobrePrime from "../bancodeimagens/BancoDeImagensSobrePrime";

export default function BannerImg() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-bluePrime">
                O Nosso Lema é "Proteção em Todos os Seus Momentos"
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Proteção e Segurança Com Fácil Acesso Para Todos.
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Disponibilizamos uma plataforma onde você pode contratar o seu
                seguro de maneira 100% online, sem complicações ou dores de
                cabeça.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            loading="lazy"
            src={imageManagerSobrePrime.sectionImages.ImgSobrePrime}
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                Na Prime Secure, priorizamos você, o cliente. Nossa visão é
                representar nossos clientes com dignidade, fornecendo serviços
                de alta qualidade com um compromisso excepcional e performance.
                Nosso objetivo é atender às suas necessidades e superar suas
                expectativas, oferecendo a você soluções de seguros inovadoras e
                eficientes.
              </p>

              <p className="mt-8">
                A nossa história de sucesso é marcada por mais de 7 anos de
                experiência e mais de 30.000 clientes satisfeitos. Nosso
                trabalho é direcionado para a entrega de um atendimento
                personalizado e na busca incessante pela excelência. Acreditamos
                na transparência, profissionalismo e na valorização das pessoas,
                reconhecendo que o sucesso, e uma boa saúde financeira de nossos
                clientes é, de fato, o nosso sucesso.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                Não Sabe Como Contratar? Ou como um Seguro de fato funciona? Ou
                até mesmo os seus reais benefícios? Não Há problemas!
              </h2>
              <p className="mt-6">
                Escolha a Prime Secure e junte-se à nossa comunidade de clientes
                satisfeitos. Estamos aqui para você, prontos para proteger o que
                é mais importante em sua vida. Convidamos você a conhecer mais
                sobre a Prime Secure e descobrir como podemos tornar sua
                experiência com seguros mais tranquila, segura e recompensadora.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
