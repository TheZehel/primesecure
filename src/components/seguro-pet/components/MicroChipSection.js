import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function MicrochipSection({ openModalStep }) {
  const openModal = (step) => {
    openModalStep(step);
  };
  return (
    <section id="ganhe-a-microchipagem" className="bg-neutral-light py-9">
      <div className="container mx-auto px-4 ">
        <h2 className="text-center text-3xl sm:text-5xl text-primary font-bold mb-12 text-grayPrime">
          Carteirinha é coisa do passado, ganhe a microchipagem
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-5 sm:p-2 ">
          {/* Coluna para listas */}
          <div className="flex flex-col items-center sm:w-1/2 xl:p-20">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-bluePrime"
              />
              <p className="text-lg font-normal text-grayPrime text-justify py-4">
                Pet microchipado, é pet protegido. O microchip é uma forma
                moderna, eficaz e segura de identificar seu pet e ter o
                histórico dele.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-bluePrime"
              />
              <p className="text-lg font-normal text-grayPrime text-justify py-4">
                Caso ele se perca ou até mesmo seja roubado, pode ser
                identificado facilmente por meio do microchip.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-bluePrime"
              />
              <p className="text-lg font-normal text-grayPrime text-justify py-4">
                O microchip é do tamanho de um grão de arroz e sua aplicação é
                igual a de uma vacina, sem sedação ou anestesia. Bem seguro!
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-bluePrime"
              />
              <p className="text-lg font-normal text-grayPrime text-justify py-4">
                A microchipagem custa de R$ 150 a R$ 250, mas ao contratar o
                plano pro seu pet,{" "}
                <span className="text-bluePrime font-bold">
                  recebe a implantação de graça
                </span>
                .
              </p>
            </div>
          </div>

          {/* Coluna para a imagem */}
          <div className="w-full sm:w-1/2 max-w-md mt-8 sm:mt-0">
            <img
              src={imageManagerSeguroPet.MicroChipSection.iconChipPet}
              alt="imagem de um gatinho com microchip implantado"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => openModal(2)}
            className="bg-bluePrime font-bold text-white w-90 px-20 py-4 rounded-lg text-2xl mt-7 animate-pulse"
          >
            Ganhar Microchipagem
          </button>
        </div>
      </div>
    </section>
  );
}
