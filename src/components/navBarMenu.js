import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { scroller, Link as LinkScroller } from "react-scroll";
import logoprime from "../assets/img/logo-prime-secure.png";
import classNames from "classnames";
import { useNavigate, Link, useLocation } from "react-router-dom";

import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Seguro Viagem",
    description: "Contratação 100% Online",
    href: "#Travel1",
    icon: PaperAirplaneIcon,
  },
  {
    name: "Seguro Residencial",
    description: "Planos de Proteção Para a Sua Residencia.",
    href: "#Residencial",
    icon: HomeIcon,
  },
];
const callsToAction = [
  { name: "Conheça a Prime", href: "#Travel1", icon: PlayCircleIcon },
  { name: "Fale Conosco", href: "#Residencial", icon: PhoneIcon },
];

const menu = [
  {
    name: "Sobre a Prime",
    href: "#sobrePrime",
  },
  {
    name: "Newsletter",
    href: "#Newsletter",
  },
  {
    name: "FAQ",
    href: "#Faq",
  },
];

function NavBarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuFixed, setIsMenuFixed] = useState(false);

  const scrollToSection = (itemHref) => {
    let paths = [
      "/login",
      "/primetravel",
      "/seguro-de-vida",
      "/equipamentos-portateis-3",
      "/obrigado",
    ];
    if (paths.includes(location.pathname)) {
      navigate("/"); //redirecionar para a página
      setTimeout(() => {
        // scrolla até o item quando a página é carregada.
        scroller.scrollTo(itemHref.substring(1), {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      }, 500); //Delay
    } else {
      scroller.scrollTo(itemHref.substring(1), {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 200;

      if (scrollPosition > scrollThreshold && !isMenuFixed) {
        setIsMenuFixed(true);
      } else if (scrollPosition <= scrollThreshold && isMenuFixed) {
        setIsMenuFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuFixed]);

  const [linkClicked, setLinkClicked] = useState(false);

  return (
    <header
      className={`bg-white font-montserrat z-1 ${
        isMenuFixed
          ? "fixed top-0 w-full z-50 transition-all duration-300 fade-in-out"
          : ""
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Prime Secure</span>
            <img
              className="h-5 w-auto"
              src={logoprime}
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
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
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
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-bluePrime"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.href);
                            document.getElementById("option-produtos").click();
                            setLinkClicked(!linkClicked);
                            setMobileMenuOpen(false);
                          }}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        scrollToSection(item.href.substring(1));
                      }}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
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
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button>
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
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#Home" className="-m-1.5 p-1.5">
              <span className="sr-only">Prime Secure</span>
              <img className="h-8 w-auto" src={logoprime} alt="" />
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
                        {[...products, ...callsToAction].map((item) => (
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
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {menu.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
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
                <button>
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
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default NavBarMenu;
