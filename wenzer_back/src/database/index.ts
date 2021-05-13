import { createConnection } from 'typeorm';
const data = require("../../ormconfig.json");

createConnection(data);