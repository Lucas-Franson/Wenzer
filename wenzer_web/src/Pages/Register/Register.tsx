import { ReactElement } from 'react';
import RegisterForm from './RegisterForm';
import { MdArrowBack } from 'react-icons/md'
import { Container } from './styles';

function Register(): ReactElement {
  return (
    <Container>
      <header>
        <h1>
          Faça parte da comunidade Wenzer e comece agora mesmo a ganhar e
          compartilhar experiências!
        </h1>
        <h2>
          Faça networking, conexões, publique suas ideias ou participe dos
          projetos publicados pelos membros da comunidade!
        </h2>

        <a href="/">
          {" "}
          <MdArrowBack size={22} /> Voltar para home
        </a>
      </header>
      <div>
        <RegisterForm />
      </div>
    </Container>
  );
}

export default Register;