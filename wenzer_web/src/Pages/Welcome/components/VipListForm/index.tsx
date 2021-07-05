import { useState, useContext, FormEvent } from "react";
import { memo } from "react";
import { Container } from "./styles";
import InputText from '../../../../Components/InputText';
import WelcomeContext from '../../context';
import api from '../../../../Services/api/api'

function Login() {
  const [email, setEmail] = useState('');
  const { isEmailConfirmed, setIsEmailConfirmed } = useContext(WelcomeContext);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const data = { email: email}

    api
      .post("/api/salvar-email-marketing", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setIsEmailConfirmed(!isEmailConfirmed);
        console.log("deu certo");
      })
      .catch(() => {
        setIsEmailConfirmed(!isEmailConfirmed);
        console.log("falhou");
      });    
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
