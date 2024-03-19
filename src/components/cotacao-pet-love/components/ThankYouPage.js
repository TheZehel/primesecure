import { Card, CardBody, CardFooter } from "@material-tailwind/react";

import imageManager from "../../bancoDeImagens";

export default function ThankYouPage() {
  const formatCurrency = (value) => {
    let options = {
      style: "decimal",
      useGrouping: true,
      groupingSeparator: ".",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    let price = value.toLocaleString(undefined, options);

    return price;
  };

  const getPlans = () => {
    var sessionData = sessionStorage.getItem("formPetData");

    try {
      sessionData = JSON.parse(sessionData);
    } catch (error) {
      console.error("Erro ao recuperar dados de sessão", error);
      sessionData = [];
    }

    //console.log(sessionData);

    if (!sessionData || !sessionData.plansData) {
      return [];
    }

    return sessionData.plansData;
  };

  const PetCard = (petData) => {
    let { pet, plan } = petData;

    let { title, price } = plan;

    return (
      <div className="p-4 w-full md:w-1/3">
        <Card className="w-full">
          <CardBody>
            <h2 className="h2 font-bold">
              {pet} | <span className="text-bluePrime">{title}</span>
            </h2>

            <h3 className="h2 font-bold">
              Valor: R$ {formatCurrency(price / 100)}
            </h3>
          </CardBody>
          <CardFooter className="pt-0"></CardFooter>
        </Card>
      </div>
    );
  };

  const PopulateContainer = () => {
    let plans = getPlans();

    return (
      <div className="m-3 flex flex-wrap justify-start">
        {plans.map((plan) => {
          return PetCard(plan);
        })}
      </div>
    );
  };

  return (
    <div className="font-montserrat mt-10 text-grayPrime">
      <div>
        <h1 className="text-5xl ">Pagamento Aprovado</h1>
        <p className="mt-4">
          Verifque em seu e-mail quais serão próximos passos para cadastrar seus
          amiguinhos na PetLove
        </p>
      </div>
      <div className="max-w-5xl mx-auto mt-8">{PopulateContainer()}</div>
      <h3 className="pt-10 mx-auto font-semibold">
        Cadastre seu Pet e agende a microchipagem através do app:
      </h3>
      <div className="mx-auto">
        <a href="https://play.google.com/store/apps/details?id=br.com.petlove.petlove&hl=pt_BR&gl=US&pli=1">
          <img
            className="w-[250px] mx-auto"
            src={imageManager.Downloads.playStore}
            alt="imagem download play store"
          />
        </a>

        <a href="https://apps.apple.com/br/app/petlove-o-app-do-seu-pet/id828960201">
          <img
            className="w-[270px] mx-auto"
            src={imageManager.Downloads.appStore}
            alt="imagem download app store"
          />
        </a>
      </div>
    </div>
  );
}
