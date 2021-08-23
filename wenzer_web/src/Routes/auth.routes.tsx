import { Switch, Route, Redirect } from 'react-router-dom';
import LayoutWelcome from '../components/Layout/LayoutWelcome';
import EsqueceuSenha from '../pages/EsqueceuSenha';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Welcome from '../pages/Welcome';

function Routes() {
    return (
      <LayoutWelcome>
        <Switch>
          <Route path="/welcome/:token?" exact component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/esqueceu-senha" component={EsqueceuSenha} />
          <Redirect to="/welcome" />
        </Switch>
      </LayoutWelcome>
    );
}

export default Routes;