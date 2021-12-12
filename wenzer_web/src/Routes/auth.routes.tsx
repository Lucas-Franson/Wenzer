import { Switch, Route, Redirect } from 'react-router-dom';
import LayoutWelcome from '../Components/Layout/LayoutWelcome';
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import RecoverPassword from '../Pages/Auth/RecoverPassword';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Welcome from '../Pages/Welcome';

function AuthRoutes() {
    return (
      <LayoutWelcome>
        <Switch>
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/login/:token?" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/recover-password" component={RecoverPassword} />
          <Redirect to="/welcome" />
        </Switch>
      </LayoutWelcome>
    );
}

export default AuthRoutes;