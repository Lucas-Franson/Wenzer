import { ReactElement } from "react";
import Form from "./Form";
import { MdArrowBack } from "react-icons/md";

import { Container } from "./styles";

function Login(): ReactElement {
  return (
    <Container>
      <header>
        <h1>Cadastre sua nova senha!</h1>
        <a href="/">
          {" "}
          <MdArrowBack size={22} /> Voltar para home
        </a>
      </header>
      <div>
        <Form />
      </div>
    </Container>
  );
}

export default Login;
