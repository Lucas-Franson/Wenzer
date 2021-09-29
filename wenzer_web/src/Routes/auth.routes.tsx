import { Switch, Route, Redirect } from 'react-router-dom';
import LayoutWelcome from '../Components/Layout/LayoutWelcome';
import EsqueceuSenha from '../Pages/EsqueceuSenha';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Welcome from '../Pages/Welcome';

function Routes() {
    return (
      <LayoutWelcome>
        <Switch>
          <Route path="/welcome/:token?" exact component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={EsqueceuSenha} />
          <Redirect to="/welcome" />
        </Switch>
      </LayoutWelcome>
    );
}

export default Routes;