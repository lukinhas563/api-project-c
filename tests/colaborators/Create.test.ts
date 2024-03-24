import { testServer } from '../jest.setup';

describe('Colaborators - Create', () => {
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
    });

    test('Should create a new collaborator', async () => {
        const res1 = await testServer
            .post('/collaborators')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                first_name: 'Lucas',
                last_name: 'Montenegro',
                cpf: '11111111111',
                email: 'lucasmontenegro@email.com',
            });

        expect(res1.statusCode).toEqual(201);
        expect(typeof res1.body).toBe('object');
    });

    test('Should not to have a short field', async () => {
        const res1 = await testServer
            .post('/collaborators')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                first_name: 'Lu',
                last_name: 'Mo',
                cpf: '111111111',
                email: 'lucasmontenegro',
            });

        expect(res1.statusCode).toEqual(400);
        expect(res1.body).toHaveProperty('errors');
        expect(res1.body).toHaveProperty('errors.body.first_name');
        expect(res1.body).toHaveProperty('errors.body.last_name');
        expect(res1.body).toHaveProperty('errors.body.cpf');
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    test('Should to have all fields', async () => {
        const res1 = await testServer
            .post('/collaborators')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({});

        expect(res1.statusCode).toEqual(400);
        expect(res1.body).toHaveProperty('errors');
    });

    test('Should not create without a token', async () => {
        const res1 = await testServer.post('/collaborators').send({});

        expect(res1.statusCode).toEqual(401);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
