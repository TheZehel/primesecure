import { useState } from "react";
import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function CoParticipation() {
  //Estado Modal
  const [isModalOpen, setModalOpen] = useState(false);

  const youtubeVideoId = "bnMbEyFMn1A";

  return (
    <section
      id="como-funciona"
      className="bg-neutral-light py-9 font-montserrat "
    >
      <div className="container mx-auto px-4">
        <h2
          id="como-funciona-na-pratica"
          className="text-center text-primary font-bold w-full text-5xl my-5 text-grayPrime"
        >
          Coparticipação: por que ela te faz economizar?
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-5 sm:p-10">
        {/* Área do vídeo */}
        <div
          className="w-full sm:w-1/2 max-w-md cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={imageManagerSeguroPet.coParticipation.imgCoParticipation}
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
            <div className="ml-3">
              <h3 className="text-primary font-bold text-start text-3xl text-bluePrime">
                Mensalidade mais barata
              </h3>
              <p className="mt-3 text-neutral-darkest  text-lg text-justify">
                A coparticipação é o que ajuda a mensalidade do plano ser mais
                em conta. Assim você não paga mais caro pela mesma cobertura
                todos os meses, e sim só um pequeno valor na hora que precisar
                usar algum procedimento.
              </p>
            </div>
          </div>
          {/* Repita para os outros itens */}
          <div className="mb-8 flex items-start">
            <div className="ml-3">
              <h3 className="text-primary font-bold text-start text-3xl text-bluePrime">
                Muito mais economia
              </h3>
              <p className="mt-3 text-neutral-darkest text-justify text-lg">
                Os valores da coparticipação são preços fixos tabelados que não
                chegam nem perto do que você pagaria no particular. E você pode
                consultar os valores a qualquer momento!
              </p>
            </div>
          </div>
          {/* Repita para os outros itens */}
          <div className="mb-8 flex items-start">
            <div className="ml-3">
              <h3 className="text-primary font-bold text-start text-3xl text-bluePrime">
                Plano mais completo
              </h3>
              <p className="mt-3 text-neutral-darkest text-justify text-lg">
                Planos coparticipativos possuem mais procedimentos e mais
                limites. Ou seja, seu melhor amigo vai ficar ainda mais
                protegido dessa forma!
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
