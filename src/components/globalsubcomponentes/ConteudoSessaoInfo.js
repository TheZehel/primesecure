export default function ConteudoSessaoInfo({ sessaoInfoLp, sessaoInfoId }) {
  const sessaoInfo = sessaoInfoLp.find((item) => item.id === sessaoInfoId);

  if (!sessaoInfo) {
    return <div>Sessão não encontrada</div>;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div key={sessaoInfo.id}>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-center font-semibold leading-7 text-bluePrime">
              {sessaoInfo.title}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {sessaoInfo.subtitle}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {sessaoInfo.description}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {sessaoInfo.features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-left font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-bluePrime">
                      {feature.icon}
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-left leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
