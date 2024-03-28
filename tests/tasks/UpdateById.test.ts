import { testServer } from '../jest.setup';

describe('Employees - Update', () => {
    let accessToken = '';

    beforeAll(async () => {
        await testServer.post('/register').send({
            user_name: 'testserver',
            first_name: 'Test',
            last_name: 'Server',
            cpf: '12345678911',
            email: 'test-server@email.com',
            password_hash: '1234567',
        });

        const loginUser = await testServer.post('/login').send({
            user_name: 'testserver',
            password_hash: '1234567',
        });

        accessToken = loginUser.body.accessToken;

        const collaborator = await testServer
            .post('/collaborators')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                first_name: 'teste1',
                last_name: 'test1',
                cpf: '78954252151',
                email: 'test1@email.com',
            });

        const company = await testServer
            .post('/companies?idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                company_name: 'Joelma Miranda',
                fantasy_name: 'Escola de Danca',
                cnpj: '50.985.654/0001-01',
                size: 'me',
                tax_regime: 'simples nacional',
                opening_date: '11/09/1997',
                main_economic_activity: 'Vendedor',
            });

        const employee = await testServer
            .post('/employees?idCompany=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                first_name: 'Lais',
                last_name: 'Santana',
                cpf: '98565985695',
            });

        const tasks = [
            {
                title: 'Estudar programação',
                description: 'Estudar de segunda a sexta',
                status: 'Em progresso',
                priority: 'Total',
            },
            {
                title: 'Estudar ingles',
                description: 'Estudar de segunda a sexta',
                status: 'Em progresso',
                priority: 'Total',
            },
            {
                title: 'Ler um livro',
                description: 'De segunda a sexta',
                status: 'Em progresso',
                priority: 'Média',
            },
        ];

        const task1 = await testServer
            .post('/tasks?idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(tasks[0]);

        const task2 = await testServer
            .post('/tasks?idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(tasks[1]);

        const task3 = await testServer
            .post('/tasks?idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(tasks[2]);
    });

    test('Should update a task by id', async () => {
        const res = await testServer
            .put(`/tasks/1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                title: 'Test Test Test',
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('result');
        expect(res.body).toBeInstanceOf(Object);
    });

    test('Should not update without a body', async () => {
        const res = await testServer
            .put(`/tasks/1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors.default');
        expect(res.body).toBeInstanceOf(Object);
    });

    test('Should not update a task without a token', async () => {
        const res = await testServer.put(`/tasks/1`).send({
            title: 'Test Test Test',
        });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors.default');
    });
});
