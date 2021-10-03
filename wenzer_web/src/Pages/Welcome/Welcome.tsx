import { ReactElement, useState } from 'react';
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaLock,
  FaLightbulb,
  FaHandHoldingUsd,
  FaAngleDoubleUp,
  FaArrowUp
} from "react-icons/fa";
import WelcomeContext from './context';

import DialogTermsAndPolicy from '../../Components/DialogTermsPolicy';
import CardProject from './components/CardProject';
import bg_university from "../../Utils/image/bg_university.svg";
import bg_about from "../../Utils/image/bg_about.svg";
import Login from '../Auth/Login/LoginForm';

import {
  ContainerLogin,
  ContainerAbout, 
  ContainerNetworking,
  ContainerProject, 
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

  return (
    <WelcomeContext.Provider value={initialContext}>
      <Container>
        <ContainerLogin id="home">
          <header>
            <h1>Compartilhe experiência, ideias e projetos!</h1>
            <h2>
              Uma plataforma para publicar suas ideias ou participar de
              projetos, ganhar experiencias em projetos que poderá agregar no
              seu portifólio.
            </h2>
            <a href="#about">
              <button type="button">Saiba mais</button>
            </a>
          </header>

          <main><Login/></main>
        </ContainerLogin>

        <ContainerAbout id="about">
          <header>
            <div>
              <img src={bg_about} alt="Sobre o Wenzer" />
            </div>
            <div className="alignRight">
              <p>Wenzer é uma rede social para projetos e ideias</p>
              <span>
                No Wenzer você pode publicar seu projeto ou ideia (ex: um
                website e-commerce), seja ele colaborativo para você ganhar
                experiência encontrando outras pessoas para desenvolver com
                você, ou cobrando um valor $$ para que alguem desenvolva sua
                ideia!
              </span>
            </div>
          </header>
          <main>
            <div className="AboutIcon">
              <FaAngleDoubleUp size={50} />
            </div>
            <div className="AboutContent">
              <p>Tenha sua primeira experiêcia em projetos reais!</p>
            </div>
            <div className="AboutNone"></div>
          </main>
        </ContainerAbout>

        <ContainerNetworking id="networking">
          <header>
            <div className="alignLeft">
              <p>Faça conexões e networking!</p>
              <span>
                Publique seu projeto com tags do seu interesse ou da
                universidade para encontrar universitários de areas comum com a
                suas ideias no seu próprio campus! Encontre pessoas com o mesmo
                interesse que você e expanda seu projeto para o mundo!
              </span>
            </div>
            <div>
              <img src={bg_university} alt="" />
            </div>
          </header>
          <footer>
            <p>
              Conectando você e o mundo através da <span>sua ideia!</span>
            </p>
          </footer>
        </ContainerNetworking>

        <ContainerProject id="project">
          <header>
            <p>Você pode publicar seu projeto em 3 modalidades</p>
          </header>
          <main>
            <CardProject
              title="Projeto Gratuito"
              description="Publique sua ideia de modo colaborativo para ganhar experiencia e network."
            >
              <FaLightbulb size={80} />
            </CardProject>

            <CardProject
              title="Projeto Pago"
              description="Você pode pagar para alguem ou uma equipe desenvolver suas ideias direto pelo Wenzer."
            >
              <FaHandHoldingUsd size={80} />
            </CardProject>
            <CardProject
              title="Projeto Privado"
              description="Limite quem pode ver ou participar! Compartilhe apenas com pessoas selecionadas."
            >
              <FaLock size={80} />
            </CardProject>
          </main>
        </ContainerProject>

        <ContainerFooter>
          <div>
            <section></section>
            <section>
              <strong>Informações</strong>
              <a href="#about">O que é o Wenzer</a>
              <a href="#networking">Networking</a>
              <a href="#projects">Projetos</a>
            </section>
            <section>
              <strong>Plataforma</strong>
              <a href="#home">Cadastre-se</a>
            </section>
            <section>
              <strong>Siga o Wenzer:</strong>
              <div className="social-media">
                <a
                  href="https://twitter.com/wenzeroficial"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter size={25} />{" "}
                </a>
                <a
                  href="https://www.instagram.com/wenzeroficial/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram size={25} />
                </a>
                <a
                  href="https://www.linkedin.com/company/wenzer"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin size={25} />
                </a>
              </div>
            </section>
            <section>
              <a href="#home">
                <FaArrowUp size={30} />
              </a>
            </section>
          </div>

          <footer>
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