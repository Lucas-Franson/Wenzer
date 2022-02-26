import { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeAllNotify } from '../../Store/Slices/notifySlice';

import { Container } from './styles';

function Notify(): ReactElement {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAllNotify());
  });

  return (
      <Container>
          Em breve Notificações.
      </Container>
  )
}

export default Notify;