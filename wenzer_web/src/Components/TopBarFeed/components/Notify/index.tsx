import Badge from '@material-ui/core/Badge';
import { MdNotifications } from 'react-icons/md';

const defaultProps = {
  color: 'secondary' as 'secondary',
  children: <MdNotifications size={28}/>,
};

export default function Notify() {
  return (
    <div >
      <Badge badgeContent={5} max={999} style={{cursor: 'pointer'}} {...defaultProps} />
    </div>
  );
}