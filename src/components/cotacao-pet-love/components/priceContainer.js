import React, { useState } from "react";
import PlansLayoutCarrousel from "./plansLayoutCarrousel";
import PetAdded from "./petAdded";
import ModalRemoverPet from "./modalRemoverPet";

const PriceContainer = () => {
  const [petAdded, setPetAdded] = useState(false);
  const [pets, setPets] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [removingIndex, setRemovingIndex] = useState(null);

  const addPet = (details) => {
    console.log("adicionando pet...");

    if (editingIndex !== null) {
      // Estamos no modo de edição
      const updatedPets = [...pets];
      updatedPets[editingIndex] = details;
      setPets(updatedPets);
      setEditingIndex(null); // Reset the editing index
    } else {
      // Estamos no modo de adição
      setPets([...pets, details]);
    }

    setPetAdded(true);
  };

  const openRemovePet = (index) => {
    console.log(`abrindo modal para remover pet ${index}...`);
    setRemovingIndex(index);
  }

  const removePet = (index) => {
    console.log(`removendo pet ${index}...`);
    
    setRemovingIndex(null);

    if (editingIndex !== null) { return; } //Para função em caso de edição do pet
    
    var arrayPets = [...pets];
    arrayPets.splice(index, 1); // Remove 1 elemento da Array apartir do index    

    setPets([...arrayPets]); 
  };

  const addAnotherPet = () => {
    setPetAdded(false);
    setEditingIndex(null); // Reset the editing index
  };

  const handleEditPet = (index) => {
    setEditingIndex(index);
    setPetAdded(false); // Voltar ao modo de edição
  };

  return (
    <div>
      <ModalRemoverPet  
        pets={pets}
        index={removingIndex}
        onRemovePet={removePet}
        cancelRemovePet={()=>{ setRemovingIndex(null) }}
      />
      {petAdded ? (
        <PetAdded
          pets={pets}
          onAddAnotherPet={addAnotherPet}
          onEditPet={handleEditPet}
          onRemovePet={openRemovePet}
        />
      ) : (
        <PlansLayoutCarrousel
          onPetAdded={addPet}
          pets={pets}
          setPets={setPets}
          editingIndex={editingIndex} // Passar o índice de edição para o componente filho
        />
      )}      
    </div>
  );
};

export default PriceContainer;
