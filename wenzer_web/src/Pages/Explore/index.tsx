import React from 'react';
import NoContent from '../../Components/Animation/NoContent';

import { Container } from '../Feed/styles';
import {ContainerNotify} from '../Notify/styles';

const Explorar: React.FC = () => {
  return (
      <Container>
          <ContainerNotify>
            <header>
              <h2>Em alta</h2>
            </header>
            <main>
              <NoContent />
              <span>Sem projetos em alta por aqui.</span>
            </main>
          </ContainerNotify>
      </Container>
  )
}

export default Explorar;