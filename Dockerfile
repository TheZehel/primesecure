# Imagem Node Official

FROM node:14

# Cria um volume para node_modules

VOLUME [ "/usr/src/app/node_modules" ]

# Usuário não-root

RUN useradd -m myuser

# Diretório de trabalho no container

WORKDIR /usr/src/app

# Acesso ao package.json e o package-lock.json para aproveitar o cache do Docker

COPY package*.json ./

# Instalação das dependências

RUN npm install

# Cópia do arquivo ".env"" se disponível

COPY .env .env

# Copia de todos os arquivos do diretório atual para o container

COPY . .

# Muda a propriedade do diretório de trabalho

RUN chown -R myuser:myuser /usr/src/app

# Mude para o usuário não-root

USER myuser

# Expõe a porta que a aplicação usa

EXPOSE 3000

# Comando para rodar a aplicação

CMD [ "npm", "start" ]