import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlanHeader from "./PlanHeader";
import HeaderCotacao from "./HeaderCotacao";
import "animate.css"; // Certifique-se de importar o animate.css

const LayoutCotacaoPlanos = ({ title, position, userData, couponData }) => {
  const location = useLocation();
  const [showPlanHeader, setShowPlanHeader] = useState(false);
  const [animateOnce, setAnimateOnce] = useState(false);
  const [logoSide, setLogoSide] = useState(0);

  useEffect(() => {
    // Verifica se a animação já foi realizada
    const animationDone = sessionStorage.getItem("animationDone");

    if (!animationDone) {
      sessionStorage.setItem("animationDone", true);
      setAnimateOnce(true);
    }

    const allowedRoutes = [
      "/seguro-celular-kakau/cotacao/dados-cadastrais/",
      "/seguro-celular-kakau/cotacao/dados-cadastrais",
      "/seguro-celular-kakau/cotacao/endereco/",
      "/seguro-celular-kakau/cotacao/endereco",
      "/seguro-celular-kakau/cotacao/cadastro-celular/",
      "/seguro-celular-kakau/cotacao/cadastro-celular",
      "/seguro-celular-kakau/cotacao/pagamento/",
      "/seguro-celular-kakau/cotacao/pagamento",
    ];

    if (location.pathname.includes("pagamento") || location.pathname.includes("cadastro-celular") || location.pathname.includes("dados-cadastrais") || location.pathname.includes("endereco")) setLogoSide(1);
      else setLogoSide(0);

    const shouldShowPlanHeader = allowedRoutes.some((route) => location.pathname.startsWith(route) );
    setShowPlanHeader(shouldShowPlanHeader);
  }, [location]);

  return (
    <div
      className={`relative text-md w-full h-full max-w-screen-lg mx-auto mt-5 ${
        animateOnce ? "animate__animated animate__fadeIn" : ""
      }`}
    > 
      <div className={`w-fit h-fit mx-auto mb-6 realtive md:absolute md:mt-[12px] top-0 bottom-0 ${logoSide ? 'right-[15px]' : 'left-[15px]'}`}>
        <div className="font-bold text-[10px] mb-[2px] text-left cursor-default">
          Protegido por:
        </div>
        <img 
          src="https://storage.googleapis.com/primesecure/logo-kakau.svg" 
          alt="Logo Kakau" 
          className={`w-[140px] md:w-[140px]`} 
        /> 
      </div>  

      <HeaderCotacao title={title} position={position} userData={userData} />
      
      {showPlanHeader && <PlanHeader couponData={couponData} />}
    </div>
  );
};

export default LayoutCotacaoPlanos;
