import { ReactElement } from 'react';
import { HeaderAvatar } from '../../Post/styles';
import { Container } from '../styles';

function NotifyGeneral(): ReactElement {
  return(
      <Container>
          <HeaderAvatar className='avatar-notify'/>
          <div className="content">
            <p>Fulano comentou na sua publicação</p>
            <span>{new Date().toDateString()}</span>
          </div>
      </Container>
  )
}

export default NotifyGeneral;