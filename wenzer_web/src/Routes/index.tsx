import { BrowserRouter } from 'react-router-dom';
import AuthRoutes from './auth.routes';

export default function Router() {
    return (
      <BrowserRouter>
        <AuthRoutes />
      </BrowserRouter>
    );
}