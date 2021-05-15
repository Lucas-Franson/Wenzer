require('dotenv').config();
import express from 'express';
import { createServer } from 'http';
import "./database/index";
import { router } from './routes';
import { GlobalErrorHandler } from './middlewares';

const app = express();

app.use((req, res, proximo) => {
    res.set('Access-Control-Allow-Origin', '*');
    
    proximo();
})

const http = createServer(app);

app.use(express.json());

router(app);
GlobalErrorHandler(app);

const port = 3333;

http.listen(port, () => console.log(`Server is running on port ${port}`));