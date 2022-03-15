import { routes as login } from './loginRoutes';
import { routes as feed} from './feedRoutes';
import { routes as profile } from './profileRoutes';
import { routes as project } from './projectRoutes';

export function router(app: any) {
    app.use(login);
    app.use(feed);
    app.use(profile);
    app.use(project);
}