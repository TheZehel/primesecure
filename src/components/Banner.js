// import { useState, useEffect } from "react";
import "animate.css";
import imageManager from "./bancoDeImagens";

const Banner = () => {
  // const [loopNum, setLoopNum] = useState(0);
  // const [isDeleting, setIsDeleting] = useState(false);
  // const [text, setText] = useState("");
  // const [delta, setDelta] = useState(300 - Math.random() * 100);
  // const [index, setIndex] = useState(1);
  // const toRotate = ["Seguros", "Planos de Saúde"];
  // const period = 500;

  // useEffect(() => {
  //   let ticker = setInterval(() => {
  //     tick();
  //   }, delta);

  //   // Limpa o intervalo quando o componente for desmontado
  //   return () => {
  //     clearInterval(ticker);
  //   };
  // }, [text, delta]); // Adicione 'delta' como dependência para atualizar o intervalo

  // const tick = () => {
  //   let i = loopNum % toRotate.length;
  //   let fullText = toRotate[i];
  //   let updatedText = isDeleting
  //     ? fullText.substring(0, text.length - 1)
  //     : fullText.substring(0, text.length + 1);

  //   setText(updatedText);

  //   if (isDeleting) {
  //     setDelta((prevDelta) => prevDelta / 2);
  //   }

  //   if (!isDeleting && updatedText === fullText) {
  //     setIsDeleting(true);
  //     setIndex((prevIndex) => prevIndex - 1);
  //     setDelta(period);
  //   } else if (isDeleting && updatedText === "") {
  //     setIsDeleting(false);
  //     setLoopNum((prevLoopNum) => prevLoopNum + 1);
  //     setIndex(1);
  //     setDelta(500);
  //   } else {
  //     setIndex((prevIndex) => prevIndex + 1);
  //   }
  // };

  return (
    <section className="banner" id="home">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate__animated animate__fadeIn ">
            <span className="text-xl text-bluePrime">
              Protegendo Todos Seus Momentos
            </span>
            <h1 className="text-4xl font-bold mb-4 ">
              Prime Secure
              <span
                className="txt-rotate inline-block"
                data-period="500"
                data-rotate='["Seguros"]'
              >
                {/* <span className="wrap">{text}</span>*/}
              </span>
            </h1>
            <p>
              A Prime Secure, desde 2015, combina tecnologia e eficiência para
              inovar no mercado de seguros, protegendo com compromisso os bens e
              patrimônios de nossos clientes.
            </p>
          </div>
          <div className="animate__animated animate__zoomIn">
            <img
              src={imageManager.banners.bannerCelHome}
              alt="Prime Secure Marketplace de Seguros"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
