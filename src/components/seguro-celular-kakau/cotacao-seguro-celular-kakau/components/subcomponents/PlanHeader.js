import React, { useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";

export default function PlanHeader() {
  const [userData, setUserData] = useState(() => {
    // Tenta recuperar 'formData' do sessionStorage
    const savedFormData = sessionStorage.getItem("formData");
    let initialUserData = {
      amount: "",
      price: "",
    };

    console.log("Saved Form Data:", savedFormData);

    // Puxas as infos do localstorage
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      console.log("Parsed Form Data:", formData);

      const { amount } = formData.selectedPlan || {};
      console.log("Selected Plan Amount:", amount);

      initialUserData = {
        ...initialUserData,
        price: amount || initialUserData.price, // Correção: price recebe amount
      };
    }

    console.log("Initial User Data:", initialUserData);
    return initialUserData;
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/seguro-bike/cotacao/");
  };

  return (
    <div className="border border-bluePrime mx-auto rounded-md mt-3 bg-bluePrime text-white sticky top-0 left-0  z-[1000]">
      <div className="p-2">
        <h3 className="text-sm">
          Plano escolhido:{" "}
          <span className="font-bold text-sm">{userData.value}.</span>
          <button onClick={handleNavigate}>
            <span className="font-bold text-white">
              {" "}
              Deseja mudar de plano?
            </span>
          </button>
        </h3>
      </div>
      <div>
        <div className="flex justify-between sm:justify-center sm:space-x-4 align-middle items-center mx-2">
          <h2>Valor do Seguro:</h2>
          <h3>
            <span className="text-[14px]">R$</span>
            <span className="text-[30px] font-bold text-white">
              {userData.price}
            </span>
            <span className="text-[14px]">/mês</span>
          </h3>
        </div>
      </div>
    </div>
  );
}
