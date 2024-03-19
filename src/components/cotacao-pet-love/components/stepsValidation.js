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
    
        if (!globalFunctions.validateName(data.name || '') || !globalFunctions.validateEmail(data.email || '')){
            return false;
        }
    
        return true;
    }


}

export default PetStepValidation;