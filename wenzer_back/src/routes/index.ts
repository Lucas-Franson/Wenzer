import { routes } from './loginRoutes';

export function router(app) {
    app.use(routes);
}