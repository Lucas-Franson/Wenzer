import { routes } from './loginRoutes';

export function router(app: any) {
    app.use(routes);
}