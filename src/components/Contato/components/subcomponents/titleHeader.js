export default function TitleHeader({title}) {
  
  title = title || "Agora, Compare e Escolha o Melhor Plano Para o Seu Pet";
  return (
    <div className="text-center text-zinc-800 sm:text-5xl text-2xl font-extrabold font-montserrat mx-10">
      {title}
    </div>
  );
}
