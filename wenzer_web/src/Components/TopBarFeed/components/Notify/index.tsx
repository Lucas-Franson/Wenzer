import Badge from '@material-ui/core/Badge';
import { useEffect, useState } from 'react';
import { MdNotifications } from 'react-icons/md';
import socketIOClient from 'socket.io-client';
import { useAuth } from '../../../../Services/Authentication/auth';

const defaultProps = {
  color: 'secondary' as 'secondary',
  children: <MdNotifications size={28}/>,
};

export default function Notify() {
  
  const [count, setCount] = useState(0);
  const { userInfo } = useAuth();

  useEffect(() => {
    const socketConn = socketIOClient('http://127.0.0.1:3333', { transports: ['websocket'], query: { id: userInfo?.id, type: 'notification' } });
      socketConn.on("GetNotification", data => {
        setCount(data); 
      });
  }, []);

  return (
    <div >
      <Badge badgeContent={count} max={999} style={{cursor: 'pointer'}} {...defaultProps} />
    </div>
  );
}