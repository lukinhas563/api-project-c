import express from 'express';

const server = express();

server.get('/', (req, res) => {
    res.json({ result: 'OK' });
});

export default server;
