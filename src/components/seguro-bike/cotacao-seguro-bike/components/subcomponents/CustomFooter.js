import { Typography } from "@material-tailwind/react";
import imageManager from "../../../../bancoDeImagens";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcMastercard,
  faCcAmex,
  faCcVisa,
  faCcDinersClub,
  faPix,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

const LINKS = [
  {
    title: "Produtos",
    items: [
      { title: "Residencial", link: "/seguro-residencial-porto-2" },
      { title: "Viagem", link: "/PrimeTravel" },
      { title: "Vida", link: "/seguro-de-vida" },
      { title: "Celular", link: "/equipamentos-portateis-3" },
      { title: "Pet", link: "/seguro-pet-porto" },
      { title: "Odonto", link: "/sulamerica-odonto" },
    ],
  },
  {
    title: "Dúvidas",
    items: [
      { title: "FAQ", link: "#" },
      {
        title: "LGPD",
        link: "https://banco-de-imagens-webapp-primesecure.s3.sa-east-1.amazonaws.com/LGPD+SITE+-+PRIME+SECURE.pdf",
      },
      {
        title: "Políticas de privacidade",
        link: "/politicas-de-privacidade",
      },
    ],
  },
  {
    title: "Sobre Nós",
    items: [
      { title: "Sobre", link: "/sobre" },
      { title: "Contato", link: "/contato" },
    ],
  },
];

const products = [
  {
    name: "Seguro Viagem",
    description: "Contratação 100% Online",
    href: "#Travel1",
  },
  {
    name: "Seguro Residencial",
    description: "Planos de Proteção Para a Sua Residencia.",
    href: "#Residencial",
  },
];

const menu = [
  {
    name: "Sobre a Prime",
    href: "#sobrePrime",
  },
  {
    name: "Contato",
    href: "#Contato",
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  //const _footer = document.querySelector('footer:not([id="custom-kakau-footer"])');

  //if (_footer && _footer.style?.display !== "none") _footer.style.display = "none";

  return (
    <footer id="custom-kakau-footer" className="relative w-full bg-white font-montserrat">
      <div className="mx-auto w-full max-w-full px-8 py-8 mt-10">
        {/* Contêiner para a Imagem e o Texto */}
        <div className="mt-8 flex flex-col items-center">
          {/* Imagem */}
          <img
            src={imageManager.brand.logoPrimeSecure}
            alt="Logo Prime Secure"
            width={300}
            height={150}
          />

          {/* Texto abaixo da imagem 
          <p className="mt-4 text-center text-sm text-blue-gray-900">
            Seu texto aqui
          </p>*/}
        </div>
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2 mt-10 sm:mt-20">
          <div className="grid grid-cols-3 justify-between gap-4 text-start">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-semibold text-grayPrime text-md"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link.title}>
                    <Typography
                      as="a"
                      href={link.link}
                      color="gray"
                      className="py-1.5 font-normal transition-colors hover:text-bluePrime"
                    >
                      {link.title}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-grayPrime text-md">
              Formas de Pagamento:
            </h4>
            <div className="flex  justify-center items-center m-4 ">
              <div className="bg-white text-grayPrime p-5 pt-0 rounded-lg items-center justify-center  max-w-5xl">
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faCcMastercard}
                    size="2x"
                    style={{ color: "#03a8db", marginRight: "8px" }}
                  />
                  <FontAwesomeIcon
                    icon={faCcVisa}
                    size="2x"
                    style={{ color: "#03a8db", marginRight: "8px" }}
                  />
                  <FontAwesomeIcon
                    icon={faCcAmex}
                    size="2x"
                    style={{ color: "#03a8db", marginRight: "8px" }}
                  />
                  <FontAwesomeIcon
                    icon={faCcDinersClub}
                    size="2x"
                    style={{ color: "#03a8db", marginRight: "8px" }}
                  />
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    size="2x"
                    style={{ color: "#03a8db" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear}{" "}
            <a href="www.primesecure.com.br">Prime Secure</a>. Todos os Direitos
            Reservados.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography
              as="a"
              href="https://www.facebook.com/primesecure"
              className="opacity-80 transition-opacity hover:text-bluePrime"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography
              as="a"
              href="https://www.instagram.com/primesecureoficial/"
              className="opacity-80 transition-opacity hover:text-bluePrime"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}
