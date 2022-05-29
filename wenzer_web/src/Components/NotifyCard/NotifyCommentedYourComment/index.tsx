import { ReactElement } from 'react';
import { Container } from '../styles';
import { GoCommentDiscussion } from 'react-icons/go';
import { useHistory } from 'react-router-dom';

function NotifyCommentedOnYourComment({
  _id,
  text,
  type,
  created_at
}: any): ReactElement {
  const history = useHistory();

  function goToPostComment() {
    if (_id)
      history.push(`/post/${_id}`);
  }
  
  return(
      <Container onClick={goToPostComment}>
          <div>
            <header onClick={goToPostComment}>
              <GoCommentDiscussion size={22}/>
            </header>
            <div style={{ cursor: 'pointer' }} onClick={goToPostComment} className="content">
              <p>{text}</p>
              <span>{new Date(created_at).toLocaleString('pt-BR')}</span>
            </div>
          </div>
      </Container>
  )
}

export default NotifyCommentedOnYourComment;