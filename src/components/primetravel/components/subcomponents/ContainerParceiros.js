import React from "react";
import imageManagerPrimeTravel from "../../bancodeimagens/BancoDeImagensPrimeTravel";

function ContainerParceiros() {
    return(
        <div style={{maxWidth: '1110px', margin: '0 auto 60px auto', display: 'flex', flexWrap: 'wrap', color: '#3a3a3a', textAlign: 'justify', fontSize: '1.2rem'}}>
            <div style={{width: '550px', padding: '0px 12px', margin: '24px auto 0 auto', minWidth: '375px'}}>
                <img src={imageManagerPrimeTravel.ImagensLandPage.ImgLogoTooSeguros2} alt="Logo Btg Pactual" style={{width: '30%', margin: '0 auto'}} />
                <p style={{padding: '25px 30px 10px'}}>
                    Banking and Trading Group Pactual é um banco de investimento brasileiro, especializado em capital de investimento e capital de risco, além da administração de fundos de investimento, de gerenciamento de patrimônio, e de ativos globais - investment banking, wealth management e global asset management.
                </p>
            </div>
            <div style={{width: '550px', padding: '0px 12px', margin: '24px auto 0 auto'}}>
                <img src={imageManagerPrimeTravel.ImagensLandPage.ImgLogoPactual} alt="Logo Too Seguros" style={{width: '30%', margin: '0 auto'}} />
                <p style={{padding: '25px 30px 10px'}}>
                    A Too Seguros mantém o propósito de impactar cada vez mais pessoas com soluções de seguros. Possui acionistas como CAIXA Econômica e BTG. Hoje é uma referência no setor e continua na missão de simplificar o segurês e construir um relacionamento sólido com seus parceiros e clientes.
                </p>
            </div>
        </div>
    )
}
export default ContainerParceiros;