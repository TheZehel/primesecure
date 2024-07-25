const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const staticPages = [
  'index',
  'cotacao-pet-love',
  'sobre',
  'contato',
  'primetravel',
  'seguro-de-vida',
  'equipamentos-portateis-3',
  'seguro-pet-porto',
  'seguro-residencial-porto-2',
  'sulamerica-odonto',
  'obrigado',
  'cotacao',
  'politicas-de-privacidade',
  'rede-credenciada',
  'cotacao-pet-love',
  'cotacao-vida-sulamerica',
  'seguro-bike',
  'seguro-viagem'
];

const botRegex = /bot|crawl|googlebot|slurp|spider/i;

const staticContents = staticPages.reduce((acc, page) => {
  const filePath = path.join(__dirname, 'src', 'static', `${page}.html`);
  if (fs.existsSync(filePath)) acc[page] = fs.readFileSync(filePath, 'utf8');
  return acc;
}, {});

app.get('*', (req, res, next) => {
  const { path: reqPath, headers } = req;
  const userAgent = headers['user-agent'];
  var page = reqPath.slice(1).split("/")[0].toLowerCase();
  if (page === "") page = "index";

  const isBot = (botRegex.test(userAgent) && staticPages.includes(page) && staticContents[page]);

  if (isBot) {
    return res.send(staticContents[page]);
  }

  next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));