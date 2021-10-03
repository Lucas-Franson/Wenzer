import { FormEvent, memo, useState } from "react";

import InputText from "../../../../Components/InputText";
import { CircularProgress } from "@material-ui/core";
import { Container } from "./styles";
import api from "../../../../Services/api/api";
import { toastfyError, toastfySuccess } from "../../../../Components/Toastfy";

function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      email
    };

    api
      .post("api/recupera-senha", data)
      .then(() => {
        toastfySuccess('Enviamos um e-mail para recuperação da senha!');
        setIsLoading(false);
      })
      .catch(() => {
        toastfyError(`Falha ao tentar recuperar senha para ${email}, tente novamente`);
        setIsLoading(false);
      });
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <InputText
          type="Email"
          placeholder="E-mail"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          {isLoading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
    </Container>
  );
}

export default memo(Login);
