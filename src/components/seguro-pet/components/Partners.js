import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function Partners() {
  return (
    <section className="Parceiros font-montserrat py-5 my-12" id="partners">
      <div className="mx-auto text-3xl sm:text-4xl font-bold text-grayPrime">
        <h2>Uma união de Amor pelos Pets</h2>
        <p className="text-lg font-normal px-5">
          <span className="font-bold text-bluePrime">
            PrimeSecure, Petlove e Porto
          </span>{" "}
          unidas para oferecer tudo que pais de pets precisam em um só lugar
        </p>
        <div className="p-5">
          <img
            className="w-[350px] mx-auto"
            src={imageManagerSeguroPet.logos.LogoPrime}
            alt="Logo Prime Secure"
          />
          <img
            className="w-80 mx-auto pt-5"
            src={imageManagerSeguroPet.logos.PetLoveAndPorto}
            alt="Logo Pet Love em parceria com a Porto."
          />
        </div>
      </div>
    </section>
  );
}
