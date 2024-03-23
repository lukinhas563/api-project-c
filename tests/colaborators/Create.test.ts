import { testServer } from '../jest.setup';

describe('Colaborators - Create', () => {
    test('Should create a new colaborator', async () => {
        const createUser = await testServer.post('/register').send({
            user_name: 'lucassilva2',
            first_name: 'Lucas',
            last_name: 'Silva',
            cpf: '55555555555',
            email: 'lucassilva2@email.com',
            password_hash: '5as4d6as54d65ggas',
        });

        const loginUser = await testServer.post('/login').send({
            user_name: 'lucassilva2',
            password_hash: '5as4d6as54d65ggas',
        });

        const token = loginUser.body.accessToken;

        const res1 = await testServer
            .post('/colaborators')
            .set('Authorization', `Bearer ${token}`)
            .send({
                first_name: 'Lucas',
                last_name: 'Montenegro',
                cpf: '11111111111',
                email: 'lucasmontenegro@email.com',
                id_user: 1,
            });

        expect(res1.statusCode).toEqual(201);
        expect(typeof res1.body).toBe('object');
    });

    test('Do not to have a short field', async () => {
        const createUser = await testServer.post('/register').send({
            user_name: 'lucassilva2',
            first_name: 'Lucas',
            last_name: 'Silva',
            cpf: '55555555555',
            email: 'lucassilva2@email.com',
            password_hash: '5as4d6as54d65ggas',
        });

        const res1 = await testServer.post('/colaborators').send({
            first_name: 'Lu',
            last_name: 'Mo',
            cpf: '111111111',
            email: 'lucasmontenegro',
            id_user: 1,
        });

        expect(res1.statusCode).toEqual(400);
        expect(res1.body).toHaveProperty('errors');
        expect(res1.body).toHaveProperty('errors.body.first_name');
        expect(res1.body).toHaveProperty('errors.body.last_name');
        expect(res1.body).toHaveProperty('errors.body.cpf');
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    test('Should to have all fields', async () => {
        const res1 = await testServer.post('/colaborators').send({});

        expect(res1.statusCode).toEqual(400);
        expect(res1.body).toHaveProperty('errors');
    });
});
