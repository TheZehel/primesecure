import { useNavigate } from "react-router-dom";

export default function CredentialNetworkBanner() {
  const navigate = useNavigate();

  const NavigateCredentialNetwork = () => {
    navigate("/rede-credenciada");
  };

  return (
    <div className="bg-bluePrime px-10 py-20">
      <h2 className="text-xl sm:text-5xl font-semibold text-white">
        Clínicas pertinho de você
      </h2>
      <p className="text-lg sm:text-2xl text-white py-2 sm:py-4">
        Mais de 2.000 clínicas, laboratórios e especialistas <br />
        Veja as avaliações dos nossos clientes
      </p>
      <button className="bg-white p-4 rounded-lg font-bold hover:shadow-uniform-shadow">
        <p onClick={NavigateCredentialNetwork}>ver rede credenciada</p>
      </button>
    </div>
  );
}
