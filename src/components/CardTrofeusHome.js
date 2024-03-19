import {
  CardHeader,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
//import { useNavigate } from "react-router-dom";

export default function CardCelulares({
  title,
  description,
  price,
  image,
  id,
  href,
  brandImage,
}) {
  //const navigate = useNavigate();

  /*const handleClick = () => {
    navigate(href);
  };*/

  return (
    <div>
      <Card className="max-w-[24rem] h-[550px] overflow-hidden m-6 shadow-xl border-2">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded"
        >
          <img
            src={image}
            alt={`Imagem Promocional Apresentando o Destino ${title}`}
          />
        </CardHeader>
        <CardBody>
          <img
            src={brandImage}
            alt={"Logo empresas troféus"}
            className=" h-6 mx-auto "
          />
          <Typography variant="h4" color="blue-gray" className="text-2x1 mt-2">
            {title}
          </Typography>

          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            {description}
          </Typography>

          {/*<Button
        size="lg"
        color="white"
        className="text-white hover:scale-[1.02] focus:scale-[1.02] active:scale-100 p-3 bg-bluePrime mt-3"
        ripple={false}
        fullWidth={true}
        onClick={handleClick}
      >
        Cotar Agora
      </Button>*/}
        </CardBody>
      </Card>
    </div>
  );
}
