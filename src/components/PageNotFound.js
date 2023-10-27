import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="font-bold text-bluePrime text-7xl">Erro 404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            A página que está procurando não existe
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Desculpe por isso.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              onClick={handleClick}
              className="rounded-md bg-bluePrime px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bluePrime2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bluePrime cursor-pointer"
            >
              Voltar para o inicio
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
