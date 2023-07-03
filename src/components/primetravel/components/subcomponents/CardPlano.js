import {
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Tooltip,
  Avatar,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function CardPlano({ title, description, price }) {
  return (
    <Card className="max-w-[24rem] overflow-hidden m-6">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="text-2x1">
          {title}
        </Typography>
        <Typography>{price}</Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          {description}
        </Typography>
        <Button
          size="lg"
          color="white"
          className="text-white hover:scale-[1.02] focus:scale-[1.02] active:scale-100 p-3 bg-bluePrime mt-3"
          ripple={false}
          fullWidth={true}
        >
          Cotar Agora
        </Button>
      </CardBody>
    </Card>
  );
}
