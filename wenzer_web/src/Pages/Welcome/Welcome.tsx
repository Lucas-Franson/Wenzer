import { ReactElement, useState } from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaLock, FaLightbulb, FaHandHoldingUsd } from 'react-icons/fa';
import WelcomeContext from './context';

import VipListForm from './components/VipListForm';
import EmailConfirmed from './components/EmailConfirmed';
import DialogTermsAndPolicy from '../../Components/DialogTermsPolicy';
import CardProject from './components/CardProject';

import bg_university from "../../Utils/image/bg_university.svg";
import bg_about from "../../Utils/image/bg_about.svg";

import {
  ContainerLogin,
  ContainerAbout, 
  ContainerUniversity,
  ContainerBusiness, 
  ContainerFooter,
  Container
} from "./styles";

function Welcome(): ReactElement {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isTerms, setIsTerms] = useState(false);

  const initialContext = {
    isEmailConfirmed,
    setIsEmailConfirmed,
  };

  function handleShowTerms() {
    setIsTerms(!isTerms);
  }

  //https://www.instagram.com/wenzeroficial/


  return (
    <WelcomeContext.Provider value={initialContext}>
      <Container>
        <ContainerLogin id="home">
          <header>
            <h1>Compartilhe experiência, ideias e projetos!</h1>
            <h2>
              Uma plataforma para publicar suas ideias ou participar projetos,
              ganhar experiencias em projetos que poderá agregar no seu
              portifólio!!{" "}
            </h2>
            {/* <img src={bg_register} alt="" /> */}
            <a href="#about">
              <button type="button">Saiba mais</button>
            </a>
          </header>

          <div>{!isEmailConfirmed ? <VipListForm /> : <EmailConfirmed />}</div>
        </ContainerLogin>

        <ContainerAbout id="about">
          <div>
            <img src={bg_about} alt="" />
          </div>
          <div className="alignRight">
            <p>Wenzer é uma rede social para projetos e ideias</p>
            <span>
              No Wenzer você pode publicar seu projeto ou ideia (ex: um website
              e-commerce), seja ele colaborativo para você ganhar experiencia
              encontrando outras pessoas para desenvolver com você, ou cobrando
              um valor $$ para que alguem desenvolva sua ideia!
            </span>
          </div>
        </ContainerAbout>

        <ContainerUniversity id="university">
          <div className="alignLeft">
            <p>Faça conexões e networking!</p>
            <span>
              Publique seu projeto com tags do seu interesse ou da universidade
              para encontrar universitários de areas comum com a suas ideias no
              seu próprio campus! Encontre pessoas com o mesmo interesse que
              você e expanda seu projeto para o mundo!
            </span>
          </div>
          <div>
            <img src={bg_university} alt="" />
          </div>
        </ContainerUniversity>

        <ContainerBusiness id="business">
          <header>
            <p>Você pode publicar seu projeto em 3 modalidades</p>
          </header>
          <main>
            <CardProject
              title="Projeto Gratuito!"
              description="Publique sua ideia de modo colaborativo para ganhar experiencia!"
            >
              <FaLightbulb size={100} />
            </CardProject>

            <CardProject
              title="Projeto Pago"
              description="Você pode pagar para uma alguem ou uma equipe desenvolver suas ideias direto pelo Wenzer!"
            >
              <FaHandHoldingUsd size={100} />
            </CardProject>
            <CardProject
              title="Projeto Privado"
              description="Limite quem pode ver ou participar! Compartilhe apenas com pessoas selecionadas"
            >
              <FaLock size={100} />
            </CardProject>
          </main>
        </ContainerBusiness>

        <ContainerFooter>
          <div>
            <section></section>
            <section>
              <strong>Informações</strong>
              <a href="#about">O que é o wenzer</a>
              <a href="#university">Como ganhar experiencia</a>
              <a href="#university">Como cobrar por um projeto</a>
            </section>
            <section>
              <strong>Plataforma</strong>
              <a href="#home">Cadastre-se</a>
            </section>
            <p>
              Siga o Wenzer:
              <a
                href="https://twitter.com/wenzeroficial"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter size={30} />{" "}
              </a>
              <a
                href="https://www.instagram.com/wenzeroficial/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://www.linkedin.com/company/wenzer"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin size={30} />
              </a>
            </p>
            <section></section>
          </div>
          <footer>
            <p>
              Wenzer é uma rede social com foco em publicações de projetos e
              compartilhamento de experiência.
            </p>
            <span>
              <a href="##" target="" onClick={handleShowTerms}>
                Termos e Condições |
              </a>{" "}
              <a href="##" target="" onClick={handleShowTerms}>
                Politica de Privacidade |
              </a>{" "}
              Wenzer 2021 ©
            </span>
          </footer>
        </ContainerFooter>

        <DialogTermsAndPolicy state={isTerms} handleChange={handleShowTerms} />
      </Container>
    </WelcomeContext.Provider>
  );
}

export default Welcome;