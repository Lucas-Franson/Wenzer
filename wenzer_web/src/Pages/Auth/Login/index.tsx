import { ReactElement, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import api from "../../../Services/api/api";

import { toastfySuccess, toastfyWarning } from "../../../Components/Toastfy";

import LoginForm from "./LoginForm";
import { Container } from "./styles";

function Login(): ReactElement {

  useEffect(() => {
    async function loadTokenEmail() {
      let searchForToken = window.location.search;
      let token = new URLSearchParams(searchForToken);
      let getToken = token.get("token");

      if (getToken) {
        await api
          .get(`/api/verifica-email/${getToken}`)
          .then(() => {
            toastfySuccess("E-mail confirmado!");
          })
          .catch(() => {
            toastfyWarning(
              "Falha ao autenticar seu e-mail, verifique sua caixa de entrada ou spam!"
            );
          });
      }
    }

    loadTokenEmail();
  }, []);

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
