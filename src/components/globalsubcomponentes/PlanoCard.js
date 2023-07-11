import React from "react";

function PlanoCard({ plano }) {
  return (
    <div
      className={`flex flex-col shadow-xl items-center justify-center rounded-md bg-white m-5 my-5 px-6 py-8 lg:p-6 ${
        plano.emphasized ? "lg:py-16" : ""
      }`}
    >
      <div>
        <h3
          className={`text-2xl font-extrabold text-gray-900 sm:text-3xl ${
            plano.emphasized ? "text-4xl" : ""
          }`}
        >
          {plano.name}
        </h3>
        <p className="mt-4 text-lg leading-6 text-gray-500">{plano.price}</p>
      </div>
      <div className="mt-6">
        <ul className="space-y-4">
          {plano.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="ml-3 text-base leading-6 text-gray-500">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <div className="rounded-lg shadow-md">
          <a
            href={plano.buttonLink}
            className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-bluePrime hover:bg-greenPromo focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Cotar Agora
          </a>
        </div>
      </div>
    </div>
  );
}

export default PlanoCard;
