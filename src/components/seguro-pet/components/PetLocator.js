import imageManagerSeguroPet from "../bancodeimagens/BancoDeImagensSeguroPet";

export default function PetLocator() {
  return (
    <section
      id="ganhe-o-localizador-pet "
      className="py-9 bg-bluePrime font-montserrat"
    >
      <div className="container w-full mx-auto flex flex-col items-center">
        <h2 className="text-center text-white font-bold mb-5 text-3xl sm:text-5xl px-3">
          Nada de fujões, ganhe o Localizador Pet
        </h2>
        <p className="sm:mb-8 text-white">
          Sabemos o quanto o seu pet é importante para você, e não quer nem
          pensar nele se perdendo, né? Vamos te dar um presente que vai trazer
          mais tranquilidade.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-10 sm:p-0">
          <ul className="flex flex-col sm:flex-row gap-4 sm:gap-x-12 xl:ml-20">
            {/* Repetição dos itens */}
            <li className="flex flex-col items-center">
              <img
                src={imageManagerSeguroPet.PetLocator.IconPetTag}
                alt="tag com logo da petlove"
                className="w-[85px] h-[85px]"
              />
              <h3 className="font-bold my-3 text-white">Para que serve?</h3>
              <p className="text-white text-justify">
                Para manter seus dados sempre com seu pet! Caso ele se perca,
                quem encontrá-lo pode apontar a câmera do celular e ler o
                código.
              </p>
            </li>
            {/* Repita para outros itens */}
            <li className="flex flex-col items-center">
              <img
                src={imageManagerSeguroPet.PetLocator.IconPinOrange}
                alt="tag com logo da petlove"
                className="w-26 h-15"
              />
              <h3 className="font-bold my-3 text-white">Pets localizados</h3>
              <p className="text-white text-justify">
                Ao ler o código do localizador, é exibido um perfil com os seus
                dados para contato e você recebe a localização do seu peludinho.
              </p>
            </li>
            <li className="flex flex-col items-center">
              <img
                src={imageManagerSeguroPet.PetLocator.IconHomeTag}
                alt="tag com logo da petlove"
                className="w-26 h-15"
              />
              <h3 className="font-bold my-3 text-white">Seu pet em casa</h3>
              <p className="text-white text-justify">
                Uma maneira moderna e rápida de deixar seu melhor amigo sempre
                protegido. A segurança que você e seu pet precisam.
              </p>
            </li>
            {/* Repita para outros itens */}
          </ul>
          <img
            src={imageManagerSeguroPet.PetLocator.IconMedalTag}
            alt="Medalha de identificação do pet"
            className="w-64 h-77 xl:mr-20"
          />
        </div>
        {/*<button className="mt-8 bg-white text-primary py-2 px-4 rounded">
          Ganhar o Localizador
           </button>*/}
      </div>
    </section>
  );
}
