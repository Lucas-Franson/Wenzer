import { memo, useState } from "react";
import { Container } from "./styles";
import InputText from "../../../Components/InputText";

function Login() {
  const [email, setEmail] = useState('');

  function onSubmit() {
    console.log('name: ' + email + ' password: ')
  }

  return (
    <Container>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <InputText type="Email" placeholder="E-mail" required={true} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Recuperar Senha</button>
      </form>
    </Container>
  );
}

export default memo(Login);
