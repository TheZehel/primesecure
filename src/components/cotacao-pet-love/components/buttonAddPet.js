export default function ButtonAddPet({ onPetAdded }) {
  const handleClick = () => {
    console.log("Botão Adicionar Pet foi pressionado.");
    if (onPetAdded) {
      onPetAdded();
    } else {
      console.log("Função onAddPet não foi fornecida.");
    }
  };

  return (
    <div className="p-6 flex flex-shrink-0 justify-end items-end">
      <button
        className="w-[275px] p-3 bg-bluePrime hover:bg-bluePrime2 text-white rounded-2xl"
        onClick={handleClick}
      >
        Adicionar Pet
      </button>
    </div>
  );
}
