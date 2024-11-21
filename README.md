# Documentação Prime Secure

Bem-vindo ao **Prime Secure**, um marketplace de seguros que protege seus momentos. Este projeto é desenvolvido com React e gerenciado com Create React App.

## Visão Geral

Este projeto utiliza várias bibliotecas modernas para a construção de uma interface rica e interativa. A documentação técnica é gerada automaticamente usando o **JSDoc**.

Acesse as [páginas geradas pelo JSDoc](./index.html) para uma visão técnica detalhada.

---

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

- Inicia a aplicação em modo de desenvolvimento.
- Acesse em [http://localhost:3000](http://localhost:3000) no navegador.
- O projeto será recarregado automaticamente ao salvar alterações no código.

### `npm run build`

- Gera o build de produção na pasta `build`.
- Otimiza o React para um melhor desempenho.

### `npm test`

- Executa os testes em modo interativo.

### `npm run docs`

- Gera a documentação técnica usando o JSDoc.
- Os arquivos são salvos no diretório `docs`.

### `npm run generate:sitemap`

- Gera o arquivo `sitemap.xml` automaticamente baseado nas rotas do projeto.

### `npm run eject`

- Remove a dependência de build integrada do React para maior flexibilidade.
- **Nota:** Uma vez feito, não pode ser revertido.

---

## Tecnologias Utilizadas

### Principais Dependências:

- **React 18:** Para construir interfaces reativas.
- **React Router 6:** Gerenciamento de rotas.
- **Axios:** Comunicação com APIs.
- **Moment.js:** Manipulação de datas e horários.
- **Swiper.js:** Carrossel responsivo.
- **PrimeReact:** Componentes avançados de UI.

### Estilo e Design:

- **TailwindCSS:** Utilizado para estilização rápida e eficiente.
- **Font Awesome:** Ícones para melhorar a experiência visual.
- **Animate.css:** Animações pré-configuradas para elementos.

### Documentação:

- **JSDoc:** Geração de documentação de código.
- **@TheZehel/jsdoc-template:** Template moderno para páginas de documentação.
- **Markdown Plugin:** Permite a inclusão de markdown na documentação.

### Testes:

- **React Testing Library:** Testes de componentes React.
- **Jest:** Testes unitários e integração.

---

## Estrutura do Projeto

```plaintext
.
├── src/                     # Código-fonte da aplicação
│   ├── components/          # Componentes React reutilizáveis
│   ├── assets/              # Imagens, ícones e outros recursos estáticos
│   ├── css/                 # Arquivos CSS globais
├── docs/                    # Documentação gerada automaticamente pelo JSDoc
├── utils/                   # Funções utilitárias e geradores (ex: sitemap)
├── public/                  # Arquivos públicos (favicon, index.html)
├── README.md                # Documentação do projeto
├── jsdoc.json               # Configuração do JSDoc
├── package.json             # Configuração do projeto e dependências
├── tailwind.config.js       # Configuração do TailwindCSS
├── sitemap.xml              # Gerado automaticamente pelo script generate:sitemap
└── .env                     # Variáveis de ambiente
```

## Como Gerar a Documentação

1. Certifique-se de que todas as dependências estão instaladas:

   ```bash
   npm install
   ```

2. Certifique-se de que todas as dependências estão instaladas:

   ```bash
   npm run docs
   ```

3. Acesse os arquivos gerados no diretório `/docs`

### Metadados do Projeto

- **Nome:** `webapp-primesecure`
- **Versão:** `0.3.0`
- **Licença:** Não especificada no `package.json`.
- **Scripts principais:**
  - **Build de produção:** `npm run build`
  - **Documentação:** `npm run docs`
  - **Início do servidor local:** `npm start`
