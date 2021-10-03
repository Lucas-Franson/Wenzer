import { Switch, Route, Redirect } from "react-router-dom";
import LayoutWelcome from "../Components/Layout/LayoutWelcome";
import Feed from "../Pages/Feed";


function AppRoutes() {
  return (
    <LayoutWelcome>
      <Switch>
        <Route path="/" exact component={Feed} />
        <Redirect to="/" />
      </Switch>
    </LayoutWelcome>
  );
}

export default AppRoutes;
