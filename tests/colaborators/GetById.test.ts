import { testServer } from '../jest.setup';

describe('Colaborators - Get by id', () => {
    test('Should get a colaborators', async () => {
        const createUser = await testServer.post('/register').send({
            user_name: 'lucassilva2',
            first_name: 'Lucas',
            last_name: 'Silva',
            cpf: '55555555555',
            email: 'lucassilva2@email.com',
            password_hash: '5as4d6as54d65ggas',
        });

        const res1 = await testServer.post('/colaborators').send({
            first_name: 'Lucas',
            last_name: 'Montenegro',
            cpf: '11111111111',
            email: 'lucasmontenegro@email.com',
            id_user: 1,
        });

        const res2 = await testServer.get('/colaborators/1').send({
            id_user: 1,
        });

        expect(res2.status).toEqual(200);
    });
});
