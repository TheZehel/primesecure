import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";

const globalFunctions = new GlobalFuntions();

class PetStepValidation extends Object {
    constructor(props){ 
        super(props);
    }

    regionValidate(region){
        if (!region || !region.region || !region.ibge){
            return false;
        }

        if (!/^[0-9]{1,9}$/.test(region.ibge)){
            return false;
        }

        return true;
    }

    firstStepValidation(pets) {
        if (!Array.isArray(pets) || pets.length < 1){
            return [];
        }
    
        let petArray = [];
    
        for(let i in pets){
            let pet = pets[i] || {};
    
            if (!pet.name || !pet.plan){ 
                continue; 
            }
    
            if (!pet.plan.price || !pet.plan.title || !/^[0-9]{1,}$/.test(pet.plan.id)){ 
                continue; 
            }

            petArray.push(pet); 
        }
    
        if (petArray.length < 1){
            return [];
        }

        if (Array.isArray(petArray) && petArray.length > 0) {
            console.log('Validation:', petArray)

            let sortedPets = petArray.sort((a, b) => {
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

            console.log('Validation Out:', sortedPets)

            petArray = [...sortedPets];
        }
    
        return petArray;
    }

    secondStepValidation(data) {
        if (!data.name || !data.email || !data.phone || !data.check){
            return false;
        }

        let phoneValue = data.phone || '';
        phoneValue = phoneValue.toString().replace(/\D/g, '');

        if (phoneValue.length != 11){
            return false;
        }
    
        if (!globalFunctions.validateNameLastName(data.name || '') || !globalFunctions.validateEmail(data.email || '')){
            return false;
        }
    
        return true;
    }


}

export default PetStepValidation;