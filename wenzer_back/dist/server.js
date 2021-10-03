"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const middlewares_1 = require("./middlewares");
const conexao_1 = require("./repositories/conexao");
const tabelas_1 = require("./repositories/tabelas");
const port = 3333;
conexao_1.conexao.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        const app = (0, express_1.default)();
        app.use((req, res, proximo) => {
            res.set('Access-Control-Allow-Origin', '*');
            proximo();
        });
        let tabela = new tabelas_1.Tabelas();
        tabela.init(conexao_1.conexao);
        app.use(express_1.default.json());
        (0, index_1.router)(app);
        (0, middlewares_1.GlobalErrorHandler)(app);
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
});
//# sourceMappingURL=server.js.map