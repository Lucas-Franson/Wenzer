import { ReactElement } from 'react';
import { HeaderAvatar } from '../../Post/styles';
import { Container } from '../styles';
import { IoMdPersonAdd } from 'react-icons/io';
import { MdCancel, MdCheckCircle } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import APIServiceAuthenticated from '../../../Services/api/apiServiceAuthenticated';
import Cookies from 'js-cookie';
import { toastfyError, toastfySuccess } from '../../Toastfy';

function NotifyFriendRequest({
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

  function acceptFriendRequest() {
    APIServiceAuthenticated.post('/api/notification/acceptFriendRequest', { idUser: _id }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      toastfySuccess("Solicitação de amizade aceita.");
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    });
  }

  function rejectFriendRequest() {
    APIServiceAuthenticated.post('/api/notification/rejectFriendRequest', { idUser: _id }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      toastfySuccess("Solicitação de amizade rejeitada.");
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    });
  }

  return(
      <Container>
          <HeaderAvatar style={{ cursor: 'pointer' }} onClick={goToUserProfile} className='avatar-notify'/>
          <div style={{ cursor: 'pointer' }} onClick={goToUserProfile} className="content">
            <p>{text} <IoMdPersonAdd size={20}/> </p>
            <span>{new Date(created_at).toLocaleString('pt-BR')}</span>
          </div>
          <div className="actions">
            <MdCheckCircle onClick={acceptFriendRequest} size={22}/>
            <MdCancel onClick={rejectFriendRequest} size={22}/>
          </div>
      </Container>
  )
}

export default NotifyFriendRequest;