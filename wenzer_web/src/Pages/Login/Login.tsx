import React, { ReactElement } from 'react';
import LoginForm from './LoginForm';

import { Container } from './styles';

function Login(): ReactElement {
  return (
    <Container>
      <header>
        <h1>
          Faça seu login na plataforma
        </h1>
      </header>
      <div>
        <LoginForm />
      </div>
    </Container>
  );
}

export default Login;