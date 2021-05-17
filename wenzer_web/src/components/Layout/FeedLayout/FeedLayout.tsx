import { ReactElement, ReactNode } from 'react';

interface IFeedLayout {
  children: ReactNode;
}

export default function FeedLayout({ children }: IFeedLayout): ReactElement {
  return (
    <div>
      {children}
    </div>
  );
}