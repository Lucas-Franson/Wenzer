import { routes as login } from './loginRoutes';
import { routes as feed} from './feedRoutes';
import { routes as profile } from './profileRoutes';

export function router(app: any) {
    app.use(login);
    app.use(feed);
    app.use(profile);
}