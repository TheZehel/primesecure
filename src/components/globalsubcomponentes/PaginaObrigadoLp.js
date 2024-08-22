import { useState, useEffect } from "react";

export default function PaginaObrigadoLp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedFormData = sessionStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
      sessionStorage.removeItem("formData");
    }
  }, []);

  return (
    <div className="mt-10">
      <div>
        <h2 className="text-4xl font-bold mb-4">
          Obrigado, <span className="text-bluePrime">{formData.name}!</span>
        </h2>
        <p className="text-grayPrime font-normal sm:w-6/12  sm:justify-center sm:items-center mx-auto sm:text-2xl">
          Ainda não possuímos uma versão online desse produto! Assim que
          lançarmos, iremos enviar uma notificação em seu email:
        </p>

        <p className=" flex text-xl font-bold border border-bluePrime rounded-lg w-min p-3 mx-auto mt-5 justify-center items-center text-bluePrime">
          {formData.email}
        </p>
      </div>
      <div className="mt-5 p-1">
        <h2 className="font-normal mb-4 text-xl text-grayPrime">
          <span className="text-bluePrime font-bold">
            {" "}
            Mas não se Preocupe!
          </span>{" "}
          Um dos nossos especialistas entrará em contato no seu número{" "}
          <span className="text-bluePrime font-bold">
            {" "}
            {formData.phone}{" "}
          </span>{" "}
          para lhe ajudar no seu processo de contratação.
        </h2>
      </div>
    </div>
  );
}
