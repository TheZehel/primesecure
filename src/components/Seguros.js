import { FaHome, FaPlane } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Seguros = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="background-skills" id="skills">
      <div className=" p-10">
        <div className="mx-5">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">Nossos Seguros</h2>
            <p className="text-gray-300 text-lg mt-4">
              Parceria com as Melhores e Maiores Seguradoras da América Latina.
            </p>
          </div>
          <div className="mt-10">
            <Carousel
              responsive={responsive}
              infinite
              className="owl-carousel owl-theme skill-slider"
            >
              <div className="w-1/2 mx-auto text-center">
                <div className="flex flex-col items-center">
                  <FaHome className="text-white text-6xl mb-4" />
                  <h5 className="text-white text-lg">Seguro Residencial</h5>
                </div>
              </div>
              <div className="w-1/2 mx-auto text-center">
                <div className="flex flex-col items-center">
                  <FaPlane className="text-white text-6xl mb-4" />
                  <h5 className="text-white text-lg">Seguro Viagem</h5>
                </div>
              </div>
              <div className="w-1/2 mx-auto text-center">
                <div className="flex flex-col items-center">
                  <FaHome className="text-white text-6xl mb-4" />
                  <h5 className="text-white text-lg">Seguro Residencial</h5>
                </div>
              </div>
              <div className="w-1/2 mx-auto text-center">
                <div className="flex flex-col items-center">
                  <FaPlane className="text-white text-6xl mb-4" />
                  <h5 className="text-white text-lg">Seguro Viagem</h5>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Seguros;
