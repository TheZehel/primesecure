# Imagem base
FROM node:18.17.1

# Argumentos de build para os segredos e a porta
ARG REACT_APP_API_KEY_RD_STATION
ARG PORT_REACT

# Usuário não-root
RUN useradd -m myuser

# Diretório de trabalho no container
WORKDIR /usr/src/app

# Acesso ao package.json e o package-lock.json para aproveitar o cache do Docker
COPY package*.json ./

# Instala o pacote sed (se necessário)
RUN apt-get update && apt-get install -y sed

# Instalação das dependências
RUN npm install

# Listar diretórios e pacotes instalados para fins de depuração
RUN ls -al
RUN npm list

# Cria o arquivo .env a partir do valor do argumento de build
RUN echo "REACT_APP_API_KEY_RD_STATION=$REACT_APP_API_KEY_RD_STATION" > .env
RUN echo "PORT_REACT=$PORT_REACT" >> .env

# Copia de todos os arquivos do diretório atual para o container
COPY . .

# Muda a propriedade do diretório de trabalho
RUN chown -R myuser:myuser /usr/src/app

# Mude para o usuário não-root
USER myuser

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "sh", "-c", "PORT=$PORT_REACT npm start" ]