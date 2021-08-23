import { ReactElement } from 'react';
import LoginForm from './LoginForm';
import { MdArrowBack } from "react-icons/md";


import { Container } from './styles';

function Login(): ReactElement {
  return (
    <Container>
      <header>
        <h1>Faça seu login na plataforma</h1>
        <a href="/">
          {" "}
          <MdArrowBack size={22} /> Voltar para home
        </a>
      </header>
      <div>
        <LoginForm />
      </div>
    </Container>
  );
}

export default Login;