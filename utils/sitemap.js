const { SitemapStream } = require("sitemap");
const { createWriteStream } = require("fs");
const fs = require("fs");

// Cria o diretório 'public' se ele não existir
if (!fs.existsSync("../public/")) {
  fs.mkdirSync("../public/");
}

// Configura o sitemap stream
const stream = new SitemapStream({ hostname: "https://primesecure.com.br" });

// Pipe o sitemap para um arquivo
const writeStream = createWriteStream("./public/sitemap.xml");
stream.pipe(writeStream);

// Definindo as rotas do seu site
const links = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/login", changefreq: "monthly", priority: 0.6 },
  { url: "/cotacao-pet-love", changefreq: "monthly", priority: 0.5 },
  { url: "/sobre", changefreq: "monthly", priority: 0.5 },
  { url: "/contato", changefreq: "monthly", priority: 0.5 },
  { url: "/primetravel", changefreq: "monthly", priority: 0.5 },
  { url: "/seguro-de-vida", changefreq: "monthly", priority: 0.5 },
  { url: "/equipamentos-portateis-3", changefreq: "monthly", priority: 0.5 },
  { url: "/seguro-pet-porto", changefreq: "monthly", priority: 0.5 },
  { url: "/seguro-residencial-porto-2", changefreq: "monthly", priority: 0.5 },
  { url: "/sulamerica-odonto", changefreq: "monthly", priority: 0.5 },
  { url: "/obrigado", changefreq: "monthly", priority: 0.1 },
  { url: "/cotacao", changefreq: "monthly", priority: 0.1 },
];

// Adiciona URLs ao sitemap
links.forEach((link) => {
  stream.write(link);
});

// Finaliza o stream
stream.end();
