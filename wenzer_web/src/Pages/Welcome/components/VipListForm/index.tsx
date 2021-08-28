import { useState, useContext, FormEvent, memo } from "react";
import WelcomeContext from '../../context';
import api from '../../../../Services/api/api';
import { toast } from 'react-toastify';

import { CircularProgress } from '@material-ui/core';
import InputText from '../../../../Components/InputText';

import { Container } from "./styles";

function VipListForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isEmailConfirmed, setIsEmailConfirmed } = useContext(WelcomeContext);

  function toastfyWarning() {
    return toast.warning("E-mail ja cadastrado.", {
      position: "top-right",
      autoClose: 3500,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      progress: undefined,
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const data = { email: email };

    api
      .post("/api/salvar-email-marketing", data)
      .then(() => {
        setIsEmailConfirmed(true);
        setIsLoading(!isEmailConfirmed);
      })
      .catch(() => {
        setIsEmailConfirmed(false);
        toastfyWarning();
        setIsLoading(false);
      });
  }

  return (
    <Container>
      <strong>
        Cadastre seu melhor e-mail para ter acesso antecipado ao Wenzer!
      </strong>
      <form onSubmit={onSubmit}>
        <InputText
          type="Email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <button type="submit">
          {isLoading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>

      <span>
        Quer conhecer mais sobre o Wenzer? <a href="#about">Saiba mais.</a>
      </span>
    </Container>
  );
}

export default memo(VipListForm);
