import React, { useState, iseEffect } from "react";
import axios from "axios";
import { useEffect } from "react";
import "animate.css";

const environment = process.env.REACT_APP_ENVIRONMENT;

export default function SuccessfullPage({ token }) {
  const [saleDetails, setSaleDetails] = useState(null);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        console.log(token);
        var url = `http://localhost:3050/kakau-phone/checkout/get-sale-by-id/${ typeof token === "string" ? token : "661eb6471482254a72dfe501" }`;

        if (environment != 'SANDBOX') url = `https://api-primesecure.onrender.com/kakau-phone/checkout/get-sale-by-id/${ typeof token === "string" ? token : "" }`;

        await axios.get( url )
          .then((response) => {
            let { data } = response;
            console.log(data)
            //let { apiResponse = {} } = data;

            setSaleDetails(data);

            console.log("Detalhes da venda", data);
          })
          .catch((err) => {
            let error = err;

            if (error && error.response) error = error.response; 
            if (error && error.data) error = error.data;            

            console.error(error);
          });
      } catch (error) {
        console.error("Erro ao buscar os detalhes da venda", error);
      }
    };

    fetchSaleDetails();
  }, [token]); //[token]);

  console.log("saleDetails", token, saleDetails);
  let planNames = ['Prime Essencial', 'Prime Avançado', 'Prime Premium'];
  let planCode = saleDetails?.phone?.planData?.plan?.code;
  let planName = saleDetails?.phone?.planData?.plan?.name || '';

  console.log("planCode", planCode);

  if (planCode == 'karfqa') planName = planNames[2];
  if (planCode == 'karf') planName = planNames[1];
  if (planCode == 'kaqa') planName = planNames[0];

  return (
    <section className="animate__animated animate__fadeIn">
      {/* Titulo da página */}
      <div className="mx-auto mt-10 text-xl sm:text-3xl text-grayPrime font-bold ">
        <p>
          <span className="text-bluePrime">
            Parabéns! O Seu Seguro Celular está em Análise.
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
                      Plano:
                    </div>
                    <div className="text-xl font-normal text-end">
                      {planName}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4 border-b-[0.5px] border-grayPrime/25 my-5">
                    <div className="text-xl text-bluePrime font-semibold">
                      Marca:
                    </div>
                    <div className="text-xl font-normal text-end">
                      {saleDetails?.phone?.planData?.marca}
                    </div>
                  </div>
                  <div className="flex justify-between border-b-[0.5px] border-grayPrime/25 my-5">
                    <div className="text-xl text-bluePrime font-semibold">
                      Modelo:
                    </div>
                    <div className="text-xl font-normal text-end">
                      {saleDetails?.phone?.modelData?.manufacturer_name} ({saleDetails?.phone?.modelData?.storage})
                    </div>
                  </div>
                  <div className="flex justify-between border-b-[0.5px] border-grayPrime/25 my-5">
                    <div className="text-xl text-bluePrime font-semibold">
                      Número:
                    </div>
                    <div className="text-xl font-normal text-end">
                      {(typeof saleDetails?.phone?.mobile_number == "string") ? saleDetails?.phone?.mobile_number.replace('.', '') : ""}
                    </div>
                  </div>
                  <div className="flex justify-between border-b-[0.5px] border-grayPrime/25 my-5">
                    <div className="text-xl text-bluePrime font-semibold">
                      IMEI:
                    </div>
                    <div className="text-xl font-normal">
                      {saleDetails?.phone?.imei}
                    </div>
                  </div>
                </div>
                {/* Footer/botão para acessar o manual de uso do seguro*/}
                <div className=" text-2xl text-white bg-bluePrime rounded-b-xl font-semibold p-3 mt-4">
                  <button>
                    <a
                      href={saleDetails?.response?.manual_url}
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
