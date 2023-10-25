import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";

const globalFunctions = new GlobalFuntions();

class PetStepValidation extends Object {
    constructor(props){ 
        super(props);
    }

    firstStepValidation(pets) {
        if (!Array.isArray(pets) || pets.length < 1){
            return [];
        }
    
        let petArray = [];
    
        for(let i in pets){
            let pet = pets[i] || {};
    
            if (!pet.name || !pet.plan){ continue; }
    
            if (!pet.plan.price || !pet.plan.title){ continue; }
    
            if (!/^[0-9]{1,}$/.test(pet.plan.id)){ continue; }
    
            petArray.push(pet); 
        }
    
        if (petArray.length < 1){
            return [];
        }
    
        return petArray;
    }

    secondStepValidation(data) {
        if (!data.name || !data.email || !data.phone || !data.check){
            return false;
        }
    
        if (!globalFunctions.validateName(data.name || '') || !globalFunctions.validateEmail(data.email || '') || !globalFunctions._validatePhone(data.phone || '')){
            return false;
        }
    
        return true;
    }


}

export default PetStepValidation;