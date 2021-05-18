import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface IContextProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
  Authentication: () => void;
  Logout: () => void;
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthContextProvider({ children }: IContextProviderProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('WenzerToken');

    if(token) {
      setIsAuth(true);
      setLoading(true)
    }else {
      setIsAuth(false);
    }

    setLoading(false);

  }, [])

  function Authentication() {
    setIsAuth(!isAuth);
  }

  function Logout() {
    localStorage.removeItem('WenzerToken');
    window.location.reload();
  }

  if(loading) {
    return <h1>Carregando...Um loading mais bonito sera implementado em breve.</h1>
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, Authentication, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}