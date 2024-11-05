import React, { useState, useEffect, useRef } from "react";

import { IoClose } from "react-icons/io5";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FaAmbulance, FaCross, FaPills, FaHouseUser } from "react-icons/fa";
import { FaLaptopMedical } from "react-icons/fa";
import { BsChevronDown, BsChevronUp, BsPersonFill } from "react-icons/bs";
import { TbWheelchair } from "react-icons/tb";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export default function ModalDetails({ display, closeModal }) {
  const [selected, setSelected] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const modalRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight == windowHeight) {
        return;
      }

      console.log("windowSize", window.innerHeight);

      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  var modalHeight = modalRef?.current?.offsetHeight || 0;

  return (
    <div
      className={`w-full h-full top-0 left-0 fixed z-[100] flex p-[15px] z-[180] ${
        display ? "flex" : "hidden"
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        setSelected(0);
        closeModal();
      }}
    >
      <div
        className="w-full h-full top-0 left-0 absolute bg-[#000000]/20"
        onClick={() => {
          setSelected(0);
          closeModal();
        }}
      ></div>
      <div
        className={`w-full max-w-[680px] bg-white shadow-lg m-auto py-[15px] pl-[10px] sm:pl-[15px] pr-[2px] absolute top-0 left-0 right-0 bottom-0 text-[#313131] overflow-hidden ${
          modalHeight < windowHeight ? "h-fit rounded-lg" : "h-full rounded-sm"
        }`}
        onClick={() => {
          setSelected(0);
          closeModal();
        }}
        ref={modalRef}
      >
        <div
          className="custom-scroll-modal w-full h-full pr-[3px] text-[#313131] overflow-hidden overflow-y-auto relative"
          style={{ scrollbarGutter: "stable" }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div className="mb-[35px]">
            <div className="text-[20px] sm:text-[24px] w-fit mx-auto">
              Coberturas
            </div>
            <div className="text-[13px] sm:text-[14px] w-fit mx-auto">
              Seu seguro pode ser acionado nesses casos:
            </div>
          </div>
          <div className="mx-auto">
            <div className="px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 1 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 1 ? 0 : 1);
                }}
              >
                <div className="h-fit w-fit my-auto text-[23px]">
                  <FaAmbulance />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Morte Acidental
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 1 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 1 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 1 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] leading-[16px]">
                  Seus beneficiários receberão o valor de indenização mencionado
                  caso você venha a falecer por causa de algum acidente.
                </p>
                <p className="pt-[8px] text-[12px] sm:text-[13px]">
                  <span className="text-bluePrime">O que cobre:</span> Mortes
                  causadas por acidentes, suicídio ou tentativa de suicídio.
                </p>
                <p className="pt-[5px] pb-[15px] text-[12px] sm:text-[13px]">
                  <span className="text-bluePrime">O que não cobre:</span> Não
                  cobre mortes causadas por doenças (Covid, por exemplo) e
                  qualquer outro tipo de morte que não seja decorrente de evento
                  de acidente.
                </p>
              </div>
            </div>
            <div className="mt-[10px] px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 2 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 2 ? 0 : 2);
                }}
              >
                <div className="h-fit w-fit my-auto text-[23px]">
                  <TbWheelchair />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Invalidez Permanente Total por Acidente
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 2 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 2 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 2 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] leading-[16px]">
                  Você recebe essa indenização se sofrer uma invalidez
                  permanente total causada por acidente, caracterizada pela
                  perda, redução ou impotência funcional definitiva de um membro
                  ou órgão.
                </p>
                <p className="pt-[8px] text-[12px] sm:text-[13px]">
                  <span className="text-bluePrime">O que cobre:</span> Se em
                  caso de invalidez permanente total decorrente de acidente,
                  você recebe a indenização financeira proporcional ao tamanho
                  do dano. É preciso diagnóstico médico para solicitação.
                </p>
                <p className="pt-[5px] pb-[15px] text-[12px] sm:text-[13px]">
                  <span className="text-bluePrime">O que não cobre:</span> Perda
                  de dentes e danos estéticos, entre outros eventos e situações
                  específicas.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-[35px] mt-[40px]">
            <div className="text-[20px] sm:text-[24px]  w-fit mx-auto">
              Assistências e Benefícios
            </div>
            <div className="text-[13px] sm:text-[14px]  w-fit mx-auto">
              Tudo isso fica à sua disposição:
            </div>
          </div>
          <div className="mx-auto">
            <div className="px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 10 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 10 ? 0 : 10);
                }}
              >
                <div className="h-fit w-[23px] my-auto text-[18px] flex">
                  <img
                    src="https://storage.googleapis.com/primesecure/icones-namu.png"
                    alt="Icone Namu"
                  />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Ganhe Acesso ao App Namu
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 10 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 10 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 10 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] pb-[15px] leading-[18px]">
                  Ao realizar a contratação do seu Seguro Prime Vida Fit você
                  terá acesso ao App Namu, um aplicativo que oferece diversos
                  benefícios para a sua saúde e bem-estar.
                </p>
              </div>
            </div>
            <div className="px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 3 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 3 ? 0 : 3);
                }}
              >
                <div className="h-fit w-[23px] my-auto text-[18px] flex">
                  <FaCross className="mx-auto" />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Funeral Familiar
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 3 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 3 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 3 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] pb-[15px] leading-[18px]">
                  Cobre o cônjuge e filhos até 21 anos, garantindo apoio nos
                  momentos mais difíceis.
                </p>
              </div>
            </div>
            <div className="mt-[10px] px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 4 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 4 ? 0 : 4);
                }}
              >
                <div className="h-fit w-fit my-auto text-[23px]">
                  <FaLaptopMedical />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Médico na Tela
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 4 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 4 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 4 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] pb-[15px] leading-[18px]">
                  Serviço de atendimento e orientação médica para você, seu
                  cônjuge e filhos. Basta ligar na central de atendimento e
                  acessar o link para sala de vídeo. Se necessário, com
                  prescrição de receitas para medicamentos.
                </p>
              </div>
            </div>
            <div className="mt-[10px] px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 5 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 5 ? 0 : 5);
                }}
              >
                <div className="h-fit w-[23px] my-auto text-[18px]">
                  <FaPills className="mx-auto" />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Desconto Farmácia
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 5 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 5 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 5 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] pb-[15px] leading-[18px]">
                  Ampla rede de farmácias que oferecem descontos de até 70% em
                  diversos medicamentos nas maiores redes de farmácias do
                  Brasil.
                  <br />
                  No momento em que o seguro for acionado em caso de fatalidade,
                  basta solicitar também o acionamento do Cartão Alimentação.
                  Ele será enviado por correio e a partir disso já é possível
                  utilizar o cartão em qualquer mercado ou supermercado.
                </p>
              </div>
            </div>
            <div className="mt-[10px] px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 6 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 6 ? 0 : 6);
                }}
              >
                <div className="h-fit w-[23px] my-auto text-[20px]">
                  <FaHouseUser className="mx-auto" />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Assistência Residencial
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 6 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 6 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 6 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] pb-[15px] leading-[18px]">
                  Serviços para pequenos reparos como chaveiro, eletricista e
                  outros profissionais. Conta também com os serviços de
                  vigilância e segurança, em caso de roubo e furto na
                  residência, e serviços domésticos provisórios, em caso de
                  hospitalização do segurado ou profissionais domésticos com
                  carteira assinada.
                </p>
              </div>
            </div>
            <div className="mt-[10px] px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 7 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 7 ? 0 : 7);
                }}
              >
                <div className="h-fit w-[23px] my-auto text-[20px]">
                  <HiWrenchScrewdriver />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Faz Tudo
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 7 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 7 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 7 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] pb-[15px] leading-[18px]">
                  Pequenos serviços domésticos como fixação de quadros,
                  cortinas, prateleiras, olho mágico e muito mais.
                </p>
              </div>
            </div>
            <div className="mt-[10px] px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 8 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 8 ? 0 : 8);
                }}
              >
                <div className="h-fit w-[23px] my-auto text-[20px]">
                  <BsPersonFill />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Assistência Pessoal
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 8 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 8 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 8 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] pb-[15px] leading-[18px]">
                  Oferece um amplo apoio pessoal e familiar, incluindo suporte
                  com baby sitter em casos de hospitalização da mãe, transporte
                  escolar para crianças, remoção médica emergencial e aulas
                  particulares para reforço escolar.
                  <br />
                  Serviços voltados ao bem-estar, como segunda opinião médica
                  internacional, assistência psicológica após sinistros,
                  consultoria nutricional e programas personalizados de fitness,
                  visando a saúde e qualidade de vida do segurado e de sua
                  família.
                </p>
              </div>
            </div>
            <div className="mt-[10px] px-[5px] sm:px-[10px] border-b-[1px] border-b-[#EEE]">
              <div
                className={`flex w-full pb-[4px] cursor-pointer transition transition-all ease duration-500 ${
                  selected == 9 ? "text-bluePrime" : ""
                }`}
                onClick={() => {
                  setSelected(selected == 9 ? 0 : 9);
                }}
              >
                <div className="h-fit w-[23px] my-auto text-[23px]">
                  <RiMoneyDollarCircleFill />
                </div>
                <div className="ml-[8px] text-[13px] sm:text-[16px]">
                  Sorteios Mensais
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected != 9 ? "hidden" : ""
                  }`}
                >
                  <BsChevronUp />
                </div>
                <div
                  className={`ml-auto my-auto text-[16px] sm:text-[18px] cursor-pointer text-black ${
                    selected == 9 ? "hidden" : ""
                  }`}
                >
                  <BsChevronDown />
                </div>
              </div>
              <div
                className={`text-left text-[12px] sm:text-[14px] mx-[5px] text-black overflow-hidden h-auto transition transition-all ease duration-500 ${
                  selected == 9 ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <p className="pt-[5px] pb-[15px] leading-[18px]">
                  Você concorre a 20 mil reais pela loteria federal todo mês!
                  Mesmo se for sorteado, continua participando dos próximos
                  sorteios e tem a chance de ganhar mais vezes!
                  <br />
                  No último sábado de cada mês você concorre a 20 mil reais pela
                  loteria federal.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute w-[29px] h-[29px] bg-white right-[15px] top-[10px] text-black text-[23px] flex rounded-full cursor-pointer"
          onClick={() => {
            setSelected(0);
            closeModal();
          }}
        >
          <IoClose className="m-auto" />
        </div>
      </div>
    </div>
  );
}
