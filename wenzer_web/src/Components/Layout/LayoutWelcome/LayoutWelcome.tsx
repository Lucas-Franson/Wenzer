import React, { ReactElement, ReactNode } from 'react';
import TopBarWelcome from '../../TopBarWelcome';

import { Container } from './styles';

interface ILayoutWelcomeProps {
    children: ReactNode
}

function LayoutWelcome({ children }: ILayoutWelcomeProps): ReactElement {
  return (
    <>
      <TopBarWelcome />
      <Container>
        {children}
      </Container>
    </>
  );
}

export default LayoutWelcome;