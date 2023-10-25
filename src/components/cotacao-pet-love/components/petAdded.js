import React, { useState, useEffect } from "react";
import iconPlus from "../../../assets/svg/plus.svg";
import { ReactComponent as IconElipse } from "../../../assets/svg/blueElipse.svg";
import LayoutCotacaoPlanos from "./layoutCotacaoPlanos";

export default function PetAdded({ pets, onAddAnotherPet, onEditPet, onRemovePet, nextStep }) {
  const [errorList, setErrorList] = useState([]);

  const handleContinue = () => {
    //console.log(pets);
    
    var valid = true;
    var errors = [];

    if (!Array.isArray(pets)){ 
      return;
    }

    if (pets.length < 1){ 
      return;
    }

    for(let i in pets){
      let errorArray = [];
      let pet = pets[i] || {};

      errors[i] = null;

      if (!pet.name){ errorArray.push('pet-name'); }

      if (!pet.plan){ pet.plan = {}; }

      if (!pet.plan.price){ errorArray.push('plan-price'); }

      if (!pet.plan.title){ errorArray.push('plan-title'); }

      if (!/^[0-9]{1,}$/.test(pet.plan.id)){ errorArray.push('plan-id'); }

      if (errorArray.length > 0){ 
        errors[i] = errorArray; 
        valid = false;
      }
    }

    if (valid){
      nextStep(2);
      return;
    }

    setErrorList(errors);  
  }

  useEffect(()=>{
    if (Array.isArray(pets)){
      var errors = [];

      for(let i in pets){
        let errorArray = [];
        let pet = pets[i] || {};
  
        errors[i] = null;
  
        if (!pet.name){ errorArray.push('pet-name'); }
  
        if (!pet.plan){ pet.plan = {}; }
  
        if (!pet.plan.price){ errorArray.push('plan-price'); }
  
        if (!pet.plan.title){ errorArray.push('plan-title'); }
  
        if (!/^[0-9]{1,}$/.test(pet.plan.id)){ errorArray.push('plan-id'); }
  
        if (errorArray.length > 0){ errors[i] = errorArray; }
      }

      setErrorList(errors);
    }
    
  }, []);

  return (
    <div>
      <div className="pb-6">
        <LayoutCotacaoPlanos title="Adicione Mais Pets ou Continue." position={0}/>
      </div>
      {/*<div className="text-center text-grayPrime sm:text-5xl text-lg font-extrabold font-montserrat mx-10">
        Adicione Mais Pets ou Continue.
      </div>*/}
      {pets.map((pet, index) => {
        let error = errorList[index] || null;
        //console.log('pet:', error);
        return(
          <div
            key={index}
            className={`w-96 h-20 rounded-2xl shadow border flex justify-between items-center mx-auto my-4 p-4 ${(error) ? "border-alertRed" : "border-bluePrime"}`}
          >
            <div className="flex flex-col justify-center">
              <div className={`w-30 text-left text-xl font-bold mr-10 ${(error && error.length > 0) ? "text-alertRed" : "text-grayPrime"}`}>
                {pet.name} <span className={`mt-auto text-green-600 text-base ${(index == 0) ? "hidden" : ""}`}>(-{(index < 3) ? index * 10 : 30 }%)</span>
              </div>             
              <div className="flex items-center space-x-2">
                <div className={`w-30 h-7 text-lg font-semibold ${(error && error.includes('plan-title')) ? "text-alertRed" : "text-grayPrime"}`}>
                  {pet.plan.title}
                </div>
                <div className={`w-30 h-7 text-center text-md font-bold flex ${(error && error.includes('plan-price')) ? "text-alertRed" : "text-bluePrime"}`}>
                  <span className="mt-auto">R$ {pet.plan.price}</span>
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
        )}      
      )}
      <div className={`w-96 h-7 text-center text-grayPrime text-lg font-semibold mx-auto ${(pets.length < 1) ? 'hidden' : ''}`}>
        Ganhe <span className="text-bluePrime font-bold">{(pets.length < 3) ? pets.length * 10 : 30}%</span> de desconto
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
        <div 
          className="h-14 w-3/5 bg-cyan-500 hover:bg-bluePrime2 rounded-2xl shadow  mx-auto mt-5 text-white flex items-center justify-center cursor-pointer"
          onClick={handleContinue}
        >
          <span className="font-bold">Continuar Compra</span>
        </div>
      </div>
    </div>
  );
}
