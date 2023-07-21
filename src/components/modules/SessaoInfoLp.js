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
  faVirus,
  faPhone,
  faMoneyBill,
  faMedkit,
  faTooth,
  faMobileAlt,
  faTools,
  faPlane,
  faClinicMedical,
  faPrescriptionBottleAlt,
  faRunning,
  faAmbulance,
  faHospitalUser,
  faBan,
  faStop,
  faPlaneDelay,
  faSuitcaseRolling,
  faSearch,
  faBriefcase,
  faPeopleArrows,
  faHome,
  faMoneyBillWave,
  faWheelchair,
  faSkullCrossbones,
  faHearse,
  faConciergeBell,
  faInfoCircle,
  faEnvelope,
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
        name: "Despesas Médicas e Hospitalares",
        description:
          "Cobertura para despesas médicas e hospitalares necessárias devido a doença ou acidente durante a viagem.",
        icon: <FontAwesomeIcon icon={faClinicMedical} />,
      },
      {
        name: "Despesas Médicas e Hospitalares (COVID)",
        description:
          "Cobertura para despesas médicas e hospitalares relacionadas ao COVID-19 durante a viagem.",
        icon: <FontAwesomeIcon icon={faVirus} />,
      },
      {
        name: "Despesas odontológicas",
        description:
          "Consiste na de prestação de serviço(s) ou indenização na forma de reembolso, das despesas odontológicas efetuadas pelo segurado para seu tratamento sob orientação médica, ocasionado por acidente pessoal ou enfermidade súbita e aguda ocorrida durante o período de viagem.",
        icon: <FontAwesomeIcon icon={faTooth} />,
      },
      {
        name: "Despesas farmacêuticas",
        description:
          "Consiste no reembolso das despesas com a compra de medicamentos necessários em virtude de atendimento médico ou odontológico emergencial e decorrente de acidente pessoal coberto ou doença de caráter súbito ocorridos durante a viagem segurada efetuadas pelo segurado para seu tratamento.",
        icon: <FontAwesomeIcon icon={faPrescriptionBottleAlt} />,
      },
      {
        name: "Prática esportiva Amadora",
        description:
          "Cobertura para despesas médicas e danos pessoais relacionados à prática de esportes amadores durante a viagem.",
        icon: <FontAwesomeIcon icon={faRunning} />,
      },
      {
        name: "Regresso sanitário",
        description:
          "Consiste na prestação de serviço(s) ou na indenização na forma de reembolso das despesas com o traslado de regresso do segurado para o local de origem da viagem ou de seu domicílio, caso este não se encontre em condições de retornar como passageiro regular por motivo de acidente pessoal ou enfermidade cobertos.",
        icon: <FontAwesomeIcon icon={faAmbulance} />,
      },
      {
        name: "Traslado Médico",
        description:
          "Consiste na prestação de serviço(s) ou indenização na forma de reembolso, das despesas com a remoção ou transferência do segurado até a clínica ou hospital mais próximo em condições de atendê-lo, por motivo de acidente pessoal ou enfermidade cobertos ocorrido durante o período de viagem.",
        icon: <FontAwesomeIcon icon={faHospitalUser} />,
      },
      {
        name: "Cancelamento de viagem",
        description:
          "Consiste no reembolso das despesas não reembolsáveis com a aquisição de pacotes turísticos e/ou serviços de viagens, como transporte e hospedagem, na ocorrência de evento coberto que impeça o segurado de iniciar a viagem.",
        icon: <FontAwesomeIcon icon={faBan} />,
      },
      {
        name: "Interrupção de viagem",
        description:
          "Consiste no reembolso ao segurado ou a seu beneficiário das perdas irrecuperáveis com depósitos e/ou despesas pagas por antecipação em referência à viagem do segurado.",
        icon: <FontAwesomeIcon icon={faStop} />,
      },
      {
        name: "Atraso de voo (superior 12h)",
        description:
          "A política cobre reembolsos para despesas de alimentação e hospedagem em caso de atrasos de voo de 12 horas ou mais, causados por clima severo, questões trabalhistas ou quebras inesperadas na aeronave. Isso se aplica apenas se a companhia aérea não cobrir essas despesas.",
        icon: <FontAwesomeIcon icon={faStop} />,
      },
      {
        name: "Atraso de bagagem (superior 12h)",
        description:
          "A política prevê reembolso de despesas com artigos de uso pessoal se a bagagem do segurado for atrasada em 8 horas ou mais pela companhia transportadora. A reclamação deve ser comprovada por meio de um relatório de irregularidade de bagagem (PIR ou RIB).",
        icon: <FontAwesomeIcon icon={faSuitcaseRolling} />,
      },
      {
        name: "Auxílio na localização de bagagem",
        description:
          "A central de assistência ajudará o beneficiário em caso de extravio ou roubo de bagagem, bem como na perda de documentos de viagem ou cartão de crédito, fornecendo instruções para fazer a denúncia e auxiliar na recuperação desses itens.",
        icon: <FontAwesomeIcon icon={faSearch} />,
      },
      {
        name: "Perda de bagagem - garantia suplementar",
        description:
          "Consiste no pagamento da diferença do valor pago pela cia aérea até o limite total da cobertura.",
        icon: <FontAwesomeIcon icon={faBriefcase} />,
      },
      {
        name: "Retorno antecipado de acompanhantes",
        description:
          "A política cobre o reembolso da passagem aérea para o retorno do acompanhante do segurado ao seu país de origem, caso o segurado seja impedido de concluir a viagem devido a doença, acidente ou morte. Isso se aplica quando o acompanhante não pode retornar pelo meio originalmente planejado.",
        icon: <FontAwesomeIcon icon={faPeopleArrows} />,
      },
      {
        name: "Retorno antecipado do segurado",
        description:
          "A política reembolsa despesas de retorno do segurado ao seu domicílio se a viagem for interrompida devido a doença, acidente ou morte do companheiro de viagem ou membro da família, ou problemas em sua residência como incêndio, explosão ou roubo. Membros da família e companheiros de viagem são definidos por relações conjugais, parentais ou convivência durante a viagem.",
        icon: <FontAwesomeIcon icon={faHome} />,
      },
      {
        name: "Assistência Jurídica p/ Acidentes de Trânsito",
        description:
          "Assistência jurídica para lidar com questões legais resultantes de acidentes de trânsito durante a viagem.",
        icon: <FontAwesomeIcon icon={faBalanceScale} />,
      },
      {
        name: "Transferência de fundos",
        description:
          "Em caso de necessidade durante a viagem, a política cobre o envio de uma quantia para pagamento de uma fiança penal, após o depósito do valor pela família do beneficiário. O valor coberto é apenas o custo da transferência. Este serviço é oferecido uma única vez e aplica-se mesmo se o beneficiário for detido devido a um acidente de trânsito. A cobertura tem um limite especificado nas condições gerais.",
        icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
      },
      {
        name: "Invalidez permanente total ou parcial por acidente",
        description:
          "Consiste no pagamento de indenização ao segurado, em caso de perda, redução ou impotência funcional definitiva, total ou parcial, dos membros ou órgãos definidos no bilhete, em decorrência de lesão física sofrida pelo segurado, provocada por acidente pessoal ocorrido durante o período de viagem. Após conclusão do tratamento, ou esgotados os recursos terapêuticos disponíveis para recuperação, constatada e avaliada a invalidez permanente quando da alta médica definitiva, a sociedade seguradora deve pagar uma indenização.",
        icon: <FontAwesomeIcon icon={faWheelchair} />,
      },
      {
        name: "Morte acidental",
        description:
          "Consiste no pagamento do capital segurado ao(s) beneficiário(s) indicado(s) no bilhete, de uma única vez, em caso de falecimento do segurado, por acidente pessoal ocorrido durante o período de viagem.",
        icon: <FontAwesomeIcon icon={faSkullCrossbones} />,
      },
      {
        name: "Traslado de corpo",
        description:
          "Consiste em trazer o corpo do local do óbito até o domicílio ou local do sepultamento.",
        icon: <FontAwesomeIcon icon={faSkullCrossbones} />,
      },
      {
        name: "Concierge",
        description:
          "O Serviço de Concierge, disponível 24/7, auxilia os beneficiários com informações sobre ingressos para shows, viagens, aluguel de veículos e reservas de teatro em grandes cidades do mundo. Os custos e despesas relacionados aos serviços solicitados são responsabilidade do beneficiário. Este serviço é puramente informativo.",
        icon: <FontAwesomeIcon icon={faConciergeBell} />,
      },
      {
        name: "Informação em caso de perda/roubo de documento",
        description:
          "A central assessorará ao beneficiário em caso de perda de documentos de viagens e ou cartão de crédito, oferecendo as instruções para que o beneficiário possa fazer o respectivo denuncio, e processar a recuperação dessa documentação.",
        icon: <FontAwesomeIcon icon={faInfoCircle} />,
      },
      {
        name: "Transmissão de mensagens urgentes",
        description:
          "A central transmitirá as mensagens urgentes e justificadas, relativas a qualquer um dos eventos que são objeto das prestações contempladas nas Condições Gerais desse seguro.",
        icon: <FontAwesomeIcon icon={faEnvelope} />,
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
