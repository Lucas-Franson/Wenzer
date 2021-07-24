import { memo, useState } from "react";
import { Container } from "./styles";
import InputText from "../../../components/InputText";
import InputPassword from "../../../components/InputPassword";

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function onSubmit() {
    if(password !== confirmPassword) {
      alert('Senhas não conferem, confirme sua senha corretamente!');
      return
    }
    const data = {
      name, email, password
    }

    console.log(data);
  }

  return (
    <Container>
      <strong>Crie sua conta</strong>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <InputText
          type="text"
          placeholder="Nome"
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
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
        <InputPassword
          placeholder="Confirmar Senha"
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      <span>
        Ao se registrar, você aceita nossos <a href="##">termos de uso</a> e a
        nossa <a href="##"> política de privacidade</a>.
      </span>
    </Container>
  );
}

export default memo(Login);
