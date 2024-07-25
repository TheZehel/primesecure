import React, { useRef } from "react";

//Components
import AlbertEinstein from "./components/AlbertEinstein";
import BannerLead from "./components/BannerLead";
import ContainerContato from "./components/ContainerContato";
import CountDown from "./components/CountDown";
import GeneraliStrip from "./components/GeneraliStrips";
import StepsHiring from "./components/HiringSteps";
import FaqTravel from "./components/FaqTravel";
import SliderPlanos from "./components/SliderPlanos";
import ContainerCoberturas from "./components/ContainerCoberturas";
import BannerPromos from "./components/BannerPromos";

export default function IndexTravelVenda() {
  const FaqRef = useRef();
  const scrollToFaq = () => {
    const faqPosition = FaqRef.current.getBoundingClientRect();
    window.scrollBy({
      top: faqPosition.top - 100,
      left: 0,
      behavior: "smooth",
    });
  };
  // time do countdown
  //const targetDate = new Date("December 31, 2023 00:00:00");
  return (
    <div>
      <BannerPromos />
      {/*<CountDown targetDate={targetDate} />*/}
      <BannerLead />
      <GeneraliStrip />
      <StepsHiring />
      <SliderPlanos />
      <AlbertEinstein />
      <ContainerCoberturas />
      <ContainerContato scroll={scrollToFaq} />
      <div ref={FaqRef}>
        <FaqTravel />
      </div>
    </div>
  );
}
