import {
    createContext,
    useState,
    useContext,
} from 'react';
import Cookies from 'js-cookie';

interface IAuthContext {
    logged: boolean;
    singIn(email: string, password: string): void;
    singOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: any) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = Cookies.get('WenzerLogged');

        return !!isLogged;
    });           

    function singIn(email: string, password: string) {
        if (email === 'dev@wenzer.com' && password === 'dev') {
            Cookies.set('WenzerLogged', 'true');
            Cookies.set('WenzerEmail', email);
            setLogged(true);        

        } else {
            alert("senha ou usuario invalidos");
        }       
    }    

    function singOut() {
        Cookies.remove('WenzerLogged');
        Cookies.remove('WenzerEmail');
        setLogged(false);
        window.location.replace("/");
    }

    return (
        <AuthContext.Provider value={{ logged, singIn, singOut }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}
export { AuthProvider, useAuth };