import { MapPin, PhoneCall, Stethoscope } from 'lucide-react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

export default function diferenciais(){
    return(
        <div>
            <div>
            <h1>Diferencias</h1>
            <h3>Confira as vantagens de ser cliente PrimeSecure</h3>
            </div>

            <div>
            <h3>
                <MapPin /> 
                A melhor rede internacional do mercado
            </h3>
            </div>

            <div>
            <h3>
                <Stethoscope />
                Cobertura para doenças preexistentes
                </h3>
            </div>

            <div>
            <h3>
                <PhoneCall />
                Atendimento 24h por dia em português
                </h3>
            </div>

            

            <div>
            <h3>Telemedicina</h3>
            </div>

            <div>
            <h3>Planos com coberturas para esportes de fazer e competição</h3>
            </div>
        </div>

    );
}