export default function TitleHeader({ title }) {
  title = title || "Agora é só escolher o plano ideal para você!";
  return (
    <div className="text-center text-zinc-800 sm:text-2xl text-lg font-extrabold font-montserrat mx-10">
      {title}
    </div>
  );
}
