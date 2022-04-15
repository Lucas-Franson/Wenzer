import { Switch, Route, Redirect } from "react-router-dom";
import LayoutFeed from "../Components/Layout/LayoutFeed";
import Feed from "../Pages/Feed";
import Explorar from "../Pages/Explore";
import Projetos from "../Pages/Project";
import Perfil from '../Pages/Profile';
import Notify from "../Pages/Notify";
import PostScreen from "../Pages/PostScreen";

function AppRoutes() {
  return (
    <LayoutFeed>
      <Switch>
        <Route path="/" exact component={Feed} />
        <Route path="/explore"  component={Explorar} />
        <Route path="/projects" component={Projetos} />
        <Route path="/profile" component={Perfil} />
        <Route path="/notify" component={Notify} />
        <Route path="/post/:id" component={PostScreen} />

        <Redirect to="/" />
      </Switch>
    </LayoutFeed>
 
  );
}

export default AppRoutes;
