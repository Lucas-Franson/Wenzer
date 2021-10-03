import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../Services/Authentication/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

export default function Router() {
  const { logged } = useAuth();
  
  return (
    <BrowserRouter>
      {logged ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}