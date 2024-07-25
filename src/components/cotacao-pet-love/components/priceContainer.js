import React, { useState, useEffect } from "react";
import PlansLayoutCarrousel from "./plansLayoutCarrousel";
import PetAdded from "./petAdded";
import ModalRemoverPet from "./modalPetRemove";

const PriceContainer = ({ submitForm, reload }) => {
  const [petAdded, setPetAdded] = useState(false);
  const [pets, setPets] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [removingIndex, setRemovingIndex] = useState(null);

  const addPet = (details) => {
    //console.log("adicionando pet...", details);

    if (editingIndex !== null) {
      // Estamos no modo de edição
      var updatedPets = [...pets];
      updatedPets[editingIndex] = details;

      updatedPets = updatedPets.sort((a, b) => {
        let price = [
          a.plan.price.replace(/[^0-9]/g, ""),
          b.plan.price.replace(/[^0-9]/g, ""),
        ];

        price[0] = parseInt(price[0]);
        price[1] = parseInt(price[1]);

        if (price[0] > price[1]) {
          return 1;
        }

        if (price[0] < price[1]) {
          return -1;
        }

        return 0;
      });

      console.log('updatedPets', updatedPets)

      let formPet = sessionStorage.getItem("formPetData");
      try {
        formPet = JSON.parse(formPet);
      } catch (error) {} //Evita erros caso formPet não seja um JSON válido

      formPet = formPet || {};
      formPet.petList = updatedPets;

      sessionStorage.setItem("formPetData", JSON.stringify(formPet));

      setPets(updatedPets);
      setEditingIndex(null); // Reset the editing index
    } else {
      // Estamos no modo de adição
      var updatedPets = [...pets, details];

      let formPet = sessionStorage.getItem("formPetData");
      try {
        formPet = JSON.parse(formPet);
      } catch (error) {}

      updatedPets = updatedPets.sort((a, b) => {
        let price = [
          a.plan.price.replace(/[^0-9]/g, ""),
          b.plan.price.replace(/[^0-9]/g, ""),
        ];

        price[0] = parseInt(price[0]);
        price[1] = parseInt(price[1]);

        if (price[0] > price[1]) {
          return 1;
        }

        if (price[0] < price[1]) {
          return -1;
        }

        return 0;
      });

      formPet = formPet || {};
      formPet.petList = updatedPets;

      sessionStorage.setItem("formPetData", JSON.stringify(formPet));
      setPets(updatedPets);
    }

    setPetAdded(true);
  };

  const openRemovePet = (index) => {
    //console.log(`abrindo modal para remover pet ${index}...`);
    setRemovingIndex(index);
  };

  const removePet = (index) => {
    //console.log(`removendo pet ${index}...`);

    setRemovingIndex(null);

    if (editingIndex !== null) {
      return;
    } //Para função em caso de edição do pet

    var arrayPets = [...pets];
    arrayPets.splice(index, 1); // Remove 1 elemento da Array apartir do index

    var formPet = sessionStorage.getItem("formPetData");
    try {
      formPet = JSON.parse(formPet);
    } catch (error) {
      formPet = null;
    }

    formPet = formPet || {};
    formPet.petList = [...arrayPets];

    sessionStorage.setItem("formPetData", JSON.stringify(formPet));
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

  const handleCancel = () => {
    setPetAdded(true);
    setEditingIndex(null);
  };

  useEffect(() => {
    // Recupera dados da sessão
    var formPet = sessionStorage.getItem("formPetData");
    try {
      formPet = JSON.parse(formPet);
    } catch (error) {
      formPet = null;
    }

    formPet = formPet || { petList: [] }; //sessionStorage.getItem("formPetData");

    var petArray = formPet.petList;

    if (petArray) {
      // Validação dos dados retornados
      if (Array.isArray(petArray)) {
        var petData = [];

        for (let i in petArray) {
          let pet = petArray[i] || {};

          if (!pet.name || !pet.plan) {
            continue;
          }

          if (!pet.plan.price || !pet.plan.title) {
            continue;
          }

          if (!/^[0-9]{1,}$/.test(pet.plan.id)) {
            continue;
          }

          petData.push(pet);
        }

        let sortedPets = petData.sort((a, b) => {
          let price = [
            a.plan.price.replace(/[^0-9]/g, ""),
            b.plan.price.replace(/[^0-9]/g, ""),
          ];
  
          price[0] = parseInt(price[0]);
          price[1] = parseInt(price[1]);
  
          if (price[0] > price[1]) {
            return 1;
          }
  
          if (price[0] < price[1]) {
            return -1;
          }
  
          return 0;
        });

        petData = [...sortedPets];

        if (petData.length > 0) {
          setPets(petData);
          setPetAdded(true);
        }
      }
    }
  }, [reload]);

  return (
    <div>
      <ModalRemoverPet
        pets={pets}
        index={removingIndex}
        onRemovePet={removePet}
        cancelRemovePet={() => {
          setRemovingIndex(null);
        }}
      />
      {petAdded ? (
        <PetAdded
          pets={pets}
          nextStep={(step) => {
            submitForm(step, pets);
          }}
          onAddAnotherPet={addAnotherPet}
          onEditPet={handleEditPet}
          onRemovePet={openRemovePet}
        />
      ) : (
        <PlansLayoutCarrousel
          onPetAdded={addPet}
          pets={pets}
          setPets={setPets}
          cancel={handleCancel}
          editingIndex={editingIndex} // Passar o índice de edição para o componente filho
          reload={reload}
        />
      )}
    </div>
  );
};

export default PriceContainer;
