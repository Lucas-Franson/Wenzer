import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container } from './styles';

interface ITermsProps {
  state: boolean,
  handleChange(): void;
}

export default function AlertDialog({ state, handleChange}: ITermsProps) {
  return (
    <div>
      <Dialog
        open={state}
        onClose={handleChange}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Termos e Condições e Politicas de Privacidade"}
        </DialogTitle>
        <DialogContent>
          <Container>
            <h2>Política Privacidade</h2>
             
            <p>
              A sua privacidade é importante para nós. É política do Wenzer
              respeitar a sua privacidade em relação a qualquer informação sua
              que possamos coletar no site{" "}
              <a href="https://www.wenzer.com">Wenzer</a> e outros sites que
              possuímos e operamos.
            </p>
            <p>
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios
              justos e legais, com o seu conhecimento e consentimento. Também
              informamos por que estamos coletando e como será usado.
            </p>
            <p>
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados,
              protegemos dentro de meios comercialmente aceitáveis ​​para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.
            </p>
            <p>
              Não compartilhamos informações de identificação pessoal
              publicamente ou com terceiros, exceto quando exigido por lei
            </p>
            <p>
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas{" "}
              <a
                href="https://politicaprivacidade.com"
                target="_BLANK"
                rel="noreferrer"
              >
                políticas de privacidade
              </a>
              .
            </p>
            <p>
              Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados.
            </p>
            <p>
              O uso continuado de nosso site será considerado como aceitação de
              nossas práticas em torno de privacidade e informações pessoais. Se
              você tiver alguma dúvida sobre como lidamos com dados do usuário e
              informações pessoais, entre em contacto connosco.
            </p>
             
            <h2>Política de Cookies Wenzer</h2>  
            <h3>O que são cookies?</h3>
             
            <p>
              Como é prática comum em quase todos os sites profissionais, este
              site usa cookies, que são pequenos arquivos baixados no seu
              computador, para melhorar sua experiência. Esta página descreve
              quais informações eles coletam, como as usamos e por que às vezes
              precisamos armazenar esses cookies. Também compartilharemos como
              você pode impedir que esses cookies sejam armazenados, no entanto,
              isso pode fazer o downgrade ou 'quebrar' certos elementos da
              funcionalidade do site.
            </p>
             
            <h3>Como usamos os cookies?</h3>
             
            <p>
              Utilizamos cookies por vários motivos, detalhados abaixo.
              Infelizmente, na maioria dos casos, não existem opções padrão do
              setor para desativar os cookies sem desativar completamente a
              funcionalidade e os recursos que eles adicionam a este site. É
              recomendável que você deixe todos os cookies se não tiver certeza
              se precisa ou não deles, caso sejam usados ​​para fornecer um
              serviço que você usa.
            </p>
             
            <h3>Desativar cookies</h3>
             
            <p>
              Você pode impedir a configuração de cookies ajustando as
              configurações do seu navegador (consulte a Ajuda do navegador para
              saber como fazer isso). Esteja ciente de que a desativação de
              cookies afetará a funcionalidade deste e de muitos outros sites
              que você visita. A desativação de cookies geralmente resultará na
              desativação de determinadas funcionalidades e recursos deste site.
              Portanto, é recomendável que você não desative os cookies.
            </p>
             
            <h3>Cookies que definimos</h3>
             
            <ul>
              <li>
                {" "}
                Cookies relacionados à conta
                  Se você criar uma conta connosco, usaremos cookies para o
                gerenciamento do processo de inscrição e administração geral.
                Esses cookies geralmente serão excluídos quando você sair do
                sistema, porém, em alguns casos, eles poderão permanecer
                posteriormente para lembrar as preferências do seu site ao sair.
                 
                 
              </li>
              <li>
                {" "}
                Cookies relacionados ao login
                  Utilizamos cookies quando você está logado, para que
                possamos lembrar dessa ação. Isso evita que você precise fazer
                login sempre que visitar uma nova página. Esses cookies ão
                normalmente removidos ou limpos quando você efetua logout para
                garantir que você possa acessar apenas a recursos e áreas
                restritas ao efetuar login.
                 
                 
              </li>
              <li>
                {" "}
                Cookies relacionados a boletins por e-mail
                  Este site oferece serviços de assinatura de boletim
                informativo ou e-mail e os cookies podem ser usados ​​para
                lembrar se você já está registrado e se deve mostrar
                determinadas notificações válidas apenas para usuários inscritos
                / não inscritos.
                 
                 
              </li>
              <li>
                {" "}
                Pedidos processando cookies relacionados
                  Este site oferece facilidades de comércio eletrônico ou
                pagamento e alguns cookies são essenciais para garantir que seu
                pedido seja lembrado entre as páginas, para que possamos
                processá-lo adequadamente.
                 
                 
              </li>
              <li>
                {" "}
                Cookies relacionados a pesquisas
                  Periodicamente, oferecemos pesquisas e questionários para
                fornecer informações interessantes, ferramentas úteis ou para
                entender nossa base de usuários com mais precisão. Essas
                pesquisas podem usar cookies para lembrar quem já participou
                numa pesquisa ou para fornecer resultados precisos após a
                alteração das páginas.
                 
                 
              </li>
              <li>
                {" "}
                Cookies relacionados a formulários
                  Quando você envia dados por meio de um formulário como os
                encontrados nas páginas de contacto ou nos formulários de
                comentários, os cookies podem ser configurados para lembrar os
                detalhes do usuário para correspondência futura.
                 
                 
              </li>
              <li>
                {" "}
                Cookies de preferências do site
                  Para proporcionar uma ótima experiência neste site,
                fornecemos a funcionalidade para definir suas preferências de
                como esse site é executado quando você o usa. Para lembrar suas
                preferências, precisamos definir cookies para que essas
                informações possam ser chamadas sempre que você interagir com
                uma página for afetada por suas preferências.
                 
              </li>
            </ul>
             
            <h3>Compromisso do Usuário</h3>
             
            <p>
              O usuário se compromete a fazer uso adequado dos conteúdos e da
              informação que o Wenzer oferece no site e com caráter enunciativo,
              mas não limitativo:
            </p>
            <ul>
              <li>
                A) Não se envolver em atividades que sejam ilegais ou contrárias
                à boa fé a à ordem pública;
              </li>
              <li>
                B) Não difundir propaganda ou conteúdo de natureza racista,
                xenofóbica, ou casas de apostas legais (ex.:
                <a href="https://ondeapostar.pt/review/betano/"> Betano</a>),
                jogos de sorte e azar, qualquer tipo de pornografia ilegal, de
                apologia ao terrorismo ou contra os direitos humanos;
              </li>
              <li>
                C) Não causar danos aos sistemas físicos (hardwares) e lógicos
                (softwares) do Wenzer, de seus fornecedores ou terceiros, para
                introduzir ou disseminar vírus informáticos ou quaisquer outros
                sistemas de hardware ou software que sejam capazes de causar
                danos anteriormente mencionados.
              </li>
            </ul>
             
            <h3>Mais informações</h3>
             
            <p>
              Esperemos que esteja esclarecido e, como mencionado anteriormente,
              se houver algo que você não tem certeza se precisa ou não,
              geralmente é mais seguro deixar os cookies ativados, caso interaja
              com um dos recursos que você usa em nosso site.
            </p>
             
            <small>
              Esta política é efetiva a partir de <strong>June</strong>/
              <strong>2021</strong>.
            </small>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChange} color="primary">
            Discordo
          </Button>
          <Button onClick={handleChange} color="primary" autoFocus>
            Concordo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
