import { FormEvent, memo, useState } from "react";
import { Link } from 'react-router-dom';
import api from "../../../../Services/api/api";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../Services/Authentication/auth';

import InputPassword from '../../../../Components/InputPassword';
import InputText from "../../../../Components/InputText";
import { toastfyError, toastfySuccess } from "../../../../Components/Toastfy";
import { CircularProgress } from "@material-ui/core";

import { Container } from "./styles";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { singIn } = useAuth();


  const history = useHistory();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email, password
    }

    api
    .post("/api/login", data)
    .then((res) => {
      singIn(res.data.token);
      setIsLoading(false);
      console.log(res.data.token);
      history.push('/');
    })
    .catch((err) => {
      toastfyError(err.message);
      setIsLoading(false);
    });
  }

  return (
    <Container>
      <form
        onSubmit={onSubmit}
      >
        <InputText
          type="Email"
          placeholder="E-mail"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputPassword
          placeholder="Senha"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forgot-password">Esqueceu sua senha?</Link>
        <button type="submit">
          {isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Cadastrar"
            )}
        </button>
      </form>
      <span>
        Não tem uma conta Wenzer? <a href="/register">Cadastre-se aqui.</a>
      </span>
    </Container>
  );
}

export default memo(Login);
