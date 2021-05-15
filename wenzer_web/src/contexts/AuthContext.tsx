import { createContext, useState, ReactNode, useContext } from 'react';

interface IContextProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
  Authentication: () => void;
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthContextProvider({ children }: IContextProviderProps) {
  const [isAuth, setIsAuth] = useState(false);

  function Authentication() {
    setIsAuth(!isAuth);
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, Authentication }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}