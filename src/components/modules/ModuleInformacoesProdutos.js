import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHouseMedicalFlag,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
import imageManagerInformacoesProdutos from "./bancoDeImagensInformacoesProdutos";

const InformacoesProdutos = [
  {
    id: "1",
    name: "Coberturas e Assistências Para Todos Os Tipos de Residência",
    image: imageManagerInformacoesProdutos.imgProdutos.imgResidencial,
    buttonText: "Realizar Cotação Online",
    link: "https://primesecure.com.br/seguro-residencial-porto-2/",
    title: "Tudo que o seu lar precisa!",
    description: "Conheça um pouco mais sobre os nossos planos.",
    features: [
      {
        name: "Habitual",
        description:
          "Mais de 10 coberturas para a sua casa, como amparo em caso de danos elétricos, roubos e furtos, danos à terceiros e mais. Conta também com diversos serviços 24H.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouse },
      },
      {
        name: "Premium",
        description:
          "Coberturas pensadas para casas de alto padrão. Essa categoria conta com garantias para obras de arte, joias e relógios. Conta com assistência a veículos de colecionadores.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseMedicalFlag },
      },
      {
        name: "Veraneio",
        description:
          "Ideal para manter sua casa de férias protegida, seja na praia ou no campo. Coberturas para roubos e furtos, desmoronamentos, danos elétricos e ao jardim, vazamentos. Tudo isso para que possa descansar em paz.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseUser },
      },
    ],
  },
  {
    id: "2",
    name: "Seguro Viagem",
    image: imageManagerInformacoesProdutos.imgProdutos.imgViagem,
    buttonText: "Cotar Agora",
    link: "https://primesecure.com.br/seguro-residencial-porto-2/",
    title: "Proteção em Todas as categorias de Viagem.",
    description:
      "Tudo o que você e seus companheiros de viagem merecem para uma viagem mais segura.",
    features: [
      {
        name: "Viagens Aéreas",
        description: "Coberturas que Garantem Sua segurança em Viagens Aéreas.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouse },
      },
      {
        name: "Viagens Marítimas",
        description: "Serviços exclusivos para as suas viagens marítimas",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseMedicalFlag },
      },
      {
        name: "Viagens Terrestres",
        description: "Proteção também para suas viagens terrestres.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseUser },
      },
    ],
  },
  {
    id: "3",
    name: "Garanta a saúde e a felicidade do seu pet com nossos planos de saúde abrangentes",
    image: imageManagerInformacoesProdutos.imgProdutos.imgPet,
    buttonText: "Cotar Agora",
    link: "https://primesecure.com.br/seguro-residencial-porto-2/",
    title: "Até 30% de Desconto Mais Frete Grátis em produtos PetLove",
    description: "As melhores condições em Planos de Saúde para o seu Pet.",
    features: [
      {
        name: "Escolha o Plano Perfeito para o seu Pet",
        description:
          "Temos quatro opções de planos de saúde personalizados para atender às necessidades únicas do seu pet. Explore cada plano e descubra as coberturas inclusas para escolher a melhor opção para o seu companheiro.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouse },
      },
      {
        name: "Obtenha um Orçamento Personalizado",
        description:
          "Está pronto para dar o próximo passo? Solicite um orçamento hoje mesmo. Nossa equipe de especialistas em saúde pet está à disposição para responder a todas as suas perguntas e ajudá-lo a escolher o plano certo para o seu pet.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseMedicalFlag },
      },
      {
        name: "Proteção Completa para o seu Pet",
        description:
          "Com a inscrição no nosso plano de saúde pet, a segurança do seu pet é imediatamente garantida. Simples assim! Lembre se, algumas coberturas podem ter um período de carência",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseUser },
      },
    ],
  },
  {
    id: "4",
    name: "Coberturas e Assistências Exclusivas",
    image: imageManagerInformacoesProdutos.imgProdutos.imgVida,
    buttonText: "Cotar Agora",
    link: "https://primesecure.com.br/seguro-residencial-porto-2/",
    title: "Seguro de Vida com Coberturas Para serem Usadas Ainda em Vida.",
    description: "",
    features: [
      {
        name: "Coberturas:",
        description:
          "Coberturas Para Morte(Natural, Cônjuge ou acidental), Invalidez Total ou Parcial, Doenças Graves, Despesas Médicas, hospitalares e odonto, doenças graves, Diária por incapacidade Temporária e Seguro Funeral.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouse },
      },
      {
        name: "Assistências",
        description:
          "Assistências feitas para garantir segurança aos seus beneficiários pós vida.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseMedicalFlag },
      },
      {
        name: "Médico Na Tela.",
        description:
          "Sistema de atendimento médico 100% online onde você realiza sua consulta através do seu celular, computador ou tablet. E ao final do seu atendimento você tem acesso a sua prescrição médica.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseUser },
      },
    ],
  },
  {
    id: "5",
    name: "Odonto",
    image: imageManagerInformacoesProdutos.imgProdutos.imgOdonto,
    buttonText: "Cotar Agora",
    link: "https://primesecure.com.br/seguro-residencial-porto-2/",
    title: "Faça um plano e cuide de você por inteiro",
    description:
      "Veja abaixo os benefficios que somente um plano odonto pode lhe oferecer.",
    features: [
      {
        name: "Saúde Bucal e Saúde Física",
        description:
          "Mantenha a sua saúde bucal e Física sempre em dia, evitando problemas de mastigação e doenças do coração.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouse },
      },
      {
        name: "Saúde Emocional",
        description:
          "Eles podem gerar dor de cabeça, problemas de mastigação e doenças do coração.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseMedicalFlag },
      },
      {
        name: "Saúde Financeira",
        description:
          "Tendo um tratamento dental em dia você mantém uma saúde financeira impecável.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseUser },
      },
    ],
  },
  {
    id: "6",
    name: "Principais Coberturas",
    image: imageManagerInformacoesProdutos.imgProdutos.imgCelular,
    buttonText: "Cotar Agora",
    link: "https://primesecure.com.br/seguro-residencial-porto-2/",
    title: "O Único Seguro Celular no Brasil com Cobertura Para Furto Simplesr",
    description: "Coberturas Para Aparelhos Novos ou Usados*",
    features: [
      {
        name: "Esteja sempre prevenido(a) contra: ",
        description:
          "Acidentes, casos de incêndio, Queda de raio, roubo ou furto, danos por agua ou outros tipos de líquidos.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouse },
      },
      {
        name: "Proteção Para o Seu modelo e SmartPhone preferido.",
        description: "Apple, Samsumg, Motorola, Xiaomi e Outras Marcas.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseMedicalFlag },
      },
      {
        name: "Proteção Total Para o Seu SmartPhone.",
        description:
          "Garanta proteção para o seu equipamento portátil. Com coberturas Nacionais e Internacionais.",
        icon: FontAwesomeIcon,
        iconProps: { icon: faHouseUser },
      },
    ],
  },
];

export default InformacoesProdutos;
