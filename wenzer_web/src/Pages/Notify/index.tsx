import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NoContent from '../../Components/Animation/NoContent';
import NotifyFriendRequest from '../../Components/NotifyCard/NotifyFriendRequest';
import NotifyGeneral from '../../Components/NotifyCard/NotifyGeneral';
import { toastfyError } from '../../Components/Toastfy';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import { removeAllNotify } from '../../Store/Slices/notifySlice';
import Cookies from "js-cookie";

import { Container } from '../Feed/styles';
import { ContainerNotify } from './styles';
import SplashScreen from '../../Components/Animation/SplashScreen';
import NotifyCommentedOnYourComment from '../../Components/NotifyCard/NotifyCommentedYourComment';
import NotifyCommentedOnYourPost from '../../Components/NotifyCard/NotifyCommentedPost';

export enum NotificationType {
  FriendRequest,
  CommentedOnYourComment,
  CommentedOnYourPost
}

function Notify(): ReactElement {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState<{ _id: string, text: string, type: NotificationType, created_at: Date}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(removeAllNotify());
  });

  function getAllNotification() {
    setIsLoading(true);
    APIServiceAuthenticated.get('/api/notification', {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setNotification(res.data);
      setIsLoading(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getAllNotification();
  }, []);

  return (
      <Container>
          <ContainerNotify>
            <header>
              <h2>Notificações</h2>
            </header>

            <main>
              {isLoading ? (
                <SplashScreen />
              ) : (
                <>
                  {notification.length > 0 ? 
                    notification.map((data) => (
                      <div key={data._id}>
                        {data.type === NotificationType.FriendRequest && (
                          <NotifyFriendRequest 
                            key={data._id}
                            _id={data._id}
                            text={data.text}
                            type={data.type}
                            created_at={data.created_at}
                          />
                        )}

                        {data.type === NotificationType.CommentedOnYourComment && (
                          <NotifyCommentedOnYourComment 
                            key={data._id}
                            _id={data._id}
                            text={data.text}
                            type={data.type}
                            created_at={data.created_at}
                          />
                        )}

                        {data.type === NotificationType.CommentedOnYourComment && (
                          <NotifyCommentedOnYourPost 
                            key={data._id}
                            _id={data._id}
                            text={data.text}
                            type={data.type}
                            created_at={data.created_at}
                          />
                        )}
                      </div>
                    )) : (
                    <div>
                      <NoContent />
                      <span>
                        Sem notificações por aqui.
                      </span>
                    </div>
                  )}
                </>
              )}
            </main>
          </ContainerNotify>
      </Container>
  )
}

export default Notify;