import { ReactElement, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import api from "../../../Services/api/apiService";

import { toastfySuccess, toastfyWarning } from "../../../Components/Toastfy";

import LoginForm from "./LoginForm";
import { Container } from "./styles";

function Login(): ReactElement {

  useEffect(() => {
    let isMounted = true;
    async function loadTokenEmail(isMounted: boolean) {
      let searchForToken = window.location.search;
      let token = new URLSearchParams(searchForToken);
      let getToken = token.get("token");

      if (getToken) {
        await api
          .get(`/api/verifica-email/${getToken}`)
          .then(() => {
            toastfySuccess("E-mail confirmado!");
          })
          .catch((err) => {
            console.log(err)
            toastfyWarning(err.response.data.mensagem);
          });
      }
    }

    loadTokenEmail(isMounted);
    return () => { isMounted = false }
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
