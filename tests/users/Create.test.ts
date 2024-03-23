import { testServer } from '../jest.setup';

describe('Users - Create new user', () => {
    test('Should create a new user', async () => {
        const createUser = await testServer.post('/register').send({
            user_name: 'lucassilva2',
            first_name: 'Lucas',
            last_name: 'Silva',
            cpf: '55555555555',
            email: 'lucassilva2@email.com',
            password_hash: '5as4d6as54d65ggas',
        });

        expect(createUser.status).toEqual(201);
    });

    test('Should not create two same user', async () => {
        const createUser = await testServer.post('/register').send({
            user_name: 'lucassilva2',
            first_name: 'Lucas',
            last_name: 'Silva',
            cpf: '55555555555',
            email: 'lucassilva2@email.com',
            password_hash: '5as4d6as54d65ggas',
        });

        const createUser2 = await testServer.post('/register').send({
            user_name: 'lucassilva2',
            first_name: 'Lucas',
            last_name: 'Silva',
            cpf: '55555555555',
            email: 'lucassilva2@email.com',
            password_hash: '5as4d6as54d65ggas',
        });

        expect(createUser2.status).toEqual(500);
        expect(createUser2.body).toHaveProperty('errors');
    });

    test('Should to have all properties', async () => {
        const createUser = await testServer.post('/register').send({});

        expect(createUser.status).toEqual(400);
        expect(createUser.body).toHaveProperty('errors');
        expect(createUser.body).toHaveProperty('errors.body.user_name');
        expect(createUser.body).toHaveProperty('errors.body.first_name');
        expect(createUser.body).toHaveProperty('errors.body.last_name');
        expect(createUser.body).toHaveProperty('errors.body.cpf');
        expect(createUser.body).toHaveProperty('errors.body.email');
        expect(createUser.body).toHaveProperty('errors.body.password_hash');
    });
});
