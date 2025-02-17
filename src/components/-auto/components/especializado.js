import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function ServicoEspecializado() {
  return (
    <section
      id="atendimento-especializado-auto"
      className="bg-neutral-light py-9"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl sm:text-5xl text-primary font-bold mb-12 text-grayPrime">
          Conte com atendimento especializado para seu carro
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-5 sm:p-2">
          {/* Coluna para listas */}
          <div className="flex flex-col items-center sm:w-1/2 xl:p-20">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-bluePrime"
              />
              <p className="text-lg font-normal text-grayPrime text-justify py-4">
                Atendemos você pelo canal de sua preferência. Seja WhatsApp,
                e-mail ou telefone, estamos prontos para oferecer o melhor
                atendimento para seu veículo.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-bluePrime"
              />
              <p className="text-lg font-normal text-grayPrime text-justify py-4">
                Soluções sob medida: informe-nos sobre as características do seu
                carro e suas necessidades, e indicaremos as melhores opções de
                seguros e serviços por meio da nossa rede credenciada.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary w-6 h-6 text-bluePrime"
              />
              <p className="text-lg font-normal text-grayPrime text-justify py-4">
                Mais que um atendimento, uma consultoria especializada para
                garantir a proteção ideal do seu veículo.
              </p>
            </div>
          </div>

          {/* Coluna para a imagem */}
          <div className="w-full sm:w-1/2 max-w-md mt-8 sm:mt-0">
            <img
              src={
                'https://storage.googleapis.com/primesecure/seguro-auto/atendimento2.png'
              }
              alt="Imagem de um carro moderno e protegido"
              className="w-[90%] h-auto"
            />
          </div>
        </div>
        {/*
        <div>
          <button
            onClick={() => openModal(2)}
            className="bg-bluePrime font-bold text-white w-90 px-20 py-4 rounded-lg text-2xl mt-7"
          >
            Ganhar Microchipagem
          </button>
        </div>
        */}
      </div>
    </section>
  );
}
