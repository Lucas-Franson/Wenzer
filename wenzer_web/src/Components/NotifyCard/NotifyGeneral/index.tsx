import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderAvatar } from '../../Post/styles';
import { Container } from '../styles';

function NotifyGeneral({
  _id,
  text,
  type,
  created_at
}: any): ReactElement {
  const history = useHistory();

  function goToUserProfile() {
    if (_id)
      history.push(`/post/${_id}`);
  }
  
  return(
      <Container onClick={goToUserProfile} style={{ cursor: 'pointer' }}>
          <HeaderAvatar className='avatar-notify'/>
          <div className="content">
            <p>{text}</p>
            <span>{new Date(created_at).toLocaleString('pt-BR')}</span>
          </div>
      </Container>
  )
}

export default NotifyGeneral;