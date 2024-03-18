import server from './server/server';

const port = 8081;

server.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
