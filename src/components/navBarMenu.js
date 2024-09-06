import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { scroller, Link as LinkScroller } from "react-scroll";
import imageManager from "./bancoDeImagens";
import classNames from "classnames";
import { useNavigate, Link } from "react-router-dom";
import GlobalFuntions from "../components/globalsubcomponentes/globalFunctions";

//Icones - HeroIcon
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PlayCircleIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";

//Icones - FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faTooth,
  faHeart,
  faHouse,
  faPlane,
  faMobile,
  faBuilding,
  faMedkit,
  faPhone,
  faCarOn,
  faMicrochip,
  faHeartCircleCheck,
  faBicycle,
  faPhoneSlash,
  faPhoneAlt,
  faMobilePhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const globalFunctions = new GlobalFuntions();

const utmParams = globalFunctions.getCampaignParams("string");

const products = [
  {
    name: "Seguro Viagem",
    description: "Contratação 100% Online",
    href: `/primetravel${utmParams ? "?" + utmParams : ""}`,
    icon: FontAwesomeIcon,
    iconProps: { icon: faPlane },
  },
  {
    name: "Seguro Bike Kakau",
    description: "Proteção para sua Bike",
    href: `/seguro-bike${utmParams ? "?" + utmParams : ""}`,
    icon: FontAwesomeIcon,
    iconProps: { icon: faBicycle },
  },
  {
    name: "Seguro Celular Kakau",
    description: "Proteção para o Seu Celular",
    href: `/seguro-celular-kakau${utmParams ? "?" + utmParams : ""}`,
    icon: FontAwesomeIcon,
    iconProps: { icon: faMobilePhone },
  },
  {
    name: "Seguro Residencial",
    description: "Planos de Proteção Para a Sua Residencia.",
    href: `/seguro-residencial-porto-2${utmParams ? "?" + utmParams : ""}`,
    icon: FontAwesomeIcon,
    iconProps: { icon: faHouse },
  },
  {
    name: "Seguro Pet",
    description: "Planos de Proteção Seu Pet.",
    href: `/seguro-pet-porto${utmParams ? "?" + utmParams : ""}`,
    icon: FontAwesomeIcon,
    iconProps: { icon: faPaw },
  },
  {
    name: "Odonto",
    description: "Planos de Proteção Odonto.",
    href: "https://odontosulamerica.com.br/",
    icon: FontAwesomeIcon,
    iconProps: { icon: faTooth },
  },
  {
    name: "Vida",
    description: "Planos de Proteção Para Sua Vida",
    href: "/seguro-de-vida",
    icon: FontAwesomeIcon,
    iconProps: { icon: faHeart },
  },
  {
    name: "Celular",
    description: "Planos de Proteção Para o Seu Celular",
    href: "/equipamentos-portateis-3",
    icon: FontAwesomeIcon,
    iconProps: { icon: faMobile },
  },
  {
    name: "Consórcio Imóvel",
    description: "Para quem busca realizar o sonho da casa própria",
    href: "/consorcio-imovel",
    icon: FontAwesomeIcon,
    iconProps: { icon: faBuilding },
  },
  {
    name: "Consórcio Auto",
    description: "Para quem busca realizar o sonho do carro novo",
    href: "/consorcio-auto",
    icon: FontAwesomeIcon,
    iconProps: { icon: faCarOn },
  },
  {
    name: "Saúde",
    description: "Para quem busca cuidar de si próprio",
    href: "https://primesecureprodutos.com.br/planos-de-saude/",
    icon: FontAwesomeIcon,
    iconProps: { icon: faMedkit },
  },
  {
    name: "Seguro de Vida Azos",
    description: "Para quem busca cuidar de si próprio",
    href: "https://primesecureprodutos.com.br/seguro-de-vida-prime-azos/",
    icon: FontAwesomeIcon,
    iconProps: { icon: faHeartCircleCheck },
  },
  {
    name: "Chip Internacional",
    description: "Para quem quer comunicação sem fronteiras",
    href: "https://primechip.com.br/",
    icon: FontAwesomeIcon,
    iconProps: { icon: faMicrochip },
  },
];

const callsToAction = [
  { name: "Conheça a Prime", href: "/sobre", icon: PlayCircleIcon },
  { name: "Fale Conosco", href: "/contato", icon: PhoneIcon },
];

const menu = [
  {
    name: "Sobre a Prime",
    href: "/sobre",
  },
  {
    name: "Contato",
    href: "/contato",
  },
  {
    name: "Blog",
    href: "https://blog.primesecure.com.br/",
  },
];

