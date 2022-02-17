import { routes as login } from './loginRoutes';
import { routes as feed} from './feedRoutes';

export function router(app: any) {
    app.use(login);
    app.use(feed);
}