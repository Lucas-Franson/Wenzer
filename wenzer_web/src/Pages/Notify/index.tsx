import { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NoContent from '../../Components/Animation/NoContent';
import NotifyFriendRequest from '../../Components/NotifyCard/NotifyFriendRequest';
import NotifyGeneral from '../../Components/NotifyCard/NotifyGeneral';
import { removeAllNotify } from '../../Store/Slices/notifySlice';

import { Container } from '../Feed/styles';
import { ContainerNotify } from './styles';

function Notify(): ReactElement {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAllNotify());
  });

  return (
      <Container>
          <ContainerNotify>
            <header>
              <h2>Notificações</h2>
            </header>

            <main>
              <NotifyFriendRequest/>
              <NotifyGeneral/>
              <NoContent />
              <span>
                Sem notificações por aqui.
              </span>
            </main>
          </ContainerNotify>
      </Container>
  )
}

export default Notify;