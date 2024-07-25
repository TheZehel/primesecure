import React, { useState, useRef, useEffect } from "react";
import GlobalFuntions from "../../globalsubcomponentes/globalFunctions";
import InputMask from "react-input-mask";
import { Checkbox, Typography } from "@material-tailwind/react";
import LayoutCotacaoPlanos from "./layoutCotacaoPlanos";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

//console.log('apiUrl', apiUrl);

export default function PetAdded({
  formData,
  submitForm,
  updateForm,
  returnTo,
  reload,
  props,
}) {
  const [errorList, setErrorList] = useState([]);

  //const [phoneMask, setPhoneMask] = useState("(99) 9999-9999");
  const phoneInputRef = useRef(null);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    check: false,
  });

  const navigate = useNavigate();

  const handleNavigateToPrivacyPolicy = () => {
    navigate("/politicas-de-privacidade");
  };

  //instância da classe GlobalFuntions
  const functions = new GlobalFuntions();

  const inputHandler = (e) => {
    var value = e.target.value;
    var name = e.target.name;

    if (errorList.includes(name)) {
      var errors = [...errorList].filter((item) => item !== name);
      //console.log(errors);
      setErrorList(errors);
    }

    if (name == "checkbox") {
      value = !userData.check;

      setUserData({
        ...userData,
        check: value,
      });

      updateForm("userData", name, value);

      return;
    }

    //if (name == "phone") {
    //  //console.log(value);
    //  let phoneValue = value.toString().replace(/\D/g, "");

    //  if (phoneValue.length > 10) {
    //    value = phoneValue.replace(
    //      /(\d{2})(\d{1})(\d{4})(\d{4})/,
    //      "($1) $2.$3-$4"
    //    );

    //    if (phoneMask != "(99) 9.9999-9999") {
    //      setPhoneMask("(99) 9.9999-9999");
    //    }
    //  } else {
    //    value = phoneValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

    //    if (phoneMask != "(99) 9999-99999") {
    //      setPhoneMask("(99) 9999-99999");
    //    }
    //  }
    //}

    userData[name] = value;

    setUserData({ ...userData });

    updateForm("userData", name, value);
  };

  const handleSubmit = () => {
    let errorList = [];

    if (!functions.validateFullName(userData.name)) {
      errorList.push("name");
    }

    if (!functions.validatePhone(userData.phone)) {
      errorList.push("phone");
    }

    if (!functions.validateEmail(userData.email)) {
      errorList.push("email");
    }

    if (!userData.check) {
      errorList.push("check");
    }

    if (errorList.length > 0) {
      setErrorList(errorList);
      return;
    }

    var sessionForm = sessionStorage.getItem("formPetData");

    try {
      sessionForm = JSON.parse(sessionForm);
    } catch (error) {
      sessionForm = null;
    }

    sessionForm = sessionForm || {};
    sessionForm.userData = { ...sessionForm.userData, ...userData };

    sessionStorage.setItem("formPetData", JSON.stringify(sessionForm));

    try {
      const url = `${apiUrl}/tools/rdstation/lead-import`;

      const payload = {
        conversion_identifier: "lead-seguro-pet-api",
        product: "Petlove",
        inputs: {
          name: userData.name,
          email: userData.email,
          mobile_phone: userData.phone,
        },
      };

      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      axios
        .post(url, payload, { headers })
        .then((response) => {
          console.log("RD Lead Success:", response);
        })
        .catch((e) => {
          let error = e;

          if (error && error.response) {
            error = error.response;
          }

          if (error && error.data) {
            error = error.data;
          }

          console.error("RD Lead Error:", error);
        });
    } catch (error) {
      console.error("RD Lead Error:", error);
    }

    submitForm(3, userData);
  };

  //console.log('userData', userData);

  useEffect(() => {
    const dataValidation = () => {
      let data = sessionStorage.getItem("formPetData");

      try {
        data = JSON.parse(data);
      } catch (error) {
        data = null;
      }

      if (!data || !Array.isArray(data.petList) || data.petList.length < 1) {
        returnTo(1);
        return;
      }

      let petArray = [];

      for (let i in data.petList) {
        let pet = data.petList[i] || {};

        if (!pet.name || !pet.plan) {
          continue;
        }

        if (
          !pet.plan.price ||
          !pet.plan.title ||
          !/^[0-9]{1,}$/.test(pet.plan.id)
        ) {
          continue;
        }

        petArray.push(pet);
      }

      if (petArray.length < 1) {
        returnTo(1);
        return;
      }

      let buyerData = data.userData || {};

      buyerData = {
        name: buyerData.name || "",
        email: buyerData.email || "",
        phone: buyerData.phone || "",
        check: buyerData.check || false,
      };

      //console.log('Buyer Data:', buyerData);
      setUserData(buyerData);
    };

    dataValidation();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <LayoutCotacaoPlanos
          title="Agora Precisamos de Algumas Informações Suas:"
          position={1}
        />
        <div className="flex flex-col justify-center items-center my-5 mt-10">
          <div className="h-20 sm:w-2/4 flex ">
            <input
              name="name"
              type="text"
              className={`w-full h-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                errorList.includes("name")
                  ? "ring-alertRed placeholder-alertRed"
                  : "ring-bluePrime placeholder"
              }`}
              placeholder="Nome"
              maxLength="60"
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value={userData.name}
              onChange={inputHandler}
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "24px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="h-20 sm:w-2/4 flex mt-5">
            <input
              name="email"
              type="text"
              className={`w-full h-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                errorList.includes("email")
                  ? "ring-alertRed placeholder-alertRed"
                  : "ring-bluePrime placeholder"
              }`}
              placeholder="E-mail"
              maxLength="60"
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]*"
              value={userData.email}
              onChange={inputHandler}
              title="Por favor, use apenas letras e acentos comuns."
              style={{
                fontSize: "24px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="h-20 sm:w-2/4 flex mt-5 mx-10">
            <InputMask
              name="phone"
              type="text"
              className={`w-full h-full px-4 py-2 border-0 text-3xl ring-1 rounded-md focus:ring-2 focus:ring-inset focus:ring-bluePrime ${
                errorList.includes("phone")
                  ? "ring-alertRed placeholder-alertRed"
                  : "ring-bluePrime placeholder"
              }`}
              placeholder="Telefone"
              mask={"(99) 9.9999-9999"}
              maskChar={null}
              value={userData.phone}
              onChange={inputHandler}
              ref={phoneInputRef}
              title="Preencha com o seu numero de celular ou telefone"
              style={{
                fontSize: "24px",
                caretColor: "#03a8db 2px",
              }}
            />
          </div>
          <div className="sm:w-2/4 flex mt-5 text-start">
            <Checkbox
              name="checkbox"
              checked={userData.check}
              onChange={inputHandler}
              label={
                <Typography
                  variant="small"
                  color={`${errorList.includes("check") ? "red" : "gray"}`}
                >
                  Eu aceito os
                  <button
                    onClick={handleNavigateToPrivacyPolicy}
                    className="font-medium transition-colors hover:text-bluePrime2"
                  >
                    &nbsp;Termos & Condições
                  </button>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div
            class="h-14 w-3/5 bg-cyan-500 hover:bg-bluePrime2 rounded-2xl shadow mx-auto text-white flex items-center justify-center cursor-pointer"
            onClick={handleSubmit}
          >
            <span
              class="font-bold"
              onClick={(e) => {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: "dados-comprador" });
              }}
            >
              Prosseguir
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
