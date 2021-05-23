import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import api from '../services/api';
import LoadingScreen from '../components/LoadingScreen';

interface IContextProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  Logout: () => void;
  Login: (email: string, password: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  Authentication: () => void;
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthContextProvider({ children }: IContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    async function loadUserFromCookies() {
      const token = Cookies.get('WenzerToken');
      if (token) {
        setIsAuthenticated(true);
        console.log("Is authenticated!");
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        await router.push('/welcome');
      }
      setIsLoading(false);
    }
    loadUserFromCookies();
  }, [])

  async function Login(email: string, password: string){
    try {
      const { data: token } = await api.post('api/login', { email, password })
    
      if (token) {
        console.log('Got token');
        Cookies.set('WenzerToken', token, { expires: 60 });
        api.defaults.headers.Authorization = `Bearer ${token.token}`;
        router.push('/')
      }
    } catch(e) {
      alert('E-mail ou senha incorreta!');
    }
   };

  function Authentication() {
    setIsAuthenticated(!isAuthenticated);
  }

  function Logout() {
    router.push('/welcome');
    Cookies.remove('WenzerToken');
    delete api.defaults.headers.Authorization;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, Login, isLoading, Logout, Authentication }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const ProtectRoute = ({ children }) => {
  const {isLoading } = useAuth();
  if (isLoading){
    return <LoadingScreen />
  }
  return children;
};

export const useAuth = () => useContext(AuthContext);
