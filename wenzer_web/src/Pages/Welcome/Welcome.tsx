import { ReactElement, useState } from 'react';
import bg_register from '../../Utils/image/bg_home.svg';
import bg_about from "../../Utils/image/bg_about.svg";
import bg_university from "../../Utils/image/bg_university.svg";
import bg_business from "../../Utils/image/bg_business.svg";
import VipListForm from './components/VipListForm';
import EmailConfirmed from './components/EmailConfirmed';
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import DialogTermsAndPolicy from '../../Components/DialogTermsPolicy';
import WelcomeContext from './context';

import {
  ContainerLogin,
  ContainerAbout, 
  ContainerUniversity,
  ContainerBusiness, 
  ContainerFooter,
  Container
} from "./styles";

function Welcome(): ReactElement {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(true);
  const [isTerms, setIsTerms] = useState(false);

  const initialContext = {
    isEmailConfirmed,
    setIsEmailConfirmed,
  };

  function handleShowTerms () {
    setIsTerms(!isTerms);
  }

  return (
    <WelcomeContext.Provider value={initialContext}>
      <Container>
        <ContainerLogin id="home">
          <header>
            <h1>Compartilhe experiência, ideias e projetos!</h1>
            <h2>
              Uma plataforma para publicar suas ideias ou participar projetos,
              ganhar experiencias em projetos que poderá somar no seu
              portifólio!!{" "}
            </h2>
            <img src={bg_register} alt="" />
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
              Publique suas ideias, encontre pessoas que possam te ajudar a
              desenvolve-las, e assim ganhar experiencia em projetos!
            </span>
          </div>
        </ContainerAbout>

        <ContainerUniversity id="university">
          <div className="alignLeft">
            <p>
              Precisa desenvolver um projeto que envolva uma área de estudo
              diferente da sua?
            </p>
            <span>
              Publique seu projeto com tags da sua universidade para encontrar
              universitários de areas comum com a suas ideias no seu proprio
              campus! Também sinta-se livre para colocar qualquer tag e expandir
              seu projeto para o mundo!
            </span>
          </div>
          <div>
            <img src={bg_university} alt="" />
          </div>
        </ContainerUniversity>

        <ContainerBusiness id="business">
          <div>
            <img src={bg_business} alt="" />
          </div>
          <div className="alignRight">
            <p>Participe de projetos e receba por isso! $</p>
            <span>
              No wenzer, você pode participar de projetos remunerados, assim
              como também pode pagar alguém para participar de um projeto seu!
            </span>
            <a href="#home">
              <button type="button">Entrar pra lista de espera</button>
            </a>
          </div>
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
              Siga o Wenzer: <FaTwitter size={30} /> <FaInstagram size={30} />{" "}
              <FaLinkedin size={30} /> <FaFacebook size={30} />{" "}
            </p>
            <section></section>
          </div>
          <footer>
            <p>
              Wenzer é uma rede social com foco em publicações de projetos e
              compartilhamento de experiência.
            </p>
            <span>
              <a href="##" target="">
                Termos e Condições
              </a>{" "}
              <a href="##" target="" onClick={handleShowTerms}>
                Politica de Privacidade
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