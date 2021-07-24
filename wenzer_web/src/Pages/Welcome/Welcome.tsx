import { ReactElement, useState, useEffect, useRef } from 'react';
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaLock,
  FaLightbulb,
  FaHandHoldingUsd,
  FaAngleDoubleUp,
} from "react-icons/fa";
import WelcomeContext from './context';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import VipListForm from './components/VipListForm';
import EmailConfirmed from './components/EmailConfirmed';
import DialogTermsAndPolicy from '../../components/DialogTermsPolicy';
import CardProject from './components/CardProject';

import bg_university from "../../utils/image/bg_university.svg";
import bg_about from "../../utils/image/bg_about.svg";

import {
  ContainerLogin,
  ContainerAbout, 
  ContainerNetworking,
  ContainerProject, 
  ContainerFooter,
  Container
} from "./styles";
import api from '../../services/api/api';

type TokenParams = {
  token: string;
}

function Welcome(): ReactElement {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isTerms, setIsTerms] = useState(false);
  const params = useParams<TokenParams>();
  const mountedRef = useRef(true);
  const token = params.token;

  const initialContext = {
    isEmailConfirmed,
    setIsEmailConfirmed,
  };

  function toastfySuccess() {
    return toast.success("E-mail confirmado!", {
      position: "top-right",
      autoClose: 3500,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      progress: undefined,
    });
  }

   function toastfyWarning() {
     return toast.warning("Falha ao autenticar seu e-mail, verifique sua caixa de entrada!", {
       position: "top-right",
       autoClose: 3500,
       closeOnClick: true,
       pauseOnFocusLoss: true,
       progress: undefined,
     });
   }

  useEffect(() => {
    async function loadTokenEmailMarketing() {
      let a = window.location.search;
      let b = new URLSearchParams(a);
      let c = b.get("token");
      console.log(c);
      if (c) {
        console.log("token: ", token);
        await api
          .post(`/api/confirmar-email-marketing/${c}`)
          .then(() => {
            setIsEmailConfirmed(true);
            toastfySuccess();
            if (!mountedRef.current) return null;
          })
          .catch(() => {
            toastfyWarning();
          });
      }
      setIsEmailConfirmed(false);
    }

    loadTokenEmailMarketing();

    return () => {
       mountedRef.current = false;
    }
  }, [token]);

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
          <header>
            <div>
              <img src={bg_about} alt="Sobre o Wenzer" />
            </div>
            <div className="alignRight">
              <p>Wenzer é uma rede social para projetos e ideias</p>
              <span>
                No Wenzer você pode publicar seu projeto ou ideia (ex: um
                website e-commerce), seja ele colaborativo para você ganhar
                experiencia encontrando outras pessoas para desenvolver com
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
        </ContainerProject>

        <ContainerFooter>
          <div>
            <section></section>
            <section>
              <strong>Informações</strong>
              <a href="#about">O que é o wenzer</a>
              <a href="#networking">Networking</a>
              <a href="#projects">Projetos</a>
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
        <ToastContainer />
      </Container>
    </WelcomeContext.Provider>
  );
}

export default Welcome;