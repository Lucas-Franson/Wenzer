import { memo, useState } from "react";
import { Container } from "./styles";
import InputPassword from '../../../Components/InputPassword';
import InputText from "../../../Components/InputPassword";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    console.log('name: ' + email + ' password: ' + password)
  }

  return (
    <Container>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <InputText placeholder="E-mail" required={true} onChange={(e) => setEmail(e.target.value)} />
        <InputPassword placeholder="Senha" required={true} onChange={(e) => setPassword(e.target.value)} />
        <a href="##">Esqueceu sua senha?</a>
        <button type="submit">Entrar</button>
      </form>
      <span>
        Não tem uma conta Wenzer? <a href="/register">Cadastre-se aqui.</a>
      </span>
    </Container>
  );
}

export default memo(Login);
