import HeaderCotacao from "./HeaderCotacao";

export default function LayoutCotacaoPlanos({title, position}) {
  return (
    <div className="relative w-full h-full max-w-screen-lg mx-auto mt-20">
      <HeaderCotacao title={title} position={position} />
    </div>
  );
}
