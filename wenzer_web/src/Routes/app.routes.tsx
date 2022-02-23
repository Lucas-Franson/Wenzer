import { Switch, Route, Redirect } from "react-router-dom";
import LayoutFeed from "../Components/Layout/LayoutFeed";
import LayoutWelcome from "../Components/Layout/LayoutWelcome";
import Feed from "../Pages/Feed";

function AppRoutes() {
  return (
    <LayoutFeed>
      <Switch>
        <Route path="/" exact component={Feed} />
        <Redirect to="/" />
      </Switch>
    </LayoutFeed>
 
  );
}

export default AppRoutes;
