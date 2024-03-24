import { testServer } from '../jest.setup';

describe('Collaborators - Delete', () => {
    let accessToken = '';
    let idCollaborator = '';

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
                first_name: 'Lucas',
                last_name: 'Montenegro',
                cpf: '78954252151',
                email: 'lucasmontenegro@email.com',
            });

        idCollaborator = collaborator.body.return;
    });

    test('Should delete a collaborator', async () => {
        const res = await testServer
            .delete(`/collaborators/${idCollaborator}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        console.log(idCollaborator);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('result');
    });

    test('Should not delete an nonexistent collaborator', async () => {
        const res = await testServer
            .delete(`/collaborators/199`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('errors.default');
    });

    test('Should not delete without a token', async () => {
        const res = await testServer.delete(`/collaborators/${idCollaborator}`);

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors.default');
    });
});
