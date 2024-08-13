const ListaPaises = [
  { value: "Brasil", label: "Brasil", regiao: "1" },
  { value: "Múltiplos Destinos", label: "Múltiplos Destinos", regiao: "8" },

  //Estados Unidos e Canadá
  { value: "Estados Unidos", label: "Estados Unidos", regiao: "4" },
  { value: "Canadá", label: "Canadá", regiao: "4" },

  //Europa
  { value: "França", label: "França", regiao: "3" },
  { value: "Espanha", label: "Espanha", regiao: "3" },
  { value: "Itália", label: "Itália", regiao: "3" },
  { value: "Reino Unido", label: "Reino Unido", regiao: "3" },
  { value: "Alemanha", label: "Alemanha", regiao: "3" },
  { value: "Grécia", label: "Grécia", regiao: "3" },
  { value: "Portugal", label: "Portugal", regiao: "3" },
  { value: "Áustria", label: "Áustria", regiao: "3" },
  { value: "Turquia", label: "Turquia", regiao: "3" },
  { value: "Bélgica", label: "Bélgica", regiao: "3" },
  { value: "Holanda", label: "Holanda", regiao: "3" },
  { value: "Suíça", label: "Suíça", regiao: "3" },
  { value: "Suécia", label: "Suécia", regiao: "3" },
  { value: "Noruega", label: "Noruega", regiao: "3" },
  { value: "Dinamarca", label: "Dinamarca", regiao: "3" },
  { value: "Albânia", label: "Albânia", regiao: "3" },
  { value: "Andorra", label: "Andorra", regiao: "3" },
  { value: "Armênia", label: "Armênia", regiao: "3" },
  { value: "Bielorrússia", label: "Bielorrússia", regiao: "3" },
  { value: "Bósnia e Herzegovina", label: "Bósnia e Herzegovina", regiao: "3" },
  { value: "Bulgária", label: "Bulgária", regiao: "3" },
  { value: "Chipre", label: "Chipre", regiao: "3" },
  { value: "Croácia", label: "Croácia", regiao: "3" },
  { value: "Eslováquia", label: "Eslováquia", regiao: "3" },
  { value: "Eslovênia", label: "Eslovênia", regiao: "3" },
  { value: "Estônia", label: "Estônia", regiao: "3" },
  { value: "Finlândia", label: "Finlândia", regiao: "3" },
  { value: "Geórgia", label: "Geórgia", regiao: "3" },
  { value: "Hungria", label: "Hungria", regiao: "3" },
  { value: "Irlanda", label: "Irlanda", regiao: "3" },
  { value: "Islândia", label: "Islândia", regiao: "3" },
  { value: "Letônia", label: "Letônia", regiao: "3" },
  { value: "Liechtenstein", label: "Liechtenstein", regiao: "3" },
  { value: "Lituânia", label: "Lituânia", regiao: "3" },
  { value: "Luxemburgo", label: "Luxemburgo", regiao: "3" },
  { value: "Macedônia do Norte", label: "Macedônia do Norte", regiao: "3" },
  { value: "Malta", label: "Malta", regiao: "3" },
  { value: "Moldávia", label: "Moldávia", regiao: "3" },
  { value: "Mônaco", label: "Mônaco", regiao: "3" },
  { value: "Montenegro", label: "Montenegro", regiao: "3" },
  { value: "Polônia", label: "Polônia", regiao: "3" },
  { value: "República Tcheca", label: "República Tcheca", regiao: "3" },
  { value: "Romênia", label: "Romênia", regiao: "3" },
  { value: "Rússia", label: "Rússia", regiao: "3" },
  { value: "San Marino", label: "San Marino", regiao: "3" },
  { value: "Sérvia", label: "Sérvia", regiao: "3" },
  { value: "Ucrânia", label: "Ucrânia", regiao: "3" },
  { value: "Vaticano", label: "Vaticano", regiao: "3" },
  { value: "Azerbaijão", label: "Azerbaijão", regiao: "3" },
  { value: "Ilhas Faroé", label: "Ilhas Faroé", regiao: "3" },
  { value: "Gibraltar", label: "Gibraltar", regiao: "3" },
  { value: "Kosovo", label: "Kosovo", regiao: "3" },
  { value: "Liechtenstein", label: "Liechtenstein", regiao: "3" },
  { value: "Malta", label: "Malta", regiao: "3" },
  { value: "Ilha de Man", label: "Ilha de Man", regiao: "3" },
  { value: "Moldávia", label: "Moldávia", regiao: "3" },
  { value: "Principado de Mônaco", label: "Principado de Mônaco", regiao: "3" },
  { value: "Montenegro", label: "Montenegro", regiao: "3" },
  { value: "San Marino", label: "San Marino", regiao: "3" },
  { value: "Escócia", label: "Escócia", regiao: "3" },
  { value: "País de Gales", label: "País de Gales", regiao: "3" },
  { value: "Sérvia", label: "Sérvia", regiao: "3" },
  { value: "Eslovênia", label: "Eslovênia", regiao: "3" },
  {
    value: "Ilhas Svalbard e Jan Mayen",
    label: "Ilhas Svalbard e Jan Mayen",
    regiao: "3",
  },
  { value: "Suíça", label: "Suíça", regiao: "3" },
  { value: "Ucrânia", label: "Ucrânia", regiao: "3" },
  { value: "País de Gales", label: "País de Gales", regiao: "3" },

  //América Latina (inclui México)
  { value: "Argentina", label: "Argentina", regiao: "2" },
  { value: "Bolívia", label: "Bolívia", regiao: "2" },
  { value: "Chile", label: "Chile", regiao: "2" },
  { value: "Colômbia", label: "Colômbia", regiao: "2" },
  { value: "Cuba", label: "Cuba", regiao: "2" },
  { value: "Equador", label: "Equador", regiao: "2" },
  { value: "Guiana", label: "Guiana", regiao: "2" },
  { value: "Paraguai", label: "Paraguai", regiao: "2" },
  { value: "México", label: "México", regiao: "2" },
  { value: "Peru", label: "Peru", regiao: "2" },
  { value: "Suriname", label: "Suriname", regiao: "2" },
  { value: "Uruguai", label: "Uruguai", regiao: "2" },
  { value: "Venezuela", label: "Venezuela", regiao: "2" },
  { value: "El Salvador", label: "El Salvador", regiao: "2" },

  //Ásia
  { value: "Afeganistão", label: "Afeganistão", regiao: "5" },
  { value: "Arábia Saudita", label: "Arábia Saudita", regiao: "5" },
  { value: "Armênia", label: "Armênia", regiao: "5" },
  { value: "Azerbaijão", label: "Azerbaijão", regiao: "5" },
  { value: "Bahrein", label: "Bahrein", regiao: "5" },
  { value: "Bangladesh", label: "Bangladesh", regiao: "5" },
  { value: "Brunei", label: "Brunei", regiao: "5" },
  { value: "Butão", label: "Butão", regiao: "5" },
  { value: "Camboja", label: "Camboja", regiao: "5" },
  { value: "Cazaquistão", label: "Cazaquistão", regiao: "5" },
  { value: "China", label: "China", regiao: "5" },
  { value: "Coreia do Norte", label: "Coreia do Norte", regiao: "5" },
  { value: "Coreia do Sul", label: "Coreia do Sul", regiao: "5" },
  {
    value: "Emirados Árabes Unidos",
    label: "Emirados Árabes Unidos",
    regiao: "5",
  },
  { value: "Filipinas", label: "Filipinas", regiao: "5" },
  { value: "Geórgia", label: "Geórgia", regiao: "5" },
  { value: "Índia", label: "Índia", regiao: "5" },
  { value: "Indonésia", label: "Indonésia", regiao: "5" },
  { value: "Irã", label: "Irã", regiao: "5" },
  { value: "Iraque", label: "Iraque", regiao: "5" },
  { value: "Israel", label: "Israel", regiao: "5" },
  { value: "Japão", label: "Japão", regiao: "5" },
  { value: "Jordânia", label: "Jordânia", regiao: "5" },
  { value: "Kuwait", label: "Kuwait", regiao: "5" },
  { value: "Laos", label: "Laos", regiao: "5" },
  { value: "Líbano", label: "Líbano", regiao: "5" },
  { value: "Malásia", label: "Malásia", regiao: "5" },
  { value: "Maldivas", label: "Maldivas", regiao: "5" },
  { value: "Mianmar", label: "Mianmar", regiao: "5" },
  { value: "Mongólia", label: "Mongólia", regiao: "5" },
  { value: "Nepal", label: "Nepal", regiao: "5" },
  { value: "Omã", label: "Omã", regiao: "5" },
  { value: "Paquistão", label: "Paquistão", regiao: "5" },
  { value: "Qatar", label: "Qatar", regiao: "5" },
  { value: "Quirguistão", label: "Quirguistão", regiao: "5" },
  { value: "Rússia", label: "Rússia", regiao: "5" },
  { value: "Singapura", label: "Singapura", regiao: "5" },
  { value: "Síria", label: "Síria", regiao: "5" },
  { value: "Sri Lanka", label: "Sri Lanka", regiao: "5" },
  { value: "Tadjiquistão", label: "Tadjiquistão", regiao: "5" },
  { value: "Tailândia", label: "Tailândia", regiao: "5" },
  { value: "Taiwan", label: "Taiwan", regiao: "5" },
  { value: "Timor-Leste", label: "Timor-Leste", regiao: "5" },
  { value: "Turcomenistão", label: "Turcomenistão", regiao: "5" },
  { value: "Turquia", label: "Turquia", regiao: "5" },
  { value: "Uzbequistão", label: "Uzbequistão", regiao: "5" },
  { value: "Vietnã", label: "Vietnã", regiao: "5" },
  { value: "Iêmen", label: "Iêmen", regiao: "5" },
  { value: "Turcomenistão", label: "Turcomenistão", regiao: "5" },
  { value: "Uzbequistão", label: "Uzbequistão", regiao: "5" },
  { value: "Vietnã", label: "Vietnã", regiao: "5" },
  { value: "Iêmen", label: "Iêmen", regiao: "5" },
  { value: "Timor-Leste", label: "Timor-Leste", regiao: "5" },

  //África
  { value: "África do Sul", label: "África do Sul", regiao: "6" },
  { value: "Angola", label: "Angola", regiao: "6" },
  { value: "Argélia", label: "Argélia", regiao: "6" },
  { value: "Benim", label: "Benim", regiao: "6" },
  { value: "Botsuana", label: "Botsuana", regiao: "6" },
  { value: "Burquina Faso", label: "Burquina Faso", regiao: "6" },
  { value: "Burundi", label: "Burundi", regiao: "6" },
  { value: "Cabo Verde", label: "Cabo Verde", regiao: "6" },
  { value: "Camarões", label: "Camarões", regiao: "6" },
  { value: "Chade", label: "Chade", regiao: "6" },
  { value: "Comores", label: "Comores", regiao: "6" },
  { value: "Congo", label: "Congo", regiao: "6" },
  { value: "Costa do Marfim", label: "Costa do Marfim", regiao: "6" },
  { value: "Djibuti", label: "Djibuti", regiao: "6" },
  { value: "Egito", label: "Egito", regiao: "6" },
  { value: "Eritreia", label: "Eritreia", regiao: "6" },
  { value: "Essuatíni", label: "Essuatíni", regiao: "6" },
  { value: "Etiópia", label: "Etiópia", regiao: "6" },
  { value: "Gabão", label: "Gabão", regiao: "6" },
  { value: "Gâmbia", label: "Gâmbia", regiao: "6" },
  { value: "Gana", label: "Gana", regiao: "6" },
  { value: "Guiné", label: "Guiné", regiao: "6" },
  { value: "Guiné-Bissau", label: "Guiné-Bissau", regiao: "6" },
  { value: "Guiné Equatorial", label: "Guiné Equatorial", regiao: "6" },
  { value: "Lesoto", label: "Lesoto", regiao: "6" },
  { value: "Libéria", label: "Libéria", regiao: "6" },
  { value: "Líbia", label: "Líbia", regiao: "6" },
  { value: "Madagascar", label: "Madagascar", regiao: "6" },
  { value: "Malawi", label: "Malawi", regiao: "6" },
  { value: "Mali", label: "Mali", regiao: "6" },
  { value: "Marrocos", label: "Marrocos", regiao: "6" },
  { value: "Maurícia", label: "Maurícia", regiao: "6" },
  { value: "Mauritânia", label: "Mauritânia", regiao: "6" },
  { value: "Moçambique", label: "Moçambique", regiao: "6" },
  { value: "Namíbia", label: "Namíbia", regiao: "6" },
  { value: "Níger", label: "Níger", regiao: "6" },
  { value: "Nigéria", label: "Nigéria", regiao: "6" },
  { value: "Quênia", label: "Quênia", regiao: "6" },
  {
    value: "República Centro-Africana",
    label: "República Centro-Africana",
    regiao: "6",
  },
  {
    value: "República Democrática do Congo",
    label: "República Democrática do Congo",
    regiao: "6",
  },
  { value: "Ruanda", label: "Ruanda", regiao: "6" },
  { value: "Saara Ocidental", label: "Saara Ocidental", regiao: "6" },
  { value: "São Tomé e Príncipe", label: "São Tomé e Príncipe", regiao: "6" },
  { value: "Seicheles", label: "Seicheles", regiao: "6" },
  { value: "Senegal", label: "Senegal", regiao: "6" },
  { value: "Serra Leoa", label: "Serra Leoa", regiao: "6" },
  { value: "Somália", label: "Somália", regiao: "6" },
  { value: "Sudão", label: "Sudão", regiao: "6" },
  { value: "Sudão do Sul", label: "Sudão do Sul", regiao: "6" },
  { value: "Tanzânia", label: "Tanzânia", regiao: "6" },
  { value: "Togo", label: "Togo", regiao: "6" },
  { value: "Tunísia", label: "Tunísia", regiao: "6" },
  { value: "Uganda", label: "Uganda", regiao: "6" },
  { value: "Zâmbia", label: "Zâmbia", regiao: "6" },
  { value: "Zimbábue", label: "Zimbábue", regiao: "6" },

  //Oceania
  { value: "Austrália", label: "Austrália", regiao: "7" },
  { value: "Fiji", label: "Fiji", regiao: "7" },
  { value: "Ilhas Marshall", label: "Ilhas Marshall", regiao: "7" },
  { value: "Ilhas Salomão", label: "Ilhas Salomão", regiao: "7" },
  { value: "Kiribati", label: "Kiribati", regiao: "7" },
  { value: "Micronésia", label: "Micronésia", regiao: "7" },
  { value: "Nauru", label: "Nauru", regiao: "7" },
  { value: "Nova Zelândia", label: "Nova Zelândia", regiao: "7" },
  { value: "Palau", label: "Palau", regiao: "7" },
  { value: "Papua-Nova Guiné", label: "Papua-Nova Guiné", regiao: "7" },
  { value: "Samoa", label: "Samoa", regiao: "7" },
  { value: "Tonga", label: "Tonga", regiao: "7" },
  { value: "Tuvalu", label: "Tuvalu", regiao: "7" },
  { value: "Vanuatu", label: "Vanuatu", regiao: "7" },
];

export default ListaPaises;