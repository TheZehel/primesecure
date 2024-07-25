import imageManagerPrimeTravel from "../../bancodeimagens/BancoDeImagensPrimeTravel";

export default function FaixaBanner() {
  return (
    <div
      className="bg-bluePrime mb-4"
      style={{
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}
    >
      <div
        className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 pt-3 pb-3 mx-auto text-center md:text-left text-white"
        style={{
          fontSize: "1.2rem",
          letterSpacing: "2px",
          width: "fit-content",
        }}
      >
        <p className="leading-6">Seguro garantido pela</p>
        <img
          src={imageManagerPrimeTravel.ImagensLandPage.ImgLogoGenerali}
          alt="Logo da empresa parceira Too Seguros"
          className="w-40"
        />
        <p className="leading-6">uma seguradora com mais de 100 anos.</p>
      </div>
    </div>
  );
}
