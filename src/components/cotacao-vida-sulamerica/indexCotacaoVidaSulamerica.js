// Componente
import StepsHandler from "./components/StepsHandler";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState, useEffect } from "react";

//import StepPlans from "./components/StepPlans";
//import StepAddress from "./components/StepAddress";
//import StepRegistrationData from "./components/StepRegistrationData";
//import StepHealthTips from "./components/StepHealthTips";
//import StepHealthTips2 from "./components/StepHealthTips2";
//import StepSelectBeneficiary from "./components/StepSelectBeneficiary";
//import StepAddBeneficiary from "./components/StepAddBeneficiary";
//import StepPayment from "./components/StepPayment";

//subcomponents

export default function IndexCotacaoVidaSulamerica() {
  const recaptchaV3Ref = useRef();
  const [recaptchRef, setRecaptcha] = useState(null);

  useEffect(() => {
    setRecaptcha(recaptchaV3Ref.current);
  }, [recaptchaV3Ref]);

  return (
    <div>
      <StepsHandler 
        recaptchaRef={ recaptchRef }
      />
      {/*<StepPlans />
      <StepAddress />
      <StepRegistrationData />
      <StepHealthTips />
      <StepHealthTips2 />
      <StepSelectBeneficiary />
      <StepAddBeneficiary />
      <StepPayment />*/}
      <ReCAPTCHA
        ref={recaptchaV3Ref}
        sitekey="6LeUriEoAAAAAJK28iP3cIgAsRKUl4TCJhBC-GEO"
        size="invisible"
        onChange={ (token) => { console.log('Recaptcha onChange', token); } }
      />
    </div>
  );
}
