"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const index_1 = require("./1-presentation/routes/index");
const tabelas_1 = require("./4-infra/dbContext/tabelas");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const GlobalErrorHandler_1 = __importDefault(require("./middlewares/GlobalErrorHandler"));
const ExposeServices_1 = __importDefault(require("./middlewares/ExposeServices"));
'./middlewares/ExposeServices';
require("./extension-method/string");
require("./extension-method/date");
const swaggerFile = require('./swagger_output.json');
const fileupload = require("express-fileupload");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const webserver_1 = require("./webserver");
const port = process.env.SERVER_PORT;
const oneDay = 1000 * 60 * 60 * 24;
const app = (0, express_1.default)();
app.use((req, res, proximo) => {
    res.set('Access-Control-Allow-Origin', '*');
    proximo();
});
new tabelas_1.Tabelas();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "WenZer2022#$fhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerFile));
app.use((0, cors_1.default)());
app.use(fileupload());
app.use(express_1.default.static("files"));
(0, ExposeServices_1.default)(app);
(0, index_1.router)(app);
(0, GlobalErrorHandler_1.default)(app);
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server);
(0, webserver_1.websocket)(io);
require("./1-presentation/routes/index");
server.listen(port, () => console.log(`Server is running on port ${port}`));
//# sourceMappingURL=index.js.map