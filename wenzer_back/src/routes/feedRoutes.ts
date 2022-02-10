const Router = require('express');
const FeedController = require('../controllers/FeedController');

const routes = Router();

const feedController = new FeedController();

routes.get('')

