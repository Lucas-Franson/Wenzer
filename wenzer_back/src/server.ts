require('dotenv').config();
import express from 'express';
import cors from 'cors';
import sessions from 'express-session';
import { router } from './1-presentation/routes/index';
import { Tabelas } from './4-infra/dbContext/tabelas';
import swaggerUi from 'swagger-ui-express';
import GlobalErrorHandler from './middlewares/GlobalErrorHandler';
import ExposeServices from './middlewares/ExposeServices'; './middlewares/ExposeServices';
import './extension-method/string';
import './extension-method/date';
const swaggerFile = require('./swagger_output.json');
const fileupload = require("express-fileupload");
import socketIo from 'socket.io';
import http from 'http';
import { websocket } from './webserver';

const port = 3333;

const oneDay = 1000 * 60 * 60 * 24;
const app = express(); 

app.use((req, res, proximo) => {
    res.set('Access-Control-Allow-Origin', '*');
    
    proximo();
});

new Tabelas();

app.use(express.json());
app.use(sessions({
    secret: "WenZer2022#$fhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));

ExposeServices(app);
router(app);
GlobalErrorHandler(app);

const server = http.createServer(app);
const io = new socketIo.Server(server);

websocket(io);

require("./1-presentation/routes/index");

server.listen(port, () => console.log(`Server is running on port ${port}`));

