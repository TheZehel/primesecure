//Seo
import { Helmet } from "react-helmet";

//Components
import FormSeguroPetBanner from "./components/FormSeguroPetBanner";
import SessaoInformativaProdutosLp from "../globalsubcomponentes/SessaoInformativaProdutosLp";
import InformacoesProdutos from "../modules/ModuleInformacoesProdutos";
//import PlanoSlider from "../globalsubcomponentes/PlanoSlider";
//import infoPlanos from "../modules/InfoPlanos";
import ConteudoSessaoInfo from "../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../modules/SessaoInfoLp";
import FaqPet from "./components/subcomponents/FaqPet";
import PlanSlider from "./components/planSlider";
import CountDown from "./components/subcomponents/CountDownBanner";

function IndexSeguroPet() {
  const targetDate = new Date("September 17, 2023 00:00:00");
  return (
    <div className="IndexSeguroPet">
      <Helmet>
        <title>Plano de Saúde PetLove | Prime Secure Marketplace</title>
        <meta
          name="description"
          content="O Plano de Saúde Pet oferece uma ampla rede de clínicas e profissionais qualificados para o bem-estar completo do seu pet."
        />

        <meta
          name="keywords"
          content="Prime Secure, Seguros, Insurance, Insurtech, Corretora de Seguros, MarketPlace de Seguros, Plano de Saúde Pet, Saúde Pet, Plano Pet, Prime, Cobertura para Pets, Seguro para Cães, Seguro para Gatos, Plano de Saúde para Animais, Assistência Veterinária, Cobertura Veterinária, Plano de Saúde Animal, Seguro Pet Online, Seguro Pet Confiável, Seguro para Animais de Estimação, Cuidados com Pets, Bem-estar Animal, Plano Pet Completo, Plano Pet Personalizado, Seguro Pet Integral, Seguro Pet Emergencial"
        />
        <meta
          property="og:title"
          content="Plano de Saúde PetLove | Prime Secure Marketplace"
        />
        <meta
          property="og:description"
          content="O Plano de Saúde Pet oferece uma ampla rede de clínicas e profissionais qualificados para o bem-estar completo do seu pet."
        />
        <meta
          property="og:image"
          content="https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/social-petlove-by-primesecure.png"
        />
        <meta
          property="og:url"
          content="https://primesecure.com.br/seguro-pet-porto"
        />
        <link
          rel="canonical"
          href="https://primesecure.com.br/seguro-pet-porto"
        />
      </Helmet>
      <CountDown targetDate={targetDate} />
      <FormSeguroPetBanner />
      <SessaoInformativaProdutosLp
        InformacoesProdutos={InformacoesProdutos}
        productId="3"
      />
      <PlanSlider />
      <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="3" />
      <FaqPet />
    </div>
  );
}

export default IndexSeguroPet;
