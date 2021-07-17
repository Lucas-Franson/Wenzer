import { memo, useContext } from "react";
import { Container } from "./styles";
import LogoWenzer from '../../../../utils/image/LogoWenzerOriginal.svg';
import WelcomeContext from '../../context';

function ConfirmedEmail() {
  const { setIsEmailConfirmed, isEmailConfirmed } = useContext(WelcomeContext);
  return (
    <Container>
      <section>
        <img src={LogoWenzer} alt="Wenzer" />
        <div>
          <h3>Parabéns! Você está inscrito na nossa lista de espera!</h3>
          <h6>Em breve você receberá novidades no e-mail cadastrado!</h6>
        </div>
      </section>
      <div>
        <button onClick={() => setIsEmailConfirmed(!isEmailConfirmed)}>
          Cadastrar um novo e-mail
        </button>
      </div>
    </Container>
  );
}

export default memo(ConfirmedEmail);
