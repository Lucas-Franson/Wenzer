import { ReactElement, ReactNode } from 'react';
import TopBarFeed from '../../TopBarFeed';

import { Container } from './styles';

interface ILayoutWelcomeProps {
    children: ReactNode;
}

function LayoutFeed({ children }: ILayoutWelcomeProps): ReactElement {
  return (
    <Container>
        <TopBarFeed/>
        {children}
    </Container>
  )
}

export default LayoutFeed;