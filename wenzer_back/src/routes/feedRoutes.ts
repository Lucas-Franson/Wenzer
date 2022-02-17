import { AuthUser } from '../middlewares';

const Router = require('express');
const FeedController = require('../controllers/FeedController');

const routes = Router();

const feedController = new FeedController();

routes.get('/api/getallposts', AuthUser, feedController.getAllPosts);

routes.options(['api/getallposts'], (req: any, res: any) => {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', [ 'Content-Type', 'Authorization' ]);
    res.status(204);
    res.end();
})

export { routes };

