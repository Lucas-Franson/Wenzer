import { Switch, Route, Redirect } from 'react-router-dom';
import LayoutWelcome from '../Components/Layout/LayoutWelcome';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Welcome from '../Pages/Welcome';

function Routes() {
    return (
      <LayoutWelcome>
        <Switch>
          <Route path="/:token?" exact component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect to="/" />
        </Switch>
      </LayoutWelcome>
    );
}

export default Routes;