import React from 'react';
import NoContent from '../../Components/Animation/NoContent';

import { Container } from '../Feed/styles';
import {ContainerNotify} from '../Notify/styles';

const Projetos: React.FC = () => {
  return (
      <Container>
          <ContainerNotify>
            <header>
              <h2>Meus Projetos</h2>
            </header>
            <main>
              <NoContent />
              <span>Sem projetos por aqusadssssssi.</span>
            </main>
          </ContainerNotify>
      </Container>
  )
}

export default Projetos;