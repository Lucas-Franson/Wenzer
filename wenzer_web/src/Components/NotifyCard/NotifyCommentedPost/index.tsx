import { ReactElement } from 'react';
import { Container } from '../styles';
import { IoMdPersonAdd } from 'react-icons/io';
import { GoComment } from 'react-icons/go';
import { useHistory } from 'react-router-dom';
import APIServiceAuthenticated from '../../../Services/api/apiServiceAuthenticated';
import Cookies from 'js-cookie';
import { toastfyError, toastfySuccess } from '../../Toastfy';

function NotifyCommentedOnYourPost({
  _id,
  text,
  type,
  created_at
}: any): ReactElement {
  const history = useHistory();

  function goToUserProfile() {
    if (_id)
      history.push(`/profile?user=${_id}`);
  }

  return(
      <Container onClick={goToUserProfile}>
          <div>
            <header onClick={goToUserProfile}>
              <GoComment size={22}/>
            </header>
            <div style={{ cursor: 'pointer' }} onClick={goToUserProfile} className="content">
              <p>{text}</p>
              <span>{new Date(created_at).toLocaleString('pt-BR')}</span>
            </div>
          </div>
      </Container>
  )
}

export default NotifyCommentedOnYourPost;