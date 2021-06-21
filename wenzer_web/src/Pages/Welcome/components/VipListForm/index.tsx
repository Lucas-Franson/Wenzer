import { useState } from "react";
import { memo } from "react";
import { Container } from "./styles";
import InputText from '../../../../Components/InputText';

function Login() {
  const [email, setEmail] = useState('');

  function onSubmit() {
    console.log(email);
  }

  return (
    <Container>
      <strong>
        Cadastre seu melhor e-mail para ter acesso antecipado ao Wenzer!
      </strong>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
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
