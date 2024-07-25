const TrophyCard = ({ image, title, description, logo, altLogo }) => {
  return (
    <div className="min-w-[300px] md:min-w-[300px] lg:max-w-[300px] md:w-auto bg-neutral-10 p-4 rounded-lg shadow-md mx-4 mb-4 md:mb-0 bg-white sm:m-2 sm:mx-auto">
      <img
        src={image.src}
        width="120 "
        height="120"
        alt={image.alt}
        className="mb-4 h-auto mx-auto"
        loading="lazy"
        decoding="async"
      />
      <img
        src={logo.src}
        alt={logo.altLogo}
        width="90"
        height={90}
        loading="lazy"
        decoding="async"
        className="mb-4 h-auto mx-auto"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <h4 className="text-md text-gray-600">{description}</h4>
    </div>
  );
};

const Trophy = () => {
  const trophyData = [
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/sulamerica-super-campeoes.webp",
        alt: "Troféu SulAmérica Super Campeões",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/seguradora-sulamerica.webp",
        altLogo: "logo da seguradora SulAmérica",
      },
      title: "Super Campeões",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/portoseguro-acelera.webp",
        alt: "trofeu Porto Acelera",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/Porto.webp",
        altLogo: "logo da seguradora Porto Seguro",
      },
      title: "Porto Acelera",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/trofeu-sulamerica-1.webp",
        alt: "Trofeu SulAmérica destaque nacional",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/seguradora-sulamerica.webp",
        altLogo: "logo da seguradora SulAmérica",
      },
      title: "Super Campeões",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/destaque-sulamerica-3trimestre.webp",
        alt: "troféu destaque SulAmérica 3º trimestre",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/seguradora-sulamerica.webp",
        altLogo: "logo da seguradora SulAmérica",
      },
      title: "Destaque SulAmérica 3º Trimestre",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/trofeu-portoseguro.webp",
        alt: "trofeu top 10 Porto Seguro vida 2017",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/Porto.webp",
        altLogo: "logo da seguradora Porto",
      },
      title: "Top 10 Porto Brasil - Vida 2017",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/certificado-elite-portoseguro.webp",
        alt: "trofeu elite porto",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/Porto.webp",
        altLogo: "logo da seguradora Porto",
      },
      title: "Certificado Elite Porto",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/destaque-sulamerica-1semestre.webp",
        alt: "trofeu destaque sulamerica 1º semestre",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/seguradora-sulamerica.webp",
        altLogo: "logo sulamerica",
      },
      title: "Destaque SulAmérica 1º Semestre",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/trofeu-bradesco-1.webp",
        alt: "premio melhor produção 2018",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/Banco_Bradesco_logo__horizontal_.webp",
        altLogo: "logo bradesco",
      },
      title: "Prêmio Melhor Produção 2018",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/trofeu-bradesco-2.webp",
        alt: "premio destaque de qualidade - ABS",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/Banco_Bradesco_logo__horizontal_.webp",
        altLogo: "logo bradesco",
      },
      title: "Prêmio Destaque de Qualidade - ABS",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/trofeu-bradesco-3.webp",
        alt: "premio destaque de qualidade - ABS",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/Banco_Bradesco_logo__horizontal_.webp",
        altLogo: "logo bradesco",
      },
      title: "Campeã em Vendas Bradesco 2021",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/trofeu-bradesco-4.webp",
        alt: "Primeiro Colocado em Vendas 2017",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/Banco_Bradesco_logo__horizontal_.webp",
        altLogo: "logo bradesco",
      },
      title: "Primeiro Colocado em Vendas 2017",
      description: "",
    },
    {
      image: {
        src: "https://storage.googleapis.com/primesecure/trofeu-bradesco-5.webp",
        alt: "Primeiro colocado em vendas 2018",
      },
      logo: {
        src: "https://storage.googleapis.com/primesecure/Banco_Bradesco_logo__horizontal_.webp",
        altLogo: "logo bradesco",
      },
      title: "Primeiro Colocado em Vendas 2018",
      description: "",
    },
  ];

  return (
    <section className="features page-keep mt-[120px] ">
      <div className="mx-auto">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">
          Prêmios e Reconhecimentos
        </h2>
        <div className="flex flex-row flex-nowrap md:flex-wrap overflow-x-auto scrollbar-hide pb-4 md:overflow-x-hidden">
          {trophyData.map((trophy, index) => (
            <TrophyCard key={index} {...trophy} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trophy;
