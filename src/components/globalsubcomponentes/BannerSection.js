import { Chip } from "@material-tailwind/react";

export default function BannerSection({
  chipText,
  titleText,
  descriptionText,
  imageUrl,
}) {
  return (
    <div className="animate__animated animate__fadeIn">
      <Chip value={chipText} className="bg-bluePrime" />
      <h1 className="text-4xl font-bold mb-4 text-white">{titleText}</h1>
      {imageUrl && (
        <img className="w-6/12 mx-auto " src={imageUrl} alt={titleText} />
      )}{" "}
      {/**/}
      <p className="text-white">{descriptionText}</p>
    </div>
  );
}
