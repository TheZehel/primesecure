// Mapeamento de cidades para siglas
const cityToUF = {
  // ACRE
  'rio branco': 'AC',
  riobranco: 'AC',
  acre: 'AC',

  // ALAGOAS
  maceio: 'AL',
  maceió: 'AL',
  alagoas: 'AL',

  // AMAPÁ
  macapa: 'AP',
  macapá: 'AP',
  amapa: 'AP',

  // AMAZONAS
  manaus: 'AM',
  amazonas: 'AM',

  // BAHIA
  salvador: 'BA',
  bahia: 'BA',

  // CEARÁ
  fortaleza: 'CE',
  ceara: 'CE',
  ceará: 'CE',

  // DISTRITO FEDERAL
  brasilia: 'DF',
  brasília: 'DF',
  'distrito federal': 'DF',

  // ESPÍRITO SANTO
  vitoria: 'ES',
  vitória: 'ES',
  'espirito santo': 'ES',
  'espírito santo': 'ES',

  // GOIÁS
  goiania: 'GO',
  goiânia: 'GO',
  goias: 'GO',
  goiás: 'GO',

  // MARANHÃO
  'sao luis': 'MA',
  'são luís': 'MA',
  maranhao: 'MA',
  maranhão: 'MA',

  // MATO GROSSO
  cuiaba: 'MT',
  cuiabá: 'MT',
  'mato grosso': 'MT',

  // MATO GROSSO DO SUL
  'campo grande': 'MS',
  campogrande: 'MS',
  'mato grosso do sul': 'MS',

  // MINAS GERAIS
  'belo horizonte': 'MG',
  belohorizonte: 'MG',
  bh: 'MG',
  'minas gerais': 'MG',

  // PARÁ
  belem: 'PA',
  belém: 'PA',
  para: 'PA',
  pará: 'PA',

  // PARAÍBA
  'joao pessoa': 'PB',
  'joão pessoa': 'PB',
  paraiba: 'PB',
  paraíba: 'PB',

  // PARANÁ
  curitiba: 'PR',
  parana: 'PR',
  paraná: 'PR',

  // PERNAMBUCO
  recife: 'PE',
  pernambuco: 'PE',

  // PIAUÍ
  teresina: 'PI',
  piaui: 'PI',
  piauí: 'PI',

  // RIO DE JANEIRO
  'rio de janeiro': 'RJ',
  rj: 'RJ',

  // RIO GRANDE DO NORTE
  natal: 'RN',
  'rio grande do norte': 'RN',
  riograndedonorte: 'RN',

  // RIO GRANDE DO SUL
  'porto alegre': 'RS',
  portoalegre: 'RS',
  'rio grande do sul': 'RS',
  riograndedosul: 'RS',
  rs: 'RS',

  // RONDÔNIA
  'porto velho': 'RO',
  portovelho: 'RO',
  rondonia: 'RO',
  rondônia: 'RO',

  // RORAIMA
  'boa vista': 'RR',
  boavista: 'RR',
  roraima: 'RR',

  // SANTA CATARINA
  florianopolis: 'SC',
  florianópolis: 'SC',
  'santa catarina': 'SC',
  santacatarina: 'SC',

  // SÃO PAULO
  'sao paulo': 'SP',
  'são paulo': 'SP',
  sp: 'SP',

  // SERGIPE
  aracaju: 'SE',
  sergipe: 'SE',

  // TOCANTINS
  palmas: 'TO',
  tocantins: 'TO',
};

// Função principal que normaliza a string e busca a UF
export function getStateCodeFromCity(cityName) {
  if (!cityName) return '';
  const lowerCity = cityName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Se existir no dicionário, retorna a sigla
  if (cityToUF[lowerCity]) {
    return cityToUF[lowerCity];
  }

  // Se não achar, retorna algo default (por ex. 'SP')
  return 'SP';
}
