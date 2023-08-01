import {
  CardHeader,
  Card,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function CardCelulares({ title, description, price, image }) {
  return (
    <Card className=" max-w-[24rem]overflow-hidden m-6">
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
        {/*<Typography variant="h2">
          <span className="text-base">A Partir de:</span> <br />
          <span className="text-x1">R$</span> <span>{price}</span>
          <span className="text-sm"> /dia</span>
  </Typography>*/}
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          {description}
        </Typography>
        <a href="#">
          <Button
            size="lg"
            color="white"
            className="text-white hover:scale-[1.02] focus:scale-[1.02] active:scale-100 p-3 bg-bluePrime mt-3"
            ripple={false}
            fullWidth={true}
          >
            Cotar Agora
          </Button>
        </a>
      </CardBody>
    </Card>
  );
}
