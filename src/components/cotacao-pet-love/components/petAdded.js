import iconPlus from "../../../assets/svg/plus.svg";
import { ReactComponent as IconElipse } from "../../../assets/svg/blueElipse.svg";

export default function PetAdded({ pets, onAddAnotherPet, onEditPet, onRemovePet }) {
  return (
    <div>
      <div className="text-center text-grayPrime sm:text-5xl text-lg font-extrabold font-montserrat mx-10">
        Adicione Mais Pets ou Continue.
      </div>
      {pets.map((pet, index) => (
        <div
          key={index}
          className="w-96 h-20 rounded-2xl shadow border border-bluePrime flex justify-between items-center mx-auto my-4 p-4"
        >
          <div className="flex flex-col justify-center">
            <div className="w-30 text-center text-grayPrime text-2xl font-bold mr-10">
              {pet.name}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-30 h-7 text-grayPrime text-lg font-normal">
                {pet.plan.title}
              </div>
              <div className="w-30 h-7 text-center text-bluePrime text-md font-bold">
                {pet.plan.price}
              </div>
            </div>
          </div>
          <div className="block w-fit space-y-2 text-right">
            <div className="cursor-pointer font-semibold text-sm hover:text-bluePrime2" onClick={() => onEditPet(index)}>
              Editar
            </div>
            <div className="cursor-pointer font-semibold text-sm hover:text-alertRed" onClick={() => onRemovePet(index)}>
              Remover
            </div>
          </div>
          {/*<div className="flex">
            <div className="items-center cursor-pointer hover:text-bluePrime2">
              <div className="m-auto flex flex-col space-y-2 w-fit hover:text-bluePrime2">
                <IconElipse />
                <IconElipse />
                <IconElipse />
              </div>
              <span className="font-semibold text-sm" onClick={() => onEditPet(index)}>
                Editar
              </span>
            </div>
            <div className="cursor-pointer hover:text-bluePrime2">
              <div className="m-auto flex flex-col space-y-2 w-fit hover:text-bluePrime2">
                <IconRemove />
              </div>
              <span className="mt-auto font-semibold text-sm" onClick={() => onRemovePet(index)}>
                Remover
              </span>
            </div>
          </div>*/}
          
        </div>
      ))}
      <div className="w-96 h-7 text-center text-grayPrime text-lg font-semibold mx-auto">
        Ganhe <span className="text-bluePrime font-bold">10%</span> de desconto
        no segundo pet
      </div>
      <div className="flex items-center space-x-4 ">
        <div className="w-80 h-10 bg-cyan-500 hover:bg-bluePrime2 rounded-2xl shadow  mx-auto mt-5 text-white flex items-center justify-center space-x-6 cursor-pointer">
          <span className="font-bold" onClick={onAddAnotherPet}>
            Adicionar Outro Pet
          </span>
          <img src={iconPlus} alt="Icone de adicionar" />
        </div>
      </div>
      <div className="flex items-center space-x-4 ">
        <div className="h-14 w-3/5 bg-cyan-500 hover:bg-bluePrime2 rounded-2xl shadow  mx-auto mt-5 text-white flex items-center justify-center cursor-pointer">
          <span className="font-bold">Continuar Compra</span>
        </div>
      </div>
    </div>
  );
}
