import React, { useState, iseEffect } from "react";
import axios from "axios";
import { useEffect } from "react";
import "animate.css";

const environment = process.env.REACT_APP_ENVIRONMENT;

export default function SuccessfullPage({token}) {
  const [saleDetails, setSaleDetails] = useState(null);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        console.log(token);

        var url = `http://localhost:3050/kakau-bike/process/get-sale-by-id/${(typeof token === 'string') ? token : '' }`;

        if (environment != "SANDBOX") url = `https://api-primesecure.onrender.com/kakau-bike/process/get-sale-by-id/${(typeof token === 'string') ? token : '' }`;
        
        await axios.get( url )
          .then((response)=>{
            let { data } = response;
            //let { apiResponse = {} } = data; 

            setSaleDetails(data);

            console.log("Detalhes da venda", data);
          })
          .catch((err)=>{
            let error = err;
            
            if (error && error.response) {
              error = error.response;
            }

            if (error && error.data) {
              error = error.data;
            }

            console.error(error);
          });        
        
      } catch (error) {
        console.error("Erro ao buscar os detalhes da venda", error);
      }
    };

    fetchSaleDetails(); 
  }, [token]);

  return (
    <section className="animate__animated animate__fadeIn">
      {/* Titulo da página */}
      <div className="mx-auto mt-5 text-xl sm:text-3xl text-grayPrime font-bold ">
        <div className="w-fit h-fit mx-auto mb-6">
          <div className="font-bold text-[10px] text-left cursor-default">
            Protegido por:
          </div>
          <img 
            src="https://storage.googleapis.com/primesecure/logo-kakau.svg" 
            alt="Logo Kakau" 
            className={`w-[140px] md:w-[140px]`} 
          /> 
        </div>
        <p>
          <span className="text-bluePrime">
            Parabéns! O Seu Seguro Bike está em Análise.
          </span>{" "}
          <br /> Estamos enviando os detalhes do seu seguro para o seu e-mail
          cadastrado
        </p>

        <p className="mx-auto text-xl font-normal">
          Abaixo está o resumo do seu seguro:
        </p>
      </div>
      {/* Container Cards */}
      <container className="sm:flex sm:flex-wrap">
        {/* Card sumário de pedido */}
        {saleDetails && (
          <div className="sm:min-w-[400px] sm:max-w-[800px] mx-2 sm:mx-auto">
            <div>
              {/* Sumário de pedido concluído */}
              <div className="border-grayPrime  my-5 rounded-xl shadow-card-succesfull-payment ">
                <div className=" text-xl text-white bg-bluePrime rounded-t-xl font-regular p-3">
                  Resumo do Pedido
                </div>
                <div className="mt-3 justify-between mx-3">
                  <div className="flex justify-between gap-4 border-b-[0.5px] border-grayPrime/25 my-5">
                    <div className="text-xl text-bluePrime font-semibold ">
                      Marca:
                    </div>
                    <div className="text-xl font-normal text-end">
                      {saleDetails.bike_brand}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4 border-b-[0.5px] border-grayPrime/25 my-5">
                    <div className="text-xl text-bluePrime font-semibold">
                      Modalidade:
                    </div>
                    <div className="text-xl font-normal text-end">
                      {saleDetails.bike_modality}
                    </div>
                  </div>
                  <div className="flex justify-between border-b-[0.5px] border-grayPrime/25 my-5">
                    <div className="text-xl text-bluePrime font-semibold">
                      Modelo:
                    </div>
                    <div className="text-xl font-normal text-end">
                      {saleDetails.bike_model}
                    </div>
                  </div>
                  <div className="flex justify-between border-b-[0.5px] border-grayPrime/25 my-5">
                    <div className="text-xl text-bluePrime font-semibold">
                      Valor da Bike:
                    </div>
                    <div className="text-xl font-normal text-end">
                      {new Intl.NumberFormat("pt-Br", {
                        style: "currency",
                        currency: "BRL",
                      }).format(saleDetails.bike_price)}
                    </div>
                  </div>
                  <div className="flex justify-between border-b-[0.5px] border-grayPrime/25 my-5">
                    <div className="text-xl text-bluePrime font-semibold">
                      N° de Série:
                    </div>
                    <div className="text-xl font-normal">
                      {saleDetails.bike_serial_number}
                    </div>
                  </div>
                </div>
                {/* Footer/botão para acessar o manual de uso do seguro*/}
                <div className=" text-2xl text-white bg-bluePrime rounded-b-xl font-semibold p-3 mt-4">
                  <button>
                    <a
                      href={saleDetails.manual_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Acessar Manual
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </container>
    </section>
  );
}
