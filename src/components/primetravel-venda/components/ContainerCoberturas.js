import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import imageManagerPrimeTravelLpVenda from "../bancodeimagens/BancoDeImgsTravelVenda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ConteudoSessaoInfo from "../../globalsubcomponentes/ConteudoSessaoInfo";
import sessaoInfoLp from "../../modules/SessaoInfoLp";

export default function ContainerCoberturas() {
  const [modalOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  return (
    <div className="relative overflow-hidden bg-white my-10">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-start">
              Todas as Coberturas
            </h1>
            <p className="mt-4 text-xl text-gray-500 text-start">
              São Mais de 30 Coberturas Exclusivas Para as Suas Próximas
              Viagens.
            </p>
          </div>
          <div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src={
                            imageManagerPrimeTravelLpVenda.ContainerCoberturas
                              .ImgAtradoDeVoos
                          }
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={
                            imageManagerPrimeTravelLpVenda.ContainerCoberturas
                              .ImgDespesasMedicas
                          }
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={
                            imageManagerPrimeTravelLpVenda.ContainerCoberturas
                              .ImgSeguroViagem
                          }
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={
                            imageManagerPrimeTravelLpVenda.ContainerCoberturas
                              .ImgDespesasFarmaceuticas
                          }
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={
                            imageManagerPrimeTravelLpVenda.ContainerCoberturas
                              .ImgPraticaEsportivaAmadora
                          }
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={
                            imageManagerPrimeTravelLpVenda.ContainerCoberturas
                              .ImgDanosMala
                          }
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={
                            imageManagerPrimeTravelLpVenda.ContainerCoberturas
                              .ImgConcierge
                          }
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-self-center">
                <button
                  onClick={() => setModalIsOpen(true)}
                  className="inline-block rounded-md border border-transparent
                  bg-bluePrime px-8 py-3 text-center font-medium text-white
                  hover:bg-bluePrime2"
                >
                  Ver Coberturas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
        className="fixed inset-0 flex items-center justify-center p-6 bg-gray-800 bg-opacity-50"
      >
        <div className="animate__animated animate__fadeIn bg-white rounded-lg shadow px-2 py-4 my-10 mx-auto h-100 border border-gray-300  overflow-hidden order-1">
          <div className="flex justify-between items-center mb-4 p-3">
            <h2 className="text-2xl">Todas as Coberturas</h2>
            <button onClick={closeModal} className="bg-transparent">
              <FontAwesomeIcon
                icon={faTimes}
                className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer"
              />
            </button>
          </div>
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <ConteudoSessaoInfo sessaoInfoLp={sessaoInfoLp} sessaoInfoId="2" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
