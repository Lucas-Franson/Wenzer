require('dotenv').config();
import express from 'express';
import sessions from 'express-session';
import { router } from './routes/index';
import { GlobalErrorHandler } from './middlewares';
import { conexao } from './repositories/conexao';
import { Tabelas } from './repositories/tabelas';

const port = 3333;

conexao.connect((err: any) => {
    if (err) {
        console.log(err);
    } else {
        const oneDay = 1000 * 60 * 60 * 24;
        const app = express(); 

        app.use((req, res, proximo) => {
            res.set('Access-Control-Allow-Origin', '*');
            
            proximo();
        });

        let tabela = new Tabelas();
        tabela.init(conexao);

        app.use(express.json());
        app.use(sessions({
            secret: "WenZer2022#$fhrgfgrfrty84fwir767",
            saveUninitialized:true,
            cookie: { maxAge: oneDay },
            resave: false
        }));

        router(app);
        GlobalErrorHandler(app);
        
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
});