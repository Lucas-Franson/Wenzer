require('dotenv').config();
import express from 'express';
import { createServer } from 'http';
import "./database/index";
import { router } from './routes';
import { GlobalErrorHandler } from './middlewares';

const app = express();

const http = createServer(app);

app.use(express.json());

router(app);
GlobalErrorHandler(app);

const port = 3333;

http.listen(port, () => console.log(`Server is running on port ${port}`));