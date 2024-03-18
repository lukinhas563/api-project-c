import server from './server/server';

const port = process.env.PORT;

server.listen(port || 8081, () => {
    console.log(`Servidor rodando na porta http://localhost:${port || 8081}`);
});
