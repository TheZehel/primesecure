import imageManagerSeguroCelular from "../../bancodeimagens/BancoDeImagensSeguroCelular";

export default function ContainerBenficios() {
  return (
    <div className="bg-transparent font-montserrat my-12">
      <div className="bg-transparent mx-auto max-w-7xl px-6 lg:px-8 ">
        <span className=" font-bold text-4xl">
          Com o seguro para celular da Porto Seguro, você tem:
        </span>
        <div className="flex flex-wrap p-5 text-left ">
          <div className=" md:w-1/3 ">
            <ul className="list-none">
              <li className="flex items-center mt-10 md:my-14">
                <img
                  className="w-12 h-12 mr-2"
                  src={imageManagerSeguroCelular.beneficios.celularCrash}
                  alt=""
                />
                <span className="pl-2">
                  Planos que se encaixam às suas necessidades.
                </span>
              </li>
              <li className="flex items-center mt-10 md:my-14">
                <img
                  className="w-12 h-12 mr-2"
                  src={imageManagerSeguroCelular.beneficios.celularGlobo}
                  alt=""
                />
                <span className="pl-2">
                  Viaje com tranquilidade: sinistros ocorridos fora do Brasil
                  estão cobertos.
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 ">
            <ul className="list-none">
              <li className="flex items-center mt-10 md:my-14">
                <img
                  className="w-12 h-10 mr-2"
                  src={imageManagerSeguroCelular.beneficios.portoPlus}
                  alt=""
                />
                <span className="pl-2">
                  Conte com benefícios e descontos em nossos parceiros.
                </span>
              </li>
              <li className="flex items-center mt-10 md:my-14">
                <img
                  className="w-12 h-12 mr-2"
                  src={imageManagerSeguroCelular.beneficios.Calendar}
                  alt=""
                />
                <span className="pl-2">
                  Cobertura por até 24 meses a partir da data de compra do
                  celular.
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 ">
            <ul className="list-none">
              <li className="flex items-center mt-10 md:my-14">
                <img
                  className="w-12 h-12 mr-2"
                  src={imageManagerSeguroCelular.beneficios.Cards}
                  alt=""
                />
                <span className="pl-2">
                  Pague em 12x sem juros. Cancele quando quiser, sem multa.
                </span>
              </li>
              <li className="flex items-center mt-10 md:my-14">
                <img
                  className="w-12 h-12 mr-2"
                  src={imageManagerSeguroCelular.beneficios.celularPin}
                  alt=""
                />
                <span className="pl-2">
                  Compartilhe sua localização e ganhe desconto na franquia.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
