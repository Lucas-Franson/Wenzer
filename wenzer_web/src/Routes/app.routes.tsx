import { Switch, Route, Redirect } from "react-router-dom";
import LayoutFeed from "../Components/Layout/LayoutFeed";
import Feed from "../Pages/Feed";
import Explorar from "../Pages/Explore";
import Projetos from "../Pages/Project";
import Perfil from '../Pages/Profile';

function AppRoutes() {
  return (
    <LayoutFeed>
      <Switch>
        <Route path="/" exact component={Feed} />
        <Route path="/Explore"  component={Explorar} />
        <Route path="/Projects" component={Projetos} />
        <Route path="/Profile" component={Perfil} />

        <Redirect to="/" />
      </Switch>
    </LayoutFeed>
 
  );
}

export default AppRoutes;
