import {
    createContext,
    useState,
    useContext,
} from 'react';
import { IWenzerContext} from './types';

const WenzerContext = createContext<IWenzerContext>({} as IWenzerContext);

const WenzerProvider = ({ children }: any) => {     
  const [paymentImpulsionamento, setPaymentImpulsionamento] = useState(false);

  return (
    <WenzerContext.Provider
      value={{
        paymentImpulsionamento,
        setPaymentImpulsionamento
      }}
    >
      {children}
    </WenzerContext.Provider>
  );
}

function useWenzer(): IWenzerContext {
  const context = useContext(WenzerContext);
  return context;
}
export { WenzerProvider, useWenzer };