import { FormEvent, memo, useState } from "react";
import { Link } from 'react-router-dom';

import InputPassword from '../../../../Components/InputPassword';
import InputText from "../../../../Components/InputText";
import { toastfyError } from "../../../../Components/Toastfy";

import { Container } from "./styles";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    console.log('name: ' + email + ' password: ' + password);
    toastfyError('Não');
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
        <button type="submit">Entrar</button>
      </form>
      <span>
        Não tem uma conta Wenzer? <a href="/register">Cadastre-se aqui.</a>
      </span>
    </Container>
  );
}

export default memo(Login);
