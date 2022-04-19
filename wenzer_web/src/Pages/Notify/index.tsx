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

export enum NotificationType {
  FriendRequest,
  CommentedOnYourComment,
  CommentedOnYourPost
}

function Notify(): ReactElement {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState<{ _id: string, text: string, type: NotificationType, created_at: Date}[]>([]);

  useEffect(() => {
    dispatch(removeAllNotify());
  });

  function getAllNotification() {
    APIServiceAuthenticated.get('/api/notification', {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setNotification(res.data);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
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
              {notification.length > 0 ? 
                notification.map((data) => (
                  <div>
                    {data.type === NotificationType.FriendRequest ? (
                      <NotifyFriendRequest 
                        key={data._id}
                        _id={data._id}
                        text={data.text}
                        type={data.type}
                        created_at={data.created_at}
                      />
                    ) : (
                      <NotifyGeneral 
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
            </main>
          </ContainerNotify>
      </Container>
  )
}

export default Notify;