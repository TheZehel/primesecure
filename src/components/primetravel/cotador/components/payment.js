import React from "react";
import InputMask from "react-input-mask"; 

const Payment = () => {
  return (
    <div className="mx-2">
      <h2 className="text-3xl font-bold text-[#313131]">Pagamento</h2>
      <p>Aqui você pode listar os planos disponíveis...</p>

      <div className="grid gap-1.5">
        <label htmlFor="card-number" className="font-semibold ">
          Numero do Cartão
        </label>
        <InputMask
              id="card-number"
              className="border-bluePrime border-2"
              mask={"9999 9999 9999 9999"}
              maskChar={null}
            />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="card-holder" className="font-semibold">
          Nome do titular
        </label>
        <input
          id="card-holder"
          className="border-bluePrime border-2"
        />
      </div>

      <div className="flex gap-1.5">
        <div className="flex-1 gap-1.5">
          <label 
          htmlFor="expiration-date">
            Expiração
          </label>
        </div>
      </div>
    </div>
  );
};

export default Payment;
