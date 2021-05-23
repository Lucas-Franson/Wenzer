import { ReactElement, ReactNode } from 'react';
import { useStyles } from './styles';
import TopBarLogin from '../TopBarLogin';
import TopBar from '../TopBar';
import { useAuth } from '../../contexts/AuthContext';

interface iLayout {
  children: ReactNode;
}

export default function Layout({ children }: iLayout): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBarLogin />     
      {children}
    </div>
  );
}
