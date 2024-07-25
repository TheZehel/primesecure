import imageManagerPrimeTravelLpVenda from "../bancodeimagens/BancoDeImgsTravelVenda";
import TravelInsuranceQuote from "./TravelInsuranceQuote";

export default function BannerLead() {
  return (
    <section
      className="bg-bluePrime px-5 py-5 sm:py-10 "
      style={{
        backgroundImage: `url(${imageManagerPrimeTravelLpVenda.Banner.bannerPrimeTravel})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div>
        <TravelInsuranceQuote />
      </div>
    </section>
  );
}
