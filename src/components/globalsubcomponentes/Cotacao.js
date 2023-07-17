import { useEffect } from "react";

export default function PaginaObrigadoLp() {
  useEffect(() => {
    const storedFormData = sessionStorage.getItem("formData");
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      sessionStorage.removeItem("formData");

      // Exibir os dados armazenados no console
      console.log(formData);
    }
  }, []);

  return (
    <div className="mt-10">
      <div>
        <h2 className="text-4xl font-bold mb-4">Obrigado!</h2>
        <p className="text-grayPrime font-normal sm:w-6/12 sm:justify-center sm:items-center mx-auto sm:text-2xl">
          Ficamos muito grato pelo seu contato.
        </p>
      </div>
      <div className="mt-5 p-1">
        <h2 className="font-normal mb-4 text-xl text-grayPrime">
          <span className="text-bluePrime font-bold">Em Breve</span> Um dos
          nossos especialistas entrará em contato para ajudar no seu processo de
          contratação.
        </h2>
      </div>
    </div>
  );
}
