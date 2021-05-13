import { ReactElement, ReactNode } from 'react';
import { useStyles } from './styles';
import TopBar from '../TopBar';

interface iLayout {
  children: ReactNode;
}

export default function Layout({ children }: iLayout): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      {children}
    </div>
  );
}
