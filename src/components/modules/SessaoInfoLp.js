import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faShieldAlt,
  faHeartbeat,
  faNotesMedical,
  faBalanceScale,
  faShieldVirus,
  faSuitcase,
  faHospital,
  faGlobe,
  faPhone,
  faMoneyBill,
  faMedkit,
  faTooth,
  faMobileAlt,
  faTools,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

const sessaoInfoLp = [
  {
    id: "1",
    title: "Residencial",
    subtitle: "Confira os Beneficios exclusivos que sua casa vai ter.",
    description: "",
    features: [
      {
        name: "Garanta até 20% de desconto",
        description: "",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
      {
        name: "Incêndio e Explosão",
        description: "",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
      {
        name: "Danos Elétricos",
        description: "",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
      {
        name: "Mais de 30 Coberturas 24h/dia",
        description: "",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
    ],
  },
  {
    id: "2",
    title: "Seguro de Viagem",
    subtitle: "Tudo o que você precisa para viajar com tranquilidade",
    description: "Proteja-se durante suas viagens com Prime Travel.",
    features: [
      {
        name: "Proteção contra COVID-19",
        description:
          "Cobertura especial para despesas relacionadas à COVID-19.",
        icon: <FontAwesomeIcon icon={faShieldVirus} />,
      },
      {
        name: "Extravio de Bagagem e Cancelamento de Viagem",
        description:
          "Cobertura para casos de extravio de bagagem e cancelamento de viagem.",
        icon: <FontAwesomeIcon icon={faSuitcase} />,
      },
      {
        name: "Despesas Médicas, Hospitalares e Odontológicas",
        description:
          "Reembolso de despesas médicas, hospitalares e odontológicas durante a viagem.",
        icon: <FontAwesomeIcon icon={faHospital} />,
      },
      {
        name: "Contratação 100% Online",
        description:
          "Facilidade e conveniência na contratação do seguro, tudo online.",
        icon: <FontAwesomeIcon icon={faGlobe} />,
      },
    ],
  },
  {
    id: "3",
    title: "Tudo que o seu Pet precisa e muito mais!",
    subtitle: "Benefícios do Nosso Plano de Saúde Pet",
    description:
      "Ao escolher nosso Plano de Saúde Pet, você garante uma série de benefícios exclusivos para o seu amado companheiro. Aqui estão algumas das vantagens que você e seu pet podem desfrutar:",
    features: [
      {
        name: "Cirurgias e Internação",
        description:
          "Nossos planos cobrem uma ampla gama de procedimentos cirúrgicos e internações, garantindo que seu pet receba o cuidado de que precisa quando mais precisa.",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
      {
        name: "Exames de Imagem e Laboratorial",
        description:
          "Oferecemos cobertura para uma variedade de exames de imagem e laboratoriais, permitindo diagnósticos precisos e tratamentos eficazes.",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
      {
        name: "Vacinas e Castração",
        description:
          "Mantenha seu pet protegido contra uma variedade de doenças com nossa cobertura para vacinas. Além disso, oferecemos cobertura para castração, ajudando a prevenir problemas de saúde e comportamentais.",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
      {
        name: "Coberturas e Assistências Exclusivas",
        description:
          "Nossos planos vão além do básico, oferecendo coberturas e assistências exclusivas para garantir o bem-estar total do seu pet.",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
      {
        name: "Atendimento 24/7",
        description:
          "Sabemos que emergências podem acontecer a qualquer momento. É por isso que oferecemos assistência qualificada 24 horas por dia para o seu pet.",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
      {
        name: "Descontos em Produtos PetLove:",
        description:
          "Como um bônus adicional, você receberá até 30% de desconto mais frete grátis em produtos PetLove, tornando mais fácil e acessível cuidar do seu pet.",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
    ],
  },
  {
    id: "4",
    title: "Benefícios Exclusivos em Vida",
    subtitle: "Tudo o que você precisa para sua tranquilidade",
    description: "",
    features: [
      {
        name: "Proteção Financeira",
        description:
          "Cobertura abrangente para proteger seus entes queridos em caso de falecimento.",
        icon: <FontAwesomeIcon icon={faShieldAlt} />,
      },
      {
        name: "Assistência em Vida",
        description:
          "Serviços exclusivos para cuidar da sua saúde e bem-estar durante a vida.",
        icon: <FontAwesomeIcon icon={faHeartbeat} />,
      },
      {
        name: "Suporte Financeiro em Doenças",
        description:
          "Ajuda financeira em casos de doenças graves, cobrindo despesas médicas e tratamentos.",
        icon: <FontAwesomeIcon icon={faNotesMedical} />,
      },
      {
        name: "Planejamento Sucessório",
        description:
          "Facilidade na transferência de recursos para beneficiários e proteção do seu legado.",
        icon: <FontAwesomeIcon icon={faBalanceScale} />,
      },
    ],
  },
  {
    id: "5",
    title: "Seguro Odontológico",
    subtitle: "Tudo o que você precisa para cuidar do seu sorriso",
    description:
      "Tenha tranquilidade e cuidado completo com seu sorriso por meio do nosso seguro odontológico.",
    features: [
      {
        name: "Ampla Rede de Dentistas",
        description:
          "Acesso a uma ampla rede de dentistas e especialistas em todo o país.",
        icon: <FontAwesomeIcon icon={faTooth} />,
      },
      {
        name: "Cobertura para Procedimentos Básicos e Especiais",
        description:
          "Cobertura abrangente para procedimentos básicos e especiais, como limpeza, restaurações, extrações e mais.",
        icon: <FontAwesomeIcon icon={faMedkit} />,
      },
      {
        name: "Reembolso de Despesas",
        description:
          "Reembolso de despesas com serviços odontológicos realizados fora da rede credenciada.",
        icon: <FontAwesomeIcon icon={faMoneyBill} />,
      },
      {
        name: "Atendimento Emergencial",
        description:
          "Atendimento emergencial 24 horas para casos de dor intensa ou emergências odontológicas.",
        icon: <FontAwesomeIcon icon={faPhone} />,
      },
    ],
  },
  {
    id: "6",
    title: "Seguro para Celular",
    subtitle:
      "Nosso seguro especializado oferece tudo o que você precisa para proteger seu celular contra imprevistos e danos.",
    description:
      "Proteja seu celular contra imprevistos e danos com nosso seguro especializado.",
    features: [
      {
        name: "Cobertura contra Roubo e Furto Qualificado",
        description:
          "Proteção contra roubo e furto qualificado do seu celular, mesmo quando estiver fora de casa.",
        icon: <FontAwesomeIcon icon={faShieldAlt} />,
      },
      {
        name: "Danos Acidentais e Quebra de Tela",
        description:
          "Cobertura para danos acidentais, incluindo quebra de tela e danos por líquidos.",
        icon: <FontAwesomeIcon icon={faMobileAlt} />,
      },
      {
        name: "Assistência Técnica",
        description:
          "Serviço de assistência técnica para reparos e suporte técnico do seu celular.",
        icon: <FontAwesomeIcon icon={faTools} />,
      },
      {
        name: "Cobertura em Viagens",
        description:
          "Cobertura estendida para seu celular durante viagens nacionais e internacionais.",
        icon: <FontAwesomeIcon icon={faPlane} />,
      },
    ],
  },
];

export default sessaoInfoLp;
