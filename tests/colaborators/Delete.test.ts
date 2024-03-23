import { testServer } from '../jest.setup';

describe('Colaborators - Delete', () => {
    test('Should delete a colaborator', async () => {
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

        const createColaborator = await testServer
            .post('/colaborators')
            .set('Content-Type', 'application/json')
            .set('User-Agent', 'insomnia/8.6.1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                first_name: 'Lucas',
                last_name: 'Montenegro',
                cpf: '11111111111',
                email: 'lucasmontenegro@email.com',
                id_user: 1,
            });

        const res1 = await testServer.delete('/colaborators/1').send();

        expect(res1.status).toEqual(201);
    });
});
