import imageManager from "../bancoDeImagens";

export default function PrivacyPolicy() {
  return (
    <section className="font-montserrat text-grayPrime">
      <div className="bg-white mx-2 sm:mx-40 xl:mx-80 rounded-xl shadow-xl p-5 xl:p-20 my-16">
        {/* INTRODUÇÃO */}
        <h2 className="text-center text-primary font-bold mb-13 text-2xl sm:text-5xl  ">
          Politícas de Privacidade
        </h2>
        <p className="text-md text-justify  my-5 mx-10">
          <span className="font-bold">Bem-vindo à Prime Secure.</span> Somos um
          marketplace de seguros que oferece atendimento online profissional,
          possibilitando compras 100% online. Esta Política de Privacidade tem
          como objetivo explicar a coleta, uso e proteção de suas informações
          pessoais.
        </p>
        {/* 1. Informações Coletadas */}
        <h2 className="text-start my-5 mx-10my-5 mx-10 text-lg font-bold">
          1. Informações Coletadas
        </h2>
        <p className="text-md text-justify  my-5 mx-10">
          Coletamos dados gerais através de cookies e informações pessoais, como
          nome, e-mail, telefone, CPF, endereço e dados de pagamento.
          Ressaltamos que todos os dados de pagamento são criptografados para
          assegurar sua segurança.
        </p>
        {/* 2. Uso dos Dados */}
        <h2 className="text-start my-5 mx-10my-5 mx-10 text-lg font-bold">
          2. Uso dos Dados
        </h2>
        <p className="text-md text-justify  my-5 mx-10">
          Utilizamos suas informações para fins de publicidade, processamento de
          pedidos, marketing e análise de dados, visando sempre aprimorar nossos
          serviços e proporcionar uma experiência personalizada.
        </p>
        {/* 3. Compartilhamento de Dados */}
        <h2 className="text-start my-5 mx-10my-5 mx-10 text-lg font-bold">
          3. Compartilhamento de Dados
        </h2>
        <p className="text-md text-justify  my-5 mx-10">
          Os seus dados podem ser compartilhados com empresas parceiras e
          prestadoras da Prime Secure, a fim de oferecer novos serviços e
          produtos personalizados para você.
        </p>
        {/* 4. Segurança dos Dados */}
        <h2 className="text-start my-5 mx-10my-5 mx-10 text-lg font-bold">
          4. Segurança dos Dados
        </h2>
        <p className="text-md text-justify  my-5 mx-10">
          Priorizamos a segurança de seus dados. Somente colaboradores seniores,
          seguindo rigorosos protocolos de ética, têm acesso às informações.
          Adotamos as melhores práticas de cibersegurança para prevenir acessos
          não autorizados ou vazamentos.
        </p>
        {/* 5. Direitos dos Usuários */}
        <h2 className="text-start my-5 mx-10my-5 mx-10 text-lg font-bold">
          5. Direitos dos Usuários
        </h2>
        <p className="text-md text-justify  my-5 mx-10">
          Você tem o direito de solicitar a exclusão dos seus dados de nossa
          base. Para tal, entre em contato através dos meios disponibilizados, e
          providenciaremos a remoção de suas informações.
        </p>
        {/* 6. Tecnologias Utilizadas */}
        <h2 className="text-start my-5 mx-10my-5 mx-10 text-lg font-bold">
          6. Tecnologias Utilizadas
        </h2>
        <p className="text-md text-justify  my-5 mx-10">
          Empregamos tecnologias como Google Analytics, Microsoft Clarity,
          Pixel, RD Station e Facebook para melhorar sua experiência em nosso
          site.
        </p>
        {/* 7. Contato */}
        <h2 className="text-start my-5 mx-10my-5 mx-10 text-lg font-bold">
          7. Contato
        </h2>
        <p className="text-md text-justify  my-5 mx-10">
          Para dúvidas relacionadas à privacidade, entre em contato conosco:{" "}
          <br /> <br />
          <span className="font-bold">Telefone:</span> 11 3511-0708 <br />
          <span className="font-bold">
            Email:
          </span> corretora@primesecure.com.br <br />
          <span className="font-bold">WhatsApp:</span> 11 96653-4903
        </p>
        {/* 8. Alterações na Política de Privacidade */}
        <h2 className="text-start my-5 mx-10my-5 mx-10 text-lg font-bold">
          8. Alterações na Política de Privacidade
        </h2>
        <p className="text-md text-justify  my-5 mx-10">
          Reservamo-nos o direito de modificar esta política a qualquer momento.
          As alterações serão comunicadas via e-mail cadastrado. Recomendamos a
          revisão periódica desta política.
        </p>
      </div>
    </section>
  );
}
