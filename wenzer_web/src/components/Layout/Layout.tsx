import { ReactElement, ReactNode } from 'react';
import TopBar from '../TopBar';

interface IFeedLayout {
  children: ReactNode;
}

export default function FeedLayout({ children }: IFeedLayout): ReactElement {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}