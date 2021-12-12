import { FormEvent, memo, useState, useEffect} from "react";

import { CircularProgress } from "@material-ui/core";
import InputTextPassword from "../../../../Components/InputPassword";
import { toastfyError, toastfySuccess, toastfyWarning } from "../../../../Components/Toastfy";
import { Container } from "./styles";
import api from "../../../../Services/api/api";

function Login() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [tokenPassword, setTokenPassword] = useState<string | null>('');

  async function loadTokenEmail() {
    let searchForToken = window.location.search;
    let token = new URLSearchParams(searchForToken);

    setTokenPassword(token.get("token"));
  }

  useEffect(() => {
    loadTokenEmail();
  }, [tokenPassword]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setHasError(false);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setHasError(true);
      toastfyWarning("Confirme sua senha corretamente!");
      setIsLoading(false);
      return;
    }

    const data = {
      password
    }

    api
      .post(`api/alterar-senha/:${tokenPassword}`, data)
      .then(() => {
        toastfySuccess('Senha alterada com sucesso!');
        setIsLoading(false);
      })
      .catch(() => {
        toastfyError('Falha ao alterar sua senha, vefique seu e-mail ou tente novamente');
        setIsLoading(false);
      });
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <InputTextPassword
          placeholder="Nova senha"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputTextPassword
          placeholder="Confirmar nova senha"
          hasError={hasError}
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">
          {" "}
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
