import React, { useState } from "react";
import { useNavigate } from "react-router";

import FormSeguroCelularKakau from "./components/FormSeguroCelularKakau";
import Assistance from "./components/Assistance";
import Plans from "./components/Plans";
import NoBureaucracy from "./components/NoBureaucracy";
import Faq from "./components/Faq";
import Advantages from "./components/Advantages";
import Benefits from "./components/Benefits";
import CustomFooter from "./cotacao-seguro-celular-kakau/components/subcomponents/CustomFooter";
import BannerPromoPhoneKakau from "./components/BannerPromoPhoneKakau";

export default function IndexSeguroCelularKakau() {
  return (
    <div>
      <BannerPromoPhoneKakau />
      <FormSeguroCelularKakau
        callback={(data) => {
          SVGAnimatedTransformList({ ...data });
        }}
      />
      <Plans />
      <NoBureaucracy />
      <Advantages />
      <Benefits />
      <Faq />
      <CustomFooter />
    </div>
  );
}
