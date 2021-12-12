import { FormEvent, memo, useState } from "react";
import { useHistory } from "react-router";
import api from "../../../../Services/api/api";

import InputText from "../../../../Components/InputText";
import InputPassword from "../../../../Components/InputPassword";
import DialogTermsAndPolicy from "../../../../Components/DialogTermsPolicy";
import { toastfyError, toastfySuccess } from "../../../../Components/Toastfy";
import { CircularProgress } from "@material-ui/core";

import { Container } from "./styles";

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTerms, setIsTerms] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setHasError(false);
    setIsLoading(true);

    if(password !== confirmPassword) {
      setHasError(true);
      toastfyError('Confirme sua senha corretamente!');
      setIsLoading(false);
      return
    }

    const data = {
      name, email, password
    }

    api
      .post("/api/cadastrar", data)
      .then(() => {
        toastfySuccess("Conta criada com sucesso! Verifique seu e-mail para confirmação.");
        setIsLoading(false);
        history.push('/welcome');
      })  
      .catch(() => {
        toastfyError("E-mail ja cadastrado, tente usar outro e-mail.");
        setIsLoading(false);
      });
  }

   function handleShowTerms() {
     setIsTerms(!isTerms);
   }

  return (
    <Container>
      <strong>Crie sua conta</strong>
      <form onSubmit={onSubmit}>
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
          hasError={hasError}
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        Ao se registrar, você aceita nossos{" "}
        <a href="##" onClick={handleShowTerms}>
          termos de uso
        </a>{" "}
        e a nossa{" "}
        <a href="##" onClick={handleShowTerms}>
          {" "}
          política de privacidade
        </a>
        .
      </span>
      <DialogTermsAndPolicy state={isTerms} handleChange={handleShowTerms} />
    </Container>
  );
}

export default memo(Login);
