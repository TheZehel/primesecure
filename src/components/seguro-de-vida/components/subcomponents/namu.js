import React from "react";

const NamuSection = () => {
  return (
    <div className="flex flex-col md:flex-row m-5">
      <div className="md:w-1/2">
        <img
          src="https://storage.googleapis.com/primesecure/banners/banners-junho/1e7f0b9a-app_10ip0ev000000000000000.png"
          alt="App Namu"
          className="w-full h-auto"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center p-4 text-start ">
        <h1 className="text-xl font-bold mb-2">Aplicativo Namu</h1>
        <p className="text-base">
          O aplicativo 360° de bem-estar que vai te ajudar a perder peso, ficar
          ativo, aprender novas práticas e cuidar da saúde mental.
        </p>
      </div>
    </div>
  );
};

export default NamuSection;
