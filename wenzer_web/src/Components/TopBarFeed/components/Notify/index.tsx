import Badge from '@material-ui/core/Badge';
import { MdNotifications } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { selectCounterNotify  } from '../../../../Store/Slices/notifySlice';

const defaultProps = {
  color: 'secondary' as 'secondary',
  children: <MdNotifications size={28}/>,
};

export default function Notify() {
  const count = useSelector(selectCounterNotify);
  return (
    <div >
      <Badge badgeContent={count} max={999} style={{cursor: 'pointer'}} {...defaultProps} />
    </div>
  );
}