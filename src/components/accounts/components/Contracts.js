import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Contracts() {
  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-grayPrime">
      <div className="sm:mx-auto sm:w-full sm:max-w-[650px]">
        <h2 className="mt-10 text-start text-2xl sm:text-3xl font-bold leading-9 tracking-tight text-grayPrime">
          Qual seguro você deseja ver?
        </h2>
        {/* Cards */}
        <div className="border-bluePrime border-[1px] rounded-md mt-5 flex justify-between items-center p-4">
          <div>
            <h3 className="text-start font-bold text-2xl">Nome do Seguro</h3>
            <p className="text-start mt-2 font-regular">Atributo</p>
          </div>
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className="text-3xl text-bluePrime hover:text-bluePrime2 cursor-pointer transition duration-300 ease-in-out hover:scale-110 transform"
          />
        </div>
      </div>
    </section>
  );
}
