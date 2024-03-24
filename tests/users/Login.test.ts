import { testServer } from '../jest.setup';

describe('Login - SingIn a user', () => {
    test('Shold login a existent user', async () => {
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

        expect(loginUser.status).toBe(200);
        expect(loginUser.body).toHaveProperty('accessToken');
    });

    test('Should not connect', async () => {
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
            password_hash: '123456',
        });

        expect(loginUser.status).toBe(401);
        expect(loginUser.body).toHaveProperty('errors.default');
    });
});
