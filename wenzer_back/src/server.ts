require('dotenv').config();
import express from 'express';
import cors from 'cors';
import sessions from 'express-session';
import { router } from './1-presentation/routes/index';
import { conexao } from './4-infra/dbContext/conexao';
import { Tabelas } from './4-infra/dbContext/tabelas';
import swaggerUi from 'swagger-ui-express';
import GlobalErrorHandler from './middlewares/GlobalErrorHandler';
import ExposeServices from './middlewares/ExposeServices'; './middlewares/ExposeServices';
import './extension-method/string';
import './extension-method/date';
import Logger from './4-infra/utils/logger';
const swaggerFile = require('./swagger_output.json');

const port = 3333;

conexao.connect((err: any) => {
    if (err) {
        new Logger('Iniciar Servidor', err).log();
    } else {
        const oneDay = 1000 * 60 * 60 * 24;
        const app = express(); 

        app.use((req, res, proximo) => {
            res.set('Access-Control-Allow-Origin', '*');
            
            proximo();
        });

        new Tabelas(conexao);

        app.use(express.json());
        app.use(sessions({
            secret: "WenZer2022#$fhrgfgrfrty84fwir767",
            saveUninitialized:true,
            cookie: { maxAge: oneDay },
            resave: false
        }));
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
        app.use(cors());

        require("./1-presentation/routes/index")

        ExposeServices(app);
        router(app);
        GlobalErrorHandler(app);
        
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
});