const pathToLogoMap = {
  "/seguro-pet-porto": imageManager.brand.logoPrimeSecurePetLove,
  "/seguro-pet-porto/": imageManager.brand.logoPrimeSecurePetLove,
  "/sulamerica-odonto": imageManager.brand.logoPrimeSecureSulamerica,
  "/sulamerica-odonto/": imageManager.brand.logoPrimeSecureSulamerica,
  "/seguro-de-vida": imageManager.brand.logoPrimeSecureSulamerica,
  "/seguro-de-vida/": imageManager.brand.logoPrimeSecureSulamerica,
  "/seguro-residencial-porto-2": imageManager.brand.logoPrimeSecurePorto,
  "/seguro-residencial-porto-2/": imageManager.brand.logoPrimeSecurePorto,
  "/equipamentos-portateis-3": imageManager.brand.logoPrimeSecurePorto,
  "/equipamentos-portateis-3/": imageManager.brand.logoPrimeSecurePorto,
  "/seguro-bike": imageManager.brand.logoPrimeSecureKakau,
  "/seguro-bike/": imageManager.brand.logoPrimeSecureKakau,
  "/seguro-celular-kakau": imageManager.brand.logoPrimeSecureKakau,
  "/seguro-celular-kakau/": imageManager.brand.logoPrimeSecureKakau,
  "/consorcio-auto": imageManager.brand.logoPrimeSecurePorto,
  "/consorcio-auto/": imageManager.brand.logoPrimeSecurePorto,
  "/consorcio-imovel": imageManager.brand.logoPrimeSecurePorto,
  "/consorcio-imovel/": imageManager.brand.logoPrimeSecurePorto,
};

