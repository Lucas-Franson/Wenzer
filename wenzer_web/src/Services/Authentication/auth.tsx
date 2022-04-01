import {
    createContext,
    useState,
    useContext,
} from 'react';
import Cookies from 'js-cookie';
import api from "../api/apiService";
import { toastfyError } from '../../Components/Toastfy';
import { IAuthContext, IUserInfo } from './types';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: any) => {     
  const [logged, setLogged] = useState<boolean>(() => {
      const isLogged = Cookies.get('WenzerLogged');

      return !!isLogged;
  });

  const [userInfo, setUserInfo] = useState<IUserInfo | null>(() => {
    const userInfoSaved = localStorage.getItem('WenzerInfo');

    if(userInfoSaved) {
      return JSON.parse(userInfoSaved);
    } else {
      return null
    }
  });

  function singIn(user: IUserInfo) {
    Cookies.set('WenzerLogged', 'true');
    Cookies.set('WenzerToken', user.accessToken);
    localStorage.setItem('WenzerInfo', JSON.stringify(user));
    setUserInfo(user);
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
      localStorage.removeItem('WenzerInfo');
      setUserInfo(null)
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
        singOut,
        userInfo
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