import { useState, createRef } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

export default function SimpleFormSection({
  title,
  description,
  price,
  image,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const formRef = createRef();

  const handleInputChange = (event) => {
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    // Check if this is the InputMask field
    if (name === "phone" && event.target.value instanceof Array) {
      value = event.target.value[0];
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    return formData.name && formData.email && formData.phone;
  };

  const handleSubmit = (e) => {
    //e.preventdefault();

    if (validateForm()) {
      navigate("/obrigado");
    }
  };

  const handleButtonClick = () => {
    if (validateForm()) {
      navigate("/obrigado");
    }
  };

  return (
    <div className="animate__animated animate__zoomIn rounded-lg bg-white p-5 sm:px-10 sm:mx-20 xl:mx-32">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Faça Sua Cotação Gratuita
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-600">
        Inicie sua cotação online preenchendo o formulário abaixo.
      </p>
      <form
        onSubmit={handleSubmit}
        className="sm:flex flex-col sm:flex-row justify-center items-center mx-auto gap-x-6 gap-y-4 mt-10 max-w-xl sm:mt-10 xl:mx-20"
      >
        <div className="w-full gap-x-8 gap-y-6 grid grid-cols-1 mt-5 sm:m-0">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nome Completo
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              E-mail
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Telefone
            </label>
            <div className="mt-2.5">
              <InputMask
                mask="(99) 9.9999-9999"
                maskChar={null}
                name="phone"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrime sm:text-sm sm:leading-6"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="xl:mx-20">
        <button
          onClick={handleButtonClick}
          class="bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-full flex mt-3 justify-center items-center "
        >
          Cotar Agora
        </button>
      </div>
    </div>
  );
}
