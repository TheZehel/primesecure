import {
  CardHeader,
  Card,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function CardCelulares({
  title,
  description,
  price,
  image,
  id,
  href,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <Card className="max-w-[24rem] overflow-hidden m-6 shadow-xl border-2">
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
        <Typography variant="h4" color="blue-gray" className="text-2x1">
          {title}
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          {description}
        </Typography>
        <Button
          size="lg"
          color="white"
          className="text-white hover:scale-[1.02] focus:scale-[1.02] active:scale-100 p-3 bg-bluePrime mt-3"
          ripple={false}
          fullWidth={true}
          onClick={handleClick}
        >
          Cotar Agora
        </Button>
      </CardBody>
    </Card>
  );
}
