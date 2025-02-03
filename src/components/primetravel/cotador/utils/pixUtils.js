// src/utils/pixUtils.js

export const montarObjetoPix = (pagamento) => {
  if (!pagamento) {
    console.error('Pagamento está indefinido.');
    return null;
  }

  // Extrair as propriedades necessárias diretamente de 'pagamento'
  const {
    Nome,
    Sobrenome,
    Email,
    NumeroCPF,
    NumeroTelefone,
    Numero,
    // Adicione outras propriedades necessárias conforme a lógica
  } = pagamento;

  // Verificar se as propriedades essenciais estão presentes
  if (
    !Nome ||
    !Sobrenome ||
    !Email ||
    !NumeroCPF ||
    !NumeroTelefone ||
    !Numero
  ) {
    console.error(
      'Algumas propriedades essenciais estão faltando no objeto de pagamento.',
    );
    return null;
  }

  console.log('Dados de pagamento recebidos:', pagamento);

  // Montar o nome completo
  const nomeCompleto = `${Nome.trim()} ${Sobrenome.trim()}`;
  const email = Email.trim();
  const cpf = NumeroCPF.replace(/\D/g, '');

  // Processar o número de telefone
  const telefoneRaw = NumeroTelefone.replace(/\D/g, '');
  let area_code = '';
  let number = '';

  if (telefoneRaw.length >= 10) {
    // Considerando DDD (2) + Número (8)
    area_code = telefoneRaw.substring(0, 2);
    number = telefoneRaw.substring(2);
  } else {
    console.warn('Número de telefone insuficiente para extrair DDD e número.');
    area_code = '00'; // Valor padrão
    number = '00000000'; // Valor padrão
  }

  console.log(`Área de código: ${area_code}, Número: ${number}`);

  // Montar items
  const items = [
    {
      amount: parseInt((pagamento.Resume?.total || '0').replace(/\D/g, ''), 10), // Remover caracteres não numéricos e converter para inteiro
      description: 'Pagamento via PIX', // Descrição personalizada
      quantity: 1,
    },
  ];

  console.log('Items:', items);

  // Montar customer
  const customer = {
    name: nomeCompleto,
    email: email,
    type: 'individual',
    document: cpf,
    phones: {
      home_phone: {
        country_code: '55', // Código do país fixo para Brasil
        area_code: area_code,
        number: number,
      },
    },
  };

  console.log('Customer:', customer);

  // Montar pagamentos
  const payments = [
    {
      payment_method: 'pix',
      pix: {
        expires_in: '3600', // Tempo em segundos para expiração (exemplo: 1 hora)
        additional_information: [
          {
            name: 'Quantidade',
            value: '1', // Quantidade fixa para PIX
          },
        ],
      },
    },
  ];

  console.log('Payments:', payments);

  // Montar o objeto final
  const pixPaymentObject = {
    items,
    customer,
    payments,
  };

  console.log('Objeto PIX montado:', pixPaymentObject);

  return pixPaymentObject;
};
