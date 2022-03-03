import { Switch, Route, Redirect } from "react-router-dom";
import LayoutFeed from "../Components/Layout/LayoutFeed";
import Feed from "../Pages/Feed";
import Explorar from "../Pages/Explore";
import Projetos from "../Pages/Project";
import Perfil from '../Pages/Profile';
import Notify from "../Pages/Notify";

function AppRoutes() {
  return (
    <LayoutFeed>
      <Switch>
        <Route path="/" exact component={Feed} />
        <Route path="/explore"  component={Explorar} />
        <Route path="/projects" component={Projetos} />
        <Route path="/profile" component={Perfil} />
        <Route path="/notify" component={Notify} />

        <Redirect to="/" />
      </Switch>
    </LayoutFeed>
 
  );
}

export default AppRoutes;
