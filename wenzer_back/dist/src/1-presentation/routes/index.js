"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const loginRoutes_1 = require("./loginRoutes");
const feedRoutes_1 = require("./feedRoutes");
const profileRoutes_1 = require("./profileRoutes");
const projectRoutes_1 = require("./projectRoutes");
const notificationRoutes_1 = require("./notificationRoutes");
function router(app) {
    app.use(loginRoutes_1.routes);
    app.use(feedRoutes_1.routes);
    app.use(profileRoutes_1.routes);
    app.use(projectRoutes_1.routes);
    app.use(notificationRoutes_1.routes);
}
exports.router = router;
//# sourceMappingURL=index.js.map