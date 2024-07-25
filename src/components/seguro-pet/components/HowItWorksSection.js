import { useState } from "react";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function HowItWorksSection() {
  //Estado Modal
  const [isModalOpen, setModalOpen] = useState(false);

  const youtubeVideoId = "cFqYPtVibwo";

  return (
    <section id="como-funciona" className="bg-neutral-light py-9 ">
      <div className="container mx-auto px-4">
        <h2
          id="como-funciona-na-pratica"
          className="text-center text-primary font-bold w-full text-5xl my-5 text-grayPrime"
        >
          Como funcionam nossos planos?
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-5 sm:p-10">
        {/* Área do vídeo */}
        <div
          className="w-full sm:w-1/2 max-w-md cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={imageManagerSeguroPet.HowItWorksSection.howItWorks}
            alt="Imagem de uma veterinária..."
            className="w-full"
          />
        </div>
        {/* Modal Video */}
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
        <div className="flex flex-col items-center sm:w-1/2">
          {/* Itens */}
          <div className="mb-8 flex items-start">
            <img
              src={imageManagerSeguroPet.HowItWorksSection.iconPhone}
              alt="..."
              className="w-16 h-16"
            />
            <div className="ml-3">
              <h3 className="text-primary font-bold text-start text-xl text-bluePrime">
                1. Tudo online
              </h3>
              <p className="mt-3 text-neutral-darkest text-start text-md">
                A contratação do plano é feita diretamente pelo site, de onde
                você estiver. É simples, prático e totalmente seguro.
              </p>
            </div>
          </div>
          {/* Repita para os outros itens */}
          <div className="mb-8 flex items-start">
            <img
              src={imageManagerSeguroPet.HowItWorksSection.iconMail}
              alt="..."
              className="w-16 h-16"
            />
            <div className="ml-3">
              <h3 className="text-primary font-bold text-start text-xl text-bluePrime">
                2. Tenha acesso a todas informações
              </h3>
              <p className="mt-3 text-neutral-darkest text-start text-md">
                Após a contratação, você receberá um e-mail com a cópia do seu
                contrato e as instruções de acesso ao Espaço do Cliente. É
                através dele que você acompanha todas as informações do plano do
                seu pet e os serviços da Petlove.
              </p>
            </div>
          </div>
          {/* Repita para os outros itens */}
          <div className="mb-8 flex items-start">
            <img
              src={imageManagerSeguroPet.HowItWorksSection.iconChip}
              alt="..."
              className="w-16 h-16"
            />
            <div className="ml-3">
              <h3 className="text-primary font-bold text-start text-xl text-bluePrime">
                3. Faça a microchipagem
              </h3>
              <p className="mt-3 text-neutral-darkest text-start text-md">
                Chegou a hora de levar seu amigo para microchipar,
                gratuitamente! Você escolhe a clínica e faz o agendamento. As
                carências do plano começam a contar após a realização da
                microchipagem.
              </p>
            </div>
          </div>
          {/* Repita para os outros itens */}
          <div className="mb-8 flex items-start">
            <img
              src={imageManagerSeguroPet.HowItWorksSection.iconLady}
              alt="..."
              className="w-16 h-16"
            />
            <div className="ml-3">
              <h3 className="text-primary font-bold text-start text-xl text-bluePrime">
                4. Proteção sem burocracia
              </h3>
              <p className="mt-3 text-neutral-darkest text-start text-md">
                Para usar o plano não é preciso levar nenhum documento! É a
                partir do número do microchip que a clínica irá acessar todo o
                histórico de vida do seu pet e você só precisa pagar a
                coparticipação ao final do atendimento
              </p>
            </div>
          </div>
          {/* Repita para os outros itens */}
        </div>
      </div>
      <div>
        {/* Botão final */}
        <a href="/contrate?from=howItWorks" className="text-center">
          <button className="bg-primary text-white py-2 px-4 rounded">
            Fazer agora!
          </button>
        </a>
      </div>
    </section>
  );
}
