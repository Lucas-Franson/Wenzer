import { ReactElement } from 'react';
import { HeaderAvatar } from '../../Post/styles';
import { Container } from '../styles';
import { IoMdPersonAdd } from 'react-icons/io';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

function NotifyFriendRequest(): ReactElement {
  return(
      <Container>
          <HeaderAvatar className='avatar-notify'/>
          <div className="content">
            <p>Fulano quer se conectar com você <IoMdPersonAdd size={20}/> </p>
            <span>{new Date().toDateString()}</span>
          </div>
          <div className="actions">
            <MdCheckCircle size={22}/>
            <MdCancel size={22}/>
          </div>
      </Container>
  )
}

export default NotifyFriendRequest;