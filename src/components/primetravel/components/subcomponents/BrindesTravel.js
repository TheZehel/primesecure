import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import imageManagerPrimeTravel from "../../bancodeimagens/BancoDeImagensPrimeTravel";

export default function BrindesTravel() {
  function modalBrindes(open){
    if (!open){ return(<div></div>) }
    return(
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{zIndex: '80'}}>
        <div class="fixed inset-0 bg-black bg-opacity-60 transition-opacity" onClick={()=>{ openModal(false); }}></div>
        <div class="fixed inset-0 z-10 overflow-y-auto" style={{zIndex: '80'}}> 
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" style={{maxWidth: '26rem'}}>
              <div class="bg-white">
                <div class="flex px-4 pb-2 pt-2 sm:p-4" style={{padding: '0.5rem 1rem', borderBottom: '1px solid #dee2e6'}}>
                  <h3 style={{fontSize: '1.25rem'}}>Brindes Prime Travel</h3>
                  <div style={{margin: 'auto 10px auto auto', display: 'flex', fontSize: '25px', color: '#313131', cursor: 'pointer'}} onClick={()=>{ openModal(false); }}><FontAwesomeIcon icon={faTimes}/></div>
                </div>
                <div class="flex" style={{padding: '20px 50px'}}>
                  <div style={{width: '100%', borderRadius: '10px', boxShadow: '0 0 10px rgba(96, 134, 181, .3)', textAlign: 'center', border: '1px solid rgba(0,0,0,.125)', margin: '0 auto'}}>
                    <img
                      style={{width: '100%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
                      src={imageManagerPrimeTravel.ImagensLandPage.ImgAlmofadas}
                      alt="Almofadas FOM"
                      className=""
                    />
                    <div style={{textAlign: 'center', padding: '1rem'}}>
                      <h5 style={{marginBottom: '0.5rem', fontSize: '1.25rem'}}>Almofada Fom</h5>
                      <p style={{color: '#919096', lineHeight: '1.6rem', marginBottom: '0.8rem', fontSize: '1.1em'}}>A partir de R$449,90</p>
                      <p style={{color: '#919096', lineHeight: '1.6rem', marginBottom: '1rem', fontSize: '1.1em'}}>Uma opção perfeita para quem quer garantir um ótimo descanço e conforto na próxima viagem</p>
                    </div>
                  </div>
                </div>
                    <div style={{alignItems: 'center', borderBottomLeftRadius: 'calc(0.3rem - 1px)', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderTop: '1px solid #dee2e6', display: 'flex', flexShrink: '0', flexWrap: 'wrap', justifyContent: 'flex-end', padding: '0.5rem 0.75rem'}}>
                      <button onClick={()=>{ openModal(false); }} style={{cursor: 'pointer', margin: '0.25rem', backgroundColor: '#273b97', borderColor: '#273b97', color: '#fff', border: '1px solid transparent', borderRadius: '0.25rem', fontSize: '1rem', fontWeight: '400', lineHeight: '1.9', padding: '0 0.60rem', textAlign: 'center', textDecoration: 'none', transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out'
                      }}>Fechar</button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [modalOpen, openModal] = useState(false);

  return (
    <div className="overflow-hidden bg-white font-sans mt-1 mb-8">
      {modalBrindes(modalOpen)}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-5 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="relative">
            <img
              style={{maxWidth: '75%', margin: '0 auto'}}
              src={imageManagerPrimeTravel.ImagensLandPage.ImgAlmofadas2}
              alt="Brindes exclusivos"
              className=""
            />
          </div>
          <div className="lg:pr-8 lg:pt-4 flex">
            <div className="lg:max-w-lg" style={{textAlign: 'left', marginTop: 'auto', marginBottom: 'auto'}}>
              <h1 className="font-semibold text-grayPrime" style={{fontSize: '1.5rem'}}>
                Ganhe Um Presente Especial Ao Contratar o Seu Seguro de Viagem.
              </h1>
              <p className="mt-4" style={{color: "#919096", fontSize: "1.1rem"}}>
                *Consulte as Condições de resgate do presente*
              </p>
              <button
                style={{width: '100%', fontWeight: '400', borderRadius: '0.3rem', fontSize: '1.25rem', padding: '0.5rem 1rem', lineHeight: '1.9'}}
                onClick={() => { openModal(true); }}
                className="mt-5 bg-bluePrime hover:bg-bluePrime2 text-white font-bold py-2 px-4 rounded w-2/4"
              >
                Veja as Condições de Resgate
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
