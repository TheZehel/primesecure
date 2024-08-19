import ImageManagerConsorcioImovel from "../imgs/imgs";

export default function Investment() {
  return (
    <section
      className=" items-center justify-center my-10 sm:my-20"
      style={{
        backgroundImage: `url(${ImageManagerConsorcioImovel.Investment.bgImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="py-32">
        <h2 className="text-white text-xl sm:text-4xl font-bold">
          Invista na Prime Secure e garanta seu futuro.
        </h2>
        <p className="mx-auto max-w-6xl text-white">
          Tem metas audaciosas? Invista com confiança! A Prime Secure oferece
          credibilidade para investidores e para aqueles que desejam alcançar
          seus sonhos mais grandiosos.
        </p>
      </div>
    </section>
  );
}
