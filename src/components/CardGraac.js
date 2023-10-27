import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import imageManager from "./bancoDeImagens";

export function CardGraaac() {
  return (
    <Card className="items-center w-3/4 justify-center mx-auto mb-20">
      <CardBody>
        <img
          className="mx-auto"
          src={imageManager.graac.logoGraac}
          alt="Logo da Intituição GRAAC em parceria com a Insurtech Prime Secure."
        />
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-2 sm:text-3xl text-xl font-bold text-grayPrime"
        >
          Somos uma empresa apoiadora do GRAAC
        </Typography>
        <Typography>
          É com imensa satisfação que a Prime Secure se une ao GRAACC, a
          principal organização dedicada ao combate ao câncer infantil no
          Brasil, em uma parceria comprometida e significativa. Esta colaboração
          não apenas reforça nosso compromisso com a responsabilidade social,
          mas também nos permite contribuir ativamente para o desenvolvimento e
          bem-estar das crianças afetadas por esta doença. Acreditamos que,
          juntos, podemos fazer a diferença na vida desses jovens pacientes e de
          suas famílias.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a
          href="https://storage.googleapis.com/primesecure/PRIME-SECURE-Graac.pdf"
          target="_blank"
          className="inline-block"
          rel="noreferrer"
        >
          <Button size="sm" variant="text" className="flex items-center gap-2">
            Ver Certificado
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
