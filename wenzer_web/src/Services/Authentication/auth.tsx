import {
    createContext,
    useState,
    useContext,
} from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import api from "../../Services/api/api";
import { toastfyError } from '../../Components/Toastfy';

interface IAuthContext {
  logged: boolean;
  singIn(token: string): void;
  singOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: any) => {     
  const [logged, setLogged] = useState<boolean>(() => {
      const isLogged = Cookies.get('WenzerLogged');

      return !!isLogged;
  });

  const history = useHistory();


  function singIn(token: string) {
    Cookies.set('WenzerLogged', 'true');
    Cookies.set('WenzerToken', token);
    setLogged(true);      
  }

  function singOut() {
    api.get("/api/logout", {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(() => {
      Cookies.remove('WenzerLogged');
      Cookies.remove('WenzerToken');
      setLogged(false);
    })
    .catch((err) => {

      if(err.response.data.mensagem === 'Usuário não está autenticado!') {
        Cookies.remove('WenzerLogged');
        Cookies.remove('WenzerToken');
        setLogged(false);
        return;
      }
      
      toastfyError(err.response.data.mensagem);
    });

  }

  return (
    <AuthContext.Provider
      value={{
        logged,
        singIn,
        singOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth };