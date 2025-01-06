import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useTransition, animated } from 'react-spring';

const faqs = [
  {
    question: '1 - Como funciona o Plano?',
    answer:
      'Somos um Plano de Saúde para Cães e Gatos. Você paga uma mensalidade fixa e o seu pet pode ser atendido em uma das mais de 400 Clínicas da nossa Rede Credenciada. Faça seu cadastro, adicione o pet e escolha o Plano que mais se encaixa nas suas necessidades. Após a compra, você também poderá adicionar no seu Espaço do cliente: Banhos, Fisioterapia e Acupuntura, caso seu amiguinho precise.',
  },
  {
    question: '2 - Como funciona a Microchipagem? É seguro para meu pet?',
    answer:
      "Você não precisa levar nada no dia da Microchipagem do seu amiguinho. A Clínica irá solicitar apenas seu CPF para conferência dos dados cadastrados. Caso seu pet já seja microchipado não é necessário realizar o procedimento novamente, basta entrar em contato com nossa equipe para registro. O microchip é uma forma moderna de identificar o animal de estimação de um modo eficaz e seguro. Trata-se de um micro-circuito eletrônico, de tamanho aproximado a um grão de arroz, implantado sob a pele. Caso o animal se perca ou até mesmo seja roubado, pode ser identificado facilmente por meio de seu microchip. Funciona como um 'RG eletrônico'. Não é feito nenhum tipo de anestesia nem sedação, é como se fosse uma injeção comum e deve ser colocado na região da nuca, pois facilita a leitura. Se você quer saber mais, acesse o artigo: Principais benefícios do microchip em seu pet, no nosso blog.",
  },
  {
    question: '3 - E se meu pet já for microchipado?',
    answer:
      'Caso seu pet já seja microchipado não é necessário realizar o procedimento novamente, basta entrar em contato com nossa equipe para registro.',
  },
  {
    question: '4 - Tenho descontos se eu comprar para mais de 1 pet?',
    answer:
      ' Com certeza! Nossos descontos são progressivos: para o segundo pet você ganha 10% de desconto, para o terceiro 20% de desconto e do quarto pet em diante você ganha 30% de desconto nos Planos de Saúde contratados. Os descontos são calculados automaticamente no momento da sua compra.',
  },
  {
    question:
      '5 - Acabei de contratar o Plano, quando começam a contar as carências?',
    answer:
      'Assim que seu pagamento for processado, você receberá um e-mail onde deverá clicar no link de confirmação da compra. Após esse passo, entre em contato com a Clínica de sua preferência para agendar a colocação do Microchip no seu pet. Lembre-se: suas carências começam a contar a partir da data da Microchipagem. Os procedimentos mais essenciais como consultas, vacinas, procedimentos clínicos e internações têm apenas 45 dias de carência. Os exames e consultas com especialistas 60 dias, já as cirurgias e anestesia possuem 120 dias, por serem procedimentos mais delicados. Após a compra, você pode antecipar algumas carências através do Espaço do cliente e utilizar o Plano imediatamente. Vale lembrar que a antecipação da carência é somente para aquele procedimento específico e não para o grupo inteiro de procedimentos.',
  },
  {
    question: '6 - Como funciona a copartipação nos Planos?',
    answer:
      'A coparticipação é uma pequena taxa que você paga na utilização de alguns procedimentos. Na maioria das vezes, este valor é pago diretamente para a Clínica, e apenas em anestesias e exames que os valores são pagos para Petlove. Os valores são tabelados, não sofrendo alterações.',
  },
  {
    question:
      '7 - Onde posso ver o que já utilizei pelo Plano e o que ainda tenho direito?',
    answer:
      'É muito fácil. No Espaço do cliente, você pode ver o prontuário online do Plano do seu pet, assim como os procedimentos que ainda podem ser realizados. Faça o login com e-mail e senha para acessar.',
  },
  {
    question: '8 - O site é seguro?',
    answer:
      'Sim! Nossa plataforma conta com as mais modernas ferramentas para garantir navegação segura através de uma transação de dados codificada e eficiente. As informações cadastrais são sigilosas e de uso exclusivo da Petlove, de acordo com suas permissões.',
  },
  {
    question: '9 - Quais as formas de pagamento da Petlove?',
    answer:
      'A forma mais usual de pagamento é o cartão de crédito, aceitando as principais bandeiras utilizadas no país, como Visa, Mastercard e outras. Para maior conveniência, você pode optar pelo pagamento mensal, que não compromete o limite total do seu cartão, sendo necessário apenas o valor contratado disponível na data de cobrança. Também oferecemos a opção de pagamento via Pix, garantindo ainda mais praticidade e agilidade. ',
  },
  {
    question:
      '10 - Precisa ser eu para levar meu pet para consultar ou pode ser outra pessoa?',
    answer:
      'No momento do atendimento seu pet será identificado pelo número do Microchip, portanto pode ser outra pessoa para levá-lo, como por exemplo um familiar.',
  },
  {
    question:
      '11 - Quanto custa para antecipar as carências dos procedimentos?',
    answer:
      'A seguir, exemplificamos algumas antecipações de carência de alguns procedimentos. Os valores de exemplo já contam com a coparticipação dos procedimentos, ou seja, já representam o valor total que será gasto para realização do procedimento + antecipação da carência e você deve pagar no cartão de crédito. Consulta em horário normal - em torno de R$ 80. Vacina Polivalente / Quádrupla - em torno de R$ 70. Vacina da Raiva - em torno de R$ 40. Vale lembrar que a antecipação da carência é somente para aquele procedimento específico e não para o grupo inteiro de procedimentos. OBS: Caso você esteja precisando utilizar mais de 1 vez o procedimento escolhido, você deve aumentar o número de quantidades. Os limites e carências são comprados de forma avulsa! Eventual saldo existente de utilização não é cumulativo e não será transferido para a renovação do plano.',
  },
  {
    question: '12 - As vacinas são importadas ou nacionais?',
    answer:
      'A Petlove trabalha apenas com Clínicas de alto padrão em atendimento. Assim sendo, exigimos das nossas credenciadas que todas as vacinas dadas sejam as importadas, fornecendo maior qualidade para nossos clientes.',
  },
  {
    question: '13 - Meus procedimentos são limitados?',
    answer:
      'Alguns procedimentos são limitados, mas não se preocupe: caso você exceda-os pode incluí-los de forma avulsa em seu Plano. É fácil e prático, você mesmo faz diretamente no seu Espaço do cliente em nosso site. Alguns procedimentos possuem limites individuais e outros em grupo. Cada vez que você realizar um procedimento que pertence a um grupo indicado, o limite será descontado do total do grupo. Vale lembrar que a inclusão de mais limites é somente para aquele procedimento específico e não para o grupo inteiro de procedimentos. OBS: Caso você esteja precisando utilizar mais de 1 vez o procedimento escolhido, você deve aumentar o número de quantidades. Os limites são comprados de forma avulsa! Eventual saldo existente de utilização não é cumulativo e não será transferido para a renovação do plano.',
  },
  {
    question: '14 - Como renovo minha assinatura?',
    answer: 'A renovação é automática, você não precisa se preocupar com isso.',
  },
  {
    question:
      '15 - Como sei os horários de funcionamento, endereço e o que as clínicas credenciadas realizam pelo Plano?',
    answer:
      'Todas essas informações encontram-se na aba Rede Credenciada em nosso site ou no Espaço do Cliente. Basta acessá-la e usar os filtros para saber onde levar seu amiguinho.',
  },
  {
    question:
      '16 - Como faço para trocar de Plano? O que acontece com as carências dos procedimentos?',
    answer:
      "Você pode realizar a migração de plano entrando em contato conosco pelo telefone! Você pode realizar 1 troca a cada 12 meses. Os dias de carência dos procedimentos coexistentes entre os Planos continuam correndo normalmente. As carências dos procedimentos novos passam a contar a partir da data da troca. Caso seja um 'upgrade' de Plano será cobrada a diferença das mensalidades no momento da troca e o valor do novo Plano virá na próxima fatura.",
  },
  {
    question:
      '17 - Já tenho um Plano Petlove contratado e quero comprar para mais pets, como faço?',
    answer:
      'É muito simples. Basta adicionar o pet no Espaço do cliente. Os descontos serão calculados automaticamente :)',
  },
  {
    question: '18 - O que não está coberto pelos Planos?',
    answer:
      'Os medicamentos Citrato de maropitant, Cefovecina sódica e Meropenem, tampouco estão inclusos os materiais cirúrgicos usados em cirurgias ortopédicas como próteses, placas, parafusos e órteses.',
  },
  {
    question:
      '19 - As mensalidades sofrem algum reajuste anual? Os preços variam conforme a idade dos meus pets?',
    answer:
      'Pode ocorrer dos valores serem reajustados, porém somente no mês de aniversário do seu Plano. Por exemplo: caso você tenha contratado em junho de 2018, no mês de junho de 2019 poderemos reajustar os valores e assim consequentemente. O novo valor é calculado de acordo com a inflação do período. Não se preocupe, os preços não variam conforme a idade dos seus pets.',
  },
];

export default function FaqPet() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    if (index === activeIndex) {
      // se o índice ativo for clicado novamente, colapsa a resposta
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const transitions = useTransition(activeIndex, {
    from: { maxHeight: '0px', opacity: 0 },
    enter: { maxHeight: '1000px', opacity: 1 },
    leave: { maxHeight: '0px', opacity: 0 },
  });

  return (
    <div className="w-4/5  mx-auto py-2 sm:py-2 mt-10 text-grayPrime">
      <h2 className="text-center text-primary font-bold mb-13 text-2xl sm:text-5xl mb-16">
        Dúvidas Frequentes
      </h2>
      <div className="space-y-6 text-start">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-md p-4">
            <div
              className="flex justify-between items-start cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <p className="font-medium">{faq.question}</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transform transition-transform duration-200 ${
                  index === activeIndex ? 'rotate-180' : ''
                }`}
              />
            </div>
            {transitions(
              (style, item) =>
                item === index && (
                  <animated.div style={style} className="overflow-hidden">
                    <p className="mt-2">{faq.answer}</p>
                  </animated.div>
                ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
