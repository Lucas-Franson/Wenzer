import Badge from '@material-ui/core/Badge';
import { useEffect, useState } from 'react';
import { MdNotifications } from 'react-icons/md';
import socketIOClient from 'socket.io-client';
import { useWenzer } from '../../../../hooks/useWenzer';
import { useAuth } from '../../../../Services/Authentication/auth';

const defaultProps = {
  color: 'secondary' as 'secondary',
  children: <MdNotifications size={28}/>,
};

export default function Notify() {
  
  const [count, setCount] = useState(0);
  const { getSocketIOClient } = useWenzer();

  useEffect(() => {
    let isMounted = true;
    let socketConn = getSocketIOClient();
    socketConn.on("GetNotification", data => {
      if (isMounted) setCount(data);
    });
    return () => { isMounted = false }
  }, []);

  return (
    <div >
      <Badge badgeContent={count} max={999} style={{cursor: 'pointer'}} {...defaultProps} />
    </div>
  );
} 