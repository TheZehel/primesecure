export default function Contemplados() {
  return (
    <div>
      <section className="flex flex-col-reverse md:flex-row items-center justify-center my-10 sm:my-20 mx-[20px] bg-bluePrime rounded-3xl p-6 md:p-10">
        <div className="md:w-1/2 py-8 md:py-32 text-center md:text-left">
          <h2 className="text-white text-xl sm:text-4xl font-bold mb-4">
            Contemplados Consórcio Porto Bank
          </h2>
          <p className="mx-auto md:mx-0 md:max-w-xl text-white">
            Conheça alguns dos contemplados do Consórcio Porto Bank e saiba como
            eles conquistaram seus maiores sonhos. Se você está pensando em
            investir no seu futuro, este vídeo é para você!
          </p>
        </div>
        <div className="flex justify-center md:w-1/2 w-full">
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/K8eXz5mJc7U?themeRefresh=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
