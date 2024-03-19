import imageManagerPrimeTravel from "../../bancodeimagens/BancoDeImagensPrimeTravel";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsHeadset } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
//BsHeadset, AiOutlineQuestionCircle

export default function ContainerContato(props) {
  const scrollToFaq = () => {
    props.scroll();
  };
  function makeCall() {
    // Simula o comportamento de um link de chamada telefônica
    window.location.href = "tel:+55 (11) 5039-9001";
  }
  return (
    <div
      href="tel:++55 (11) 5039-9001"
      className="cursor-pointer"
      style={{
        backgroundImage: `url(${imageManagerPrimeTravel.ImagensLandPage.ImgBgContato})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ padding: "4rem 0px", display: "flex" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "auto",
            padding: "0 12px",
            color: "#FFF",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "1.4rem", lineHeight: "1.2" }}>
            Precisou de ajuda durante a viagem?
          </h3>
          <p
            style={{
              marginTop: "2rem",
              fontSize: "1.2rem",
              fontWeight: "400",
              padding: "0px 19px",
            }}
          >
            Nos envie um WhatsApp de qualquer lugar que responderemos
            imediatamente. Atendimento em português, 24h por dia, 7 dias por
            semana!
          </p>
          <div
            className="flex"
            style={{
              maxWidth: "1100px",
              margin: "45px auto 0px",
              padding: "0 12px",
              color: "#FFF",
              textAlign: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                margin: "0 auto 25px auto",
                minWidth: "245px",
                display: "flex",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => {
                window.open("https://wa.me/551150399001", "_blank");
              }}
            >
              <div
                style={{
                  width: "75px",
                  height: "75px",
                  position: "absolute",
                  left: "20px",
                  top: "25px",
                }}
              >
                <IoLogoWhatsapp size={75} />
              </div>
              <div
                style={{
                  width: "245px",
                  height: "145px",
                  backgroundColor: "#25D366",
                  borderRadius: "15px",
                  padding: "10px 15px",
                  margin: "0 auto",
                  boxShadow: "2px 3px 7px 0px rgba(0,0,0,0.3)",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <p
                  style={{
                    width: "100%",
                    fontSize: "28px",
                    lineHeight: "28px",
                    fontWeight: "400",
                    textAlign: "right",
                  }}
                >
                  WhatsApp
                </p>
                <p
                  style={{
                    width: "100%",
                    fontSize: "50px",
                    lineHeight: "52px",
                    fontWeight: "400",
                    textAlign: "right",
                    margin: "10px 0px",
                  }}
                >
                  24H
                </p>
                <p
                  style={{
                    width: "100%",
                    fontSize: "24px",
                    lineHeight: "24px",
                    fontWeight: "400",
                    textAlign: "right",
                  }}
                >
                  +55 11 5039-9001
                </p>
              </div>
            </div>
            <button
              style={{
                minWidth: "245px",
                margin: "0 auto 25px auto",
                display: "flex",
                position: "relative",
              }}
              className="cursor-pointer"
              href="tel:+55 (11) 5039-9001"
              onClick={() => {
                window.location.href = "tel:+55 (11) 5039-9001";
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  position: "absolute",
                  left: "20px",
                  top: "20px",
                }}
              >
                <BsHeadset size={70} />
              </div>
              <div
                href="tel:+55 (11) 5039-9001"
                className="cursor-pointer"
                style={{
                  width: "245px",
                  height: "145px",
                  padding: "10px 15px",
                  margin: "0 auto",
                  display: "flex",
                  flexWrap: "wrap",
                  borderRadius: "15px",
                  backgroundColor: "#4826E3",
                  boxShadow: "2px 3px 7px 0px rgba(0,0,0,0.4)",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    maxWidth: "155px",
                    marginLeft: "auto",
                    fontSize: "22px",
                    lineHeight: "22px",
                    fontWeight: "400",
                    textAlign: "right",
                  }}
                >
                  Ligue Central de emergência
                </p>
                {/*<div
                  style={{
                    width: "100%",
                    marginTop: "auto",
                    fontSize: "14px",
                    fontWeight: "400",
                    textAlign: "right",
                  }}
                >
                  <p style={{ lineHeight: "16px" }}>Brasil</p>
                  <p
                    style={{
                      lineHeight: "16px",
                      marginTop: "2px",
                      fontSize: "13px",
                    }}
                  >
                    +55 (11) 32302118
                  </p>
                  </div>*/}
                <div
                  style={{
                    width: "100%",
                    marginTop: "auto",
                    fontSize: "14px",
                    fontWeight: "400",
                    textAlign: "right",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                      marginLeft: "auto",
                      textAlign: "left",
                    }}
                  >
                    {/*<p style={{ lineHeight: "16px" }}>Europa</p>
                    <p style={{ lineHeight: "16px", fontSize: "13px" }}>
                      +34 (91) 0606975
                  </p>*/}
                  </div>
                  <div style={{ width: "70%", marginRight: "auto" }}>
                    <p style={{ lineHeight: "16px" }}>Brasil</p>
                    <p
                      style={{ lineHeight: "16px", fontSize: "13px" }}
                      className="cursor-pointer"
                    >
                      <a href="tel:++55 (11) 5039-9001">+55 (11) 5039-9001</a>
                    </p>
                  </div>
                </div>
              </div>
            </button>
            <div
              style={{
                margin: "0 auto 25px auto",
                minWidth: "245px",
                display: "flex",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "245px",
                  height: "145px",
                  padding: "5px 20px",
                  margin: "0 auto",
                  display: "flex",
                  flexWrap: "wrap",
                  borderRadius: "15px",
                  boxShadow: "2px 3px 7px 0px rgba(0,0,0,0.4)",
                  backgroundColor: "#2800DE",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "50px",
                    margin: "auto auto 25px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "5px",
                    }}
                  >
                    <AiOutlineQuestionCircle size={50} />
                  </div>
                  <p
                    style={{
                      width: "150px",
                      margin: "auto 0px",
                      fontSize: "20px",
                      lineHeight: "23px",
                      fontWeight: "400",
                      textAlign: "right",
                    }}
                  >
                    Duvidas sobre o seguro viagem?
                  </p>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "fit-content",
                    display: "flex",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#FFF",
                      color: "#2800DE",
                      borderRadius: "5px",
                      padding: "6px 50px",
                      fontWeight: "500",
                      margin: "0px auto",
                    }}
                    onClick={scrollToFaq}
                  >
                    Clique Aqui
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
