require('dotenv').config();
const express = require('express')
const router = require('./routes/index');
const GlobalErrorHandler = require('./middlewares');
const { conexao } = require('./repositories/conexao');
const Tabelas = require('./repositories/tabelas');

const port = 3333;

conexao.connect(err => {
    if (err) {
        console.log(err);
    } else {
        const app = express(); 

        app.use((req, res, proximo) => {
            res.set('Access-Control-Allow-Origin', '*');
            
            proximo();
        });

        Tabelas.init(conexao);

        app.use(express.json());

        router(app);
        GlobalErrorHandler(app);
        
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
});