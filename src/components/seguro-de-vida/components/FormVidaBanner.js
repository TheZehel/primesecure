import BannerSection from "../../globalsubcomponentes/BannerSection";
//import SimpleFormSection from "../../globalsubcomponentes/SimpleFormSection";
import imageManagerVida from "../bancodeimagens/BancoDeImagensVida";
import Form from "./Form";

export default function FormBannerVida() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-2"
      style={{
        backgroundImage: `url(${imageManagerVida.banners.BannerVida})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BannerSection
        chipText="Invista em Sua Vida Com"
        titleText="Seguro de Vida"
        descriptionText="Não importa como e para onde você viaja, nós te protegemos. Ainda Contamos Com + de 30 Coberturas."
      />
      <Form />
    </section>
  );
}
