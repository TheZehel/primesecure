import React from "react";
import { useNavigate } from "react-router-dom";
import imageManager from "../../bancodeimagens/BancoDeImagensVida";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faUserMd, faGlobe } from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    name: "Apoio Psicológico",
    description:
      "Em caso de diagnóstico de câncer, invalidez permanente ou falecimento, a família da segurada receberá orientação psicológica.",
    icon: FontAwesomeIcon,
    iconProps: { icon: faBrain },
  },
  {
    name: "Médico na Tela Familiar",
    description:
      "Serviço de orientação médica a qualquer hora e de qualquer lugar, destinada a até 4 pessoas, conforme indicação da segurada.",
    icon: FontAwesomeIcon,
    iconProps: { icon: faUserMd },
  },
  {
    name: " Segunda Opinião Médica Internacional",
    description:
      "Em caso de doenças complexas cobertas, você terá direito a uma segunda opinião com um médico reconhecido internacionalmente.",
    icon: FontAwesomeIcon,
    iconProps: { icon: faGlobe },
  },
];

export default function ContainerVidaMulher() {
  const navigate = useNavigate();
  //Direciona Click do botão para url externa
  const handleClick = () => {
    navigate("#");
  };
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="relative order-2 sm:order-1">
            <img
              src={imageManager.sections.VidaMulher}
              alt="Product screenshot"
              className="w-full h-full object-cover object-center rounded-xl sm:relative sm:w-[57rem] sm:h-auto sm:max-w-none  sm:shadow-none sm:ring-0 sm:ring-transparent  sm:mx-10 sm:my-2  sm:rounded-lg ml-auto mr-0 lg:transform lg:-translate-x-[45%] z-[-1] sm:z-10"
            />
          </div>
          <div className="lg:pl-8 lg:pt-4 order-1 sm:order-2">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-pinkPrime font-sans">
                Cobertura Exclusiva Para Mulheres
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl font-sans">
                Seguro de Vida Mulher
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 font-sans">
                Uma cobertura inteiramente pensada em exclusividades para as
                mulheres.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none font-sans">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        {...feature.iconProps}
                        className="absolute left-1 top-1 h-5 w-5 text-pinkPrime"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
