// Função para formatar o número do cartão
export const ccNumberFormated = (number) => {
    const cleanedNumber = number.replace(/\D/g, ""); // Remove tudo que não for dígito
    
    // Se não houver nenhum dígito, retorna o placeholder padrão
    if (!cleanedNumber) {
      return "0000 0000 0000 0000";
    }
    
    // Agrupa os dígitos em blocos de 4
    return cleanedNumber
      .match(/.{1,4}/g)
      ?.join(" ") || "";
  };
  
  // Função para formatar a data de expiração
  export  const formatExpirationDate = (dateString) => {
    // Remove tudo que não for dígito
    const cleaned = dateString.replace(/\D/g, "");
  
    // Caso o usuário não tenha digitado nada, retorna um placeholder
    if (!cleaned) {
      return "MM/AA";
    }
  
    // Caso o usuário tenha digitado 1 ou 2 dígitos, temos apenas o mês
    // Ex: "1" -> "1"
    //     "12" -> "12"
    if (cleaned.length <= 2) {
      return cleaned;
    }
  
    // Se temos mais de 2 dígitos, então temos mês e ano
    const month = cleaned.slice(0, 2);
    const year = cleaned.slice(2, 4);
  
    return `${month}/${year}`;
  };
  
  // Função para formatar o CVV (até 3 dígitos)
  export const formatCVC = (cvcString) => {
    //Remove todos oos caracteres que não sejam dígitos
    const cleaned = cvcString.replace(/\D/g, "");
  
    //Se não houver dígitos, retorna "000"
    if(!cleaned){
      return "000";
    }
  
    //Retorna no máximo 3 dígitos do que o usuário digitou
    return cleaned.slice(0,3);
  }