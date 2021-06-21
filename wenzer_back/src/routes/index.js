const routes = require('./loginRoutes');

module.exports = function router(app) {
    app.use(routes);
}