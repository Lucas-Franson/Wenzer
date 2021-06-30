import { useState, useContext, FormEvent } from "react";
import { memo } from "react";
import { Container } from "./styles";
import InputText from '../../../../Components/InputText';
import WelcomeContext from '../../context';

function Login() {
  const [email, setEmail] = useState('');
  const { isEmailConfirmed, setIsEmailConfirmed } = useContext(WelcomeContext);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(email);
    setIsEmailConfirmed(!isEmailConfirmed);
  }

  return (
    <Container>
      <strong>
        Cadastre seu melhor e-mail para ter acesso antecipado ao Wenzer!
      </strong>
      <form
        onSubmit={onSubmit}
      >
        <InputText
          type="Email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <span>
        Quer conhecer mais sobre o Wenzer? <a href="#about">Saiba mais.</a>
      </span>
    </Container>
  );
}

export default memo(Login);
