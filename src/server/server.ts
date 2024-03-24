import 'dotenv/config';
import './shared/services/translations';

import express from 'express';
import cors from 'cors';
import route from './routes/routes';

const server = express();

server.use(
    cors({
        origin: process.env.ENABLED_CORS?.split(';') || [],
    }),
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(route);

export default server;
