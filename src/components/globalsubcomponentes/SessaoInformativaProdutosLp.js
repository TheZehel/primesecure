import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SessaoInformativa({ InformacoesProdutos, productId }) {
  const produto = InformacoesProdutos.find(
    (produto) => produto.id === productId
  );

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="overflow-hidden bg-white font-sans mt-10" key={produto.id}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-bluePrime">
                {produto.title}
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {produto.name}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {produto.description}
              </p>
              <button
                onClick={() => (window.location.href = produto.link)}
                className="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-2/4"
              >
                {produto.buttonText}
              </button>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {produto.features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <FontAwesomeIcon
                        {...feature.iconProps}
                        className="absolute left-1 top-1 h-5 w-5 text-bluePrime"
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
          <div className="relative">
            <img
              src={produto.image}
              alt={produto.name}
              className=" inset-0 w-full h-full object-cover object-center rounded-xl shadow-xl   sm:relative sm:w-[57rem] sm:h-auto sm:max-w-none  sm:shadow-none sm:ring-0 sm:ring-transparent  sm:mx-10 sm:my-2  sm:rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessaoInformativa;
