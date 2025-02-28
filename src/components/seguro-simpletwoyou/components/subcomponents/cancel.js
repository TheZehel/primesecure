import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function Cancel() {
  return (
    <section
      id="ganhe-a-microchipagem"
      className="bg-neutral-light py-9 bg-bluePrime"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl sm:text-5xl text-primary font-bold mb-6 text-white">
          Pacotes de assistências pensados para você e para o seu celular
        </h2>
        <div className="flex flex-col sm:flex-row items-start justify-center gap-8 p-5 sm:p-2">
          {/* Container para as duas listas lado a lado */}
          <div className="flex flex-col sm:flex-row w-full justify-center gap-8 sm:gap-16">
            {/* Primeira lista - Assistência Bike */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-primary w-6 h-6 text-white"
                />
                <p className="text-lg font-medium text-white">
                  Assistência Bike
                </p>
              </div>
              <ul className="ml-10 text-white">
                <li className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  Manutenção
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  Translado da bicicleta
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  Translado do ciclista
                </li>
              </ul>
            </div>

            {/* Segunda lista - Assistência Auto */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-primary w-6 h-6 text-white"
                />
                <p className="text-lg font-medium text-white">
                  Assistência Auto
                </p>
              </div>
              <ul className="ml-10 text-white">
                <li className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  Reboque
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  Socorro mecânico
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  Chaveiro
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
