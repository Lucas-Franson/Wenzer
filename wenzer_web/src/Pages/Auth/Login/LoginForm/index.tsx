import { FormEvent, memo, useState } from "react";
import { Link } from 'react-router-dom';
import api from "../../../../Services/api/apiService";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../Services/Authentication/auth';

import InputPassword from '../../../../Components/InputPassword';
import InputText from "../../../../Components/InputText";

import { CircularProgress } from "@material-ui/core";

import { Container } from "./styles";
import { toastfyError } from "../../../../Components/Toastfy";
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const { singIn } = useAuth();
  const [usersActive, setUsersActive] = useState(0);

  const history = useHistory();

  async function getUsersActive(isMounted: boolean) {
    await api
    .get(`/api/getUsersActive`)
    .then((res) => {
      if (isMounted) setUsersActive(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);
    setIsRequesting(true);

    const data = {
      email, password
    };

    api
    .post("/api/login", data)
    .then((res) => {
      singIn(res.data.token);
      setIsLoading(false);
      setIsRequesting(false);
      history.push('/');
    })
    .catch((err) => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
      setIsRequesting(false);
    });
  }

  useEffect(() => {
    let isMounted = true;
    getUsersActive(isMounted);
    return () => { isMounted = false }
  }, []);

  return (
    <Container>
      <form
        onSubmit={onSubmit}
      >
        <InputText
          type="Email"
          placeholder="E-mail"
          required={true}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <InputPassword
          placeholder="Senha"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forgot-password">Esqueceu sua senha?</Link>
        <button type="submit" disabled={isRequesting ? true : false}>
          {isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Login"
            )}
        </button>
      </form>
      <span>
        Não tem uma conta Wenzer? <a href="/register">Cadastre-se aqui.</a>
      </span>
      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
        <div style={{ backgroundColor: 'green', borderRadius: '50%', width: '15px', height: '15px' }}></div>

         Usuários conectados: {usersActive} 
      </span>
    </Container>
  );
}

export default memo(Login);
