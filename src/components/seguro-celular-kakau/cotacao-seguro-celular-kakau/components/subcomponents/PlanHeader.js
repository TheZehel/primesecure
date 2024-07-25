import React, { useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import ProgressManager from "../modules/progress";
import GlobalFuntions from "../../../../globalsubcomponentes/globalFunctions";

const progress = new ProgressManager();
const functions = new GlobalFuntions();

export default function PlanHeader({couponData}) {
  const [userData, setUserData] = useState(() => {
    // Tenta recuperar 'formData' do sessionStorage
    const savedFormData = sessionStorage.getItem("phoneFormData");
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

  const [coupon, setCoupon] = useState(couponData);
  const [displayPrice, setDisplayPrice] = useState(userData.price);

  useEffect(() => { 
    setCoupon(couponData); 
    console.log(couponData); 

    var params = functions.getParamsFromUrl();
    const isValid = couponData && couponData.code && couponData.code.length > 0 && (couponData.active || couponData.valid);

    if (isValid) params = { ...params, cupom: couponData.code };      
    if (!isValid) delete params.cupom;

    functions.updateUrlFromObj(params);

    if (coupon && coupon.value) {
      let price = userData.price;

      if (coupon.type == "percentage") price = price - (price * coupon.value / 100);
      if (coupon.type == "fixed") price = price - coupon.value;
  
      price = price.toFixed(2);
      setDisplayPrice(price);
    }
  }, [couponData, userData.price]);

  const navigate = useNavigate();

  const handleNavigate = async () => {
    await progress.navigateTo(1, "/seguro-celular-kakau/cotacao/", navigate);
    //navigate("/seguro-celular-kakau/cotacao/");
  };

  if (coupon && !coupon.value) setCoupon(false);

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
          <h2 className={`${!coupon ? '' : 'hidden'}`}>Valor do Seguro:</h2>
          <h2 className={`${coupon ? 'font-semibold pb-[1px]' : 'hidden'}`}>Por Apenas:</h2>
          <h3 className={`${!coupon ? '' : 'hidden'}`}>
            <span className="text-[14px]">R$</span>
            <span className="text-[30px] font-bold text-white">
              {displayPrice}
            </span>
            <span className="text-[14px]">/mês</span>
          </h3>
          <div className={coupon ? 'relative pb-[14px]' : 'hidden'}>
            <h3 className="">
              <span className="text-[14px]">R$</span>
              <span className="text-[30px] font-bold text-white">
                {displayPrice}
              </span>
              <span className="text-[14px]">/mês</span>
            </h3>
            <div className="w-full text-white text-[12px] font-semibold absolute bottom-[3px] mx-auto">Cupom Aplicado!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
