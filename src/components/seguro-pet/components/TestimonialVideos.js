import { useState } from "react";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function TestimonialVideos({ openModalStep }) {
  const openModal = (step) => {
    openModalStep(step);
  };

  //Estado Modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalTwoOpen, setModalTwoOpen] = useState(false);

  const youtubeVideoId = "wxjsxps9kAk";
  const youtubeVideoId2 = "SwXbMcPmyNk";
  return (
    <section id="mudamos-muitas-vidas" className="py-9 bg-bluePrime">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-white font-bold mb-12 text-3xl sm:text-5xl">
          Conheça histórias com muito love envolvido
        </h2>
        <div className="flex flex-col md:flex-row gap-6 xl:px-80">
          {/* Primeira Coluna */}
          <div className="md:w-1/2">
            <img
              onClick={() => setModalOpen(true)}
              src={
                imageManagerSeguroPet.TestimonialVideos.imageTestimonialFernanda
              }
              alt="Imagem de uma mulher com um cachorro no colo com o título: “Conheça a historia de Fernanda e Castanha”"
              className="mb-4 w-full h-auto rounded-lg cursor-pointer"
            />
            <p className="text-white text-justify mb-4">
              “Eu já tive outros cachorros, já perdi outros cachorros. E eu sei
              que ter essa segurança e a certeza que ele está bem cuidado não
              tem preço. Eu acho que me ajuda a dar muito mais segurança,
              qualquer problema, por mais que eu saiba que não é de fato uma
              doença ou algo muito sério, a gente já leva e já consulta e dá o
              melhor tratamento possível.“
            </p>
            <p className="font-bold text-white">
              Fernanda, mãe da Castanha e da Frida
            </p>
          </div>
          {/* Modal Video 1*/}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="relative  p-4 rounded-lg shadow-lg">
                <iframe
                  className="mx-auto max-w-26 sm:w-[540px] h-[340px] sm:h-[340px]"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-0 right-0  bg-red-600 text-white p-2 text-3xl rounded-[100%]  cursor-pointer"
                  style={{ lineHeight: "0.7" }} // Ajuste para centralizar o texto dentro do círculo
                >
                  &times; {/* Símbolo de fechar */}
                </button>
              </div>
            </div>
          )}

          {/* Segunda Coluna */}
          <div className="md:w-1/2">
            <img
              onClick={() => setModalTwoOpen(true)}
              src={
                imageManagerSeguroPet.TestimonialVideos.imageTestimonialRossana
              }
              alt="Imagem de uma mulher com um cachorro no colo com o título: “Conheça a historia de Rossana e Chanel”"
              className="mb-4 w-full h-auto rounded-lg cursor-pointer"
            />
            <p className="text-white text-justify mb-4">
              “Hoje eu sinto que eles tem mais segurança. E eu também me sinto
              mais segura com o plano de saúde. Eu acho que assim como eu tenho
              pra minha filha, tudo. eu acho que para eles é fundamental. Esse
              plano da forma como ele se configurou, sabe? Acho maravilhoso. O
              atendimento, os profissionais, então a gente consegue
              diversificar, ser atendido rápido, as carências são poucas, eu
              achei fantástico. E hoje eu não ficaria sem. Antes, por mais que a
              gente tivesse apego com os bichinhos, a gente avaliava muito a
              necessidade de ir de imediato, pelo custo que a gente sempre soube
              que era muito alto.”
            </p>
            <p className="font-bold text-white">Rossana, mãe da Chanel</p>
          </div>
        </div>
        {/* Modal Video 2 */}
        {isModalTwoOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative  p-4 rounded-lg shadow-lg">
              <iframe
                className="mx-auto max-w-26 sm:w-[540px] h-[340px] sm:h-[340px]"
                src={`https://www.youtube.com/embed/${youtubeVideoId2}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setModalTwoOpen(false)}
                className="absolute top-0 right-0  bg-red-600 text-white p-2 text-3xl rounded-[100%]  cursor-pointer"
                style={{ lineHeight: "0.7" }} // Ajuste para centralizar o texto dentro do círculo
              >
                &times; {/* Símbolo de fechar */}
              </button>
            </div>
          </div>
        )}
        <div className="text-center mt-8">
          <button
            onClick={() => openModal(2)}
            className="bg-white font-bold text-grayPrime w-90 px-20 py-4 rounded-lg text-2xl mt-7 "
          >
            Aproveitar Vantagens
          </button>
        </div>
      </div>
    </section>
  );
}
