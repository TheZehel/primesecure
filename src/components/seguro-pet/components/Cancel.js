import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function Cancel() {
  return (
    <section
      id="ganhe-a-microchipagem"
      className="bg-neutral-light py-9 bg-bluePrime"
    >
      <div className="container mx-auto px-4 ">
        <h2 className="text-center text-3xl sm:text-5xl text-primary font-bold mb-2 text-white">
          Sem compromisso, cancele quando quiser
        </h2>
        <p className="text-center text-lg sm:text-xl  mb-12 text-white">
          Fique o tempo que achar necessário, queremos que faça parte da nossa
          família porque é o melhor para o seu pet e para o seu planejamento
          financeiro. Fique por amor, e não por contrato.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-5 sm:p-2 ">
          {/* Coluna para listas */}
          <div className="flex flex-col items-start sm:w-2/3 xl:p-20">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-white"
              />
              <p className="text-lg font-normal text-white text-justify py-4">
                Atendimento direcionado de nossa equipe para os melhores
                veterinários conforme suas necessidades.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-white"
              />
              <p className="text-lg text-start font-normal text-white  py-4">
                Temos mais de 96% de avaliação positiva nos atendimentos
                realizados.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-white"
              />
              <p className="text-lg font-normal text-white text-justify py-4">
                Economize até 80% com gastos veterinários.
              </p>
            </div>
          </div>

          {/* Coluna para a imagem */}
          <div className="flex justify-center">
            <img
              src={imageManagerSeguroPet.Cancel.warrantySeal}
              alt="imagem de um gatinho com microchip implantado"
              className="w-[200px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