function NavBarMenu() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuFixed, setIsMenuFixed] = useState(false);

  // Obtém a URL atual
  const currentPath = window.location.pathname;

  // Escolhe o logo com base na URL
  const logo = pathToLogoMap[currentPath] || imageManager.brand.logoPrimeSecure;

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const navigateToPath = (paths) => {
    // split the path into pagePath and sectionId
    const [pagePath, sectionId] = paths.split("#");

    // if pagePath exists in the paths array, navigate to the page
    if (paths.includes(pagePath)) {
      navigate(pagePath);

      setTimeout(() => {
        // after navigating to the page, if sectionId exists, scroll to the section
        if (sectionId && document.getElementById(sectionId)) {
          scrollToSection(sectionId);
        } else {
          // Scroll to the top of the new page
          scroller.scrollTo("top", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
          });
        }
      }, 500); // Delay
    } else {
      console.log(`Page with path ${pagePath} not found`);
    }
  };

  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      const scrollThreshold = 200;

      if (
        currentScrollPosition < lastScrollPosition &&
        currentScrollPosition > scrollThreshold
      ) {
        setIsMenuFixed(true);
        setIsMenuVisible(true);
        setHasScrolled(true);
      } else if (currentScrollPosition === 0 && hasScrolled) {
        setIsMenuFixed(false);
        setIsMenuVisible(true); // Mantenha o menu visível quando voltar ao topo da página
        setHasScrolled(false);
      } else {
        setIsMenuFixed(false);
        setIsMenuVisible(false);
        if (currentScrollPosition > 0) {
          setHasScrolled(true);
        }
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition, hasScrolled]);

  var pageSlug = globalFunctions.getPageSlug();
  var productName = globalFunctions.getPageName(pageSlug);

  var productList = products;
  productList = products.filter((product) => product.name != productName);
  //console.log(productList)

  //console.log(pageSlug);
  //console.log(globalFunctions.getPageName(pageSlug));

  useEffect(() => {
    const pageSlug = globalFunctions.getPageSlug();
    const productName = globalFunctions.getPageName(pageSlug);

    const productList = products.filter(
      (product) => product.name !== productName
    );

    //console.log(pageSlug);
    //console.log(productName);
    //console.log(productList);
  }, []);

  const [linkClicked, setLinkClicked] = useState(false);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      cursor: "pointer",
      // Adiciona estilos para o controle aqui, se necessário
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      border: "80px", // Corrigido para 'none' ou especifique uma largura válida e estilo de borda, por exemplo, '1px solid #ccc'
      backgroundColor: state.isSelected ? "#03a8db" : "white",
      color: state.isSelected ? "white" : "#313131",
      "&:hover": {
        backgroundColor: "lightblue",
      },
      with: "80%",
      // Adiciona outros estilos de opção aqui, se necessário
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      // Aqui vamos adicionar o estilo para a barra de rolagem
      "::-webkit-scrollbar": {
        width: "3px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#03a8db",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    // Adiciona mais customizações de estilo para outras partes aqui, se necessário
  };

  return (
    <header
      className={classNames(
        "bg-white  font-montserrat z-[900] shadow transition-transform duration-2000 ease-in-out",
        {
          "fixed top-0 w-full z-[900] transform translate-y-0":
            isMenuFixed && isMenuVisible,
          "transform -translate-y-full":
            hasScrolled && !(isMenuFixed && isMenuVisible),
        }
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-2 sm:p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Prime Secure</span>
            <img
              className="h-auto w-[250px] sm:w-[300px]"
              src={logo}
              alt="Logo Prime Secure"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir Menu Principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 ">
          <Popover className="relative">
            <Popover.Button
              id="option-produtos"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Produtos
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="custom-scrollbar absolute -left-8 top-full z-[900] mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 overflow-auto"
                style={{ maxHeight: "90vh" }}
                styles={customStyles}
              >
                <div className="p-4">
                  {productList.map((item) => (
                    <Link
                      to={item.href}
                      className="block font-semibold text-gray-900 "
                      onClick={() => {
                        setLinkClicked(!linkClicked);
                        setMobileMenuOpen(false);
                        if (!item.href.startsWith("/")) {
                          window.scrollTo(0, 0); // Scroll to top
                        }
                        // Close the Popover
                        if (document.getElementById("option-produtos")) {
                          document.getElementById("option-produtos").click();
                        }
                      }}
                    >
                      <div
                        key={item.name}
                        className="group relative flex items-start gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-blue-200 hover:text-white cursor-pointer"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          {typeof item.icon === "string" ? (
                            <img
                              src={item.icon}
                              className="h-6 w-6 text-gray-600 group-hover:text-bluePrime"
                              aria-hidden="true"
                              alt="Ícone"
                            />
                          ) : (
                            <item.icon
                              {...(item.iconProps || {})}
                              className="h-6 w-6 text-gray-600 group-hover:text-bluePrime"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <div className="flex-auto">
                          <span className="block font-semibold text-gray-900">
                            {item.name}
                          </span>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                      onClick={() => {
                        setLinkClicked(!linkClicked);
                        setMobileMenuOpen(false);
                        if (!item.href.startsWith("/")) {
                          window.scrollTo(0, 0); // Scroll to top
                        }
                        // Close the Popover
                        if (document.getElementById("option-produtos")) {
                          document.getElementById("option-produtos").click();
                        }
                      }}
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          {menu.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                item.href.startsWith("/")
                  ? navigateToPath(item.href)
                  : scrollToSection(item.href);
                window.scrollTo(0, 0); // Rola para o topo da página
              }}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
          <button className="hidden">
            <Link
              to="/login"
              onClick={(event) => {
                event.preventDefault();
                navigate("/login");
                setMobileMenuOpen(false);
              }}
              className="text-sm font-semibold leading-6 text-gray-900 hover:decoration-bluePrime hover:underline transition duration-75 ease-out"
            >
              Acionar Seguro <span aria-hidden="true"></span>
            </Link>
          </button>
          <button className="space-x-1 hover:decoration-bluePrime hover:underline transition duration-75 ease-out text-bluePrime hidden">
            <FontAwesomeIcon
              icon={faUser}
              className="text-sm  justify-center text-grayPrime hover:decoration-bluePrime hover:underline transition duration-75 ease-out"
            />
            <Link
              to="/login"
              onClick={(event) => {
                event.preventDefault();
                navigate("/login");
                setMobileMenuOpen(false);
              }}
              className="text-sm font-semibold leading-6 text-gray-900 hover:decoration-bluePrime hover:underline transition duration-75 ease-out"
            >
              Minha Conta <span aria-hidden="true"></span>
            </Link>
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-[900]" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-[900] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#Home" className="-m-1.5 p-1.5">
              <span className="sr-only">Prime Secure</span>
              <img
                className="h-auto w-[250px] sm:w-[300px]"
                src={logo}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                        Seguros
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...productList, ...callsToAction].map((item) =>
                          item.href.startsWith("/") ? (
                            <Link
                              to={item.href}
                              key={item.name}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <LinkScroller
                              key={item.name}
                              to={item.href.substring(1)}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              onClick={() => {
                                scrollToSection(item.href);
                                setMobileMenuOpen(false);
                              }}
                              spy={true}
                              smooth={true}
                              offset={-70}
                              duration={500}
                            >
                              {item.name}
                            </LinkScroller>
                          )
                        )}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {menu.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      scrollToSection(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {/*<button>
                  <Link
                    to="/login"
                    onClick={(event) => {
                      event.preventDefault();
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Login <span aria-hidden="true">&rarr;</span>
                  </Link>
                  </button>*/}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default NavBarMenu;
