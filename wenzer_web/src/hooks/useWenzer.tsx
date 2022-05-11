import {
    createContext,
    useState,
    useContext,
} from 'react';
import { IWenzerContext} from './types';
import socketIOClient, { Socket } from 'socket.io-client';
import { useAuth } from '../Services/Authentication/auth';
const {
  REACT_APP_PROTOCOL, REACT_APP_SERVER, REACT_APP_PORT
} = process.env;

const WenzerContext = createContext<IWenzerContext>({} as IWenzerContext);
const ServerURL = `${REACT_APP_PROTOCOL}://${REACT_APP_SERVER}${REACT_APP_PORT == '' ? '' : ':' + REACT_APP_PORT}`;

const WenzerProvider = ({ children }: any) => {     
  const [paymentImpulsionamento, setPaymentImpulsionamento] = useState(false);
  const [openModalProject, setOpenModalProject] = useState(false);
  const [_socketIOClient, setSocketIOClient] = useState<Socket>();
  const [searchKey, setSearchKey] = useState('');
  const { userInfo } = useAuth();

  function getSocketIOClient() {
    if (!_socketIOClient) {
      const connection = socketIOClient(ServerURL, { transports: ['websocket'], query: { id: userInfo?.id } });
      setSocketIOClient(connection);
      return connection;
    }
    return _socketIOClient;
  }

  return (
    <WenzerContext.Provider
      value={{
        paymentImpulsionamento,
        setPaymentImpulsionamento,
        openModalProject,
        setOpenModalProject,
        getSocketIOClient,
        searchKey,
        setSearchKey
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